import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/cosmetic-business-license-guide";
const title = "BC Cosmetic Business Licence Guide for Indie Makers";
const description =
  "Provincial business registration in British Columbia, GST and PST, and where Health Canada cosmetic notification fits alongside your local licensing.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "BC business registration basics",
    body: (
      <p>
        BC indie cosmetic makers typically operate as sole proprietorships
        or BC-incorporated companies. Sole proprietorships register a
        business name through OneStop Business Registry; incorporation is
        through BC Registries.
      </p>
    ),
    bullets: [
      "Pick a business structure (sole prop, partnership, BC corporation)",
      "Register a name through OneStop or BC Registries",
      "Get a Canada Revenue Agency Business Number",
      "Open a business bank account for clean bookkeeping",
    ],
  },
  {
    heading: "GST and PST",
    body: (
      <p>
        Once you cross the federal small supplier threshold, GST
        registration with the CRA is generally required. BC PST may apply
        depending on the cosmetic category and how the product is sold.
        Confirm with the BC Ministry of Finance for your specific product.
      </p>
    ),
  },
  {
    heading: "Municipal business licensing",
    body: (
      <p>
        Most BC municipalities require a business licence to operate
        within city limits, including for home-based businesses. The
        application form usually asks about operating address, business
        activity, and whether you receive customers at home. Some cities
        also have inter-municipal licences that cover regional vendor
        activity at markets.
      </p>
    ),
  },
  {
    heading: "Where Health Canada cosmetic notification fits in",
    body: (
      <p>
        Cosmetic Notification Form filing is a federal responsibility and
        is separate from BC business registration and municipal licensing.
        Provincial registration does not satisfy federal cosmetic
        notification, and federal notification does not replace your
        municipal licence.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need to register a BC business to sell cosmetics?",
    answer:
      "If you are operating commercially in BC, you generally register a sole proprietorship or incorporate. Federal cosmetic notification is separate and does not register you as a business in BC.",
  },
  {
    question: "Is PST collected on cosmetics in BC?",
    answer:
      "PST applicability depends on the product category and how the product is sold. Confirm with the BC Ministry of Finance for your specific case.",
  },
  {
    question: "Do I need a separate licence for each market I sell at?",
    answer:
      "Some BC municipalities have inter-municipal vendor licences that cover regional markets. Others require a per-municipality licence. Check with each city or town where you plan to sell.",
  },
  {
    question: "Does FormulaNorth handle business registration?",
    answer:
      "No. FormulaNorth is the workspace for the cosmetic side — formulation, labels, costing, and CNF preparation. Business registration is handled by the maker through OneStop or BC Registries.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function CosmeticBusinessLicenseGuidePage() {
  return (
    <SeoGuide
      eyebrow="BC vendors"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[
        { label: "BC resources", href: "/bc" },
        { label: "Cosmetic business licence (BC)" },
      ]}
      intro={
        <>
          <p>
            BC business registration and Health Canada cosmetic
            notification are two separate responsibilities. Both are
            usually needed before launch, and they sit in different
            government systems with different timelines and contacts.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Browse the cosmetic side",
        href: "/cosmetic-notification-form-canada",
        description: "Federal cosmetic responsibilities, separate from BC licensing",
      }}
      relatedLinks={[
        {
          label: "Handmade Skincare Business in Canada",
          href: "/handmade-skincare-business-canada",
          description: "Canada-wide setup steps for indie cosmetic makers.",
        },
        {
          label: "Farmers Market Cosmetic Vendor Checklist (BC)",
          href: "/bc/farmers-market-cosmetic-vendor-checklist",
          description: "Local vendor preparation for BC markets.",
        },
        {
          label: "Handmade Skincare Insurance in BC",
          href: "/bc/handmade-skincare-insurance",
          description: "Insurance basics for BC cosmetic makers.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "Federal cosmetic notification responsibilities.",
        },
      ]}
    />
  );
}
