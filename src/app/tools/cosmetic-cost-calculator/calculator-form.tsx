"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  calculateCost,
  formatCAD,
  formatPercent,
  type CostCalculatorInput,
} from "@/lib/cost-calculator";

const DEFAULTS: CostCalculatorInput = {
  batchSizeGrams: 1000,
  ingredientCost: 25,
  packagingCostPerUnit: 1.5,
  unitsPerBatch: 20,
  labourHours: 2,
  labourRate: 25,
  overheadPercent: 15,
  targetMarginPercent: 60,
  wholesaleMarkup: 100,
};

export function CalculatorForm() {
  const [values, setValues] = useState<CostCalculatorInput>(DEFAULTS);

  const result = useMemo(() => calculateCost(values), [values]);

  const set = (key: keyof CostCalculatorInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseFloat(e.target.value);
    setValues((v) => ({ ...v, [key]: Number.isFinite(num) ? num : 0 }));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6 rounded-xl border border-border bg-card p-6 lg:col-span-3"
      >
        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold">Batch and ingredient cost</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="batchSizeGrams">Batch size (grams)</Label>
              <Input
                id="batchSizeGrams"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={values.batchSizeGrams}
                onChange={set("batchSizeGrams")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unitsPerBatch">Units per batch</Label>
              <Input
                id="unitsPerBatch"
                type="number"
                inputMode="decimal"
                step="any"
                min={1}
                value={values.unitsPerBatch}
                onChange={set("unitsPerBatch")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ingredientCost">Total ingredient cost (CAD)</Label>
              <Input
                id="ingredientCost"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={values.ingredientCost}
                onChange={set("ingredientCost")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="packagingCostPerUnit">Packaging cost per unit (CAD)</Label>
              <Input
                id="packagingCostPerUnit"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={values.packagingCostPerUnit}
                onChange={set("packagingCostPerUnit")}
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold">Labour and overhead</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="labourHours">Labour hours per batch</Label>
              <Input
                id="labourHours"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={values.labourHours}
                onChange={set("labourHours")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="labourRate">Labour rate (CAD/hour)</Label>
              <Input
                id="labourRate"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                value={values.labourRate}
                onChange={set("labourRate")}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="overheadPercent">Overhead (%)</Label>
              <Input
                id="overheadPercent"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                max={500}
                value={values.overheadPercent}
                onChange={set("overheadPercent")}
              />
              <p className="text-xs text-muted-foreground">
                Rent, utilities, market fees, software, insurance — applied as a percentage on top of unit cost.
              </p>
            </div>
          </div>
        </fieldset>

        <fieldset className="space-y-4">
          <legend className="text-sm font-semibold">Pricing targets</legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="targetMarginPercent">Retail target margin (%)</Label>
              <Input
                id="targetMarginPercent"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                max={95}
                value={values.targetMarginPercent}
                onChange={set("targetMarginPercent")}
              />
              <p className="text-xs text-muted-foreground">Gross margin target on retail price.</p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="wholesaleMarkup">Wholesale markup over cost (%)</Label>
              <Input
                id="wholesaleMarkup"
                type="number"
                inputMode="decimal"
                step="any"
                min={0}
                max={500}
                value={values.wholesaleMarkup}
                onChange={set("wholesaleMarkup")}
              />
              <p className="text-xs text-muted-foreground">100% means wholesale price is 2× cost.</p>
            </div>
          </div>
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" onClick={() => setValues(DEFAULTS)}>
            Reset to sample values
          </Button>
        </div>
      </form>

      <aside className="space-y-6 rounded-xl border border-border bg-card p-6 lg:col-span-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Cost breakdown
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold">
            {formatCAD(result.totalCostPerUnit)} <span className="text-base font-normal text-muted-foreground">/ unit</span>
          </h2>
        </div>

        <ul className="space-y-2 text-sm">
          <Stat label="Ingredients per unit" value={formatCAD(result.ingredientCostPerUnit)} />
          <Stat label="Packaging per unit" value={formatCAD(result.packagingCostPerUnit)} />
          <Stat label="Labour per unit" value={formatCAD(result.labourCostPerUnit)} />
          <Stat label="Overhead per unit" value={formatCAD(result.overheadPerUnit)} />
          <li className="flex items-center justify-between border-t border-border pt-2 font-semibold">
            <span>Total cost per unit</span>
            <span>{formatCAD(result.totalCostPerUnit)}</span>
          </li>
          <Stat label="Cost per batch" value={formatCAD(result.costPerBatch)} />
        </ul>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Pricing suggestions
          </p>
          <ul className="mt-2 space-y-2 text-sm">
            <Stat
              label={`Retail at ${values.targetMarginPercent.toFixed(0)}% margin`}
              value={formatCAD(result.suggestedRetail)}
              detail={`Gross margin ${formatPercent(result.retailGrossMargin)}`}
            />
            <Stat
              label={`Wholesale at ${values.wholesaleMarkup.toFixed(0)}% markup`}
              value={formatCAD(result.suggestedWholesale)}
              detail={`Gross margin ${formatPercent(result.wholesaleGrossMargin)}`}
            />
          </ul>
        </div>

        <div className="rounded-xl border border-brand/20 bg-brand-soft/30 p-4">
          <p className="text-sm font-semibold">Save costing alongside your formula</p>
          <p className="mt-1 text-xs text-muted-foreground">
            FormulaNorth&apos;s costing tab links pricing back to ingredient
            costs so updates flow through automatically.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link href="/auth/signup" className={buttonVariants({ size: "sm" })}>
              Create a free account
            </Link>
            <Link
              href="/pricing"
              className={buttonVariants({ variant: "outline", size: "sm" })}
            >
              See pricing
            </Link>
          </div>
        </div>

        <p className="text-xs leading-5 text-muted-foreground">
          Estimates only. Real cost should also account for shipping in,
          breakage, taxes on inputs, and seasonal supplier price changes.
        </p>
      </aside>
    </div>
  );
}

function Stat({ label, value, detail }: { label: string; value: string; detail?: string }) {
  return (
    <li className="flex items-start justify-between gap-2">
      <div className="flex flex-col">
        <span className="text-muted-foreground">{label}</span>
        {detail && <span className="text-xs text-muted-foreground">{detail}</span>}
      </div>
      <span className="font-medium tabular-nums">{value}</span>
    </li>
  );
}
