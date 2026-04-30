# FormulaNorth Backlog

Living list of "do later" items captured during build sessions. Separate
from `docs/ROADMAP.md` (which is the original phased plan). Tick items as
they ship.

## Content / data

- [ ] **Expand Canadian supplier directory.** Currently 7 suppliers in DB
      (Voyageur, Windy Point, Candora, Canwax, New Directions, Saffire
      Blue, Coop Coco). Targets:
      - Source maker submissions from `user_feedback` where
        `source = 'suppliers'`
      - Add 20–30 more well-known Canadian suppliers (organic, body care,
        candle suppliers crossing into cosmetics, soap-specific shops)
      - Group submissions by province for balanced coverage outside ON / BC
      - Consider letting paid-tier users add private supplier records to
        their workspace
- [ ] **Add more soap recipes** as feedback rolls in from FB groups.
      Source new ones from maker submissions, not from copying paid
      reference books.
- [ ] **More ingredients** with full hotlist + supplier coverage. Current
      DB has ~250 ingredients; aim for 500+ for SEO depth.
- [ ] **Hreflang / French content variants** if FR audience grows. Not
      needed at launch — site is English with bilingual label tooling.

## Soap maker tab — full integration

- [ ] **Per-formula soap recipe persistence.** Currently the Soap Maker
      tab on a formula renders the standalone calculator inline; state
      lives in URL only. Maker-tier users should have their soap recipe
      auto-saved to a new `formula_soap_config` table and reload on
      revisit. Schema sketch in `lib/soap-calculator.ts` (`ShareableRecipe`
      type already matches the persisted shape).
- [ ] **Pre-seed soap calculator from the formula's existing oils.** Map
      `formula_ingredients` rows that match `SOAP_OILS_BY_SLUG` and
      auto-populate the Soap Maker tab on first open.
- [ ] **Recipe library: import to formula.** "Save this recipe as a
      FormulaNorth formula" button on each
      `/tools/soap-calculator/recipes/[slug]` page that creates a new
      formula pre-populated with the recipe's oils.

## Monetisation

- [ ] **Stripe subscription checkout** for Maker / Studio / Business.
      Until then paid tiers are waitlist-only. When ready: Stripe
      Products + recurring Prices, `/api/billing/checkout` with
      `mode: "subscription"`, webhook handler updating
      `profiles.subscription_tier`, customer portal link in
      `/dashboard/account`. Estimated 4–8 hours.
- [ ] **AdSense ad placements** once Google approves the site. Best
      candidates: blog post pages, SEO guide pages. Avoid: free tools,
      auth pages, anything inside the formula builder.
- [ ] **One-time digital products** (per `docs/ROADMAP.md` monetisation
      plan): label checklist PDF, CNF prep checklist, soap costing
      template. Use existing `shop_products` table.

## Auth / accounts

- [ ] **Desktop user-menu dropdown.** Currently desktop nav shows a
      "Dashboard" button when logged in but no Account / Sign out path
      from the public surface. Add an avatar / name dropdown with
      Account, Settings, Sign out.
- [ ] **Email-based sign-in for waitlist members** when paid plans flip
      on. Auto-promote `email_subscribers` rows tagged
      `source = 'waitlist:maker'` etc. to Maker/Studio when those plans
      open.
- [ ] **Forgot password flow.** Supabase has it built-in but we don't
      surface it on `/auth/login`.

## SEO / growth

- [ ] **RSS feed for the blog** at `/blog/rss.xml`. ~30 lines of code,
      good for indexing and feed readers.
- [ ] **Hero / blog post images.** All blog posts and SEO guides
      currently render text-only. Adding hero images (or generated SVG
      patterns) improves social shares + on-page engagement.
- [ ] **More BC city-specific market checklists** beyond Vancouver if
      groups ask (Victoria, Kelowna, Calgary cross-border).
- [ ] **Search Console URL Inspection** — manually request indexing for
      the top 10 priority pages after sitemap submission. Doc which
      pages got requested and when.

## Reliability / ops

- [ ] **Production smoke-test script.** A small script or scheduled
      function that hits the homepage, /sitemap.xml, /tools/cnf-readiness-checker,
      /tools/soap-calculator, and /auth/login on each deploy and flags
      regressions in Slack/email.
- [ ] **Backup strategy for Supabase.** Free tier has limited backups;
      paid tier has more. Decide and document.
- [ ] **Per-page `keywords` metadata** for higher-value SEO pages.
      Search engines deprecated meta keywords largely, but it's still
      worth ~30 minutes of polish.

## UX polish

- [ ] **Image alt text audit.** Currently most pages don't have inline
      images, but as we add hero images / blog illustrations, they need
      alt text for SEO + accessibility.
- [ ] **Forgot password / magic link sign-in.** Reduces friction.
- [ ] **AI claim rewriter improvements.** Currently rewrites once per
      submit. Could let users iterate ("more concise" / "more sensory" /
      "less floral").
- [ ] **Dashboard onboarding tour.** First-time users land on
      `/dashboard` after signup — show a short walkthrough overlay
      covering "Create your first formula" → ingredient table → costing
      → label → CNF prep.

## Nice-to-haves discovered mid-session

- [ ] Make `Input` / `Button` / `Textarea` primitives carry
      `suppressHydrationWarning` by default so password-manager
      extensions stop triggering hydration warnings everywhere.
- [ ] Per-formula soap-config persistence (above) + image attachments
      (recipe photos).
