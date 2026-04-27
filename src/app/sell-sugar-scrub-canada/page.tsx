import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/sell-sugar-scrub-canada";
const title = "How to Sell Sugar Scrub in Canada";
const description =
  "Sugar and salt body scrubs are cosmetics in Canada. Here is what to formulate, label, cost, and prepare for the Cosmetic Notification Form before your first sale.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Sugar scrubs are rinse-off cosmetics in Canada",
    body: (
      <p>
        Sugar scrubs, salt scrubs, and emulsified scrubs sold to the
        public in Canada are generally treated as rinse-off cosmetics. The
        rinse-off classification matters because the Cosmetic Ingredient
        Hotlist and certain restrictions distinguish between leave-on and
        rinse-off products.
      </p>
    ),
  },
  {
    heading: "Formulation notes",
    bullets: [
      "Pick a single sugar grain size or blend coarse and fine for performance",
      "Sugar dissolves over time — choose oils and emulsifiers that hold up",
      "Anhydrous oil-and-sugar scrubs do not require water-phase preservation, but antioxidants extend shelf life",
      "Emulsified scrubs that contain water need a broad-spectrum preservative",
      "Plan for the slip and spill risk in showers — labelling can warn customers",
    ],
  },
  {
    heading: "Labelling sugar scrub",
    body: (
      <p>
        Scrub labels need INCI ingredient list, net quantity, business
        identity, and any required warnings — including a slipping warning
        is common. Bilingual content applies as it does to other cosmetic
        products. If essential oils are present, fragrance allergen
        disclosure may be required.
      </p>
    ),
  },
  {
    heading: "Costing sugar scrub",
    body: (
      <p>
        Sugar scrubs feel cheap because sugar is cheap, but the carrier
        oils, butters, and packaging often dominate cost per jar. Build a
        full cost so retail pricing actually reflects the time and
        materials going into each unit.
      </p>
    ),
  },
  {
    heading: "CNF prep for sugar scrub",
    body: (
      <p>
        For Cosmetic Notification Form preparation, expect to capture
        product name, rinse-off classification, intended use, and full
        ingredient list with INCI names and percentages or ranges.
        FormulaNorth&apos;s CNF workflow keeps this organized alongside
        your formula.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Are sugar scrubs leave-on or rinse-off?",
    answer:
      "Body scrubs are typically used in the shower and rinsed off. They are classified as rinse-off cosmetics, which affects how some Cosmetic Ingredient Hotlist conditions and concentration limits apply.",
  },
  {
    question: "Do sugar scrubs need preservatives?",
    answer:
      "An oil-and-sugar scrub with no water phase does not require broad-spectrum preservation, though antioxidants help. Emulsified scrubs containing water do require broad-spectrum preservation.",
  },
  {
    question: "Should my scrub label include a slip warning?",
    answer:
      "Many makers include a warning about slippery surfaces in the shower. It is good practice for customer safety even where not strictly required.",
  },
  {
    question: "Do I need to file a CNF for sugar scrub?",
    answer:
      "Sugar scrub sold to the public in Canada is treated as a cosmetic and is generally expected to be notified to Health Canada within 10 days of first sale.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function SellSugarScrubCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Body care"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Sugar Scrub Canada" }]}
      intro={
        <>
          <p>
            Sugar scrub is a high-margin indie cosmetic product when
            formulated, labelled, and costed correctly. This guide covers
            the rinse-off classification, formulation considerations, and
            what to prepare before your first Canadian sale.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a sugar scrub formula",
        href: "/formulas",
        description: "Save your scrub recipe and cost it per jar",
      }}
      relatedLinks={[
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Body butter formulation, label, and cost notes.",
        },
        {
          label: "Sell bath bombs in Canada",
          href: "/sell-bath-bombs-canada",
          description: "Bath bomb formulation and label notes.",
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
