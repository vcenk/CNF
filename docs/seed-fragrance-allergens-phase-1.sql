-- =====================================================================
-- Phase 1 Fragrance Allergen Seed (24 allergens)
--
-- Required for Canadian cosmetic disclosure since April 12, 2026 per
-- SOR/2024-63 (amending the Cosmetic Regulations C.R.C., c. 869).
-- The Canadian regulation defers to the EU Restricted Substances List
-- (Annex III items 67-92) for the actual list. Both CAS numbers and
-- INCI names below are taken from EU Regulation 1223/2009 Annex III as
-- of April 30, 2026.
--
-- VERIFICATION CHECKLIST before running:
--   1. Open the canada.ca Hotlist page and confirm none of these are
--      ALSO marked prohibited (would require a different INSERT shape):
--      https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html
--   2. Cross-check CAS numbers via PubChem:
--      https://pubchem.ncbi.nlm.nih.gov/
--   3. After running, re-check the count:
--        SELECT COUNT(*) FROM public.ingredients WHERE is_fragrance_allergen;
--      Should be at least 24 (more if you've already added some).
--
-- This is an UPSERT — it inserts missing allergens and flags existing
-- ones that aren't yet marked. Safe to re-run.
-- =====================================================================

-- Helper: each entry uses the same description shape so we can audit later.
DO $$
DECLARE
  source_note TEXT := ' This ingredient is a fragrance allergen recognized by Health Canada under SOR/2024-63 (effective 2024-10-09), which defers to EU Restricted Substances List Annex III. Required individual disclosure on Canadian cosmetic labels and CNF filings above 0.001% in leave-on products or 0.01% in rinse-off products since April 12, 2026.';
BEGIN

-- 1. Amyl cinnamal
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Amyl Cinnamal', 'Amyl cinnamal', '122-40-7', 'not_listed', TRUE,
   'Synthetic floral fragrance compound. ' || source_note, 'amyl-cinnamal')
ON CONFLICT (inci_name) DO UPDATE
  SET is_fragrance_allergen = TRUE,
      cas_number = COALESCE(EXCLUDED.cas_number, public.ingredients.cas_number),
      updated_at = NOW();

