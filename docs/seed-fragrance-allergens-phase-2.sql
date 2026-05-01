-- =====================================================================
-- Phase 2 Fragrance Allergen Seed (the 57 added by EU 2023/1545)
--
-- Required for Canadian cosmetic disclosure on:
--   - newly-introduced products from August 1, 2026
--   - ALL products on the Canadian market from August 1, 2028
--
-- Legal basis: Section 21.4 of the Canadian Cosmetic Regulations
-- (SOR/2024-63) defers to the EU Restricted Substances List (Annex III
-- of EU Regulation 1223/2009), which was expanded from 24 to 81
-- fragrance allergens by EU Regulation (EC) 2023/1545 (published
-- 2023-07-26). This seed covers the 57 additions made by 2023/1545.
--
-- Disclosure thresholds (unchanged from Phase 1):
--   - Leave-on products:  > 0.001% (10 ppm)
--   - Rinse-off products: > 0.01%  (100 ppm)
--
-- VERIFICATION CHECKLIST before running:
--   1. Cross-check INCI names against the live EU Annex III:
--      https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R1223
--   2. Cross-check CAS numbers via PubChem:
--      https://pubchem.ncbi.nlm.nih.gov/
--   3. Confirm none are also restricted/prohibited on the Hotlist:
--      https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html
--   4. After running:
--        SELECT COUNT(*) FROM public.ingredients WHERE is_fragrance_allergen;
--      Should be approximately 24 (Phase 1) + 57 (Phase 2) = 81.
--
-- Safe to re-run — all INSERTs use ON CONFLICT DO UPDATE.
-- =====================================================================

DO $$
DECLARE
  effective_note TEXT := ' Required individual disclosure on Canadian cosmetic labels and CNF filings above 0.001% (leave-on) or 0.01% (rinse-off): for newly-introduced products from August 1, 2026, and for ALL products on the Canadian market from August 1, 2028. Legal basis: Section 21.4 of the Canadian Cosmetic Regulations (SOR/2024-63), which defers to EU Annex III of Regulation 1223/2009 as amended by EU Regulation 2023/1545.';
BEGIN

-- =====================================================================
-- SINGLE-COMPOUND ADDITIONS (synthetic and isolated naturals)
-- =====================================================================

