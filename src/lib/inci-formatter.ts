export interface FormatterIngredient {
  raw: string;
  inci: string;
  percentage: number | null;
}

export interface FormatterResult {
  cleaned: FormatterIngredient[];
  ordered: FormatterIngredient[];
  notes: string[];
  warnings: string[];
  formattedList: string;
}

const COLOUR_PATTERNS = [/^ci\s*\d+/i, /^d&c\s+/i, /\bmica\b/i, /\biron oxides?\b/i];

const FRAGRANCE_ALIASES = [/^parfum$/i, /^fragrance$/i];

export function formatInciList(input: string): FormatterResult {
  if (!input.trim()) {
    return {
      cleaned: [],
      ordered: [],
      notes: [],
      warnings: ["Paste an ingredient list to format it."],
      formattedList: "",
    };
  }

  const normalized = input
    .replace(/\r/g, "")
    .replace(/[•·]/g, ",")
    .replace(/\bingredients?\s*[:\-]\s*/i, "");

  const parts = normalized
    .split(/[\n,;]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  const cleaned: FormatterIngredient[] = parts.map((part) => {
    const pctMatch = part.match(/(\d+(?:\.\d+)?)\s*%/);
    const percentage = pctMatch ? parseFloat(pctMatch[1]) : null;

    const inci = part
      .replace(/\(.*?\)/g, "")
      .replace(/\d+(?:\.\d+)?\s*%/g, "")
      .replace(/^[-*\d.\s]+/, "")
      .replace(/\s+/g, " ")
      .trim();

    const titleCased = inci
      .split(" ")
      .map((word) =>
        word.length > 0
          ? /^[A-Z]+\d*$/.test(word) // CAPS or CAPS123 stay
            ? word
            : word[0].toUpperCase() + word.slice(1).toLowerCase()
          : word
      )
      .join(" ");

    return { raw: part, inci: titleCased, percentage };
  });

  const allHavePct = cleaned.length > 0 && cleaned.every((c) => c.percentage !== null);

  let ordered = cleaned;
  if (allHavePct) {
    const above = cleaned.filter((c) => (c.percentage ?? 0) > 1);
    const below = cleaned.filter((c) => (c.percentage ?? 0) <= 1);
    above.sort((a, b) => (b.percentage ?? 0) - (a.percentage ?? 0));
    ordered = [...above, ...below];
  }

  const notes: string[] = [];
  const warnings: string[] = [];

  if (allHavePct) {
    notes.push(
      "Ingredients above 1% are sorted in descending order. Ingredients at 1% or less can appear in any order after them."
    );
    const total = cleaned.reduce((sum, c) => sum + (c.percentage ?? 0), 0);
    if (total < 99.5 || total > 100.5) {
      warnings.push(`Percentages total ${total.toFixed(2)}% — should sum to ~100%.`);
    } else {
      notes.push(`Percentages total ${total.toFixed(2)}% — within tolerance.`);
    }
  } else if (cleaned.some((c) => c.percentage !== null)) {
    warnings.push(
      "Some ingredients are missing percentages. Add percentages for every ingredient to enable descending-order sorting."
    );
  } else {
    notes.push(
      "No percentages provided. The list is shown in input order — review manually for descending-order accuracy."
    );
  }

  const fragrance = cleaned.find((c) => FRAGRANCE_ALIASES.some((p) => p.test(c.inci)));
  if (fragrance) {
    notes.push(
      "Fragrance / Parfum present: individual fragrance allergens above the disclosure threshold need to be named on the label."
    );
  }

  const colours = cleaned.filter((c) => COLOUR_PATTERNS.some((p) => p.test(c.inci)));
  if (colours.length > 0) {
    notes.push(
      "Colour additives can be grouped at the end of the ingredient list (after non-colour ingredients)."
    );
  }

  for (const item of cleaned) {
    if (/oil$/i.test(item.inci) && !/\(/.test(item.raw) && !/\b[a-z]+\s+(?:nucifera|vera|paradisi|amygdalus|sativa)\b/i.test(item.inci)) {
      // Likely a common-name oil rather than INCI; flag if "Coconut Oil" but not "Cocos Nucifera (Coconut) Oil"
      if (!/(cocos|simmondsia|olea|prunus|persea|argania|butyrospermum|theobroma)/i.test(item.inci)) {
        warnings.push(
          `"${item.inci}" may be a common name. INCI for plant oils is usually the Latin botanical name with the common name in parentheses, e.g. "Cocos Nucifera (Coconut) Oil".`
        );
      }
    }
  }

  notes.push("Required Canadian cosmetic labels list ingredients using INCI names. Confirm each name with your supplier's spec sheet.");

  const formattedList = ordered.map((c) => c.inci).join(", ");

  return { cleaned, ordered, notes, warnings, formattedList };
}
