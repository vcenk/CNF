import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/handmade-skincare-insurance";
const title = "Handmade Skincare Insurance in BC — A Plain-Language Overview";
const description =
  "Product liability and general liability insurance basics for BC indie skincare makers — what brokers usually ask, and what coverage typically includes.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Why BC indie makers carry insurance",
    body: (
      <p>
        Insurance is not a federal requirement to file a Cosmetic
        Notification Form, but most markets, retailers, and wholesale
        partners ask for proof of product liability coverage. It also
        protects the maker if a customer ever attributes an issue to a
        product.
      </p>
    ),
  },
  {
    heading: "What product liability typically covers",
    body: (
      <p>
        Coverage details depend on the policy and broker. In general,
        product liability responds to bodily injury or property damage a
        third party associates with a product. Some policies include
        general liability for the booth space (slips, table collapses).
        Always read the policy itself rather than relying on summary
        marketing copy.
      </p>
    ),
    bullets: [
      "Product liability — the product itself",
      "General liability — slips, trips, booth incidents",
      "Coverage limits per occurrence and aggregate",
      "Deductible per claim",
      "Exclusions (frequent ones include certain claims wording or therapeutic positioning)",
    ],
  },
  {
    heading: "What brokers usually ask",
    bullets: [
      "Annual revenue projections",
      "Product categories sold",
      "Sales channels (markets, online, wholesale)",
      "Whether you make any therapeutic claims",
      "Whether you have a CNF on file with Health Canada",
      "Number of products in the line and batch sizes",
    ],
  },
  {
    heading: "Common BC market and retailer expectations",
    body: (
      <p>
        Many BC markets ask for a coverage limit of CA$1M to CA$2M and a
        certificate naming the market organizer as additional insured. Some
        retailers ask for higher limits depending on shelf space and
        category. Check vendor handbooks before placing your policy so the
        coverage matches.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Is insurance required to sell cosmetics in BC?",
    answer:
      "It is not federally required, and the cosmetic notification process does not require it. However, most BC markets, retailers, and wholesale partners require proof of product liability insurance.",
  },
  {
    question: "Does insurance replace cosmetic notification?",
    answer:
      "No. Insurance is a financial tool. Cosmetic Notification Form filing is a regulatory responsibility under Health Canada and is separate.",
  },
  {
    question: "Can therapeutic claims affect my insurance?",
    answer:
      "Therapeutic claims (treats, cures, prevents) can shift a product out of cosmetic territory and into drug or NHP regulation, which usually requires different insurance and different regulatory pathways. Discuss claim wording with your broker.",
  },
  {
    question: "Does FormulaNorth sell or recommend specific insurance brokers?",
    answer:
      "No. FormulaNorth helps with the cosmetic side. Insurance brokers are independent. Some BC associations and chambers maintain referral lists.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function HandmadeSkincareInsurancePage() {
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
        { label: "Handmade skincare insurance" },
      ]}
      intro={
        <>
          <p>
            Insurance is one of those topics indie makers usually only
            think about right before their first market. This guide covers
            the basics in plain language so the conversation with a broker
            is faster and more useful.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Read the cosmetic notification guide",
        href: "/cosmetic-notification-form-canada",
        description: "Insurance is separate from CNF — but both are usually needed",
      }}
      relatedLinks={[
        {
          label: "Cosmetic Business License Guide (BC)",
          href: "/bc/cosmetic-business-license-guide",
          description: "Provincial business registration and licensing.",
        },
        {
          label: "Handmade Skincare Business in Canada",
          href: "/handmade-skincare-business-canada",
          description: "Canada-wide setup steps for indie cosmetic makers.",
        },
        {
          label: "Farmers Market Cosmetic Vendor Checklist (BC)",
          href: "/bc/farmers-market-cosmetic-vendor-checklist",
          description: "Local market vendor preparation.",
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
