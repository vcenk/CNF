export interface CostCalculatorInput {
  batchSizeGrams: number;
  ingredientCost: number;
  packagingCostPerUnit: number;
  unitsPerBatch: number;
  labourHours: number;
  labourRate: number;
  overheadPercent: number;
  targetMarginPercent: number;
  wholesaleMarkup: number;
}

export interface CostCalculatorResult {
  ingredientCostPerUnit: number;
  packagingCostPerUnit: number;
  labourCostTotal: number;
  labourCostPerUnit: number;
  baseCostPerUnit: number;
  overheadPerUnit: number;
  totalCostPerUnit: number;
  costPerBatch: number;
  suggestedRetail: number;
  suggestedWholesale: number;
  retailGrossMargin: number;
  wholesaleGrossMargin: number;
}

export function calculateCost(input: CostCalculatorInput): CostCalculatorResult {
  const {
    ingredientCost,
    packagingCostPerUnit,
    unitsPerBatch,
    labourHours,
    labourRate,
    overheadPercent,
    targetMarginPercent,
    wholesaleMarkup,
  } = input;

  const safeUnits = unitsPerBatch > 0 ? unitsPerBatch : 1;

  const ingredientCostPerUnit = ingredientCost / safeUnits;
  const labourCostTotal = labourHours * labourRate;
  const labourCostPerUnit = labourCostTotal / safeUnits;
  const baseCostPerUnit = ingredientCostPerUnit + packagingCostPerUnit + labourCostPerUnit;
  const overheadPerUnit = baseCostPerUnit * (overheadPercent / 100);
  const totalCostPerUnit = baseCostPerUnit + overheadPerUnit;
  const costPerBatch = totalCostPerUnit * safeUnits;

  // Retail price uses target margin (margin = (price - cost) / price)
  const margin = Math.min(Math.max(targetMarginPercent, 0), 95) / 100;
  const suggestedRetail = margin >= 1 ? totalCostPerUnit : totalCostPerUnit / (1 - margin);

  // Wholesale price uses a markup over cost (cost * (1 + markup%))
  const suggestedWholesale = totalCostPerUnit * (1 + wholesaleMarkup / 100);

  const retailGrossMargin = suggestedRetail > 0 ? (suggestedRetail - totalCostPerUnit) / suggestedRetail : 0;
  const wholesaleGrossMargin = suggestedWholesale > 0 ? (suggestedWholesale - totalCostPerUnit) / suggestedWholesale : 0;

  return {
    ingredientCostPerUnit,
    packagingCostPerUnit,
    labourCostTotal,
    labourCostPerUnit,
    baseCostPerUnit,
    overheadPerUnit,
    totalCostPerUnit,
    costPerBatch,
    suggestedRetail,
    suggestedWholesale,
    retailGrossMargin,
    wholesaleGrossMargin,
  };
}

export function formatCAD(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercent(value: number): string {
  if (!Number.isFinite(value)) return "—";
  return `${(value * 100).toFixed(1)}%`;
}
