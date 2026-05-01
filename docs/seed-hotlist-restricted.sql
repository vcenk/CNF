-- =====================================================================
-- Phase 3 Seed: Hotlist RESTRICTED ingredients
--
-- Source: docs/cosmetic-ingredient-database.json (compiled from
-- multiple secondary regulatory references including Health Canada
-- Cosmetic Ingredient Hotlist, EU 1223/2009 Annex III, and CIR
-- assessments).
--
-- IMPORTANT: This list is COMPILED, not directly scraped from
-- canada.ca (which blocks automated fetches per docs/SOURCING.md).
-- Verify each entry against the live canada.ca Hotlist before
-- relying on it for regulatory decisions:
-- https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html
--
-- This seed populates four columns (besides hotlist_status):
--   - hotlist_max_concentration  numeric % cap in finished product
--   - hotlist_conditions         human-readable conditions of use
--   - usage_type_restriction     'rinse-off' | 'leave-on' | 'both'
--   - typical_use_level_min/max  for ingredient page context
--
-- Safe to re-run — all INSERTs use ON CONFLICT DO UPDATE.
-- =====================================================================

DO $$
DECLARE
  source_note TEXT := ' Source: Health Canada Cosmetic Ingredient Hotlist (restricted list), compiled from docs/cosmetic-ingredient-database.json. Verify against the live canada.ca Hotlist before relying on it.';
BEGIN

-- =====================================================================
-- PRESERVATIVES — concentration limits
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Phenoxyethanol', 'Phenoxyethanol', '122-99-6', 'restricted', 1.0,
  'Maximum 1.0% in finished cosmetic product.',
  'both', 0.5, 1.0, FALSE,
  'Glycol ether preservative effective against bacteria, yeast, and mould. Often paired with ethylhexylglycerin for broad-spectrum coverage.' || source_note,
  'phenoxyethanol')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 1.0,
  hotlist_conditions = 'Maximum 1.0% in finished cosmetic product.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Methylparaben', 'Methylparaben', '99-76-3', 'restricted', 0.4,
  'Maximum 0.4% individually. Total parabens (any combination) must not exceed 0.8% in the finished product.',
  'both', 0.1, 0.4, FALSE,
  'Paraben preservative. Health Canada permits short-chain parabens (methyl, ethyl) at higher individual limits than long-chain (propyl, butyl). Total of all parabens capped at 0.8%.' || source_note,
  'methylparaben')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.4,
  hotlist_conditions = 'Maximum 0.4% individually. Total parabens (any combination) must not exceed 0.8% in the finished product.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Ethylparaben', 'Ethylparaben', '120-47-8', 'restricted', 0.4,
  'Maximum 0.4% individually. Total parabens (any combination) must not exceed 0.8% in the finished product.',
  'both', 0.1, 0.4, FALSE,
  'Paraben preservative. Same per-paraben and total-paraben limits as methylparaben.' || source_note,
  'ethylparaben')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.4,
  hotlist_conditions = 'Maximum 0.4% individually. Total parabens (any combination) must not exceed 0.8% in the finished product.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Propylparaben', 'Propylparaben', '94-13-3', 'restricted', 0.14,
  'Maximum 0.14% individually. Prohibited in leave-on products intended for the diaper area of children under 3 years of age. Total parabens (any combination) must not exceed 0.8%.',
  'both', 0.01, 0.14, FALSE,
  'Long-chain paraben preservative with stricter individual cap than methyl/ethyl parabens due to endocrine concerns at higher concentrations.' || source_note,
  'propylparaben')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.14,
  hotlist_conditions = 'Maximum 0.14% individually. Prohibited in leave-on products intended for the diaper area of children under 3 years of age. Total parabens (any combination) must not exceed 0.8%.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Butylparaben', 'Butylparaben', '94-26-8', 'restricted', 0.14,
  'Maximum 0.14% individually. Prohibited in leave-on products intended for the diaper area of children under 3 years of age. Total parabens (any combination) must not exceed 0.8%.',
  'both', 0.01, 0.14, FALSE,
  'Long-chain paraben preservative. Same individual cap and diaper-area restriction as propylparaben.' || source_note,
  'butylparaben')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.14,
  hotlist_conditions = 'Maximum 0.14% individually. Prohibited in leave-on products intended for the diaper area of children under 3 years of age. Total parabens (any combination) must not exceed 0.8%.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Methylisothiazolinone', 'MIT', '2682-20-4', 'restricted', 0.0015,
  'Maximum 0.0015% (15 ppm) in rinse-off products only. PROHIBITED in leave-on products including wet wipes.',
  'rinse-off', 0, 0.0015, FALSE,
  'Isothiazolinone preservative. Strong skin sensitizer — limited to rinse-off use only after a wave of contact-dermatitis reports in the 2010s.' || source_note,
  'methylisothiazolinone')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.0015,
  hotlist_conditions = 'Maximum 0.0015% (15 ppm) in rinse-off products only. PROHIBITED in leave-on products including wet wipes.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Methylchloroisothiazolinone', 'CMIT (in CMIT/MIT blends)', '26172-55-4', 'restricted', 0.0015,
  'Maximum 0.0015% (15 ppm) of a 3:1 mixture of CMIT and MIT in rinse-off products only. PROHIBITED in leave-on.',
  'rinse-off', 0, 0.0015, FALSE,
  'Often supplied as Kathon CG — a 3:1 blend of CMIT and MIT. Same rinse-off-only restriction as MIT alone.' || source_note,
  'methylchloroisothiazolinone')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.0015,
  hotlist_conditions = 'Maximum 0.0015% (15 ppm) of a 3:1 mixture of CMIT and MIT in rinse-off products only. PROHIBITED in leave-on.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('DMDM Hydantoin', 'DMDM Hydantoin', '6440-58-0', 'restricted',
  'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2% (or 0.05% for oral hygiene products). Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  'both', 0.1, 0.6, FALSE,
  'Formaldehyde-releasing preservative. Subject to Health Canada formaldehyde concentration and labelling rules.' || source_note,
  'dmdm-hydantoin')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2% (or 0.05% for oral hygiene products). Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Imidazolidinyl Urea', 'Germall 115', '39236-46-9', 'restricted',
  'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2%. Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  'both', 0.1, 0.6, FALSE,
  'Formaldehyde-releasing preservative. Same labelling rule as DMDM Hydantoin.' || source_note,
  'imidazolidinyl-urea')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2%. Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Diazolidinyl Urea', 'Germall II', '78491-02-8', 'restricted',
  'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2%. Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  'both', 0.1, 0.5, FALSE,
  'Formaldehyde-releasing preservative. Stronger releaser than Imidazolidinyl Urea.' || source_note,
  'diazolidinyl-urea')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Formaldehyde releaser. Free formaldehyde in finished product must not exceed 0.2%. Products with formaldehyde >0.05% must be labelled "contains formaldehyde".',
  usage_type_restriction = 'both',
  updated_at = NOW();

