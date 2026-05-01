# Ingredient Data Audit & Verification Plan

How to assess the correctness of the data in `public.ingredients` and
keep it trustworthy over time. Read [`docs/SOURCING.md`](./SOURCING.md)
first for the source-of-truth approach.

## Honest baseline

The data was seeded from `docs/cosmetic-ingredient-database.json` —
which was itself "compiled from multiple secondary regulatory sources
and may not be 100% complete." We have no automated proof that any
single ingredient row is canonically correct against canada.ca right
now. The site's disclaimer wording reflects this:

> Always verify against the current Health Canada Cosmetic Ingredient
> Hotlist before sale or notification.

This audit does not change that disclaimer — but it does let you
identify and fix the riskiest discrepancies first.

## Risk ranking — where errors hurt the most

| Risk | Impact if wrong | Audit priority |
|---|---|---|
| `hotlist_status = 'prohibited'` is wrong | Maker uses an actually-prohibited ingredient OR doesn't use a safe one | **HIGH** |
| `hotlist_status = 'restricted'` + `hotlist_max_concentration` is wrong | Maker exceeds a real limit | **HIGH** |
| `is_fragrance_allergen` is missing for an actual allergen | Maker fails to disclose on label and CNF | **HIGH** |
| `inci_name` spelling differs from PCPC convention | Label looks unprofessional, may not match supplier docs | Medium |
| `cas_number` wrong | Confuses cross-references but not directly regulatory | Medium |
| `description` outdated or vague | Maker misunderstands ingredient | Low |
| Common name differs from supplier convention | Maker can't find the ingredient via search | Low |

## Run these audit queries in Supabase SQL Editor

### 1. Count by status — sanity check

```sql
SELECT
  hotlist_status,
  COUNT(*) AS rows,
  COUNT(*) FILTER (WHERE is_fragrance_allergen) AS also_fragrance_allergen
FROM public.ingredients
GROUP BY hotlist_status
ORDER BY hotlist_status;
```

Health Canada Hotlist has ~500 entries (prohibited + restricted
combined). If the sum of `prohibited + restricted` in your DB is far
below 500, expect gaps when a maker pastes a recipe into the CNF
Readiness Checker.

### 2. Find prohibited entries with no concentration / conditions data

These are the highest-risk rows — flagged as prohibited but with thin
context. Spot-check each against the canada.ca Hotlist page.

```sql
SELECT inci_name, common_name, cas_number, hotlist_conditions
FROM public.ingredients
WHERE hotlist_status = 'prohibited'
  AND (hotlist_conditions IS NULL OR LENGTH(TRIM(hotlist_conditions)) < 20)
ORDER BY inci_name;
```

### 3. Find restricted entries with NO concentration limit

Restricted means "OK only under conditions" — usually a max %.
Restricted-without-limit rows are probably mis-categorised.

```sql
SELECT inci_name, common_name, hotlist_max_concentration, hotlist_conditions
FROM public.ingredients
WHERE hotlist_status = 'restricted'
  AND hotlist_max_concentration IS NULL
ORDER BY inci_name;
```

### 4. Check the 24 Phase 1 fragrance allergens are all in DB

```sql
WITH expected(name) AS (VALUES
  ('amyl cinnamal'), ('amylcinnamyl alcohol'),
  ('anise alcohol'), ('benzyl alcohol'),
  ('benzyl benzoate'), ('benzyl cinnamate'),
  ('benzyl salicylate'), ('cinnamal'),
  ('cinnamyl alcohol'), ('citral'),
  ('citronellol'), ('coumarin'),
  ('eugenol'), ('farnesol'),
  ('geraniol'), ('hexyl cinnamal'),
  ('hydroxycitronellal'), ('isoeugenol'),
  ('limonene'), ('linalool'),
  ('methyl 2-octynoate'), ('alpha-isomethyl ionone'),
  ('evernia furfuracea (treemoss) extract'),
  ('evernia prunastri (oakmoss) extract')
)
SELECT
  e.name AS expected_inci,
  CASE WHEN i.id IS NULL THEN '❌ MISSING'
       WHEN NOT i.is_fragrance_allergen THEN '⚠️ in DB but flag is FALSE'
       ELSE '✅ ok'
  END AS status,
  i.cas_number
FROM expected e
LEFT JOIN public.ingredients i
  ON LOWER(i.inci_name) = e.name
ORDER BY status DESC, e.name;
```

Anything marked `MISSING` or `flag is FALSE` needs to be added/updated.
Run [`docs/seed-fragrance-allergens-phase-1.sql`](./seed-fragrance-allergens-phase-1.sql)
to fix in one go.

### 5. INCI naming convention check — common slip-ups

INCI names follow specific casing and spacing conventions. These
queries surface likely problems.

```sql
-- Names containing reserved characters that shouldn't appear
SELECT inci_name FROM public.ingredients
WHERE inci_name ~ '[*®©™@]'
ORDER BY inci_name;

-- Plant ingredients without the genus-species pattern (common for botanicals)
SELECT inci_name FROM public.ingredients
WHERE LOWER(inci_name) ~ '(oil|extract|butter|water|powder)$'
  AND inci_name !~ '\(' -- no parenthetical common name
ORDER BY inci_name
LIMIT 30;

-- Names with double-spaces or trailing whitespace
SELECT id, inci_name FROM public.ingredients
WHERE inci_name LIKE '%  %' OR inci_name <> TRIM(inci_name)
ORDER BY inci_name;
```

