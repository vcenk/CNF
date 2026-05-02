/**
 * Pure-logic fragrance allergen calculator.
 *
 * Math: a fragrance/essential oil isn't a single ingredient — it's a
 * blend that contains regulated EU/Canadian fragrance allergens
 * (Linalool, Limonene, Eugenol, Citronellol, etc.) at known
 * percentages. To know if you must declare an allergen on the label
 * or CNF, you compute its percentage of the FINISHED product.
 *
 *   finished_product_pct(allergen)
 *     = SUM over all fragrance entries:
 *         (entry.usage_pct_in_formula / 100) × (entry.allergen_pct_in_oil / 100) × 100
 *     = SUM ( entry.usage_pct × entry.allergen_pct ) / 100
 *
 * Example:
 *   Lavender FO @ 5% in formula, 8% Linalool in the FO
 *   Linalool in finished product = 5 × 8 / 100 = 0.4%
 *
 * Disclosure thresholds (Canadian Cosmetic Regulations Section 21.4
 * via EU Annex III):
 *   leave-on:  > 0.001% (10 ppm)
 *   rinse-off: > 0.01%  (100 ppm)
 *
 * Below the threshold, the allergen can stay grouped under "Parfum".
 * Above the threshold, it must be individually named on the label
 * AND in the CNF ingredient list.
 */

export type ProductType = "leave-on" | "rinse-off";

export interface AllergenInOil {
  /** INCI name of the allergen, e.g. "Linalool" */
  inciName: string;
  /** Percentage of this allergen in the fragrance/EO (0-100) */
  percentInOil: number;
}

export interface FragranceEntry {
  /** UI display name — supplier label, EO name, etc. Not regulated. */
  name: string;
  /** Percentage of this fragrance in the finished formula (0-100) */
  usagePercentInFormula: number;
  /** Allergen breakdown sourced from supplier IFRA cert or preset */
  allergens: AllergenInOil[];
}

export interface AllergenResult {
  inciName: string;
  /** Total finished-product percentage (sum across all fragrance entries) */
  finishedProductPercent: number;
  /** True when finishedProductPercent > threshold for the product type */
  exceedsThreshold: boolean;
  /** The actual threshold value applied (0.001 or 0.01) */
  threshold: number;
  /** Per-fragrance contribution, ordered descending */
  contributions: Array<{
    fragranceName: string;
    fragranceUsagePercent: number;
    allergenPercentInOil: number;
    finishedProductContribution: number;
  }>;
}

export interface CalculatorOutput {
  productType: ProductType;
  threshold: number;
  /** All allergens detected, ordered: above-threshold first, then by descending finished-product % */
  allergens: AllergenResult[];
  /** Just the INCI names that need label disclosure, in label-ready order */
  disclosedInciNames: string[];
  /** A fragment ready to paste after "Parfum," on the ingredient list */
  labelDisclosureText: string;
  /** Total fragrance load (sum of all entries' usage %) — sanity check */
  totalFragrancePercent: number;
}

const LEAVE_ON_THRESHOLD = 0.001;
const RINSE_OFF_THRESHOLD = 0.01;

export function getThreshold(productType: ProductType): number {
  return productType === "leave-on" ? LEAVE_ON_THRESHOLD : RINSE_OFF_THRESHOLD;
}

/**
 * Normalize an INCI name so different casings of "linalool" /
 * "Linalool" / "LINALOOL" map to the same allergen entry.
 */
function normalizeInci(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/**
 * Title-case the INCI for label output. Preserves common Greek
 * prefixes like "alpha-", "beta-" lowercase.
 */
function displayInci(name: string): string {
  const lower = name.trim().toLowerCase();
  // Words that should stay lowercase per INCI convention
  const keepLower = new Set(["alpha", "beta", "gamma", "delta", "cis", "trans"]);
  return lower
    .split(/(\s+|-)/)
    .map((token) => {
      if (token.match(/^\s+$/) || token === "-") return token;
      if (keepLower.has(token)) return token;
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join("");
}

export function calculateAllergens(
  entries: FragranceEntry[],
  productType: ProductType
): CalculatorOutput {
  const threshold = getThreshold(productType);

  // Aggregate by normalized INCI
  type AggRow = {
    canonicalName: string;
    finishedProductPercent: number;
    contributions: AllergenResult["contributions"];
  };
  const aggregated = new Map<string, AggRow>();

  let totalFragrancePercent = 0;

  for (const entry of entries) {
    const usage = Math.max(0, Number(entry.usagePercentInFormula) || 0);
    if (usage <= 0) continue;
    totalFragrancePercent += usage;

    for (const a of entry.allergens) {
      const allergenPct = Math.max(0, Number(a.percentInOil) || 0);
      if (allergenPct <= 0) continue;

      const contribution = (usage * allergenPct) / 100; // %  in finished
      const key = normalizeInci(a.inciName);
      if (!key) continue;

      const existing = aggregated.get(key);
      if (existing) {
        existing.finishedProductPercent += contribution;
        existing.contributions.push({
          fragranceName: entry.name || "Unnamed fragrance",
          fragranceUsagePercent: usage,
          allergenPercentInOil: allergenPct,
          finishedProductContribution: contribution,
        });
      } else {
        aggregated.set(key, {
          canonicalName: displayInci(a.inciName),
          finishedProductPercent: contribution,
          contributions: [
            {
              fragranceName: entry.name || "Unnamed fragrance",
              fragranceUsagePercent: usage,
              allergenPercentInOil: allergenPct,
              finishedProductContribution: contribution,
            },
          ],
        });
      }
    }
  }

  const allergens: AllergenResult[] = Array.from(aggregated.values())
    .map((row) => ({
      inciName: row.canonicalName,
      finishedProductPercent: row.finishedProductPercent,
      exceedsThreshold: row.finishedProductPercent > threshold,
      threshold,
      contributions: row.contributions.sort(
        (a, b) =>
          b.finishedProductContribution - a.finishedProductContribution
      ),
    }))
    .sort((a, b) => {
      // Above-threshold first, then by descending finished-product %
      if (a.exceedsThreshold !== b.exceedsThreshold) {
        return a.exceedsThreshold ? -1 : 1;
      }
      return b.finishedProductPercent - a.finishedProductPercent;
    });

  const disclosed = allergens.filter((a) => a.exceedsThreshold);
  const disclosedInciNames = disclosed.map((a) => a.inciName);
  const labelDisclosureText = disclosedInciNames.join(", ");

  return {
    productType,
    threshold,
    allergens,
    disclosedInciNames,
    labelDisclosureText,
    totalFragrancePercent,
  };
}

/** Format a percentage for display (handles very small values gracefully). */
export function formatAllergenPercent(value: number): string {
  if (!isFinite(value) || value <= 0) return "0%";
  if (value >= 1) return `${value.toFixed(2).replace(/\.?0+$/, "")}%`;
  if (value >= 0.01) return `${value.toFixed(3).replace(/\.?0+$/, "")}%`;
  if (value >= 0.001) return `${value.toFixed(4).replace(/\.?0+$/, "")}%`;
  return `${value.toFixed(5).replace(/\.?0+$/, "")}%`;
}
