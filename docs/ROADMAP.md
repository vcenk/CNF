# FormulaNorth Product Roadmap

## Purpose

This document is the working build roadmap for **FormulaNorth**, a Canadian cosmetic formulation, costing, label, and CNF preparation platform for indie makers.

The current repository started as **CNF Builder**, an AI-assisted workflow for Health Canada Cosmetic Notification Form preparation. The product should now evolve into a broader, more commercially useful platform:

> **FormulaNorth helps Canadian cosmetic makers formulate products, check ingredients, calculate costs, generate bilingual labels, and prepare Health Canada CNF information with less confusion.**

The product should target Canadian handmade skincare, soap, bath/body, and indie cosmetic makers first. BC maker/vendor compliance content can be used as an acquisition channel later, but the core SaaS should remain Canada-wide and cosmetic-specific.

---

## Product Positioning

### Product Name

**FormulaNorth**

### Tagline

**Formulate. Comply. Sell.**

### Primary Audience

Canadian indie cosmetic makers who create and sell products such as:

- Cold process soap
- Body butter
- Sugar scrubs
- Bath bombs
- Shampoo bars
- Conditioner bars
- Lotions and creams
- Face/body oils
- Clay masks
- Perfumes/body sprays
- Deodorants
- Other handmade skincare and body-care products

### Core Value Proposition

FormulaNorth is an all-in-one workspace for Canadian cosmetic makers to:

1. Search ingredients by INCI name, function, supplier, and Health Canada Hotlist status.
2. Build and version cosmetic formulas.
3. Scale batches accurately.
4. Calculate cost of goods sold, wholesale pricing, and retail pricing.
5. Generate bilingual EN/FR label content.
6. Check formula and label readiness.
7. Prepare CNF-ready information for Health Canada Cosmetic Notification Form submission.

### Safer Compliance Wording

Use cautious wording because regulatory data, label review, and CNF export must be verified carefully.

Use:

- CNF preparation assistant
- CNF readiness checker
- Structured CNF preparation package
- Compliance support
- Helps prepare cosmetic notification information
- Ingredient and label readiness guidance

Avoid until fully validated:

- Guaranteed compliant
- Official Health Canada approved
- Health Canada-certified
- Official `.hcxs` upload-ready file
- Guaranteed accepted by Health Canada

### Required Disclaimer

Add this or a similar disclaimer in footer, relevant tools, label output, and CNF export screens:

> FormulaNorth helps organize cosmetic formulation, label, costing, and CNF preparation information. It is not legal or regulatory advice and does not replace Health Canada guidance, professional regulatory review, or the maker’s responsibility to verify product compliance before sale.

---

## Current Repository Status

The current project already includes several important foundations:

### Existing Foundation

- Next.js App Router
- TypeScript
- Supabase integration
- OpenAI dependency
- Stripe dependency
- Public homepage
- Ingredient database concept
- Supplier directory concept
- Auth-protected formula area
- Formula builder page structure
- Costing tab
- Label tab
- Export tab
- CNF wizard route
- Formula validation service
- CNF validation service
- `.hcxs` export generator placeholder/simplified XML generator

### Current Product Architecture

Current core private formula workflow:

```txt
Formula detail page
├── Builder tab
├── Costing tab
├── Label tab
└── Export tab
```

This is the correct SaaS architecture. Continue building around this workflow.

---

## Strategic Direction

### Main Product Direction

Build **FormulaNorth** as:

> Canadian cosmetic formulation and compliance-preparation software for indie makers.

### SEO Direction

Build a public knowledge and tool layer around:

- Cosmetic Notification Form Canada
- Cosmetic label requirements Canada
- Health Canada Cosmetic Ingredient Hotlist
- INCI name lookup Canada
- Cosmetic ingredient database
- Canadian cosmetic ingredient suppliers
- Handmade soap compliance Canada
- Body butter, scrub, bath bomb, shampoo bar selling guides

### Monetization Direction

Use a hybrid model:

1. Free SEO tools and ingredient database
2. SaaS subscriptions
3. One-time digital products
4. Supplier/insurance/bookkeeping/packaging affiliate referrals later
5. Optional done-with-you compliance preparation services later

