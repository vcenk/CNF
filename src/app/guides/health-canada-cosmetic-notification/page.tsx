import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const pathname = "/guides/health-canada-cosmetic-notification";
const title = "Health Canada Cosmetic Notification Guide";
const description =
  "A practical guide to Health Canada cosmetic notification preparation, including the data teams should gather before submission and how software can reduce rework.";

const faqs = [
  {
    question:
      "What should a team prepare before starting a cosmetic notification?",
    answer:
      "Teams should gather company details, product identity, usage type, category context, and a structured ingredient list before attempting final portal submission.",
  },
  {
    question: "Who needs to file a Cosmetic Notification Form (CNF)?",
    answer:
      "Every manufacturer and importer selling a cosmetic product in Canada — including handmade products sold at craft fairs or from home — must file within 10 days of first sale.",
  },
  {
    question: "Is there a fee for filing a CNF with Health Canada?",
    answer:
      "No. Health Canada does not charge a fee for cosmetic notification submissions. The CNF can be filed for free through their online portal.",
  },
];

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    type: "article",
  },
  twitter: { title, description },
};

export default function GuidePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: { "@type": "Organization", name: siteConfig.name },
      publisher: { "@type": "Organization", name: siteConfig.name },
      datePublished: "2026-04-06",
      dateModified: "2026-04-12",
      mainEntityOfPage: `${siteConfig.url}${pathname}`,
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
        { "@type": "ListItem", position: 2, name: "Guides", item: `${siteConfig.url}/guides` },
        { "@type": "ListItem", position: 3, name: title, item: `${siteConfig.url}${pathname}` },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/guides" className="hover:text-foreground">Guides</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">CNF Guide</span>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Guide
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            A Health Canada cosmetic notification guide should help teams
            understand the workflow before they ever reach a form. The practical
            work begins long before portal upload.
          </p>
        </header>

        {/* Content */}
        <div className="prose-brand space-y-10">
          <section>
            <h2 className="font-display text-2xl font-semibold">
              What a cosmetic notification workflow actually involves
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Teams often assume the challenge starts inside the government
              portal, but most delay comes earlier. Product details may live in
              marketing notes, formulation spreadsheets, packaging drafts, or
              supplier documents. Before any notification is ready, that
              information needs to be assembled into a consistent structure.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              That is why a disciplined intake workflow matters. If a company
              gathers details the same way every time, reviewers can identify
              missing information faster and submissions become less dependent
              on memory or individual heroics.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">
              What teams should collect before submission
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The exact data requirements can vary, but a reliable draft usually
              starts with company identity, product name, intended use, category
              context, and a usable ingredient list. It is also helpful to know
              whether the product is rinse-off or leave-on.
            </p>
            <ul className="mt-4 list-inside list-disc space-y-1 text-muted-foreground">
              <li>Company name and profile details</li>
              <li>Product identity and category</li>
              <li>Usage type and product description</li>
              <li>Ingredient list with INCI names and percentages</li>
              <li>Validation review before export or upload</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold">
              Where software helps most
            </h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The best place for software to help is at the handoff between
              messy source material and a submission-ready draft. That includes
              a structured formula builder with built-in INCI lookups, real-time
              validation against the Health Canada hotlist, automated bilingual
              label generation, and a clear export path for the final portal
              submission.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              <Link href="/ingredients" className="text-brand underline hover:text-brand-dark">
                Browse the ingredient database
              </Link>{" "}
              to start looking up INCI names and check hotlist status, or{" "}
              <Link href="/formulas" className="text-brand underline hover:text-brand-dark">
                create a formula
              </Link>{" "}
              to build your product from a single source of truth.
            </p>
          </section>
        </div>

        {/* FAQ */}
        <section className="mt-16">
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

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-brand/20 bg-brand-soft/30 p-6 text-center">
          <p className="font-display text-lg font-semibold">
            Ready to streamline your cosmetic compliance?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start with the free ingredient database, then build formulas that
            auto-generate labels and CNF exports.
          </p>
          <Link
            href="/ingredients"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Browse ingredients
          </Link>
        </div>
      </article>
    </>
  );
}
