# FormulaNorth Implementation Plan

## Codebase Audit

Current: Next.js 15 + React 19 + TS, 7 CSS modules, no Tailwind/shadcn, domain at src/domain/cnf.ts, 4 stub services, 1 client form, 3 SEO pages, no DB/auth/persistence.

Preserve: tsconfig aliases, next.config.ts, SeoPage pattern, ValidationIssue type, Repository interface, JSON-LD patterns.

Replace: All CSS modules, globals.css, site-config content, marketing-pages, all SEO pages, intake-form, intake-blueprint, cnf.ts domain, home page.

---

## Full Database Schema (All Phases)

See detailed SQL in conversation thread. Summary of tables by phase:

Phase 0: profiles (extends auth.users)
Phase 1: ingredients, ingredient_functions, ingredient_function_map, suppliers, ingredient_supplier_prices
Phase 2: formulas, formula_versions, formula_ingredients, formula_variants, variant_ingredients
Phase 3: user_ingredient_prices, formula_cost_config
Phase 4: label_templates
Phase 5: cnf_submissions

All tables have RLS. Ingredients/suppliers are public read. All formula-related tables are user-scoped via auth.uid().

---

## Phase 0-5 details in conversation thread.

## Timeline: 20-27 days total.
