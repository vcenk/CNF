/**
 * Build-safe blog inventory used by routes that execute after deployment.
 *
 * The MDX reader uses the local filesystem during the Next.js build. Serverless
 * metadata routes do not reliably receive that content directory, so sitemap
 * generation must import a static manifest that the bundler can trace.
 */
export const BLOG_POST_MANIFEST = [
  { slug: "choosing-your-first-soap-oils", date: "2026-04-29" },
  { slug: "cold-process-soap-step-by-step", date: "2026-04-29" },
  { slug: "fragrance-allergen-rules-2026", date: "2026-04-30" },
  { slug: "hotlist-ingredients-to-avoid-canada", date: "2026-07-27" },
  { slug: "how-to-file-cnf-canada", date: "2026-07-27" },
  { slug: "pricing-handmade-cosmetics", date: "2026-04-10" },
  { slug: "soap-maker-starter-kit", date: "2026-04-29" },
  { slug: "understanding-inci-names", date: "2026-04-13" },
] as const;
