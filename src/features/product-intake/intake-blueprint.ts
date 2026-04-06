import { ProductPillar } from "@/domain/cnf";

export const productPillars: ProductPillar[] = [
  {
    stage: "Layer 01",
    name: "AI-Assisted Entry",
    description:
      "Capture plain-language product details and turn them into structured drafting signals for formulation and compliance review.",
    outcomes: [
      "Suggest INCI names and concentration ranges",
      "Infer product category and usage type",
      "Highlight likely hotlist concerns during intake"
    ]
  },
  {
    stage: "Layer 02",
    name: "Structured Storage",
    description:
      "Normalize inputs into a durable CNF draft model so every future step works from validated, queryable data.",
    outcomes: [
      "Store company, product, ingredient, and variant data",
      "Track validation status and completeness",
      "Prepare a stable source of truth for export"
    ]
  },
  {
    stage: "Layer 03",
    name: ".hcxs Export",
    description:
      "Generate a portal-ready artifact from normalized CNF drafts and support the user through final submission.",
    outcomes: [
      "Gate export on validation readiness",
      "Encapsulate portal file generation in a dedicated service",
      "Guide upload, review, and declaration steps"
    ]
  }
];

export const firstSliceMilestones = [
  "Create a draft intake route for company and product basics.",
  "Persist a normalized ProductDraft shape behind a repository interface.",
  "Run validation rules and return structured issues by field.",
  "Show readiness states that will later unlock `.hcxs` export."
];

