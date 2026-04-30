import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { SoapForm } from "./soap-form";

const pathname = "/tools/soap-calculator";
const title = "Free Soap Calculator (Lye / SAP) for Canadian Soap Makers";
const description =
  "Free saponification calculator. Enter oils, superfat, and water — get NaOH or KOH amounts plus hardness, cleansing, conditioning, bubbly, and creamy quality scores. Made for Canadian indie soap makers.";

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
    question: "Is the soap calculator free?",
    answer:
      "Yes. No account needed. Save your recipes inside FormulaNorth by creating a free account if you want version history and label drafting.",
  },
  {
    question: "What does superfat mean?",
    answer:
      "Superfat is the percentage of oils intentionally left unsaponified — the calculator reduces lye by that percentage so some oils stay free for moisturizing. 5–8% is typical for bar soap.",
  },
  {
    question: "Is the SAP data accurate?",
    answer:
      "Values are industry-standard estimates from publicly available indie soap-making references. Always cross-reference with your supplier's spec sheet and zap-test or pH-test the finished bar before selling. SAP varies slightly between batches and producers.",
  },
  {
    question: "Should I use NaOH or KOH?",
    answer:
      "NaOH (sodium hydroxide) makes hard bar soap. KOH (potassium hydroxide) makes liquid or cream soap. Pick the lye type matching the product you're aiming for — the calculator switches the SAP values automatically.",
  },
  {
    question: "What's a safe water-to-oil ratio?",
    answer:
      "33–38% of oil weight is the standard range. Lower ratios (a 'water discount') trace faster and produce a harder bar but are less forgiving for beginners. 33% is a good default.",
  },
  {
    question: "Is the soap I make ready to sell in Canada?",
    answer:
      "Soap with no therapeutic claims is treated as a cosmetic in Canada. Before selling, you'll need a Cosmetic Notification Form (CNF) on file with Health Canada, a bilingual label, and ingredient review against the Cosmetic Ingredient Hotlist. FormulaNorth covers all of that.",
  },
  {
    question: "What are INS and Iodine values?",
    answer:
      "INS combines hardness and iodine to estimate overall soap quality (target ≈ 136–170). Iodine value indicates how unsaturated the oils are; lower is more shelf-stable (≤ 70 ideal for hard bars). Both are estimates — your final bar's longevity depends on cure, storage, and antioxidants.",
  },
];

export default function SoapCalculatorPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Soap Calculator",
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      offers: { "@type": "Offer", price: "0", priceCurrency: "CAD" },
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
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
        { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
        { "@type": "ListItem", position: 3, name: "Soap Calculator", item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">
            Tools
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Soap Calculator</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Free tool
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Soap Calculator (Lye / SAP)
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Enter your oils, lye type, superfat, and water ratio. Get NaOH
            or KOH amounts plus live hardness, cleansing, conditioning,
            bubbly, and creamy scores. Built for Canadian indie soap makers
            and tied into FormulaNorth&apos;s ingredient and label tooling.
          </p>
        </header>

        <div className="mb-10 max-w-3xl">
          <DisclaimerCallout title="Soap calculators are starting points, not safety reviews" />
        </div>

        <SoapForm />

        <section className="mt-20 max-w-3xl">
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

        <section className="mt-12 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Related guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/how-to-sell-handmade-soap-in-canada", label: "How to Sell Handmade Soap in Canada" },
              { href: "/bc/sell-handmade-soap-at-markets", label: "Sell Handmade Soap at BC Markets" },
              { href: "/cosmetic-label-requirements-canada", label: "Cosmetic Label Requirements in Canada" },
              { href: "/health-canada-cosmetic-hotlist", label: "Health Canada Cosmetic Ingredient Hotlist" },
              { href: "/tools/cnf-readiness-checker", label: "CNF Readiness Checker" },
              { href: "/tools/cosmetic-cost-calculator", label: "Cosmetic Cost Calculator" },
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
