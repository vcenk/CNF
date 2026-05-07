# SEO / GEO / Indexing Audit — FormulaNorth

> Comprehensive audit of the site's organic-search and AI-search posture.
> Separates real signal from 2010s-era cargo-cult advice.
>
> **Originally a homepage-only audit (Section 1) — implemented and shipped
> 2026-05-03. Section 2 below extends the audit to the full project,
> including GEO (AI-search citation) and indexing infrastructure.**

---

## Section 1 — Homepage SEO audit (originally proposed; SHIPPED)

**Site:** FormulaNorth — free + paid tools for Canadian indie cosmetic
makers (CNF preparation, ingredient database, bilingual label drafting,
soap calculator, supplier directory).

**URL:** https://formulanorth.ca/

**Audience:** Canadian indie cosmetic makers (soap, lotion, balm, body
products) preparing to file Cosmetic Notification Forms with Health
Canada and ship product to market.

**Audit date:** 2026-05-03

---

## Step 1 — Inspection (live homepage)

| Element | Current value | Notes |
|---|---|---|
| `<title>` | `FormulaNorth \| Formulate. Comply. Sell.` | **39 chars** — well under Google's 60-char display limit. Brand-first. No primary keyword. |
| Meta description | "FormulaNorth helps Canadian indie cosmetic makers organize formulas, ingredient research, costing, labels, and CNF preparation work in one place." | **145 chars** — within 140-165 sweet spot. Brand-first; primary keyword phrase is implicit, not leading. No CTA. |
| H1 | "Formulate. Comply. Sell." | Punchy brand tagline. Zero keyword signal. |
| First paragraph | "FormulaNorth helps Canadian indie cosmetic makers organize ingredients, build formulas, calculate costs, draft bilingual labels, and prepare CNF information with less confusion." | Echoes the description. Reasonable but generic; "less confusion" is filler. |
| JSON-LD types emitted | `Organization`, `WebSite`, `SoftwareApplication` (with `AggregateOffer` inside) | All three are accurate and valid. SoftwareApplication is the right primary type for this site. |
| Word count (visible main content) | ~575 words | Within healthy range for a tool-led homepage. Not thin, not bloated. |

---

## Step 2 — Triage of common SEO recommendations

