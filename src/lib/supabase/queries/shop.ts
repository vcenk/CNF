import { createClient } from "@/lib/supabase/server";

export async function getPublishedProducts(category?: string) {
  const supabase = await createClient();

  let query = supabase
    .from("shop_products")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });

  if (category) {
    query = query.eq("category", category);
  }

  const { data, error } = await query;
  if (error) {
    console.error("Error fetching products:", error);
    return [];
  }
  return data ?? [];
}

export async function getProductBySlug(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shop_products")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .single();

  if (error) return null;
  return data;
}

export async function getAllProductSlugs() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shop_products")
    .select("slug")
    .eq("is_published", true);

  if (error) return [];
  return (data ?? []).map((d) => d.slug);
}

export async function createOrder(
  productId: string,
  email: string,
  stripeSessionId: string | null,
  downloadToken: string
) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shop_orders")
    .insert({
      product_id: productId,
      email,
      stripe_session_id: stripeSessionId,
      status: stripeSessionId ? "pending" : "completed",
      download_token: downloadToken,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating order:", error);
    return null;
  }
  return data;
}

export async function getOrderByToken(token: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("shop_orders")
    .select("*, shop_products(*)")
    .eq("download_token", token)
    .single();

  if (error) return null;
  return data;
}

export async function addEmailSubscriber(email: string, source: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("email_subscribers")
    .upsert({ email, source }, { onConflict: "email" });

  if (error) {
    console.error("Error adding subscriber:", error);
    return false;
  }
  return true;
}
