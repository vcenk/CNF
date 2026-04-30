"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateSoap,
  SOAP_OILS,
  type LyeType,
  type SoapInputOil,
  type SoapQualityScore,
} from "@/lib/soap-calculator";
import { Plus, Trash2, AlertTriangle } from "lucide-react";

interface FormState {
  totalOilWeightG: number;
  lyeType: LyeType;
  superfatPercent: number;
  waterRatioPercent: number;
  oils: SoapInputOil[];
}

const DEFAULT_STATE: FormState = {
  totalOilWeightG: 1000,
  lyeType: "NaOH",
  superfatPercent: 5,
  waterRatioPercent: 33,
  oils: [
    { slug: "olive_oil", percent: 50 },
    { slug: "coconut_oil_76", percent: 25 },
    { slug: "palm_oil", percent: 20 },
    { slug: "castor_oil", percent: 5 },
  ],
};

export function SoapForm() {
  const [state, setState] = useState<FormState>(DEFAULT_STATE);

  const result = useMemo(() => calculateSoap(state), [state]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function addOil() {
    const used = new Set(state.oils.map((o) => o.slug));
    const next = SOAP_OILS.find((o) => !used.has(o.slug));
    if (!next) return;
    setState((s) => ({
      ...s,
      oils: [...s.oils, { slug: next.slug, percent: 0 }],
    }));
  }

  function removeOil(index: number) {
    setState((s) => ({
      ...s,
      oils: s.oils.filter((_, i) => i !== index),
    }));
  }

  function updateOil(index: number, patch: Partial<SoapInputOil>) {
    setState((s) => ({
      ...s,
      oils: s.oils.map((o, i) => (i === index ? { ...o, ...patch } : o)),
    }));
  }

  const totalPercent = state.oils.reduce((s, o) => s + (o.percent || 0), 0);
  const percentOff = Math.abs(totalPercent - 100) > 0.5;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      {/* Inputs */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 rounded-xl border border-border bg-card p-6 lg:col-span-3"
      >
        {/* Batch + lye config */}
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold">Batch and lye</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="totalOilWeightG">Total oil weight (g)</Label>
              <Input
                id="totalOilWeightG"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={state.totalOilWeightG}
                onChange={(e) =>
                  update("totalOilWeightG", parseFloat(e.target.value) || 0)
                }
                suppressHydrationWarning
              />
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium">Lye type</span>
              <div className="flex flex-wrap gap-3 pt-1">
                {(["NaOH", "KOH"] as LyeType[]).map((t) => (
                  <label key={t} className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="lyeType"
                      checked={state.lyeType === t}
                      onChange={() => update("lyeType", t)}
                      className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                      suppressHydrationWarning
                    />
                    {t === "NaOH" ? "NaOH (bar soap)" : "KOH (liquid soap)"}
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="superfatPercent">Superfat %</Label>
              <Input
                id="superfatPercent"
                type="number"
                inputMode="decimal"
                step="0.5"
                min={0}
                max={20}
                value={state.superfatPercent}
                onChange={(e) =>
                  update("superfatPercent", parseFloat(e.target.value) || 0)
                }
                suppressHydrationWarning
              />
              <p className="text-xs text-muted-foreground">
                5–8% is typical. Higher = more leftover oils, conditioning but risk of rancidity.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="waterRatioPercent">Water as % of oils</Label>
              <Input
                id="waterRatioPercent"
                type="number"
                inputMode="decimal"
                step="0.5"
                min={15}
                max={60}
                value={state.waterRatioPercent}
                onChange={(e) =>
                  update("waterRatioPercent", parseFloat(e.target.value) || 0)
                }
                suppressHydrationWarning
              />
              <p className="text-xs text-muted-foreground">
                33–38% is standard. Lower = water discount (faster trace, harder bar).
              </p>
            </div>
          </div>
        </fieldset>

        {/* Oils */}
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-sm font-semibold">Oils</legend>
            <span
              className={`text-xs font-medium ${
                percentOff ? "text-amber-700 dark:text-amber-300" : "text-muted-foreground"
              }`}
            >
              Total: {totalPercent.toFixed(1)}%
            </span>
          </div>
          <div className="space-y-2">
            {state.oils.map((oil, i) => (
              <div
                key={`${oil.slug}-${i}`}
                className="flex items-center gap-2 rounded-lg border border-border bg-background/40 p-2"
              >
                <select
                  value={oil.slug}
                  onChange={(e) => updateOil(i, { slug: e.target.value })}
                  className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  suppressHydrationWarning
                >
                  {SOAP_OILS.map((o) => (
                    <option key={o.slug} value={o.slug}>
                      {o.common}
                    </option>
                  ))}
                </select>
                <Input
                  type="number"
                  inputMode="decimal"
                  step="0.5"
                  min={0}
                  max={100}
                  value={oil.percent}
                  onChange={(e) =>
                    updateOil(i, { percent: parseFloat(e.target.value) || 0 })
                  }
                  className="w-24"
                  suppressHydrationWarning
                />
                <span className="text-xs text-muted-foreground">%</span>
                <button
                  type="button"
                  onClick={() => removeOil(i)}
                  className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label="Remove oil"
                  suppressHydrationWarning
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addOil}
            disabled={state.oils.length >= SOAP_OILS.length}
            suppressHydrationWarning
          >
            <Plus className="h-3.5 w-3.5" />
            Add oil
          </Button>
        </fieldset>

        <div>
          <Button
            type="button"
            variant="outline"
            onClick={() => setState(DEFAULT_STATE)}
            suppressHydrationWarning
          >
            Reset to a balanced starter recipe
          </Button>
        </div>
      </form>

      {/* Results */}
      <aside className="space-y-5 rounded-xl border border-border bg-card p-6 lg:col-span-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Recipe results
          </p>
          <h2 className="mt-1 font-display text-xl font-bold">
            {result.totalOilWeightG.toFixed(0)}g batch
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <ResultBox
            label={`${state.lyeType} (lye)`}
            value={result.lyeG}
            unit="g"
            highlight
          />
          <ResultBox label="Water" value={result.waterG} unit="g" />
        </div>

        {/* Quality scores */}
        <div>
          <p className="text-sm font-semibold">Soap qualities</p>
          <p className="text-xs text-muted-foreground">
            Recommended ranges in muted text. Live preview as you edit.
          </p>
          <div className="mt-3 space-y-2">
            {result.qualities.map((q) => (
              <QualityRow key={q.label} q={q} />
            ))}
          </div>
        </div>

        {(result.ins !== null || result.iodine !== null) && (
          <div className="grid grid-cols-2 gap-3 border-t border-border/50 pt-3 text-sm">
            {result.ins !== null && (
              <div>
                <p className="text-xs text-muted-foreground">INS</p>
                <p className="font-semibold">
                  {result.ins} <span className="text-xs font-normal text-muted-foreground">target ≈ 136–170</span>
                </p>
              </div>
            )}
            {result.iodine !== null && (
              <div>
                <p className="text-xs text-muted-foreground">Iodine</p>
                <p className="font-semibold">
                  {result.iodine} <span className="text-xs font-normal text-muted-foreground">≤ 70 ideal</span>
                </p>
              </div>
            )}
          </div>
        )}

        {result.warnings.length > 0 && (
          <div className="rounded-lg border border-amber-200/60 bg-amber-50/60 p-3 dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-900 dark:text-amber-200">
              <AlertTriangle className="h-3.5 w-3.5" /> Recipe notes
            </p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-amber-900/80 dark:text-amber-200/80">
              {result.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="rounded-lg border border-brand/20 bg-brand-soft/30 p-4">
          <p className="text-sm font-semibold">Save this recipe to FormulaNorth</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Free account: store up to 2 soap formulas with version history,
            costing, label drafting, and CNF preparation.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
              Create a free account
            </Link>
            <Link
              href="/how-to-sell-handmade-soap-in-canada"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              Soap-seller guide
            </Link>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          SAP values are industry estimates. Always cross-reference and use
          the zap test or pH paper before selling. Lye is caustic — wear PPE.
        </p>
      </aside>
    </div>
  );
}

function ResultBox({
  label,
  value,
  unit,
  highlight = false,
}: {
  label: string;
  value: number;
  unit: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight ? "border-brand/40 bg-brand-soft/30" : "border-border bg-background"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-display text-2xl font-bold">
        {value.toFixed(1)}
        <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}

function QualityRow({ q }: { q: SoapQualityScore }) {
  const pct = Math.max(0, Math.min(100, q.value));
  const fillClass =
    q.inRange === "ok"
      ? "bg-emerald-500"
      : q.inRange === "low"
        ? "bg-sky-500"
        : "bg-amber-500";

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{q.label}</span>
        <span className="text-muted-foreground">
          {q.value.toFixed(0)} <span className="opacity-60">({q.recommendedMin}–{q.recommendedMax})</span>
        </span>
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="absolute inset-y-0 bg-muted-foreground/15"
          style={{
            left: `${q.recommendedMin}%`,
            width: `${q.recommendedMax - q.recommendedMin}%`,
          }}
        />
        <div
          className={`absolute inset-y-0 left-0 ${fillClass} transition-all`}
          style={{ width: `${pct}%`, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}
