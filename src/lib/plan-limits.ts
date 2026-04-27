import { createClient } from "@/lib/supabase/server";

export type SubscriptionTier = "free" | "maker" | "studio" | "business";

export interface PlanLimit {
  tier: SubscriptionTier;
  label: string;
  formulaLimit: number | null; // null = unlimited
  description: string;
}

export const PLAN_LIMITS: Record<SubscriptionTier, PlanLimit> = {
  free: {
    tier: "free",
    label: "Free",
    formulaLimit: 2,
    description: "Browse the ingredient and supplier database; save up to 2 formulas.",
  },
  maker: {
    tier: "maker",
    label: "Maker",
    formulaLimit: 10,
    description: "Save up to 10 formulas with version history, costing, and bilingual label drafting.",
  },
  studio: {
    tier: "studio",
    label: "Studio",
    formulaLimit: 50,
    description: "Up to 50 formulas plus the CNF preparation workflow.",
  },
  business: {
    tier: "business",
    label: "Business",
    formulaLimit: null,
    description: "Unlimited formulas, multiple brands, and advanced records.",
  },
};

export function normalizeTier(value: string | null | undefined): SubscriptionTier {
  if (value === "maker" || value === "studio" || value === "business") {
    return value;
  }
  return "free";
}

export function getPlanLimit(tier: SubscriptionTier): PlanLimit {
  return PLAN_LIMITS[tier];
}

export interface FormulaUsage {
  count: number;
  tier: SubscriptionTier;
  limit: number | null;
  remaining: number | null;
  atLimit: boolean;
  percentUsed: number;
}

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

export interface FormulaCreationGuard {
  allowed: boolean;
  reason?: "formula_limit";
  usage: FormulaUsage;
}

export async function checkCanCreateFormula(userId: string): Promise<FormulaCreationGuard> {
  const usage = await getFormulaUsage(userId);
  if (usage.atLimit) {
    return { allowed: false, reason: "formula_limit", usage };
  }
  return { allowed: true, usage };
}
