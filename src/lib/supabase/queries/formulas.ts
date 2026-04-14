import { createClient } from "@/lib/supabase/server";

export async function getUserFormulas(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulas")
    .select(`
      *,
      formula_versions(id, version_number, is_current, created_at),
      formula_ingredients:formula_versions!inner(
        formula_ingredients(count)
      )
    `)
    .eq("user_id", userId)
    .eq("is_archived", false)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Error fetching formulas:", error);
    return [];
  }
  return data ?? [];
}

export async function getFormulaById(formulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formulas")
    .select("*")
    .eq("id", formulaId)
    .single();

  if (error) return null;
  return data;
}

export async function getCurrentVersion(formulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formula_versions")
    .select("*")
    .eq("formula_id", formulaId)
    .eq("is_current", true)
    .single();

  if (error) return null;
  return data;
}

export async function getVersionIngredients(versionId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formula_ingredients")
    .select(`
      *,
      ingredients(
        id, inci_name, common_name, slug,
        hotlist_status, hotlist_max_concentration, hotlist_conditions,
        usage_type_restriction, is_fragrance_allergen,
        typical_use_level_min, typical_use_level_max
      )
    `)
    .eq("formula_version_id", versionId)
    .order("phase")
    .order("sort_order");

  if (error) {
    console.error("Error fetching version ingredients:", error);
    return [];
  }
  return data ?? [];
}

export async function getFormulaVersions(formulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formula_versions")
    .select("*")
    .eq("formula_id", formulaId)
    .order("version_number", { ascending: false });

  if (error) return [];
  return data ?? [];
}
