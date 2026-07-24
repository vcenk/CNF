import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";
import { FragranceAllergenAlert } from "@/components/marketing/fragrance-allergen-alert";

const pathname = "/health-canada-cosmetic-hotlist";
const title = "Health Canada Cosmetic Ingredient Hotlist Explained";
const description =
  "What the Health Canada Cosmetic Ingredient Hotlist is, how prohibited and restricted ingredients are handled, and how to check your formula and label against it.";
const lastReviewed = "July 24, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What the Cosmetic Ingredient Hotlist is",
    body: (
      <>
        <p>
          The Cosmetic Ingredient Hotlist is a list maintained by Health Canada
          of substances that are prohibited or restricted for use in cosmetics
          sold in Canada. It operates under the authority of the Food and Drugs
          Act and the Cosmetic Regulations, and Health Canada updates it as new
          safety information becomes available or as international standards
          change.
        </p>
        <p>
          The Hotlist is not a complete list of all safe cosmetic ingredients —
          it is specifically a list of substances with known concerns. An
          ingredient not appearing on the Hotlist is not automatically approved
          or guaranteed safe; it simply has no current restriction under this
          list. Makers remain responsible for the safety of every ingredient
          in their products.
        </p>
        <p>
          Checking your formula against the Hotlist is one of the most
          important pre-launch steps for any Canadian cosmetic maker. A product
          containing a prohibited ingredient cannot legally be sold in Canada.
          A product containing a restricted ingredient at a non-compliant
          concentration or without a required label warning is also
          non-compliant, even if the restriction is subtle.
        </p>
      </>
    ),
  },
  {
    heading: "Prohibited vs restricted ingredients",
    body: (
      <>
        <p>
          <strong>Prohibited ingredients</strong> cannot be used in Canadian
          cosmetics at any concentration. Using a prohibited ingredient in a
          formula makes the product non-compliant regardless of concentration
          level. Common categories of prohibited substances include certain
          heavy metals and their compounds (lead, mercury, arsenic above trace
          limits), specific antimicrobial agents restricted after regulatory
          review, and substances with established safety concerns such as
          formaldehyde releasers above threshold levels and certain coal tar
          dyes.
        </p>
        <p>
          <strong>Restricted ingredients</strong> are permitted in Canadian
          cosmetics only under defined conditions. The conditions vary by
          ingredient and can include: a maximum concentration limit, a
          restriction to a specific product type (leave-on only, rinse-off
          only, not for use around eyes), a restriction based on user age or
          population (not for children under 3), or a requirement for a
          specific warning statement on the label. Meeting the conditions makes
          the ingredient compliant; using the ingredient outside those
          conditions does not.
        </p>
        <p>
          Some entries on the Hotlist apply differently depending on whether
          the product is leave-on or rinse-off. A preservative allowed at 0.5%
          in a rinse-off shampoo might be restricted to 0.1% in a leave-on
          lotion. Classification of your product as leave-on or rinse-off
          affects which concentration limits apply.
        </p>
      </>
    ),
  },
  {
    heading: "Ingredient categories indie makers most commonly encounter",
    body: (
      <>
        <p>
          <strong>Preservatives.</strong> Many common cosmetic preservatives
          appear on the Hotlist with concentration limits. Methylparaben,
          ethylparaben, and other parabens are restricted to specific
          concentration caps individually and in combination. Phenoxyethanol
          is restricted to 1% maximum. DMDM Hydantoin and other formaldehyde
          releasers have specific limits. Makers using multi-preservative
          blends need to track the total concentration of each active
          component, not just the blend percentage.
        </p>
        <p>
          <strong>Alpha-hydroxy acids (AHAs).</strong> Glycolic acid, lactic
          acid, citric acid, and other AHAs are restricted at higher
          concentrations and require specific label warnings — including
          sun-sensitivity warnings — when used above defined thresholds.
          Exfoliating products and chemical peels using AHAs need a full
          Hotlist review.
        </p>
        <p>
          <strong>Colourants.</strong> Not all colourants approved in the US
          by the FDA are approved in Canada. Health Canada has its own approved
          colourant list and Hotlist entries for restricted or prohibited
          colourants. Micas containing chromium oxide or manganese violet,
          certain ultramarines, and some synthetic dyes require Hotlist
          verification. US suppliers may sell colourants that are legal under
          FDA rules but not compliant under Canadian Cosmetic Regulations.
        </p>
        <p>
          <strong>Essential oils and botanical extracts.</strong> Some essential
          oil components appear on the Hotlist with concentration limits —
          coumarin (found in cassia, tonka bean, some lavender absolutes),
          bergapten (in cold-pressed bergamot), methyl eugenol, and pulegone
          (in pennyroyal, some mint species). Essential oils used at typical
          fragrance levels are usually within limits, but high-concentration
          essential oil blends or single-note essential oil products need
          verification.
        </p>
        <p>
          <strong>Sunscreen actives.</strong> Any ingredient used for its UV
          filtering function in Canada must be on the approved sunscreen
          monograph — sunscreens are regulated as drugs in Canada, not
          cosmetics. If a product is positioned as sun-protective, the
          regulatory pathway is different entirely.
        </p>
      </>
    ),
  },
  {
    heading: "Leave-on vs rinse-off classification",
    body: (
      <>
        <p>
          Many Hotlist restrictions specify different limits for leave-on and
          rinse-off products. Classification matters because the same
          ingredient at the same concentration may be compliant in one product
          type and non-compliant in another.
        </p>
        <p>
          Leave-on products remain on the skin after application — body lotion,
          face serum, lip balm, deodorant, hair leave-in conditioner. Rinse-off
          products are applied and then washed away — shampoo, conditioner used
          and rinsed, face wash, body wash, bar soap, exfoliating scrub. Bath
          bombs and bath soaks are typically classified as rinse-off because the
          product is diluted in bath water and washed off.
        </p>
        <p>
          A product marketed with a dual use — &quot;leave on as a
          treatment&quot; — may be subject to the leave-on limits even if it is
          also used as a rinse-off. When in doubt, apply the more restrictive
          classification.
        </p>
      </>
    ),
  },
  {
    heading: "Required warning statements from the Hotlist",
    body: (
      <>
        <p>
          Some Hotlist entries include required warning statements that must
          appear on the label when the ingredient is present at or above the
          relevant threshold. These are not optional disclosures — they are
          mandatory label content for products using that ingredient.
        </p>
        <p>
          Common examples include: AHAs above certain concentrations (sun
          sensitivity warning, daily SPF use recommendation), hydrogen
          peroxide in hair or skin products (avoid contact with eyes, keep
          away from children), certain preservatives (for professional use
          only or avoid contact with eyes), and some botanical extracts with
          sensitization potential.
        </p>
        <p>
          Warning statements from the Hotlist must be bilingual — English and
          French. If you are using an ingredient that triggers a required
          warning, that text needs to be in your label design before printing.
          Discovering a required warning after labels are printed means a
          reprint.
        </p>
      </>
    ),
  },
  {
    heading: "How to check your formula against the Hotlist",
    body: (
      <>
        <p>
          A Hotlist check is most effective when done at the ingredient level,
          not at the formula level. Review each ingredient individually rather
          than scanning the formula as a whole.
        </p>
        <p>
          For each ingredient: confirm the INCI name → search the Hotlist for
          that INCI name and any synonym → if found, read the full restriction
          text including any category notes → determine whether your formula
          concentration, product type, and intended user fall within the
          restriction conditions → note any required label warnings → document
          the check date.
        </p>
        <p>
          For blended ingredients — fragrance oils, botanical extract blends,
          multi-component emulsifiers — each component must be checked
          separately. The blend level concentration of the component in the
          final formula is what matters for Hotlist compliance, not the
          percentage of the blend as a whole.
        </p>
        <p>
          The Hotlist is updated periodically. A check done when you first
          formulated a product may not reflect current restrictions. Build a
          Hotlist re-check into your process whenever you change a supplier,
          change a formula, or launch a new production run after a significant
          time gap.
        </p>
      </>
    ),
    bullets: [
      "Check each ingredient by INCI name individually",
      "Search for both the primary name and any known synonyms",
      "Confirm your concentration is within the restriction limit for your product type",
      "Identify any required label warning statements triggered by the ingredient",
      "Check blended ingredient components separately at their in-formula concentration",
      "Document the check date and Hotlist version reviewed",
    ],
  },
  {
    heading: "Hotlist compliance and your CNF",
    body: (
      <>
        <p>
          The Cosmetic Notification Form ingredient section requires INCI
          names and concentrations for every ingredient. For restricted
          ingredients, the CNF should also reflect the condition of use being
          complied with — including the concentration and any applicable
          restriction. Filing a CNF with a restricted ingredient without noting
          its compliant concentration creates a record inconsistency that is
          difficult to explain if Health Canada follows up.
        </p>
        <p>
          If a formula contains a restricted ingredient and you have not
          completed a full Hotlist check, completing the CNF accurately is not
          possible. The Hotlist check and the CNF preparation are connected
          steps, not independent ones.
        </p>
      </>
    ),
  },
  {
    heading: "How FormulaNorth surfaces Hotlist context",
    body: (
      <p>
        FormulaNorth shows Hotlist status on each ingredient page —
        prohibited, restricted, or not listed — and surfaces restriction
        notes and required warning reminders inside the formula builder as
        you add ingredients. The Hotlist data view lets you browse restricted
        and prohibited ingredients directly. Always verify against the current
        Health Canada Hotlist before submitting a CNF or printing labels —
        FormulaNorth&apos;s data is a preparation aid, not the authoritative
        source.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Where does the Cosmetic Ingredient Hotlist come from?",
    answer:
      "The Hotlist is published and maintained by Health Canada. It identifies substances that are prohibited or restricted for use in cosmetics under the Cosmetic Regulations administered under the Food and Drugs Act. Health Canada updates it periodically as new safety information becomes available.",
  },
  {
    question: "How often does the Hotlist change?",
    answer:
      "Health Canada updates the Hotlist periodically — sometimes adding new restrictions, sometimes modifying existing ones. There is no fixed schedule. Always verify against the current published Hotlist on the Health Canada website before submitting a CNF or finalizing labels, especially if significant time has passed since your last check.",
  },
  {
    question: "Does a restricted ingredient mean I cannot use it?",
    answer:
      "Not necessarily. Restricted ingredients can often be used under specific conditions — a maximum concentration, a product type restriction, or a required warning statement. Read the full restriction text for the ingredient before deciding whether it fits your product. An ingredient is only non-compliant if you use it outside its permitted conditions.",
  },
  {
    question: "Does FormulaNorth maintain the official Hotlist?",
    answer:
      "FormulaNorth surfaces Hotlist context for ingredients to support your preparation work. The official source of truth is the Health Canada Cosmetic Ingredient Hotlist published on the Health Canada website, which makers should consult directly before final review and CNF submission.",
  },
  {
    question: "What happens if my product contains a prohibited ingredient?",
    answer:
      "Products containing prohibited ingredients are not compliant for sale in Canada. Reformulate before notification or launch — do not file a CNF for a product that contains a prohibited substance. If you discover a prohibited ingredient in an existing product that is already on sale, remove it from sale while you reformulate.",
  },
  {
    question: "Are US-approved colourants safe to use in Canadian cosmetics?",
    answer:
      "Not necessarily. Canada and the US have different approved colourant lists. A colourant that is FDA-approved in the US may not be approved or may be restricted under the Health Canada Cosmetic Ingredient Hotlist. Always check the Hotlist for any colourant you plan to use, especially micas with chromium oxide, ultramarines, and synthetic dyes from US suppliers.",
  },
  {
    question: "Do essential oils need a Hotlist check?",
    answer:
      "Yes. Some essential oil components appear on the Hotlist with concentration limits — coumarin, bergapten (in cold-pressed bergamot), methyl eugenol, and pulegone are among the most commonly encountered. Essential oils used at typical cosmetic fragrance levels (1–3%) are usually within limits, but verify for any essential oil used at higher concentrations or in leave-on products where skin contact time is longer.",
  },
  {
    question: "What is the difference between a Hotlist check and a safety assessment?",
    answer:
      "A Hotlist check verifies that your ingredients comply with Health Canada's specific restricted and prohibited substance list. A safety assessment is a broader evaluation of whether the product as formulated is safe for its intended use — covering potential irritants, sensitizers, stability, and microbiological safety. The Hotlist check is a minimum compliance step; a full safety assessment goes further and is recommended for products going to retail or wholesale.",
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
      dateModified="2026-07-24"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Health Canada Cosmetic Hotlist" }]}
      intro={
        <>
          <p>
            The Health Canada Cosmetic Ingredient Hotlist lists substances
            prohibited or restricted in cosmetics sold in Canada. A product
            with a prohibited ingredient cannot be sold. A product with a
            restricted ingredient used outside its permitted conditions is
            also non-compliant. Reviewing your formula against the Hotlist
            before notification or labelling is one of the most important
            pre-launch steps.
          </p>
          <p>
            This guide explains the difference between prohibited and
            restricted ingredients, which categories indie makers encounter
            most often, how leave-on vs rinse-off classification affects
            limits, and how Hotlist compliance connects to your label and
            CNF.
          </p>
          <FragranceAllergenAlert variant="compact" source="hotlist-guide" />
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "View the Hotlist data",
        href: "/ingredients/hotlist",
        description: "Browse restricted and prohibited cosmetic ingredients with concentration limits",
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
            "How Hotlist compliance connects to your CNF ingredient section.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description:
            "How Hotlist conditions show up as mandatory label warnings.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/cosmetic-ingredient-suppliers-canada",
          description: "Source ingredients with COAs and INCI documentation that supports Hotlist verification.",
        },
      ]}
    />
  );
}