-- =====================================================================
-- ACTIVES — concentration limits
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Salicylic Acid', 'Salicylic Acid (BHA)', '69-72-7', 'restricted', 2.0,
  'Maximum 2.0% in leave-on products. Must carry warning: "Do not use on children under 3 years of age." Higher concentrations are regulated as drugs (acne treatment).',
  'both', 0.5, 2.0, FALSE,
  'Beta-hydroxy-acid exfoliant and antimicrobial. Exempt from concentration limit when used solely as a preservative at <0.5%.' || source_note,
  'salicylic-acid')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 2.0,
  hotlist_conditions = 'Maximum 2.0% in leave-on products. Must carry warning: "Do not use on children under 3 years of age." Higher concentrations are regulated as drugs (acne treatment).',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Glycolic Acid', 'Glycolic Acid (AHA)', '79-14-1', 'restricted', 10.0,
  'Maximum 10% as exfoliant. Final product pH must be ≥3.5. Sunburn-alert warning required: "Use a sunscreen and limit sun exposure while using this product and for a week afterwards." Concentrations >10% may be regulated as drugs.',
  'both', 0.5, 10.0, FALSE,
  'Alpha-hydroxy-acid exfoliant. Sun-sensitivity warning is mandatory above the cosmetic threshold.' || source_note,
  'glycolic-acid')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 10.0,
  hotlist_conditions = 'Maximum 10% as exfoliant. Final product pH must be ≥3.5. Sunburn-alert warning required: "Use a sunscreen and limit sun exposure while using this product and for a week afterwards." Concentrations >10% may be regulated as drugs.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Lactic Acid', 'Lactic Acid (AHA)', '50-21-5', 'restricted', 10.0,
  'As exfoliant: maximum 10%, final product pH ≥3.5, sunburn-alert warning required. As a pH adjuster at low concentration there is no specific limit.',
  'both', 0.1, 10.0, FALSE,
  'Alpha-hydroxy-acid exfoliant and humectant. Same sun-sensitivity warning rules as glycolic acid when used as exfoliant.' || source_note,
  'lactic-acid')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 10.0,
  hotlist_conditions = 'As exfoliant: maximum 10%, final product pH ≥3.5, sunburn-alert warning required. As a pH adjuster at low concentration there is no specific limit.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Benzoyl Peroxide', 'BPO', '94-36-0', 'restricted', 5.0,
  'Maximum 5.0% in cosmetics. Concentrations above 5% (typically acne treatments at 2.5%, 5%, 10%) are regulated as drugs and require a DIN.',
  'both', 0.5, 5.0, FALSE,
  'Antimicrobial / keratolytic active. Most familiar from acne treatments — those higher concentrations are drug products, not cosmetics.' || source_note,
  'benzoyl-peroxide')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 5.0,
  hotlist_conditions = 'Maximum 5.0% in cosmetics. Concentrations above 5% (typically acne treatments at 2.5%, 5%, 10%) are regulated as drugs and require a DIN.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Retinol', 'Vitamin A', '68-26-8', 'restricted', 1.0,
  'Concentration limits apply (jurisdictional reference values commonly cited: 0.3% face leave-on, 0.05% body leave-on). Not recommended for lip products. Pregnancy/breastfeeding warning may be required depending on concentration. Verify against current Health Canada and EU SCCS guidance.',
  'leave-on', 0.01, 1.0, FALSE,
  'Vitamin A derivative — anti-aging active. Health Canada and the EU SCCS have tightened recommended caps; verify current values before formulating.' || source_note,
  'retinol')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 1.0,
  hotlist_conditions = 'Concentration limits apply (jurisdictional reference values commonly cited: 0.3% face leave-on, 0.05% body leave-on). Not recommended for lip products. Pregnancy/breastfeeding warning may be required depending on concentration. Verify against current Health Canada and EU SCCS guidance.',
  usage_type_restriction = 'leave-on',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Hydroquinone', 'Hydroquinone', '123-31-9', 'restricted', 2.0,
  'Maximum 2% in cosmetic skin-lightening products. Must carry "for external use only" and contact-with-eyes warnings. Concentrations above 2% are regulated as drugs.',
  'leave-on', 0.5, 2.0, FALSE,
  'Skin-lightening agent. Subject to ongoing regulatory review for potential carcinogenicity at higher concentrations — many jurisdictions have moved toward stricter limits.' || source_note,
  'hydroquinone')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 2.0,
  hotlist_conditions = 'Maximum 2% in cosmetic skin-lightening products. Must carry "for external use only" and contact-with-eyes warnings. Concentrations above 2% are regulated as drugs.',
  usage_type_restriction = 'leave-on',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Resorcinol', 'Resorcinol', '108-46-3', 'restricted',
  'Hair dye: maximum 1.25% in finished product (oxidative dyeing). Other leave-on products: maximum 0.5%. Hair lotions and shampoos: maximum 0.5%. Carries hair-dye sensitization warning. Prohibited in eye-area products.',
  'both', FALSE,
  'Phenolic compound used in hair dyes and some scalp treatments. Subject to several use-context concentration caps.' || source_note,
  'resorcinol')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Hair dye: maximum 1.25% in finished product (oxidative dyeing). Other leave-on products: maximum 0.5%. Hair lotions and shampoos: maximum 0.5%. Carries hair-dye sensitization warning. Prohibited in eye-area products.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('BHA', 'Butylated Hydroxyanisole', '25013-16-5', 'restricted',
  'Antioxidant. Concentration limits commonly cited at maximum 0.1% in cosmetics. Use is being phased down in many jurisdictions due to endocrine concerns.',
  'both', FALSE,
  'Synthetic antioxidant used to extend shelf life of fats and oils. Distinct from "BHA" the salicylic-acid exfoliant — same acronym, completely different molecule.' || source_note,
  'bha-butylated-hydroxyanisole')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Antioxidant. Concentration limits commonly cited at maximum 0.1% in cosmetics. Use is being phased down in many jurisdictions due to endocrine concerns.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('BHT', 'Butylated Hydroxytoluene', '128-37-0', 'restricted',
  'Antioxidant. Generally limited to 0.1% in cosmetics. Verify current Health Canada guidance.',
  'both', FALSE,
  'Synthetic antioxidant. Less restricted than BHA but under review.' || source_note,
  'bht-butylated-hydroxytoluene')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Antioxidant. Generally limited to 0.1% in cosmetics. Verify current Health Canada guidance.',
  usage_type_restriction = 'both',
  updated_at = NOW();

