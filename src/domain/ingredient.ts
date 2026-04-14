export type HotlistStatus = "not_listed" | "restricted" | "prohibited";

export type UsageTypeRestriction = "rinse-off" | "leave-on" | "both" | null;

export interface Ingredient {
  id: string;
  inciName: string;
  commonName: string | null;
  casNumber: string | null;
  slug: string;
  description: string | null;
  typicalUseLevelMin: number | null;
  typicalUseLevelMax: number | null;
  hotlistStatus: HotlistStatus;
  hotlistMaxConcentration: number | null;
  hotlistConditions: string | null;
  usageTypeRestriction: UsageTypeRestriction;
  isFragranceAllergen: boolean;
  functions: IngredientFunction[];
}

export interface IngredientFunction {
  id: string;
  name: string;
  description: string | null;
  isPrimary?: boolean;
}

export interface Supplier {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  location: string | null;
  isCanadian: boolean;
}

export interface IngredientSupplierPrice {
  id: string;
  ingredientId: string;
  supplier: Supplier;
  pricePerKg: number | null;
  currency: string;
  minOrderKg: number | null;
}
