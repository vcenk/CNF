"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ADDITIVES,
  ADDITIVES_BY_SLUG,
  calculateSoap,
  decodeRecipe,
  defaultRecipe,
  encodeRecipe,
  formatWeight,
  fromGrams,
  OIL_CATEGORY_LABEL,
  RECIPE_PRESETS,
  SOAP_OILS,
  SOAP_OILS_BY_SLUG,
  toGrams,
  type LyeType,
  type SoapInputAdditive,
  type SoapInputOil,
  type SoapQualityScore,
  type ShareableRecipe,
  type WaterMethod,
  type WeightUnit,
} from "@/lib/soap-calculator";
import {
  Plus,
  Trash2,
  AlertTriangle,
  Share2,
  Printer,
  Check,
  ListRestart,
} from "lucide-react";

const FA_LABELS: Array<{ key: keyof import("@/lib/soap-calculator").FattyAcidProfile; label: string; group: "saturated" | "monounsat" | "polyunsat"; ideal?: [number, number] }> = [
  { key: "lauric", label: "Lauric (C12)", group: "saturated", ideal: [0, 25] },
  { key: "myristic", label: "Myristic (C14)", group: "saturated", ideal: [0, 12] },
  { key: "palmitic", label: "Palmitic (C16)", group: "saturated", ideal: [10, 25] },
  { key: "stearic", label: "Stearic (C18)", group: "saturated", ideal: [0, 25] },
  { key: "ricinoleic", label: "Ricinoleic", group: "monounsat", ideal: [0, 8] },
  { key: "oleic", label: "Oleic (C18:1)", group: "monounsat", ideal: [40, 60] },
  { key: "linoleic", label: "Linoleic (C18:2)", group: "polyunsat", ideal: [0, 15] },
  { key: "linolenic", label: "Linolenic (C18:3)", group: "polyunsat", ideal: [0, 5] },
];

interface FormState extends ShareableRecipe {
  weightUnit: WeightUnit;
}

const initialState = (): FormState => ({
  ...defaultRecipe(),
  weightUnit: "g",
});

