import type { Metadata } from "next";
import { SeoPage } from "@/components/seo-page";
import { absoluteUrl } from "@/lib/marketing-pages";
import { siteConfig } from "@/lib/site-config";

const pathname = "/health-canada-cosmetic-notification-software";
const title = "Health Canada Cosmetic Notification Software";
const description =
  "Health Canada cosmetic notification software for teams that want AI-assisted intake, validation, and a faster route to portal-ready submission.";

const faqs = [
  {
    question: "What is Health Canada cosmetic notification software?",
    answer:
      "It is software that helps brands and manufacturers collect cosmetic product data, organize it into the right submission structure, and reduce manual work before using the Health Canada portal."
  },
  {
    question: "Who is this page for?",
    answer:
      "This page is written for cosmetic teams, consultants, and operations staff who need a repeatable workflow for Canadian cosmetic notifications."
  },
  {
    question: "Does CNF Builder replace the Health Canada portal?",
    answer:
      "No. The product is designed to prepare and validate the submission data before final upload and review in the official portal."
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
    type: "website"
  },
  twitter: {
    title,
    description
  }
};

export default function HealthCanadaSoftwarePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: title,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: absoluteUrl(pathname),
      description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url
      }
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
        { "@type": "ListItem", position: 2, name: title, item: absoluteUrl(pathname) }
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
        eyebrow="Solution page"
        title={title}
        summary="Health Canada cosmetic notification software should do more than hold form fields. It should help teams collect cleaner product data, spot gaps early, and move toward submission with less manual rework. CNF Builder is being shaped around that exact workflow: AI-assisted product intake, structured CNF validation, and a future-ready export path for portal submission."
        primaryKeyword="health canada cosmetic notification software"
        cta={{ href: "/intake", label: "Start a product intake draft" }}
        relatedLinks={[
          {
            href: "/hcxs-export",
            label: ".hcxs export workflow",
            description: "See how the planned export layer supports faster portal preparation."
          },
          {
            href: "/guides/health-canada-cosmetic-notification",
            label: "Cosmetic notification guide",
            description: "Read the long-form process guide for teams preparing submissions."
          },
          {
            href: "/",
            label: "CNF Builder overview",
            description: "Return to the homepage and product pillar overview."
          }
        ]}
        sections={[
          {
            title: "Why teams look for Health Canada cosmetic notification software",
            paragraphs: [
              "Health Canada cosmetic notification software is usually sought out after a team tries to manage submissions with spreadsheets, email threads, and copied portal entries. The pain does not come from one field. It comes from the repeated effort of gathering company details, normalizing product descriptions, checking ingredient naming, and confirming that nothing important is missing before a submission window closes.",
              "A strong workflow needs to support both speed and consistency. That means helping non-specialists capture useful product detail, giving reviewers a predictable structure to validate, and reducing the amount of cleanup required before the official portal step. The more often a company prepares notifications, variants, or amendments, the more valuable a shared system becomes."
            ]
          },
          {
            title: "What CNF Builder is designed to improve",
            paragraphs: [
              "CNF Builder is being structured as a web workflow for cosmetic notification preparation rather than a static database. The intake layer is designed to help teams enter product details in plain language, organize those details into a normalized draft, and expose readiness issues before the handoff to submission.",
              "That matters because regulatory preparation is rarely blocked by one dramatic failure. More often, time is lost across small inconsistencies: missing company details, unclear usage types, incomplete ingredient lists, or a draft that cannot move cleanly into an export pipeline."
            ],
            bullets: [
              "Guide product and company intake in one place",
              "Turn freeform product details into a structured draft",
              "Show validation issues before export is attempted",
              "Create a cleaner foundation for future portal file generation"
            ]
          },
          {
            title: "How the workflow is planned",
            paragraphs: [
              "The product architecture follows three layers from the project plan. First, AI-assisted intake supports plain-language product entry and future ingredient suggestions. Second, structured storage keeps the draft in a normalized shape that validation rules can evaluate consistently. Third, a dedicated export boundary can eventually generate the file needed for portal upload without mixing that complexity into every form component.",
              "This layered approach is important for SEO and product clarity alike. Search visitors landing on this page are usually evaluating whether a tool can reduce manual effort. The answer should be visible in the product structure itself: intake, validation, and export are distinct steps, not one overloaded screen."
            ]
          }
        ]}
        faqs={faqs}
      />
    </>
  );
}

