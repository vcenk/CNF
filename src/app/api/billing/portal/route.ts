import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { siteConfig } from "@/lib/site-config";
import { requireAuth } from "@/lib/auth/require-auth";

/**
 * Open the Stripe Customer Portal for the signed-in user.
 *
 * The portal is hosted by Stripe and lets the user:
 *   - Update payment method
 *   - View past invoices
 *   - Switch between monthly and annual
 *   - Cancel subscription
 *
 * Configuration of WHICH actions are available is set in the Stripe
 * dashboard at https://dashboard.stripe.com/settings/billing/portal
 * (one-time setup; allow plan switching + cancellation at minimum).
 */
export async function POST() {
  try {
    const user = await requireAuth();

    const supabase = await createClient();
    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json(
        {
          error:
            "No subscription found. Start one from the pricing page.",
          code: "no_customer",
        },
        { status: 404 }
      );
    }

    const session = await getStripe().billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${siteConfig.url}/dashboard/account`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Billing portal error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      {
        error:
          err instanceof Error
            ? err.message
            : "Could not open the billing portal.",
      },
      { status: 500 }
    );
  }
}
