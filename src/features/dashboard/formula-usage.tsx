import Link from "next/link";
import { getPlanLimit, type FormulaUsage } from "@/lib/plan-limits";

interface FormulaUsageProps {
  usage: FormulaUsage;
  variant?: "compact" | "full";
}

export function FormulaUsageCard({ usage, variant = "full" }: FormulaUsageProps) {
  const plan = getPlanLimit(usage.tier);
  const limitLabel = usage.limit === null ? "unlimited" : usage.limit;
  const tone = usage.atLimit
    ? "border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20"
    : "border-border bg-card";

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm ${tone}`}>
        <div className="flex items-center gap-2">
          <span className="font-medium text-foreground">{plan.label}</span>
          <span className="text-muted-foreground">
            · {usage.count} of {limitLabel} formula{usage.count === 1 ? "" : "s"}
          </span>
        </div>
        {usage.atLimit && (
          <Link
            href="/pricing?upgradeReason=formula-limit"
            className="text-xs font-medium text-brand underline hover:text-brand-dark"
          >
            Upgrade
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={`rounded-xl border p-4 ${tone}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="text-sm font-semibold text-foreground">
          {plan.label} plan
        </p>
        <p className="text-xs text-muted-foreground">
          {usage.count} of {limitLabel} formula{usage.count === 1 ? "" : "s"}
          {usage.limit !== null && ` (${usage.percentUsed}%)`}
        </p>
      </div>
      {usage.limit !== null && (
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full transition-all ${usage.atLimit ? "bg-amber-500" : "bg-brand"}`}
            style={{ width: `${usage.percentUsed}%` }}
          />
        </div>
      )}
      <p className="mt-3 text-xs text-muted-foreground">{plan.description}</p>
      {usage.atLimit && (
        <Link
          href="/pricing?upgradeReason=formula-limit"
          className="mt-3 inline-block text-sm font-medium text-brand underline hover:text-brand-dark"
        >
          Upgrade for more formulas →
        </Link>
      )}
    </div>
  );
}
