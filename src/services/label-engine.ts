/**
 * Label engine — pure functions for generating compliant Canadian cosmetic label data.
 *
 * Rules:
 * - INCI names in descending order of concentration (above 1%)
 * - Ingredients at or below 1% can be listed in any order after the above-1% ingredients
 * - "May contain" (+/-) variants appended after base ingredients
 * - Fragrance allergens disclosed individually when above threshold:
 *   - Rinse-off: > 0.01% (100 ppm)
 *   - Leave-on: > 0.001% (10 ppm)
 */

interface IngredientInput {
  inciName: string;
  percentage: number;
  isFragranceAllergen: boolean;
}

interface VariantIngredientInput {
  inciName: string;
}

export function generateInciList(
  ingredients: IngredientInput[],
  variants?: VariantIngredientInput[]
): { base: string[]; mayContain: string[] } {
  // Split into above-1% and at-or-below-1%
  const above1 = ingredients
    .filter((i) => i.percentage > 1)
    .sort((a, b) => b.percentage - a.percentage)
    .map((i) => i.inciName);

  const atOrBelow1 = ingredients
    .filter((i) => i.percentage <= 1)
    .map((i) => i.inciName);

  const base = [...above1, ...atOrBelow1];

  // May-contain from variants (ingredients not already in base)
  const baseSet = new Set(base.map((n) => n.toLowerCase()));
  const mayContain = (variants ?? [])
    .map((v) => v.inciName)
    .filter((name) => !baseSet.has(name.toLowerCase()));

  return { base, mayContain };
}

export function getFragranceAllergenDisclosure(
  ingredients: IngredientInput[],
  usageType: "rinse-off" | "leave-on" | null
): string[] {
  const threshold = usageType === "leave-on" ? 0.001 : 0.01;

  return ingredients
    .filter((i) => i.isFragranceAllergen && i.percentage > threshold)
    .sort((a, b) => b.percentage - a.percentage)
    .map((i) => i.inciName);
}

interface WarningRule {
  check: (ingredients: IngredientInput[], usageType: string | null) => boolean;
  en: string;
  fr: string;
}

const warningRules: WarningRule[] = [
  {
    check: (ings) =>
      ings.some((i) =>
        ["Glycolic Acid", "Lactic Acid", "Citric Acid"].some(
          (name) => i.inciName.toLowerCase() === name.toLowerCase() && i.percentage > 3
        )
      ),
    en: "Contains alpha hydroxy acid (AHA). Use sunscreen. Avoid sun exposure.",
    fr: "Contient un acide alpha-hydroxylé (AHA). Utilisez un écran solaire. Évitez l'exposition au soleil.",
  },
  {
    check: (ings) =>
      ings.some(
        (i) => i.inciName.toLowerCase() === "salicylic acid" && i.percentage > 0.5
      ),
    en: "Contains salicylic acid. For external use only.",
    fr: "Contient de l'acide salicylique. Pour usage externe seulement.",
  },
  {
    check: (ings) =>
      ings.some(
        (i) => i.inciName.toLowerCase() === "benzoyl peroxide"
      ),
    en: "For external use only. Avoid contact with eyes, lips, and mucous membranes.",
    fr: "Pour usage externe seulement. Évitez le contact avec les yeux, les lèvres et les muqueuses.",
  },
  {
    check: (ings) =>
      ings.some(
        (i) =>
          i.inciName.toLowerCase() === "hydrogen peroxide" &&
          i.percentage > 3
      ),
    en: "Contains hydrogen peroxide. For external use only. Avoid contact with eyes.",
    fr: "Contient du peroxyde d'hydrogène. Pour usage externe seulement. Évitez le contact avec les yeux.",
  },
  {
    check: (ings, usageType) =>
      usageType === "rinse-off" &&
      ings.some(
        (i) =>
          i.inciName.toLowerCase().includes("sulfate") &&
          i.percentage > 5
      ),
    en: "Avoid contact with eyes. In case of contact, rinse thoroughly with water.",
    fr: "Évitez le contact avec les yeux. En cas de contact, rincez abondamment à l'eau.",
  },
];

export function generateWarnings(
  ingredients: IngredientInput[],
  usageType: string | null
): { en: string[]; fr: string[] } {
  const en: string[] = [];
  const fr: string[] = [];

  for (const rule of warningRules) {
    if (rule.check(ingredients, usageType)) {
      en.push(rule.en);
      fr.push(rule.fr);
    }
  }

  return { en, fr };
}
