"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  addIngredientAction,
  updateIngredientAction,
  removeIngredientAction,
} from "@/app/formulas/actions";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { HotlistBadge } from "@/features/ingredients/hotlist-badge";
import { Trash2, Plus } from "lucide-react";
import { IngredientSearchAdd } from "./ingredient-search-add";
import {
  UNIT_LABELS,
  formatForUnit,
  formatPoundsAndOunces,
  inputToPercent,
  percentToDisplay,
  type FormulaUnit,
} from "@/lib/units";

interface IngredientRow {
  id: string;
  ingredient_id: string;
  percentage: number;
  phase: string;
  sort_order: number;
  ingredients: {
    inci_name: string;
    common_name: string | null;
    slug: string;
    hotlist_status: string;
    is_fragrance_allergen: boolean;
  } | null;
}

interface IngredientTableProps {
  versionId: string;
  ingredients: IngredientRow[];
  preferredUnit?: FormulaUnit;
  batchSizeG?: number;
}

const phases = [
  { value: "water", label: "Water" },
  { value: "oil", label: "Oil" },
  { value: "emulsifier", label: "Emulsifier" },
  { value: "active", label: "Active" },
  { value: "cool_down", label: "Cool-down" },
  { value: "fragrance", label: "Fragrance" },
  { value: "preservative", label: "Preservative" },
  { value: "main", label: "Main" },
];

export function IngredientTable({
  versionId,
  ingredients,
  preferredUnit = "percent",
  batchSizeG = 100,
}: IngredientTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSearch, setShowSearch] = useState(false);

  const total = ingredients.reduce((sum, ing) => sum + Number(ing.percentage), 0);
  const totalGrams = (total / 100) * batchSizeG;
  const isWeightMode = preferredUnit !== "percent";

  function handleInputChange(rowId: string, value: string) {
    const parsed = parseFloat(value);
    if (isNaN(parsed) || parsed <= 0) return;

    // Always store as percentage. In weight modes, convert via batch size.
    const percentToSave = inputToPercent(parsed, preferredUnit, batchSizeG);

    if (percentToSave <= 0 || !isFinite(percentToSave)) return;

    startTransition(async () => {
      await updateIngredientAction(rowId, { percentage: percentToSave });
      router.refresh();
    });
  }

  function handlePhaseChange(rowId: string, phase: string) {
    startTransition(async () => {
      await updateIngredientAction(rowId, { phase });
      router.refresh();
    });
  }

  function handleRemove(rowId: string) {
    startTransition(async () => {
      await removeIngredientAction(rowId);
      router.refresh();
    });
  }

  function handleAddIngredient(ingredientId: string) {
    startTransition(async () => {
      await addIngredientAction(versionId, ingredientId, 1, "main");
      router.refresh();
      setShowSearch(false);
    });
  }

  // Group by phase
  const grouped = phases
    .map((p) => ({
      ...p,
      items: ingredients.filter((i) => i.phase === p.value),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          Ingredients ({ingredients.length})
        </h2>
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
        >
          <Plus className="h-3.5 w-3.5" />
          Add ingredient
        </button>
      </div>

      {showSearch && (
        <IngredientSearchAdd
          onSelect={handleAddIngredient}
          onClose={() => setShowSearch(false)}
          existingIds={ingredients.map((i) => i.ingredient_id)}
        />
      )}

      {ingredients.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">
            No ingredients yet. Click &ldquo;Add ingredient&rdquo; to search the database.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {grouped.map((group) => (
            <div key={group.value}>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground uppercase tracking-wider">
                {group.label} Phase
              </h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[35%]">Ingredient</TableHead>
                    <TableHead className="w-[20%]">
                      Amount
                      {isWeightMode && (
                        <span className="ml-1 text-xs font-normal text-muted-foreground">
                          ({UNIT_LABELS[preferredUnit]})
                        </span>
                      )}
                    </TableHead>
                    <TableHead className="w-[20%]">Phase</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead className="w-[10%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((ing) => {
                    const displayValue = percentToDisplay(
                      Number(ing.percentage),
                      preferredUnit,
                      batchSizeG
                    );
                    return (
                    <TableRow key={ing.id} className={isPending ? "opacity-60" : ""}>
                      <TableCell>
                        <div>
                          <span className="font-medium text-sm">
                            {ing.ingredients?.common_name || ing.ingredients?.inci_name}
                          </span>
                          {ing.ingredients?.common_name && (
                            <span className="block text-xs text-muted-foreground">
                              {ing.ingredients.inci_name}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-0.5">
                          <Input
                            key={`${ing.id}-${ing.percentage}-${preferredUnit}-${batchSizeG}`}
                            type="number"
                            defaultValue={formatForUnit(displayValue, preferredUnit)}
                            onBlur={(e) => handleInputChange(ing.id, e.target.value)}
                            className="w-24 text-sm"
                            step={preferredUnit === "percent" || preferredUnit === "g" ? "0.01" : "0.001"}
                            min="0.001"
                            max={preferredUnit === "percent" ? "100" : undefined}
                            suppressHydrationWarning
                          />
                          {isWeightMode && (
                            <span className="text-[11px] text-muted-foreground">
                              {Number(ing.percentage).toFixed(2).replace(/\.?0+$/, "")}%
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <select
                          defaultValue={ing.phase}
                          onChange={(e) => handlePhaseChange(ing.id, e.target.value)}
                          className="rounded-md border border-border bg-card px-2 py-1 text-sm"
                        >
                          {phases.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                          ))}
                        </select>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <HotlistBadge
                            status={(ing.ingredients?.hotlist_status ?? "not_listed") as "not_listed" | "restricted" | "prohibited"}
                          />
                          {ing.ingredients?.is_fragrance_allergen && (
                            <span className="rounded-full bg-warning-soft px-1.5 py-0.5 text-[10px] text-warning">
                              Allergen
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <button
                          onClick={() => handleRemove(ing.id)}
                          className="rounded p-1 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                  })}
                </TableBody>
              </Table>
            </div>
          ))}

          {/* Total bar — always show both percentage and weight */}
          <div className={`flex flex-wrap items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm font-medium ${
            total >= 99.5 && total <= 100.5
              ? "border-success/30 bg-success-soft/30 text-success"
              : "border-destructive/30 bg-danger-soft/30 text-danger"
          }`}>
            <span>Total</span>
            <span className="flex items-center gap-3">
              <span>{total.toFixed(1)}%</span>
              {batchSizeG > 0 && (
                <span className="text-xs opacity-80">
                  · {formatForUnit(totalGrams, "g")}g
                  {totalGrams >= 100 && (
                    <span className="ml-1.5">({formatPoundsAndOunces(totalGrams)})</span>
                  )}
                </span>
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