### 6. CAS number format check

Valid CAS numbers follow `XXXXXX-XX-X` (1–7 digits, dash, 2 digits,
dash, 1 digit) and pass a checksum. We can't validate the checksum in
plain SQL but we can flag malformed ones.

```sql
-- CAS numbers that don't match the basic format
SELECT inci_name, cas_number
FROM public.ingredients
WHERE cas_number IS NOT NULL
  AND cas_number !~ '^[0-9]{1,7}-[0-9]{2}-[0-9]$'
ORDER BY inci_name;
```

### 7. Duplicates by INCI

```sql
SELECT inci_name, COUNT(*) AS rows
FROM public.ingredients
GROUP BY inci_name
HAVING COUNT(*) > 1;
```

Should return 0 rows since `inci_name` has a unique constraint, but
worth confirming.

### 8. Slug consistency

```sql
SELECT inci_name, slug
FROM public.ingredients
WHERE slug ~ '[A-Z]'
   OR slug LIKE '%--%'
   OR slug LIKE '-%' OR slug LIKE '%-'
ORDER BY inci_name;
```

Slugs should be lowercase, single-hyphen-separated, no leading/trailing
hyphens. Bad slugs break the `/ingredients/[slug]` URL.

## Add `last_verified_at` for trackability (one-time migration)

The `ingredients` table currently has no field tracking when each row
was last cross-referenced against the official source. Recommended
schema addition:

```sql
ALTER TABLE public.ingredients
  ADD COLUMN IF NOT EXISTS last_verified_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS verified_source TEXT,
  ADD COLUMN IF NOT EXISTS verified_by TEXT;

-- Backfill the Phase 1 fragrance allergens we just verified:
UPDATE public.ingredients
SET last_verified_at = NOW(),
    verified_source = 'EU Reg 1223/2009 Annex III items 67-92 (per Canada SOR/2024-63 Section 21.4)',
    verified_by = 'manual:claude-session:2026-04-30'
WHERE LOWER(inci_name) IN (
  'amyl cinnamal', 'amylcinnamyl alcohol', 'anise alcohol',
  'benzyl alcohol', 'benzyl benzoate', 'benzyl cinnamate',
  'benzyl salicylate', 'cinnamal', 'cinnamyl alcohol', 'citral',
  'citronellol', 'coumarin', 'eugenol', 'farnesol', 'geraniol',
  'hexyl cinnamal', 'hydroxycitronellal', 'isoeugenol', 'limonene',
  'linalool', 'methyl 2-octynoate', 'alpha-isomethyl ionone',
  'evernia furfuracea (treemoss) extract',
  'evernia prunastri (oakmoss) extract'
);
```

Once the column exists, surface a "Last verified" date next to
hotlist/allergen badges in the UI so visitors and makers can see
provenance at a glance.

## Quarterly verification routine

Calendar reminder for the start of each quarter:

1. **Re-pull the canada.ca Hotlist page in a browser.** Compare entry
   count against your DB.
2. **Re-check** any entries Health Canada flagged as recently changed
   (the page shows last-updated dates per entry).
3. **Run the audit queries above.** Surface any new mismatches.
4. **Apply fixes** in a `seed-yyyy-mm-dd.sql` file and commit it to
   docs/ for audit trail.
5. **Bump `last_verified_at`** for every row that's still accurate.

## Confidence calibration — what we can/can't claim

| Claim | Can we make it? |
|---|---|
| "FormulaNorth has all 24 Phase 1 fragrance allergens" | ✅ Yes, if you run the Phase 1 seed SQL we just shipped |
| "FormulaNorth has every restricted ingredient on the Hotlist" | ❌ Not confidently — DB likely has a subset |
| "Each ingredient's hotlist status is canonical" | ❌ Not until each entry has a verified `last_verified_at` against canada.ca |
| "Our data prevents non-compliance" | ❌ The site says preparation support, not regulatory advice — keep it that way |
| "Our data flags the most common compliance pitfalls" | ✅ Yes for the curated 250 ingredients indie makers actually use |

Match marketing copy to what's actually true.

## Honest user-facing copy on data limits

The `/data-sources` page should explain this. Quick check:

```bash
grep -l "data-sources" src/app
```

If the page doesn't already say "we don't auto-sync from canada.ca,
verify before relying on the data," consider adding it. Trust through
transparency, not through claiming false authority.

## When to expand the DB

Driven by feedback (per `docs/BACKLOG.md`):
- High-priority ingredients makers ask about in `user_feedback` where
  source = 'ingredients' or 'cnf-checker'
- Soap-specific ingredients from the soap-recipe library that aren't
  yet in the DB
- Phase 2 fragrance allergens (the 57 added Aug 2026) — write a Phase 2
  seed file when that's near
- Hotlist additions Health Canada announces (subscribe to their
  cosmetic newsletter at canada.ca to catch these)
