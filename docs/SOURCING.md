# Source-of-truth Approach for Regulatory Data

How FormulaNorth keeps its ingredient, hotlist, and fragrance allergen
data trustworthy. Honest about what we can and can't automate.

## The constraint

**`canada.ca` returns HTTP 403 to any automated fetch.** This includes
the Cosmetic Ingredient Hotlist page and the cosmetic labelling
guidance. We cannot scrape or programmatically sync from the official
authoritative source.

This isn't unique to us — it's Health Canada's public-facing policy.
Industry tools that claim "auto-synced from canada.ca" either use
manually-maintained mirrors or violate the canada.ca terms of use.

## What we DID verify against Canadian legal sources

Successfully fetched and confirmed via `laws-lois.justice.gc.ca` on
**April 30, 2026**:

| Source | URL | Confirmed |
|---|---|---|
| Cosmetic Regulations (C.R.C., c. 869) | https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._869/index.html | Document structure |
| Section 21.2(1) | Same — full text | Mandates INCI naming for ingredient lists |
| Section 21.4 | Same — full text | Fragrance allergen rule defers to "European Restricted Substances List" |
| SOR/2024-63 | Same — amendment record | Introduced fragrance allergen disclosure; effective 2024-10-09 |
| Disclosure thresholds | Same | 0.001% leave-on, 0.01% rinse-off (verbatim from Regulations) |

Implementation phases (from Health Canada's published rollout — see
in-app fragrance allergen alert and BACKLOG):

- Phase 1 — April 12, 2026: 24 allergens, all cosmetics
- Phase 2 — August 1, 2026: 81 allergens, newly-introduced products
- Phase 3 — August 1, 2028: 81 allergens, all existing products

## Authoritative source chain for fragrance allergens

Section 21.4 of the Cosmetic Regulations does not list the allergens
itself — it says they are the substances on the European Restricted
Substances List. So the authority chain is:

```
Canada Cosmetic Regulations Section 21.4
        ↓ (defers to)
EU Cosmetic Regulation 1223/2009 Annex III (24 allergens, items 67-92)
        ↓ (amended by)
EU Regulation 2023/1545 (expands to 81 by Aug 2026 / Aug 2028)
```

Both EU regulations are publicly accessible at `eur-lex.europa.eu` —
those are the canonical lists Canadian makers must comply with.

## Trustworthy source URLs we link to

| What | URL | Used for |
|---|---|---|
| Health Canada cosmetic hub | https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics.html | Outbound link only |
| Cosmetic Ingredient Hotlist | https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html | Linked from `/health-canada-cosmetic-hotlist` and `/ingredients/hotlist` |
| Cosmetic labelling guidance | https://www.canada.ca/en/health-canada/services/cosmetics/cosmetic-advertising-labelling-ingredients.html | Linked from `FragranceAllergenAlert` and label guide |
| Cosmetic Regulations (consolidated) | https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._869/ | Legal citation |
| EU Annex III (24 allergens) | https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R1223 | List source for Phase 1 |
| EU Regulation 2023/1545 | https://eur-lex.europa.eu/eli/reg/2023/1545/oj | List source for Phase 2 expansion |

**Every page on FormulaNorth that surfaces regulatory data should link
to the canonical source.** Search the codebase for these URLs and add
new pages to the table when they're added.

## What we DO NOT trust as source of truth

- ❌ Wikipedia (good starting point but not authoritative)
- ❌ Cosmetics-industry blogs / influencer posts
- ❌ Other indie SaaS tools (their data may be derived from us or each
  other; circular)
- ❌ AI-generated content without human verification
- ❌ Older PDFs found via Google (regulations change; check date)

## What we CAN trust

- ✅ canada.ca (manually verified — even though we can't auto-fetch)
- ✅ laws-lois.justice.gc.ca (Canada's official law database — auto-fetch
  works)
- ✅ gazette.gc.ca (Canada Gazette — for new regulations)
- ✅ eur-lex.europa.eu (EU regulations — Canada explicitly defers to
  these for fragrance allergens)
- ✅ ECHA (European Chemicals Agency) for CAS / chemical identity
- ✅ PubChem (NIH National Library of Medicine) for CAS / chemical
  identity

## Manual verification workflow

When adding or updating an ingredient, hotlist entry, or allergen:

1. **Find it on the official source.** Open the canada.ca Hotlist page
   in a browser. Search (Ctrl+F) for the INCI name or CAS. Read the
   entry verbatim.
2. **Cross-reference against EU sources** if it's a fragrance allergen.
   EU Annex III entries 67-92 are the original 24; EU 2023/1545 has
   the full 81.
3. **Confirm the CAS number on PubChem.** Different naming conventions
   sometimes produce two CAS numbers for the same substance — note both.
4. **Record provenance.** Every INSERT into `ingredients` should include
   a `description` field that cites the source URL and date verified.
5. **Re-verify quarterly.** Health Canada updates the Hotlist 1-2 times
   per year. Set a calendar reminder; re-check the page; update any
   changed entries with new SQL.

## Related documents

- [`docs/fragrance-allergens.md`](./fragrance-allergens.md) — Phase 1 list
  with audit SQL templates
- [`docs/cosmetic-ingredient-database.json`](./cosmetic-ingredient-database.json)
  — original research seed data with mixed sources (treat as starting
  point, verify each entry against canonical source before relying)
- [`docs/BACKLOG.md`](./BACKLOG.md) — pending data work including
  Phase 2 (81-allergen) DB expansion and ingredient count growth

## Honest disclaimer

The site's regulatory disclaimer says it best:

> FormulaNorth helps organize cosmetic formulation, label, costing, and
> CNF preparation information. It is not legal or regulatory advice and
> does not replace Health Canada guidance, professional regulatory
> review, or the maker's responsibility to verify product compliance
> before sale.

Even with diligent sourcing, the maker's responsibility is to verify
against the canada.ca live source before notification or sale. Our role
is to surface the right questions and starting data — not to be the
final word.
