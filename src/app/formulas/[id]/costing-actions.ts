"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { upsertCostConfig, setUserIngredientPrice } from "@/lib/supabase/queries/costing";

export async function saveCostConfigAction(
  formulaId: string,
  config: {
    labor_cost_per_batch: number;
    packaging_cost_per_unit: number;
    overhead_percent: number;
    target_margin_percent: number;
    units_per_batch: number;
  }
) {
  await requireAuth();

  const { error } = await upsertCostConfig(formulaId, config);
  if (error) return { error };

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true };
}

export async function saveIngredientPriceAction(
  ingredientId: string,
  pricePerKg: number,
  formulaId: string
) {
  const user = await requireAuth();

  const { error } = await setUserIngredientPrice(user.id, ingredientId, pricePerKg);
  if (error) return { error };

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true };
}
