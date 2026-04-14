import type { ValidationIssue } from "@/domain/validation";

interface FormulaInput {
  name: string;
  usageType: string | null;
}

interface IngredientInput {
  id: string;
  ingredientId: string;
  inciName: string;
  percentage: number;
  hotlistStatus: string;
  hotlistMaxConcentration: number | null;
  hotlistConditions: string | null;
  usageTypeRestriction: string | null;
  isFragranceAllergen: boolean;
}

export function validateFormula(
  formula: FormulaInput,
  ingredients: IngredientInput[]
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  // 1. Formula name required
  if (!formula.name || formula.name.trim() === "" || formula.name === "Untitled Formula") {
    issues.push({
      code: "FORMULA_NAME_REQUIRED",
      field: "name",
      severity: "warning",
      message: "Give your formula a descriptive name.",
    });
  }

  // 2. At least one ingredient
  if (ingredients.length === 0) {
    issues.push({
      code: "NO_INGREDIENTS",
      field: "ingredients",
      severity: "error",
      message: "Add at least one ingredient to your formula.",
    });
    return issues; // No point checking further
  }

  // 3. Total percentage check (allow 99.5-100.5 for rounding tolerance)
  const total = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
  if (total < 99.5) {
    issues.push({
      code: "TOTAL_UNDER_100",
      field: "ingredients",
      severity: "error",
      message: `Total percentage is ${total.toFixed(1)}%. Must be ~100%.`,
    });
  } else if (total > 100.5) {
    issues.push({
      code: "TOTAL_OVER_100",
      field: "ingredients",
      severity: "error",
      message: `Total percentage is ${total.toFixed(1)}%. Must be ~100%.`,
    });
  }

  // Per-ingredient checks
  for (const ing of ingredients) {
    // 4. Percentage must be positive
    if (ing.percentage <= 0) {
      issues.push({
        code: "INVALID_PERCENTAGE",
        field: "percentage",
        severity: "error",
        message: `${ing.inciName}: percentage must be greater than 0.`,
        ingredientId: ing.ingredientId,
      });
    }

    // 5. Hotlist prohibited
    if (ing.hotlistStatus === "prohibited") {
      issues.push({
        code: "HOTLIST_PROHIBITED",
        field: "ingredient",
        severity: "error",
        message: `${ing.inciName} is prohibited by Health Canada and cannot be used.`,
        ingredientId: ing.ingredientId,
      });
    }

    // 6. Hotlist restricted — over max concentration
    if (
      ing.hotlistStatus === "restricted" &&
      ing.hotlistMaxConcentration != null &&
      ing.percentage > ing.hotlistMaxConcentration
    ) {
      issues.push({
        code: "HOTLIST_OVER_MAX",
        field: "percentage",
        severity: "error",
        message: `${ing.inciName} exceeds max ${ing.hotlistMaxConcentration}% (Health Canada restriction). Current: ${ing.percentage}%.`,
        ingredientId: ing.ingredientId,
      });
    }

    // 7. Usage type mismatch
    if (
      ing.usageTypeRestriction === "rinse-off" &&
      formula.usageType === "leave-on"
    ) {
      issues.push({
        code: "USAGE_TYPE_MISMATCH",
        field: "ingredient",
        severity: "error",
        message: `${ing.inciName} is restricted to rinse-off products only, but this formula is leave-on.`,
        ingredientId: ing.ingredientId,
      });
    }

    // 8. Fragrance allergen disclosure info
    if (ing.isFragranceAllergen) {
      const threshold = formula.usageType === "leave-on" ? 0.001 : 0.01;
      if (ing.percentage > threshold) {
        issues.push({
          code: "ALLERGEN_DISCLOSURE",
          field: "ingredient",
          severity: "info",
          message: `${ing.inciName} is a fragrance allergen above the disclosure threshold (${threshold}%). Must be individually named on the label.`,
          ingredientId: ing.ingredientId,
        });
      }
    }
  }

  return issues;
}
