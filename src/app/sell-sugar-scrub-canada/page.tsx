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
const lastReviewed = "July 24, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Sugar scrubs are rinse-off cosmetics in Canada",
    body: (
      <>
        <p>
          Sugar scrubs, salt scrubs, and emulsified scrubs sold to the public
          in Canada are regulated as rinse-off cosmetics under the Food and
          Drugs Act and the Cosmetic Regulations. The rinse-off classification
          affects which Cosmetic Ingredient Hotlist concentration limits apply
          and sets the fragrance allergen disclosure threshold at 0.01%
          rather than the lower 0.001% threshold for leave-on products.
        </p>
        <p>
          Before your first sale — at a market, online, or to a wholesale
          buyer — you need a CNF filed within 10 days, a complete INCI-ordered
          bilingual label, and every ingredient checked against the Health
          Canada Hotlist. The requirements apply regardless of business size
          or sales volume.
        </p>
      </>
    ),
  },
  {
    heading: "Types of body scrub and their formulation differences",
    body: (
      <>
        <p>
          <strong>Anhydrous oil-and-sugar scrub</strong> is the most common
          indie format: granulated sugar or salt suspended in a carrier oil
          base, optionally with butters, fragrance, and colourant. No water
          phase means no preservative requirement (though antioxidants extend
          shelf life). Simple to formulate, stable, and popular at markets.
          The main practical challenge is oil separation over time as sugar
          sinks — choosing the right oil viscosity and adding a small amount
          of beeswax or a viscosity modifier can help stabilize the suspension.
        </p>
        <p>
          <strong>Emulsified sugar scrub</strong> contains an emulsifier that
          allows the product to rinse cleanly from the skin without leaving
          an oily residue — appealing to consumers who dislike the greasy
          feel of oil-based scrubs. The emulsifier (commonly BTMS-50, Olivem
          300, or Polysorbate 80) creates a different texture and rinse-off
          profile. Emulsified scrubs that contain a water phase require a
          broad-spectrum preservative and challenge testing. Emulsified scrubs
          without a water phase (oil-and-emulsifier only) do not.
        </p>
        <p>
          <strong>Whipped sugar scrub</strong> is typically an anhydrous
          formula with a lighter, whipped texture created by incorporating air
          into the oil and butter base. Formulation and regulatory requirements
          are identical to standard anhydrous scrubs. Temperature sensitivity
          is the main practical concern — whipped texture can melt and
          deflate in summer heat.
        </p>
      </>
    ),
  },
  {
    heading: "Choosing your exfoliant",
    body: (
      <>
        <p>
          <strong>Sugar</strong> (Sucrose) is the most common exfoliant for
          body scrubs. It dissolves in water, so it leaves no grit in the
          shower or bathtub, and the particle size is consistent from standard
          granulated sugar. Fine caster sugar gives a gentler scrub; coarse
          raw sugar or turbinado gives more aggressive exfoliation. Sugar
          softens and partially dissolves during use, which makes it more
          forgiving on skin than salt.
        </p>
        <p>
          <strong>Salt</strong> (Sodium Chloride) gives a sharper, more
          intense exfoliation. Dead sea salt and himalayan pink salt are
          popular choices for their mineral content positioning. Salt scrubs
          should not be used on broken skin or immediately after shaving —
          this is worth including on your label as a direction for use. Salt
          dissolves more slowly than sugar and can feel harsher on sensitive
          skin.
        </p>
        <p>
          <strong>Alternative exfoliants</strong> used in Canadian indie
          scrubs include: pumice (Pumice) for foot scrubs, ground walnut
          shell (Juglans Regia Shell Powder), apricot seed powder (Prunus
          Armeniaca Seed Powder), and ground oat (Avena Sativa Kernel Flour).
          Note that plastic microbeads are prohibited in rinse-off cosmetics
          in Canada under the Microbeads in Toiletries Regulations — do not
          use plastic microbeads in any scrub product.
        </p>
      </>
    ),
  },
  {
    heading: "Carrier oils and base selection",
    body: (
      <>
        <p>
          The carrier oil in a sugar scrub affects skin feel, shelf life, and
          price point. High-oleic oils (sweet almond, sunflower high-oleic,
          avocado) are light and absorb well. Coconut oil gives a firmer
          texture at room temperature and a familiar skin feel. Jojoba
          (technically a liquid wax — Simmondsia Chinensis Seed Oil) is
          extremely stable and has a long shelf life. Rosehip and marula oils
          add skin-benefit positioning but are more expensive with shorter
          shelf lives — better as small-percentage additions than as base oils.
        </p>
        <p>
          Vitamin E (Tocopherol) at 0.1–0.5% acts as an antioxidant and
          extends the shelf life of oils prone to rancidity. It is not a
          preservative — it does not prevent microbial growth in water-phase
          formulas — but it meaningfully extends the oxidative shelf life of
          oil-based scrubs.
        </p>
        <p>
          Butters (shea, mango, cocoa) can be added to anhydrous scrubs for
          richness and skin-feel. At low percentages (5–15%) they add
          emollience without making the formula too hard or greasy.
        </p>
      </>
    ),
  },
  {
    heading: "Slip and safety considerations",
    body: (
      <>
        <p>
          Oils released into the shower or bathtub from a scrub make surfaces
          slippery. This is the most important safety consideration for body
          scrubs and should be addressed on your label. A slip warning in
          English and French is standard practice: &quot;Caution: may cause
          slippery surfaces / Attention: peut rendre les surfaces
          glissantes.&quot; Many makers add this even where it is not strictly
          required by the Hotlist, because it directly protects customers.
        </p>
        <p>
          Emulsified scrubs with a good emulsifier system reduce oil on shower
          surfaces because the oils rinse away more completely. If you are
          marketing to older customers or positioning your scrub for
          accessibility, an emulsified formula with less slip risk may be worth
          the additional formulation complexity.
        </p>
      </>
    ),
  },
  {
    heading: "Sugar scrub label requirements",
    body: (
      <>
        <p>
          A sugar scrub label must include: product identity in English and
          French (for example, &quot;body scrub / gommage corporel&quot;), net
          quantity in grams or millilitres depending on product form, business
          name and address, INCI-ordered ingredient list, and any required
          warnings or directions. All mandatory content must be bilingual.
        </p>
        <p>
          The INCI name for granulated sugar is Sucrose. Table salt is Sodium
          Chloride. Each carrier oil, butter, fragrance component, and
          colourant needs its correct INCI name. Supplier trade names or
          common names on the ingredient list are not compliant.
        </p>
        <p>
          Fragrance allergen disclosure applies at the rinse-off threshold of
          0.01%. Essential oils commonly used in scrubs — lavender, citrus
          oils, peppermint — contain regulated allergens. Calculate the
          in-formula concentration of each allergen and disclose those above
          threshold by INCI name. A fragrance allergen review should be part
          of label preparation for any scented scrub.
        </p>
        <p>
          Net quantity for a sugar scrub is typically expressed in grams (g)
          or millilitres (mL) depending on whether the product is measured by
          weight or volume. Most makers use grams. The net quantity must be
          accurate at point of sale and appear on the principal display panel.
        </p>
      </>
    ),
  },
  {
    heading: "Costing sugar scrub accurately",
    body: (
      <>
        <p>
          Sugar scrubs are often underpriced because sugar is cheap and makers
          forget to include the cost of everything else. The carrier oils,
          butters, fragrance, colourant, and packaging typically cost more than
          the sugar itself. A full cost of goods calculation includes: exfoliant
          cost, carrier oil and butter cost, fragrance or essential oil cost,
          preservative cost (for emulsified versions), colourant, jar, lid,
          label, inbound shipping allocated per unit, spoilage allowance,
          direct labour, and overhead.
        </p>
        <p>
          Jar cost is a major variable. A 250 mL glass jar with lid costs
          meaningfully more than the same size in PET plastic, and ordering
          in larger quantities reduces per-unit cost. Build your costing model
          around your actual jar cost at your actual order quantity — not the
          best-case scenario of buying 1000 jars when you currently buy 50.
        </p>
        <p>
          Retail pricing for indie body scrubs in Canada typically runs
          $16–28 for a 250–350 g jar depending on positioning and
          ingredients. If your fully-costed unit is $5–7, retail at $18–22
          gives you a realistic 3–4× markup. Wholesale requires at least 2×
          markup over cost so the retailer can take their margin. If your
          unit cost makes these price points uncompetitive, revisit packaging
          and oil choices before concluding the market will not support the
          price.
        </p>
      </>
    ),
  },
  {
    heading: "CNF preparation for sugar scrub",
    body: (
      <>
        <p>
          Each distinct sugar scrub product requires its own Cosmetic
          Notification Form filed within 10 days of first sale. A lavender
          sugar scrub and a citrus sugar scrub are two separate products if
          the fragrance or colourant ingredients differ. The CNF captures:
          company identity, product name, rinse-off classification, intended
          use (body exfoliator, body scrub), and the full ingredient list
          with INCI names and concentrations.
        </p>
        <p>
          Common CNF preparation gaps for scrubs: colourant INCI names
          (suppliers often use shade trade names rather than INCI names —
          request the INCI before ordering), and fragrance oil component
          breakdown (you need the full INCI component list from your
          fragrance supplier, not just &quot;Fragrance&quot; as a line item).
        </p>
        <p>
          Prepare CNF information as part of formula finalization — not after
          first sale. Having your INCI list and concentrations organized in
          advance means the filing takes minutes. Leaving it until after the
          first sale and then scrambling to gather INCI names and fragrance
          component lists is the most common reason CNFs are filed late.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Are sugar scrubs leave-on or rinse-off cosmetics?",
    answer:
      "Body scrubs are applied and rinsed off in the shower, making them rinse-off cosmetics. The rinse-off classification matters because some Cosmetic Ingredient Hotlist concentration limits and the fragrance allergen disclosure threshold (0.01% for rinse-off, versus 0.001% for leave-on) are different from leave-on products.",
  },
  {
    question: "Do sugar scrubs need preservatives?",
    answer:
      "An oil-and-sugar anhydrous scrub with no water phase does not require a broad-spectrum preservative because there is no water activity to support microbial growth. Antioxidants (Vitamin E, rosemary extract) help slow rancidity in the oils. Emulsified scrubs containing a water phase require a broad-spectrum preservative and preservation efficacy testing.",
  },
  {
    question: "Do I need to file a CNF for sugar scrub?",
    answer:
      "Yes. Sugar scrub sold to the public in Canada is treated as a cosmetic and is generally expected to be notified to Health Canada within 10 days of first sale. Each distinct product variant with a different formula is a separate CNF.",
  },
  {
    question: "Can I use plastic microbeads in my scrub?",
    answer:
      "No. Plastic microbeads are prohibited in rinse-off cosmetics in Canada under the Microbeads in Toiletries Regulations. Sugar, salt, pumice, ground apricot seed, oat flour, and biodegradable cellulose particles are all compliant alternatives.",
  },
  {
    question: "Should my scrub label include a slip warning?",
    answer:
      "Yes — including a bilingual slip warning is standard practice and strongly recommended. Oils released into the shower make surfaces slippery. The warning 'Caution: may cause slippery surfaces / Attention: peut rendre les surfaces glissantes' manages customer safety and reduces liability regardless of whether it is specifically required by the Hotlist for your ingredients.",
  },
  {
    question: "What is the INCI name for sugar in a scrub?",
    answer:
      "Granulated sugar is listed as Sucrose on the INCI ingredient list. Table salt is Sodium Chloride. Dead sea salt is also listed as Sodium Chloride (the mineral marketing name is not the INCI name). Each carrier oil, butter, and fragrance component needs its own correct INCI name on the label and in the CNF.",
  },
  {
    question: "How do I price sugar scrub for retail and wholesale?",
    answer:
      "Build a full cost per jar — exfoliant, oils, butters, fragrance, colourant, jar, lid, label, shipping, labour, overhead. Retail for a 250–350 g indie scrub in Canada typically runs $16–28 depending on ingredients and positioning. Wholesale requires at least 2× markup over cost of goods. If the math does not work, revisit packaging and oil choices before reducing your margin.",
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
      dateModified="2026-07-24"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Sugar Scrub Canada" }]}
      intro={
        <>
          <p>
            Sugar scrub is a high-margin indie cosmetic product when formulated,
            labelled, and costed correctly. This guide covers the three scrub
            types, exfoliant and oil selection, slip safety, Canadian rinse-off
            label requirements including fragrance allergen disclosure, accurate
            costing, and what to prepare for your CNF before first sale.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a sugar scrub formula",
        href: "/formulas",
        description: "Save your recipe with INCI names, cost per jar, and label draft",
      }}
      relatedLinks={[
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, fragrance allergen disclosure, and net quantity.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check oils, exfoliants, colourants, and fragrance components against restrictions.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to prepare before notifying Health Canada about your scrub.",
        },
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Body butter formulation, leave-on label requirements, and costing.",
        },
        {
          label: "Sell bath bombs in Canada",
          href: "/sell-bath-bombs-canada",
          description: "Bath bomb formulation, colourant compliance, and CNF prep.",
        },
      ]}
    />
  );
}
