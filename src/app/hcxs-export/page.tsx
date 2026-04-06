import type { Metadata } from "next";
import { SeoPage } from "@/components/seo-page";
import { absoluteUrl } from "@/lib/marketing-pages";
import { siteConfig } from "@/lib/site-config";

const pathname = "/hcxs-export";
const title = ".hcxs Export Software for Cosmetic Notifications";
const description =
  "Learn how CNF Builder is positioning .hcxs export as the fastest path from validated cosmetic data to Health Canada portal upload.";

const faqs = [
  {
    question: "What is an .hcxs export in this workflow?",
    answer:
      "It is the planned file output that packages validated cosmetic notification data into a format the Health Canada portal can accept for upload and review."
  },
  {
    question: "Why is .hcxs export important?",
    answer:
      "It reduces repetitive manual portal entry and turns structured draft data into a faster submission handoff."
  },
  {
    question: "Is the .hcxs generator finished?",
    answer:
      "Not yet. The current repository includes the export boundary and planning foundation, while the actual file generator is still to be implemented."
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

export default function HcxsExportPage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: title,
      description,
      provider: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url
      },
      areaServed: "CA",
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
        eyebrow="Feature page"
        title={title}
        summary="The .hcxs export layer is the clearest differentiator in the CNF Builder plan. Instead of asking teams to re-enter every validated field directly inside the Health Canada portal, the goal is to prepare the data once, verify readiness, and generate a file that shortens the final submission step."
        primaryKeyword="hcxs export software"
        cta={{ href: "/health-canada-cosmetic-notification-software", label: "See the full workflow" }}
        relatedLinks={[
          {
            href: "/intake",
            label: "Open the intake draft",
            description: "Start with product and company data before export is generated."
          },
          {
            href: "/guides/health-canada-cosmetic-notification",
            label: "Read the submission guide",
            description: "Understand the process that the export step is meant to shorten."
          },
          {
            href: "/",
            label: "Return to homepage",
            description: "Review the three product layers and current implementation scope."
          }
        ]}
        sections={[
          {
            title: "Why .hcxs export matters",
            paragraphs: [
              "For many teams, the portal stage is where all previous preparation either pays off or falls apart. If the final system still requires line-by-line re-entry, then much of the value of structured storage disappears. That is why the project plan treats .hcxs export as a core differentiator rather than a minor convenience.",
              "A reliable export step gives operations teams a measurable time saving. More importantly, it creates a clearer boundary between drafting and submission. Teams can review the normalized draft, clear outstanding validation issues, and only then move into a file generation step that is separate from the editing workflow."
            ]
          },
          {
            title: "What has to happen before export",
            paragraphs: [
              "Export quality depends on upstream discipline. Product details need to be captured in a structured way, ingredient names need to be normalized, and required fields need to be present before any file is generated. That is why the repository now includes a working intake route and a validation engine before the `.hcxs` generator itself is built.",
              "This is also better for search intent. People looking for .hcxs export software are usually not asking only for a file utility. They are often looking for a safer workflow that reduces duplicated effort and submission risk."
            ],
            bullets: [
              "Capture company and product details once",
              "Validate required fields before export is unlocked",
              "Keep export logic in a dedicated service boundary",
              "Use the portal for final review rather than raw data entry"
            ]
          },
          {
            title: "How this feature fits the broader product",
            paragraphs: [
              "The export page should not stand alone. It needs internal links to the intake workflow and the broader Health Canada cosmetic notification software page so search engines and users both understand how the pieces connect.",
              "That internal linking structure is now part of the site architecture: homepage to feature page, feature page to guide, and guide back to the workflow. It helps distribute authority while keeping the product story coherent."
            ]
          }
        ]}
        faqs={faqs}
      />
    </>
  );
}

