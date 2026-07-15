import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/how-to-sell-handmade-soap-in-canada";
const title = "How to Sell Handmade Soap in Canada";
const description =
  "A practical guide for Canadian soap makers — when soap is regulated as a cosmetic, what your label needs, how to cost a batch correctly, and how to prepare a Cosmetic Notification Form before your first sale.";
const lastReviewed = "July 14, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "When handmade soap is regulated as a cosmetic in Canada",
    body: (
      <>
        <p>
          Most cold process, hot process, and melt-and-pour soap sold to the
          public in Canada is regulated as a cosmetic under the Food and Drugs
          Act and the Cosmetics Regulations administered by Health Canada. A
          plain cleansing bar with no medicinal or therapeutic claims is almost
          always in this category.
        </p>
        <p>
          The regulatory category changes if you make therapeutic claims on
          your label or marketing. Claims like &quot;treats eczema&quot;,
          &quot;kills bacteria&quot;, &quot;relieves dry skin&quot;, or
          &quot;anti-inflammatory&quot; can move a product into the Natural Health
          Products or Drug frameworks, both of which carry significantly more
          regulatory overhead. Most indie soap makers deliberately keep their
          language cosmetic — describing what the product does (cleanses,
          moisturizes) rather than what condition it treats.
        </p>
        <p>
          If you are unsure which category your soap falls into, review your
          label and marketing copy carefully before your first sale. The safest
          approach is to describe sensory and cleansing qualities without making
          health or therapeutic claims.
        </p>
      </>
    ),
  },
  {
    heading: "The Cosmetic Notification Form for soap makers",
    body: (
      <>
        <p>
          Within 10 days of first selling a cosmetic in Canada — including at a
          farmers market, craft fair, or online shop — the manufacturer or importer
          must file a Cosmetic Notification Form (CNF) with Health Canada. For most
          indie soap makers, &quot;within 10 days of first sale&quot; means you need to
          have your CNF information ready before you make that first sale, not after.
        </p>
        <p>
          The CNF requires each ingredient listed by INCI name with its concentration
          in the formula, the product function, company information, and labelling
          content. For soap, this means your lye calculation needs to be finalized
          and your formula needs to have accurate percentages before you notify.
          Notifying with estimated or placeholder concentrations creates problems
          if Health Canada follows up.
        </p>
        <p>
          The notification is not an approval process — Health Canada does not
          approve cosmetics before sale. The CNF is a record that your product
          exists and what it contains. But accurate information matters because
          it is what Health Canada uses if they ever need to follow up on a safety
          concern.
        </p>
      </>
    ),
  },
  {
    heading: "What you need before your first sale",
    bullets: [
      "Finalized formula with INCI names and accurate percentages for every ingredient",
      "Lye calculation verified with a saponification calculator — not estimated",
      "Ingredients cross-checked against the Health Canada Cosmetic Ingredient Hotlist",
      "Fragrance allergen review if you use any essential oils or fragrance blends",
      "Bilingual label drafted with INCI ingredient list, net quantity, and business identity",
      "CNF information organized and ready to file within 10 days of first sale",
      "Costing completed so retail and wholesale prices cover actual cost of goods",
    ],
  },
  {
    heading: "Soap label requirements in Canada",
    body: (
      <>
        <p>
          Canadian cosmetic labels have several mandatory requirements. The
          ingredient list must use INCI names in descending order of concentration.
          The net quantity must be shown in metric units (grams) and must reflect
          the weight at point of sale, not at time of manufacture. The business
          identity (name and address of the responsible company) must appear in
          English and French on the same label or panel.
        </p>
        <p>
          Cold process soap presents a particular challenge for net weight. Bars
          lose moisture as they cure, so a bar that weighs 130 g freshly cut may
          weigh 110 g after a full cure. The weight on the label must be accurate
          at point of sale. Most soap makers either cure bars fully before
          weighing and labelling, or build in a small weight buffer and label
          conservatively.
        </p>
        <p>
          If your soap contains essential oils with fragrance allergens above the
          Health Canada disclosure threshold (0.001% in leave-on, 0.01% in
          rinse-off), those allergens must be listed individually by INCI name.
          Many essential oils used in soap — lavender, rose, lemongrass,
          clary sage — contain multiple regulated allergens. A fragrance allergen
          review should be part of your pre-label checklist.
        </p>
      </>
    ),
  },
  {
    heading: "Soap-specific hotlist considerations",
    body: (
      <>
        <p>
          The Health Canada Cosmetic Ingredient Hotlist lists ingredients that are
          prohibited or restricted in Canadian cosmetics. For soap makers, the
          most relevant entries include certain fragrance components, colourants
          that are not approved for use in rinse-off products, and some botanical
          extracts that carry concentration limits.
        </p>
        <p>
          Rinse-off vs. leave-on classification matters for hotlist compliance.
          Soap is typically a rinse-off product, which means the concentration
          limits for restricted ingredients are usually higher than for leave-on
          products. However, a soap marketed with a claim like &quot;leave on as a
          treatment&quot; would be classified differently.
        </p>
        <p>
          Colourants are a frequent oversight. Not all colourants approved for food
          or cosmetics in one country are approved in Canada. Check the Hotlist
          for any colourant you use in soap, particularly micas with chromium oxide
          components, ultramarines, and lab-certified colourants from US suppliers
          who may be working to FDA rather than Health Canada standards.
        </p>
      </>
    ),
  },
  {
    heading: "Costing handmade soap correctly",
    body: (
      <>
        <p>
          Underpricing is one of the most common business problems for indie soap
          makers, and it almost always comes from incomplete costing. Oil and lye
          costs are visible and easy to track. The costs that get missed are
          packaging, labels, shipping, spoilage, breakage, curing time, labour,
          market fees, booth rental, insurance, and overhead.
        </p>
        <p>
          A reliable costing approach calculates cost per batch from all actual
          inputs, divides by the number of sellable bars (not total bars cut),
          and applies a markup that covers wholesale minimums, market fees, and
          the occasional bad batch. Most independent makers pricing against their
          actual costs find their prices need to be meaningfully higher than they
          initially assumed.
        </p>
        <p>
          Batch scaling also affects costing. A 4 kg oil batch and a 10 kg oil
          batch often have different per-unit costs because of shipping minimums,
          supplier quantity discounts, and fixed costs spread across more units.
          Building a costing model that updates as batch size changes makes scaling
          decisions much clearer.
        </p>
      </>
    ),
  },
  {
    heading: "Selling soap at markets vs. online in Canada",
    body: (
      <>
        <p>
          The regulatory requirements for soap are the same whether you sell at a
          farmers market or through an online shop — the CNF obligation applies as
          soon as you make a first sale anywhere in Canada. Market organizers
          increasingly ask vendors to confirm their CNF status, and some retailers
          ask for it before taking a product on consignment.
        </p>
        <p>
          Online sales across provincial lines raise no additional CNF complexity
          in most cases, but selling into Quebec has additional French-language
          labelling requirements beyond bilingual content. If Quebec is a
          meaningful part of your market, review the Office québécois de la langue
          française (OQLF) requirements in addition to Health Canada compliance.
        </p>
      </>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a CNF for handmade soap sold at a Canadian farmers market?",
    answer:
      "If your soap is sold to the public as a cosmetic in Canada — including at farmers markets — Health Canada generally expects a Cosmetic Notification Form within 10 days of first sale. The notification applies regardless of sales channel or venue. Confirm the current requirements directly against Health Canada guidance for your specific product.",
  },
  {
    question: "Can I make therapeutic claims on my soap?",
    answer:
      "Therapeutic claims (treats, heals, kills bacteria, relieves pain, anti-inflammatory) can shift a soap out of the cosmetic regulatory category and into the Drug or Natural Health Product framework, which involves much more complex and costly compliance. Most indie soap makers deliberately avoid therapeutic claims to stay in the cosmetic framework.",
  },
  {
    question: "Does my soap label need to be bilingual?",
    answer:
      "Required label information generally needs to appear in both English and French on Canadian cosmetics. Quebec has additional French-language requirements beyond bilingual content. Plan bilingual content from the start so label artwork does not need to be redesigned before printing.",
  },
  {
    question: "How do I handle net weight on cold process soap?",
    answer:
      "Cold process soap loses water weight during curing. The net weight on your label must reflect the actual weight at point of sale, not the weight when cut. Most soap makers either cure bars fully and weigh them before labelling, or label conservatively with a weight that the bar will reliably reach after full cure.",
  },
  {
    question: "Do I need insurance to sell handmade soap in Canada?",
    answer:
      "Product liability insurance is not strictly required to file a CNF, but most market organizers, retailers, and wholesale partners ask for it. Many indie soap makers carry it as a standard business cost. Some market organizers and retail partners will not accept products from uninsured makers regardless of compliance status.",
  },
  {
    question: "What colourants can I use in Canadian soap?",
    answer:
      "Colourants must comply with the Health Canada Cosmetic Ingredient Hotlist. Not all colourants approved by the FDA in the US are approved for use in Canadian cosmetics. Check the Hotlist for any colourant you plan to use, particularly micas with chromium oxide components and ultramarines used in rinse-off soap.",
  },
  {
    question: "Does soap with essential oils need fragrance allergen disclosure?",
    answer:
      "If allergens from essential oils are present above the threshold — 0.001% in leave-on, 0.01% in rinse-off products — they must be disclosed individually by INCI name under the rules in effect since April 2026. Many common soap essential oils (lavender, lemongrass, clary sage, rose) contain regulated allergens. A full allergen review is part of pre-label preparation.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function HowToSellHandmadeSoapInCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Soap"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-07-14"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "How to Sell Handmade Soap in Canada" }]}
      intro={
        <>
          <p>
            Selling handmade soap in Canada means working through formulation,
            labelling, costing, and regulatory notification before your first
            sale. This guide explains where soap sits in Canadian cosmetic
            regulation, what your label legally needs, how the Cosmetic
            Notification Form obligation applies to soap makers, and how to build
            accurate costing so your prices reflect what a batch actually costs
            to make.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Try the free Soap Calculator",
        href: "/tools/soap-calculator",
        description: "Compute lye amounts, water ratio, and soap quality scores for your recipe",
      }}
      relatedLinks={[
        {
          label: "Soap Calculator (Lye / SAP)",
          href: "/tools/soap-calculator",
          description: "Free saponification calculator — enter oils, get NaOH or KOH amounts and quality scores.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to gather before notifying Health Canada about your soap.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "Bilingual content, INCI ordering, and net quantity rules.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check soap ingredients against restricted and prohibited substances.",
        },
      ]}
    />
  );
}
