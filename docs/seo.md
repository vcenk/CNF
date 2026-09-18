# FormulaNorth SEO, Search Console, and AdSense Readiness

> Last audited: 2026-09-13
> Scope: repository, production HTML, live `robots.txt`, `sitemap.xml`,
> `ads.txt`, representative Search results, the supplied AdSense rejection,
> and the supplied Google Search Console Page Indexing report.

## Executive diagnosis

FormulaNorth's technical SEO foundation is mostly sound. The AdSense rejection
is not caused by a missing meta tag, sitemap, or schema type. The strongest
explanation is the site's current **inventory-quality profile**:

- Google sees a large indexable footprint dominated by programmatic database
  pages: 280 ingredient pages and 25 ingredient-function pages in a 373-URL
  sitemap.
- Search Console reports 21 URLs as **Crawled - currently not indexed**, and a
  validation attempt failed. The examples span guides, ingredient records, a
  tool, a blog post, filtered URLs, and generated image URLs.
- Much of the regulatory content has no visible person-level author or reviewer,
  no author credentials, and no inline primary-source citations. This is a major
  trust gap for content that can affect product safety and legal compliance.
- Several indexable surfaces are objectively weak inventory: an under-
  construction resources page, thin category pages, a duplicate supplier page,
  and short product pages.
- The global AdSense script is present on every route. If Auto ads are enabled,
  route exclusions must prevent ads on dashboards, authentication, checkout,
  result/utility screens, empty states, and other non-content pages.

The site has real potential and useful tools. The approval problem is that the
original value is not yet demonstrated consistently across the indexable URL
set. More schema or more keyword variations will not solve that.

## Evidence captured in this audit

### AdSense

The supplied AdSense screen states:

- Site ownership: verified.
- Policy finding: **Low value content**.
- Site status: not ready to show ads.

Google Publisher Policies prohibit Google-served ads on screens with no or
low-value publisher content, on pages under construction, and on replicated
content without meaningful added value. Google's site-readiness guidance also
asks whether the content is distinctive, original, useful, and supported by
clear navigation.

### Search Console

The supplied Page Indexing screenshots show:

- 21 affected pages under **Crawled - currently not indexed**.
- Validation started 2026-07-14 and failed 2026-07-24.
- Current examples include:
  - `/sell-bath-bombs-canada`
  - `/cosmetic-ingredient-suppliers-canada`
  - `/inci-name-lookup-canada`
  - `/ingredients/hotlist`
  - multiple `/ingredients/[slug]` pages
  - `/tools/cosmetic-cost-calculator`
  - `/blog/soap-maker-starter-kit`
  - filtered `/ingredients?...` URLs
  - generated icon and Open Graph image URLs

`Crawled - currently not indexed` is not a technical error by itself. It means
Google fetched the URL but did not currently choose it for the index. In this
case, the mix of affected page types is consistent with a site-level quality
and differentiation problem rather than a discovery failure.

The filtered URLs and generated images are historical noise that the current
deployment already handles correctly:

- filtered ingredient URLs return `noindex, follow`;
- `/icon`, `/apple-icon`, and `/opengraph-image` return an
  `X-Robots-Tag: noindex` header, including on the hashed query URLs shown in
  Search Console.

Those URLs may remain in the report until Google recrawls them. Do not reverse
the correct `noindex` directives just to make the validation counter reach zero.

### Additional Search Console exclusions supplied 2026-09-13

The later screenshots add two reports:

1. **Excluded by `noindex` tag — 42 URLs.** The examples are filtered or
   paginated views under `/ingredients`, `/suppliers`, `/blog`, and `/shop`.
   Live checks of representative URLs confirmed `noindex, follow` and a clean
   canonical pointing to the unfiltered collection. This is the intended state:
   these URLs are useful navigation states but are not separate search results.
   The failed validation does not require a code change; validation was run
   against URLs that should remain excluded.
2. **Duplicate without user-selected canonical — 2 URLs.** Both are tracking
   variants of `/blog/fragrance-allergen-rules-2026`, using
   `?source=label-guide` and `?source=cnf-guide`. Both live URLs now return HTTP
   200 and declare `https://formulanorth.ca/blog/fragrance-allergen-rules-2026`
   as their canonical. Current internal alert links also use the clean URL. The
   report therefore reflects an older crawl or canonical state. Inspect each
   exact variant in URL Inspection, run **Test live URL**, and request validation
   only after Google reports the declared canonical from the current HTML.

Do not add filtered or tracking variants to the sitemap. If `source` attribution
is no longer needed, a redirect that removes only that known tracking parameter
would make the signal stronger, but the current clean canonical is already a
valid consolidation signal.

