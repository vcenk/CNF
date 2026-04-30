import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/how-to-sell-handmade-soap-in-canada";
const title = "How to Sell Handmade Soap in Canada";
const description =
  "A practical guide for Canadian soap makers — when soap is regulated as a cosmetic, what your label needs, and how to prepare a Cosmetic Notification Form before your first sale.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "When handmade soap is regulated as a cosmetic in Canada",
    body: (
      <>
        <p>
          Most cold process, hot process, and melt-and-pour soap sold to
          the public in Canada is treated as a cosmetic under the Food and
          Drugs Act. Plain cleansing soap with no medicinal claims usually
          falls under the Cosmetic Regulations rather than the Natural
          Health Products framework.
        </p>
        <p>
          If you make therapeutic claims (treats eczema, kills bacteria,
          relieves pain), the product can move out of cosmetic territory
          and into a different regulatory category. Many indie makers
          choose to keep their claims cosmetic to stay in the simpler
          framework.
        </p>
      </>
    ),
  },
  {
    heading: "What you need before your first sale",
    bullets: [
      "Finalize your formula with INCI names and percentages",
      "Check ingredients against the Health Canada Cosmetic Ingredient Hotlist",
      "Draft a bilingual label with INCI list, net quantity, business identity, and warnings as needed",
      "Plan your CNF preparation so notification can happen within 10 days of first sale",
      "Work out your costing so retail and wholesale prices reflect actual cost of goods",
    ],
  },
  {
    heading: "Soap-specific label considerations",
    body: (
      <p>
        Soap labels often need fragrance allergen disclosure for naturally
        occurring components in essential oils. Cold process soap also
        needs accurate net weight at point of sale, which can drift if
        bars cure for different durations. Build a small buffer into your
        formula to keep the labelled net weight honest.
      </p>
    ),
  },
  {
    heading: "Costing handmade soap correctly",
    body: (
      <p>
        Many soap makers underprice because they only count oils, lye, and
        fragrance. Real cost includes packaging, labels, shipping in,
        spoilage, breakage, labour, market fees, and overhead. Use a
        structured costing tool so wholesale and retail pricing reflect
        what the soap actually costs to make.
      </p>
    ),
  },
  {
    heading: "How FormulaNorth helps soap makers",
    body: (
      <p>
        FormulaNorth&apos;s formula builder, hotlist checks, bilingual label
        drafting, and CNF preparation workflow are designed for makers in
        exactly this situation. Build your soap recipe once and reuse it
        for label, costing, and notification work.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need a CNF for handmade soap sold at a Canadian market?",
    answer:
      "If your soap is sold to the public as a cosmetic in Canada, Health Canada generally expects a Cosmetic Notification Form within 10 days of first sale. Confirm against current Health Canada guidance for your specific product.",
  },
  {
    question: "Can I make therapeutic claims on my soap?",
    answer:
      "Therapeutic claims (treats, heals, kills bacteria, relieves pain) can shift a soap out of cosmetic territory into a different regulatory category, which is more complex and costly. Many indie soap makers keep their claims cosmetic to stay in the cosmetic framework.",
  },
  {
    question: "Does my soap label need to be bilingual?",
    answer:
      "Required label information generally needs to appear in both English and French in Canada. Quebec has additional French-language requirements. Plan bilingual content from the start to avoid reprinting packaging.",
  },
  {
    question: "Do I need insurance to sell handmade soap?",
    answer:
      "Insurance is not strictly required to file a CNF, but most market organizers, retailers, and wholesale partners ask for product liability insurance. Many indie soap makers carry it as a standard cost of doing business.",
  },
  {
    question: "How does FormulaNorth help with soap recipes specifically?",
    answer:
      "FormulaNorth lets you save soap recipes as formulas, batch-scale them, cost them per bar, draft bilingual labels with INCI lists, and prepare CNF information when ready to notify Health Canada.",
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
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "How to Sell Handmade Soap in Canada" }]}
      intro={
        <>
          <p>
            Selling handmade soap in Canada combines formulation, label,
            costing, and notification work. This guide explains where soap
            sits in Canadian cosmetic regulation, what to prepare before
            your first sale, and how to keep label and costing in sync as
            your batches scale.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Try the free Soap Calculator",
        href: "/tools/soap-calculator",
        description: "Compute lye, water, and soap-quality scores for your recipe",
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
          label: "Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check soap ingredients against restricted and prohibited substances.",
        },
      ]}
    />
  );
}