export function SoapForm() {
  const [state, setState] = useState<FormState>(initialState);
  const [shareCopied, setShareCopied] = useState(false);
  const [presetSlug, setPresetSlug] = useState<string>("beginner_cp");

  // Read recipe from URL on first mount, if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const r = params.get("r");
    if (r) {
      const decoded = decodeRecipe(r);
      if (decoded) {
        setState((s) => ({ ...s, ...decoded }));
        setPresetSlug("");
      }
    }
  }, []);

  const result = useMemo(() => calculateSoap(state), [state]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function applyPreset(slug: string) {
    const preset = RECIPE_PRESETS.find((p) => p.slug === slug);
    if (!preset) return;
    setState((s) => ({
      ...s,
      oils: preset.oils,
      superfatPercent: preset.superfat,
      lyeType: preset.slug === "liquid_soap" ? "KOH" : "NaOH",
      lyePurityPercent: preset.slug === "liquid_soap" ? 90 : 99,
    }));
    setPresetSlug(slug);
  }

  function addOil() {
    const used = new Set(state.oils.map((o) => o.slug));
    const next = SOAP_OILS.find((o) => !used.has(o.slug));
    if (!next) return;
    update("oils", [...state.oils, { slug: next.slug, percent: 0 }]);
    setPresetSlug("");
  }

  function removeOil(index: number) {
    update("oils", state.oils.filter((_, i) => i !== index));
    setPresetSlug("");
  }

  function updateOil(index: number, patch: Partial<SoapInputOil>) {
    update(
      "oils",
      state.oils.map((o, i) => (i === index ? { ...o, ...patch } : o))
    );
    setPresetSlug("");
  }

  function addAdditive() {
    const used = new Set(state.additives.map((a) => a.slug));
    const next = ADDITIVES.find((a) => !used.has(a.slug));
    if (!next) return;
    update("additives", [
      ...state.additives,
      { slug: next.slug, percent: next.typicalMin },
    ]);
  }

  function removeAdditive(index: number) {
    update("additives", state.additives.filter((_, i) => i !== index));
  }

  function updateAdditive(index: number, patch: Partial<SoapInputAdditive>) {
    update(
      "additives",
      state.additives.map((a, i) => (i === index ? { ...a, ...patch } : a))
    );
  }

  async function shareRecipe() {
    const { weightUnit, ...recipe } = state;
    void weightUnit;
    const encoded = encodeRecipe(recipe);
    const url = `${window.location.origin}/tools/soap-calculator?r=${encoded}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    } catch {
      // fall back: show url in prompt
      window.prompt("Copy this share link:", url);
    }
  }

  function printRecipe() {
    const { weightUnit, ...recipe } = state;
    const encoded = encodeRecipe(recipe);
    window.open(
      `/tools/soap-calculator/print?r=${encoded}&unit=${weightUnit}`,
      "_blank"
    );
  }

  const totalPercent = state.oils.reduce((s, o) => s + (o.percent || 0), 0);
  const percentOff = Math.abs(totalPercent - 100) > 0.5;

  // Convert input weight from selected unit -> grams for the calculator
  // The input field shows in user-selected unit; state.totalOilWeightG always in grams.
  const oilInputDisplay = fromGrams(state.totalOilWeightG, state.weightUnit);

  return (
    <div className="space-y-6">
      {/* Top toolbar — presets + share + print */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
        <div className="flex items-center gap-2">
          <ListRestart className="h-4 w-4 text-brand" />
          <span className="text-sm font-medium">Preset</span>
          <select
            value={presetSlug}
            onChange={(e) => applyPreset(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            suppressHydrationWarning
          >
            <option value="">Custom recipe</option>
            {RECIPE_PRESETS.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={shareRecipe}
            suppressHydrationWarning
          >
            {shareCopied ? (
              <>
                <Check className="h-3.5 w-3.5" /> Copied
              </>
            ) : (
              <>
                <Share2 className="h-3.5 w-3.5" /> Share recipe link
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={printRecipe}
            suppressHydrationWarning
          >
            <Printer className="h-3.5 w-3.5" />
            Print recipe
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Inputs */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className="space-y-6 rounded-xl border border-border bg-card p-6 lg:col-span-3"
        >
          {/* Batch + units */}
          <fieldset className="space-y-4">
            <legend className="text-sm font-semibold">Batch and lye</legend>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="totalOilWeight">Total oil weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="totalOilWeight"
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min={0}
                    value={Number(oilInputDisplay.toFixed(2))}
                    onChange={(e) => {
                      const v = parseFloat(e.target.value);
                      update(
                        "totalOilWeightG",
                        Number.isFinite(v) ? toGrams(v, state.weightUnit) : 0
                      );
                    }}
                    suppressHydrationWarning
                    className="flex-1"
                  />
                  <select
                    value={state.weightUnit}
                    onChange={(e) => update("weightUnit", e.target.value as WeightUnit)}
                    className="rounded-md border border-border bg-background px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                    suppressHydrationWarning
                  >
                    <option value="g">g</option>
                    <option value="kg">kg</option>
                    <option value="oz">oz</option>
                    <option value="lb">lb</option>
                  </select>
                </div>
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
                      {t}
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lyePurityPercent">Lye purity %</Label>
                <Input
                  id="lyePurityPercent"
                  type="number"
                  step="0.5"
                  min={50}
                  max={100}
                  value={state.lyePurityPercent}
                  onChange={(e) =>
                    update("lyePurityPercent", parseFloat(e.target.value) || 99)
                  }
                  suppressHydrationWarning
                />
                <p className="text-xs text-muted-foreground">
                  99 for food-grade NaOH; 90 for commercial KOH.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="superfatPercent">Superfat %</Label>
                <Input
                  id="superfatPercent"
                  type="number"
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
                  5–8% typical. Salt bars often 20%.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="fragrancePercent">Fragrance / EO %</Label>
                <Input
                  id="fragrancePercent"
                  type="number"
                  step="0.1"
                  min={0}
                  max={15}
                  value={state.fragrancePercent}
                  onChange={(e) =>
                    update("fragrancePercent", parseFloat(e.target.value) || 0)
                  }
                  suppressHydrationWarning
                />
                <p className="text-xs text-muted-foreground">
                  3–6% of oil weight is typical. Check IFRA limits.
                </p>
              </div>
            </div>
          </fieldset>

          {/* Water method */}
          <fieldset className="space-y-3 rounded-lg border border-border/50 bg-background/30 p-4">
            <legend className="px-2 text-sm font-semibold">Water</legend>
            <div className="flex flex-wrap gap-3 text-sm">
              {(
                [
                  { v: "water_percent_oils", label: "Water as % of oils" },
                  { v: "lye_concentration", label: "Lye concentration %" },
                  { v: "water_lye_ratio", label: "Water:lye ratio" },
                ] as Array<{ v: WaterMethod; label: string }>
              ).map((opt) => (
                <label key={opt.v} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="waterMethod"
                    checked={state.waterMethod === opt.v}
                    onChange={() => update("waterMethod", opt.v)}
                    className="h-4 w-4 cursor-pointer accent-[var(--brand)]"
                    suppressHydrationWarning
                  />
                  {opt.label}
                </label>
              ))}
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {state.waterMethod === "water_percent_oils" && (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="waterPercentOils">% of oils</Label>
                  <Input
                    id="waterPercentOils"
                    type="number"
                    step="0.5"
                    min={15}
                    max={60}
                    value={state.waterPercentOils}
                    onChange={(e) =>
                      update("waterPercentOils", parseFloat(e.target.value) || 0)
                    }
                    suppressHydrationWarning
                  />
                  <p className="text-xs text-muted-foreground">33–38% typical</p>
                </div>
              )}
              {state.waterMethod === "lye_concentration" && (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="lyeConcentrationPercent">Lye concentration</Label>
                  <Input
                    id="lyeConcentrationPercent"
                    type="number"
                    step="0.5"
                    min={20}
                    max={50}
                    value={state.lyeConcentrationPercent}
                    onChange={(e) =>
                      update("lyeConcentrationPercent", parseFloat(e.target.value) || 0)
                    }
                    suppressHydrationWarning
                  />
                  <p className="text-xs text-muted-foreground">
                    33% ≈ standard. 40%+ = water discount.
                  </p>
                </div>
              )}
              {state.waterMethod === "water_lye_ratio" && (
                <div className="space-y-2 sm:col-span-1">
                  <Label htmlFor="waterLyeRatio">Water-to-lye ratio</Label>
                  <Input
                    id="waterLyeRatio"
                    type="number"
                    step="0.05"
                    min={0.8}
                    max={4}
                    value={state.waterLyeRatio}
                    onChange={(e) =>
                      update("waterLyeRatio", parseFloat(e.target.value) || 0)
                    }
                    suppressHydrationWarning
                  />
                  <p className="text-xs text-muted-foreground">1.5 ≈ classic</p>
                </div>
              )}
            </div>
          </fieldset>

          {/* Oils */}
          <fieldset className="space-y-3">
            <div className="flex items-center justify-between">
              <legend className="text-sm font-semibold">Oils</legend>
              <span
                className={`text-xs font-medium ${
                  percentOff
                    ? "text-amber-700 dark:text-amber-300"
                    : "text-muted-foreground"
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
                    {(Object.keys(OIL_CATEGORY_LABEL) as Array<keyof typeof OIL_CATEGORY_LABEL>).map((category) => (
                      <optgroup key={category} label={OIL_CATEGORY_LABEL[category]}>
                        {SOAP_OILS.filter((o) => o.category === category).map((o) => (
                          <option key={o.slug} value={o.slug}>
                            {o.common}
                          </option>
                        ))}
                      </optgroup>
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
              Add oil ({SOAP_OILS.length - state.oils.length} remaining in database)
            </Button>
          </fieldset>

          {/* Additives */}
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">
              Additives <span className="font-normal text-muted-foreground">(optional)</span>
            </legend>
            <div className="space-y-2">
              {state.additives.map((a, i) => {
                const def = ADDITIVES_BY_SLUG[a.slug];
                return (
                  <div
                    key={`${a.slug}-${i}`}
                    className="flex flex-wrap items-center gap-2 rounded-lg border border-border bg-background/40 p-2"
                  >
                    <select
                      value={a.slug}
                      onChange={(e) => updateAdditive(i, { slug: e.target.value })}
                      className="flex-1 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      suppressHydrationWarning
                    >
                      {ADDITIVES.map((opt) => (
                        <option key={opt.slug} value={opt.slug}>
                          {opt.label} ({opt.typicalMin}–{opt.typicalMax}%)
                        </option>
                      ))}
                    </select>
                    <Input
                      type="number"
                      inputMode="decimal"
                      step="0.5"
                      min={0}
                      max={100}
                      value={a.percent}
                      onChange={(e) =>
                        updateAdditive(i, { percent: parseFloat(e.target.value) || 0 })
                      }
                      className="w-24"
                      suppressHydrationWarning
                    />
                    <span className="text-xs text-muted-foreground">% of oils</span>
                    <button
                      type="button"
                      onClick={() => removeAdditive(i)}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label="Remove additive"
                      suppressHydrationWarning
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                    {def?.notes && (
                      <p className="basis-full pl-2 text-xs text-muted-foreground">
                        {def.notes}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={addAdditive}
              disabled={state.additives.length >= ADDITIVES.length}
              suppressHydrationWarning
            >
              <Plus className="h-3.5 w-3.5" />
              Add additive
            </Button>
          </fieldset>

          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setState(initialState());
              setPresetSlug("beginner_cp");
            }}
            suppressHydrationWarning
          >
            Reset to default recipe
          </Button>
        </form>

        {/* Results */}
        <aside className="space-y-5 rounded-xl border border-border bg-card p-6 lg:col-span-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-brand">
              Recipe results
            </p>
            <h2 className="mt-1 font-display text-xl font-bold">
              {formatWeight(result.totalOilWeightG, state.weightUnit, 2)} batch
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <ResultBox
              label={`${state.lyeType} (lye)`}
              valueG={result.lyeG}
              unit={state.weightUnit}
              highlight
            />
            <ResultBox
              label="Water"
              valueG={result.waterG}
              unit={state.weightUnit}
            />
          </div>
          {result.fragranceG > 0 && (
            <ResultBox
              label="Fragrance / EO"
              valueG={result.fragranceG}
              unit={state.weightUnit}
            />
          )}
          {result.additiveLines.length > 0 && (
            <div className="rounded-lg border border-border bg-background p-3">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Additives
              </p>
              <ul className="mt-2 space-y-1 text-sm">
                {result.additiveLines.map((a) => (
                  <li key={a.slug} className="flex items-center justify-between">
                    <span>
                      {a.label}
                      <span className="ml-1 text-xs text-muted-foreground">
                        ({a.percent}% of oils)
                      </span>
                    </span>
                    <span className="font-medium tabular-nums">
                      {formatWeight(a.weightG, state.weightUnit, 2)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Quality scores */}
          <div>
            <p className="text-sm font-semibold">Soap qualities</p>
            <div className="mt-3 space-y-2">
              {result.qualities.map((q) => (
                <QualityRow key={q.label} q={q} />
              ))}
            </div>
          </div>

          {/* Fatty acid breakdown */}
          {result.fattyAcids && (
            <div className="rounded-lg border border-border bg-background p-3">
              <div className="flex items-baseline justify-between">
                <p className="text-sm font-semibold">Fatty acid profile</p>
                <p className="text-xs text-muted-foreground">
                  Sat:Unsat {result.fattyAcids.saturated.toFixed(0)}:{result.fattyAcids.unsaturated.toFixed(0)}
                </p>
              </div>
              <ul className="mt-2 space-y-1 text-xs">
                {FA_LABELS.map((fa) => {
                  const v = result.fattyAcids!.values[fa.key];
                  return (
                    <li key={fa.key} className="flex items-center justify-between gap-2">
                      <span className="text-muted-foreground">{fa.label}</span>
                      <div className="flex flex-1 items-center gap-2">
                        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                          <div
                            className="absolute inset-y-0 left-0 bg-brand/70"
                            style={{ width: `${Math.min(100, v)}%` }}
                          />
                        </div>
                        <span className="w-10 shrink-0 text-right font-medium tabular-nums">
                          {v.toFixed(0)}%
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
              Free account: store soap formulas with version history,
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
            SAP and fatty-acid values are industry estimates. Always cross-reference
            and zap-test your final batch. Lye is caustic — wear PPE.
          </p>
        </aside>
      </div>
    </div>
  );
}

function ResultBox({
  label,
  valueG,
  unit,
  highlight = false,
}: {
  label: string;
  valueG: number;
  unit: WeightUnit;
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
        {fromGrams(valueG, unit).toFixed(unit === "g" ? 1 : 3)}
        <span className="ml-1 text-base font-normal text-muted-foreground">{unit}</span>
      </p>
    </div>
  );
}

function QualityRow({ q }: { q: SoapQualityScore }) {
  // For Iodine and INS the absolute scale is different; cap visualization at 100% of recommended max for readability
  const fillPct =
    q.label === "INS"
      ? Math.max(0, Math.min(100, (q.value / 200) * 100))
      : q.label === "Iodine"
        ? Math.max(0, Math.min(100, q.value))
        : Math.max(0, Math.min(100, q.value));
  const fillClass =
    q.inRange === "ok"
      ? "bg-emerald-500"
      : q.inRange === "low"
        ? "bg-sky-500"
        : "bg-amber-500";

  // Recommended-range markers — only meaningful for the 0–100 scale ones
  const rangeBg = q.label === "INS" || q.label === "Iodine" ? null : (
    <div
      className="absolute inset-y-0 bg-muted-foreground/15"
      style={{
        left: `${q.recommendedMin}%`,
        width: `${q.recommendedMax - q.recommendedMin}%`,
      }}
    />
  );

  return (
    <div>
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium">{q.label}</span>
        <span className="text-muted-foreground">
          {q.value.toFixed(0)}{" "}
          <span className="opacity-60">
            ({q.recommendedMin}–{q.recommendedMax})
          </span>
        </span>
      </div>
      <div className="relative mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
        {rangeBg}
        <div
          className={`absolute inset-y-0 left-0 ${fillClass} transition-all`}
          style={{ width: `${fillPct}%`, opacity: 0.85 }}
        />
      </div>
    </div>
  );
}
