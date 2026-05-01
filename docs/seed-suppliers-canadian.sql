-- =====================================================================
-- Seed: Canadian cosmetic ingredient suppliers
--
-- Six well-documented Canadian indie-maker-friendly suppliers with
-- verified names, locations, and websites (sourced from each
-- supplier's own .ca/.com homepage and from
-- docs/cosmetic-ingredient-database.json).
--
-- IMPORTANT — spot-check before relying on this for marketing:
--   - Every URL was correct as of compilation but websites move.
--     Open each in a browser and confirm 200 OK before you link to
--     this page from emails or blog posts.
--   - This is a STARTING KIT. The directory is meant to grow via:
--       /dashboard/suppliers/new   (admin form, ~30s per supplier)
--       /suppliers/suggest         (public form, queued for review)
--
-- Phone numbers + street addresses intentionally NOT seeded — these
-- change frequently and we don't want to ship stale physical info.
-- Add them via the admin form or update directly in the dashboard.
--
-- Safe to re-run — uses ON CONFLICT (slug) DO UPDATE.
-- =====================================================================

INSERT INTO public.suppliers
  (name, slug, website, location, city, province, is_canadian)
VALUES

-- 1. Voyageur Soap & Candle — BC's largest indie-maker supplier
('Voyageur Soap & Candle Company',
 'voyageur-soap-candle',
 'https://www.voyageursoapandcandle.com/',
 'Surrey, British Columbia',
 'Surrey', 'BC', TRUE),

-- 2. New Directions Aromatics — largest essential-oil distributor in Canada
('New Directions Aromatics',
 'new-directions-aromatics',
 'https://www.newdirectionsaromatics.ca/',
 'Mississauga, Ontario',
 'Mississauga', 'ON', TRUE),

-- 3. Saffire Blue — soap supplies, butters, fragrances (Ontario)
('Saffire Blue',
 'saffire-blue',
 'https://saffireblue.ca/',
 'Woodstock, Ontario',
 'Woodstock', 'ON', TRUE),

-- 4. Windy Point Soap Making Supplies — Calgary, soap + bath/body
('Windy Point Soap Making Supplies',
 'windy-point-soap',
 'https://www.windypointsoap.com/',
 'Calgary, Alberta',
 'Calgary', 'AB', TRUE),

-- 5. Canwax — Canada's largest wick supplier; also soap supplies
('Canwax',
 'canwax',
 'https://www.canwax.com/',
 'Huntsville, Ontario',
 'Huntsville', 'ON', TRUE),

-- 6. Aliksir — organic essential oils, distilled in Quebec
('Aliksir',
 'aliksir',
 'https://www.aliksir.com/',
 'Grondines, Quebec',
 'Grondines', 'QC', TRUE)

ON CONFLICT (slug) DO UPDATE SET
  name        = EXCLUDED.name,
  website     = EXCLUDED.website,
  location    = EXCLUDED.location,
  city        = EXCLUDED.city,
  province    = EXCLUDED.province,
  is_canadian = TRUE;

-- =====================================================================
-- Verification
-- =====================================================================
--   SELECT count(*) FROM public.suppliers WHERE is_canadian = TRUE;
--     -- should be at least 6 (more if you've already added some)
--
--   SELECT name, city, province, website
--   FROM public.suppliers
--   WHERE is_canadian = TRUE
--   ORDER BY province, name;
-- =====================================================================
