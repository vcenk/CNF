export interface CostConfig {
  laborCostPerBatch: number;
  packagingCostPerUnit: number;
  overheadPercent: number;
  targetMarginPercent: number;
  unitsPerBatch: number;
}

export interface IngredientCostLine {
  ingredientId: string;
  inciName: string;
  percentage: number;
  weightG: number;
  pricePerKg: number | null;
  lineCost: number | null;
  priceSource: "user" | "seed" | "none";
}

export interface CostBreakdown {
  ingredientLines: IngredientCostLine[];
  totalIngredientCost: number;
  laborCost: number;
  packagingCost: number;
  overheadCost: number;
  totalCOGS: number;
  costPerUnit: number;
  suggestedWholesale: number;
  suggestedRetail: number;
}
