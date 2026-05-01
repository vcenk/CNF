import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { FragranceAllergenAlert } from "@/components/marketing/fragrance-allergen-alert";

const pathname = "/cosmetic-label-requirements-canada";
const title = "Cosmetic Label Requirements in Canada";
const description =
  "What goes on a Canadian cosmetic label — bilingual content, INCI ingredient list ordering, net quantity, business identity, warnings, and how to plan your label before printing.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What a Canadian cosmetic label is expected to include",
    body: (
      <p>
        Canadian cosmetic labels are governed by the Cosmetic Regulations and
        the Consumer Packaging and Labelling Act. At a high level, the
        principal display panel and any secondary panels need to identify the
        product, the responsible business, the net quantity, and the
        ingredients, with key information available in both English and
        French.
      </p>
    ),
    bullets: [
      "Product identity (what the product is)",
      "Net quantity in metric units on the principal display panel",
      "Business name and address of the manufacturer or importer",
      "Ingredient list using INCI names",
      "Any required warnings or directions for safe use",
      "Bilingual (English and French) content where required",
    ],
  },
  {
    heading: "Ingredient list and INCI ordering",
    body: (
      <>
        <p>
          The cosmetic ingredient list is shown using International
          Nomenclature of Cosmetic Ingredients (INCI) names. Ingredients
          present at greater than one percent are typically listed in
          descending order of concentration, and ingredients at one percent
          or less can be listed in any order after them. Colour additives
          may be grouped at the end.
        </p>
        <p>
          INCI naming is strict. &quot;Coconut oil&quot; on the marketing
          panel becomes &quot;Cocos Nucifera (Coconut) Oil&quot; on the
          ingredient list. Mixing common names and INCI names is one of the
          most common label errors.
        </p>
      </>
    ),
  },
  {
    heading: "Bilingual labelling",
    body: (
      <p>
        Required label information generally needs to appear in both English
        and French. Translation work is easier when you start from clean
        source content. Decide which fields need French equivalents
        (product identity, directions, warnings, claims) before you send
        anything to a designer or printer.
      </p>
    ),
  },
  {
    heading: "Warnings, claims, and fragrance allergens",
    body: (
      <>
        <p>
          Some cosmetic ingredients require specific warnings on label or
          packaging based on Health Canada Cosmetic Ingredient Hotlist
          conditions. Marketing claims need to be honest, supportable, and
          should avoid drug-like wording for products notified as cosmetics.
        </p>
        <p>
          Fragrance allergen disclosure rules have evolved. Plan ahead so
          your label can break out individual fragrance allergens when
          present above the disclosure threshold, rather than reprinting
          packaging later.
        </p>
      </>
    ),
  },
  {
    heading: "How FormulaNorth helps with label drafting",
    body: (
      <p>
        FormulaNorth&apos;s formula builder lets you draft an ingredient list
        directly from your formula, surface fragrance allergen reminders,
        and prepare bilingual content in one place. Label drafts can then be
        reviewed alongside your CNF preparation work so the package and the
        notification stay aligned. FormulaNorth supports your label work —
        it does not replace professional regulatory or French-language
        review.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do Canadian cosmetic labels have to be bilingual?",
    answer:
      "Required information on a Canadian cosmetic label generally needs to appear in both English and French. Some provinces, notably Quebec, have additional French-language requirements. Always confirm against current Health Canada and provincial guidance.",
  },
  {
    question: "How are ingredients listed on a cosmetic label in Canada?",
    answer:
      "Ingredients are listed using INCI names, in descending order of concentration for ingredients above one percent. Ingredients at one percent or less can appear in any order after the higher-concentration ingredients. Colour additives are commonly grouped at the end.",
  },
  {
    question: "Does a small handmade soap or body butter still need a full label?",
    answer:
      "Yes. Cosmetic label requirements apply regardless of business size. Hand-poured soaps, body butters, lotions, and similar products sold to the public are expected to carry the standard cosmetic label content.",
  },
  {
    question: "Can FormulaNorth print my labels for me?",
    answer:
      "No. FormulaNorth helps you draft and organize bilingual label content from your formula, but printing and final design review is handled by you or your label printer.",
  },
  {
    question: "How does the Hotlist affect my label?",
    answer:
      "Some ingredients on the Health Canada Cosmetic Ingredient Hotlist carry conditions of use, including specific warning statements that need to appear on the label. Reviewing your formula against the hotlist before designing the label avoids reprints.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function CosmeticLabelRequirementsCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Labelling"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Cosmetic Label Requirements Canada" }]}
      intro={
        <>
          <p>
            Canadian cosmetic labels carry product identity, business
            details, net quantity, ingredient list, and any required
            warnings, with bilingual English and French content where
            applicable. Getting the label right early avoids reprints and
            keeps your product launch on track.
          </p>
          <p>
            This guide explains the core label elements, how INCI ordering
            works, and how to plan bilingual content before you send
            packaging to a printer.
          </p>
          <FragranceAllergenAlert variant="compact" source="label-guide" />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Browse ingredients with INCI names",
        href: "/ingredients",
        description:
          "Look up INCI names for your ingredients before drafting your label",
      }}
      relatedLinks={[
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description:
            "What to gather for your Health Canada cosmetic notification.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description:
            "Restricted and prohibited ingredients with conditions of use that affect your label.",
        },
        {
          label: "Ingredient database",
          href: "/ingredients",
          description: "INCI names, function, and supplier availability for label prep.",
        },
        {
          label: "Existing CNF guide",
          href: "/guides/health-canada-cosmetic-notification",
          description: "Walkthrough of the cosmetic notification workflow.",
        },
      ]}
    />
  );
}