---

# Roadmap Phases

---

## Phase 0 — Foundation Cleanup

### Goal

Make the current project safe, clear, and launch-ready.

### Tasks

#### 0.1 Copy and Positioning Cleanup

- [ ] Update homepage copy to position FormulaNorth as Canadian cosmetic formulation and compliance-preparation software.
- [ ] Replace risky wording around `.hcxs` export and compliance guarantees.
- [ ] Use “CNF preparation package” or “CNF readiness” until real portal export compatibility is validated.
- [ ] Add regulatory disclaimer to footer and all compliance-related pages.
- [ ] Add clear audience language: Canadian indie cosmetic makers.

#### 0.2 Trust and Legal Pages

Create these public pages:

- [ ] `/about`
- [ ] `/contact`
- [ ] `/privacy`
- [ ] `/terms`
- [ ] `/disclaimer`
- [ ] `/data-sources`

The `/data-sources` page should explain:

- What ingredient data is included
- Whether Hotlist data is manually maintained
- Last reviewed/update date
- That makers must verify official Health Canada sources

#### 0.3 Technical Health Check

Run and fix:

```bash
npm install
npm run typecheck
npm run build
```

Verify:

- [ ] Supabase server/client imports work correctly.
- [ ] Auth-protected routes are not indexable.
- [ ] Formula dashboard pages use `robots: { index: false, follow: false }`.
- [ ] Environment variables are not exposed client-side unless safe.
- [ ] Stripe secret keys remain server-only.
- [ ] OpenAI key remains server-only.

### Acceptance Criteria

- Homepage accurately describes the product.
- Footer contains disclaimer links.
- Legal/trust pages exist.
- Build passes.
- No high-risk compliance promises remain in public-facing copy.

---

## Phase 1 — Public SEO Foundation

### Goal

Create public pages that attract Canadian cosmetic makers before the SaaS dashboard is perfect.

### Priority Public Pages

Build these first:

- [ ] `/cosmetic-notification-form-canada`
- [ ] `/cosmetic-label-requirements-canada`
- [ ] `/health-canada-cosmetic-hotlist`
- [ ] `/inci-name-lookup-canada`
- [ ] `/cosmetic-ingredient-suppliers-canada`
- [ ] `/how-to-sell-handmade-soap-in-canada`
- [ ] `/handmade-skincare-business-canada`
- [ ] `/sell-body-butter-canada`
- [ ] `/sell-sugar-scrub-canada`
- [ ] `/sell-bath-bombs-canada`

### Page Requirements

Each SEO page should include:

- Clear H1
- SEO title and meta description
- Short practical intro
- Step-by-step guidance
- Internal links to ingredients, suppliers, tools, and formulas
- FAQ section
- JSON-LD where appropriate
- Disclaimer block
- Last reviewed date
- CTA to free tool or ingredient database

### Example CTA

> Check your product with the free CNF Readiness Checker, then save it as a FormulaNorth formula.

### Acceptance Criteria

- At least 5 core public SEO pages are live.
- Pages have unique metadata.
- Pages internally link to `/ingredients`, `/suppliers`, and relevant CTAs.
- Pages do not overpromise regulatory approval.

---

## Phase 2 — Ingredient and Supplier SEO Engine

### Goal

Turn the free ingredient database and supplier directory into the main organic acquisition engine.

### Ingredient Detail Pages

Each ingredient should have a public route:

```txt
/ingredients/[slug]
```

Each ingredient page should show:

- INCI name
- Common name
- CAS number if available
- Cosmetic function
- Typical use level if available
- Health Canada Hotlist status
- Restricted/prohibited notes if applicable
- Label notes
- Leave-on/rinse-off notes where relevant
- Fragrance allergen notes where relevant
- Supplier availability
- Related ingredients
- Related product types
- Disclaimer
- Last reviewed date

### Supplier Detail Pages

Each supplier should have a public route:

```txt
/suppliers/[slug]
```

Each supplier page should show:

- Supplier name
- Website
- Location
- Canadian supplier status
- Ingredient catalog links if available
- Ingredients available in FormulaNorth database
- Pricing if available
- Shipping/ordering notes if available
- Related ingredients