-- =====================================================================
-- HUMECTANTS / SKIN CONDITIONING
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Urea', 'Urea', '57-13-6', 'restricted', 10.0,
  'Maximum 10% in leave-on products. Bath products may exceed 10%. Above 10% in leave-on cosmetics may be regulated as a drug (keratolytic).',
  'both', 1.0, 10.0, FALSE,
  'Humectant and mild keratolytic. Naturally present in skin (NMF). At higher percentages becomes an exfoliating active.' || source_note,
  'urea')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 10.0,
  hotlist_conditions = 'Maximum 10% in leave-on products. Bath products may exceed 10%. Above 10% in leave-on cosmetics may be regulated as a drug (keratolytic).',
  usage_type_restriction = 'both',
  updated_at = NOW();

-- =====================================================================
-- ESSENTIAL OILS
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Citrus Aurantium Bergamia (Bergamot) Fruit Oil', 'Bergamot Oil', '8007-75-8', 'restricted',
  'Must be furocoumarin-free (FCF / bergapten-free) for leave-on skin contact. Furocoumarins (bergapten) restricted to 1 ppm (0.0001%) in finished product when used on skin exposed to sunlight, due to phototoxicity.',
  'both', 0.1, 1.0, FALSE,
  'Citrus essential oil. Natural bergamot is phototoxic; cosmetic-grade bergamot oil for leave-on use is sold as FCF (furocoumarin-free) to remove the bergapten.' || source_note,
  'citrus-aurantium-bergamia-bergamot-fruit-oil')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Must be furocoumarin-free (FCF / bergapten-free) for leave-on skin contact. Furocoumarins (bergapten) restricted to 1 ppm (0.0001%) in finished product when used on skin exposed to sunlight, due to phototoxicity.',
  usage_type_restriction = 'both',
  updated_at = NOW();

