-- =====================================================================
-- Phase 2 Seed: Hotlist PROHIBITED ingredients
--
-- Source: docs/cosmetic-ingredient-database.json (compiled from
-- multiple secondary regulatory references including Health Canada
-- Cosmetic Ingredient Hotlist, EU 1223/2009 Annex II, and CIR
-- assessments).
--
-- IMPORTANT: This list is COMPILED, not directly scraped from
-- canada.ca (which blocks automated fetches per docs/SOURCING.md).
-- Verify each entry against the live canada.ca Hotlist before
-- relying on it for regulatory decisions:
-- https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html
--
-- Safe to re-run — all INSERTs use ON CONFLICT DO UPDATE.
-- =====================================================================

DO $$
DECLARE
  source_note TEXT := ' Source: Health Canada Cosmetic Ingredient Hotlist (prohibited list), compiled from docs/cosmetic-ingredient-database.json. Verify against the live canada.ca Hotlist before relying on it.';
BEGIN

-- ============ Heavy metals ============

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Mercury', 'Mercury', 'prohibited', FALSE,
  'Mercury and its compounds are prohibited in Canadian cosmetics. Neurotoxin, bioaccumulation. Amended from restriction to prohibition under Health Canada''s mercury reduction strategy.' || source_note,
  'mercury')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Mercuric Oxide', 'Mercuric oxide', 'prohibited', FALSE,
  'Mercury compound. Prohibited in Canadian cosmetics under the mercury reduction strategy.' || source_note,
  'mercuric-oxide')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Phenyl Mercuric Acetate', 'Phenyl mercuric acetate', 'prohibited', FALSE,
  'Organic mercury compound. Prohibited in Canadian cosmetics.' || source_note,
  'phenyl-mercuric-acetate')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Phenyl Mercuric Benzoate', 'Phenyl mercuric benzoate', 'prohibited', FALSE,
  'Organic mercury compound. Prohibited in Canadian cosmetics.' || source_note,
  'phenyl-mercuric-benzoate')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Phenyl Mercuric Borate', 'Phenyl mercuric borate', 'prohibited', FALSE,
  'Organic mercury compound. Prohibited in Canadian cosmetics.' || source_note,
  'phenyl-mercuric-borate')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Thimerosal', 'Thimerosal', '54-64-8', 'prohibited', FALSE,
  'Mercury-containing preservative. Prohibited in Canadian cosmetics under the mercury reduction strategy.' || source_note,
  'thimerosal')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Lead', 'Lead', 'prohibited', FALSE,
  'Lead and lead compounds are prohibited as intentional cosmetic ingredients. Toxic heavy metal. Trace contaminants in raw materials are addressed separately under Health Canada guidance on heavy metal impurities.' || source_note,
  'lead')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Lead Acetate', 'Lead acetate', '6080-56-4', 'prohibited', FALSE,
  'Lead compound formerly used in hair-darkening products. Prohibited in Canadian cosmetics.' || source_note,
  'lead-acetate')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Antimony', 'Antimony', 'prohibited', FALSE,
  'Antimony and its compounds. Toxic heavy metal. Prohibited in Canadian cosmetics.' || source_note,
  'antimony')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cadmium', 'Cadmium', 'prohibited', FALSE,
  'Cadmium and its compounds. Toxic heavy metal, carcinogen. Prohibited in Canadian cosmetics.' || source_note,
  'cadmium')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Arsenic', 'Arsenic', 'prohibited', FALSE,
  'Arsenic and its compounds. Toxic, carcinogen. Prohibited in Canadian cosmetics.' || source_note,
  'arsenic')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

-- ============ Carcinogens ============

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Chloroform', 'Chloroform', '67-66-3', 'prohibited', FALSE,
  'Carcinogen. Prohibited in Canadian cosmetics.' || source_note,
  'chloroform')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Vinyl Chloride', 'Vinyl chloride', '75-01-4', 'prohibited', FALSE,
  'Carcinogen. Prohibited in Canadian cosmetics. Sometimes encountered as a residual monomer in PVC packaging.' || source_note,
  'vinyl-chloride')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Methylene Chloride', 'Methylene chloride (Dichloromethane)', '75-09-2', 'prohibited', FALSE,
  'Carcinogen. Also known as dichloromethane. Prohibited in Canadian cosmetics.' || source_note,
  'methylene-chloride')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Nitrosamines', 'Nitrosamines', 'prohibited', FALSE,
  'Family of carcinogenic compounds that can form via nitrosation reactions. Intentional addition prohibited in Canadian cosmetics. Avoid combinations of secondary amines (e.g. DEA, TEA) with nitrosating agents to prevent in-product formation.' || source_note,
  'nitrosamines')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

