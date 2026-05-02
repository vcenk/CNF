import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import {
  intervalForPriceId,
  tierForSubscriptionState,
  type StripeSubscriptionStatus,
} from "@/lib/billing";

/**
 * Stripe billing webhook for subscription lifecycle events.
 *
 * Subscribed events (configure in Stripe dashboard webhook settings):
 *   - checkout.session.completed
 *   - customer.subscription.created
 *   - customer.subscription.updated
 *   - customer.subscription.deleted
 *   - invoice.payment_succeeded
 *   - invoice.payment_failed
 *
 * Verifies the signature using STRIPE_BILLING_WEBHOOK_SECRET (separate
 * from the shop webhook so they can rotate independently).
 *
 * Writes to public.subscriptions and public.profiles via the service
 * role client (bypasses RLS).
 */

function getSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

interface SyncResult {
  ok: boolean;
  reason?: string;
}

async function syncSubscription(
  subscription: Stripe.Subscription
): Promise<SyncResult> {
  const supabase = getSupabaseAdmin();

  const userId =
    (subscription.metadata?.user_id as string | undefined) ??
    null;

  // Fall back to looking up the profile by stripe_customer_id (older
  // subs created before we started writing user_id metadata).
  let resolvedUserId = userId;
  if (!resolvedUserId) {
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .maybeSingle();
    resolvedUserId = profile?.id ?? null;
  }

  if (!resolvedUserId) {
    return {
      ok: false,
      reason: "No user_id in metadata and no profile matching stripe_customer_id",
    };
  }

  const item = subscription.items.data[0];
  if (!item) {
    return { ok: false, reason: "Subscription has no items" };
  }

  const priceId = item.price.id;
  const interval = intervalForPriceId(priceId);
  if (!interval) {
    return {
      ok: false,
      reason: `Unknown price ID ${priceId} — check STRIPE_PRICE_MAKER_* env vars`,
    };
  }

  const tier = tierForSubscriptionState(
    subscription.status as StripeSubscriptionStatus,
    priceId
  );

  const customerId =
    typeof subscription.customer === "string"
      ? subscription.customer
      : subscription.customer.id;

  // Upsert into subscriptions table (one row per user, keyed by user_id)
  const { error: subError } = await supabase
    .from("subscriptions")
    .upsert(
      {
        user_id: resolvedUserId,
        stripe_customer_id: customerId,
        stripe_subscription_id: subscription.id,
        stripe_price_id: priceId,
        status: subscription.status,
        tier,
        interval,
        current_period_start: item.current_period_start
          ? new Date(item.current_period_start * 1000).toISOString()
          : null,
        current_period_end: item.current_period_end
          ? new Date(item.current_period_end * 1000).toISOString()
          : null,
        cancel_at_period_end: subscription.cancel_at_period_end,
        canceled_at: subscription.canceled_at
          ? new Date(subscription.canceled_at * 1000).toISOString()
          : null,
        trial_end: subscription.trial_end
          ? new Date(subscription.trial_end * 1000).toISOString()
          : null,
      },
      { onConflict: "user_id" }
    );

  if (subError) {
    console.error("Subscription upsert error:", {
      code: subError.code,
      message: subError.message,
    });
    return { ok: false, reason: subError.message };
  }

  // Mirror the canonical tier onto profiles for fast read paths
  const { error: profileError } = await supabase
    .from("profiles")
    .update({ subscription_tier: tier })
    .eq("id", resolvedUserId);

  if (profileError) {
    console.error("Profile tier update error:", {
      code: profileError.code,
      message: profileError.message,
    });
    return { ok: false, reason: profileError.message };
  }

  return { ok: true };
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_BILLING_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_BILLING_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("Billing webhook signature verification failed:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // Subscription Checkout sessions create the subscription, but
        // the customer.subscription.created event handles the upsert.
        // We only need this branch if we want to react specifically to
        // the moment of purchase (e.g. log analytics). Leaving as a
        // no-op for now.
        if (session.mode !== "subscription") break;
        // Optional: log to activity feed once we have a billing log table
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await syncSubscription(subscription);
        if (!result.ok) {
          console.error("Subscription sync failed:", {
            event: event.type,
            subscriptionId: subscription.id,
            reason: result.reason,
          });
        }
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        // Re-sync the subscription so its status reflects latest payment
        // outcome (e.g. past_due → active after retry).
        const subId =
          (invoice as unknown as { subscription?: string | Stripe.Subscription })
            .subscription;
        if (typeof subId === "string") {
          const sub = await getStripe().subscriptions.retrieve(subId);
          await syncSubscription(sub);
        } else if (subId && typeof subId === "object") {
          await syncSubscription(subId);
        }
        break;
      }

      default:
        // Ignore other event types — only subscribe to what we handle
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Billing webhook handler error:", {
      type: event.type,
      message: err instanceof Error ? err.message : "unknown",
    });
    // Return 500 so Stripe retries
    return NextResponse.json({ error: "Handler failure" }, { status: 500 });
  }
}
