import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/sell-body-butter-canada";
const title = "How to Sell Body Butter in Canada";
const description =
  "Body butter is regulated as a cosmetic in Canada. Here is what to formulate, how to label, how to cost, and what to prepare for the Cosmetic Notification Form.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Body butter is a cosmetic in Canada",
    body: (
      <p>
        Whipped, anhydrous, or emulsified body butters sold to the public
        in Canada are generally treated as leave-on cosmetics. That means
        full ingredient list, bilingual label content, and Cosmetic
        Notification Form preparation are all expected before sale.
      </p>
    ),
  },
  {
    heading: "Formulation notes",
    bullets: [
      "Stable ratio of hard butters (shea, mango, cocoa) to soft oils",
      "Anhydrous formulas avoid the preservative challenge of water-based products",
      "If your butter contains water, hydrosols, aloe, or extracts, a broad-spectrum preservative is essential",
      "Watch melting point — body butters can soften badly during summer shipping",
      "Test stability at warm and cool temperatures before launching",
    ],
  },
  {
    heading: "Labelling body butter",
    body: (
      <p>
        Body butter labels need INCI ordering, net quantity, business
        identity, and warnings or directions when applicable. Fragrance
        allergen disclosure may be needed if essential oils or fragrance
        components are present above the disclosure threshold. Plan
        bilingual content from the start.
      </p>
    ),
  },
  {
    heading: "Costing body butter",
    body: (
      <p>
        Cost per jar should include butters and oils, fragrance, jar,
        label, packaging fill, shipping in, breakage allowance, labour,
        and overhead. Anhydrous body butters often have higher unit cost
        than lotions because they are concentrated, so retail pricing
        needs to reflect that.
      </p>
    ),
  },
  {
    heading: "CNF prep for body butter",
    body: (
      <p>
        Notification preparation should capture company identity, product
        name, intended use (leave-on body moisturizer), product category,
        and the full ingredient list with INCI names and percentages or
        ranges. FormulaNorth&apos;s CNF preparation workflow walks through
        each of these sections.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Does my body butter need a Cosmetic Notification Form?",
    answer:
      "Body butter sold to the public in Canada is generally treated as a cosmetic and is expected to be notified to Health Canada within 10 days of first sale. Confirm against current Health Canada guidance for your specific product.",
  },
  {
    question: "Do I need a preservative in my body butter?",
    answer:
      "Anhydrous body butter (no water phase) does not require a broad-spectrum preservative, though antioxidants help shelf life. Body butter that contains water, hydrosols, aloe, or extracts does require an effective broad-spectrum preservative.",
  },
  {
    question: "How should I price body butter for retail?",
    answer:
      "Build a true cost per jar that includes ingredients, packaging, shipping, breakage, labour, and overhead. Apply your target margin on top. Body butter often retails at higher price points than lotion because of higher concentration.",
  },
  {
    question: "Are essential oils restricted in Canadian body butter?",
    answer:
      "Some essential oils contain components that show up on the Cosmetic Ingredient Hotlist with concentration limits. Always check ingredients against the hotlist before launch.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function SellBodyButterCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Body care"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Body Butter Canada" }]}
      intro={
        <>
          <p>
            Body butter is one of the most popular indie cosmetic products
            sold across Canada. This guide covers what to formulate, how
            to label, how to cost, and how to prepare your Cosmetic
            Notification Form before launch.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a body butter formula",
        href: "/formulas",
        description: "Save your recipe, cost per jar, and draft a label",
      }}
      relatedLinks={[
        {
          label: "How to sell handmade soap in Canada",
          href: "/how-to-sell-handmade-soap-in-canada",
          description: "Soap-specific guidance with overlapping label and CNF notes.",
        },
        {
          label: "Sell sugar scrub in Canada",
          href: "/sell-sugar-scrub-canada",
          description: "Scrub-specific formulation and label considerations.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, and warnings.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to gather before notifying Health Canada.",
        },
      ]}
    />
  );
}
