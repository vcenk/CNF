import { createClient } from "@/lib/supabase/server";

export async function getAllSuppliers() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("suppliers")
    .select(
      `
      *,
      ingredient_supplier_prices(count)
    `
    )
    .eq("is_canadian", true)
    .order("name");

  if (error) {
    console.error("Error fetching suppliers:", error);
    return [];
  }

  return data ?? [];
}

export async function getSupplierBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("suppliers")
    .select(
      `
      *,
      ingredient_supplier_prices(
        id,
        price_per_kg,
        currency,
        min_order_kg,
        ingredients(id, inci_name, common_name, slug, hotlist_status)
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

export async function getAllSupplierSlugs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("suppliers")
    .select("slug")
    .order("slug");

  if (error) return [];
  return (data ?? []).map((d) => d.slug);
}
