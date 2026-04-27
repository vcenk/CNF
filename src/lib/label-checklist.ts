export type ProductTypeKey =
  | "leave_on_skincare"
  | "rinse_off_skincare"
  | "soap_bar"
  | "body_butter"
  | "scrub"
  | "bath_bomb"
  | "hair_care"
  | "lip_care"
  | "deodorant"
  | "perfume"
  | "other";

export interface ChecklistInput {
  productType: ProductTypeKey;
  hasFragrance: boolean;
  containsEssentialOils: boolean;
  containsColourants: boolean;
  smallContainer: boolean;
  shipsToQuebec: boolean;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  category: "core" | "ingredients" | "warnings" | "bilingual" | "format" | "verification";
}

export const PRODUCT_TYPE_LABELS: Record<ProductTypeKey, string> = {
  leave_on_skincare: "Leave-on skincare (lotion, serum, balm)",
  rinse_off_skincare: "Rinse-off skincare (cleanser, mask)",
  soap_bar: "Soap bar",
  body_butter: "Body butter",
  scrub: "Scrub",
  bath_bomb: "Bath bomb / bath product",
  hair_care: "Hair care (shampoo, conditioner, bar)",
  lip_care: "Lip care",
  deodorant: "Deodorant (cosmetic, not antiperspirant)",
  perfume: "Perfume / body spray",
  other: "Other cosmetic product",
};

export function buildLabelChecklist(input: ChecklistInput): ChecklistItem[] {
  const items: ChecklistItem[] = [
    {
      id: "product-identity",
      category: "core",
      label: "Product identity (what the product is)",
      detail: "Name and category description as required for the principal display panel.",
    },
    {
      id: "net-quantity",
      category: "core",
      label: "Net quantity in metric units",
      detail: "On the principal display panel. Plan for slight weight variation across batches.",
    },
    {
      id: "business-identity",
      category: "core",
      label: "Business name and address (manufacturer or importer)",
    },
    {
      id: "lot-or-batch",
      category: "core",
      label: "Batch / lot number on the label or packaging",
      detail: "Helps with traceability and recalls; supports CNF record keeping.",
    },
    {
      id: "ingredient-list",
      category: "ingredients",
      label: "Ingredient list using INCI names",
      detail: "Descending order of concentration above 1%; ingredients at 1% or less can follow in any order.",
    },
    {
      id: "ingredient-list-prominent",
      category: "ingredients",
      label: "Ingredient list legible and on the outer packaging or product",
    },
  ];

  if (input.hasFragrance || input.containsEssentialOils) {
    items.push({
      id: "fragrance-allergens",
      category: "ingredients",
      label: "Fragrance allergen disclosure for components above the threshold",
      detail:
        input.productType === "leave_on_skincare" || input.productType === "lip_care" || input.productType === "deodorant"
          ? "Leave-on threshold is 0.001%. Disclose allergens by INCI when above the threshold."
          : "Rinse-off threshold is 0.01%. Disclose allergens by INCI when above the threshold.",
    });
  }

  if (input.containsColourants) {
    items.push({
      id: "colourants",
      category: "ingredients",
      label: "Colour additives grouped after non-colour ingredients",
      detail: "Use INCI naming such as 'CI 77891' or 'Mica'. Confirm each colour is approved for cosmetic use.",
    });
  }

  // Warnings tailored to product type
  if (input.productType === "scrub" || input.productType === "bath_bomb") {
    items.push({
      id: "slip-warning",
      category: "warnings",
      label: "Slip / wet surface warning",
      detail: "Recommended customer-safety warning for products used in showers or baths.",
    });
  }

  if (input.productType === "bath_bomb") {
    items.push({
      id: "not-food",
      category: "warnings",
      label: "'Not for consumption' warning if the product looks like food",
      detail: "Recommended where colour, shape, or scent could be mistaken for a food product.",
    });
  }

  if (input.productType === "lip_care" || input.productType === "perfume") {
    items.push({
      id: "external-use",
      category: "warnings",
      label: "Directions for safe use",
      detail: "Apply / spray instructions where appropriate for the product format.",
    });
  }

  items.push({
    id: "hotlist-warnings",
    category: "warnings",
    label: "Any Hotlist-required warning statements for restricted ingredients",
    detail: "Some restricted ingredients require specific warnings on label or packaging.",
  });

  // Bilingual
  items.push({
    id: "bilingual-core",
    category: "bilingual",
    label: "Required information in both English and French",
    detail: "Includes product identity, directions, warnings, and net quantity.",
  });

  if (input.shipsToQuebec) {
    items.push({
      id: "quebec-french",
      category: "bilingual",
      label: "Quebec French-language requirements reviewed",
      detail: "Quebec has additional French-language rules that may apply to packaging and marketing.",
    });
  }

  // Format
  items.push({
    id: "minimum-text-size",
    category: "format",
    label: "Text legible at standard reading distance",
  });

  if (input.smallContainer) {
    items.push({
      id: "small-container",
      category: "format",
      label: "Outer packaging or tag carries info that won't fit on the small container",
      detail: "Small containers (under ~30 mL/g) often need an outer carton or attached tag for required information.",
    });
  }

  // Verification
  items.push(
    {
      id: "proof-against-formula",
      category: "verification",
      label: "Proof label against the final formula one more time before printing",
      detail: "INCI names match supplier spec sheets and the final percentages.",
    },
    {
      id: "regulatory-review",
      category: "verification",
      label: "Optional: third-party label readiness review",
      detail: "Consider a paid review for first launches or unfamiliar product categories.",
    }
  );

  return items;
}

export const CATEGORY_LABEL: Record<ChecklistItem["category"], string> = {
  core: "Core label content",
  ingredients: "Ingredient list",
  warnings: "Warnings and directions",
  bilingual: "Bilingual EN/FR",
  format: "Format and legibility",
  verification: "Verification",
};
