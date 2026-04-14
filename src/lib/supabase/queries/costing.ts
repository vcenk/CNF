import { createClient } from "@/lib/supabase/server";

export async function getCostConfig(formulaId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("formula_cost_config")
    .select("*")
    .eq("formula_id", formulaId)
    .single();

  // Return defaults if no config exists
  return data ?? {
    labor_cost_per_batch: 0,
    packaging_cost_per_unit: 0,
    overhead_percent: 0,
    target_margin_percent: 50,
    units_per_batch: 1,
  };
}

export async function getIngredientPrices(
  userId: string,
  ingredientIds: string[]
) {
  if (ingredientIds.length === 0) return { userPrices: [], seedPrices: [] };

  const supabase = await createClient();

  // Get user-specific prices
  const { data: userPrices } = await supabase
    .from("user_ingredient_prices")
    .select("ingredient_id, price_per_kg")
    .eq("user_id", userId)
    .in("ingredient_id", ingredientIds)
    .order("effective_date", { ascending: false });

  // Get seed prices (public supplier prices — cheapest per ingredient)
  const { data: seedPrices } = await supabase
    .from("ingredient_supplier_prices")
    .select("ingredient_id, price_per_kg")
    .in("ingredient_id", ingredientIds)
    .order("price_per_kg", { ascending: true });

  return {
    userPrices: userPrices ?? [],
    seedPrices: seedPrices ?? [],
  };
}

export async function upsertCostConfig(
  formulaId: string,
  config: {
    labor_cost_per_batch: number;
    packaging_cost_per_unit: number;
    overhead_percent: number;
    target_margin_percent: number;
    units_per_batch: number;
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("formula_cost_config")
    .upsert(
      { formula_id: formulaId, ...config, updated_at: new Date().toISOString() },
      { onConflict: "formula_id" }
    );

  return { error: error?.message ?? null };
}

export async function setUserIngredientPrice(
  userId: string,
  ingredientId: string,
  pricePerKg: number
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("user_ingredient_prices")
    .upsert(
      {
        user_id: userId,
        ingredient_id: ingredientId,
        price_per_kg: pricePerKg,
        effective_date: new Date().toISOString().split("T")[0],
      },
      { onConflict: "user_id,ingredient_id,effective_date" }
    );

  return { error: error?.message ?? null };
}