-- 1. Acetylcedrene
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Acetylcedrene', 'Acetylcedrene', '32388-55-9', 'not_listed', TRUE,
  'Synthetic woody fragrance. Common in cedarwood-style accords.' || effective_note, 'acetylcedrene')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 2. Amyl salicylate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Amyl Salicylate', 'Amyl salicylate', '2050-08-0', 'not_listed', TRUE,
  'Synthetic floral salicylate. Used in herbaceous and lily-of-the-valley accords.' || effective_note, 'amyl-salicylate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 3. Anethole
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Anethole', 'trans-Anethole', '4180-23-8', 'not_listed', TRUE,
  'Naturally occurring in anise, fennel, and star anise essential oils.' || effective_note, 'anethole')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 4. Benzaldehyde
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Benzaldehyde', 'Benzaldehyde', '100-52-7', 'not_listed', TRUE,
  'Naturally occurring in bitter almond, cherry, and stone-fruit notes.' || effective_note, 'benzaldehyde')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 5. Camphor
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Camphor', 'Camphor', '76-22-2', 'not_listed', TRUE,
  'Naturally occurring in camphor laurel, rosemary, and lavandin. Also synthesized.' || effective_note, 'camphor')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 6. Carvone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Carvone', 'Carvone', '99-49-0', 'not_listed', TRUE,
  'Naturally occurring in spearmint, caraway, and dill. Two enantiomers (l- and d-) smell distinctly different.' || effective_note, 'carvone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 7. beta-Caryophyllene
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Beta-Caryophyllene', 'beta-Caryophyllene', '87-44-5', 'not_listed', TRUE,
  'Sesquiterpene naturally occurring in clove, black pepper, hops, and cannabis.' || effective_note, 'beta-caryophyllene')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 8. Cedrol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cedrol', 'Cedrol', '77-53-2', 'not_listed', TRUE,
  'Sesquiterpene alcohol from cedarwood (Atlas, Virginia, Texas).' || effective_note, 'cedrol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 9. Cinnamyl acetate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cinnamyl Acetate', 'Cinnamyl acetate', '103-54-8', 'not_listed', TRUE,
  'Acetate ester of cinnamyl alcohol. Sweet floral-cinnamon note.' || effective_note, 'cinnamyl-acetate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 10. Citronellal
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citronellal', 'Citronellal', '106-23-0', 'not_listed', TRUE,
  'Aldehyde naturally abundant in citronella, lemongrass, and lemon eucalyptus.' || effective_note, 'citronellal')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 11. alpha-Damascone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Alpha-Damascone', 'alpha-Damascone (TMCHB)', '24720-09-0', 'not_listed', TRUE,
  'Rose-ketone fragrance compound. Used to recreate damascena rose facets.' || effective_note, 'alpha-damascone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 12. cis-beta-Damascone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cis-Beta-Damascone', 'cis-beta-Damascone', '23726-92-3', 'not_listed', TRUE,
  'Rose-ketone fragrance compound.' || effective_note, 'cis-beta-damascone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 13. trans-beta-Damascone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Trans-Beta-Damascone', 'trans-beta-Damascone', '23726-91-2', 'not_listed', TRUE,
  'Rose-ketone fragrance compound.' || effective_note, 'trans-beta-damascone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 14. delta-Damascone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Delta-Damascone', 'delta-Damascone', '57378-68-4', 'not_listed', TRUE,
  'Rose-ketone fragrance compound.' || effective_note, 'delta-damascone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 15. Damascenone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Damascenone', 'Damascenone (rose ketone-4)', '23696-85-7', 'not_listed', TRUE,
  'Rose-ketone fragrance compound. Naturally occurring in rose otto and Bulgarian rose.' || effective_note, 'damascenone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 16. Dihydromyrcenol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Dihydromyrcenol', 'Dihydromyrcenol', '18479-58-8', 'not_listed', TRUE,
  'Synthetic terpenoid alcohol with a fresh citrus-lavender note. Heavy use in fougere and aquatic accords.' || effective_note, 'dihydromyrcenol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 17. 2,4-Dimethyl-3-cyclohexene-1-carbaldehyde (Vertocitral / Triplal)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Dimethyl-Cyclohexene Carboxaldehyde', '2,4-Dimethyl-3-cyclohexene-1-carbaldehyde (Vertocitral)', '68039-49-6', 'not_listed', TRUE,
  'Synthetic green-citrus aldehyde.' || effective_note, 'dimethyl-cyclohexene-carboxaldehyde')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 18. Geranyl acetate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Geranyl Acetate', 'Geranyl acetate', '105-87-3', 'not_listed', TRUE,
  'Acetate ester naturally occurring in palmarosa, geranium, and rose oils.' || effective_note, 'geranyl-acetate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 19. Hexadecanolactone
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Hexadecanolactone', 'Hexadecanolactone', '109-29-5', 'not_listed', TRUE,
  'Macrocyclic musk lactone.' || effective_note, 'hexadecanolactone')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 20. Hexamethylindanopyran
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Hexamethylindanopyran', 'Hexamethylindanopyran (Galaxolidone)', '1222-05-5', 'not_listed', TRUE,
  'Polycyclic synthetic musk. Widely used base note.' || effective_note, 'hexamethylindanopyran')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 21. (E)-Hex-3-en-1-ol / Hex-3-en-1-ol — leaf alcohol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Hex-3-En-1-Ol', 'cis-3-Hexenol (Leaf alcohol)', '928-96-1', 'not_listed', TRUE,
  '"Cut grass" / fresh-green note. Naturally occurring in many leaves and herbs.' || effective_note, 'hex-3-en-1-ol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 22. Hexyl salicylate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Hexyl Salicylate', 'Hexyl salicylate', '6259-76-3', 'not_listed', TRUE,
  'Floral-herbaceous salicylate. Sun protection co-factor in some formulas.' || effective_note, 'hexyl-salicylate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 23. Linalyl acetate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Linalyl Acetate', 'Linalyl acetate', '115-95-7', 'not_listed', TRUE,
  'Acetate ester of linalool. Major component of bergamot, lavender, clary sage, and petitgrain oils.' || effective_note, 'linalyl-acetate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 24. Menthol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Menthol', 'Menthol', '1490-04-6', 'not_listed', TRUE,
  'Naturally occurring in peppermint, spearmint, and other Mentha species.' || effective_note, 'menthol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 25. Methyl salicylate
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Methyl Salicylate', 'Methyl salicylate', '119-36-8', 'not_listed', TRUE,
  'Naturally occurring in wintergreen, sweet birch, and meadowsweet.' || effective_note, 'methyl-salicylate')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 26. 3-Methyl-5-(2,2,3-trimethyl-3-cyclopentenyl)pent-4-en-2-ol (Sandalore)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Trimethyl Cyclopentenyl Pentenol', '3-Methyl-5-(2,2,3-trimethyl-3-cyclopentenyl)pent-4-en-2-ol (Sandalore)', '67801-20-1', 'not_listed', TRUE,
  'Synthetic sandalwood substitute.' || effective_note, 'trimethyl-cyclopentenyl-pentenol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 27. alpha-Pinene
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Alpha-Pinene', 'alpha-Pinene', '80-56-8', 'not_listed', TRUE,
  'Monoterpene naturally abundant in pine, fir, frankincense, and rosemary essential oils.' || effective_note, 'alpha-pinene')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 28. beta-Pinene
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Beta-Pinene', 'beta-Pinene', '127-91-3', 'not_listed', TRUE,
  'Monoterpene naturally abundant in pine, fir, juniper, and many conifer essential oils.' || effective_note, 'beta-pinene')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 29. Salicylaldehyde
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Salicylaldehyde', 'Salicylaldehyde', '90-02-8', 'not_listed', TRUE,
  'Floral-spicy aldehyde. Naturally occurring in some plant essential oils.' || effective_note, 'salicylaldehyde')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 30. alpha-Santalol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Alpha-Santalol', 'alpha-Santalol', '115-71-9', 'not_listed', TRUE,
  'Major sesquiterpene alcohol of sandalwood (Santalum album).' || effective_note, 'alpha-santalol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 31. beta-Santalol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Beta-Santalol', 'beta-Santalol', '77-42-9', 'not_listed', TRUE,
  'Sesquiterpene alcohol of sandalwood.' || effective_note, 'beta-santalol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 32. Sclareol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Sclareol', 'Sclareol', '515-03-7', 'not_listed', TRUE,
  'Diterpene alcohol from clary sage (Salvia sclarea).' || effective_note, 'sclareol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 33. Terpineol
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Terpineol', 'Terpineol (alpha-, beta-, gamma- mixture)', '8000-41-7', 'not_listed', TRUE,
  'Monoterpene alcohol naturally occurring in tea tree, pine, eucalyptus, and many other essential oils.' || effective_note, 'terpineol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 34. Tetramethyl acetyloctahydronaphthalenes (Iso E Super and isomers)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Tetramethyl Acetyloctahydronaphthalenes', 'Tetramethyl acetyloctahydronaphthalenes (Iso E Super)', '54464-57-2', 'not_listed', TRUE,
  'Synthetic woody-amber base note. One of the most-used materials in modern perfumery.' || effective_note, 'tetramethyl-acetyloctahydronaphthalenes')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 35. Trimethylbenzenepropanol (Majantol)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Trimethylbenzenepropanol', 'Trimethylbenzenepropanol (Majantol)', '103694-68-4', 'not_listed', TRUE,
  'Synthetic floral muguet (lily-of-the-valley) note.' || effective_note, 'trimethylbenzenepropanol')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 36. Vanillin
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Vanillin', 'Vanillin', '121-33-5', 'not_listed', TRUE,
  'Naturally occurring in vanilla pods, balsam Peru, and tonka. Most often synthesized for fragrance use.' || effective_note, 'vanillin')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- =====================================================================
