import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BetaBadge } from "@/components/marketing/beta-badge";
import { CalculatorForm } from "./calculator-form";

const pathname = "/tools/fragrance-allergen-calculator";
const title =
  "Free Fragrance Allergen Calculator — Canadian Cosmetic Disclosure";
const description =
  "Calculate fragrance allergen percentages in your soap, lotion, or balm formula. Catches Linalool, Limonene, Citral, Eugenol and the other 81 EU/Canadian regulated allergens. Free, no account needed.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    type: "website",
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

const faqs = [
  {
    question: "What is a fragrance allergen calculator?",
    answer:
      "Fragrance oils and essential oils contain regulated allergens (Linalool, Limonene, Citral, Eugenol, and 77 others under the EU/Canadian disclosure list). When you use a fragrance at a known percentage in a formula, this tool calculates each allergen's percentage in the finished product and tells you which exceed the disclosure threshold.",
  },
  {
    question: "What thresholds does the calculator use?",
    answer:
      "Health Canada Section 21.4 of the Cosmetic Regulations defers to the EU Restricted Substances List (Annex III). The thresholds are 0.001% (10 ppm) for leave-on products and 0.01% (100 ppm) for rinse-off products. Above these, an allergen must be individually named on the label and in the CNF ingredient list.",
  },
  {
    question: "Where do I get the allergen percentages for my fragrance oil?",
    answer:
      "Reputable cosmetic ingredient suppliers provide an IFRA Certificate or Allergen Declaration / Statement free on request. The document lists each regulated allergen and its weight percentage in the fragrance. For natural essential oils, you can use the calculator's preset library as a starting point — but always verify against your supplier's actual cert before relying on it for a label.",
  },
  {
    question: "Does this work for the expanded August 2026 list of 81 allergens?",
    answer:
      "Yes. The calculator accepts any allergen INCI name you type and applies the same disclosure threshold. Both the original 24 allergens (in effect April 12, 2026) and the 57 added by EU Regulation 2023/1545 (required for new products from August 1, 2026, all products from August 1, 2028) are covered. Just paste them from your supplier's cert.",
  },
  {
    question: "Is the preset library accurate?",
    answer:
      "Presets are typical values from publicly published references (EU SCCS opinions, IFRA Standards, cosmetic chemistry texts). Real percentages vary by origin, distillation method, and harvest batch. Use presets as a starting point and confirm with your supplier's IFRA cert for production formulas.",
  },
  {
    question: "Is this a substitute for an IFRA Certificate?",
    answer:
      "No. This is preparation support — it helps you compute disclosure thresholds quickly. Your fragrance supplier's IFRA Certificate is the regulatory document. For a CNF filing or a sold product, you must hold the actual cert from the supplier on file.",
  },
];

export default function FragranceAllergenCalculatorPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Fragrance Allergen Calculator",
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Tools",
          item: `${siteConfig.url}/tools`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Fragrance Allergen Calculator",
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Fragrance Allergen Calculator</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Free tool
            </p>
            <BetaBadge />
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Fragrance Allergen Calculator
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Calculate which fragrance allergens cross the Canadian disclosure
            threshold in your soap, lotion, balm, or any cosmetic formula. Add
            your fragrance oils and essential oils, paste allergen percentages
            from your supplier&apos;s IFRA cert, and get a label-ready
            disclosure list.
          </p>
        </header>

        <div className="mb-10">
          <DisclaimerCallout title="This calculator is preparation support, not regulatory review" />
        </div>

        <CalculatorForm />

        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold">
            How the math works
          </h2>
          <p className="mt-3 text-muted-foreground">
            For each allergen, the finished-product percentage is:
          </p>
          <div className="mt-4 rounded-lg border border-border bg-card p-4 font-mono text-sm">
            <span className="text-brand">finished_product_pct</span>(allergen) =
            <br />
            &nbsp;&nbsp;Σ across fragrances:&nbsp;
            <span className="text-foreground">usage_pct_in_formula</span> ×{" "}
            <span className="text-foreground">allergen_pct_in_oil</span> ÷ 100
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Example: Lavender FO at 5% in your formula, containing 8% Linalool.
            <br />
            Linalool in finished product = 5 × 8 ÷ 100 ={" "}
            <strong className="text-foreground">0.4%</strong>. That&apos;s 40×
            the rinse-off threshold (0.01%) and 400× the leave-on threshold
            (0.001%) — must be declared on the label.
          </p>
        </section>

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((f) => (
              <div key={f.question} className="py-5">
                <h3 className="font-medium">{f.question}</h3>
                <p className="mt-2 text-muted-foreground">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Related</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/tools/cnf-readiness-checker",
                label: "CNF Readiness Checker",
              },
              {
                href: "/tools/inci-list-formatter",
                label: "INCI List Formatter",
              },
              {
                href: "/tools/cosmetic-label-checklist",
                label: "Cosmetic Label Checklist",
              },
              {
                href: "/blog/fragrance-allergen-rules-2026",
                label: "Fragrance Allergen Rules 2026 — full breakdown",
              },
              {
                href: "/health-canada-cosmetic-hotlist",
                label: "Health Canada Cosmetic Hotlist",
              },
              {
                href: "/cosmetic-label-requirements-canada",
                label: "Canadian Cosmetic Label Requirements",
              },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                >
                  <span className="text-sm font-semibold">{l.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
