-- =====================================================================
-- Migration: add preferred_unit column to formulas
--
-- Lets formulators work in weight (g, oz, lb) while the database keeps
-- canonical % storage for regulatory / CNF / INCI ordering needs.
--
-- Default is 'percent' so existing formulas behave exactly as before.
-- The user toggles per-formula via the formula header.
--
-- Safe to re-run.
-- =====================================================================

ALTER TABLE public.formulas
  ADD COLUMN IF NOT EXISTS preferred_unit TEXT NOT NULL DEFAULT 'percent';

-- Constrain to the four supported values.
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conname = 'formulas_preferred_unit_check'
  ) THEN
    ALTER TABLE public.formulas
      ADD CONSTRAINT formulas_preferred_unit_check
      CHECK (preferred_unit IN ('percent', 'g', 'oz', 'lb'));
  END IF;
END $$;

-- Verification
--   SELECT preferred_unit, count(*)
--   FROM public.formulas
--   GROUP BY preferred_unit;
--   -- Expect every existing formula to be 'percent'.
