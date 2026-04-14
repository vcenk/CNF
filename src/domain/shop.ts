export type ShopCategory =
  | "formula_pack"
  | "compliance_template"
  | "ingredient_guide"
  | "business_kit"
  | "calculator"
  | "cheat_sheet";

export const categoryLabels: Record<ShopCategory, string> = {
  formula_pack: "Formula Pack",
  compliance_template: "Compliance Template",
  ingredient_guide: "Ingredient Guide",
  business_kit: "Business Kit",
  calculator: "Calculator",
  cheat_sheet: "Cheat Sheet",
};

export interface ShopProduct {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  longDescription: string | null;
  priceCad: number;
  stripePriceId: string | null;
  category: ShopCategory;
  previewImageUrl: string | null;
  filePath: string | null;
  isPublished: boolean;
  isFree: boolean;
  requiresEmail: boolean;
  downloadCount: number;
}

export interface ShopOrder {
  id: string;
  productId: string;
  email: string;
  stripeSessionId: string | null;
  status: "pending" | "completed" | "failed" | "refunded";
  downloadToken: string | null;
}