-- =====================================================================
-- ORAL CARE
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Sodium Fluoride', 'Sodium Fluoride', '7681-49-4', 'restricted', 0.254,
  'Maximum 0.254% as fluoride ion (~1500 ppm F) in dentifrices. Toothpastes for children under 6 must carry supervision and rinsing-out warnings.',
  'rinse-off', 0.05, 0.254, FALSE,
  'Active anti-cavity ingredient in toothpaste and rinses. Concentration is regulated as fluoride ion content, not as the source compound.' || source_note,
  'sodium-fluoride')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.254,
  hotlist_conditions = 'Maximum 0.254% as fluoride ion (~1500 ppm F) in dentifrices. Toothpastes for children under 6 must carry supervision and rinsing-out warnings.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Sodium Monofluorophosphate', 'MFP', '10163-15-2', 'restricted', 0.76,
  'Maximum equivalent of 0.254% as fluoride ion in dentifrices. As MFP, that corresponds to ~0.76% MFP. Children-under-6 supervision warnings apply.',
  'rinse-off', 0.1, 0.76, FALSE,
  'Active anti-cavity ingredient. Different molecule than NaF but same fluoride-ion cap applies.' || source_note,
  'sodium-monofluorophosphate')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.76,
  hotlist_conditions = 'Maximum equivalent of 0.254% as fluoride ion in dentifrices. As MFP, that corresponds to ~0.76% MFP. Children-under-6 supervision warnings apply.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Stannous Fluoride', 'Tin Fluoride', '7783-47-3', 'restricted', 0.454,
  'Maximum equivalent of 0.254% as fluoride ion in dentifrices. As stannous fluoride, that corresponds to ~0.454%. Children-under-6 supervision warnings apply.',
  'rinse-off', 0.1, 0.454, FALSE,
  'Active anti-cavity and antimicrobial ingredient. Same fluoride-ion cap as other fluoride sources.' || source_note,
  'stannous-fluoride')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.454,
  hotlist_conditions = 'Maximum equivalent of 0.254% as fluoride ion in dentifrices. As stannous fluoride, that corresponds to ~0.454%. Children-under-6 supervision warnings apply.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

