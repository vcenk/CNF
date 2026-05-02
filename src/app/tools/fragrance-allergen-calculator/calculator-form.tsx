"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2, AlertTriangle, Check, Copy, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculateAllergens,
  formatAllergenPercent,
  type FragranceEntry,
  type ProductType,
} from "@/lib/fragrance-allergen-calculator";
import { ESSENTIAL_OIL_PRESETS } from "@/lib/fragrance-allergen-presets";

interface RowState {
  id: string;
  name: string;
  usagePercent: string;
  allergens: Array<{ id: string; inciName: string; percentInOil: string }>;
  isPreset: boolean;
}

function newAllergenRow(seed?: { inciName: string; percentInOil: number }) {
  return {
    id: crypto.randomUUID(),
    inciName: seed?.inciName ?? "",
    percentInOil: seed ? String(seed.percentInOil) : "",
  };
}

function newFragranceRow(): RowState {
  return {
    id: crypto.randomUUID(),
    name: "",
    usagePercent: "",
    allergens: [newAllergenRow()],
    isPreset: false,
  };
}

export function CalculatorForm() {
  const [productType, setProductType] = useState<ProductType>("rinse-off");
  const [rows, setRows] = useState<RowState[]>(() => [newFragranceRow()]);
  const [copied, setCopied] = useState(false);

  // Live calculation as user types
  const result = useMemo(() => {
    const entries: FragranceEntry[] = rows
      .map((row) => ({
        name: row.name,
        usagePercentInFormula: parseFloat(row.usagePercent) || 0,
        allergens: row.allergens
          .map((a) => ({
            inciName: a.inciName.trim(),
            percentInOil: parseFloat(a.percentInOil) || 0,
          }))
          .filter((a) => a.inciName.length > 0 && a.percentInOil > 0),
      }))
      .filter((e) => e.usagePercentInFormula > 0);
    return calculateAllergens(entries, productType);
  }, [rows, productType]);

  function updateRow(id: string, patch: Partial<RowState>) {
    setRows((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...patch, isPreset: false } : r))
    );
  }
  function addRow() {
    setRows((prev) => [...prev, newFragranceRow()]);
  }
  function removeRow(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  function loadPreset(rowId: string, presetIndex: number) {
    const preset = ESSENTIAL_OIL_PRESETS[presetIndex];
    if (!preset) return;
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              name: preset.commonName,
              allergens: preset.allergens.map((a) => newAllergenRow(a)),
              isPreset: true,
            }
          : r
      )
    );
  }

  function addAllergen(rowId: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? { ...r, allergens: [...r.allergens, newAllergenRow()], isPreset: false }
          : r
      )
    );
  }
  function updateAllergen(
    rowId: string,
    allergenId: string,
    patch: Partial<{ inciName: string; percentInOil: string }>
  ) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              isPreset: false,
              allergens: r.allergens.map((a) =>
                a.id === allergenId ? { ...a, ...patch } : a
              ),
            }
          : r
      )
    );
  }
  function removeAllergen(rowId: string, allergenId: string) {
    setRows((prev) =>
      prev.map((r) =>
        r.id === rowId
          ? {
              ...r,
              isPreset: false,
              allergens:
                r.allergens.length > 1
                  ? r.allergens.filter((a) => a.id !== allergenId)
                  : r.allergens,
            }
          : r
      )
    );
  }

  async function handleCopy() {
    if (!result.labelDisclosureText) return;
    try {
      await navigator.clipboard.writeText(result.labelDisclosureText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available — silently no-op
    }
  }

  return (
    <div className="space-y-8">
      {/* Product type */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">1. Product type</CardTitle>
          <CardDescription>
            Determines the disclosure threshold. Leave-on is 10× stricter than rinse-off.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setProductType("leave-on")}
              className={
                "rounded-lg border p-4 text-left transition-colors " +
                (productType === "leave-on"
                  ? "border-brand bg-brand-soft/30 ring-1 ring-brand"
                  : "border-border bg-card hover:border-brand/50")
              }
            >
              <div className="font-semibold">Leave-on</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Lotion, cream, balm, perfume, lip products.
              </div>
              <div className="mt-2 text-xs font-medium text-brand">
                Threshold: 0.001% (10 ppm)
              </div>
            </button>
            <button
              type="button"
              onClick={() => setProductType("rinse-off")}
              className={
                "rounded-lg border p-4 text-left transition-colors " +
                (productType === "rinse-off"
                  ? "border-brand bg-brand-soft/30 ring-1 ring-brand"
                  : "border-border bg-card hover:border-brand/50")
              }
            >
              <div className="font-semibold">Rinse-off</div>
              <div className="mt-1 text-xs text-muted-foreground">
                Soap, shampoo, body wash, scrub, conditioner.
              </div>
              <div className="mt-2 text-xs font-medium text-brand">
                Threshold: 0.01% (100 ppm)
              </div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Fragrance / EO entries */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">2. Fragrance / essential oils</CardTitle>
          <CardDescription>
            Add every fragrance, essential oil, or absolute used in your formula. Pick a
            preset for naturals or paste from your supplier&apos;s IFRA / Allergen
            Statement for synthetic FOs.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {rows.map((row, i) => (
            <div
              key={row.id}
              className="rounded-xl border border-border bg-card/50 p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Fragrance #{i + 1}
                </p>
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(row.id)}
                    className="rounded p-1 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    aria-label="Remove fragrance"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_120px]">
                <div className="space-y-1.5">
                  <Label htmlFor={`name-${row.id}`} className="text-xs">
                    Name (your reference)
                  </Label>
                  <Input
                    id={`name-${row.id}`}
                    value={row.name}
                    onChange={(e) => updateRow(row.id, { name: e.target.value })}
                    placeholder="Lavender FO, Rose Otto, supplier code…"
                    suppressHydrationWarning
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor={`usage-${row.id}`} className="text-xs">
                    % in formula
                  </Label>
                  <Input
                    id={`usage-${row.id}`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={row.usagePercent}
                    onChange={(e) => updateRow(row.id, { usagePercent: e.target.value })}
                    placeholder="3.0"
                    suppressHydrationWarning
                  />
                </div>
              </div>

              <div className="mt-4">
                <Label htmlFor={`preset-${row.id}`} className="text-xs">
                  Or load a preset (typical values for natural EOs)
                </Label>
                <select
                  id={`preset-${row.id}`}
                  className="mt-1.5 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                  value=""
                  onChange={(e) => {
                    const idx = parseInt(e.target.value, 10);
                    if (!isNaN(idx)) loadPreset(row.id, idx);
                    e.currentTarget.value = "";
                  }}
                  suppressHydrationWarning
                >
                  <option value="">— Pick an essential oil to auto-fill allergens —</option>
                  {ESSENTIAL_OIL_PRESETS.map((p, idx) => (
                    <option key={p.inciName} value={idx}>
                      {p.commonName}
                    </option>
                  ))}
                </select>
                {row.isPreset && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-700 dark:text-amber-400">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>
                      Preset values are TYPICAL. Always verify against your supplier&apos;s
                      IFRA / Allergen Statement before relying on the result.
                    </span>
                  </p>
                )}
              </div>

              <div className="mt-5">
                <div className="mb-2 flex items-center justify-between">
                  <Label className="text-xs">Allergens in this oil</Label>
                  <button
                    type="button"
                    onClick={() => addAllergen(row.id)}
                    className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2 py-0.5 text-xs hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                    Add allergen
                  </button>
                </div>

                <div className="space-y-2">
                  {row.allergens.map((a) => (
                    <div
                      key={a.id}
                      className="grid gap-2 sm:grid-cols-[1fr_100px_auto] sm:items-center"
                    >
                      <Input
                        value={a.inciName}
                        onChange={(e) =>
                          updateAllergen(row.id, a.id, {
                            inciName: e.target.value,
                          })
                        }
                        placeholder="Linalool"
                        className="text-sm"
                        suppressHydrationWarning
                      />
                      <div className="relative">
                        <Input
                          type="number"
                          step="0.01"
                          min="0"
                          max="100"
                          value={a.percentInOil}
                          onChange={(e) =>
                            updateAllergen(row.id, a.id, {
                              percentInOil: e.target.value,
                            })
                          }
                          placeholder="8"
                          className="pr-8 text-sm"
                          suppressHydrationWarning
                        />
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          %
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeAllergen(row.id, a.id)}
                        disabled={row.allergens.length === 1}
                        className="hidden rounded p-1.5 text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive disabled:opacity-30 sm:inline-flex"
                        aria-label="Remove allergen"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addRow}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-card/30 py-3 text-sm font-medium text-muted-foreground transition-colors hover:border-brand hover:text-brand"
          >
            <Plus className="h-4 w-4" />
            Add another fragrance / EO
          </button>
        </CardContent>
      </Card>

      {/* Results */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">3. Disclosure result</CardTitle>
          <CardDescription>
            Live calculation. Updates as you type.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Summary banner */}
          <div className="rounded-lg border border-border bg-card p-4">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {productType === "leave-on" ? "Leave-on" : "Rinse-off"} threshold
                </p>
                <p className="font-mono text-lg font-bold text-brand">
                  {productType === "leave-on" ? "0.001%" : "0.01%"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Total fragrance load
                </p>
                <p className="font-mono text-lg font-bold">
                  {result.totalFragrancePercent.toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {result.allergens.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Add at least one fragrance with allergens above to see results.
            </div>
          ) : (
            <>
              {/* Above threshold */}
              {result.disclosedInciNames.length > 0 ? (
                <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-4 dark:border-rose-900/40 dark:bg-rose-950/20">
                  <div className="mb-2 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                    <p className="text-sm font-semibold text-rose-900 dark:text-rose-200">
                      {result.disclosedInciNames.length} allergen
                      {result.disclosedInciNames.length === 1 ? "" : "s"} must be disclosed
                    </p>
                  </div>
                  <p className="text-sm text-rose-900/80 dark:text-rose-200/80">
                    These allergens exceed the {result.threshold * 100}% disclosure
                    threshold for your product type. They must be individually named on
                    the label and in your CNF ingredient list.
                  </p>

                  <div className="mt-3 space-y-1.5">
                    {result.allergens
                      .filter((a) => a.exceedsThreshold)
                      .map((a) => (
                        <div
                          key={a.inciName}
                          className="flex items-center justify-between rounded-md bg-white/70 px-3 py-1.5 text-sm dark:bg-rose-950/40"
                        >
                          <span className="font-medium">{a.inciName}</span>
                          <span className="font-mono text-xs text-rose-700 dark:text-rose-300">
                            {formatAllergenPercent(a.finishedProductPercent)}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* Copy disclosure block */}
                  <div className="mt-4 rounded-md border border-rose-300/60 bg-white/70 p-3 dark:border-rose-900/40 dark:bg-rose-950/40">
                    <p className="mb-1.5 text-xs font-semibold text-rose-900 dark:text-rose-200">
                      Label-ready (paste after &ldquo;Parfum,&rdquo; on your ingredient list):
                    </p>
                    <p className="font-mono text-sm text-rose-900 dark:text-rose-100">
                      {result.labelDisclosureText}
                    </p>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-rose-600 px-3 py-1 text-xs font-medium text-white hover:bg-rose-700"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copy disclosure text
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm font-medium text-emerald-900 dark:text-emerald-200">
                      No allergen exceeds the disclosure threshold. Allergens can stay
                      grouped under &ldquo;Parfum&rdquo;.
                    </p>
                  </div>
                </div>
              )}

              {/* Below threshold (collapsed-ish) */}
              {result.allergens.some((a) => !a.exceedsThreshold) && (
                <div className="rounded-lg border border-border bg-card/50 p-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Below threshold ({result.allergens.filter((a) => !a.exceedsThreshold).length})
                  </p>
                  <p className="mb-2 text-xs text-muted-foreground">
                    These can stay grouped under &ldquo;Parfum&rdquo; on the ingredient
                    list. They&apos;re still listed here for reference.
                  </p>
                  <div className="space-y-1">
                    {result.allergens
                      .filter((a) => !a.exceedsThreshold)
                      .map((a) => (
                        <div
                          key={a.inciName}
                          className="flex items-center justify-between text-xs"
                        >
                          <span className="text-muted-foreground">{a.inciName}</span>
                          <span className="font-mono text-muted-foreground">
                            {formatAllergenPercent(a.finishedProductPercent)}
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}

          <div className="border-t border-border pt-4 text-xs text-muted-foreground">
            <p className="flex items-start gap-1.5">
              <Sparkles className="mt-0.5 h-3 w-3 shrink-0 text-brand" />
              This calculator is preparation support, not regulatory review. Always
              verify against your supplier&apos;s IFRA / Allergen Statement and the
              current Health Canada Cosmetic Regulations before sale.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
