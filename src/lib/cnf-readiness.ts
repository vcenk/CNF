export type ReadinessSeverity = "ok" | "info" | "warning" | "error";

export type UsageType = "leave-on" | "rinse-off";

export type LabelLanguage = "bilingual" | "english_only" | "unknown";

export type ProductCategory =
  | "skincare_leave_on"
  | "skincare_rinse_off"
  | "soap_bar"
  | "body_butter"
  | "scrub"
  | "bath_bomb"
  | "hair_care"
  | "lip_care"
  | "deodorant"
  | "perfume"
  | "other";

export interface ReadinessInput {
  productName: string;
  productCategory: ProductCategory | "";
  usageType: UsageType | "";
  ingredientList: string;
  companyName: string;
  companyAddress: string;
  claims: string;
  labelLanguage: LabelLanguage;
}

export interface ParsedIngredient {
  raw: string;
  inciCandidate: string;
  percentage: number | null;
}

export interface IngredientLookupResult {
  inci_name: string;
  common_name: string | null;
  slug: string | null;
  hotlist_status: "prohibited" | "restricted" | "not_listed" | string;
  hotlist_max_concentration: number | null;
  hotlist_conditions: string | null;
  usage_type_restriction: string | null;
  is_fragrance_allergen: boolean | null;
}

export interface IngredientFlag {
  raw: string;
  inciCandidate: string;
  matched: boolean;
  match?: IngredientLookupResult;
  percentage: number | null;
  severity: ReadinessSeverity;
  message: string;
  slug?: string | null;
}

export interface ReadinessSection {
  heading: string;
  items: ReadinessItem[];
}

export interface ReadinessItem {
  severity: ReadinessSeverity;
  label: string;
  detail?: string;
}

export interface ReadinessReport {
  productName: string;
  generatedAt: string;
  sections: ReadinessSection[];
  ingredientFlags: IngredientFlag[];
  nextSteps: string[];
  summary: {
    okCount: number;
    infoCount: number;
    warningCount: number;
    errorCount: number;
    totalChecks: number;
  };
}

const CLAIM_RISK_PATTERNS: Array<{ pattern: RegExp; label: string; severity: ReadinessSeverity }> = [
  { pattern: /\b(cures?|cured|curing)\b/i, label: '"cure" claims may move the product into drug territory', severity: "error" },
  { pattern: /\b(treats?|treated|treating|treatment for)\b/i, label: '"treat/treatment" wording often crosses into drug claims', severity: "error" },
  { pattern: /\b(prevents?|prevention)\b/i, label: '"prevent" wording can imply drug-style efficacy', severity: "warning" },
  { pattern: /\b(heals?|healing)\b/i, label: '"heal" wording often reads as a therapeutic claim', severity: "warning" },
  { pattern: /\b(antibacterial|antimicrobial|antifungal|antiviral)\b/i, label: "antimicrobial claims usually require drug or NHP regulation", severity: "error" },
  { pattern: /\b(eczema|psoriasis|acne|rosacea|dermatitis)\b/i, label: "naming a medical condition typically requires drug or NHP regulation", severity: "error" },
  { pattern: /\b(sunscreen|sun protection|spf|uv protection)\b/i, label: "sunscreen claims fall under sunscreen drug regulation, not cosmetic notification", severity: "error" },
  { pattern: /\b(anti-?aging|reverses? wrinkles|reverses? signs of aging)\b/i, label: '"anti-aging / reverses wrinkles" claims often need substantiation and may be challenged', severity: "warning" },
  { pattern: /\b(weight loss|cellulite removal|fat burning)\b/i, label: "body composition claims usually need drug or NHP regulation", severity: "error" },
  { pattern: /\b(clinically proven|doctor recommended|fda approved|health canada approved)\b/i, label: "regulator-endorsement wording is typically not allowed for cosmetics", severity: "error" },
  { pattern: /\b(organic|natural|chemical[- ]free)\b/i, label: '"organic / natural / chemical-free" wording can be challenged without certification or qualification', severity: "info" },
];