### Internal Linking Rules

- Ingredient pages link to supplier pages.
- Supplier pages link to ingredient pages.
- SEO guides link to ingredient pages.
- Ingredient pages link to the formula builder CTA.
- Hotlist guide links to restricted/prohibited ingredient pages.

### Acceptance Criteria

- `/ingredients` listing works.
- `/ingredients/[slug]` pages work.
- `/suppliers` listing works.
- `/suppliers/[slug]` pages work.
- Ingredient and supplier pages have metadata and structured data where appropriate.

---

## Phase 3 — Free Tools Layer

### Goal

Convert SEO visitors into free users and email leads.

### Tool 1: CNF Readiness Checker

Create:

```txt
/tools/cnf-readiness-checker
```

Inputs:

- Product name
- Product category
- Leave-on or rinse-off
- Ingredient list
- Company name
- Company address
- Product claims
- Label language status

Outputs:

- Missing CNF information
- Ingredient readiness flags
- Label readiness flags
- Claim-risk reminders
- Next-step checklist
- CTA to create account and save as formula

Important: This should be a readiness tool, not a guaranteed compliance validator.

### Tool 2: INCI Ingredient List Formatter

Create:

```txt
/tools/inci-list-formatter
```

Inputs:

- Ingredient names and percentages or pasted ingredient list

Outputs:

- Cleaned ingredient list
- Suggested descending order reminder
- INCI naming reminders
- Allergen disclosure reminder
- CTA to save inside formula builder

### Tool 3: Cosmetic Cost Calculator

Create:

```txt
/tools/cosmetic-cost-calculator
```

Inputs:

- Batch size
- Ingredient costs
- Packaging cost
- Labour cost
- Overhead percent
- Units per batch
- Target margin

Outputs:

- Cost per batch
- Cost per unit
- Suggested wholesale price
- Suggested retail price
- Gross margin

### Tool 4: Cosmetic Label Checklist Generator

Create:

```txt
/tools/cosmetic-label-checklist
```

Outputs:

- Required label items
- EN/FR reminders
- Ingredient list reminders
- Net quantity reminders
- Business identity/address reminders
- Warnings/claims reminders

### Acceptance Criteria

- At least one free tool is live.
- Tool has clear disclaimer.
- Tool can capture email or prompt account creation.
- Tool links to relevant SEO pages.

---

## Phase 4 — Maker Tier MVP

### Goal

Make the CA$12/month Maker tier worth paying for.

### Maker Tier Core Features

- [ ] Save up to 10 formulas
- [ ] Formula version history
- [ ] Ingredient table with percentages
- [ ] Formula total percentage validation
- [ ] Health Canada Hotlist warning/error display
- [ ] Leave-on/rinse-off restriction checks
- [ ] Batch scaling
- [ ] Basic cost calculator
- [ ] Wholesale/retail price suggestions
- [ ] Label ingredient list generator
- [ ] Basic CNF readiness checklist

### Ideal User Flow

1. User arrives from an ingredient or compliance page.
2. User uses a free tool.
3. User creates account.
4. User saves product as a formula.
5. User adds ingredients and percentages.
6. User checks validation results.
7. User calculates pricing.
8. User creates label content.
9. User upgrades when hitting limits or needing export/report features.

### Acceptance Criteria

- User can create a formula.
- User can add ingredients.
- User can see formula total percentage.
- User can see validation issues.
- User can calculate cost per unit.
- User can generate a label ingredient list.
- User can save and revisit formula.

---

## Phase 5 — Studio Tier / CNF Workflow

### Goal

Make the CA$29/month Studio tier valuable for active sellers preparing real products.

### Studio Tier Features

- [ ] Up to 50 formulas
- [ ] CNF Wizard
- [ ] Company/profile reuse
- [ ] Product name EN/FR fields
- [ ] Product category selection
- [ ] Usage type selection
- [ ] Label template storage
- [ ] CNF readiness report
- [ ] Export package generation
- [ ] Filing status tracker
- [ ] Submission history
- [ ] May-contain / product variation support

### CNF Export Strategy

Until official compatibility is validated, export a **CNF Preparation Package** containing:

- PDF summary
- Structured JSON
- Structured XML
- Ingredient table
- Product data sheet
- Company data sheet
- Manual Health Canada portal entry checklist

Do not call it an official upload file until verified.

### Acceptance Criteria

- CNF Wizard pre-fills from formula and label data.
- CNF Wizard shows missing required fields.
- Export package can be generated.
- Filing status can be saved/tracked.
- Export wording is safe and accurate.

---

## Phase 6 — Business Tier

### Goal

Serve serious makers, small brands, and consultants.

### Business Tier Features

- [ ] Unlimited formulas
- [ ] Multiple brands
- [ ] Team access
- [ ] Formula approval workflow
- [ ] Supplier price tracking
- [ ] Advanced costing history
- [ ] Batch record keeping
- [ ] Compliance document archive
- [ ] Priority support
- [ ] Export history
- [ ] Product launch checklist

### Acceptance Criteria

- Business tier has clear separation from Studio.
- Advanced features target small brands, not hobby makers.
- Team and multi-brand features are not built before Maker/Studio are validated.

---

## Phase 7 — BC Maker/Vendor Acquisition Layer

### Goal

Use local BC vendor/maker compliance content to acquire users without changing the core Canada-wide product.

### BC Content Pages

Create after core pages are live:

- [ ] `/bc/farmers-market-cosmetic-vendor-checklist`
- [ ] `/bc/sell-handmade-soap-at-markets`
- [ ] `/bc/vancouver-market-vendor-checklist`
- [ ] `/bc/cosmetic-business-license-guide`
- [ ] `/bc/handmade-skincare-insurance`
- [ ] `/bc/temporary-food-vs-cosmetic-vendor`

### Positioning

BC content should say:

> Selling at a market is local. Cosmetic notification and cosmetic label preparation are Canada-wide responsibilities. FormulaNorth helps with the cosmetic formulation, label, costing, and CNF preparation side.

### Acceptance Criteria

- BC pages do not turn FormulaNorth into a generic vendor compliance site.
- BC pages send users to formula, label, ingredient, and CNF tools.

---

# Monetization Plan

## SaaS Plans

| Tier | Price | Purpose |
|---|---:|---|
| Free | $0 | Ingredient database, supplier directory, limited tools |
| Maker | CA$12/month | Formulas, costing, labels |
| Studio | CA$29/month | CNF workflow and export package |
| Business | CA$59/month | Unlimited formulas, brands, advanced records |

## One-Time Digital Products

Add these early because many makers may not subscribe immediately:

| Product | Suggested Price |
|---|---:|
| Cosmetic Label Checklist Canada | $19 |
| CNF Preparation Checklist | $29 |
| Handmade Soap Compliance Starter Kit | $39 |
| Cosmetic Formula Costing Template | $19 |
| Start Selling Cosmetics in Canada Bundle | $79–$149 |

## Affiliate / Referral Opportunities

Later, add partnerships for:

- Ingredient suppliers
- Packaging suppliers
- Label printers
- Insurance brokers
- Bookkeeping/tax services
- Product photography
- Market booth supplies

## Optional Services

Later, offer or refer:

| Service | Suggested Price |
|---|---:|
| Label readiness review | $49–$99 |
| CNF preparation assistance | $99–$249 |
| Formula costing setup | $49–$149 |
| Product launch checklist session | $99–$199 |
| Website/Etsy setup for makers | $300–$1,500 |

---

# Build Priorities

## P0 — Must Build Before Public Launch

- [ ] Safer homepage copy
- [ ] Disclaimer and trust pages
- [ ] Data source / last reviewed system
- [ ] Public SEO page template
- [ ] `/cosmetic-notification-form-canada`
- [ ] `/cosmetic-label-requirements-canada`
- [ ] `/health-canada-cosmetic-hotlist`
- [ ] Basic CNF Readiness Checker
- [ ] Email capture or account creation CTA
- [ ] Build/typecheck pass

## P1 — Build After First Launch

- [ ] Ingredient detail pages
- [ ] Supplier detail pages
- [ ] Costing polish
- [ ] Label generator polish
- [ ] Stripe plan enforcement
- [ ] User onboarding flow
- [ ] PDF report export
- [ ] Internal linking blocks
- [ ] FAQ schema support
- [ ] Sitemap/robots verification

