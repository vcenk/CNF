/**
 * Pure types, constants, and feature gates for the plan-limits system.
 * No DB / no server-only imports — safe to use from client components.
 *
 * Server-side functions that touch Supabase live in `plan-limits-server.ts`.
 */

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

export interface FormulaCreationGuard {
  allowed: boolean;
  reason?: "formula_limit";
  usage: FormulaUsage;
}

/**
 * Feature gates — which tier can use a given premium feature inside the
 * formula builder. Free tier gets the public-side tools (calculator, recipes,
 * etc.) but not the integrated experience inside a saved formula.
 */
export function canUseSoapCalculator(tier: SubscriptionTier): boolean {
  return tier === "maker" || tier === "studio" || tier === "business";
}

export function canUseCnfWizard(tier: SubscriptionTier): boolean {
  return tier === "studio" || tier === "business";
}

export function canExportPdfLabel(tier: SubscriptionTier): boolean {
  return tier === "maker" || tier === "studio" || tier === "business";
}
