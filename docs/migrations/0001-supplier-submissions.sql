-- =====================================================================
-- Migration: supplier_submissions table
--
-- Stores public supplier suggestions submitted via /suppliers/suggest.
-- Each row is a moderation queue item — admin reviews and either
-- approves (which inserts into the live `suppliers` table) or rejects.
--
-- Run once in Supabase SQL Editor. Safe to re-run: uses IF NOT EXISTS.
-- =====================================================================

CREATE TABLE IF NOT EXISTS public.supplier_submissions (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name            TEXT NOT NULL,
  website         TEXT,
  city            TEXT,
  province        TEXT,
  specialties     TEXT,
  notes           TEXT,
  submitter_email TEXT,
  is_customer     BOOLEAN NOT NULL DEFAULT FALSE,

  -- Moderation
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending', 'approved', 'rejected', 'duplicate')),
  reviewer_notes  TEXT,
  reviewed_at     TIMESTAMPTZ,
  reviewed_by     UUID REFERENCES auth.users(id) ON DELETE SET NULL,

  -- Linkback when approved → live supplier
  promoted_supplier_id UUID REFERENCES public.suppliers(id) ON DELETE SET NULL,

  -- Audit
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS supplier_submissions_status_idx
  ON public.supplier_submissions (status, created_at DESC);

CREATE INDEX IF NOT EXISTS supplier_submissions_email_idx
  ON public.supplier_submissions (submitter_email);

-- =====================================================================
-- RLS — only admins can read/update; anyone can INSERT (public form).
-- The admin allowlist is enforced in app code (lib/auth/require-admin),
-- so RLS here is intentionally simple: no SELECT for anon, INSERT-only.
-- =====================================================================

ALTER TABLE public.supplier_submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS supplier_submissions_insert_anyone ON public.supplier_submissions;
CREATE POLICY supplier_submissions_insert_anyone
  ON public.supplier_submissions
  FOR INSERT
  WITH CHECK (true);

-- Authenticated users can SELECT their own submissions (so the form can
-- show "you already submitted this" if they retry). Admin moderation
-- queries run with the service role and bypass RLS.
DROP POLICY IF EXISTS supplier_submissions_select_own ON public.supplier_submissions;
CREATE POLICY supplier_submissions_select_own
  ON public.supplier_submissions
  FOR SELECT
  USING (auth.uid() = user_id);

-- =====================================================================
-- Trigger: bump updated_at on UPDATE
-- =====================================================================

CREATE OR REPLACE FUNCTION public.touch_supplier_submissions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS supplier_submissions_touch ON public.supplier_submissions;
CREATE TRIGGER supplier_submissions_touch
  BEFORE UPDATE ON public.supplier_submissions
  FOR EACH ROW
  EXECUTE FUNCTION public.touch_supplier_submissions_updated_at();

-- =====================================================================
-- Verification
-- =====================================================================
-- After running:
--   SELECT count(*) FROM public.supplier_submissions; -- 0
--   \d public.supplier_submissions                     -- columns + triggers
-- =====================================================================
