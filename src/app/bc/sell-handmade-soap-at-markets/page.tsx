import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";

const pathname = "/bc/sell-handmade-soap-at-markets";
const title = "How to Sell Handmade Soap at BC Markets";
const description =
  "Soap-specific notes for BC market vendors — what makes a smooth booth, what your label needs, and how to keep cosmetic notification on track.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Soap is a cosmetic in Canada",
    body: (
      <p>
        Most cold process, hot process, and melt-and-pour soap sold to the
        public in Canada is treated as a cosmetic. The market location
        (Granville Island, downtown Vancouver, a Kelowna farmers market,
        anywhere in BC) does not change that.
      </p>
    ),
  },
  {
    heading: "Booth presentation",
    bullets: [
      "Display bars on raised stands so customers see the bar shape and label",
      "Group by scent category or use case (calming, energizing, kitchen) for easier conversation",
      "Print mini-cards with the most-asked questions (palm-free, vegan, sensitive skin)",
      "Have unwrapped sniffers separate from sealed for-sale bars",
    ],
  },
  {
    heading: "Soap labels at a BC market",
    body: (
      <p>
        Each bar needs the standard Canadian cosmetic label content — INCI
        ingredient list, net weight, business identity, and required
        warnings — in English and French. Cold process soap can lose
        weight while curing, so build a small buffer into the labelled net
        weight.
      </p>
    ),
  },
  {
    heading: "Handling tester bars",
    body: (
      <p>
        Tester bars touched by many people can become a hygiene concern.
        Many BC soap vendors use sealed sniffer pucks or mini-bars with
        signage that the sniffer is not for sale. This is not a regulatory
        requirement, but it protects sellable inventory and customer
        experience.
      </p>
    ),
  },
  {
    heading: "Soap-specific market questions",
    body: (
      <p>
        Customers will ask about palm sustainability, vegan status, scent
        ingredients, and skincare benefits. Answer factually and avoid
        therapeutic claims (treats eczema, kills bacteria) — those move the
        product out of cosmetic regulation in Canada.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Can I claim my soap helps with eczema at a BC market?",
    answer:
      "No. Therapeutic claims like 'helps with eczema' typically push a product out of cosmetic regulation into a different framework. Keep claims cosmetic — gentle, moisturizing, fragrance-free — to stay in the simpler cosmetic system.",
  },
  {
    question: "Do I need to wrap soap individually for sale at a market?",
    answer:
      "Hygiene-wise, yes — most BC vendors wrap or band each bar so the for-sale product is protected. The cosmetic label content needs to remain visible or accompany the bar.",
  },
  {
    question: "What's the safest way to sample soap?",
    answer:
      "Use sealed sniffer pucks or designated sample bars. Avoid letting customers touch the for-sale inventory.",
  },
  {
    question: "Does the BC market organizer notify Health Canada for me?",
    answer:
      "No. Cosmetic Notification Form filing is the maker's responsibility, regardless of where the soap is sold.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function SellHandmadeSoapAtMarketsPage() {
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
        { label: "Sell handmade soap at markets" },
      ]}
      intro={
        <>
          <p>
            Soap is one of the most common indie cosmetic products at BC
            markets. This guide covers booth presentation, label
            considerations, and how to keep the cosmetic-notification side
            on track while you focus on sales.
          </p>
          <BcScopeCallout />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a soap formula",
        href: "/formulas",
        description: "Save your recipe and cost it per bar",
      }}
      relatedLinks={[
        {
          label: "How to Sell Handmade Soap in Canada",
          href: "/how-to-sell-handmade-soap-in-canada",
          description: "Canada-wide soap-vendor guide.",
        },
        {
          label: "Farmers Market Cosmetic Vendor Checklist (BC)",
          href: "/bc/farmers-market-cosmetic-vendor-checklist",
          description: "Generic BC market vendor preparation.",
        },
        {
          label: "Cosmetic Label Requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content and INCI ordering.",
        },
        {
          label: "CNF Readiness Checker",
          href: "/tools/cnf-readiness-checker",
          description: "Free tool — check your soap before your first market.",
        },
      ]}
    />
  );
}