export function parseIngredientList(raw: string): ParsedIngredient[] {
  if (!raw || raw.trim().length === 0) return [];

  const normalized = raw
    .replace(/\r/g, "")
    .replace(/[•·]/g, ",")
    .replace(/\bingredients?\s*[:\-]\s*/i, "");

  const parts = normalized
    .split(/[\n,;]/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  return parts.map((part) => {
    const pctMatch = part.match(/(\d+(?:\.\d+)?)\s*%/);
    const percentage = pctMatch ? parseFloat(pctMatch[1]) : null;

    const cleaned = part
      .replace(/\(.*?\)/g, "")
      .replace(/\d+(?:\.\d+)?\s*%/g, "")
      .replace(/^[-*\d.\s]+/, "")
      .replace(/\s+/g, " ")
      .trim();

    return {
      raw: part,
      inciCandidate: cleaned,
      percentage,
    };
  });
}

export function buildReadinessReport(
  input: ReadinessInput,
  parsed: ParsedIngredient[],
  matches: Map<string, IngredientLookupResult>
): ReadinessReport {
  const ingredientFlags: IngredientFlag[] = parsed.map((p) => {
    const key = p.inciCandidate.toLowerCase();
    const match = matches.get(key);

    if (!match) {
      return {
        raw: p.raw,
        inciCandidate: p.inciCandidate,
        matched: false,
        percentage: p.percentage,
        severity: "warning",
        message:
          "Not matched in the FormulaNorth ingredient database. Confirm the INCI name with your supplier before notification.",
      };
    }

    if (match.hotlist_status === "prohibited") {
      return {
        raw: p.raw,
        inciCandidate: p.inciCandidate,
        matched: true,
        match,
        percentage: p.percentage,
        severity: "error",
        message: "Prohibited under the Health Canada Cosmetic Ingredient Hotlist. Reformulate before notification.",
        slug: match.slug,
      };
    }

    if (match.hotlist_status === "restricted") {
      const overMax =
        p.percentage !== null &&
        match.hotlist_max_concentration !== null &&
        p.percentage > match.hotlist_max_concentration;

      const usageMismatch =
        match.usage_type_restriction === "rinse-off" && input.usageType === "leave-on";

      // Lead with the specific rule that's broken, then add context.
      const leadParts: string[] = [];
      if (overMax && match.hotlist_max_concentration != null) {
        leadParts.push(
          `EXCEEDS MAX: ${p.percentage}% in formula vs ${match.hotlist_max_concentration}% allowed.`
        );
      }
      if (usageMismatch) {
        leadParts.push(
          `WRONG USE TYPE: this product is leave-on but the ingredient is restricted to rinse-off only.`
        );
      }

      let detail =
        leadParts.length > 0 ? leadParts.join(" ") : "Restricted ingredient.";
      if (!overMax && match.hotlist_max_concentration != null) {
        detail += ` Max ${match.hotlist_max_concentration}%.`;
      }
      if (!usageMismatch && match.usage_type_restriction) {
        detail += ` Use type: ${match.usage_type_restriction} only.`;
      }
      if (match.hotlist_conditions) {
        detail += ` ${match.hotlist_conditions}`;
      }

      const severity: ReadinessSeverity = overMax || usageMismatch ? "error" : "warning";

      return {
        raw: p.raw,
        inciCandidate: p.inciCandidate,
        matched: true,
        match,
        percentage: p.percentage,
        severity,
        message: detail,
        slug: match.slug,
      };
    }

    if (match.is_fragrance_allergen && p.percentage != null) {
      const threshold = input.usageType === "leave-on" ? 0.001 : 0.01;
      if (p.percentage > threshold) {
        return {
          raw: p.raw,
          inciCandidate: p.inciCandidate,
          matched: true,
          match,
          percentage: p.percentage,
          severity: "info",
          message: `Fragrance allergen above the ${threshold}% disclosure threshold for ${input.usageType || "this product type"}. Disclose individually on the label.`,
          slug: match.slug,
        };
      }
    }

    return {
      raw: p.raw,
      inciCandidate: p.inciCandidate,
      matched: true,
      match,
      percentage: p.percentage,
      severity: "ok",
      message: "Matched in database. No hotlist issues found.",
      slug: match.slug,
    };
  });

  const sections: ReadinessSection[] = [];

  // Required fields
  const required: ReadinessItem[] = [];
  required.push(
    input.productName.trim()
      ? { severity: "ok", label: "Product name supplied" }
      : { severity: "error", label: "Product name is missing", detail: "Add a product name as it would appear on the label." }
  );
  required.push(
    input.productCategory
      ? { severity: "ok", label: "Product category selected" }
      : { severity: "error", label: "Product category is missing", detail: "Pick the closest category." }
  );
  required.push(
    input.usageType
      ? { severity: "ok", label: `Usage type: ${input.usageType}` }
      : { severity: "error", label: "Usage type not selected", detail: "Pick leave-on or rinse-off — it changes which restrictions apply." }
  );
  required.push(
    input.companyName.trim()
      ? { severity: "ok", label: "Company name supplied" }
      : { severity: "error", label: "Company name is missing", detail: "Health Canada requires a responsible business identity." }
  );
  required.push(
    input.companyAddress.trim()
      ? { severity: "ok", label: "Company address supplied" }
      : { severity: "error", label: "Company address is missing", detail: "Add the mailing address that will appear on the label." }
  );
  required.push(
    parsed.length > 0
      ? { severity: "ok", label: `Ingredient list provided (${parsed.length} entries)` }
      : { severity: "error", label: "Ingredient list is empty", detail: "Paste your full ingredient list in INCI form." }
  );
  sections.push({ heading: "Required CNF inputs", items: required });

  // Ingredient flags summary
  const ingredientItems: ReadinessItem[] = [];
  const errorIngredients = ingredientFlags.filter((f) => f.severity === "error");
  const warningIngredients = ingredientFlags.filter((f) => f.severity === "warning");
  const infoIngredients = ingredientFlags.filter((f) => f.severity === "info");
  const okIngredients = ingredientFlags.filter((f) => f.severity === "ok");

  if (errorIngredients.length > 0) {
    ingredientItems.push({
      severity: "error",
      label: `${errorIngredients.length} ingredient(s) with blocking issues`,
      detail: "Review each flagged ingredient below before notification.",
    });
  }
  if (warningIngredients.length > 0) {
    ingredientItems.push({
      severity: "warning",
      label: `${warningIngredients.length} ingredient(s) need follow-up`,
      detail: "Confirm INCI naming with your supplier and check restrictions.",
    });
  }
  if (infoIngredients.length > 0) {
    ingredientItems.push({
      severity: "info",
      label: `${infoIngredients.length} fragrance allergen disclosure reminder(s)`,
      detail: "Individually name allergens above the disclosure threshold on the label.",
    });
  }
  if (okIngredients.length > 0 && errorIngredients.length === 0 && warningIngredients.length === 0) {
    ingredientItems.push({
      severity: "ok",
      label: `${okIngredients.length} ingredient(s) matched without flags`,
    });
  }

  if (parsed.length > 0) {
    if (input.usageType) {
      ingredientItems.push({
        severity: "ok",
        label: `Usage type ${input.usageType} applied to ingredient checks`,
      });
    }

    const totalPercent = parsed
      .map((p) => p.percentage ?? 0)
      .reduce((a, b) => a + b, 0);
    const allHadPct = parsed.every((p) => p.percentage !== null);
    if (allHadPct) {
      if (totalPercent < 99.5 || totalPercent > 100.5) {
        ingredientItems.push({
          severity: "warning",
          label: `Ingredient percentages total ${totalPercent.toFixed(2)}%`,
          detail: "Should sum to ~100%. Review your formula totals.",
        });
      } else {
        ingredientItems.push({
          severity: "ok",
          label: `Ingredient percentages total ${totalPercent.toFixed(2)}%`,
        });
      }
    } else if (parsed.some((p) => p.percentage !== null)) {
      ingredientItems.push({
        severity: "info",
        label: "Some ingredients are missing percentages",
        detail: "Provide percentages for every ingredient when filing the CNF.",
      });
    }
  }

  if (ingredientItems.length === 0) {
    ingredientItems.push({
      severity: "info",
      label: "No ingredient analysis performed",
      detail: "Paste your ingredient list to see hotlist and naming flags.",
    });
  }
  sections.push({ heading: "Ingredient readiness", items: ingredientItems });

  // Label readiness
  const labelItems: ReadinessItem[] = [];
  if (input.labelLanguage === "bilingual") {
    labelItems.push({ severity: "ok", label: "Label content planned bilingually (EN/FR)" });
  } else if (input.labelLanguage === "english_only") {
    labelItems.push({
      severity: "warning",
      label: "Label is English-only",
      detail: "Required label content generally needs to appear in both English and French in Canada.",
    });
  } else {
    labelItems.push({
      severity: "warning",
      label: "Label language not confirmed",
      detail: "Confirm bilingual EN/FR content before printing packaging.",
    });
  }

  if (input.companyName.trim() && input.companyAddress.trim()) {
    labelItems.push({ severity: "ok", label: "Business identity available for the label" });
  } else {
    labelItems.push({
      severity: "warning",
      label: "Label needs business identity (name + address)",
    });
  }

  if (input.productName.trim()) {
    labelItems.push({ severity: "ok", label: "Product identity supplied" });
  } else {
    labelItems.push({
      severity: "warning",
      label: "Label needs product identity (what the product is)",
    });
  }

  labelItems.push({
    severity: "info",
    label: "Net quantity is required on the principal display panel",
    detail: "Use metric units. Plan a small buffer for products that vary by weight.",
  });
  sections.push({ heading: "Label readiness reminders", items: labelItems });

  // Claim risks
  const claimItems: ReadinessItem[] = [];
  if (input.claims.trim().length === 0) {
    claimItems.push({
      severity: "info",
      label: "No claims provided",
      detail: "Add the marketing claims that will appear on packaging or your shop page so they can be reviewed.",
    });
  } else {
    let flagged = 0;
    for (const rule of CLAIM_RISK_PATTERNS) {
      if (rule.pattern.test(input.claims)) {
        flagged++;
        claimItems.push({
          severity: rule.severity,
          label: rule.label,
          detail: "Reword to keep the product within cosmetic regulation, or evaluate switching to drug/NHP regulation if appropriate.",
        });
      }
    }
    if (flagged === 0) {
      claimItems.push({
        severity: "ok",
        label: "No common drug-style claim wording detected",
        detail: "Always review claims with someone familiar with cosmetic vs drug/NHP boundaries before launch.",
      });
    }
  }
  sections.push({ heading: "Claim risk reminders", items: claimItems });

  const summary = {
    okCount: 0,
    infoCount: 0,
    warningCount: 0,
    errorCount: 0,
    totalChecks: 0,
  };
  for (const section of sections) {
    for (const item of section.items) {
      summary.totalChecks++;
      if (item.severity === "ok") summary.okCount++;
      else if (item.severity === "info") summary.infoCount++;
      else if (item.severity === "warning") summary.warningCount++;
      else if (item.severity === "error") summary.errorCount++;
    }
  }
  for (const flag of ingredientFlags) {
    summary.totalChecks++;
    if (flag.severity === "ok") summary.okCount++;
    else if (flag.severity === "info") summary.infoCount++;
    else if (flag.severity === "warning") summary.warningCount++;
    else if (flag.severity === "error") summary.errorCount++;
  }

  const nextSteps: string[] = [];
  if (summary.errorCount > 0) {
    nextSteps.push("Resolve every error flag — these block a clean CNF submission.");
  }
  if (warningIngredients.length > 0) {
    nextSteps.push("Confirm INCI names with suppliers for every unmatched ingredient.");
  }
  if (input.labelLanguage !== "bilingual") {
    nextSteps.push("Plan bilingual (EN/FR) label content before printing packaging.");
  }
  if (errorIngredients.length === 0 && warningIngredients.length === 0 && summary.errorCount === 0) {
    nextSteps.push("Save this product as a FormulaNorth formula to keep your prep organized.");
    nextSteps.push("Generate a CNF preparation package when your label and costing are finalized.");
  } else {
    nextSteps.push("Re-run this check after addressing each flag — it is meant to be iterative.");
  }
  nextSteps.push("Verify findings against the current Health Canada Cosmetic Regulations and Hotlist before notifying.");

  return {
    productName: input.productName.trim() || "Untitled product",
    generatedAt: new Date().toISOString(),
    sections,
    ingredientFlags,
    nextSteps,
    summary,
  };
}

export const PRODUCT_CATEGORY_OPTIONS: Array<{ value: ProductCategory; label: string; defaultUsage: UsageType }> = [
  { value: "skincare_leave_on", label: "Leave-on skincare (lotion, serum, balm)", defaultUsage: "leave-on" },
  { value: "skincare_rinse_off", label: "Rinse-off skincare (cleanser, mask)", defaultUsage: "rinse-off" },
  { value: "soap_bar", label: "Soap bar", defaultUsage: "rinse-off" },
  { value: "body_butter", label: "Body butter", defaultUsage: "leave-on" },
  { value: "scrub", label: "Scrub", defaultUsage: "rinse-off" },
  { value: "bath_bomb", label: "Bath bomb / bath product", defaultUsage: "rinse-off" },
  { value: "hair_care", label: "Hair care (shampoo, conditioner, bar)", defaultUsage: "rinse-off" },
  { value: "lip_care", label: "Lip care", defaultUsage: "leave-on" },
  { value: "deodorant", label: "Deodorant (cosmetic, not antiperspirant)", defaultUsage: "leave-on" },
  { value: "perfume", label: "Perfume / body spray", defaultUsage: "leave-on" },
  { value: "other", label: "Other cosmetic product", defaultUsage: "leave-on" },
];
