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
const lastReviewed = "July 14, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What an INCI name is",
    body: (
      <>
        <p>
          INCI stands for International Nomenclature of Cosmetic Ingredients.
          It is a globally standardized naming system maintained by the Personal
          Care Products Council (PCPC) and used on cosmetic ingredient lists
          worldwide. INCI names are typically in Latin or anglicized scientific
          form and stay consistent regardless of which country a product is sold
          in or what marketing name a supplier uses for the ingredient.
        </p>
        <p>
          Common names and INCI names are often very different.
          &quot;Coconut oil&quot; becomes &quot;Cocos Nucifera (Coconut) Oil&quot;,
          &quot;vitamin E&quot; becomes &quot;Tocopherol&quot;, and &quot;shea butter&quot;
          becomes &quot;Butyrospermum Parkii (Shea) Butter&quot;. Some ingredients
          that a maker thinks of as one thing — like &quot;fragrance&quot; — may
          require multiple individual INCI entries under the new allergen
          disclosure rules.
        </p>
        <p>
          The INCI system exists so that any reviewer, consumer, or regulator can
          identify the exact substance in a formula regardless of the brand name or
          common name being used. For Canadian cosmetic makers, using the correct
          INCI name is not optional — it is required on both the label and the
          Cosmetic Notification Form.
        </p>
      </>
    ),
  },
  {
    heading: "Why INCI naming matters in Canada",
    body: (
      <>
        <p>
          Under the Cosmetics Regulations, the ingredient list on a Canadian
          cosmetic label must use INCI names, listed in descending order of
          concentration. Health Canada also expects INCI names on the Cosmetic
          Notification Form (CNF). An ingredient listed under its common name,
          trade name, or an incorrect INCI variant can cause a notification to
          be flagged or rejected.
        </p>
        <p>
          Beyond regulatory compliance, INCI naming affects every downstream
          step of getting a product to market. Label artwork needs INCI names
          before it can go to print. CNF preparation needs INCI names before
          the form can be filled out accurately. Supplier verification often
          depends on matching the INCI name on the ingredient&apos;s Certificate
          of Analysis to what is on the label.
        </p>
      </>
    ),
    bullets: [
      "Required for the cosmetic ingredient list on the Canadian label",
      "Required inside the Health Canada Cosmetic Notification Form",
      "Needed to verify a supplier's Certificate of Analysis",
      "Enables hotlist cross-referencing against restricted and prohibited ingredients",
      "Consistent across markets, which simplifies international compliance",
      "Fragrance allergen disclosure requires individual INCI entries above thresholds",
    ],
  },
  {
    heading: "How to look up an INCI name",
    body: (
      <>
        <p>
          The most reliable sources for INCI names are the PCPC&apos;s CosIng
          database (maintained by the European Commission), your supplier&apos;s
          Certificate of Analysis or product spec sheet, and ingredient databases
          like FormulaNorth&apos;s that map common names to their INCI equivalents.
        </p>
        <p>
          FormulaNorth&apos;s ingredient database lets you search by common name or
          INCI name and see related details — function category, hotlist status,
          and Canadian supplier availability — in one place. If an ingredient is
          not in the database, ask your supplier for the official INCI designation
          on their documentation. Never use a trade name or brand name as a
          substitute for the INCI name on a label or CNF.
        </p>
        <p>
          For blended ingredients — fragrance oils, botanical extracts sold as
          proprietary blends, or multi-component emulsifiers — each component
          needs its own INCI name rather than one entry for the blend. Suppliers
          of these ingredients should provide a full INCI breakdown. If they
          cannot, that is worth knowing before you commit to the ingredient.
        </p>
      </>
    ),
  },
  {
    heading: "Common INCI lookup mistakes",
    body: (
      <>
        <p>
          The most common mistake is treating a supplier&apos;s trade name as the INCI
          name. Trade names like &quot;Olivem 1000&quot; or &quot;BTMS-50&quot; are marketing
          names — each has a corresponding INCI name (Cetearyl Olivate, Sorbitan
          Olivate and Behentrimonium Methosulfate, Cetyl Alcohol respectively)
          that must appear on the label instead.
        </p>
        <p>
          Another frequent issue is using the wrong variant of an INCI name. Some
          ingredients have very similar names that refer to different substances —
          for example, Glycerin and Glyceryl Stearate are different ingredients
          with different functions. Small differences in spelling or word order
          matter.
        </p>
      </>
    ),
    bullets: [
      "Trade names and brand names are not INCI names — always look up the official INCI",
      "Treat blends as multiple INCI entries, not one combined name",
      "Use the supplier-provided INCI as a starting point, then verify against a reference database",
      "Watch for parenthetical common names — they are part of the official INCI (e.g., Cocos Nucifera (Coconut) Oil)",
      "Fragrance allergens must be disclosed individually by INCI when above the threshold",
      "Check spelling carefully — similar-sounding INCI names can refer to different substances",
    ],
  },
  {
    heading: "INCI names and fragrance allergen disclosure",
    body: (
      <>
        <p>
          As of April 12, 2026, Canadian cosmetics must individually disclose 24
          specific fragrance allergens by INCI name when they are present above
          disclosure thresholds — 0.001% in leave-on products, 0.01% in rinse-off
          products. The list expands to 81 allergens for new products sold after
          August 1, 2026.
        </p>
        <p>
          This means fragrance components that were previously lumped under the
          single INCI entry &quot;Fragrance&quot; or &quot;Parfum&quot; now require individual
          INCI names on the label and in the CNF if they exceed the threshold. If
          you use any essential oils or fragrance blends in your products, you need
          a full allergen breakdown from your supplier and the correct INCI names
          for any allergens that are above the limit.
        </p>
      </>
    ),
  },
  {
    heading: "INCI names on your CNF",
    body: (
      <>
        <p>
          The Cosmetic Notification Form requires you to list each ingredient by
          INCI name along with its concentration in the formula. Health Canada
          reviewers use the INCI names to cross-reference against the Cosmetic
          Ingredient Hotlist and to confirm that restricted ingredients are within
          their permitted concentration limits.
        </p>
        <p>
          If your INCI names on the CNF do not match your label, the notification
          may be queried. Getting the names right before you fill in the form —
          not after — is the faster path. Building your ingredient list with INCI
          names from the start of the formulation process means the same data
          feeds your label, your costing, and your CNF without having to translate
          back and forth.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Is INCI naming required on Canadian cosmetic labels?",
    answer:
      "Yes. Cosmetic ingredient lists on Canadian labels must use INCI names, listed in descending order of concentration for ingredients present above one percent. Ingredients at or below one percent can be listed in any order after higher-concentration ingredients.",
  },
  {
    question: "Where do INCI names come from?",
    answer:
      "INCI names are assigned and maintained by the Personal Care Products Council (PCPC) and adopted internationally. The European Commission's CosIng database is a widely used reference. Suppliers, regulators, and ingredient databases use the same INCI names so a substance is identified consistently regardless of brand name.",
  },
  {
    question: "Can I make up my own INCI name if I cannot find one?",
    answer:
      "No. If you cannot find an INCI name for an ingredient, contact your supplier for the official designation from their Certificate of Analysis or product spec sheet. Custom or invented names will not be accepted on a Canadian label or CNF.",
  },
  {
    question: "Do I list common names alongside INCI?",
    answer:
      "Some INCI names include a parenthetical common name — for example, Cocos Nucifera (Coconut) Oil. That parenthetical is part of the official INCI and appears on the label as written. Outside of that convention, the cosmetic ingredient list uses INCI names, not additional common names.",
  },
  {
    question: "What if my supplier gives me a different INCI name than the database shows?",
    answer:
      "Check both sources against the CosIng database or ask the supplier for documentation. INCI names do occasionally have alternate valid forms, but if the names differ substantially, it is worth confirming which substance is actually being supplied before committing it to a label.",
  },
  {
    question: "Do I need INCI names for water and pigments?",
    answer:
      "Yes. Water is listed as Aqua in INCI, not Water. Colorants typically use their Colour Index (CI) number as the INCI name — for example, CI 77491 for iron oxide red. All ingredients in the formula need the correct INCI designation on the label and CNF.",
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
      dateModified="2026-07-14"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "INCI Name Lookup Canada" }]}
      intro={
        <>
          <p>
            INCI names sit at the heart of cosmetic labels and Canadian cosmetic
            notifications. Without the correct INCI name, a label cannot be
            finalized, a CNF cannot be accurately filed, and an ingredient cannot
            be properly cross-referenced against the Health Canada Hotlist. This
            guide explains what INCI naming is, where to find correct names, and
            the mistakes that most commonly delay label sign-off or CNF
            acceptance.
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