### Production crawl

The live sitemap returned HTTP 200 and contained 373 URLs:

| Page class | URLs |
|---|---:|
| Ingredient detail pages | 280 |
| Ingredient function pages | 25 |
| Recipe detail pages | 18 |
| Editorial/guide pages | 15 |
| Supplier detail pages | 10 |
| Shop product pages | 5 |
| Homepage | 1 |
| Indexes and other pages | 19 |

All 373 URLs returned successfully when transient parallel-crawl failures were
retried sequentially. Every successful sitemap page had a canonical and one
H1. This confirms that basic HTML delivery is not the primary blocker.

Diagnostic content counts from rendered `<main>` content:

- 39 sitemap URLs had fewer than roughly 250 visible words.
- 330 had fewer than roughly 500 visible words.

These are **not ranking thresholds**—Google has no preferred word count. They
are useful here only because they expose how much of the indexable footprint is
made of short, templated records or category lists.

### Sitemap gap

The production sitemap omits all eight blog posts even though the source code
maps `getAllPostSlugs()` into the sitemap. It also omits these trust pages:

- `/about`
- `/contact`
- `/privacy`
- `/terms`
- `/disclaimer`
- `/data-sources`

The build trace for the dynamic sitemap route does not include
`src/content/blog/*.mdx`. That explains why filesystem-based blog discovery can
return an empty list in the deployed serverless function. Use a build-time
manifest/static import, or explicitly include the content directory in output
file tracing. Add the trust pages directly to the static sitemap list.

### Content and trust gaps

- The repository contains eight substantial blog posts (about 900-1,700 words
  each) and 18 templated guide pages.
- Across those 26 editorial pages, only one source file contains a direct
  external source URL. A separate `/data-sources` page is helpful but is not a
  substitute for claim-level citations.
- Blog schema identifies the author as the FormulaNorth organization. No visible
  byline, reviewer, author page, credentials, or editorial review method is
  presented.
- The About page describes the product but not who created or reviews its
  regulatory and formulation guidance.
- The editorial pages contain no original photographs, diagrams, screenshots,
  worked examples, or other first-hand evidence media.
- `/resources` says resources are “coming soon” while remaining indexable and
  included in the sitemap. This directly resembles the “under construction”
  inventory Google says it will not monetize.
- `/suppliers/windy-point` and `/suppliers/windy-point-soap` have the same title
  and represent the same supplier. Pick one canonical URL and 301 redirect the
  other; do not leave both as self-canonical indexable pages.
- Many ingredient pages repeat the same explanatory template. Some records have
  only a name, status, generic function sentence, related links, and calls to
  action. Those pages do not all deserve independent indexing yet.
- Ingredient function pages under about 200 words mostly repeat a category
  description plus a generated card list. Several add little value beyond the
  main searchable ingredient index.
- Five shop product pages are about 210-230 words in the live HTML. Their value
  should be demonstrated with original previews, exact deliverables, intended
  user, methodology, version/update information, and usage examples.

### Accuracy and consistency risks

- Production Search showed 153 ingredients on the paginated index while the
  homepage could fall back to “250+”. The current source now uses a live count,
  but the fallback should be neutral (“browse the database”), not a larger
  unverifiable number.
- Claims such as “32 prohibited” and “38 restricted” describe the subset in the
  FormulaNorth database, not the full Health Canada Cosmetic Ingredient
  Hotlist. Always label these as database coverage, never as the total size of
  the official Hotlist.
- Contact identity is inconsistent: public support uses
  `support@formulanorth.com`, while privacy requests use a personal Gmail
  address and the primary brand domain is `.ca`. This may be legitimate, but a
  consistent branded contact identity looks more trustworthy.
- Titles generated by some dynamic routes already contain “FormulaNorth” and
  then inherit the root `| FormulaNorth` template. Ingredient function pages can
  render `... | FormulaNorth | FormulaNorth`. Remove the brand from child title
  values and let the root template append it once.
- Ingredient pages use `Product` structured data without an offer, review, or
  aggregate rating. That is not eligible for a Google Product rich result and
  does not accurately describe a reference record. Prefer a plain WebPage plus
  a suitable Schema.org entity only when it truthfully models the content.

## Priority remediation plan

### P0 — complete before requesting another AdSense review

1. **Remove unfinished inventory.** Noindex and remove `/resources` from the
   sitemap until it contains real resources, or publish the promised resources.
2. **Fix sitemap completeness.** Include all blog posts and the six trust pages.
   Replace runtime filesystem discovery with a deployment-safe manifest or
   tracing configuration.
