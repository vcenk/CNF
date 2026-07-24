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
const lastReviewed = "July 24, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Body butter is a leave-on cosmetic in Canada",
    body: (
      <>
        <p>
          Whipped, anhydrous, or emulsified body butters sold to the public
          in Canada are regulated as leave-on cosmetics under the Food and
          Drugs Act and the Cosmetic Regulations. That means every jar of body
          butter you sell needs a complete INCI-ordered ingredient list, a
          bilingual label, and a Cosmetic Notification Form (CNF) filed with
          Health Canada within 10 days of first sale.
        </p>
        <p>
          Leave-on classification has specific implications beyond just
          requiring a label. Fragrance allergen disclosure thresholds are
          lower for leave-on products (0.001% versus 0.01% in rinse-off), and
          some Cosmetic Ingredient Hotlist restrictions have stricter
          concentration limits for leave-on use. Confirming your formula
          against both requirements before launch avoids reprints and
          reformulation after the fact.
        </p>
      </>
    ),
  },
  {
    heading: "Types of body butter and formulation considerations",
    body: (
      <>
        <p>
          <strong>Anhydrous body butter</strong> contains no water phase —
          just butters, oils, and optionally waxes, fragrance, and
          oil-soluble additives. This is the most common type for indie makers
          because it does not require a broad-spectrum preservative (no water
          means no microbial growth medium), it is straightforward to make,
          and it has a longer shelf life if stored away from moisture.
          Antioxidants like Vitamin E (Tocopherol) or rosemary extract help
          slow oxidative rancidity in the oils.
        </p>
        <p>
          <strong>Whipped body butter</strong> is typically an anhydrous
          formula whipped to incorporate air — creating a lighter, fluffier
          texture from the same base ingredients. The formulation and
          regulatory requirements are identical to anhydrous body butter.
          The main practical challenge is that whipped texture can deflate or
          separate in heat, which matters for summer shipping and market
          display in warm conditions.
        </p>
        <p>
          <strong>Emulsified body butter</strong> contains both a water phase
          and an oil phase combined with an emulsifier. The result is a richer
          texture than a standard lotion but lighter than a pure butter.
          Emulsified body butter absolutely requires a broad-spectrum
          preservative — water activity supports microbial growth, and an
          unpreserved emulsion can develop contamination within days.
          Preservation and challenge testing before launch is strongly
          recommended for any water-containing formula.
        </p>
      </>
    ),
  },
  {
    heading: "Choosing butters and oils",
    body: (
      <>
        <p>
          The base butter determines much of the texture and skin-feel profile.
          Shea butter (Butyrospermum Parkii Butter) is the most common
          foundation — it is solid at room temperature, melts at body
          temperature, and has good skin compatibility. Mango butter (Mangifera
          Indica Seed Butter) is harder than shea and adds a non-greasy feel.
          Cocoa butter (Theobroma Cacao Seed Butter) is the hardest common
          butter and makes a firmer product; deodorized versions eliminate the
          chocolate scent if that is undesirable.
        </p>
        <p>
          Liquid oils soften the formula and affect absorption feel. Jojoba
          (Simmondsia Chinensis Seed Oil) is technically a wax ester and is
          extremely stable — excellent for shelf life. Fractionated coconut oil
          (Caprylic/Capric Triglyceride) is light, odourless, and very stable.
          Argan oil, rosehip oil, and marula oil add skin-benefit positioning
          but are more expensive and have shorter shelf lives, making them
          better as small-percentage additions than as base oils.
        </p>
        <p>
          A typical anhydrous body butter is 60–80% butters and 20–40% liquid
          oils. Adjusting the ratio changes the firmness and melting point.
          Bodies that sit near windows, in parcel boxes in summer heat, or on
          market tables in warm weather need a formula that stays stable — test
          your formula at 35–40°C before committing to packaging.
        </p>
      </>
    ),
  },
  {
    heading: "Stability and shelf life",
    body: (
      <>
        <p>
          Anhydrous body butter does not have a microbial stability concern,
          but it does have an oxidative stability concern. Oils and butters go
          rancid over time when exposed to heat, light, and oxygen.
          Antioxidants (Tocopherol at 0.1–0.5%, rosemary extract) extend shelf
          life. Packaging in opaque or dark containers protects against
          light-induced oxidation. A reasonable shelf life for a well-formulated
          anhydrous body butter is 12–18 months from manufacture when stored
          properly.
        </p>
        <p>
          Heat stability is a practical concern for shipping and display.
          Whipped and soft anhydrous body butters can soften or separate above
          30°C. Test your formula in a warm oven at 35°C for 48 hours and
          observe whether it separates or significantly changes texture. If it
          fails heat stability, consider adding a small percentage of beeswax
          (Cera Alba) or candelilla wax (Euphorbia Cerifera Cera) to raise the
          melting point.
        </p>
      </>
    ),
  },
  {
    heading: "Body butter label requirements",
    body: (
      <>
        <p>
          The label on a body butter must include: product identity in English
          and French (for example, &quot;body butter / beurre corporel&quot;),
          net quantity in grams on the principal display panel, business name
          and address, INCI-ordered ingredient list, and any required warnings.
          As a leave-on product, fragrance allergen disclosure applies at the
          lower 0.001% threshold — lower than rinse-off products.
        </p>
        <p>
          Fragrance allergens from essential oils or fragrance blends that are
          present above 0.001% in the finished product must be listed
          individually by INCI name. Common allergens in body butter
          fragrances include Linalool (lavender, coriander), Limonene (citrus),
          Geraniol (rose, palmarosa), Citral (lemongrass, lemon myrtle), and
          Eugenol (clove, cinnamon). A fragrance allergen review should be part
          of label preparation for any scented body butter.
        </p>
        <p>
          If your body butter contains a restricted ingredient from the
          Hotlist — for example, a vitamin A derivative above the leave-on
          limit, or an AHA above the threshold — the applicable required warning
          must appear on the label. Check the Hotlist before designing labels.
        </p>
      </>
    ),
  },
  {
    heading: "Costing body butter accurately",
    body: (
      <>
        <p>
          Body butter is a concentrated product — higher per-gram ingredient
          cost than most lotions because it is not diluted with water. Costing
          should capture: butter and oil cost per gram at your batch weight,
          fragrance or essential oil cost, jar cost, lid cost, label cost,
          inbound shipping allocated per unit, spoilage allowance, direct
          labour for mixing, filling, and labelling, and overhead.
        </p>
        <p>
          Jar cost is a significant portion of body butter unit cost and varies
          significantly by supplier, material, and quantity. Glass jars cost
          more than PET plastic; 60 ml jars often cost more per unit than
          120 ml jars when buying in similar quantities. Building your costing
          model so it reflects your actual jar cost at your actual order
          quantity gives you a realistic number for pricing decisions.
        </p>
        <p>
          Retail pricing for indie body butter typically runs 4–5× cost of
          goods. If your fully-costed unit is $4.00, retail is realistically
          $18–22 depending on your market positioning. Wholesale requires a
          minimum 2× markup over cost of goods so that when a retailer takes
          their margin, you can still cover your costs. If the math does not
          work at those multiples, revisit your ingredient or packaging costs
          before concluding the market will not support the price.
        </p>
      </>
    ),
  },
  {
    heading: "CNF preparation for body butter",
    body: (
      <>
        <p>
          Each body butter SKU requires its own Cosmetic Notification Form.
          A lavender body butter and an unscented body butter are two separate
          notifications even if the base formula is identical. The CNF requires
          company identity, product name, product category (leave-on skin care),
          product function (moisturizer, body butter), the full ingredient list
          with INCI names and concentrations, and label content.
        </p>
        <p>
          For body butter CNF preparation, the ingredient section is usually
          straightforward for anhydrous formulas — fewer ingredients than an
          emulsion, no preservative system to document, and no water activity
          concerns. The most common gap in body butter CNF prep is the
          fragrance oil component breakdown — if you use a fragrance oil,
          you need the full INCI disclosure from your supplier, not just
          &quot;Fragrance&quot; as a single line item.
        </p>
        <p>
          Prepare the CNF before your first sale, not after. The 10-day
          window from first sale is short, and having your INCI names and
          concentrations already organized means the filing takes minutes
          rather than hours.
        </p>
      </>
    ),
  },
  {
    heading: "Packaging and shipping considerations",
    body: (
      <>
        <p>
          Body butter packaging needs to protect against heat, contamination,
          and moisture ingress. Wide-mouth jars are practical for scooping;
          pump or squeeze packaging works for softer formulas. Glass adds
          perceived value but increases shipping weight and breakage risk.
          PET and PP plastic are lighter and more break-resistant for markets
          and shipping.
        </p>
        <p>
          Shipping body butter in Canadian summers requires heat consideration.
          Include a note on your shipping policy about warm weather, use
          insulated mailers where practical, and avoid shipping on Fridays if
          the package will sit in a warehouse or postal facility over a hot
          weekend. Including a &quot;product may soften in transit&quot; note
          on your packaging or order confirmation manages customer expectations
          without undermining product quality perception.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Does my body butter need a Cosmetic Notification Form?",
    answer:
      "Body butter sold to the public in Canada is generally treated as a leave-on cosmetic and is expected to have a CNF filed with Health Canada within 10 days of first sale. This applies whether you sell at markets, online, or wholesale. Confirm against current Health Canada guidance for your specific product.",
  },
  {
    question: "Do I need a preservative in my body butter?",
    answer:
      "Anhydrous body butter — containing no water, hydrosols, aloe, or water-based extracts — does not require a broad-spectrum preservative because there is no water activity to support microbial growth. Adding antioxidants (Vitamin E, rosemary extract) helps slow rancidity. If your body butter contains any water phase, a broad-spectrum preservative is required and preservation efficacy testing is strongly recommended.",
  },
  {
    question: "How should I price body butter for wholesale and retail?",
    answer:
      "Build a fully-costed unit price including ingredients, packaging, shipping, breakage, labour, and overhead. Retail pricing for indie body butter typically runs 4–5× cost of goods. Wholesale requires at least 2× markup over cost of goods so there is room for the retailer's margin. If the math does not work, revisit ingredient and packaging costs before assuming the market will not support the price.",
  },
  {
    question: "What fragrance allergens need to be disclosed in body butter?",
    answer:
      "Body butter is a leave-on product, so the fragrance allergen disclosure threshold is 0.001% — lower than for rinse-off products. Any regulated allergen present above 0.001% in the finished product must be listed individually by INCI name on the label. Common ones in body butter fragrances include Linalool, Limonene, Geraniol, Citral, and Eugenol from essential oils.",
  },
  {
    question: "Can I ship body butter across Canada in summer?",
    answer:
      "Yes, but heat management matters. Anhydrous body butter softens above 30°C and whipped formulas can deflate or separate. Use insulated mailers during warm months, avoid shipping late in the week when parcels may sit over a hot weekend, and include a note about potential softening in transit. Test your formula at 35–40°C before committing to packaging.",
  },
  {
    question: "Are essential oils restricted in Canadian body butter?",
    answer:
      "Some essential oil components appear on the Health Canada Cosmetic Ingredient Hotlist with concentration limits — including coumarin, bergapten (in cold-pressed bergamot), methyl eugenol, and pulegone. Always check your essential oils against the current Hotlist before launch. The leave-on classification means restrictions are typically stricter than for rinse-off products.",
  },
  {
    question: "What is the shelf life of handmade body butter?",
    answer:
      "A well-formulated anhydrous body butter stored away from heat, light, and moisture typically has a shelf life of 12–18 months from manufacture. Use antioxidants to slow oxidative rancidity. Date each batch and rotate stock. If the butter smells rancid or develops an off-colour, do not sell it.",
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
      dateModified="2026-07-24"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Body Butter Canada" }]}
      intro={
        <>
          <p>
            Body butter is one of the most popular indie cosmetic products in
            Canada — and one of the more forgiving to formulate. This guide
            covers the types of body butter, formulation and stability
            considerations, leave-on label requirements including fragrance
            allergen disclosure, accurate costing, CNF preparation, and
            practical packaging and shipping notes.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a body butter formula",
        href: "/formulas",
        description: "Save your recipe with INCI names, cost per jar, and label draft in one place",
      }}
      relatedLinks={[
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, fragrance allergen disclosure, and net quantity rules.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to prepare before notifying Health Canada about your body butter.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check butters, oils, and fragrance components against Health Canada restrictions.",
        },
        {
          label: "How to sell handmade soap in Canada",
          href: "/how-to-sell-handmade-soap-in-canada",
          description: "Soap-specific guidance with overlapping label and CNF notes.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/cosmetic-ingredient-suppliers-canada",
          description: "Find Canadian suppliers for shea, mango, and cocoa butter with COA documentation.",
        },
      ]}
    />
  );
}