| Recommendation | Verdict | Reasoning |
|---|---|---|
| **(a) Move keyword to start of `<title>`** | **VALID** | Brand-first titles work for sites with established brand recognition. FormulaNorth is brand-new with zero SEO equity in the name — leading with the keyword phrase captures search-result clicks before users know who we are. |
| **(b) Move keyword to start of meta description** | **VALID (mild)** | Description is decent but starts with brand. Leading with the keyword phrase reinforces relevance to search query and matches user intent at the SERP. |
| **(c) Add "since 2015" / "10 years of experience" phrasing** | **CARGO-CULT — and unethical** | Site went live in 2026. Faking domain age is deceptive, easily disprovable via WHOIS / Wayback Machine, and erodes trust. Will be flagged in any honest review. **Do not do.** |
| **(d) Pad homepage to 4,000–5,000 words** | **CARGO-CULT** | Word count is correlated with depth, not causal. A tool-led homepage is supposed to be scannable — long-form content belongs in `/blog`, not `/`. Bloat hurts UX, increases bounce, and Google's helpful-content systems can demote pages that read like padding. |
| **(e) Add Product / AggregateOffer / AggregateRating / Review schemas** | **PARTIAL** | `AggregateOffer` is already inside the `SoftwareApplication` schema — correct. `Product` doesn't apply (homepage isn't a product page). `AggregateRating` and `Review` would be **schema spam** without real reviews — Google can issue manual actions for fake structured data. Don't add these until you actually collect ratings. |
| **(f) Add WebSite / Organization / BreadcrumbList / ItemList / CollectionPage / FAQPage where they accurately describe the page** | **PARTIAL** | `WebSite` + `Organization` already present (good). `BreadcrumbList` doesn't apply to the homepage (it IS the root). `ItemList` is a legitimate add — there's a "6 free tools" section that maps cleanly to ItemList. `CollectionPage` is a misfit (homepage isn't a curated collection per Schema.org). `FAQPage` is valid only if a real FAQ section exists — currently none on the homepage; could add one. |
| **(g) Stuff target keyword into anchor text of every internal link** | **CARGO-CULT** | This pattern (over-optimised anchor text) has been a Penguin demotion signal since 2012. Modern Google rewards natural anchor variation. Stuffing the same keyword phrase across every internal link looks spammy and risks suppression. |
| **(h) Submit URL to 50+ directory backlink sites** | **CARGO-CULT** | Effective in 2010, harmful since Penguin (2012). Low-quality directories carry zero link equity now and can attract a Manual Action ("unnatural inbound links") if done at scale. Better: 3-5 high-authority Canadian small-business or indie-maker directories that are already curated. |
| **(i) Ensure H1 contains primary target keyword** | **VALID — with finesse** | Current H1 "Formulate. Comply. Sell." is brand-strong but keyword-zero. For a brand-new site, this is leaving search relevance on the table. Recommended pattern below: keep the punchy tagline as a styled hero element, promote a keyword-rich H1 underneath it. Sites like Linear and Notion do this routinely. |

---

## Step 3 — Proposed rewrites

### Primary target keyword

**Primary phrase:** `cosmetic compliance and formulation software for Canadian makers`

This phrase wins because it captures the **full** value proposition (compliance + formulation), names the **audience** (Canadian makers), and matches commercial-intent searches from people who are actually looking for a product like FormulaNorth. It's long-tail but has bottom-of-funnel intent.

**Secondary phrases (use across H2s, sections, internal links — natural variation):**

1. `Cosmetic Notification Form (CNF) preparation` — high-intent; what users Google when they're filing with Health Canada
2. `Canadian cosmetic ingredient database` — informational; targets research-stage searchers
3. `Soap recipe calculator Canada` — head-term for the soap calculator
4. `Bilingual cosmetic label generator` — captures EN/FR label-drafting search intent

### Proposed `<title>` (50-60 chars, keyword-first)

**Recommended:**
```
Cosmetic Compliance & Formulation Software | FormulaNorth
```
**57 chars.** Keyword-first, brand at end. Within Google's 60-char display limit on desktop and mobile.

**Alt option (more action-led):**
```
CNF Prep, Ingredient Database & Soap Calc | FormulaNorth
```
**56 chars.** Front-loads the three concrete deliverables; risk is it reads like a feature list rather than a category.

### Proposed meta description (140-165 chars, keyword-first, ends with soft CTA)

**Recommended:**
```
Cosmetic compliance and formulation software for Canadian indie makers — CNF preparation, ingredient database, bilingual labels, and soap calculator. Free to start.
```
**164 chars.** Starts with primary keyword phrase, lists concrete differentiators, ends with low-friction CTA. No "Click here!" pushiness.

### Tightened first paragraph (keyword present, no stuffing)

**Current:**
> "FormulaNorth helps Canadian indie cosmetic makers organize ingredients, build formulas, calculate costs, draft bilingual labels, and prepare CNF information with less confusion."

**Proposed:**
> "FormulaNorth is **cosmetic compliance and formulation software** built for Canadian indie cosmetic makers — CNF preparation, ingredient research with Hotlist flags, bilingual EN/FR label drafting, costing, and a soap calculator, all in one workspace."

Keyword phrase appears once, naturally, in the first 8 words. Removes "less confusion" filler. Names concrete deliverables that mirror what users searched for.

### H1 — recommended pattern

The current H1 is brand voice gold. Don't kill it — promote it visually but reorganize the heading structure so the keyword-rich version is the actual `<h1>`:

**Proposed structure:**

```jsx
<p className="...uppercase tracking-wider text-brand">
  For Canadian indie cosmetic makers
</p>
<h1>Cosmetic compliance & formulation, in one workspace.</h1>
<p className="text-3xl font-display">Formulate. Comply. Sell.</p>
```

The H1 carries the keyword. "Formulate. Comply. Sell." stays as a styled tagline directly underneath — visually equally prominent, semantically supportive. Google sees the keyword H1; users see both.

### Schema additions to evaluate

| Schema type | Add? | Justification |
|---|---|---|
| `ItemList` (6 free tools as items) | **Yes** | Accurately describes the "Everything a Canadian maker needs" section. Each tool can be a `SoftwareApplication` sub-item with name + URL. Makes the homepage eligible for Search "carousel" treatment for the tool grid. |
| `FAQPage` | **Conditional** | Only if you add 3-5 real FAQs to the homepage. FAQ rich results still display in Search and are zero-spam-risk when the FAQs are real. Suggest adding a small FAQ section ("Is FormulaNorth free?", "Do I need a Health Canada license?", "How is this different from a US soap calculator?", etc.). |
| `BreadcrumbList` | **No** | Homepage is the root — no breadcrumb hierarchy to describe. |
| `CollectionPage` | **No** | Homepage isn't a curated collection in Schema.org's sense. SoftwareApplication + ItemList already describe the page accurately. |
| `Product` | **No** | Not a product page. Adding it would be schema spam. (Reserve for `/shop/[slug]` pages, which don't exist yet.) |
| `AggregateRating` / `Review` | **No** (yet) | Don't have real ratings. Adding fake ones risks a manual action. Revisit when you genuinely collect testimonials. |

---

## What this audit explicitly refuses to recommend

These show up in cheap SEO checklists but are either ineffective or actively harmful:

- ❌ Faking founding year, "since" claims, or company history
- ❌ Schema types that don't accurately describe the page (Product on a non-commerce homepage = structured-data spam)
- ❌ Padding word count to hit a magic number
- ❌ Exact-match keyword anchor text on every internal link
- ❌ Mass directory submission / link farms / PBN backlinks
- ❌ Hidden text or "SEO blocks" at the bottom of the page
- ❌ Hiding ownership of related/sister sites

---

## Recommended order of operations (when you approve)

1. **Title + meta description rewrite** — 5-minute change, biggest immediate SERP impact
2. **First paragraph rewrite** — same edit window, reinforces keyword relevance
3. **H1 restructure** — small JSX change, preserves brand voice while gaining keyword signal
4. **`ItemList` schema for the 6 free tools** — pure additive; no UX change, eligible for tool-carousel rich results
5. **(Optional) Add FAQ section + `FAQPage` schema** — content work; requires 3-5 real FAQs

Items 1-4 can ship in one PR. Item 5 is a separate session.

---

## What we're NOT changing

- Word count (575 is fine — don't pad)
- Brand voice / "Formulate. Comply. Sell." tagline (keep, just demote to sub-tagline)
- Existing Organization / WebSite / SoftwareApplication schemas (correct as-is)
- robots.txt, sitemap.xml, canonical URLs (already correct)
- Internal link anchor text (currently natural; don't keyword-stuff)

---

## Section 2 — Full-project SEO + GEO + indexing audit (2026-05-07)

After the homepage was tightened, we audited every public page in the
codebase plus the AI-search and indexing infrastructure. This is the
honest read of where the project stands site-wide.

### Per-page posture (summary)

Audited 30+ public pages. **The site has unusually disciplined SEO
hygiene for a project this young.** Most pages have proper metadata,
canonical URLs, JSON-LD, and dates. A `buildSeoGuideMetadata` helper
centralizes the pattern across the long-tail SEO landing pages.

| Surface | Status |
|---|---|
| Homepage | ✅ keyword-first title/H1, ItemList schema (Section 1) |
| Blog index `/blog` | ✅ metadata + canonical; no schema (acceptable for index) |
| Blog post `/blog/[slug]` | ✅ BlogPosting + BreadcrumbList, datePublished/dateModified |
| Soap recipes `/tools/soap-calculator/recipes/[slug]` | ✅ Recipe + BreadcrumbList, image, author, dates, prepTime, totalTime, recipeYield, hero image (shipped 2026-05-03) |
| Tool pages (6) | ✅ WebApplication + FAQPage + BreadcrumbList |
| Pricing `/pricing` | ✅ SoftwareApplication with Offer |
| Ingredients `/ingredients/[slug]` | ✅ Product + BreadcrumbList |
| Suppliers `/suppliers/[slug]` | ✅ LocalBusiness + BreadcrumbList — strong local-SEO signal |
| BC regional pages | ✅ via `buildSeoGuideMetadata` helper |
| Long-tail SEO guides (CNF, Hotlist, INCI, etc.) | ✅ via `buildSeoGuideMetadata` helper, with datePublished/dateModified |
| Tools index `/tools` | ⚠️ → ✅ canonical added (this audit) |
| Guides index `/guides` | ⚠️ → ✅ canonical added (this audit) |
| `/about` | ⚠️ no JSON-LD (optional polish) |
| Custom 404 | ❌ → ✅ added (this audit) |

### GEO (Generative Engine Optimization) — what AI search engines need

GEO is the discipline of getting cited by AI-search interfaces (ChatGPT
Search, Perplexity, Google AI Overviews, Bing Copilot, Claude). Different
from SEO: AI engines extract claims, prefer structured factual content,
and increasingly look for an `llms.txt` file the way Google looks for
`robots.txt`.

| GEO signal | Status |
|---|---|
| `llms.txt` at site root (llmstxt.org standard) | ❌ → ✅ added (this audit) |
| Author / Organization on schemas | ✅ already in place |
| `datePublished` / `dateModified` on time-sensitive content | ✅ via `buildSeoGuideMetadata` helper and BlogPosting |
| Clear factual claims with concrete numbers | ✅ disclosure thresholds, allergen counts, Hotlist counts all stated explicitly across the site |
| Trust signals (about, contact, disclaimer) | ✅ DisclaimerCallout component used widely; About + Contact pages exist |
| Citation-worthy structured data (Recipe, LocalBusiness, FAQPage) | ✅ extensive coverage |

`llms.txt` is the highest-value GEO addition because it gives AI crawlers
a curated map of the site's authoritative content with absolute URLs and
short descriptions — increases the odds that AI search engines cite
FormulaNorth instead of generic competitors.

### Indexing infrastructure

| Component | Status |
|---|---|
| `app/robots.ts` | ✅ allows `/`, blocks `/api/`, `/_next/`, `/formulas/`, `/auth/`, `/dashboard/`, `/tools/soap-calculator/print` |
| `app/sitemap.ts` | ✅ covers static pages + dynamic ingredient/supplier/shop/blog/recipe URLs |
| Search Console verification | ✅ google site-verification token in layout |
| Google AdSense `account` meta | ✅ in layout |
| Site-wide `index: true, follow: true` defaults | ✅ |
| Per-page `noindex` flags on private pages | ✅ dashboard, auth, formulas, print, download routes all correctly noindexed |
| `metadataBase` set | ✅ uses `siteConfig.url` |
| Canonical URLs reference `.ca` domain (not Vercel preview) | ✅ |
| Custom 404 page | ❌ → ✅ added (this audit) |

### Fixes shipped in this audit (2026-05-07)

1. **`alternates: { canonical }` added** to `/tools` and `/guides` index pages
2. **`public/llms.txt` created** — full site map in the llmstxt.org markdown format, includes all key URLs grouped by section, plus a "Key facts for citation" block with concrete numbers (allergen counts, threshold dates, Hotlist counts) so AI engines can cite specific facts
3. **Custom `not-found.tsx`** — branded 404 with 6 popular destination cards (Tools, Ingredients, Recipes, Suppliers, Guides, Blog) and a contact link. Has `robots: { index: false, follow: false }` (correct — 404 pages should not be indexed)

### What we're NOT shipping (deliberate skips)

These showed up as "optional polish" in the audit but aren't worth the work yet:

- ❌ JSON-LD on `/about` — page is fine as-is, schema would be additive but not impactful
- ❌ JSON-LD on `/guides` and `/blog` indexes — index pages without schema are common and acceptable; rich snippets come from individual articles
- ❌ JSON-LD on `/ingredients/hotlist` — large reference table, schema doesn't add much
- ❌ `datePublished` on ingredient pages — ingredient data is reference, not time-sensitive
- ❌ `loading.tsx` — Next.js default loading is fine; bespoke loading states only matter if there's measurable UX gain

### What's next (no action items, just things to revisit later)

When the site has more authority and traffic:

- Consider per-recipe FAQ blocks (genuine FAQs from user feedback) → `FAQPage` extension on recipe pages
- Consider `Review` schema once you collect testimonials
- Consider a dedicated `/changelog` for product updates → `dateModified` signal on whole site
- Track AI-search citations (Perplexity Pages, Bing Copilot citations) once Search Console rolls out AI-overview reporting

### Hard rules respected throughout

- ❌ No fake domain age, fake review counts, fake aggregate ratings
- ❌ No padding pages to hit a word-count target
- ❌ No exact-match keyword anchor text on every internal link
- ❌ No mass directory submissions
- ❌ No schema types that don't accurately describe the page
- ✅ All URLs in `llms.txt` resolve to real pages
- ✅ All numbers in citation block ("32 prohibited", "38 restricted", "81 allergens", "April 12 2026", "August 1 2026") match the actual ingredient database content
