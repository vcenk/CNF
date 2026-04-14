export type ProductCategory =
  | "skin_care"
  | "hair_care"
  | "body_care"
  | "fragrance"
  | "makeup"
  | "oral_care";

export type UsageType = "rinse-off" | "leave-on";

export type Phase =
  | "water"
  | "oil"
  | "emulsifier"
  | "active"
  | "cool_down"
  | "fragrance"
  | "preservative"
  | "main";

export interface Formula {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  productCategory: ProductCategory | null;
  usageType: UsageType | null;
  targetBatchSizeG: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FormulaVersion {
  id: string;
  formulaId: string;
  versionNumber: number;
  notes: string | null;
  isCurrent: boolean;
  createdAt: string;
}

export interface FormulaIngredient {
  id: string;
  formulaVersionId: string;
  ingredientId: string;
  inciName: string;
  commonName: string | null;
  percentage: number;
  phase: Phase;
  roleOverride: string | null;
  sortOrder: number;
  notes: string | null;
}

export interface FormulaVariant {
  id: string;
  formulaId: string;
  name: string;
}

export interface VariantIngredient {
  id: string;
  variantId: string;
  ingredientId: string;
  inciName: string;
  percentage: number;
}
