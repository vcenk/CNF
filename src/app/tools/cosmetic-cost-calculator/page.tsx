import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BetaBadge } from "@/components/marketing/beta-badge";
import { CalculatorForm } from "./calculator-form";

const pathname = "/tools/cosmetic-cost-calculator";
const title = "Free Cosmetic Cost Calculator for Canadian Indie Makers";
const description =
  "Calculate cost per batch, cost per unit, and suggested wholesale and retail prices for your handmade cosmetic. Free, no account needed.";

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
    question: "What goes into a real cost of goods sold for a cosmetic product?",
    answer:
      "Ingredients, packaging, labels, fillers and shipping in, breakage allowance, labour for production and packing, and overhead like rent, utilities, software, and insurance.",
  },
  {
    question: "How is gross margin calculated?",
    answer:
      "Gross margin = (selling price − cost) ÷ selling price. A 60% margin means 60% of the retail price is gross profit before any other expenses.",
  },
  {
    question: "How is wholesale price typically set?",
    answer:
      "Many indie makers set wholesale at roughly 2× their cost (a 100% markup), which keeps room for retailer markup and discounts. The right markup depends on the channel and category.",
  },
  {
    question: "Does this calculator account for taxes or shipping out?",
    answer:
      "Not directly. Taxes (GST/HST/PST) on the input side and shipping to customers are usually handled at checkout or as separate line items rather than as part of cost of goods.",
  },
  {
    question: "Can I save these calculations?",
    answer:
      "Save costing alongside your formula by creating a free FormulaNorth account. The costing tab inside the formula links back to ingredient prices so updates flow through automatically.",
  },
];

export default function CostCalculatorPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Cosmetic Cost Calculator",
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
        { "@type": "ListItem", position: 3, name: "Cosmetic Cost Calculator", item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Cosmetic Cost Calculator</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Free tool</p>
            <BetaBadge />
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Cosmetic Cost Calculator
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Estimate true cost per unit for a handmade cosmetic — ingredients,
            packaging, labour, and overhead — and see suggested wholesale and
            retail prices based on your target margin.
          </p>
        </header>

        <div className="mb-10 max-w-3xl">
          <DisclaimerCallout title="Estimates, not financial advice" />
        </div>

        <CalculatorForm />

        <section className="mt-20 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold">Frequently asked questions</h2>
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
              { href: "/handmade-skincare-business-canada", label: "Starting a Handmade Skincare Business in Canada" },
              { href: "/how-to-sell-handmade-soap-in-canada", label: "How to Sell Handmade Soap in Canada" },
              { href: "/sell-body-butter-canada", label: "Sell Body Butter in Canada" },
              { href: "/cosmetic-ingredient-suppliers-canada", label: "Canadian Cosmetic Ingredient Suppliers" },
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
