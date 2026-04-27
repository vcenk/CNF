import {
  SeoGuide,
  buildSeoGuideMetadata,
  type SeoGuideFaq,
  type SeoGuideSection,
} from "@/components/marketing/seo-guide";

const pathname = "/cosmetic-ingredient-suppliers-canada";
const title = "Canadian Cosmetic Ingredient Suppliers";
const description =
  "How to find Canadian cosmetic ingredient suppliers, what to look for in a supplier, and how to compare options for soap, skincare, body care, and bath product makers.";
const lastReviewed = "April 27, 2026";

const sections: SeoGuideSection[] = [
  {
    heading: "Why source from Canadian suppliers",
    body: (
      <p>
        Working with Canadian suppliers reduces shipping cost and customs
        complexity, gives you faster lead times for restocks, and often
        means easier returns on damaged or out-of-spec material. It also
        gives you a Canadian point of contact when an ingredient question
        comes up during CNF or label prep.
      </p>
    ),
    bullets: [
      "Lower shipping cost than US-based or overseas suppliers",
      "Faster restock cycles for fast-moving SKUs",
      "Canadian customer support for spec sheets and Certificates of Analysis",
      "Easier exchange-rate planning for costing",
    ],
  },
  {
    heading: "What to look for in a supplier",
    body: (
      <p>
        Indie cosmetic makers benefit most from suppliers who provide clean
        documentation. Before placing a first order, check whether the
        supplier publishes INCI names, supplies Certificates of Analysis on
        request, lists batch shelf life, and indicates any country of
        origin or allergen information.
      </p>
    ),
    bullets: [
      "Published INCI names matching the ingredient sold",
      "Certificate of Analysis available on request",
      "Listed shelf life and recommended storage",
      "Pricing visible without an account or a sales call",
      "Reasonable minimum order quantities for small batches",
    ],
  },
  {
    heading: "How to compare suppliers fairly",
    body: (
      <p>
        Look beyond the per-kilogram price. Add shipping, taxes, lead time,
        and minimum order quantity into your comparison. A slightly higher
        unit price can be the cheaper option when shipping and lead time
        favour the local supplier.
      </p>
    ),
  },
  {
    heading: "How FormulaNorth helps",
    body: (
      <p>
        FormulaNorth maintains a Canadian supplier directory linked into
        the ingredient database. You can browse Canadian suppliers, see
        which ingredients they list, and click through to their catalog. As
        you build a formula, the ingredient table can show which suppliers
        carry each ingredient so sourcing decisions stay aligned with your
        formulation work.
      </p>
    ),
  },
];

const faqs: SeoGuideFaq[] = [
  {
    question: "Do I need to use Canadian suppliers to sell cosmetics in Canada?",
    answer:
      "No. Canadian makers can source from any reputable supplier. Canadian suppliers offer practical advantages — lower shipping, faster restocks, and Canadian support — but it is not a regulatory requirement.",
  },
  {
    question: "What documentation should I request from a supplier?",
    answer:
      "At minimum, ask for the INCI name, Certificate of Analysis (or technical data sheet), shelf life, recommended storage conditions, and country of origin. These help with formulation, costing, and CNF preparation.",
  },
  {
    question: "Can FormulaNorth recommend specific suppliers?",
    answer:
      "FormulaNorth lists Canadian cosmetic ingredient suppliers in its directory. The choice of supplier remains yours and depends on your formula, batch size, and budget.",
  },
  {
    question: "How do I tell if a supplier is reliable?",
    answer:
      "Look for clear documentation, consistent INCI naming, willingness to share Certificates of Analysis, and visible pricing. Reviews from other Canadian makers and a track record of on-time shipping also matter.",
  },
];

export const metadata = buildSeoGuideMetadata({ title, description, pathname });

export default function CosmeticIngredientSuppliersCanadaPage() {
  return (
    <SeoGuide
      eyebrow="Suppliers"
      title={title}
      description={description}
      pathname={pathname}
      datePublished="2026-04-27"
      dateModified="2026-04-27"
      lastReviewed={lastReviewed}
      breadcrumbs={[{ label: "Cosmetic Ingredient Suppliers Canada" }]}
      intro={
        <>
          <p>
            Sourcing is one of the highest-leverage decisions a Canadian
            cosmetic maker makes. The right supplier mix keeps your costs
            stable, your batches consistent, and your CNF and label work
            simpler.
          </p>
          <p>
            This guide covers what to look for in a supplier, how to
            compare quotes fairly, and how FormulaNorth&apos;s supplier
            directory ties into your formula and ingredient work.
          </p>
        </>
      }
      sections={sections}
      faqs={faqs}
      primaryCta={{
        label: "Browse Canadian suppliers",
        href: "/suppliers",
        description: "Directory of Canadian cosmetic ingredient suppliers",
      }}
      relatedLinks={[
        {
          label: "Ingredient database",
          href: "/ingredients",
          description: "Find ingredients with INCI names and supplier availability.",
        },
        {
          label: "INCI Name Lookup Canada",
          href: "/inci-name-lookup-canada",
          description: "How to confirm the right INCI name from a supplier spec sheet.",
        },
        {
          label: "Health Canada Cosmetic Ingredient Hotlist",
          href: "/health-canada-cosmetic-hotlist",
          description: "Check sourced ingredients against Health Canada restrictions.",
        },
        {
          label: "Cosmetic label requirements in Canada",
          href: "/cosmetic-label-requirements-canada",
          description: "How sourcing decisions feed into your bilingual label.",
        },
      ]}
    />
  );
}