3. **Resolve the duplicate supplier.** Choose one Windy Point slug and 301 the
   other. Remove the redirected URL from the sitemap.
4. **Prune weak programmatic pages.** Keep only ingredient and function pages
   that provide a useful, accurate, independently valuable answer. Apply
   `noindex, follow` to low-information records until they are enriched. A page
   should not be indexable merely because a database row exists.
5. **Add accountable authorship.** Show a real byline and reviewer where readers
   expect one. Link to an About/author section that states relevant lived or
   professional experience truthfully. Never invent credentials.
6. **Add claim-level primary citations.** Regulatory assertions should link to
   the exact Health Canada, Justice Laws, EU regulation, or other authoritative
   passage. Add a “Sources and review method” block to every regulatory guide.
7. **Demonstrate first-hand value.** Add original worked examples, screenshots,
   calculations, testing notes, downloadable checklists, comparison tables, or
   photos that could not be produced by merely paraphrasing public guidance.
8. **Control ad inventory.** Before enabling Auto ads, exclude all auth,
   dashboard, checkout, download, print, utility/result, empty, error, and other
   non-content routes. Confirm the privacy policy describes actual behavior.
9. **Set up consent correctly.** If ads can be served to EEA, UK, or Swiss
   visitors, configure a Google-certified CMP/TCF flow in AdSense Privacy &
   messaging. A privacy-policy paragraph alone is not consent.
10. **Wait for evidence.** Deploy the changes, let Google recrawl, and look for
    improving index coverage and genuine organic traffic before reapplying.
    Approval is discretionary and cannot be guaranteed.

#### Implementation status — September 18, 2026

- Completed: deployment-safe blog manifest, corrected sitemap inventory,
  unfinished `/resources` removal from the sitemap, and a record-quality gate
  for ingredient URLs.
- The quality gate currently keeps 89 of 280 ingredient records in the sitemap.
  The remaining records stay usable but render `noindex, follow` until they have
  a substantive description plus multiple record-specific evidence signals.
- Completed: ingredient reference markup now uses `WebPage`/`DefinedTerm`
  instead of inaccurate `Product` schema.
- Completed for the CNF, Canadian cosmetic-label, and handmade-soap selling
  guides: visible editorial ownership, current review dates, official primary
  source lists, and schema citations. Obsolete `FAQPage` markup was removed
  while the useful visible FAQ content remains.
- Completed: `/suppliers/windy-point` permanently redirects to the canonical
  `/suppliers/windy-point-soap` URL, and the duplicate slug is excluded from the
  sitemap.
- Completed: the AdSense script now loads only on an explicit allowlist of
  substantial editorial routes. Authentication, dashboard, checkout, shop,
  legal, download, print, result, supplier-directory, calculator, and thin
  ingredient-detail routes are excluded from direct-load ad inventory.
- Completed: the soap calculator now includes an original downloadable batch
  record template for formula, process, cure, and release notes.
- Still required: identify a real author or qualified reviewer and publish only
  truthful credentials; configure matching AdSense page exclusions (the script
  can remain resident after client-side navigation), configure consent, deploy,
  resubmit the sitemap, and monitor recrawling before requesting another AdSense
  review.

### P1 — strengthen quality and organic performance

- Consolidate overlapping pages instead of creating a separate page for every
  keyword variation. The CNF guide and CNF blog walkthrough, for example, need
  clearly different jobs or should be merged.
- Turn the strongest guides into definitive resources with named ownership,
  revision history, exact citations, and useful original assets.
- Give each ingredient record unique evidence: exact official source link,
  synonym/identifier notes, formulation role, safety/restriction context,
  supplier-document examples, and a visible correction history where relevant.
- Add an editorial policy covering sourcing, corrections, review cadence, AI
  assistance if material, and conflicts/affiliate relationships.
- Add original images only when they help users. Use descriptive filenames,
  meaningful alt text, stable dimensions, and image sitemaps where worthwhile.
- Improve the blog index so the article list is present in server-rendered HTML,
  not only after a client-side rendering bailout.

### P2 — technical cleanup

- Remove duplicated brand text from dynamic titles and shorten titles that are
  likely to be truncated or rewritten.
- Remove legacy `keywords` metadata; Google Search does not use the meta keywords
  tag.
- Stop treating `changeFrequency` and `priority` as optimization levers; Google
  ignores both. Use accurate `lastModified` values for significant changes.
- Validate supported structured data with Rich Results Test, but remove schema
  that does not accurately describe the page. Schema is not a substitute for
  content quality.
