import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/inci-name-lookup-canada";
const title = "INCI Name Lookup for Canadian Cosmetic Makers";
const description =
  "How INCI naming works in Canada, why it matters for your label and CNF, and how to look up the correct INCI name for any cosmetic ingredient.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What an INCI name is",
    body: (
      <>
        <p>
          INCI stands for International Nomenclature of Cosmetic Ingredients.
          It is a globally recognized naming system used on cosmetic
          ingredient lists. INCI names are usually in Latin or anglicized
          scientific form and stay consistent across countries.
        </p>
        <p>
          For example, &quot;coconut oil&quot; on a marketing panel becomes
          &quot;Cocos Nucifera (Coconut) Oil&quot; in the INCI list, and
          &quot;vitamin E&quot; becomes &quot;Tocopherol&quot;.
        </p>
      </>
    ),
  },
  {
    heading: "Why INCI naming matters in Canada",
    body: (
      <p>
        Canadian cosmetic labels and the Cosmetic Notification Form both
        rely on INCI names. Mixing common names with INCI names is one of
        the most common reasons label drafts and CNF entries need to be
        revised. Getting the INCI name right early avoids reprinting
        packaging and resubmitting notifications.
      </p>
    ),
    bullets: [
      "Required for the cosmetic ingredient list on the label",
      "Used inside the Health Canada Cosmetic Notification Form",
      "Helps reviewers and customers identify the actual substance",
      "Consistent across markets, which simplifies sourcing and translation",
    ],
  },
  {
    heading: "How to look up an INCI name",
    body: (
      <p>
        FormulaNorth&apos;s ingredient database lets you search by common
        name or INCI name and see related details — function, hotlist
        status, and supplier availability — in one place. If an ingredient
        is not yet in the database, ask your supplier for the official INCI
        designation on their Certificate of Analysis or product spec sheet.
      </p>
    ),
  },
  {
    heading: "Common INCI lookup mistakes",
    body: (
      <p>
        Not every botanical extract has the same INCI name across suppliers.
        Watch for spelling variations, missing parenthetical common names,
        and ingredients that are blends (where each component needs its own
        INCI name). Fragrance components and natural fragrance allergens
        also have their own naming rules that are easy to miss.
      </p>
    ),
    bullets: [
      "Treat blends as multiple ingredients, not one",
      "Use the supplier-provided INCI as a starting point, then verify",
      "Watch for parenthetical common names (e.g., (Coconut) Oil)",
      "Disclose fragrance allergens by INCI when above the threshold",
    ],
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Is INCI naming required on Canadian cosmetic labels?",
    answer:
      "Yes. Cosmetic ingredient lists on Canadian labels are expected to use INCI names, listed in descending order of concentration for ingredients above one percent.",
  },
  {
    question: "Where do INCI names come from?",
    answer:
      "INCI names are assigned by the Personal Care Products Council and adopted internationally. Suppliers, regulators, and ingredient databases use the same INCI names so the substance is identified consistently.",
  },
  {
    question: "Can I make up my own INCI name if I cannot find one?",
    answer:
      "No. If you cannot find an INCI name for an ingredient, contact your supplier for the official designation. Custom or invented names will not be accepted on a Canadian label.",
  },
  {
    question: "Do I list common names alongside INCI?",
    answer:
      "Some INCI names include a parenthetical common name (for example, Cocos Nucifera (Coconut) Oil). Outside of that convention, the cosmetic ingredient list itself uses INCI names.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function InciNameLookupCanadaPage() {
  return (
    <SeoGuide
      eyebrow="INCI"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "INCI Name Lookup Canada" }]}
      intro={
        <>
          <p>
            INCI names sit at the heart of cosmetic labels and Canadian
            cosmetic notifications. This guide explains what INCI naming is,
            why it matters in Canada, and how to look up the right name
            before drafting a label or filing a CNF.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Search the ingredient database",
        href: "/ingredients",
        description: "Look up INCI names by common name, function, or supplier",
      }}
      relatedLinks={[
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "How INCI ordering and bilingual content work on Canadian labels.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "How INCI names feed into your Health Canada notification.",
        },
        {
          label: "Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Cross-check INCI names against restricted and prohibited ingredients.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/cosmetic-ingredient-suppliers-canada",
          description: "Find Canadian suppliers and the INCI designations they use.",
        },
      ]}
    />
  );
}
