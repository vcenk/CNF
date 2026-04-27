import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/sell-bath-bombs-canada";
const title = "How to Sell Bath Bombs in Canada";
const description =
  "Bath bombs are cosmetics in Canada. Here is how to formulate stable bombs, label them correctly, cost them honestly, and prepare your Cosmetic Notification Form.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Bath bombs are cosmetics in Canada",
    body: (
      <p>
        Bath bombs sold to the public in Canada are generally treated as
        rinse-off cosmetics. Even though they are used briefly and rinsed
        away, the same notification, labelling, and ingredient
        considerations apply as for other cosmetic products.
      </p>
    ),
  },
  {
    heading: "Formulation notes",
    bullets: [
      "Balance baking soda and citric acid carefully for a clean fizz",
      "Witch hazel, polysorbate, or oils need to be added in the right order to avoid premature reaction",
      "Humidity control is critical — many failed batches come down to humid storage",
      "Colourants and lakes need to be approved for cosmetic use and reviewed against the Hotlist",
      "Glitter and inclusions can clog drains — consider biodegradable options",
    ],
  },
  {
    heading: "Labelling bath bombs",
    body: (
      <p>
        Each bath bomb needs INCI ingredient list, net quantity, business
        identity, and any required warnings. Keep slip and skin-irritation
        warnings in mind, especially for products with essential oils.
        Bilingual content applies, and clear warnings about not eating the
        product help even when not strictly required.
      </p>
    ),
  },
  {
    heading: "Costing bath bombs",
    body: (
      <p>
        Bath bombs look cheap to make but the real cost adds up — moulds,
        wrap, fragrance, colour, breakage, and shipping fragility all
        matter. Cost honestly so retail and wholesale pricing reflect what
        a sellable bath bomb actually costs to produce.
      </p>
    ),
  },
  {
    heading: "CNF prep for bath bombs",
    body: (
      <p>
        Bath bomb CNF preparation should capture product name, rinse-off
        classification, intended use, ingredient list with INCI names and
        percentages or ranges, and any colourant or fragrance details.
        FormulaNorth&apos;s CNF workflow keeps this aligned with your
        formula and label.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Are bath bombs cosmetics or something else in Canada?",
    answer:
      "Bath bombs sold to the public are generally treated as rinse-off cosmetics in Canada. They are not food and should never carry food-style claims, even if they look or smell like dessert.",
  },
  {
    question: "Do bath bombs need a Cosmetic Notification Form?",
    answer:
      "Yes — bath bombs sold to the public in Canada are generally expected to be notified to Health Canada within 10 days of first sale, with each distinct product variant captured.",
  },
  {
    question: "Can I use any colour or glitter in my bath bombs?",
    answer:
      "Colourants need to be approved for cosmetic use and checked against the Cosmetic Ingredient Hotlist. Plastic glitter is increasingly avoided for environmental reasons — biodegradable alternatives are widely available.",
  },
  {
    question: "How do I keep my bath bombs from cracking or expanding?",
    answer:
      "Humidity is the biggest enemy. Mix and store bombs in a dry environment. Wrapping them tightly soon after curing also helps. Many cracks come from rushed curing more than recipe issues.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function SellBathBombsCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Body care"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Bath Bombs Canada" }]}
      intro={
        <>
          <p>
            Bath bombs are one of the most popular and most over-supplied
            indie cosmetic products in Canada. Standing out means careful
            formulation, honest costing, and a label that meets Canadian
            cosmetic requirements. This guide covers each piece.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a bath bomb formula",
        href: "/formulas",
        description: "Save your recipe, cost it per unit, and draft a label",
      }}
      relatedLinks={[
        {
          label: "Sell sugar scrub in Canada",
          href: "/sell-sugar-scrub-canada",
          description: "Scrub formulation and label notes.",
        },
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Body butter formulation, label, and cost notes.",
        },
        {
          label: "Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Cross-check colours, fragrances, and additives.",
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
