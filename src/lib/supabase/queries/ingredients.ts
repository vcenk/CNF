import { createClient } from "@/lib/supabase/server";

export interface IngredientSearchParams {
  query?: string;
  functionFilter?: string;
  hotlistFilter?: "all" | "restricted" | "prohibited" | "not_listed";
  page?: number;
  pageSize?: number;
}

export async function searchIngredients({
  query,
  functionFilter,
  hotlistFilter,
  page = 1,
  pageSize = 24,
}: IngredientSearchParams) {
  const supabase = await createClient();
  const offset = (page - 1) * pageSize;

  let dbQuery = supabase
    .from("ingredients")
    .select(
      `
      *,
      ingredient_function_map!inner(
        is_primary,
        ingredient_functions(id, name, slug)
      )
    `,
      { count: "exact" }
    )
    .order("inci_name")
    .range(offset, offset + pageSize - 1);

  if (query && query.trim().length > 0) {
    dbQuery = dbQuery.or(
      `inci_name.ilike.%${query}%,common_name.ilike.%${query}%`
    );
  }

  if (hotlistFilter && hotlistFilter !== "all") {
    dbQuery = dbQuery.eq("hotlist_status", hotlistFilter);
  }

  if (functionFilter) {
    dbQuery = dbQuery.eq(
      "ingredient_function_map.ingredient_functions.slug",
      functionFilter
    );
  }

  const { data, count, error } = await dbQuery;

  if (error) {
    console.error("Error searching ingredients:", error);
    return { ingredients: [], total: 0 };
  }

  return { ingredients: data ?? [], total: count ?? 0 };
}

export async function getIngredientBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select(
      `
      *,
      ingredient_function_map(
        is_primary,
        ingredient_functions(id, name, slug, description)
      ),
      ingredient_supplier_prices(
        id,
        price_per_kg,
        currency,
        min_order_kg,
        suppliers(id, name, slug, website, location, is_canadian)
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error) {
    return null;
  }

  return data;
}

export async function getIngredientFunctions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredient_functions")
    .select("id, name, slug, description")
    .order("name");

  if (error) {
    console.error("Error fetching functions:", error);
    return [];
  }

  return data ?? [];
}

export async function getIngredientsByFunction(functionSlug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select(
      `
      *,
      ingredient_function_map!inner(
        is_primary,
        ingredient_functions!inner(name, slug)
      )
    `
    )
    .eq("ingredient_function_map.ingredient_functions.slug", functionSlug)
    .order("inci_name");

  if (error) {
    console.error("Error fetching by function:", error);
    return [];
  }

  return data ?? [];
}

export async function getHotlistIngredients() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select("*")
    .neq("hotlist_status", "not_listed")
    .order("hotlist_status")
    .order("inci_name");

  if (error) {
    console.error("Error fetching hotlist:", error);
    return [];
  }

  return data ?? [];
}

export async function getRelatedIngredients(
  ingredientId: string,
  functionIds: string[],
  limit = 6
) {
  if (functionIds.length === 0) return [];

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select(
      `
      id, inci_name, common_name, slug, hotlist_status,
      ingredient_function_map!inner(
        ingredient_functions(name, slug)
      )
    `
    )
    .in("ingredient_function_map.function_id", functionIds)
    .neq("id", ingredientId)
    .limit(limit);

  if (error) {
    console.error("Error fetching related:", error);
    return [];
  }

  return data ?? [];
}

export async function getAllIngredientSlugs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("ingredients")
    .select("slug")
    .order("slug");

  if (error) return [];
  return (data ?? []).map((d) => d.slug);
}