## P2 — Build After Validation

- [ ] Portal-compatible `.hcxs` export if validated
- [ ] AI-assisted ingredient entry
- [ ] AI French label helper
- [ ] AI category suggestion
- [ ] Batch records
- [ ] Team accounts
- [ ] Affiliate marketplace
- [ ] BC vendor directory
- [ ] Consultant/referral marketplace
- [ ] Multi-brand workspace

---

# 30-Day Execution Plan

## Week 1 — Reposition and Clean

- [ ] Update homepage copy.
- [ ] Add disclaimer.
- [ ] Add About, Contact, Privacy, Terms, Disclaimer, Data Sources pages.
- [ ] Confirm FormulaNorth branding.
- [ ] Run build/typecheck.
- [ ] Fix obvious runtime/build issues.

## Week 2 — SEO Foundation

Publish:

- [ ] Cosmetic Notification Form Canada guide
- [ ] Cosmetic Label Requirements Canada guide
- [ ] Health Canada Hotlist guide
- [ ] INCI Name Lookup Canada page
- [ ] Canadian Cosmetic Ingredient Suppliers page

Add internal links to:

- [ ] Ingredient database
- [ ] Supplier directory
- [ ] Formula builder CTA
- [ ] Free tool CTA

## Week 3 — Free Tool Launch

Build:

- [ ] CNF Readiness Checker
- [ ] Downloadable or email-gated checklist
- [ ] CTA to save product as a formula

## Week 4 — Paid MVP Polish

Improve:

- [ ] Formula creation
- [ ] Ingredient table
- [ ] Batch scaling
- [ ] Costing
- [ ] Label output
- [ ] Basic upgrade limits
- [ ] Stripe checkout/subscription flow

At the end of 30 days, target:

> Public SEO site + free CNF checker + usable formula/costing/label beta.

---

# Do Not Build Yet

Avoid spending time on these until the core product is validated:

- Full marketplace
- Consultant directory
- Advanced AI agent
- Generic BC vendor compliance hub
- Official `.hcxs` upload claims
- Mobile app
- Complex team permissions
- Food vendor compliance
- Candle compliance
- Too many cosmetic categories too early

Stay focused on:

> Ingredient lookup → formula builder → costing → label generator → CNF readiness/export package.

---

# Success Metrics

## First 30 Days

- 5–10 public SEO pages live
- 1 free tool live
- 100+ email signups or free users
- 20+ test users from maker groups
- 5–10 real formulas created
- 3–5 makers willing to give feedback

## First 90 Days

- 50–100 ingredient/supplier/public pages
- 1,000–5,000 monthly organic visits
- 500+ free users/email leads
- 20–50 paid users
- $500–$1,500/month early revenue target

## 12-Month Target

- 300–500 public SEO pages
- 10,000–30,000 monthly organic visits
- 200–500 paid users
- $3,000–$10,000/month revenue potential if execution is consistent

---

# Codex Build Instruction

When using Codex, work in small vertical slices. Do not attempt to build the entire roadmap in one prompt.

Recommended first Codex task:

```txt
Read docs/ROADMAP.md and the existing FormulaNorth codebase. Start with Phase 0. Update homepage copy to use safer FormulaNorth positioning, add disclaimer/trust pages, add footer links, and ensure all compliance-related copy avoids guaranteed compliance or official Health Canada upload claims. Keep existing design style. Run typecheck/build and fix errors.
```

Recommended second Codex task:

```txt
Implement the public SEO page system for Phase 1. Create reusable SEO guide components and add the first three pages: /cosmetic-notification-form-canada, /cosmetic-label-requirements-canada, and /health-canada-cosmetic-hotlist. Include metadata, FAQ sections, disclaimers, internal links, and last-reviewed dates.
```

Recommended third Codex task:

```txt
Build /tools/cnf-readiness-checker as a free public tool. It should collect product basics, ingredient list, company details, label status, and claims, then return a readiness checklist with missing fields and warnings. It must include disclaimers and a CTA to create an account or save as a formula.
```
