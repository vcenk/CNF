"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { calculateCOGS } from "@/services/costing-engine";
import { saveCostConfigAction, saveIngredientPriceAction } from "@/app/formulas/[id]/costing-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Save } from "lucide-react";
import type { CostConfig } from "@/domain/costing";

interface IngredientForCosting {
  ingredientId: string;
  inciName: string;
  commonName: string | null;
  percentage: number;
}

interface PriceEntry {
  ingredientId: string;
  pricePerKg: number;
  source: "user" | "seed";
}

interface CostingTabProps {
  formulaId: string;
  batchSizeG: number;
  ingredients: IngredientForCosting[];
  prices: PriceEntry[];
  initialConfig: CostConfig;
}

export function CostingTab({
  formulaId,
  batchSizeG,
  ingredients,
  prices,
  initialConfig,
}: CostingTabProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [config, setConfig] = useState<CostConfig>(initialConfig);
  const [localPrices, setLocalPrices] = useState<Map<string, number>>(() => {
    const map = new Map<string, number>();
    for (const p of prices) {
      if (!map.has(p.ingredientId) || p.source === "user") {
        map.set(p.ingredientId, p.pricePerKg);
      }
    }
    return map;
  });

  const allPrices: PriceEntry[] = useMemo(() => {
    const merged: PriceEntry[] = [];
    for (const ing of ingredients) {
      const local = localPrices.get(ing.ingredientId);
      if (local !== undefined) {
        merged.push({ ingredientId: ing.ingredientId, pricePerKg: local, source: "user" });
      } else {
        const seed = prices.find((p) => p.ingredientId === ing.ingredientId && p.source === "seed");
        if (seed) merged.push(seed);
      }
    }
    return merged;
  }, [ingredients, prices, localPrices]);

  const breakdown = useMemo(
    () => calculateCOGS(ingredients, batchSizeG, allPrices, config),
    [ingredients, batchSizeG, allPrices, config]
  );

  function handlePriceChange(ingredientId: string, value: string) {
    const price = parseFloat(value);
    if (isNaN(price) || price < 0) return;
    setLocalPrices((prev) => new Map(prev).set(ingredientId, price));
    startTransition(async () => {
      await saveIngredientPriceAction(ingredientId, price, formulaId);
    });
  }

  function handleConfigSave() {
    startTransition(async () => {
      await saveCostConfigAction(formulaId, {
        labor_cost_per_batch: config.laborCostPerBatch,
        packaging_cost_per_unit: config.packagingCostPerUnit,
        overhead_percent: config.overheadPercent,
        target_margin_percent: config.targetMarginPercent,
        units_per_batch: config.unitsPerBatch,
      });
      router.refresh();
    });
  }

  function fmt(n: number) {
    return `$${n.toFixed(2)}`;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Ingredient cost table */}
        <div>
          <h2 className="text-lg font-semibold">Ingredient Costs</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Set your price per kg for each ingredient. Batch: {batchSizeG}g
          </p>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead className="text-right">%</TableHead>
                <TableHead className="text-right">Weight (g)</TableHead>
                <TableHead className="text-right">$/kg</TableHead>
                <TableHead className="text-right">Line Cost</TableHead>
                <TableHead>Source</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdown.ingredientLines.map((line) => (
                <TableRow key={line.ingredientId}>
                  <TableCell className="text-sm font-medium">
                    {ingredients.find((i) => i.ingredientId === line.ingredientId)?.commonName || line.inciName}
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {line.percentage}%
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {line.weightG.toFixed(1)}g
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      defaultValue={line.pricePerKg ?? ""}
                      onBlur={(e) => handlePriceChange(line.ingredientId, e.target.value)}
                      placeholder="—"
                      className="w-24 text-right text-sm"
                      step="0.01"
                      min="0"
                    />
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    {line.lineCost !== null ? fmt(line.lineCost) : "—"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`text-xs ${
                        line.priceSource === "user"
                          ? "border-brand/30 text-brand"
                          : line.priceSource === "seed"
                            ? "border-muted text-muted-foreground"
                            : "border-warning/30 text-warning"
                      }`}
                    >
                      {line.priceSource === "user"
                        ? "Your price"
                        : line.priceSource === "seed"
                          ? "Estimated"
                          : "No data"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Overhead config */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Overhead & Labour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Labour per batch (CA$)</Label>
                <Input
                  type="number"
                  value={config.laborCostPerBatch}
                  onChange={(e) => setConfig({ ...config, laborCostPerBatch: parseFloat(e.target.value) || 0 })}
                  onBlur={handleConfigSave}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Packaging per unit (CA$)</Label>
                <Input
                  type="number"
                  value={config.packagingCostPerUnit}
                  onChange={(e) => setConfig({ ...config, packagingCostPerUnit: parseFloat(e.target.value) || 0 })}
                  onBlur={handleConfigSave}
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Overhead %</Label>
                <Input
                  type="number"
                  value={config.overheadPercent}
                  onChange={(e) => setConfig({ ...config, overheadPercent: parseFloat(e.target.value) || 0 })}
                  onBlur={handleConfigSave}
                  step="0.1"
                  min="0"
                  max="100"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Units per batch</Label>
                <Input
                  type="number"
                  value={config.unitsPerBatch}
                  onChange={(e) => setConfig({ ...config, unitsPerBatch: parseInt(e.target.value) || 1 })}
                  onBlur={handleConfigSave}
                  min="1"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Target margin %</Label>
                <Input
                  type="number"
                  value={config.targetMarginPercent}
                  onChange={(e) => setConfig({ ...config, targetMarginPercent: parseFloat(e.target.value) || 50 })}
                  onBlur={handleConfigSave}
                  step="1"
                  min="0"
                  max="99"
                />
              </div>
            </div>
            <button
              onClick={handleConfigSave}
              disabled={isPending}
              className="mt-4 flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark disabled:opacity-50"
            >
              <Save className="h-3.5 w-3.5" />
              {isPending ? "Saving..." : "Save config"}
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar — cost summary */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <DollarSign className="h-4 w-4 text-brand" />
              Cost Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ingredients</span>
                <span>{fmt(breakdown.totalIngredientCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Labour</span>
                <span>{fmt(breakdown.laborCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Packaging</span>
                <span>{fmt(breakdown.packagingCost)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Overhead ({config.overheadPercent}%)</span>
                <span>{fmt(breakdown.overheadCost)}</span>
              </div>
              <div className="border-t border-border pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total COGS</span>
                  <span>{fmt(breakdown.totalCOGS)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Per Unit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Cost per unit</span>
              <span className="font-semibold">{fmt(breakdown.costPerUnit)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">
                Wholesale ({config.targetMarginPercent}% margin)
              </span>
              <span className="font-semibold text-brand">
                {fmt(breakdown.suggestedWholesale)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Retail (2x wholesale)</span>
              <span className="font-semibold text-brand">
                {fmt(breakdown.suggestedRetail)}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Based on {config.unitsPerBatch} unit{config.unitsPerBatch !== 1 ? "s" : ""} per {batchSizeG}g batch
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
