import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BetaBadge } from "@/components/marketing/beta-badge";
import { ChecklistForm } from "./checklist-form";

const pathname = "/tools/cosmetic-label-checklist";
const title = "Free Cosmetic Label Checklist Generator (Canada)";
const description =
  "Generate a Canadian cosmetic label checklist tailored to your product type — bilingual reminders, INCI rules, allergen disclosure, warnings, and verification steps.";

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
    question: "Does this checklist make my label compliant?",
    answer:
      "No. The checklist organizes the most common Canadian cosmetic label items so you can review them. Final compliance still depends on your specific product, ingredients, and packaging.",
  },
  {
    question: "Does it cover Quebec French-language requirements?",
    answer:
      "If you mark that you ship to or sell in Quebec, the checklist includes a reminder to review Quebec-specific French-language requirements. Always verify against current provincial guidance.",
  },
  {
    question: "Why does my checklist mention fragrance allergen disclosure?",
    answer:
      "If your product contains added fragrance or essential oils, individual fragrance allergen disclosure may be required when allergens exceed the threshold (0.001% leave-on, 0.01% rinse-off).",
  },
  {
    question: "Can I save the checklist?",
    answer:
      "Save label content alongside your formula by creating a FormulaNorth account. The label tab keeps INCI list, warnings, and bilingual content tied to the same product.",
  },
];

export default function CosmeticLabelChecklistPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Cosmetic Label Checklist",
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
        { "@type": "ListItem", position: 3, name: "Cosmetic Label Checklist", item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Cosmetic Label Checklist</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Free tool</p>
            <BetaBadge />
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Cosmetic Label Checklist
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Generate a Canadian cosmetic label checklist tailored to your
            product. Covers core label content, ingredient list rules,
            warnings, bilingual EN/FR reminders, and verification steps.
          </p>
        </header>

        <div className="mb-10">
          <DisclaimerCallout title="Checklist support, not regulatory review" />
        </div>

        <ChecklistForm />

        <section className="mt-20">
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

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Related guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/cosmetic-label-requirements-canada", label: "Cosmetic Label Requirements in Canada" },
              { href: "/inci-name-lookup-canada", label: "INCI Name Lookup Canada" },
              { href: "/health-canada-cosmetic-hotlist", label: "Health Canada Cosmetic Ingredient Hotlist" },
              { href: "/tools/cnf-readiness-checker", label: "CNF Readiness Checker" },
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
