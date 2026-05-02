/**
 * Billing helpers — pure logic, no I/O.
 *
 * Maps Stripe price IDs and subscription statuses to the application's
 * tier system. Exposed as plain functions so the webhook handler and
 * the checkout API can both rely on the same logic.
 */

import type { SubscriptionTier } from "./plan-limits";

export type BillingInterval = "month" | "year";

export type StripeSubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "unpaid"
  | "incomplete"
  | "incomplete_expired"
  | "paused";

/**
 * Given a Stripe price ID, return the matching billing interval (month
 * or year). Returns null if the price ID isn't one of ours — webhook
 * handlers should treat this as a configuration error and skip the row.
 */
export function intervalForPriceId(priceId: string): BillingInterval | null {
  if (priceId === process.env.STRIPE_PRICE_MAKER_MONTHLY) return "month";
  if (priceId === process.env.STRIPE_PRICE_MAKER_ANNUAL) return "year";
  return null;
}

/**
 * Given a Stripe price ID, return the matching application tier.
 * Today every Maker price (monthly + annual) maps to "maker". When we
 * add a Studio tier later, branch here.
 */
export function tierForPriceId(priceId: string): SubscriptionTier | null {
  if (
    priceId === process.env.STRIPE_PRICE_MAKER_MONTHLY ||
    priceId === process.env.STRIPE_PRICE_MAKER_ANNUAL
  ) {
    return "maker";
  }
  return null;
}

/**
 * Return the right tier for the user given the live Stripe subscription
 * status. "trialing" and "active" → use the price ID's tier. Anything
 * else → drop back to "free".
 *
 * This is the single source of truth for "is this user paid right now?"
 * The webhook handler calls this on every subscription event and writes
 * the result to profiles.subscription_tier.
 */
export function tierForSubscriptionState(
  status: StripeSubscriptionStatus,
  priceId: string
): SubscriptionTier {
  if (status === "trialing" || status === "active") {
    return tierForPriceId(priceId) ?? "free";
  }
  return "free";
}

/**
 * Validate billing env vars are set on app boot. Throw an explicit error
 * with which var is missing so deploy logs are easy to debug.
 *
 * Call this from server-only code paths (webhook, checkout API). Don't
 * call from client / edge as the env vars are not exposed.
 */
export function assertBillingEnv(): {
  monthlyPriceId: string;
  annualPriceId: string;
  webhookSecret: string;
} {
  const monthlyPriceId = process.env.STRIPE_PRICE_MAKER_MONTHLY;
  const annualPriceId = process.env.STRIPE_PRICE_MAKER_ANNUAL;
  const webhookSecret = process.env.STRIPE_BILLING_WEBHOOK_SECRET;

  const missing: string[] = [];
  if (!monthlyPriceId) missing.push("STRIPE_PRICE_MAKER_MONTHLY");
  if (!annualPriceId) missing.push("STRIPE_PRICE_MAKER_ANNUAL");
  if (!webhookSecret) missing.push("STRIPE_BILLING_WEBHOOK_SECRET");

  if (missing.length > 0) {
    throw new Error(
      `Billing env vars not set: ${missing.join(", ")}. Add them in Vercel and redeploy.`
    );
  }
  return {
    monthlyPriceId: monthlyPriceId!,
    annualPriceId: annualPriceId!,
    webhookSecret: webhookSecret!,
  };
}
