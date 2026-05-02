import { createClient } from "@/lib/supabase/server";

// Re-export client-safe constants for any existing server callers.
// New imports should pull directly from `@/lib/provinces`.
export {
  PROVINCES_CA,
  PROVINCE_LABEL,
  type ProvinceCode,
} from "@/lib/provinces";

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
    .order("province", { nullsFirst: false })
    .order("name");

  if (error) {
    console.error("Error fetching suppliers:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
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
    console.error("Error fetching supplier:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
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