-- NATURAL EXTRACTS / ESSENTIAL OILS
--
-- These are listed by INCI name (Latin binomial + plant part + extract
-- type) per EU Annex III. Each is grouped because it contains multiple
-- of the constituent allergens above the disclosure threshold.
-- =====================================================================

-- 37. Cananga odorata oil — Ylang Ylang
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cananga Odorata Flower Oil', 'Ylang Ylang Oil', '8006-81-3', 'not_listed', TRUE,
  'Yellow-flower tropical fragrance. Contains benzyl benzoate, benzyl salicylate, eugenol, geraniol, linalool.' || effective_note, 'cananga-odorata-flower-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 38. Cedrus atlantica bark oil — Atlas cedarwood
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cedrus Atlantica Bark Oil', 'Atlas Cedarwood Oil', '8000-27-9', 'not_listed', TRUE,
  'Woody base note from the Atlas cedar. Major component cedrol.' || effective_note, 'cedrus-atlantica-bark-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 39. Cinnamomum cassia leaf oil — Cassia
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cinnamomum Cassia Leaf Oil', 'Cassia Oil', '8007-80-5', 'not_listed', TRUE,
  'Spicy cinnamon-like oil. High in cinnamal — significant skin sensitization risk.' || effective_note, 'cinnamomum-cassia-leaf-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 40. Cinnamomum zeylanicum bark oil — Cinnamon bark
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cinnamomum Zeylanicum Bark Oil', 'Cinnamon Bark Oil', '8015-91-6', 'not_listed', TRUE,
  'Cinnamon spice oil. Contains cinnamal and eugenol — strong sensitizers.' || effective_note, 'cinnamomum-zeylanicum-bark-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 41. Citrus aurantium amara flower oil — Neroli
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citrus Aurantium Amara Flower Oil', 'Neroli Oil', '8016-38-4', 'not_listed', TRUE,
  'Bitter orange flower oil. Contains linalool, linalyl acetate, geraniol.' || effective_note, 'citrus-aurantium-amara-flower-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 42. Citrus aurantium amara peel oil — Bitter orange peel
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citrus Aurantium Amara Peel Oil', 'Bitter Orange Peel Oil', '72968-50-4', 'not_listed', TRUE,
  'Cold-pressed bitter orange peel. High in limonene.' || effective_note, 'citrus-aurantium-amara-peel-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 43. Citrus aurantium bergamia peel oil — Bergamot (already in restricted list, but also a fragrance allergen entry)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citrus Aurantium Bergamia (Bergamot) Fruit Oil', 'Bergamot Oil', '8007-75-8', 'restricted', TRUE,
  'Bergamot peel oil. High in limonene, linalool, linalyl acetate. Also subject to FCF (furocoumarin-free) restriction for skin contact.' || effective_note, 'citrus-aurantium-bergamia-bergamot-fruit-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 44. Citrus limon peel oil — Lemon
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citrus Limon Peel Oil', 'Lemon Peel Oil', '84929-31-7', 'not_listed', TRUE,
  'Cold-pressed lemon peel oil. Very high in limonene plus citral. Phototoxic — use FCF for leave-on.' || effective_note, 'citrus-limon-peel-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 45. Citrus sinensis peel oil — Sweet orange
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Citrus Sinensis Peel Oil', 'Sweet Orange Peel Oil', '8028-48-6', 'not_listed', TRUE,
  'Cold-pressed sweet orange peel oil. ~95% limonene.' || effective_note, 'citrus-sinensis-peel-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 46. Cymbopogon (lemongrass / citronella group)
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cymbopogon Citratus Oil', 'Lemongrass Oil', '8007-02-1', 'not_listed', TRUE,
  'Lemongrass essential oil. Very high in citral — significant sensitization risk above the disclosure threshold.' || effective_note, 'cymbopogon-citratus-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cymbopogon Nardus Oil', 'Citronella Oil (Ceylon)', '8000-29-1', 'not_listed', TRUE,
  'Citronella essential oil. High in citronellal, geraniol, and citronellol.' || effective_note, 'cymbopogon-nardus-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cymbopogon Schoenanthus Oil', 'Camel Grass Oil', '89998-16-3', 'not_listed', TRUE,
  'Cymbopogon schoenanthus essential oil. Contains piperitone and citronellol.' || effective_note, 'cymbopogon-schoenanthus-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 47. Eucalyptus globulus leaf oil — Eucalyptus
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Eucalyptus Globulus Leaf Oil', 'Eucalyptus Oil', '8000-48-4', 'not_listed', TRUE,
  'Eucalyptus essential oil. High in 1,8-cineole. Some allergen content via limonene and pinenes.' || effective_note, 'eucalyptus-globulus-leaf-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 48. Eugenia caryophyllus oil — Clove
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Eugenia Caryophyllus Leaf Oil', 'Clove Leaf Oil', '8000-34-8', 'not_listed', TRUE,
  'Clove essential oil. Up to 90% eugenol — strong sensitizer above threshold.' || effective_note, 'eugenia-caryophyllus-leaf-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 49. Jasminum grandiflorum extract — Jasmine
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Jasminum Grandiflorum Flower Extract', 'Jasmine Absolute (Spanish jasmine)', '84776-64-3', 'not_listed', TRUE,
  'Solvent-extracted jasmine absolute. Contains benzyl acetate, benzyl benzoate, linalool, isoeugenol.' || effective_note, 'jasminum-grandiflorum-flower-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Jasminum Officinale Flower Extract', 'Jasmine Absolute (common jasmine)', '84776-64-7', 'not_listed', TRUE,
  'Solvent-extracted jasmine absolute. Same allergen profile as Jasminum grandiflorum.' || effective_note, 'jasminum-officinale-flower-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 50. Juniperus virginiana — Virginian cedarwood
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Juniperus Virginiana Wood Oil', 'Virginia Cedarwood Oil', '8000-27-9', 'not_listed', TRUE,
  'Virginian cedarwood (also called Eastern Red Cedar). High in cedrol and thujopsene.' || effective_note, 'juniperus-virginiana-wood-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 51. Laurus nobilis leaf oil — Bay laurel
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Laurus Nobilis Leaf Oil', 'Bay Laurel Leaf Oil', '8002-41-3', 'not_listed', TRUE,
  'Bay laurel leaf essential oil. Contains 1,8-cineole, linalool, methyleugenol — multiple allergens above threshold.' || effective_note, 'laurus-nobilis-leaf-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 52. Lavandula hybrida — Lavandin
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Lavandula Hybrida Oil', 'Lavandin Oil', '91722-69-9', 'not_listed', TRUE,
  'Lavandin (lavender-aspic hybrid) essential oil. High in linalool, linalyl acetate, camphor.' || effective_note, 'lavandula-hybrida-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 53. Lavandula angustifolia / officinalis — True lavender
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Lavandula Angustifolia Oil', 'Lavender Oil (true lavender)', '8000-28-0', 'not_listed', TRUE,
  'True lavender essential oil. Contains linalool and linalyl acetate as major components.' || effective_note, 'lavandula-angustifolia-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 54. Mentha piperita — Peppermint
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Mentha Piperita Oil', 'Peppermint Oil', '8006-90-4', 'not_listed', TRUE,
  'Peppermint essential oil. High in menthol and menthone.' || effective_note, 'mentha-piperita-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 55. Mentha spicata — Spearmint
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Mentha Spicata Flower / Leaf / Stem Oil', 'Spearmint Oil', '84696-51-5', 'not_listed', TRUE,
  'Spearmint essential oil. High in carvone (~70%).' || effective_note, 'mentha-spicata-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 56. Narcissus extract
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Narcissus Poeticus Flower Extract', 'Narcissus / Daffodil Absolute', '90064-26-9', 'not_listed', TRUE,
  'Solvent-extracted narcissus absolute. Strong floral with multiple allergens.' || effective_note, 'narcissus-poeticus-flower-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 57. Pelargonium graveolens — Geranium
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Pelargonium Graveolens Flower Oil', 'Geranium Oil', '90082-51-2', 'not_listed', TRUE,
  'Geranium / rose geranium essential oil. High in citronellol, geraniol, linalool.' || effective_note, 'pelargonium-graveolens-flower-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 58. Pogostemon cablin — Patchouli
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Pogostemon Cablin Oil', 'Patchouli Oil', '8014-09-3', 'not_listed', TRUE,
  'Patchouli essential oil. High in patchoulol. Listed for known allergen content above threshold.' || effective_note, 'pogostemon-cablin-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 59. Rosa damascena flower oil — Rose
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Rosa Damascena Flower Oil', 'Damask Rose Oil (Rose otto)', '8007-01-0', 'not_listed', TRUE,
  'Steam-distilled damask rose essential oil. Contains citronellol, geraniol, nerol, eugenol — multiple allergens above threshold.' || effective_note, 'rosa-damascena-flower-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Rosa Damascena Flower Extract', 'Rose Absolute', '90106-38-0', 'not_listed', TRUE,
  'Solvent-extracted rose absolute. Same allergen profile as rose otto.' || effective_note, 'rosa-damascena-flower-extract')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 60. Santalum album — Sandalwood
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Santalum Album Oil', 'Sandalwood Oil', '8006-87-9', 'not_listed', TRUE,
  'East Indian sandalwood essential oil. High in alpha- and beta-santalol.' || effective_note, 'santalum-album-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 61. Tagetes — Marigold
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Tagetes Minuta Flower Oil', 'Tagetes / Marigold Oil', '8016-84-0', 'not_listed', TRUE,
  'Tagetes essential oil. Phototoxic and listed for sensitization.' || effective_note, 'tagetes-minuta-flower-oil')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

-- 62. Turpentine
INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Turpentine', 'Turpentine (Pine spp.)', '8006-64-2', 'not_listed', TRUE,
  'Distilled pine resin (Pinus spp.). High in alpha- and beta-pinene.' || effective_note, 'turpentine')
ON CONFLICT (inci_name) DO UPDATE SET is_fragrance_allergen = TRUE, updated_at = NOW();

END $$;

-- =====================================================================
-- VERIFICATION
-- =====================================================================
-- Run this after the DO block:
--
--   SELECT COUNT(*) FROM public.ingredients WHERE is_fragrance_allergen;
--
-- Expected: ~80-81 (Phase 1 = 24 + Phase 2 = ~57; small overlap if any
-- of the EOs were already seeded via the original ingredient JSON).
--
-- Inspect the additions:
--
--   SELECT inci_name, cas_number
--   FROM public.ingredients
--   WHERE is_fragrance_allergen
--     AND description LIKE '%August 1, 2026%'
--   ORDER BY inci_name;
-- =====================================================================
