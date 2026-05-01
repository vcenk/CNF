-- =====================================================================
-- Migration: ensure every auth.users row has a public.profiles row
--
-- Root cause of "violates foreign key constraint formulas_user_id_fkey":
--   public.formulas.user_id REFERENCES public.profiles(id), but new
--   signups had no profile row created. Anything that touches profiles
--   (formula creation, dashboard page, etc.) crashes for those users.
--
-- This migration:
--   1. Backfills profiles for every auth.users that's missing one
--      (one-time cleanup of past signups)
--   2. Installs / replaces the on-signup trigger so future signups
--      always get a profile automatically
--
-- Safe to re-run.
-- =====================================================================

-- ---------- Step 1: backfill ---------------------------------------

INSERT INTO public.profiles (id, subscription_tier, created_at, updated_at)
SELECT
  u.id,
  'free',
  COALESCE(u.created_at, NOW()),
  NOW()
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Verify counts match (run this manually after):
--   SELECT count(*) AS auth_users FROM auth.users;
--   SELECT count(*) AS profile_rows FROM public.profiles;

-- ---------- Step 2: trigger function -------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, subscription_tier, created_at, updated_at)
  VALUES (NEW.id, 'free', NOW(), NOW())
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- ---------- Step 3: trigger ----------------------------------------

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ---------- Verification -------------------------------------------
-- After running, this SHOULD return zero rows (every auth user has a
-- profile now AND any future signup will too):
--
--   SELECT u.id, u.email
--   FROM auth.users u
--   LEFT JOIN public.profiles p ON p.id = u.id
--   WHERE p.id IS NULL;
-- =====================================================================
