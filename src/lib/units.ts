/**
 * Unit conversion + display helpers for the formula builder.
 *
 * Canonical storage is ALWAYS percent (in `formula_ingredients.percentage`)
 * and grams (in `formulas.target_batch_size_g`). The "unit mode" is purely
 * a UI preference — the user picks how they want to enter and read values
 * but the database is unchanged.
 *
 * Why this matters:
 *   - CNF filings + Health Canada labelling work in % w/w
 *   - INCI declaration order is by descending weight (i.e. by %)
 *   - Allergen disclosure thresholds are %
 * So the canonical layer must stay %. The maker's view is weight.
 *
 * Unit math:
 *   1 oz = 28.3495231 g (avoirdupois ounce, NOT troy)
 *   1 lb = 453.59237 g
 */

export type FormulaUnit = "percent" | "g" | "oz" | "lb";

const G_PER_OZ = 28.3495231;
const G_PER_LB = 453.59237;

export const UNIT_LABELS: Record<FormulaUnit, string> = {
  percent: "%",
  g: "g",
  oz: "oz",
  lb: "lb",
};

export const UNIT_VERBOSE: Record<FormulaUnit, string> = {
  percent: "Percentage",
  g: "Grams",
  oz: "Ounces",
  lb: "Pounds",
};

export const ALL_UNITS: FormulaUnit[] = ["percent", "g", "oz", "lb"];

/** Validate a string is a known unit. */
export function isFormulaUnit(value: unknown): value is FormulaUnit {
  return value === "percent" || value === "g" || value === "oz" || value === "lb";
}

/** Convert any weight unit to grams. percent → 0 (caller must handle). */
export function toGrams(value: number, unit: FormulaUnit): number {
  switch (unit) {
    case "g":
      return value;
    case "oz":
      return value * G_PER_OZ;
    case "lb":
      return value * G_PER_LB;
    case "percent":
      return 0;
  }
}

/** Convert grams to any weight unit. percent path returns 0 (caller must handle). */
export function fromGrams(grams: number, unit: FormulaUnit): number {
  switch (unit) {
    case "g":
      return grams;
    case "oz":
      return grams / G_PER_OZ;
    case "lb":
      return grams / G_PER_LB;
    case "percent":
      return 0;
  }
}

/**
 * Given a value the user entered in `unit` mode, what is the corresponding
 * percentage of the batch? Used when storing user input.
 *
 *   inputValue=150, unit='g', batchSizeG=500 → 30
 *   inputValue=4.5, unit='oz', batchSizeG=500 → ~25.5
 *   inputValue=25, unit='percent' → 25 (passthrough)
 */
export function inputToPercent(
  inputValue: number,
  unit: FormulaUnit,
  batchSizeG: number
): number {
  if (unit === "percent") return inputValue;
  if (batchSizeG <= 0) return 0;
  const grams = toGrams(inputValue, unit);
  return (grams / batchSizeG) * 100;
}

/**
 * Given a stored percentage and the current display unit, what is the
 * matching value to show in the input?
 *
 *   percentage=30, unit='g', batchSizeG=500 → 150
 *   percentage=25.5, unit='oz', batchSizeG=500 → ~4.5
 *   percentage=25, unit='percent' → 25 (passthrough)
 */
export function percentToDisplay(
  percentage: number,
  unit: FormulaUnit,
  batchSizeG: number
): number {
  if (unit === "percent") return percentage;
  const grams = (percentage / 100) * batchSizeG;
  return fromGrams(grams, unit);
}

/**
 * Format a number to the right number of decimals for its unit.
 * Percentages: 2 decimals (e.g. 0.001% allergen threshold matters)
 * Grams: 2 decimals (small ingredients matter)
 * Ounces / pounds: 3 decimals (small fractions matter)
 */
export function formatForUnit(value: number, unit: FormulaUnit): string {
  if (!isFinite(value)) return "—";
  switch (unit) {
    case "percent":
      return value.toFixed(2).replace(/\.?0+$/, "") || "0";
    case "g":
      return value.toFixed(2).replace(/\.?0+$/, "") || "0";
    case "oz":
    case "lb":
      return value.toFixed(3).replace(/\.?0+$/, "") || "0";
  }
}

/**
 * Render a percentage AND the equivalent weight in the chosen unit.
 *   formatBoth(30, 'g', 500)   → "30% (150g)"
 *   formatBoth(30, 'oz', 500)  → "30% (5.291oz)"
 *   formatBoth(30, 'percent')  → "30%"
 */
export function formatBoth(
  percentage: number,
  unit: FormulaUnit,
  batchSizeG: number
): string {
  const pct = `${formatForUnit(percentage, "percent")}%`;
  if (unit === "percent" || batchSizeG <= 0) return pct;
  const weight = percentToDisplay(percentage, unit, batchSizeG);
  return `${pct} (${formatForUnit(weight, unit)}${UNIT_LABELS[unit]})`;
}

/**
 * Render a "lb + oz" friendly display when batches cross the pound line.
 * Useful in totals where "1 lb 1.6 oz" reads better than "17.6 oz" or
 * "1.10 lb".
 */
export function formatPoundsAndOunces(grams: number): string {
  if (grams <= 0) return "0 lb";
  const totalOz = grams / G_PER_OZ;
  const lb = Math.floor(totalOz / 16);
  const oz = totalOz - lb * 16;
  if (lb === 0) return `${oz.toFixed(2).replace(/\.?0+$/, "")} oz`;
  if (oz < 0.05) return `${lb} lb`;
  return `${lb} lb ${oz.toFixed(2).replace(/\.?0+$/, "")} oz`;
}
