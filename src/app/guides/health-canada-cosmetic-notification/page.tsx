import type { Metadata } from "next";
import { SeoPage } from "@/components/seo-page";
import { absoluteUrl } from "@/lib/marketing-pages";
import { siteConfig } from "@/lib/site-config";

const pathname = "/guides/health-canada-cosmetic-notification";
const title = "Health Canada Cosmetic Notification Guide";
const description =
  "A practical guide to Health Canada cosmetic notification preparation, including the data teams should gather before submission and how software can reduce rework.";

const faqs = [
  {
    question: "What should a team prepare before starting a cosmetic notification?",
    answer:
      "Teams should gather company details, product identity, usage type, category context, and a structured ingredient list before attempting final portal submission."
  },
  {
    question: "Why is a guide page useful if the product is software?",
    answer:
      "A guide answers informational search intent and helps users understand the workflow before they are ready to test or adopt the product."
  },
  {
    question: "Should the guide link to product pages?",
    answer:
      "Yes. A strong SEO guide should connect readers to relevant product pages and workflow entry points with descriptive internal links."
  }
];

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: pathname
  },
  openGraph: {
    title,
    description,
    url: absoluteUrl(pathname),
    siteName: siteConfig.name,
    type: "article"
  },
  twitter: {
    title,
    description
  }
};

export default function GuidePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: {
        "@type": "Organization",
        name: siteConfig.name
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name
      },
      datePublished: "2026-04-06",
      dateModified: "2026-04-06",
      mainEntityOfPage: absoluteUrl(pathname),
      url: absoluteUrl(pathname)
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer
        }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Guides", item: absoluteUrl("/guides") },
        { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(pathname) }
      ]
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SeoPage
        eyebrow="Guide"
        title={title}
        summary="A Health Canada cosmetic notification guide should help teams understand the workflow before they ever reach a form. The practical work begins long before portal upload: gathering company details, clarifying what the product is, documenting ingredients in a usable structure, and reviewing readiness before the official submission step."
        primaryKeyword="health canada cosmetic notification guide"
        cta={{ href: "/health-canada-cosmetic-notification-software", label: "Explore the software workflow" }}
        relatedLinks={[
          {
            href: "/health-canada-cosmetic-notification-software",
            label: "Health Canada software page",
            description: "See how the product workflow maps onto the process described in this guide."
          },
          {
            href: "/hcxs-export",
            label: ".hcxs export page",
            description: "Understand the future export layer that shortens final portal work."
          },
          {
            href: "/intake",
            label: "Open product intake",
            description: "Move from reading into the first interactive draft flow."
          }
        ]}
        sections={[
          {
            title: "What a cosmetic notification workflow actually involves",
            paragraphs: [
              "A Health Canada cosmetic notification guide is most useful when it explains the operational work behind the final submission. Teams often assume the challenge starts inside the government portal, but most delay comes earlier. Product details may live in marketing notes, formulation spreadsheets, packaging drafts, or supplier documents. Before any notification is ready, that information needs to be assembled into a consistent structure.",
              "That is why a disciplined intake workflow matters. If a company gathers details the same way every time, reviewers can identify missing information faster and submissions become less dependent on memory or individual heroics."
            ]
          },
          {
            title: "What teams should collect before submission",
            paragraphs: [
              "The exact data requirements can vary with the product, but a reliable draft usually starts with company identity, product name, intended use, category context, and a usable ingredient list. It is also helpful to know whether the product is rinse-off or leave-on, since that influences how reviewers reason about the submission.",
              "Even when a company has all the raw information, it still needs a structure that keeps data consistent between products and variants. That is where workflow software becomes more useful than a simple checklist."
            ],
            bullets: [
              "Company name and profile details",
              "Product identity and category",
              "Usage type and product description",
              "Ingredient list in a normalized format",
              "Validation review before export or upload"
            ]
          },
          {
            title: "Where software helps most",
            paragraphs: [
              "The best place for software to help is at the handoff between messy source material and a submission-ready draft. That includes AI-assisted intake to capture useful detail in plain language, validation to reveal gaps early, and a clear export boundary for the final portal step.",
              "CNF Builder is now scaffolded around that model. Search visitors reading this guide can move directly into the intake route or review the dedicated product and export pages, which keeps the site architecture useful for both people and search engines."
            ]
          }
        ]}
        faqs={faqs}
      />
    </>
  );
}
