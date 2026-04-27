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

export function IngredientTable({ versionId, ingredients }: IngredientTableProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showSearch, setShowSearch] = useState(false);

  const total = ingredients.reduce((sum, ing) => sum + Number(ing.percentage), 0);

  function handlePercentageChange(rowId: string, value: string) {
    const pct = parseFloat(value);
    if (isNaN(pct) || pct <= 0) return;
    startTransition(async () => {
      await updateIngredientAction(rowId, { percentage: pct });
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
                    <TableHead className="w-[40%]">Ingredient</TableHead>
                    <TableHead className="w-[15%]">%</TableHead>
                    <TableHead className="w-[20%]">Phase</TableHead>
                    <TableHead className="w-[15%]">Status</TableHead>
                    <TableHead className="w-[10%]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {group.items.map((ing) => (
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
                        <Input
                          type="number"
                          defaultValue={ing.percentage}
                          onBlur={(e) => handlePercentageChange(ing.id, e.target.value)}
                          className="w-20 text-sm"
                          step="0.1"
                          min="0.001"
                          max="100"
                        />
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
                  ))}
                </TableBody>
              </Table>
            </div>
          ))}

          {/* Total bar */}
          <div className={`flex items-center justify-between rounded-lg border px-4 py-3 text-sm font-medium ${
            total >= 99.5 && total <= 100.5
              ? "border-success/30 bg-success-soft/30 text-success"
              : "border-destructive/30 bg-danger-soft/30 text-danger"
          }`}>
            <span>Total</span>
            <span>{total.toFixed(1)}%</span>
          </div>
        </div>
      )}
    </div>
  );
}