-- ============ Other prohibited substances ============

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Hexachlorophene', 'Hexachlorophene', '70-30-4', 'prohibited', FALSE,
  'Antimicrobial agent. Prohibited in Canadian cosmetics due to neurotoxicity concerns.' || source_note,
  'hexachlorophene')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Bithionol', 'Bithionol', '97-18-7', 'prohibited', FALSE,
  'Antimicrobial agent. Prohibited in Canadian cosmetics — photosensitizer.' || source_note,
  'bithionol')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Methanol', 'Methanol', '67-56-1', 'prohibited', FALSE,
  'Toxic alcohol. Prohibited as an intentional cosmetic ingredient. Permitted only as a denaturant trace in ethanol.' || source_note,
  'methanol')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Diethylene Glycol', 'Diethylene glycol', '111-46-6', 'prohibited', FALSE,
  'Nephrotoxic, systemically toxic. Prohibited in Canadian cosmetics. Sometimes a contaminant in glycerin — confirm supplier purity.' || source_note,
  'diethylene-glycol')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Pyrogallol', 'Pyrogallol', '87-66-1', 'prohibited', FALSE,
  'Toxic. Formerly used in hair dyes. Prohibited in Canadian cosmetics.' || source_note,
  'pyrogallol')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Cantharidin', 'Cantharidin', '56-25-7', 'prohibited', FALSE,
  'Vesicant, toxic. Prohibited in Canadian cosmetics.' || source_note,
  'cantharidin')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Colchicine', 'Colchicine', '64-86-8', 'prohibited', FALSE,
  'Toxic, also a therapeutic agent. Prohibited in Canadian cosmetics.' || source_note,
  'colchicine')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Strychnine', 'Strychnine', 'prohibited', FALSE,
  'Highly toxic alkaloid. Prohibited in Canadian cosmetics.' || source_note,
  'strychnine')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Acetone Peroxide', 'Acetone peroxide', '110-05-4', 'prohibited', FALSE,
  'Explosive, corrosive. Prohibited in Canadian cosmetics.' || source_note,
  'acetone-peroxide')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Quinine', 'Quinine and its salts', 'prohibited', FALSE,
  'Therapeutic agent. Prohibited as a cosmetic ingredient in Canada.' || source_note,
  'quinine')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

-- ============ Dyes ============

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Basic Green 4', 'Basic Green 4 (Malachite Green)', '569-64-2', 'prohibited', FALSE,
  'Triarylmethane dye also known as Malachite Green. Prohibited in Canadian cosmetics due to developmental effects (added May 2024).' || source_note,
  'basic-green-4')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

-- ============ Categorical / family-level prohibitions ============
-- Some Hotlist entries are families rather than single substances.
-- We add a representative INCI name per family so the readiness
-- checker can flag obvious cases. For complete coverage, makers
-- still need to verify against the canada.ca Hotlist.

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Halogenated Salicylanilides', 'Halogenated salicylanilides', 'prohibited', FALSE,
  'Family of antimicrobials including dibromsalan, tribromsalan, metabromsalan, and tribromosalicylanilide. Prohibited in Canadian cosmetics — photosensitizers.' || source_note,
  'halogenated-salicylanilides')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Zirconium', 'Zirconium-containing compounds', 'prohibited', FALSE,
  'Zirconium-containing compounds are prohibited in aerosol cosmetics in Canada.' || source_note,
  'zirconium')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Chlorofluorocarbons', 'Chlorofluorocarbon propellants (CFCs)', 'prohibited', FALSE,
  'Family of ozone-depleting propellants. Prohibited in Canadian cosmetics under the Montreal Protocol implementation.' || source_note,
  'chlorofluorocarbons')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Prostaglandins', 'Prostaglandins and analogs', 'prohibited', FALSE,
  'Family of bioactive lipids on the Prescription Drug List. Prohibited as cosmetic ingredients in Canada (added February 2025) — sole therapeutic functions.' || source_note,
  'prostaglandins')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Thioglycolic Acid Esters', 'Thioglycolic acid esters', 'prohibited', FALSE,
  'Family of esters used in some hair products. Prohibited in Canadian cosmetics (added February 2025) — risk of skin sensitization.' || source_note,
  'thioglycolic-acid-esters')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, is_fragrance_allergen, description, slug)
VALUES ('Phenylenediamine', 'p-Phenylenediamine (free base, as direct dye)', '106-50-3', 'prohibited', FALSE,
  'Prohibited as a direct hair dye in Canada. Restricted (not prohibited) when used with an oxidizer in oxidative hair dye formulations — see restricted entry.' || source_note,
  'phenylenediamine-free-base')
ON CONFLICT (inci_name) DO UPDATE SET hotlist_status = 'prohibited', updated_at = NOW();

END $$;

-- =====================================================================
-- Verify cleanup. After running you should see ~30+ prohibited rows.
-- =====================================================================
SELECT
  hotlist_status,
  COUNT(*) AS rows
FROM public.ingredients
GROUP BY hotlist_status
ORDER BY hotlist_status;

-- Detailed list of prohibited entries:
SELECT inci_name, cas_number, hotlist_status
FROM public.ingredients
WHERE hotlist_status = 'prohibited'
ORDER BY inci_name;