-- =====================================================================
-- MAKEUP / POWDERS
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Talc', 'Talcum Powder', '14807-96-6', 'restricted',
  'Must be certified asbestos-free. Health Canada has issued specific guidance about chronic inhalation and perineal exposure; products marketed for use in the genital area or as a loose powder near the face require warnings or are subject to use restrictions. Verify current guidance.',
  'leave-on', FALSE,
  'Hydrated magnesium silicate used as an absorbent and bulking agent in pressed powders, loose powders, and body powders. Cosmetic-grade talc is required to be asbestos-free (USP/CFR-equivalent testing).' || source_note,
  'talc')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Must be certified asbestos-free. Health Canada has issued specific guidance about chronic inhalation and perineal exposure; products marketed for use in the genital area or as a loose powder near the face require warnings or are subject to use restrictions. Verify current guidance.',
  usage_type_restriction = 'leave-on',
  updated_at = NOW();

-- =====================================================================
-- SOAP / pH ADJUSTERS — high-impact for indie soapmakers
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Sodium Hydroxide', 'Lye / Caustic Soda', '1310-73-2', 'restricted',
  'Permitted in cosmetics only when fully reacted (saponified) in the finished product. No free sodium hydroxide. In soap, this means the formula must be fully cured with no excess lye. pH adjuster use also permitted when neutralised in the finished product.',
  'both', FALSE,
  'Strong base used to saponify oils into bar soap. The finished bar contains sodium soap salts plus glycerin — no unreacted lye. Listed on cosmetic labels as "Sodium Hydroxide" or under the saponified-oil naming convention (e.g., "Sodium Olivate" for saponified olive oil).' || source_note,
  'sodium-hydroxide')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Permitted in cosmetics only when fully reacted (saponified) in the finished product. No free sodium hydroxide. In soap, this means the formula must be fully cured with no excess lye. pH adjuster use also permitted when neutralised in the finished product.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Potassium Hydroxide', 'KOH / Caustic Potash', '1310-58-3', 'restricted',
  'Permitted in cosmetics only when fully reacted in the finished product. No free potassium hydroxide. In liquid soap, the formula must be fully neutralized — typical practice is a small amount of free KOH to be neutralized with citric acid or glycerin during finishing.',
  'both', FALSE,
  'Strong base used to saponify oils into liquid (potassium) soap. Same finished-product rule as sodium hydroxide: no free unreacted lye allowed.' || source_note,
  'potassium-hydroxide')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Permitted in cosmetics only when fully reacted in the finished product. No free potassium hydroxide. In liquid soap, the formula must be fully neutralized — typical practice is a small amount of free KOH to be neutralized with citric acid or glycerin during finishing.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Boric Acid', 'Boric Acid', '10043-35-3', 'restricted', 5.0,
  'Maximum 5% in talc-based products. Maximum 0.1% in oral hygiene products (mouthwash, dental care). Prohibited in products for children under 3. Carries developmental toxicity warnings.',
  'both', 0.1, 5.0, FALSE,
  'Mild antimicrobial / pH buffer. Subject to use-context concentration caps and a children-under-3 prohibition.' || source_note,
  'boric-acid')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 5.0,
  hotlist_conditions = 'Maximum 5% in talc-based products. Maximum 0.1% in oral hygiene products (mouthwash, dental care). Prohibited in products for children under 3. Carries developmental toxicity warnings.',
  usage_type_restriction = 'both',
  updated_at = NOW();

