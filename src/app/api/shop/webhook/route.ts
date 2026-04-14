import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@supabase/supabase-js";

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature")!;

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const productId = session.metadata?.product_id;
    const downloadToken = session.metadata?.download_token;
    const email = session.customer_details?.email;

    if (productId && downloadToken && email) {
      // Create order record
      await getSupabaseAdmin().from("shop_orders").insert({
        product_id: productId,
        email,
        stripe_session_id: session.id,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
        status: "completed",
        download_token: downloadToken,
      });

      // Increment download count
      await getSupabaseAdmin().rpc("increment_download_count", {
        p_id: productId,
      });
    }
  }

  return NextResponse.json({ received: true });
}
