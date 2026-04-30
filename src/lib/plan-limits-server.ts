/**
 * Server-only plan-limits helpers. Touches Supabase via the server client,
 * which uses next/headers — must NOT be imported from client components.
 *
 * Pure helpers (canUseSoapCalculator, etc.) live in `plan-limits.ts`.
 */

import { createClient } from "@/lib/supabase/server";
import {
  normalizeTier,
  PLAN_LIMITS,
  type FormulaCreationGuard,
  type FormulaUsage,
} from "./plan-limits";

export async function getFormulaUsage(userId: string): Promise<FormulaUsage> {
  const supabase = await createClient();

  const [{ data: profile }, { count }] = await Promise.all([
    supabase.from("profiles").select("subscription_tier").eq("id", userId).single(),
    supabase
      .from("formulas")
      .select("id", { count: "exact", head: true })
      .eq("user_id", userId)
      .eq("is_archived", false),
  ]);

  const tier = normalizeTier(profile?.subscription_tier);
  const plan = PLAN_LIMITS[tier];
  const used = count ?? 0;
  const limit = plan.formulaLimit;

  return {
    count: used,
    tier,
    limit,
    remaining: limit === null ? null : Math.max(0, limit - used),
    atLimit: limit !== null && used >= limit,
    percentUsed: limit === null ? 0 : Math.min(100, Math.round((used / Math.max(limit, 1)) * 100)),
  };
}

export async function checkCanCreateFormula(userId: string): Promise<FormulaCreationGuard> {
  const usage = await getFormulaUsage(userId);
  if (usage.atLimit) {
    return { allowed: false, reason: "formula_limit", usage };
  }
  return { allowed: true, usage };
}