-- =====================================================================
-- ANTIMICROBIALS — restricted use
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, typical_use_level_min, typical_use_level_max, is_fragrance_allergen, description, slug)
VALUES ('Triclosan', 'Triclosan', '3380-34-5', 'restricted', 0.3,
  'Maximum 0.3% in cosmetics. Permitted use restricted to specific categories (deodorant, soap, mouthwash, toothpaste). Health Canada and Environment Canada have classified triclosan as toxic to the environment under CEPA. Use has declined sharply.',
  'both', 0.05, 0.3, FALSE,
  'Antimicrobial historically used in antibacterial soap, toothpaste, and deodorant. Use has fallen due to environmental persistence and antimicrobial resistance concerns.' || source_note,
  'triclosan')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.3,
  hotlist_conditions = 'Maximum 0.3% in cosmetics. Permitted use restricted to specific categories (deodorant, soap, mouthwash, toothpaste). Health Canada and Environment Canada have classified triclosan as toxic to the environment under CEPA. Use has declined sharply.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Triclocarban', 'Triclocarban', '101-20-2', 'restricted', 0.2,
  'Maximum 0.2% in rinse-off products. Permitted use restricted. Subject to environmental-toxicity restrictions.',
  'rinse-off', FALSE,
  'Antimicrobial historically used in antibacterial bar soap. Largely phased out.' || source_note,
  'triclocarban')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_max_concentration = 0.2,
  hotlist_conditions = 'Maximum 0.2% in rinse-off products. Permitted use restricted. Subject to environmental-toxicity restrictions.',
  usage_type_restriction = 'rinse-off',
  updated_at = NOW();

-- =====================================================================
-- DEA / NITROSAMINE-PRECURSOR SURFACTANTS
-- =====================================================================

INSERT INTO public.ingredients (inci_name, common_name, cas_number, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Cocamide DEA', 'Cocamide Diethanolamine', '68603-42-9', 'restricted',
  'Permitted only when used in conditions that do not result in nitrosamine formation. Must not be used with nitrosating agents. Free DEA must be minimized. Subject to Health Canada DEA-related restrictions.',
  'both', FALSE,
  'Surfactant and foam booster derived from coconut oil and diethanolamine. Concern is impurity (free DEA) and nitrosamine formation when combined with nitrosating ingredients.' || source_note,
  'cocamide-dea')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Permitted only when used in conditions that do not result in nitrosamine formation. Must not be used with nitrosating agents. Free DEA must be minimized. Subject to Health Canada DEA-related restrictions.',
  usage_type_restriction = 'both',
  updated_at = NOW();

INSERT INTO public.ingredients (inci_name, common_name, hotlist_status, hotlist_conditions, usage_type_restriction, is_fragrance_allergen, description, slug)
VALUES ('Diethanolamine', 'DEA', 'restricted',
  'Diethanolamine itself is prohibited as an ingredient; DEA-functionalized derivatives (cocamide DEA, lauramide DEA, etc.) are restricted to conditions that do not form nitrosamines and must not be combined with nitrosating agents.',
  'both', FALSE,
  'DEA as a free ingredient is prohibited. The restriction applies to derivatives that may contain DEA as an impurity.' || ' Source: Health Canada Cosmetic Ingredient Hotlist, compiled from docs/cosmetic-ingredient-database.json. Verify against the live canada.ca Hotlist before relying on it.',
  'diethanolamine')
ON CONFLICT (inci_name) DO UPDATE SET
  hotlist_status = 'restricted',
  hotlist_conditions = 'Diethanolamine itself is prohibited as an ingredient; DEA-functionalized derivatives (cocamide DEA, lauramide DEA, etc.) are restricted to conditions that do not form nitrosamines and must not be combined with nitrosating agents.',
  usage_type_restriction = 'both',
  updated_at = NOW();

END $$;

-- =====================================================================
-- VERIFICATION
-- =====================================================================
-- Run this after the DO block to confirm the seed succeeded:
--
--   SELECT hotlist_status, count(*)
--   FROM public.ingredients
--   GROUP BY hotlist_status
--   ORDER BY hotlist_status;
--
-- Expected after this seed:
--   not_listed:  ~140-156   (some moved to restricted)
--   restricted:  ~40+        (was 16, this seed adds ~25-28 new + upserts existing)
--   prohibited:  32         (unchanged from Phase 2)
--
-- And to inspect the new restricted entries with their conditions:
--
--   SELECT inci_name, hotlist_max_concentration, hotlist_conditions, usage_type_restriction
--   FROM public.ingredients
--   WHERE hotlist_status = 'restricted'
--   ORDER BY inci_name;
-- =====================================================================
