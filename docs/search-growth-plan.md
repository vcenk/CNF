# FormulaNorth Search Growth Plan

> Started: 2026-09-13
>
> Goal: earn qualified Canadian search traffic for soap formulation and cosmetic
> compliance, then convert that traffic into tool usage, accounts, and purchases.

## Strategy

FormulaNorth should not create one page for every keyword variation. Closely
related phrases belong on one strong canonical page. New pages are justified only
when the searcher is trying to complete a different task.

Exact Canadian search volume and bid ranges must be exported from Google Keyword
Planner before paid budgets are approved. The ordering below uses current search
result competition, FormulaNorth's existing product fit, and commercial intent as
demand signals; it does not invent volume figures.

## Keyword-to-page map

| Priority | Search cluster | Intent | Canonical landing page | State |
|---|---|---|---|---|
| P0 | soap calculator, lye calculator, soap recipe calculator | Calculate a batch | `/tools/soap-calculator` | Strengthened |
| P0 | soap SAP values, NaOH SAP chart, KOH SAP chart, soap oil properties | Compare formulation data | `/soap-sap-values-chart` | Created |
| P0 | soap recipes, cold-process soap recipes | Find and adapt a formula | `/tools/soap-calculator/recipes` | Existing; enrich next |
| P0 | sell handmade soap Canada, soap business Canada | Understand the selling workflow | `/how-to-sell-handmade-soap-in-canada` | Existing; source/review pass next |
| P0 | cosmetic notification form Canada, CNF Canada | Complete a compliance task | `/cosmetic-notification-form-canada` | Existing; source/review pass next |
| P0 | cosmetic label requirements Canada, INCI label Canada | Prepare a compliant label | `/cosmetic-label-requirements-canada` | Existing; source/review pass next |
| P1 | NaOH vs KOH soap | Choose an alkali | New focused guide linked to calculator | Planned |
| P1 | soap superfat percentage, lye discount | Choose superfat deliberately | New focused guide linked to calculator | Planned |
| P1 | lye concentration vs water-to-lye ratio | Configure water correctly | New focused guide linked to calculator | Planned |
| P1 | how to calculate lye for soap | Learn the calculation | Expand calculator methodology before deciding on a separate page | Started |
| P1 | how to make cold-process soap | Follow a first batch | `/blog/cold-process-soap-step-by-step` | Existing; add original evidence |
| P1 | soap making supplies Canada | Buy appropriate equipment/materials | `/blog/soap-maker-starter-kit` | Existing; update sources and proof |
| P2 | cosmetic ingredient database Canada, INCI lookup Canada | Research an ingredient | `/ingredients` and `/inci-name-lookup-canada` | Consolidate positioning |

## Implementation sequence

### Phase 1 — crawlability and landing-page quality

- Use a build-safe blog manifest so all editorial URLs appear in the deployed
  sitemap.
- Remove unfinished `/resources` from the sitemap until the page provides value.
- Include the new SAP chart and core trust pages in the sitemap.
- Strengthen the soap calculator title, H1, description, methodology, internal
  links, safety source, and Canadian relevance.
- Publish the server-rendered SAP reference table as a distinct comparison-intent
  page, not a duplicate calculator page.
- Validate the sitemap in the production build and resubmit it in Search Console.

### Phase 2 — expertise and evidence

- Add a named author and qualified technical reviewer to soap and compliance
  content.
- Record the source and review date for SAP, regulatory, and safety claims.
- Add original batch photographs, calculation screenshots, and documented test
  observations where the team has genuinely performed the work.
- Correct or qualify claims that imply universal safety, guaranteed soap quality,
  or regulatory approval.
- Add a visible editorial and correction policy.

### Phase 3 — supporting demand pages

Create the three P1 formulation guides only after Phase 2's author/reviewer and
source pattern is ready. Each guide must contain worked examples, decision tables,
and links into the live calculator. Do not publish templated introductions or
near-duplicate FAQ pages.

### Phase 4 — authority and distribution

- Ask Canadian ingredient suppliers, soap educators, maker guilds, and market
  organizations to review or reference genuinely useful FormulaNorth resources.
- Publish original benchmark material such as differences between calculator
  outputs, supplier-lot SAP ranges, or anonymized maker workflow findings.
- Share the tool where it solves an existing community question; never buy links
  or automate promotional comments.

## Google Ads launch plan

Paid campaigns should acquire customers, not manufacture AdSense impressions.

1. Import the landing pages into Keyword Planner with location set to Canada and
   language split between English and French where appropriate.
2. Start with Search only. Keep the calculator, compliance, labels, and
   sell-soap intents in separate tightly themed ad groups.
3. Begin with exact and phrase match. Add negative terms such as `soap opera`,
   `soap2day`, `TV`, `jobs`, and unrelated finished-soap shopping searches.
4. Track meaningful conversions before spending: calculator completion, account
   creation, saved recipe, pricing visit, checkout, and purchase.
5. Send each ad to the matching page, not the homepage.
6. Evaluate cost per qualified conversion and paid-customer acquisition cost.
   Do not optimize for page views or AdSense impressions.

## Measurement

Review every 28 days:

- Search Console: indexed canonical pages, impressions, clicks, CTR, average
  position, and query-to-page mapping.
- Google Ads: search terms, conversion rate, cost per conversion, top impression
  share, and landing-page experience.
- Product analytics: calculator completions, account conversion, recipe saves,
  paid conversion, and revenue by landing page.

The first organic milestone is not “rank number one for soap.” It is reaching
positions 4–20 for relevant long-tail Canadian queries, improving those pages
from real query data, and moving qualified clusters into the top ten.

## Primary Google references

- [Google Search Essentials](https://developers.google.com/search/docs/essentials)
- [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Keyword Planner](https://support.google.com/google-ads/answer/7337243/use-keyword-planner)
- [About Ad Rank](https://support.google.com/google-ads/answer/1722122)
- [Google Ads conversion tracking](https://support.google.com/google-ads/answer/1722054)
