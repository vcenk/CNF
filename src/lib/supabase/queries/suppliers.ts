import { createClient } from "@/lib/supabase/server";

export const PROVINCES_CA = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland & Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
] as const;

export type ProvinceCode = (typeof PROVINCES_CA)[number]["code"];

export const PROVINCE_LABEL: Record<ProvinceCode, string> = Object.fromEntries(
  PROVINCES_CA.map((p) => [p.code, p.name])
) as Record<ProvinceCode, string>;

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
