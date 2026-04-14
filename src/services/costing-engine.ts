import type { CostBreakdown, CostConfig, IngredientCostLine } from "@/domain/costing";

interface IngredientInput {
  ingredientId: string;
  inciName: string;
  percentage: number;
}

interface PriceData {
  ingredientId: string;
  pricePerKg: number;
  source: "user" | "seed";
}

export function calculateCOGS(
  ingredients: IngredientInput[],
  batchSizeG: number,
  prices: PriceData[],
  config: CostConfig
): CostBreakdown {
  const priceMap = new Map<string, PriceData>();
  for (const p of prices) {
    // User prices take precedence over seed
    const existing = priceMap.get(p.ingredientId);
    if (!existing || p.source === "user") {
      priceMap.set(p.ingredientId, p);
    }
  }

  const ingredientLines: IngredientCostLine[] = ingredients.map((ing) => {
    const weightG = batchSizeG * (ing.percentage / 100);
    const priceData = priceMap.get(ing.ingredientId);
    const pricePerKg = priceData?.pricePerKg ?? null;
    const lineCost = pricePerKg !== null ? (weightG / 1000) * pricePerKg : null;

    return {
      ingredientId: ing.ingredientId,
      inciName: ing.inciName,
      percentage: ing.percentage,
      weightG,
      pricePerKg,
      lineCost,
      priceSource: priceData?.source ?? "none",
    };
  });

  const totalIngredientCost = ingredientLines.reduce(
    (sum, line) => sum + (line.lineCost ?? 0),
    0
  );

  const laborCost = config.laborCostPerBatch;
  const unitsPerBatch = Math.max(config.unitsPerBatch, 1);
  const packagingCost = config.packagingCostPerUnit * unitsPerBatch;
  const overheadCost = totalIngredientCost * (config.overheadPercent / 100);

  const totalCOGS = totalIngredientCost + laborCost + packagingCost + overheadCost;
  const costPerUnit = totalCOGS / unitsPerBatch;

  const marginFraction = config.targetMarginPercent / 100;
  const suggestedWholesale =
    marginFraction < 1 ? costPerUnit / (1 - marginFraction) : costPerUnit * 2;
  const suggestedRetail = suggestedWholesale * 2;

  return {
    ingredientLines,
    totalIngredientCost,
    laborCost,
    packagingCost,
    overheadCost,
    totalCOGS,
    costPerUnit,
    suggestedWholesale,
    suggestedRetail,
  };
}
