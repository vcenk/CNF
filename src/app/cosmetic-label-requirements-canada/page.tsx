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
const lastReviewed = "July 24, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What a Canadian cosmetic label must include",
    body: (
      <>
        <p>
          Canadian cosmetic labels are governed primarily by the Food and
          Drugs Act, the Cosmetic Regulations, and the Consumer Packaging and
          Labelling Act (CPLA). Together these require specific information to
          appear on every cosmetic product sold in Canada — from a 30 g lip
          balm to a 1 L shampoo. The requirements apply regardless of where
          the product is made or how small the maker is.
        </p>
        <p>
          The mandatory elements are: product identity, net quantity in metric
          units, business identity (name and address of the responsible party),
          ingredient list using INCI names in the correct order, and any
          required warnings or directions. Bilingual content — English and
          French — is required for certain elements. These must all appear on
          the label before the product is first sold.
        </p>
        <p>
          A label is not just the front sticker. It includes all written,
          printed, or graphic material on or attached to the product and its
          packaging. If something is on the box, the jar, the shrink wrap, or
          a swing tag attached to the product, it is part of the label.
        </p>
      </>
    ),
  },
  {
    heading: "Product identity and principal display panel",
    body: (
      <>
        <p>
          The principal display panel (PDP) is the part of the label most
          likely to be seen by the consumer at point of purchase — typically
          the front of the jar, tube, or box. The product identity (what the
          product is) must appear on the PDP and must be in both English and
          French.
        </p>
        <p>
          Product identity is the common or generic name for the product type:
          &quot;body lotion,&quot; &quot;face serum,&quot; &quot;shampoo bar,&quot;
          &quot;lip balm.&quot; A brand or product name is separate from the
          product identity. If your brand name is &quot;Northern Glow&quot; and
          the product is called &quot;Petal Cream,&quot; the product identity
          still needs to say something like &quot;face moisturizer / crème
          hydratante pour le visage&quot; in bilingual form.
        </p>
        <p>
          Claims on the PDP — &quot;moisturizing,&quot; &quot;softening,&quot;
          &quot;brightening&quot; — describe cosmetic function and are generally
          acceptable for products notified as cosmetics. Claims that imply a
          therapeutic effect — &quot;heals,&quot; &quot;treats,&quot;
          &quot;cures,&quot; &quot;anti-inflammatory&quot; — can move the product
          into the Drug or Natural Health Product regulatory category and must
          be avoided if you are selling as a cosmetic.
        </p>
      </>
    ),
  },
  {
    heading: "Net quantity and metric units",
    body: (
      <>
        <p>
          The net quantity of the product must appear on the principal display
          panel in metric units — grams (g) for solid or semi-solid products,
          millilitres (mL) for liquids. Imperial units are not required but may
          appear alongside metric units. Net quantity means the amount of
          product actually in the package, not the weight of the package
          itself.
        </p>
        <p>
          For solid products like cold process soap, the net quantity must
          reflect the weight at point of sale — not at time of manufacture.
          Cold process soap loses water weight during the cure period, so a
          bar cut at 130 g may weigh only 110 g after a full cure. The number
          on the label must be accurate when the consumer buys it. Most soap
          makers either cure fully before weighing and labelling, or label
          conservatively with a weight the bar reliably meets after cure.
        </p>
        <p>
          The net quantity must be in a font size legible at the standard
          viewing distance for the package size. The Consumer Packaging and
          Labelling Act specifies minimum type heights for different package
          dimensions.
        </p>
      </>
    ),
  },
  {
    heading: "Business identity — name and address",
    body: (
      <>
        <p>
          The label must identify the person responsible for the product in
          Canada — typically the manufacturer or importer. This must include
          a name and a complete mailing address. A post office box alone is
          generally not sufficient — a street address or at minimum a city
          and province should be included.
        </p>
        <p>
          For indie makers who manufacture and sell their own products, this
          means your business name and address. If you operate under a
          registered trade name, that name can appear on the label. If you
          are using a contract manufacturer, confirm whether you or the
          manufacturer is identified as the responsible party — this affects
          who files the CNF as well.
        </p>
        <p>
          Business identity must appear in both English and French on the
          label. In practice, a business name and address are typically the
          same in both languages — the bilingual requirement mainly affects
          product identity, claims, warnings, and directions.
        </p>
      </>
    ),
  },
  {
    heading: "Ingredient list and INCI ordering",
    body: (
      <>
        <p>
          The cosmetic ingredient list must use INCI (International
          Nomenclature of Cosmetic Ingredients) names — the standardized
          Latin-based naming system used internationally. Using common names,
          trade names, or botanical binomials that do not match the INCI
          standard is one of the most frequent label errors. &quot;Coconut
          oil&quot; on the marketing panel becomes &quot;Cocos Nucifera
          (Coconut) Oil&quot; on the ingredient list. &quot;Shea butter&quot;
          becomes &quot;Butyrospermum Parkii (Shea) Butter.&quot;
        </p>
        <p>
          Ingredients present at concentrations above one percent must be
          listed in descending order of concentration. Ingredients at one
          percent or below may be listed in any order after the
          above-one-percent ingredients. This means water (Aqua), which is
          almost always the highest-concentration ingredient in an emulsion,
          goes first. Colour additives may be grouped at the end of the
          ingredient list regardless of concentration.
        </p>
        <p>
          The INCI name list is the same in both English and French — INCI
          names are internationally standardized and do not need to be
          translated. The heading &quot;Ingredients&quot; may need to appear
          bilingually (&quot;Ingredients / Ingrédients&quot;) depending on
          label layout, but the ingredient names themselves do not change.
        </p>
        <p>
          Blended materials require INCI disclosure of their components, not
          just the blend trade name. A fragrance oil listed as
          &quot;Fragrance&quot; or &quot;Parfum&quot; may still need individual
          fragrance allergen components listed separately when those allergens
          are present above the threshold. A multi-component emulsifier sold
          under a trade name needs each component&apos;s INCI name on the
          label and in the CNF.
        </p>
      </>
    ),
  },
  {
    heading: "Bilingual requirements — federal and Quebec",
    body: (
      <>
        <p>
          Under the Consumer Packaging and Labelling Act, required label
          information must appear in both English and French on Canadian
          cosmetics. This applies to: product identity, net quantity
          declarations, directions for use, and required warning statements.
          The ingredient list uses INCI names and does not need to be
          translated, but the heading &quot;Ingredients&quot; and any
          directions or warnings associated with specific ingredients must
          appear bilingually.
        </p>
        <p>
          Quebec has additional French-language requirements under the Charter
          of the French Language (loi 101) and related regulations from the
          Office québécois de la langue française (OQLF). Any text on a
          product sold in Quebec must have a French version at least as
          prominent as the English. This goes beyond federal bilingual
          content rules and includes marketing copy, brand slogans, and any
          text on the label or packaging.
        </p>
        <p>
          If Quebec is any part of your market — even a small percentage of
          online orders — plan for OQLF compliance from the start. Redesigning
          packaging to add French content after printing is expensive. Build
          bilingual layout into your label design files before sending to a
          printer.
        </p>
      </>
    ),
  },
  {
    heading: "Fragrance allergen disclosure — April 2026 changes",
    body: (
      <>
        <p>
          Since April 2026, Health Canada requires specific fragrance allergens
          to be listed individually by INCI name on Canadian cosmetic labels
          when present above the disclosure threshold — 0.001% in leave-on
          products, 0.01% in rinse-off products. This applies even when
          &quot;Fragrance&quot; or &quot;Parfum&quot; is already listed.
        </p>
        <p>
          The allergen list expanded to 81 substances for new products after
          August 1, 2026. Products formulated before that date had until that
          date to update labels for the initial 24-allergen list. Both groups
          of allergens are now relevant for new products launching after
          August 2026.
        </p>
        <p>
          The most commonly encountered allergens requiring disclosure in indie
          cosmetics are: Linalool and Linalool Hydroperoxides (lavender,
          coriander, basil), Limonene and Limonene Hydroperoxides (citrus oils,
          tea tree), Citral (lemongrass, lemon myrtle, melissa), Geraniol
          (rose, palmarosa, geranium), Eugenol (clove, cinnamon, rose),
          Benzyl Alcohol (ylang ylang, some preservatives), and Isoeugenol
          (ylang ylang, clove). Any product containing essential oils needs a
          full allergen review before the label can be finalized.
        </p>
      </>
    ),
  },
  {
    heading: "Required warnings and directions",
    body: (
      <>
        <p>
          Some cosmetic products require specific warning statements or
          directions of use based on their ingredients or intended use.
          The Health Canada Cosmetic Ingredient Hotlist specifies required
          warning statements for certain restricted ingredients — for example,
          alpha-hydroxy acids at certain concentrations require sun-sensitivity
          warnings. These warnings must appear on the label when the ingredient
          is present.
        </p>
        <p>
          Products intended for use near eyes, on broken skin, or for specific
          populations (children, infants) may need appropriate directions and
          warnings. Products containing hydrogen peroxide, retinol, or other
          active ingredients at higher concentrations typically have specific
          labelling conditions.
        </p>
        <p>
          Directions for use — &quot;Apply to clean skin and massage
          gently&quot; — should be included when the product is not
          self-explanatory or when Health Canada or the Hotlist requires them
          for the product type. Directions must be bilingual.
        </p>
      </>
    ),
  },
  {
    heading: "Common label errors to avoid",
    body: (
      <>
        <p>
          <strong>Wrong INCI names.</strong> Using a supplier&apos;s trade
          name, a common name, or a name from a different nomenclature system
          instead of the correct INCI name. Resolve INCI names at formulation
          time using a verified database, not at label design time.
        </p>
        <p>
          <strong>Incorrect INCI ordering.</strong> Listing ingredients
          alphabetically, in order added, or by supplier category rather than
          by descending concentration. Above-one-percent ingredients must be
          in descending order.
        </p>
        <p>
          <strong>Inaccurate net quantity.</strong> Labelling a product with a
          weight that was measured at manufacture rather than at point of sale
          (especially relevant for cold process soap). The label weight must be
          what the consumer receives.
        </p>
        <p>
          <strong>Missing bilingual content.</strong> Only providing English
          for product identity, directions, or required warnings. French
          content must be present for all required elements.
        </p>
        <p>
          <strong>Missing fragrance allergen disclosure.</strong> Listing
          &quot;Fragrance&quot; or &quot;Parfum&quot; without the individual
          allergen INCI names when those allergens are present above the
          threshold.
        </p>
        <p>
          <strong>Drug-like claims.</strong> Using words like &quot;treats,&quot;
          &quot;heals,&quot; &quot;cures,&quot; or &quot;kills bacteria&quot;
          on a product notified as a cosmetic. These claims can reclassify the
          product as a drug and trigger a different regulatory pathway.
        </p>
      </>
    ),
  },
  {
    heading: "How to plan your label before printing",
    body: (
      <>
        <p>
          The most expensive label mistake is printing before your formula,
          INCI list, and CNF are finalized. A formula change after printing
          means a reprint. A supplier change that affects an INCI name means
          a reprint. Fragrance allergen disclosure added after printing means
          a reprint.
        </p>
        <p>
          The sequence that avoids reprints: finalize the formula → confirm
          all INCI names from supplier documentation → run a Hotlist check →
          complete a fragrance allergen review → draft bilingual label content
          → get French-language review if needed → finalize net weight after
          product is fully cured or settled → send to designer → print.
        </p>
        <p>
          Planning the label as part of the formula finalization process —
          not after — keeps the product launch timeline realistic and avoids
          the cost of label reprints before first sale.
        </p>
      </>
    ),
  },
  {
    heading: "How FormulaNorth helps with label drafting",
    body: (
      <p>
        FormulaNorth&apos;s formula builder generates an INCI-ordered
        ingredient list directly from your formula, surfaces fragrance
        allergen reminders for any essential oil or fragrance component, and
        provides a bilingual label draft so you can review content alongside
        your CNF preparation. The label draft is a starting point for your
        label design — it does not replace French-language review by a
        qualified translator or professional regulatory review.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do Canadian cosmetic labels have to be bilingual?",
    answer:
      "Required information on a Canadian cosmetic label generally must appear in both English and French under the Consumer Packaging and Labelling Act. Product identity, net quantity, directions, and required warnings are all bilingual requirements. INCI ingredient names do not need to be translated. Quebec has additional French-language requirements under the Charter of the French Language beyond the federal standard.",
  },
  {
    question: "How are ingredients listed on a cosmetic label in Canada?",
    answer:
      "Ingredients are listed using INCI names in descending order of concentration for ingredients present above one percent. Ingredients at one percent or less may appear in any order after the higher-concentration ingredients. Colour additives may be grouped at the end of the ingredient list regardless of concentration.",
  },
  {
    question: "Does a small handmade soap or body butter still need a full label?",
    answer:
      "Yes. Canadian cosmetic label requirements apply regardless of business size. Handmade soap, body butter, lotion, scrub, bath bombs, lip balm, and any other product sold to the public as a cosmetic must carry the complete required label content before first sale.",
  },
  {
    question: "What is the difference between a product name and product identity?",
    answer:
      "A product name is your brand's name for the product — for example, 'Petal Cream.' Product identity is the generic or common name for what the product is — for example, 'face moisturizer.' Product identity must appear bilingually on the principal display panel. Both can appear on the same label.",
  },
  {
    question: "How does the Hotlist affect my label?",
    answer:
      "Some ingredients on the Health Canada Cosmetic Ingredient Hotlist carry required warning statements as conditions of their permitted use. These warnings must appear on the label when the ingredient is present. Reviewing your formula against the Hotlist before designing the label avoids reprints caused by missing mandatory warnings.",
  },
  {
    question: "Do I need to list fragrance allergens individually on my label?",
    answer:
      "Yes, since April 2026. Specific fragrance allergens must be listed individually by INCI name when present above the disclosure threshold — 0.001% in leave-on products, 0.01% in rinse-off products. The list expanded to 81 allergens for new products after August 1, 2026. Any product with essential oils or fragrance blends needs an allergen review before the label is finalized.",
  },
  {
    question: "Can I use imperial units on my label?",
    answer:
      "Imperial units may appear on the label alongside metric units but cannot replace them. The net quantity must be expressed in metric — grams for solids and semi-solids, millilitres for liquids. This is required under the Consumer Packaging and Labelling Act.",
  },
  {
    question: "What claims are not allowed on a cosmetic label?",
    answer:
      "Claims that imply a therapeutic effect — 'treats,' 'heals,' 'cures,' 'kills bacteria,' 'anti-inflammatory,' 'relieves pain' — can move a product from the cosmetic regulatory category into the Drug or Natural Health Product framework. Most indie makers deliberately avoid therapeutic claims and describe what the product does cosmetically — it cleanses, softens, moisturizes — rather than what condition it treats.",
  },
  {
    question: "What address do I put on my cosmetic label?",
    answer:
      "The name and address of the manufacturer or importer responsible for the product in Canada must appear on the label. For indie makers who make and sell their own products, this is your business name and mailing address. A post office box alone is generally not considered a complete address — include city and province at minimum.",
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
      dateModified="2026-07-24"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Cosmetic Label Requirements Canada" }]}
      intro={
        <>
          <p>
            Canadian cosmetic labels must include product identity, net
            quantity in metric, business name and address, an INCI-ordered
            ingredient list, required warnings, and bilingual English and
            French content for required elements. Getting the label right
            before printing avoids reprints that push back your launch date
            and add cost.
          </p>
          <p>
            This guide covers every required label element in detail — INCI
            ordering rules, bilingual requirements, fragrance allergen
            disclosure, claims to avoid, and how to sequence label work so
            it stays aligned with your formula and CNF.
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
          "Confirm INCI names for your ingredient list before drafting your label",
      }}
      relatedLinks={[
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description:
            "What to gather for your Health Canada cosmetic notification — label content and CNF should be prepared together.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description:
            "Restricted and prohibited ingredients, some of which carry mandatory label warnings.",
        },
        {
          label: "INCI name lookup Canada",
          href: "/inci-name-lookup-canada",
          description: "Confirm the correct INCI name for any cosmetic ingredient.",
        },
        {
          label: "Starting a handmade skincare business in Canada",
          href: "/handmade-skincare-business-canada",
          description: "Full setup guide — registration, formulation, labelling, costing, and CNF in order.",
        },
      ]}
    />
  );
}