-- 2. Amylcinnamyl alcohol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Amylcinnamyl Alcohol', 'Amylcinnamyl alcohol', '101-85-9', 'not_listed', TRUE,
   'Synthetic floral fragrance alcohol. ' || source_note, 'amylcinnamyl-alcohol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 3. Anise alcohol (Anisyl alcohol)
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Anise Alcohol', 'Anisyl alcohol', '105-13-5', 'not_listed', TRUE,
   'Naturally occurring in anise and vanilla. ' || source_note, 'anise-alcohol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 4. Benzyl alcohol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Benzyl Alcohol', 'Benzyl alcohol', '100-51-6', 'not_listed', TRUE,
   'Naturally occurring in jasmine, ylang ylang, and balsam essential oils. Also used as a preservative; in that context it is exempt from allergen labelling. ' || source_note, 'benzyl-alcohol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 5. Benzyl benzoate
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Benzyl Benzoate', 'Benzyl benzoate', '120-51-4', 'not_listed', TRUE,
   'Found in tolu balsam, ylang ylang, and Peru balsam. ' || source_note, 'benzyl-benzoate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 6. Benzyl cinnamate
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Benzyl Cinnamate', 'Benzyl cinnamate', '103-41-3', 'not_listed', TRUE,
   'Found in Peru balsam and tolu balsam. ' || source_note, 'benzyl-cinnamate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 7. Benzyl salicylate
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Benzyl Salicylate', 'Benzyl salicylate', '118-58-1', 'not_listed', TRUE,
   'Synthetic floral fragrance and natural component of jasmine and ylang ylang. ' || source_note, 'benzyl-salicylate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 8. Cinnamal (Cinnamaldehyde)
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Cinnamal', 'Cinnamaldehyde', '104-55-2', 'not_listed', TRUE,
   'Primary aroma compound in cinnamon bark essential oil. ' || source_note, 'cinnamal')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 9. Cinnamyl alcohol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Cinnamyl Alcohol', 'Cinnamyl alcohol', '104-54-1', 'not_listed', TRUE,
   'Found in storax, balsam Peru, and cinnamon. ' || source_note, 'cinnamyl-alcohol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 10. Citral
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Citral', 'Citral', '5392-40-5', 'not_listed', TRUE,
   'Mixture of geranial and neral. Major component of lemongrass, lemon verbena, and may chang essential oils. ' || source_note, 'citral')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 11. Citronellol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Citronellol', 'Citronellol', '106-22-9', 'not_listed', TRUE,
   'Naturally occurring in rose, geranium, and citronella essential oils. ' || source_note, 'citronellol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 12. Coumarin
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Coumarin', 'Coumarin', '91-64-5', 'not_listed', TRUE,
   'Found in tonka bean, lavender, sweet woodruff, and sweetgrass. ' || source_note, 'coumarin')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 13. Eugenol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Eugenol', 'Eugenol', '97-53-0', 'not_listed', TRUE,
   'Primary aroma compound in clove bud, cinnamon leaf, and basil. ' || source_note, 'eugenol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 14. Farnesol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Farnesol', 'Farnesol', '4602-84-0', 'not_listed', TRUE,
   'Found in ylang ylang, neroli, jasmine, and tuberose. ' || source_note, 'farnesol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 15. Geraniol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Geraniol', 'Geraniol', '106-24-1', 'not_listed', TRUE,
   'Major component of rose, geranium, and palmarosa essential oils. ' || source_note, 'geraniol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 16. Hexyl cinnamal
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Hexyl Cinnamal', 'Hexyl cinnamal', '101-86-0', 'not_listed', TRUE,
   'Synthetic jasmine-like fragrance compound. ' || source_note, 'hexyl-cinnamal')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 17. Hydroxycitronellal
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Hydroxycitronellal', 'Hydroxycitronellal', '107-75-5', 'not_listed', TRUE,
   'Synthetic lily-of-the-valley note. ' || source_note, 'hydroxycitronellal')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 18. Isoeugenol
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Isoeugenol', 'Isoeugenol', '97-54-1', 'not_listed', TRUE,
   'Found in clove leaf and ylang ylang. ' || source_note, 'isoeugenol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 19. Limonene
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Limonene', 'Limonene (d-)', '5989-27-5', 'not_listed', TRUE,
   'Major component of citrus essential oils (lemon, orange, grapefruit, bergamot). The d-limonene CAS is most common in cosmetics; l-limonene CAS 5989-54-8 is rarer. ' || source_note, 'limonene')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 20. Linalool
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Linalool', 'Linalool', '78-70-6', 'not_listed', TRUE,
   'Major component of lavender, coriander, rosewood, and ylang ylang. ' || source_note, 'linalool')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 21. Methyl 2-octynoate (Methyl heptine carbonate)
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Methyl 2-Octynoate', 'Methyl heptine carbonate', '111-12-6', 'not_listed', TRUE,
   'Synthetic green-violet note. ' || source_note, 'methyl-2-octynoate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 22. alpha-Isomethyl ionone
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Alpha-Isomethyl Ionone', 'alpha-Isomethyl ionone', '127-51-5', 'not_listed', TRUE,
   'Synthetic violet/iris fragrance compound. ' || source_note, 'alpha-isomethyl-ionone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 23. Evernia furfuracea (Treemoss) extract
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Evernia Furfuracea (Treemoss) Extract', 'Treemoss extract', '90028-67-4', 'not_listed', TRUE,
   'Lichen extract used in fragrance compositions for woody/earthy notes. ' || source_note, 'evernia-furfuracea-treemoss-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 24. Evernia prunastri (Oakmoss) extract
INSERT INTO public.ingredients
  (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES
  ('Evernia Prunastri (Oakmoss) Extract', 'Oakmoss extract', '90028-68-5', 'not_listed', TRUE,
   'Lichen extract used in fragrance compositions for chypre and forest notes. ' || source_note, 'evernia-prunastri-oakmoss-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

END $$;

-- Verify the result:
SELECT inci_name, cas_number, is_fragrance_allergen, hotlist_status
FROM public.ingredients
WHERE is_fragrance_allergen = TRUE
ORDER BY inci_name;
