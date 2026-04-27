import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/health-canada-cosmetic-hotlist";
const title = "Health Canada Cosmetic Ingredient Hotlist Explained";
const description =
  "What the Health Canada Cosmetic Ingredient Hotlist is, how prohibited and restricted ingredients are handled, and how to check your formula and label against it.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What the Hotlist is",
    body: (
      <>
        <p>
          The Cosmetic Ingredient Hotlist is a Health Canada list of
          substances that are either prohibited or restricted for use in
          cosmetics sold in Canada. It is used as part of safety oversight
          under the Cosmetic Regulations, and Health Canada updates it as new
          information becomes available.
        </p>
        <p>
          The hotlist is not the only requirement makers need to follow, but
          it is one of the most common reasons cosmetic notifications need to
          be revised. Reviewing your formula against the hotlist early saves
          rework on both the formula and the label.
        </p>
      </>
    ),
  },
  {
    heading: "Prohibited vs restricted ingredients",
    body: (
      <p>
        Prohibited ingredients should not be used in cosmetic products sold
        in Canada at all. Restricted ingredients are allowed only under
        specific conditions — for example, a maximum concentration, a
        product type restriction (leave-on vs rinse-off), or a required
        warning statement on the label. Restrictions can also depend on who
        the product is intended for.
      </p>
    ),
  },
  {
    heading: "How to check your formula against the Hotlist",
    body: (
      <p>
        Use the FormulaNorth ingredient database to look up each ingredient
        by INCI name and review its hotlist status. The full hotlist data
        view is also available so you can browse restricted and prohibited
        ingredients directly.
      </p>
    ),
    bullets: [
      "Identify each ingredient in your formula by INCI name",
      "Check hotlist status — prohibited, restricted, or unrestricted",
      "Confirm any concentration limits and product-type restrictions",
      "Note any required warning statements for the label",
      "Document your check date so you can re-verify before launch",
    ],
  },
  {
    heading: "Hotlist notes that show up on labels",
    body: (
      <p>
        Some hotlist entries trigger required warning statements on the
        label. Reviewing your formula against the hotlist before printing
        packaging avoids costly reprints and keeps your CNF preparation
        and label content aligned.
      </p>
    ),
  },
  {
    heading: "How FormulaNorth surfaces Hotlist context",
    body: (
      <p>
        FormulaNorth shows hotlist status on each ingredient page, surfaces
        warnings inside the formula builder, and includes hotlist context as
        part of the CNF preparation workflow. Always verify against the
        current Health Canada hotlist before submitting a notification or
        printing labels.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Where does the Cosmetic Ingredient Hotlist come from?",
    answer:
      "The hotlist is published and maintained by Health Canada. It identifies substances that are prohibited or restricted for use in cosmetics under the Cosmetic Regulations.",
  },
  {
    question: "How often does the Hotlist change?",
    answer:
      "Health Canada updates the hotlist periodically as new safety information becomes available. Always verify against the current published hotlist on the Health Canada website before submitting a CNF or finalizing labels.",
  },
  {
    question: "Does a restricted ingredient mean I cannot use it?",
    answer:
      "Not necessarily. Restricted ingredients can often be used under specific conditions, such as a maximum concentration, product type, or required label warning. Read the full restriction text before deciding whether the ingredient fits your product.",
  },
  {
    question: "Does FormulaNorth maintain the official Hotlist?",
    answer:
      "FormulaNorth surfaces hotlist context for ingredients to support your prep work. The official source of truth is the Health Canada Cosmetic Ingredient Hotlist, which makers should consult directly before final review.",
  },
  {
    question: "What happens if my product contains a prohibited ingredient?",
    answer:
      "Products containing prohibited ingredients are not compliant for sale in Canada. Reformulate before notification or launch — do not file a CNF for a product that contains a prohibited substance.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function HealthCanadaCosmeticHotlistPage() {
  return (
    <SeoGuide
      eyebrow="Health Canada"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Health Canada Cosmetic Hotlist" }]}
      intro={
        <>
          <p>
            The Health Canada Cosmetic Ingredient Hotlist is the list of
            substances that are prohibited or restricted in cosmetics sold
            in Canada. Reviewing your formula against it before notification
            or labelling is one of the highest-leverage things a maker can
            do.
          </p>
          <p>
            This guide explains the difference between prohibited and
            restricted ingredients, how to check your formula, and how
            hotlist conditions can affect your label.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "View the Hotlist data",
        href: "/ingredients/hotlist",
        description: "Browse restricted and prohibited cosmetic ingredients",
      }}
      relatedLinks={[
        {
          label: "Hotlist data table",
          href: "/ingredients/hotlist",
          description:
            "Searchable list of restricted and prohibited cosmetic ingredients with concentration limits.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description:
            "What to gather for your Health Canada cosmetic notification.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description:
            "How hotlist conditions show up as label warnings and INCI ordering rules.",
        },
        {
          label: "Ingredient database",
          href: "/ingredients",
          description: "INCI lookup with hotlist status on every ingredient.",
        },
      ]}
    />
  );
}
