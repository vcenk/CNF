/**
 * Pure types, constants, and feature gates for the plan-limits system.
 * No DB / no server-only imports — safe to use from client components.
 *
 * Server-side functions that touch Supabase live in `plan-limits-server.ts`.
 */

// We keep the full union members so any DB row using legacy 'studio' /
// 'business' tier still type-checks. The pricing page only ships 'free'
// and 'maker' — the other two are reserved for a possible future Studio
// tier and currently fall through to Maker-equivalent access.
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
    formulaLimit: 1,
    description:
      "Browse the database, use all free tools, save 1 formula.",
  },
  maker: {
    tier: "maker",
    label: "Maker",
    formulaLimit: null, // unlimited
    description:
      "Unlimited formulas, soap maker integration, CNF prep package, bilingual label generator, costing, supplier price tracking.",
  },
  // Reserved for future expansion. Anyone on these legacy tiers gets
  // Maker-equivalent access (see canUseX functions below).
  studio: {
    tier: "studio",
    label: "Studio",
    formulaLimit: null,
    description: "Reserved tier — full access.",
  },
  business: {
    tier: "business",
    label: "Business",
    formulaLimit: null,
    description: "Reserved tier — full access.",
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
 * Helper: any paid tier (Maker or above).
 */
export function isPaidTier(tier: SubscriptionTier): boolean {
  return tier !== "free";
}

/**
 * Feature gates — which tier can use a given premium feature inside the
 * formula builder. Free tier gets the public-side tools (calculator,
 * recipes, etc.) but not the integrated experience inside a saved formula.
 *
 * Under the simplified Free + Maker tiering, all paid tiers get all
 * premium features — Studio and Business are reserved type aliases that
 * map to Maker-equivalent access until/unless we ship a true Studio tier.
 */
export function canUseSoapCalculator(tier: SubscriptionTier): boolean {
  return isPaidTier(tier);
}

export function canUseCnfWizard(tier: SubscriptionTier): boolean {
  return isPaidTier(tier);
}

export function canExportPdfLabel(tier: SubscriptionTier): boolean {
  return isPaidTier(tier);
}
