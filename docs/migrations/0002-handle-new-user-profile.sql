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
--
-- Schema check (current as of 2026-04-30):
--   profiles.id              uuid NOT NULL  (PK, FK to auth.users)
--   profiles.display_name    text NOT NULL DEFAULT ''
--   profiles.email           text (nullable)
--   profiles.subscription_tier text NOT NULL DEFAULT 'free'
--   profiles.created_at      timestamptz NOT NULL DEFAULT now()
--   profiles.updated_at      timestamptz NOT NULL DEFAULT now()
--
-- We explicitly populate id, display_name, email, subscription_tier
-- (the rest take their defaults) so the INSERT is robust regardless
-- of what other columns get added later.

INSERT INTO public.profiles (id, display_name, email, subscription_tier)
SELECT
  u.id,
  COALESCE(SPLIT_PART(u.email, '@', 1), ''),
  u.email,
  'free'
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- ---------- Step 2: trigger function -------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, email, subscription_tier)
  VALUES (
    NEW.id,
    COALESCE(SPLIT_PART(NEW.email, '@', 1), ''),
    NEW.email,
    'free'
  )
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
