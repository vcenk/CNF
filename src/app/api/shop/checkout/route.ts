import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { productId, productSlug } = await request.json();

    if (!productId || !productSlug) {
      return NextResponse.json({ error: "Missing product info" }, { status: 400 });
    }

    // Fetch product from Supabase
    const supabase = await createClient();
    const { data: product, error } = await supabase
      .from("shop_products")
      .select("*")
      .eq("id", productId)
      .eq("is_published", true)
      .single();

    if (error || !product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    if (product.is_free) {
      return NextResponse.json({ error: "This is a free product" }, { status: 400 });
    }

    const downloadToken = crypto.randomBytes(32).toString("hex");

    // Create Stripe checkout session
    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: product.title,
              description: product.description ?? undefined,
            },
            unit_amount: Math.round(Number(product.price_cad) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Use trusted siteConfig.url, NOT the request Origin header.
      // An attacker could spoof Origin to phish users with a fake
      // post-payment redirect. Slug is also restricted to URL-safe chars
      // before being interpolated into the path.
      success_url: `${siteConfig.url}/shop/${encodeURIComponent(productSlug)}/download?token=${downloadToken}`,
      cancel_url: `${siteConfig.url}/shop/${encodeURIComponent(productSlug)}`,
      metadata: {
        product_id: productId,
        download_token: downloadToken,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
