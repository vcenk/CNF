import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BetaBadge } from "@/components/marketing/beta-badge";
import { FragranceAllergenAlert } from "@/components/marketing/fragrance-allergen-alert";
import { CheckerForm } from "./checker-form";

const pathname = "/tools/cnf-readiness-checker";
const title = "Free CNF Readiness Checker for Canadian Cosmetic Makers";
const description =
  "Check whether your cosmetic product has the basics ready for a Health Canada Cosmetic Notification Form. Free tool — paste your ingredient list and get a readiness report with hotlist flags, label reminders, and claim-risk notes.";

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
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

const faqs = [
  {
    question: "Is the CNF Readiness Checker free?",
    answer:
      "Yes. The CNF Readiness Checker is a free tool from FormulaNorth. No account or payment is required to run a readiness check.",
  },
  {
    question: "Does this tool submit my CNF to Health Canada?",
    answer:
      "No. It checks your inputs for missing fields, hotlist flags, label reminders, and claim risks. Notification is submitted directly through the official Health Canada portal.",
  },
  {
    question: "Is the result a guarantee that my product is compliant?",
    answer:
      "No. This is a readiness check, not a compliance validator. Always verify findings against the current Health Canada Cosmetic Regulations and Cosmetic Ingredient Hotlist before sale or notification.",
  },
  {
    question: "Why are some of my ingredients shown as not matched?",
    answer:
      "The tool matches against the FormulaNorth ingredient database. If an ingredient is not matched, double-check the INCI spelling on your supplier's spec sheet, or look it up in the ingredient database.",
  },
  {
    question: "Can I save my readiness check?",
    answer:
      "Create a free FormulaNorth account to save your product as a versioned formula. The formula carries forward your ingredient list, costing, label drafting, and CNF preparation in one workspace.",
  },
];

export default function CnfReadinessCheckerPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "CNF Readiness Checker",
      url,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "CAD",
      },
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
        { "@type": "ListItem", position: 3, name: "CNF Readiness Checker", item: url },
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
          <span className="text-foreground">CNF Readiness Checker</span>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Free tool
            </p>
            <BetaBadge />
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            CNF Readiness Checker
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Paste your product details and ingredient list to get a quick
            readiness report — required CNF inputs, Health Canada Hotlist
            flags, label reminders, and claim-risk notes — before you start
            your Cosmetic Notification Form.
          </p>
        </header>

        <div className="mb-10 space-y-6">
          <FragranceAllergenAlert source="cnf-checker" />
          <DisclaimerCallout
            title="This is preparation support, not regulatory approval"
          />
        </div>

        <CheckerForm />

        <section className="mt-20">
          <h2 className="font-display text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="font-display text-2xl font-semibold">Related guides</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { href: "/cosmetic-notification-form-canada", label: "Cosmetic Notification Form (CNF) Canada" },
              { href: "/health-canada-cosmetic-hotlist", label: "Health Canada Cosmetic Ingredient Hotlist" },
              { href: "/cosmetic-label-requirements-canada", label: "Cosmetic Label Requirements in Canada" },
              { href: "/inci-name-lookup-canada", label: "INCI Name Lookup Canada" },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                >
                  <span className="text-sm font-semibold">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
