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
 *
 * IMPORTANT: this handler must be defensive — Stripe payload shape varies
 * between API versions, and a thrown error returns 500 to Stripe which
 * triggers retries (~3 days of them). Always wrap risky access in
 * try/catch and surface the real error in logs.
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

/**
 * Read a unix-timestamp field that may live on either the subscription
 * or the subscription item, depending on the Stripe API version Stripe
 * is sending us. Returns ISO string or null.
 *
 * - 2025+ APIs: period fields live on item (subscription.items.data[0])
 * - Pre-2025 APIs: same fields live on subscription itself
 *
 * We support both so the webhook works regardless of which API version
 * the dashboard endpoint is configured to use.
 */
function unixTsToIso(value: unknown): string | null {
  if (typeof value !== "number" || !isFinite(value) || value <= 0) return null;
  try {
    return new Date(value * 1000).toISOString();
  } catch {
    return null;
  }
}

function readPeriodTimestamps(subscription: Stripe.Subscription): {
  start: string | null;
  end: string | null;
} {
  // Try item-level first (newer API)
  const item = subscription.items?.data?.[0] as
    | (Stripe.SubscriptionItem & {
        current_period_start?: number;
        current_period_end?: number;
      })
    | undefined;

  // Fall back to subscription-level (older API), accessed via cast since the
  // SDK type for the pinned API may not list these fields.
  const subWithLegacy = subscription as unknown as {
    current_period_start?: number;
    current_period_end?: number;
  };

  return {
    start: unixTsToIso(item?.current_period_start ?? subWithLegacy.current_period_start),
    end: unixTsToIso(item?.current_period_end ?? subWithLegacy.current_period_end),
  };
}

async function syncSubscription(
  subscription: Stripe.Subscription
): Promise<SyncResult> {
  try {
    const supabase = getSupabaseAdmin();

    const userId =
      (subscription.metadata?.user_id as string | undefined) ?? null;

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
        reason:
          "No user_id in subscription metadata and no profile matching stripe_customer_id",
      };
    }

    const item = subscription.items?.data?.[0];
    if (!item) {
      return { ok: false, reason: "Subscription has no items" };
    }

    const priceId = item.price?.id;
    if (!priceId) {
      return { ok: false, reason: "Subscription item has no price ID" };
    }

    const interval = intervalForPriceId(priceId);
    if (!interval) {
      return {
        ok: false,
        reason: `Unknown price ID ${priceId} — check STRIPE_PRICE_MAKER_MONTHLY / STRIPE_PRICE_MAKER_ANNUAL env vars`,
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

    const periods = readPeriodTimestamps(subscription);

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
          current_period_start: periods.start,
          current_period_end: periods.end,
          cancel_at_period_end: subscription.cancel_at_period_end ?? false,
          canceled_at: unixTsToIso(subscription.canceled_at),
          trial_end: unixTsToIso(subscription.trial_end),
        },
        { onConflict: "user_id" }
      );

    if (subError) {
      console.error("[billing webhook] Subscription upsert FAILED:", {
        code: subError.code,
        message: subError.message,
        details: subError.details,
        hint: subError.hint,
      });
      return { ok: false, reason: `subscriptions upsert: ${subError.message}` };
    }

    const { error: profileError } = await supabase
      .from("profiles")
      .update({ subscription_tier: tier })
      .eq("id", resolvedUserId);

    if (profileError) {
      console.error("[billing webhook] Profile tier update FAILED:", {
        code: profileError.code,
        message: profileError.message,
        details: profileError.details,
        hint: profileError.hint,
      });
      return { ok: false, reason: `profiles update: ${profileError.message}` };
    }

    console.log("[billing webhook] Sync succeeded:", {
      userId: resolvedUserId,
      subscriptionId: subscription.id,
      status: subscription.status,
      tier,
      interval,
    });

    return { ok: true };
  } catch (err) {
    // CATCH ALL — never let syncSubscription throw upward
    return {
      ok: false,
      reason: `syncSubscription threw: ${
        err instanceof Error ? err.message : String(err)
      }`,
    };
  }
}

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");
  if (!sig) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_BILLING_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("[billing webhook] STRIPE_BILLING_WEBHOOK_SECRET not set");
    return NextResponse.json(
      { error: "Webhook not configured" },
      { status: 500 }
    );
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error("[billing webhook] Signature verification failed:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        // No-op for now; subscription.created handles the actual sync.
        if (session.mode !== "subscription") break;
        break;
      }

      case "customer.subscription.created":
      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const result = await syncSubscription(subscription);
        if (!result.ok) {
          console.error("[billing webhook] Subscription sync failed:", {
            event: event.type,
            subscriptionId: subscription.id,
            reason: result.reason,
          });
          // Return 200 anyway — this is a permanent failure (config /
          // data issue), retrying won't help. Stripe will keep retrying
          // 3xx/5xx for ~3 days, polluting the dashboard.
          return NextResponse.json({
            received: true,
            warning: result.reason,
          });
        }
        break;
      }

      case "invoice.payment_succeeded":
      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const subId =
          (invoice as unknown as { subscription?: string | Stripe.Subscription })
            .subscription;
        try {
          if (typeof subId === "string") {
            const sub = await getStripe().subscriptions.retrieve(subId);
            const result = await syncSubscription(sub);
            if (!result.ok) {
              console.error("[billing webhook] Invoice sync failed:", {
                event: event.type,
                invoiceId: invoice.id,
                subscriptionId: subId,
                reason: result.reason,
              });
            }
          } else if (subId && typeof subId === "object") {
            const result = await syncSubscription(subId);
            if (!result.ok) {
              console.error("[billing webhook] Invoice sync failed (expanded):", {
                event: event.type,
                invoiceId: invoice.id,
                reason: result.reason,
              });
            }
          } else {
            console.log("[billing webhook] Invoice has no subscription, skipping:", {
              event: event.type,
              invoiceId: invoice.id,
            });
          }
        } catch (err) {
          console.error("[billing webhook] Failed to retrieve subscription for invoice:", {
            event: event.type,
            invoiceId: invoice.id,
            message: err instanceof Error ? err.message : "unknown",
            stack: err instanceof Error ? err.stack : undefined,
          });
          // Return 200 — don't make Stripe retry an unrecoverable error
        }
        break;
      }

      default:
        break;
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    // Last-resort safety net. We try very hard NEVER to reach here —
    // every branch above wraps risky calls in their own try/catch and
    // returns 200. If we still reach this catch, something deeply
    // unexpected happened.
    console.error("[billing webhook] UNEXPECTED handler error:", {
      type: event.type,
      message: err instanceof Error ? err.message : "unknown",
      stack: err instanceof Error ? err.stack : undefined,
      eventId: event.id,
    });
    // Return 200 to stop retry storms. The error is logged for debugging.
    return NextResponse.json({
      received: true,
      warning: "Handler error — see server logs",
    });
  }
}
