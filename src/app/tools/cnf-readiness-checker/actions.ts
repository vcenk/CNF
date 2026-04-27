"use server";

import { createClient } from "@/lib/supabase/server";
import {
  buildReadinessReport,
  parseIngredientList,
  type IngredientLookupResult,
  type LabelLanguage,
  type ProductCategory,
  type ReadinessInput,
  type ReadinessReport,
  type UsageType,
} from "@/lib/cnf-readiness";

export interface CheckerActionState {
  status: "idle" | "ok" | "error";
  report?: ReadinessReport;
  inputEcho?: ReadinessInput;
  errorMessage?: string;
}

export async function runReadinessCheck(
  _prev: CheckerActionState,
  formData: FormData
): Promise<CheckerActionState> {
  const input: ReadinessInput = {
    productName: String(formData.get("productName") ?? "").trim(),
    productCategory: (String(formData.get("productCategory") ?? "") || "") as ProductCategory | "",
    usageType: (String(formData.get("usageType") ?? "") || "") as UsageType | "",
    ingredientList: String(formData.get("ingredientList") ?? ""),
    companyName: String(formData.get("companyName") ?? "").trim(),
    companyAddress: String(formData.get("companyAddress") ?? "").trim(),
    claims: String(formData.get("claims") ?? "").trim(),
    labelLanguage: (String(formData.get("labelLanguage") ?? "unknown") || "unknown") as LabelLanguage,
  };

  const parsed = parseIngredientList(input.ingredientList);
  const matches = new Map<string, IngredientLookupResult>();

  if (parsed.length > 0) {
    try {
      const supabase = await createClient();
      const candidates = Array.from(
        new Set(parsed.map((p) => p.inciCandidate).filter((c) => c.length > 1))
      );

      if (candidates.length > 0) {
        const orFilter = candidates
          .map((c) => {
            const escaped = c.replace(/[(),]/g, " ").replace(/\s+/g, " ").trim();
            return `inci_name.ilike.${escaped},common_name.ilike.${escaped}`;
          })
          .join(",");

        const { data, error } = await supabase
          .from("ingredients")
          .select(
            "inci_name, common_name, slug, hotlist_status, hotlist_max_concentration, hotlist_conditions, usage_type_restriction, is_fragrance_allergen"
          )
          .or(orFilter);

        if (error) {
          console.error("Readiness ingredient lookup failed", error);
        } else if (data) {
          for (const row of data as IngredientLookupResult[]) {
            const inciKey = row.inci_name?.toLowerCase();
            const commonKey = row.common_name?.toLowerCase();
            for (const candidate of candidates) {
              const key = candidate.toLowerCase();
              if (inciKey === key || commonKey === key) {
                matches.set(key, row);
              }
            }
          }
        }
      }
    } catch (err) {
      console.error("Readiness lookup threw", err);
    }
  }

  const report = buildReadinessReport(input, parsed, matches);

  return {
    status: "ok",
    report,
    inputEcho: input,
  };
}
