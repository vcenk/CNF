-- =====================================================================
-- Migration: subscriptions table
--
-- Tracks Stripe subscription state per user. The webhook handler
-- (/api/billing/webhook) updates this on every subscription lifecycle
-- event. Application reads it (or the denormalized profiles.subscription_tier)
-- when checking what features the user can access.
--
-- One row per user maximum (enforced by user_id UNIQUE). When a user
-- cancels and re-subscribes, the same row is updated.
--
-- Safe to re-run.
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                  UUID NOT NULL UNIQUE REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Stripe identifiers
  stripe_customer_id       TEXT NOT NULL,
  stripe_subscription_id   TEXT NOT NULL UNIQUE,
  stripe_price_id          TEXT NOT NULL,

  -- Subscription state from Stripe
  status                   TEXT NOT NULL,
  -- 'trialing' | 'active' | 'past_due' | 'canceled' | 'unpaid' |
  -- 'incomplete' | 'incomplete_expired' | 'paused'

  tier                     TEXT NOT NULL DEFAULT 'maker',
  -- mirrors profiles.subscription_tier; redundant on purpose so we can
  -- recompute from the live Stripe record without re-querying

  interval                 TEXT NOT NULL,
  -- 'month' | 'year'

  current_period_start     TIMESTAMPTZ,
  current_period_end       TIMESTAMPTZ,
  cancel_at_period_end     BOOLEAN NOT NULL DEFAULT FALSE,
  canceled_at              TIMESTAMPTZ,
  trial_end                TIMESTAMPTZ,

  -- Audit
  created_at               TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at               TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS subscriptions_user_id_idx
  ON public.subscriptions (user_id);

CREATE INDEX IF NOT EXISTS subscriptions_stripe_customer_idx
  ON public.subscriptions (stripe_customer_id);

CREATE INDEX IF NOT EXISTS subscriptions_status_idx
  ON public.subscriptions (status);

-- ---------- updated_at trigger ----------------------------------------

CREATE OR REPLACE FUNCTION public.touch_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS subscriptions_touch ON public.subscriptions;
CREATE TRIGGER subscriptions_touch
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_subscriptions_updated_at();

-- ---------- RLS ------------------------------------------------------
-- Users can SELECT their own subscription. Webhook writes go through
-- service role and bypass RLS. No INSERT/UPDATE policies for end users
-- (subscription state is authoritative from Stripe, not the client).

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS subscriptions_select_own ON public.subscriptions;
CREATE POLICY subscriptions_select_own
  ON public.subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================================
-- Stripe customer ID on profiles (so we can find a returning user fast)
-- =====================================================================

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS stripe_customer_id TEXT;

CREATE INDEX IF NOT EXISTS profiles_stripe_customer_idx
  ON public.profiles (stripe_customer_id)
  WHERE stripe_customer_id IS NOT NULL;

-- =====================================================================
-- Verification
-- =====================================================================
--   SELECT column_name FROM information_schema.columns
--   WHERE table_schema='public' AND table_name='subscriptions'
--   ORDER BY ordinal_position;
--
--   SELECT column_name FROM information_schema.columns
--   WHERE table_schema='public' AND table_name='profiles'
--     AND column_name='stripe_customer_id';
-- =====================================================================
