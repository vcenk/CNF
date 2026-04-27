"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  PRODUCT_CATEGORY_OPTIONS,
  type ProductCategory,
  type UsageType,
  type ReadinessSeverity,
  type ReadinessReport,
  type IngredientFlag,
} from "@/lib/cnf-readiness";
import { runReadinessCheck, type CheckerActionState } from "./actions";

const initialCheckerState: CheckerActionState = { status: "idle" };

const SEVERITY_STYLES: Record<ReadinessSeverity, { dot: string; chip: string; row: string; label: string }> = {
  ok: {
    dot: "bg-emerald-500",
    chip: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300",
    row: "border-emerald-200/60 dark:border-emerald-900/40",
    label: "OK",
  },
  info: {
    dot: "bg-sky-500",
    chip: "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    row: "border-sky-200/60 dark:border-sky-900/40",
    label: "Info",
  },
  warning: {
    dot: "bg-amber-500",
    chip: "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    row: "border-amber-200/60 dark:border-amber-900/40",
    label: "Review",
  },
  error: {
    dot: "bg-rose-500",
    chip: "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    row: "border-rose-200/60 dark:border-rose-900/40",
    label: "Block",
  },
};

const SAMPLE_INGREDIENTS = `Aqua, Glycerin, Cetearyl Alcohol, Butyrospermum Parkii (Shea) Butter, Tocopherol, Phenoxyethanol, Limonene`;

