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
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "What an indie skincare business actually involves",
    body: (
      <p>
        Starting a Canadian skincare business is part formulation, part
        operations, part compliance. The makers who succeed treat
        formulation, label, costing, and CNF preparation as one connected
        workflow rather than four separate jobs.
      </p>
    ),
  },
  {
    heading: "Setup checklist before your first sale",
    bullets: [
      "Pick a business name and register it provincially or as a sole proprietorship",
      "Get a GST/HST account if you expect to cross the small supplier threshold",
      "Source ingredients from suppliers with clear documentation",
      "Build and version your formulas with INCI names and percentages",
      "Check ingredients against the Cosmetic Ingredient Hotlist",
      "Draft bilingual labels with INCI list, net quantity, and warnings",
      "Prepare CNF information for each cosmetic product before launch",
      "Cost each product so retail and wholesale prices reflect true COGS",
      "Look into product liability insurance",
    ],
  },
  {
    heading: "Where new skincare makers most often get stuck",
    body: (
      <p>
        The most common stalls are inconsistent INCI naming across
        formulas, missing fragrance allergen disclosure on labels,
        underpriced products that do not pay the maker for their time, and
        delayed CNF preparation that pushes back launch. None of these are
        hard problems on their own — they are usually about not having one
        place to organize the work.
      </p>
    ),
  },
  {
    heading: "Sales channels and what each requires",
    bullets: [
      "Farmers markets — vendor agreement, insurance, signage, bilingual labels",
      "Online (Etsy, Shopify) — product photography, shipping policy, returns, accurate label content",
      "Wholesale to retailers — CNF on file, line sheet, product liability insurance, consistent batch quality",
      "Pop-ups and markets — provincial sales tax setup, point-of-sale system, bilingual signage where required",
    ],
  },
  {
    heading: "How FormulaNorth supports an indie skincare launch",
    body: (
      <p>
        FormulaNorth gathers formula, ingredient, label, costing, and CNF
        prep work in one place. You build a formula once, and it feeds
        your label content, your costing, and your CNF information.
        Updates flow through the whole stack instead of needing to be
        re-entered.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a business license to sell skincare in Canada?",
    answer:
      "Business registration and licensing depend on your province and municipality. Most makers register a sole proprietorship or incorporated business and follow local licensing rules. This is separate from cosmetic notification, which is federal.",
  },
  {
    question: "Do I need to register for GST/HST as a small skincare maker?",
    answer:
      "If your worldwide taxable revenue stays under the small supplier threshold (currently CA$30,000 over four consecutive quarters), GST/HST registration is optional. Above the threshold, registration is generally required. Confirm against current CRA guidance.",
  },
  {
    question: "Do I need insurance to sell handmade skincare?",
    answer:
      "Product liability insurance is not strictly required by Health Canada, but most markets, retailers, and wholesale partners ask for it. Many indie skincare makers treat it as a basic cost of doing business.",
  },
  {
    question: "How long does it take to launch a Canadian skincare line?",
    answer:
      "It varies. Realistic timelines are several months from first formulation through stable batches, finalized labels, CNF preparation, and a small initial production run. Start sourcing and prep work earlier than you think you need to.",
  },
  {
    question: "Where does FormulaNorth fit in the launch process?",
    answer:
      "FormulaNorth is the workspace for the formulation-through-notification side of the launch. It does not handle business registration, taxes, or insurance — but it keeps your formulas, labels, costing, and CNF prep aligned.",
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
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Handmade Skincare Business in Canada" }]}
      intro={
        <>
          <p>
            Starting a handmade skincare business in Canada means
            balancing formulation, label, costing, CNF preparation, and
            business basics. This guide is a practical map of what to set
            up before your first sale and how to keep it organized as you
            grow.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Start your first formula",
        href: "/formulas",
        description: "Build a versioned recipe with costing and label drafts",
      }}
      relatedLinks={[
        {
          label: "How to sell handmade soap in Canada",
          href: "/how-to-sell-handmade-soap-in-canada",
          description: "Soap-specific notes that apply to many handmade skincare brands.",
        },
        {
          label: "Sell body butter in Canada",
          href: "/sell-body-butter-canada",
          description: "Formulation, label, and costing notes for body butter.",
        },
        {
          label: "Cosmetic Notification Form (CNF) Canada",
          href: "/cosmetic-notification-form-canada",
          description: "What to gather before notifying Health Canada.",
        },
        {
          label: "Canadian cosmetic ingredient suppliers",
          href: "/cosmetic-ingredient-suppliers-canada",
          description: "How to choose suppliers that fit small-batch production.",
        },
      ]}
    />
  );
}
