/**
 * Site URL precedence:
 *   1. NEXT_PUBLIC_SITE_URL — explicit override (set in Vercel)
 *   2. https://formulanorth.ca — production default once the .ca domain
 *      is wired up
 *
 * The Vercel preview URL (formulanorth.vercel.app) is intentionally NOT
 * the default — canonical URLs / sitemap / OpenGraph all reference the
 * .ca domain so SEO concentrates there. Set NEXT_PUBLIC_SITE_URL in
 * preview deploys if you want them to canonicalize to the preview URL.
 */
export const siteConfig = {
  name: "FormulaNorth",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://formulanorth.ca",
  description:
    "FormulaNorth helps Canadian indie cosmetic makers organize formulas, ingredient research, costing, labels, and CNF preparation work in one place.",
  tagline: "Formulate. Comply. Sell.",
  locale: "en_CA",
};
