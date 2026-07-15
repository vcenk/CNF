import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/handmade-skincare-business-canada";
const title = "Starting a Handmade Skincare Business in Canada";
const description =
  "A practical setup guide for Canadian skincare makers — formulation, costing, labels, CNF preparation, business basics, and how to launch with less guesswork.";
const lastReviewed = "July 14, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What an indie skincare business actually involves",
    body: (
      <>
        <p>
          Starting a Canadian skincare business involves formulation, operations,
          and regulatory compliance — three areas that new makers often approach
          separately but that work better as one connected workflow. A formula
          affects the label, which affects the CNF, which affects what you can
          claim in marketing. Costing affects pricing, which affects whether you
          can sustain production at market rates.
        </p>
        <p>
          The makers who launch successfully have usually figured out their formula
          and regulatory obligations before they order packaging, not after. Labelling
          artwork cannot be finalized without INCI names. A CNF cannot be filed
          without finalized concentrations. Reprinting packaging because the INCI list
          changed is expensive and avoidable.
        </p>
        <p>
          This guide covers the main setup areas in the order they typically need to
          be addressed — from registering a business through to filing the Cosmetic
          Notification Form before your first sale.
        </p>
      </>
    ),
  },
  {
    heading: "Business registration and legal basics",
    body: (
      <>
        <p>
          Business registration in Canada is provincial. Most indie skincare makers
          start as a sole proprietorship under a registered trade name, or incorporate
          as a small corporation once they have consistent revenue. Registration gives
          you a business name you can use on labels (required — the label must show the
          name and address of the person responsible for the product) and lets you open
          a business bank account to separate business and personal finances.
        </p>
        <p>
          GST/HST registration is required once your worldwide taxable revenues exceed
          the small supplier threshold (currently CA$30,000 over four consecutive
          calendar quarters). Below that threshold, registration is optional but some
          makers register voluntarily to claim input tax credits on business purchases.
          Confirm the current threshold and your situation with a tax professional.
        </p>
        <p>
          Product liability insurance is not required by Health Canada, but most market
          organizers, retail partners, and wholesale buyers ask for it. Cosmetic products
          that contact skin carry a liability exposure — insurance is a standard cost of
          doing business that most serious makers carry from the start.
        </p>
      </>
    ),
  },
  {
    heading: "Setup checklist before your first sale",
    bullets: [
      "Register your business name provincially or incorporate",
      "Get a business bank account and separate business finances from personal",
      "Confirm GST/HST registration requirements for your revenue level",
      "Source ingredients from suppliers with clear INCI documentation and COAs",
      "Build and version your formulas with INCI names and accurate percentages",
      "Check every ingredient against the Health Canada Cosmetic Ingredient Hotlist",
      "Complete a fragrance allergen review for any product with essential oils or fragrance",
      "Draft bilingual labels with INCI ingredient list, net quantity, and required warnings",
      "Prepare CNF information for each product — ready to file within 10 days of first sale",
      "Cost each product fully so retail and wholesale prices cover actual cost of goods",
      "Get product liability insurance before your first market or wholesale order",
    ],
  },
  {
    heading: "Formulation and ingredient sourcing",
    body: (
      <>
        <p>
          A cosmetic formula for Health Canada purposes requires an accurate INCI name
          and concentration for every ingredient. Suppliers should provide a Certificate
          of Analysis (COA) that includes the INCI name and purity for each material.
          If a supplier cannot provide documentation, that is relevant information before
          you commit to the ingredient.
        </p>
        <p>
          For blended ingredients — fragrance oils, botanical extracts sold as proprietary
          blends, multi-component emulsifiers — each component needs its own INCI name on
          the label and in the CNF, not just the blend name. Ask your supplier for a full
          INCI breakdown of any blend before purchasing.
        </p>
        <p>
          All ingredients must be checked against the Cosmetic Ingredient Hotlist.
          The Hotlist lists substances that are prohibited outright in Canadian cosmetics
          and substances that are restricted to specific concentrations or uses. Hotlist
          compliance is not something to check once — if you change a supplier or a formula,
          check again.
        </p>
      </>
    ),
  },
  {
    heading: "Canadian cosmetic labelling requirements",
    body: (
      <>
        <p>
          Canadian cosmetic labels have several mandatory elements. The ingredient list
          must use INCI names in descending order of concentration. Net quantity must
          appear in metric units. The business identity — name and address of the person
          or company responsible for the product — must appear in both English and French.
          Required warnings for certain ingredient types or product uses must also be
          included where applicable.
        </p>
        <p>
          As of April 2026, Canadian cosmetics must also individually disclose specific
          fragrance allergens by INCI name when they are present above the disclosure
          threshold — 0.001% in leave-on products, 0.01% in rinse-off products. The
          allergen list expands from 24 to 81 allergens for new products after August 1,
          2026. Any product containing essential oils or fragrance blends needs a full
          allergen review before the label can be finalized.
        </p>
        <p>
          Bilingual content must be fully bilingual — not partially translated. The
          ingredient list itself uses INCI names (which are internationally standardized
          and do not need to be translated), but any consumer-facing marketing text on
          the label, directions, and warnings typically need to appear in both languages.
          Quebec has additional French-language requirements from the OQLF beyond
          federal bilingual content rules.
        </p>
      </>
    ),
  },
  {
    heading: "The Cosmetic Notification Form obligation",
    body: (
      <>
        <p>
          The Cosmetic Notification Form (CNF) must be filed with Health Canada within
          10 days of a product&apos;s first sale as a cosmetic in Canada. The CNF is
          required for most cosmetic products — it is not an approval process, but it is
          a mandatory record that your product exists and what it contains.
        </p>
        <p>
          The CNF requires each ingredient by INCI name with its concentration in the
          formula, the product function, label content, and company information. For
          indie makers with multiple products, preparing CNF information for each SKU
          before launch can be a significant organizational task. The most common mistake
          is leaving CNF preparation to after the first sale, which means notification
          is often late.
        </p>
        <p>
          Building CNF preparation into your pre-launch workflow — treating it as part of
          formula finalization rather than a separate administrative step — keeps timelines
          manageable. Any tool or system that keeps your INCI names and concentrations
          organized as you develop formulas also keeps your CNF preparation in sync.
        </p>
      </>
    ),
  },
  {
    heading: "Where new skincare makers most often get stuck",
    body: (
      <p>
        The most common stalls are: incorrect INCI names that require label reprints
        before launch; missing fragrance allergen disclosure that delays product
        approval from retail partners; pricing that does not cover actual cost of
        goods because overhead and labour were not included; and CNF preparation
        that starts too late. None of these are insurmountable — they are usually
        the result of not having an organized workflow that connects formulation,
        labelling, costing, and notification in one place.
      </p>
    ),
  },
  {
    heading: "Costing your skincare products accurately",
    body: (
      <>
        <p>
          Full cost of goods for a handmade skincare product includes raw ingredients,
          packaging, labels, inbound shipping, spoilage allowance, and direct labour
          for production. Overhead — insurance, tools, market fees, software — is often
          spread across all products as an additional line.
        </p>
        <p>
          Wholesale pricing typically requires a minimum markup of 2× over cost of
          goods so that when a retailer takes their margin, the maker has room to cover
          direct and indirect costs. Retail pricing is typically 4–5× cost of goods at
          minimum for indie products, though market positioning affects where the final
          price lands.
        </p>
        <p>
          Batch size affects per-unit cost significantly. Scaling from a 500 g batch to
          a 2 kg batch often changes per-unit ingredient cost, packaging unit cost, and
          the fixed cost allocated per unit. Building a costing model that updates with
          batch size makes expansion decisions more concrete.
        </p>
      </>
    ),
  },
  {
    heading: "Sales channels and what each requires",
    bullets: [
      "Farmers markets — vendor agreement, product liability insurance, bilingual labels, net quantity labelled correctly",
      "Online (Etsy, Shopify) — accurate product descriptions without therapeutic claims, correct shipping weights, return policy",
      "Wholesale to retailers — CNF on file for each product, line sheet, consistent batch quality, insurance certificate",
      "Pop-up markets and events — provincial sales tax registration, POS system, bilingual signage where required",
      "Subscription boxes and gift sets — each product in the set may require its own CNF",
    ],
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a business license to sell skincare in Canada?",
    answer:
      "Business registration and licensing requirements depend on your province and municipality. Most makers register a sole proprietorship or small corporation and comply with local business licensing rules. Business registration is separate from and in addition to the federal cosmetic notification requirement.",
  },
  {
    question: "Do I need to register for GST/HST as a small skincare maker?",
    answer:
      "If your worldwide taxable revenue stays under the small supplier threshold (currently CA$30,000 over four consecutive calendar quarters), GST/HST registration is optional. Above the threshold, registration is generally required. Confirm your specific situation with a tax professional or the CRA.",
  },
  {
    question: "Do I need insurance to sell handmade skincare in Canada?",
    answer:
      "Product liability insurance is not required by Health Canada, but most markets, retail partners, and wholesale buyers ask for a certificate of insurance before accepting your products. Most serious indie skincare makers carry product liability insurance as a basic cost of doing business.",
  },
  {
    question: "How long does it take to launch a Canadian skincare line?",
    answer:
      "Realistic timelines range from a few months to over a year from first formulation to a stable launch, depending on how many products you are launching and how much pre-launch testing you do. Formula stability testing, label design and printing, CNF preparation, and production setup all take longer than new makers typically budget for. Start earlier than you think you need to.",
  },
  {
    question: "Do I need CNF filings for every product in my skincare line?",
    answer:
      "Each distinct cosmetic product generally requires its own CNF. A body lotion and a face serum with different formulas are two separate notifications. Products that are formulated identically but sold under different names may be treated differently — review current Health Canada guidance for your specific situation.",
  },
  {
    question: "Can I sell skincare I make at home?",
    answer:
      "Home production is common among indie makers in Canada. Health Canada has GMP (Good Manufacturing Practice) guidelines for cosmetics, and while home production is not automatically prohibited, your formulation, storage, filling, and labelling conditions matter. As you scale, you may need to review your production setup against the GMPs.",
  },
  {
    question: "Where does FormulaNorth fit in the launch process?",
    answer:
      "FormulaNorth is the workspace for the formulation-through-notification side of the launch: organizing formulas with INCI names, checking hotlist status, drafting bilingual label content, calculating batch costs, and preparing CNF information. It does not handle business registration, tax filings, or insurance — those need their own advisors.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function HandmadeSkincareBusinessCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Business"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-07-14"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Handmade Skincare Business in Canada" }]}
      intro={
        <>
          <p>
            Starting a handmade skincare business in Canada means balancing
            formulation, labelling, costing, and regulatory compliance before your
            first sale. This guide covers the full setup process in practical
            order — from business registration through CNF notification — so you
            know what to address and when.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start your first formula",
        href: "/formulas",
        description: "Build a versioned recipe with INCI names, costing, and label drafts in one place",
      }}
      relatedLinks={[
        {
          label: "How to sell handmade soap in Canada",
          href: "/how-to-sell-handmade-soap-in-canada",
          description: "Soap-specific notes on regulation, label, and CNF that apply to many skincare brands.",
        },
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Formulation, label, and costing considerations for body butter.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to gather before notifying Health Canada for each product.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/cosmetic-ingredient-suppliers-canada",
          description: "Find Canadian suppliers with documentation that supports small-batch production.",
        },
      ]}
    />
  );
}
