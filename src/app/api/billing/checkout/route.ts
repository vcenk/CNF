import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import { requireAuth } from "@/lib/auth/require-auth";
import { assertBillingEnv } from "@/lib/billing";

interface CheckoutRequest {
  interval?: "month" | "year";
}

export async function POST(request: Request) {
  try {
    const user = await requireAuth();
    const env = assertBillingEnv();

    const body = (await request.json().catch(() => ({}))) as CheckoutRequest;
    const interval = body.interval === "year" ? "year" : "month";
    const priceId =
      interval === "year" ? env.annualPriceId : env.monthlyPriceId;

    const supabase = await createClient();

    // Reuse existing customer if we've seen this user before.
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email, display_name")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id ?? null;

    if (!customerId) {
      const customer = await getStripe().customers.create({
        email: user.email ?? profile?.email ?? undefined,
        name: profile?.display_name || undefined,
        metadata: { user_id: user.id },
      });
      customerId = customer.id;
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: customerId })
        .eq("id", user.id);
    }

    // Don't double-subscribe — if there's already a live subscription,
    // send them to the portal to manage it instead.
    const { data: existing } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();
    if (
      existing?.status === "active" ||
      existing?.status === "trialing" ||
      existing?.status === "past_due"
    ) {
      return NextResponse.json(
        {
          error:
            "You already have an active subscription. Use 'Manage subscription' to switch plans.",
          code: "already_subscribed",
        },
        { status: 409 }
      );
    }

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      customer: customerId,
      line_items: [{ price: priceId, quantity: 1 }],
      // 14-day trial, no card required up front (still asked at end of trial)
      subscription_data: {
        trial_period_days: 14,
        metadata: { user_id: user.id },
      },
      // Don't require a payment method until trial ends. Higher signup
      // conversion at the cost of slightly lower trial-to-paid rate.
      payment_method_collection: "if_required",
      // Use trusted siteConfig.url, NOT the request Origin header (avoids
      // post-payment phishing redirect via spoofed Origin)
      success_url: `${siteConfig.url}/dashboard/account?billing=success`,
      cancel_url: `${siteConfig.url}/pricing?billing=canceled`,
      allow_promotion_codes: true,
      // Tax / currency stay default (CAD) — Stripe price object dictates it
      metadata: { user_id: user.id, interval },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing checkout error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Could not start checkout. Try again in a moment.",
      },
      { status: 500 }
    );
  }
}
