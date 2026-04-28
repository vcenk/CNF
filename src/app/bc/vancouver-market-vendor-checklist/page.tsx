import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/vancouver-market-vendor-checklist";
const title = "Vancouver Cosmetic Market Vendor Checklist";
const description =
  "Selling handmade cosmetics at Vancouver markets — vendor agreements, business licensing, and where Canada-wide cosmetic responsibilities apply.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Major Vancouver-area markets",
    body: (
      <p>
        Vancouver and the Lower Mainland host year-round and seasonal
        markets — among them Granville Island Public Market vendor
        programs, Vancouver Farmers Markets at Trout Lake and Riley Park,
        Christmas market pop-ups, and craft fairs throughout the year.
        Each runs its own vendor application, jury, and category review.
      </p>
    ),
    bullets: [
      "Read the vendor handbook end-to-end before applying",
      "Note application deadlines well ahead of the season",
      "Confirm whether cosmetics are accepted in the vendor mix",
      "Plan for jury fees, table fees, and electricity-access surcharges",
    ],
  },
  {
    heading: "City of Vancouver business licence",
    body: (
      <p>
        The City of Vancouver typically requires a business licence for
        commercial activity within city limits, including vendors at some
        markets and events. Confirm directly with the City of Vancouver
        whether your specific market participation needs a licence and
        which class applies to a cosmetic seller.
      </p>
    ),
  },
  {
    heading: "Cosmetic-side responsibilities",
    body: (
      <p>
        These travel with your product. The cosmetic notification, label
        content, INCI ordering, hotlist review, and bilingual labelling
        all apply equally whether the market is in Vancouver, Victoria,
        Kelowna, or Prince George.
      </p>
    ),
    bullets: [
      "Cosmetic Notification Form on file with Health Canada",
      "Bilingual EN/FR label content with INCI list",
      "Hotlist-aware formula and label",
      "Documented batch/lot tracking",
    ],
  },
  {
    heading: "Logistics for a Vancouver booth",
    bullets: [
      "Public transit + cargo carrier vs car-share for setup days",
      "Weatherproofing for outdoor markets — rain plan and shade",
      "Tap-to-pay terminal and a cash float",
      "Receipt printer or digital receipt option",
      "Insurance certificate accessible at the booth",
    ],
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a Vancouver business licence to sell cosmetics at a market?",
    answer:
      "It depends on the market and your business activity. Confirm directly with the City of Vancouver. Some market organizers handle event-level permits; others require each vendor to be individually licensed.",
  },
  {
    question: "Are the cosmetic rules different in Vancouver?",
    answer:
      "No. Cosmetic Notification Form filing, ingredient hotlist rules, and bilingual label requirements are federal and apply across Canada. Vancouver-specific rules cover the local vendor side, not the cosmetic side.",
  },
  {
    question: "Do Vancouver markets check vendor labels?",
    answer:
      "Some market organizers do spot-checks for required information, signage, and pricing. They are not regulators, and a market clearance is not a Health Canada compliance certificate.",
  },
  {
    question: "Can I share a booth with another vendor at a Vancouver market?",
    answer:
      "Some markets allow co-vendoring; many require each vendor to be individually approved and licensed. Confirm before applying.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function VancouverMarketVendorChecklistPage() {
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
        { label: "Vancouver market vendor checklist" },
      ]}
      intro={
        <>
          <p>
            Vancouver is one of the most active indie cosmetic markets in
            Canada. The local side — vendor agreements, City of Vancouver
            licensing, market jury — is different at every market. The
            cosmetic side is the same as anywhere else in Canada.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Run a CNF Readiness Check",
        href: "/tools/cnf-readiness-checker",
        description: "Confirm your cosmetic-side prep before your first Vancouver market",
      }}
      relatedLinks={[
        {
          label: "Farmers Market Cosmetic Vendor Checklist (BC)",
          href: "/bc/farmers-market-cosmetic-vendor-checklist",
          description: "Province-wide BC vendor preparation.",
        },
        {
          label: "Cosmetic Business License Guide (BC)",
          href: "/bc/cosmetic-business-license-guide",
          description: "Provincial business registration and licensing.",
        },
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
      ]}
    />
  );
}
