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
const lastReviewed = "July 24, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Bath bombs are rinse-off cosmetics in Canada",
    body: (
      <>
        <p>
          Bath bombs sold to the public in Canada are regulated as rinse-off
          cosmetics under the Food and Drugs Act and the Cosmetic Regulations.
          Even though they dissolve in water and are not applied directly to
          skin in the way a lotion is, the fizzing reaction releases colour,
          fragrance, oils, and additives into bath water that contact the skin
          throughout the soak. Health Canada treats them as cosmetics.
        </p>
        <p>
          Rinse-off classification means a Cosmetic Notification Form (CNF)
          is required within 10 days of first sale. It also means your
          ingredient list, INCI naming, Hotlist review, fragrance allergen
          check, and bilingual label must all be ready before you sell — at a
          market, online, or anywhere else. The requirements are the same as
          for soap and scrub, just applied to a different product type.
        </p>
        <p>
          Bath bombs should never carry food-style claims, dessert names used
          in a way that implies the product is edible, or any drug-like claims.
          &quot;Relieves stress&quot; is a claim that can attract regulatory
          attention. &quot;Relaxing fragrance&quot; describes a sensory quality
          and is typically fine for a cosmetic.
        </p>
      </>
    ),
  },
  {
    heading: "Core bath bomb formula components",
    body: (
      <>
        <p>
          A basic bath bomb formula has four required components: a base
          (sodium bicarbonate / baking soda), an acid (citric acid), a binder
          to hold the mixture together, and additives for colour, fragrance,
          and skin benefit.
        </p>
        <p>
          <strong>Sodium Bicarbonate</strong> is the bulk base — typically
          40–60% of the formula. It provides the alkaline component of the
          fizz reaction and contributes to the skin-softening effect of the
          bath water.
        </p>
        <p>
          <strong>Citric Acid</strong> is the acid component — typically 25–35%
          of the formula. The ratio of baking soda to citric acid affects the
          fizz speed and duration. A 2:1 ratio by weight is the most common
          starting point.
        </p>
        <p>
          <strong>Binders and oils</strong> hold the mixture together and add
          skin feel. Commonly used: Butyrospermum Parkii (Shea) Butter,
          Cocos Nucifera (Coconut) Oil, Theobroma Cacao Seed Butter, sweet
          almond oil (Prunus Amygdalus Dulcis Oil), or fractionated coconut
          oil (Caprylic/Capric Triglyceride). Polysorbate 80 or Polysorbate
          20 is often added to help the oils disperse in bath water rather
          than floating — important for reducing slip risk from undispersed
          oil on the tub surface.
        </p>
        <p>
          <strong>Colourants</strong> must be cosmetic-approved. Skin-safe
          micas, cosmetic-grade lakes, and water-soluble dyes are commonly
          used. Not all colourants approved under FDA rules in the US are
          approved in Canada — check the Health Canada Cosmetic Ingredient
          Hotlist for any colourant you plan to use.
        </p>
        <p>
          <strong>Fragrance and essential oils</strong> add scent. As a
          rinse-off product, fragrance allergen disclosure applies at 0.01%
          in the finished product. Any regulated allergen present above that
          threshold must be individually listed on the label by INCI name.
        </p>
      </>
    ),
  },
  {
    heading: "Humidity — the biggest formulation challenge",
    body: (
      <>
        <p>
          The citric acid and baking soda in a bath bomb react in the
          presence of moisture — including humidity in the air. If the
          mixture absorbs ambient moisture during mixing, pressing, or
          curing, the fizz reaction begins prematurely and the finished bomb
          has reduced fizz, surface cracking, or a rough texture.
        </p>
        <p>
          Making bath bombs in humid weather (above 50–55% relative humidity)
          is genuinely difficult. Professional makers use climate-controlled
          workspaces or dehumidifiers, or schedule bath bomb production during
          dry winter months. If you are making bombs in summer in a humid
          Canadian province, plan for higher rejection rates or invest in a
          portable dehumidifier for your workspace.
        </p>
        <p>
          Once pressed, bath bombs should be wrapped tightly as soon as they
          are firm — typically within a few hours of pressing. Shrink wrap,
          cling film, or sealed cellophane bags all work. Storing unwrapped
          bombs in a humid environment will cause them to soften, crack, and
          partially react before the customer even opens them.
        </p>
        <p>
          Cornstarch (Zea Mays Starch) added at 2–5% can help absorb ambient
          moisture during mixing. Some makers add a small amount of SLSA
          (Sodium Lauryl Sulfoacetate) for additional foaming; this needs to
          be noted in the INCI list and checked against the Hotlist.
        </p>
      </>
    ),
  },
  {
    heading: "Colourants, glitter, and inclusions",
    body: (
      <>
        <p>
          Colourants in bath bombs need to be specifically rated for cosmetic
          use — not food colouring, candle dye, or craft supplies. Skin-safe
          micas are the most common choice. Cosmetic-grade water-soluble dyes
          are used for vivid bath water colour effects. Lakes and oxides are
          used for more muted, mixed colours.
        </p>
        <p>
          All colourants must be checked against the Health Canada Cosmetic
          Ingredient Hotlist. Not every FDA-approved US colourant is approved
          in Canada. Micas with chromium oxide green or manganese violet
          components, certain ultramarines, and some synthetic dyes require
          specific Hotlist verification. When sourcing colourants from US
          suppliers, confirm Canadian compliance before purchasing.
        </p>
        <p>
          Glitter has become a contentious inclusion. Plastic glitter is
          a microplastic and is increasingly restricted in various markets.
          Many Canadian makers have switched to biodegradable glitter made
          from plant cellulose or mica-based flakes. If you use glitter,
          ensure it is rated for cosmetic use and check whether your retail
          partners have policies on plastic glitter — many do.
        </p>
        <p>
          Inclusions like dried flowers, herbs, and botanical pieces add
          visual appeal but have practical downsides. Dried plant material
          can stick to the skin and bathtub, may cause reactions in sensitive
          users, and raises questions about whether the botanical itself
          needs INCI documentation. If the botanical is purely decorative
          and not formulated into the product, the labelling approach differs
          from an extracted botanical. Confirm your intended use with a
          regulatory perspective before launching.
        </p>
      </>
    ),
  },
  {
    heading: "Bath bomb label requirements",
    body: (
      <>
        <p>
          Every bath bomb requires a cosmetic label with: product identity in
          English and French (&quot;bath bomb / bombe de bain&quot;), net
          quantity in grams on the principal display panel, business name and
          address, INCI-ordered ingredient list, and any required warnings.
          Bilingual requirements apply to all mandatory content.
        </p>
        <p>
          For bath bombs, a bathtub slip warning is standard practice and
          considered good customer safety communication — oils released into
          bath water make surfaces slippery. Many makers include &quot;Caution:
          surfaces may become slippery / Attention: les surfaces peuvent
          devenir glissantes&quot; on their labels even when it is not strictly
          mandated by the Hotlist.
        </p>
        <p>
          Fragrance allergen disclosure applies at the rinse-off threshold of
          0.01% in the finished product. Common allergens in bath bomb
          fragrances include Linalool (lavender), Limonene (citrus),
          Geraniol (rose, palmarosa), and Citral (lemongrass). Calculate the
          final concentration of each allergen based on the percentage of
          essential oil or fragrance oil in the formula and the allergen&apos;s
          concentration within that oil.
        </p>
        <p>
          Each distinct bath bomb variant — different colour, fragrance, or
          formula — requires its own CNF. A lavender bath bomb and a rose bath
          bomb from the same base are two separate products if the fragrance
          or colourant ingredients differ.
        </p>
      </>
    ),
  },
  {
    heading: "Costing bath bombs honestly",
    body: (
      <>
        <p>
          Bath bombs have a reputation for being cheap to produce, but the
          true cost per sellable unit is higher than the ingredient list
          suggests. Rejection rate is a significant cost factor — bombs that
          crack, soften, or react prematurely during production or storage
          cannot be sold. Budget a spoilage and rejection rate of 5–15%
          depending on your production conditions, especially in humid months.
        </p>
        <p>
          Packaging cost is often underestimated. Shrink wrap, cello bags,
          twist ties, labels, and boxes all add to unit cost. Bath bombs are
          also fragile in transit — protective packaging for shipping (bubble
          wrap, tissue, padded mailers) adds further cost per online order.
        </p>
        <p>
          Full cost of goods for a bath bomb should include: citric acid and
          baking soda at batch weight, oils and butters, fragrance, colourant,
          polysorbate, packaging (wrap, label, box if applicable), inbound
          shipping allocated per unit, rejection allowance, direct labour for
          pressing and wrapping, and overhead. With all of these included,
          most bath bombs have a true unit cost of $1.50–$4.00 depending on
          size, complexity, and inclusions. Retail prices of $6–12 per bomb
          are typical for Canadian indie makers at this cost level.
        </p>
      </>
    ),
  },
  {
    heading: "CNF preparation for bath bombs",
    body: (
      <>
        <p>
          Each distinct bath bomb product requires a Cosmetic Notification
          Form filed within 10 days of first sale. For bath bombs, the CNF
          captures: company identity, product name, rinse-off classification,
          intended use (bath product, body cleanser, or similar), and the full
          ingredient list with INCI names and concentrations.
        </p>
        <p>
          The most common gap in bath bomb CNF preparation is colourant INCI
          documentation. Makers often know a colourant as a supplier trade
          name or shade name — &quot;Electric Blue Mica,&quot; &quot;Rose
          Gold Pearl&quot; — rather than by its INCI name. The INCI name is
          what goes in the CNF. Request INCI names for all colourants from
          your supplier before filing.
        </p>
        <p>
          For fragrance oils, the full component INCI breakdown is required,
          not just &quot;Fragrance&quot; or &quot;Parfum.&quot; If you use
          essential oils individually, each oil&apos;s INCI name is known, but
          if you use a blended fragrance oil, you need the full component list
          from your fragrance supplier.
        </p>
      </>
    ),
  },
  {
    heading: "Selling bath bombs at markets and online in Canada",
    body: (
      <>
        <p>
          Bath bombs are one of the best-selling products at Canadian farmers
          markets and craft fairs — they are visually appealing, accessible
          in price, and easy to gift. Market display should keep bombs away
          from direct sun and heat, which can soften or activate them. Use a
          display case or covered tray in very warm conditions.
        </p>
        <p>
          Online shipping requires careful packaging. Each bomb should be
          individually wrapped and cushioned. Fragile items in Canada Post
          parcels benefit from double-boxing or rigid outer packaging. Include
          a note about keeping the product in a cool, dry place before use.
          Summer shipping to hot regions (southern Ontario in July, BC interior
          in August) may result in softened bombs on arrival — set expectations
          in your shipping policy.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Are bath bombs cosmetics or something else in Canada?",
    answer:
      "Bath bombs sold to the public are regulated as rinse-off cosmetics in Canada. They are not food, and food-style claims or dessert-inspired names that imply edibility should be avoided. A Cosmetic Notification Form, INCI-ordered label, and bilingual content are all required before first sale.",
  },
  {
    question: "Do bath bombs need a Cosmetic Notification Form?",
    answer:
      "Yes. Bath bombs sold to the public in Canada are expected to be notified to Health Canada within 10 days of first sale. Each distinct variant — different fragrance, colourant, or formula — is a separate product requiring its own CNF.",
  },
  {
    question: "Can I use any colour or glitter in my bath bombs?",
    answer:
      "Colourants must be approved for cosmetic use and checked against the Health Canada Cosmetic Ingredient Hotlist. Not all FDA-approved US colourants are approved in Canada. Plastic glitter is a microplastic increasingly avoided by retailers and some markets — biodegradable alternatives are widely available and better received.",
  },
  {
    question: "How do I keep my bath bombs from cracking or expanding in storage?",
    answer:
      "Humidity is the primary cause of premature reaction, cracking, and softening. Mix and press bombs in a dry environment (under 50% relative humidity). Wrap each bomb tightly as soon as it is firm — within a few hours of pressing. Store wrapped bombs in a sealed container away from moisture. A portable dehumidifier in your workspace helps significantly in humid Canadian summers.",
  },
  {
    question: "Do I need a preservative in bath bombs?",
    answer:
      "An anhydrous bath bomb — no water, hydrosols, or water-based extracts in the formula — does not require a broad-spectrum preservative. The citric acid and baking soda are self-limiting for microbial growth in a dry formula. If you add aloe gel, water, or any water-based ingredient, preservation becomes necessary.",
  },
  {
    question: "What fragrance allergens need to be disclosed on a bath bomb label?",
    answer:
      "Bath bombs are rinse-off products, so the fragrance allergen disclosure threshold is 0.01% in the finished product. Any regulated allergen present above that level must be listed individually by INCI name. Common ones in bath bomb fragrances include Linalool, Limonene, Geraniol, Citral, and Eugenol from essential oils.",
  },
  {
    question: "How should I price bath bombs for retail and wholesale?",
    answer:
      "Build a full cost per sellable unit — including rejection allowance, packaging, shipping, labour, and overhead. Most bath bombs with fragrance, colour, and attractive packaging have a true unit cost of $1.50–$4.00 depending on size and complexity. Retail of $6–12 per bomb is typical for Canadian indie makers at this cost level. Wholesale requires at least 2× markup over unit cost.",
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
      dateModified="2026-07-24"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Sell Bath Bombs Canada" }]}
      intro={
        <>
          <p>
            Bath bombs are one of the most popular indie cosmetic products at
            Canadian markets and in online shops. They are also one of the most
            technically finicky to produce consistently — humidity, colourant
            compliance, and fragrance allergen disclosure catch many makers
            off guard. This guide covers formulation, stability, labelling,
            costing, and CNF preparation so you can launch with fewer surprises.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start a bath bomb formula",
        href: "/formulas",
        description: "Save your recipe with INCI names, cost per unit, and label draft",
      }}
      relatedLinks={[
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, and fragrance allergen disclosure rules.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check colourants, fragrance components, and additives against Health Canada restrictions.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to prepare before notifying Health Canada about your bath bombs.",
        },
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Body butter formulation, leave-on label requirements, and costing.",
        },
        {
          label: "Sell sugar scrub in Canada",
          href: "/sell-sugar-scrub-canada",
          description: "Scrub-specific formulation, rinse-off label notes, and CNF prep.",
        },
      ]}
    />
  );
}