export function CheckerForm() {
  const [state, formAction, isPending] = useActionState<CheckerActionState, FormData>(
    runReadinessCheck,
    initialCheckerState
  );

  const [category, setCategory] = useState<ProductCategory | "">("");
  const [usageType, setUsageType] = useState<UsageType | "">("");

  // Auto-fill usage type when a category implies one (only if user hasn't picked one yet).
  useEffect(() => {
    if (!category) return;
    const opt = PRODUCT_CATEGORY_OPTIONS.find((o) => o.value === category);
    if (opt && !usageType) {
      setUsageType(opt.defaultUsage);
    }
  }, [category, usageType]);

  // Scroll to result after submission.
  useEffect(() => {
    if (state.status === "ok") {
      const el = document.getElementById("readiness-result");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [state]);

  return (
    <div className="space-y-12">
      <form action={formAction} className="space-y-8">
        <fieldset className="space-y-5 rounded-xl border border-border bg-card p-6">
          <legend className="px-2 text-sm font-semibold text-foreground">
            Product basics
          </legend>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="productName">Product name</Label>
              <Input
                id="productName"
                name="productName"
                placeholder="e.g. Maple Hand Cream"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="productCategory">Product category</Label>
              <select
                id="productCategory"
                name="productCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory | "")}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                required
              >
                <option value="">Select a category…</option>
                {PRODUCT_CATEGORY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <span className="text-sm font-medium">Usage type</span>
            <div className="flex flex-wrap gap-4">
              {(["leave-on", "rinse-off"] as UsageType[]).map((value) => (
                <label key={value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="usageType"
                    value={value}
                    checked={usageType === value}
                    onChange={() => setUsageType(value)}
                    required
                  />
                  {value === "leave-on" ? "Leave-on" : "Rinse-off"}
                </label>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Affects which Hotlist restrictions and fragrance allergen thresholds apply.
            </p>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-xl border border-border bg-card p-6">
          <legend className="px-2 text-sm font-semibold text-foreground">
            Ingredient list
          </legend>
          <div className="space-y-2">
            <Label htmlFor="ingredientList">
              Paste your full ingredient list (INCI form preferred)
            </Label>
            <Textarea
              id="ingredientList"
              name="ingredientList"
              rows={6}
              placeholder={`One per line, or comma-separated. Percentages optional.\nExample:\n${SAMPLE_INGREDIENTS}`}
              required
            />
            <p className="text-xs text-muted-foreground">
              Examples: <span className="font-mono">Aqua, Glycerin, Tocopherol</span> or <span className="font-mono">Glycerin (5%), Tocopherol (0.5%)</span>.
            </p>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-xl border border-border bg-card p-6">
          <legend className="px-2 text-sm font-semibold text-foreground">
            Company details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" name="companyName" placeholder="Legal business name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company address</Label>
              <Input id="companyAddress" name="companyAddress" placeholder="Street, city, province, postal" />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-5 rounded-xl border border-border bg-card p-6">
          <legend className="px-2 text-sm font-semibold text-foreground">
            Claims and label
          </legend>
          <div className="space-y-2">
            <Label htmlFor="claims">Marketing claims (as they will appear on packaging or your shop)</Label>
            <Textarea
              id="claims"
              name="claims"
              rows={4}
              placeholder="e.g. Soothing hand cream with shea butter and tocopherol."
            />
          </div>
          <div className="space-y-2">
            <span className="text-sm font-medium">Label language status</span>
            <div className="flex flex-wrap gap-4">
              {[
                { value: "bilingual", label: "Bilingual EN/FR planned" },
                { value: "english_only", label: "English only" },
                { value: "unknown", label: "Not decided yet" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="labelLanguage"
                    value={opt.value}
                    defaultChecked={opt.value === "unknown"}
                  />
                  {opt.label}
                </label>
              ))}
            </div>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Running checks…" : "Run readiness check"}
          </Button>
          <p className="text-xs text-muted-foreground">
            Results are generated locally on submit and not stored on a server account unless you save them.
          </p>
        </div>
      </form>

      {state.status === "ok" && state.report && (
        <ReadinessResult report={state.report} />
      )}
    </div>
  );
}

function ReadinessResult({ report }: { report: ReadinessReport }) {
  const { summary, sections, ingredientFlags, nextSteps } = report;

  const hasBlockers = summary.errorCount > 0;
  const headlineLabel = useMemo(() => {
    if (hasBlockers) return "Blocking issues found";
    if (summary.warningCount > 0) return "Needs follow-up";
    if (summary.infoCount > 0) return "Looks reasonable — review reminders";
    return "No automatic flags";
  }, [hasBlockers, summary]);

  return (
    <section
      id="readiness-result"
      className="space-y-8 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8"
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Readiness report
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold">
            {report.productName}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Generated {new Date(report.generatedAt).toLocaleString("en-CA")}
          </p>
        </div>
        <div
          className={`rounded-xl border px-4 py-3 text-sm font-medium ${
            hasBlockers
              ? "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/30 dark:text-rose-300"
              : summary.warningCount > 0
                ? "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-300"
                : "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/30 dark:text-emerald-300"
          }`}
        >
          {headlineLabel}
        </div>
      </header>

      <div className="grid gap-3 sm:grid-cols-4">
        <SummaryStat label="OK" count={summary.okCount} severity="ok" />
        <SummaryStat label="Info" count={summary.infoCount} severity="info" />
        <SummaryStat label="Review" count={summary.warningCount} severity="warning" />
        <SummaryStat label="Block" count={summary.errorCount} severity="error" />
      </div>

      {sections.map((section) => (
        <div key={section.heading} className="space-y-3">
          <h3 className="font-display text-lg font-semibold">{section.heading}</h3>
          <ul className="space-y-2">
            {section.items.map((item, index) => (
              <li
                key={`${section.heading}-${index}`}
                className={`flex items-start gap-3 rounded-lg border bg-background/40 p-3 ${SEVERITY_STYLES[item.severity].row}`}
              >
                <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${SEVERITY_STYLES[item.severity].dot}`} />
                <div className="flex-1 text-sm">
                  <div className="font-medium text-foreground">{item.label}</div>
                  {item.detail && (
                    <p className="mt-1 text-muted-foreground">{item.detail}</p>
                  )}
                </div>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${SEVERITY_STYLES[item.severity].chip}`}>
                  {SEVERITY_STYLES[item.severity].label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      {ingredientFlags.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-display text-lg font-semibold">Per-ingredient findings</h3>
          <ul className="space-y-2">
            {ingredientFlags.map((flag, index) => (
              <IngredientRow flag={flag} key={`flag-${index}`} />
            ))}
          </ul>
        </div>
      )}

      <div className="rounded-xl border border-brand/20 bg-brand-soft/30 p-5">
        <h3 className="font-display text-lg font-semibold">Suggested next steps</h3>
        <ol className="mt-3 list-inside list-decimal space-y-1 text-sm text-muted-foreground">
          {nextSteps.map((step, index) => (
            <li key={`step-${index}`}>{step}</li>
          ))}
        </ol>
      </div>

      <div className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-display text-lg font-semibold">
          Save this product as a FormulaNorth formula
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Create a free account to save this product as a versioned formula,
          run hotlist checks against the live ingredient database, draft a
          bilingual label, and prepare a CNF package when you are ready to
          notify Health Canada.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/auth/signup"
            className={buttonVariants({ size: "lg" })}
          >
            Create a free account
          </Link>
          <Link
            href="/ingredients"
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Browse the ingredient database
          </Link>
        </div>
      </div>

      <p className="text-xs leading-6 text-muted-foreground">
        This readiness check is informational support, not regulatory advice
        or a guarantee of compliance. Always verify findings against the
        current Health Canada Cosmetic Regulations and Cosmetic Ingredient
        Hotlist before sale or notification.
      </p>
    </section>
  );
}

function IngredientRow({ flag }: { flag: IngredientFlag }) {
  const styles = SEVERITY_STYLES[flag.severity];
  return (
    <li className={`flex items-start gap-3 rounded-lg border bg-background/40 p-3 ${styles.row}`}>
      <span className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`} />
      <div className="flex-1 text-sm">
        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-medium text-foreground">{flag.inciCandidate || flag.raw}</span>
          {flag.percentage !== null && (
            <span className="text-xs text-muted-foreground">{flag.percentage}%</span>
          )}
          {flag.match?.common_name && flag.match.common_name.toLowerCase() !== flag.inciCandidate.toLowerCase() && (
            <span className="text-xs text-muted-foreground">({flag.match.common_name})</span>
          )}
        </div>
        <p className="mt-1 text-muted-foreground">{flag.message}</p>
        {flag.slug && (
          <Link
            href={`/ingredients/${flag.slug}`}
            className="mt-1 inline-block text-xs font-medium text-brand underline hover:text-brand-dark"
          >
            View ingredient details →
          </Link>
        )}
      </div>
      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles.chip}`}>
        {styles.label}
      </span>
    </li>
  );
}

function SummaryStat({
  label,
  count,
  severity,
}: {
  label: string;
  count: number;
  severity: ReadinessSeverity;
}) {
  const styles = SEVERITY_STYLES[severity];
  return (
    <div className={`rounded-xl border bg-background p-4 ${styles.row}`}>
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${styles.dot}`} />
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </span>
      </div>
      <div className="mt-2 font-display text-2xl font-bold">{count}</div>
    </div>
  );
}