- Add automated checks for sitemap URL status, canonical equality, accidental
  noindex, title duplication, empty states, and source-link coverage.

## Search Console operating procedure

After P0 changes are deployed:

1. Submit the corrected sitemap in Search Console.
2. Inspect the homepage and five representative high-value URLs: one guide, one
   blog post, one tool, one enriched ingredient, and one recipe.
3. Confirm live fetch, indexing allowed, declared canonical, and Google-selected
   canonical.
4. Request indexing for those representative URLs. Do not submit hundreds of
   thin records individually.
5. Check Manual Actions and Security Issues separately; URL Inspection does not
   evaluate all quality or policy conditions.
6. Re-run validation only for a state that should actually change. Do not
   validate the 42 intentional `noindex` filter/category URLs as "fixed."
   Expect reports to update gradually as Google recrawls.
7. Export the Performance report for the last 90 days and review queries, pages,
   impressions, clicks, CTR, and countries. Improve pages with real impressions
   first; prune pages that remain unused and undifferentiated.

## AdSense re-review gate

Do not check “I confirm I have fixed the issues” until all of these are true:

- No public indexable page says “coming soon”, is empty, or is a dead end.
- Duplicate URLs redirect or canonicalize consistently and are absent from the
  sitemap.
- The sitemap contains only canonical, indexable, HTTP 200 URLs worth showing in
  Search.
- Blog posts and trust pages are discoverable in the sitemap and navigation.
- Regulatory content has visible, truthful authorship/review and inline primary
  sources.
- The strongest pages contain original value beyond summaries of official
  guidance.
- Weak generated pages are enriched, consolidated, or noindexed.
- Ads are restricted to substantial publisher-content pages.
- Privacy disclosures match the implementation, and required consent tooling is
  configured.
- Search Console shows recrawling and an improving index pattern; there is some
  genuine audience/organic-use evidence.

## 2026 corrections to older SEO advice

- **FAQ rich results:** Google removed the FAQ rich-result feature from Search in
  June 2026. Visible FAQs can still help readers, but adding `FAQPage` solely for
  Google visibility is obsolete.
- **`llms.txt`:** Google clarified in June 2026 that `llms.txt` is not needed and
  has neither a positive nor negative effect on Google Search visibility. Keep it
  only for other systems or as a maintained public content map.
- **Word count:** Google does not prescribe a minimum word count. Depth,
  originality, accuracy, and task completion matter.
- **Sitemaps:** submission is a hint, not a guarantee of crawling or indexing.
  Google ignores sitemap `priority` and `changefreq`.
- **Schema:** structured data can make eligible content understandable, but it
  does not make low-value content valuable and does not guarantee a rich result.
- **GEO/AEO:** there is no separate shortcut. Google recommends the same
  non-commodity, helpful, reliable, people-first content and sound technical
  access used for Search generally.

## Reusable principles for this and other projects

1. Index only pages that independently satisfy a real user intent.
2. Make the sitemap a curated list of canonical, indexable, successful URLs—not
   a dump of every route or database row.
3. Prefer fewer excellent pages over scaled keyword variants.
4. Show who created and reviewed consequential content, how it was produced, and
   why readers should trust it.
5. Cite primary sources at the claim, not only on a generic sources page.
6. Demonstrate experience with original evidence, examples, data, or media.
7. Keep titles, descriptions, H1s, canonicals, and internal links descriptive and
   natural. Do not keyword-stuff.
8. Use structured data only when it matches visible content and a supported use
   case.
9. Keep non-content, private, filtered, duplicate, and unfinished pages out of
   the index and ad inventory.
10. Measure outcomes in Search Console and analytics; do not optimize to a
    checklist score.

The reusable operational version of these principles lives in
`skills/seo/SKILL.md`.

## Primary references

- [Google AdSense: Make sure your site's pages are ready](https://support.google.com/adsense/answer/7299563)
- [Google Publisher Policies: Inventory value](https://support.google.com/adsense/answer/10502938)
- [AdSense Program policies](https://support.google.com/adsense/answer/48182)
- [Google Search: Helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search: AI feature optimization guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)
- [Google Search: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Search Console: Page indexing report](https://support.google.com/webmasters/answer/7440203)
- [Search Console: URL Inspection](https://support.google.com/webmasters/answer/9012289)
- [Search Console: Manual actions](https://support.google.com/webmasters/answer/9044175)
- [AdSense: CMP requirements for EEA, UK, and Switzerland](https://support.google.com/adsense/answer/13554020)
- [Google Search documentation updates](https://developers.google.com/search/updates)
