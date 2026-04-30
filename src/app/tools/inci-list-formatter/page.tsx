import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BetaBadge } from "@/components/marketing/beta-badge";
import { FormatterForm } from "./formatter-form";

const pathname = "/tools/inci-list-formatter";
const title = "Free INCI Ingredient List Formatter for Canadian Cosmetic Labels";
const description =
  "Paste a cosmetic ingredient list and get a cleaned, descending-order INCI list with allergen and label reminders. Free, no account needed.";

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
    question: "Does this formatter create a label-ready ingredient list?",
    answer:
      "It produces a cleaned, descending-order list when you supply percentages. The result still needs review for INCI accuracy, allergen disclosure, and bilingual placement on your label.",
  },
  {
    question: "Why are some of my ingredients flagged as common names?",
    answer:
      "Plant oils typically use INCI names with the Latin botanical genus and species (for example, Cocos Nucifera (Coconut) Oil). The tool flags entries that look like common names so you can correct them with your supplier.",
  },
  {
    question: "Where do colour additives go on the list?",
    answer:
      "Colour additives can be grouped at the end of the list after non-colour ingredients. The tool surfaces a reminder when it detects entries like CI 77891 or iron oxides.",
  },
  {
    question: "Does FormulaNorth maintain the official INCI dictionary?",
    answer:
      "No. The official INCI dictionary is maintained by the Personal Care Products Council. FormulaNorth uses INCI names from supplier spec sheets and the FormulaNorth ingredient database for tooling, not as a regulatory authority.",
  },
];

export default function InciListFormatterPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "INCI Ingredient List Formatter",
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
        { "@type": "ListItem", position: 3, name: "INCI List Formatter", item: url },
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
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">INCI List Formatter</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">Free tool</p>
            <BetaBadge />
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            INCI Ingredient List Formatter
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Paste your cosmetic ingredient list and get a cleaned,
            descending-order INCI list with allergen and label reminders for
            Canadian cosmetic packaging.
          </p>
        </header>

        <div className="mb-10">
          <DisclaimerCallout title="This formatter is preparation support, not label review" />
        </div>

        <FormatterForm />

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
              { href: "/inci-name-lookup-canada", label: "INCI Name Lookup Canada" },
              { href: "/cosmetic-label-requirements-canada", label: "Cosmetic Label Requirements in Canada" },
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
