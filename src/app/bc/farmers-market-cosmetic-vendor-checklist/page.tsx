import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/farmers-market-cosmetic-vendor-checklist";
const title = "BC Farmers Market Cosmetic Vendor Checklist";
const description =
  "Selling handmade cosmetics at a BC farmers market — vendor agreement, signage, payments, insurance, and where Canada-wide cosmetic notification fits in.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Local market basics",
    body: (
      <p>
        Most BC farmers markets are run by independent associations or
        municipalities. Each has its own vendor agreement, application
        process, and category rules. Cosmetic vendors are usually accepted
        but treated differently from food vendors.
      </p>
    ),
    bullets: [
      "Read the vendor agreement before applying",
      "Confirm whether cosmetics are accepted at the specific market",
      "Note insurance, table fees, and payment cycle expectations",
      "Plan a banner with business name and product category",
      "Bring price tags or a printed price list",
    ],
  },
  {
    heading: "Cosmetic-side responsibilities you bring with you",
    body: (
      <p>
        These responsibilities are Canada-wide and travel with the product
        regardless of market. Most issues at the booth come from missing or
        unclear label content, not the vendor agreement.
      </p>
    ),
    bullets: [
      "Each cosmetic product has a Cosmetic Notification Form on file with Health Canada (within 10 days of first sale)",
      "Each label carries product identity, net quantity, business identity, and ingredient list using INCI names",
      "Required label content is in both English and French",
      "Ingredients are reviewed against the Health Canada Cosmetic Ingredient Hotlist",
      "Marketing claims stay within cosmetic regulation (not drug or NHP territory)",
    ],
  },
  {
    heading: "Booth setup checklist",
    bullets: [
      "Branded sign with business name and category",
      "Tester strategy that doesn't compromise product safety (sealed singles or supervised dispensing)",
      "Tap-to-pay terminal or cash float",
      "Receipt option (some markets require)",
      "First-aid kit and hand sanitizer",
      "Backup tablecloth, weights, and shade for outdoor markets",
    ],
  },
  {
    heading: "Money and provincial taxes",
    body: (
      <p>
        BC indie sellers usually collect GST on cosmetic sales above the
        small supplier threshold. Provincial PST application varies by
        product type — confirm with the BC Ministry of Finance for your
        category. Track sales by market and product so reconciling at
        year-end is faster.
      </p>
    ),
  },
  {
    heading: "Insurance and risk",
    body: (
      <p>
        Most markets ask for product liability insurance. Some include
        vendor coverage as part of the vendor fee, but many do not. Have a
        copy of the certificate available digitally and at the booth.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a vendor licence to sell cosmetics at a BC farmers market?",
    answer:
      "Each market has its own vendor agreement, and some BC municipalities require an additional business licence. Confirm both before applying. The cosmetic notification responsibility is separate and federal, not market-specific.",
  },
  {
    question: "Does my product need to be notified to Health Canada before I sell at a market?",
    answer:
      "Cosmetic notification is generally expected within 10 days of first sale anywhere in Canada, including farmers markets. The market organizer does not handle this for you.",
  },
  {
    question: "Do I need bilingual labels at a BC market?",
    answer:
      "Required Canadian cosmetic label content generally needs to appear in English and French. The market location does not change federal label rules.",
  },
  {
    question: "Do I need PST or GST as a BC market vendor?",
    answer:
      "Above the small supplier threshold, GST registration is generally required. PST may apply depending on product category. Confirm with the CRA and the BC Ministry of Finance.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function FarmersMarketCosmeticVendorChecklistPage() {
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
        { label: "Farmers market checklist" },
      ]}
      intro={
        <>
          <p>
            Selling cosmetics at a BC farmers market combines two
            responsibilities: the local vendor agreement and the
            Canada-wide cosmetic rules that travel with the product.
            Both have to land for a smooth season.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Run a CNF Readiness Check",
        href: "/tools/cnf-readiness-checker",
        description: "Confirm the cosmetic side before your first market",
      }}
      relatedLinks={[
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "Federal cosmetic notification responsibilities.",
        },
        {
          label: "Cosmetic Label Requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, and warnings.",
        },
        {
          label: "Sell Handmade Soap at BC Markets",
          href: "/bc/sell-handmade-soap-at-markets",
          description: "Soap-specific notes for BC market vendors.",
        },
        {
          label: "Handmade Skincare Insurance in BC",
          href: "/bc/handmade-skincare-insurance",
          description: "Insurance basics for BC indie cosmetic makers.",
        },
      ]}
    />
  );
}
