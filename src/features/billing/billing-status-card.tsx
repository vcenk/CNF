"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CreditCard, ArrowUpRight, Sparkles } from "lucide-react";

interface BillingStatusCardProps {
  tier: "free" | "maker" | "studio" | "business";
  status: string | null; // 'trialing' | 'active' | 'past_due' | 'canceled' | etc.
  interval: string | null; // 'month' | 'year' | null when free
  currentPeriodEnd: string | null; // ISO timestamp
  cancelAtPeriodEnd: boolean;
  trialEnd: string | null;
}

function formatDate(iso: string | null): string {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function BillingStatusCard({
  tier,
  status,
  interval,
  currentPeriodEnd,
  cancelAtPeriodEnd,
  trialEnd,
}: BillingStatusCardProps) {
  const [pending, setPending] = useState(false);

  async function openPortal() {
    if (pending) return;
    setPending(true);
    try {
      const r = await fetch("/api/billing/portal", { method: "POST" });
      const data = (await r.json().catch(() => ({}))) as {
        url?: string;
        error?: string;
      };
      if (!r.ok || !data.url) {
        toast.error("Could not open billing portal", {
          description: data.error || `(${r.status})`,
        });
        setPending(false);
        return;
      }
      window.location.href = data.url;
    } catch (err) {
      toast.error("Network error", {
        description: err instanceof Error ? err.message : "Try again",
      });
      setPending(false);
    }
  }

  const isFree = tier === "free";
  const isTrialing = status === "trialing";
  const isPastDue = status === "past_due";
  const isCanceling = cancelAtPeriodEnd && (status === "active" || status === "trialing");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-3">
          <div>
            <CardTitle className="text-base">Subscription</CardTitle>
            <CardDescription>
              {isFree
                ? "You're on the Free plan."
                : isTrialing
                ? "You're on a Maker trial."
                : "You're on the Maker plan."}
            </CardDescription>
          </div>
          <span
            className={
              "rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wider " +
              (isFree
                ? "bg-muted text-muted-foreground"
                : isPastDue
                ? "bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-200"
                : "bg-brand-soft text-brand")
            }
          >
            {isFree ? "Free" : tier === "maker" ? "Maker" : tier}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {isFree ? (
          <>
            <div className="rounded-lg border border-brand/30 bg-brand-soft/20 p-4">
              <div className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <div>
                  <p className="text-sm font-medium">Upgrade to Maker for $12 CAD/month</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Unlimited formulas, soap maker integration, CNF prep package, bilingual labels, costing, supplier price tracking. 7-day free trial — no card required.
                  </p>
                  <Link
                    href="/pricing"
                    className="mt-3 inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-brand-dark"
                  >
                    See plans <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <dl className="grid gap-2 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Status
                </dt>
                <dd className="mt-0.5">
                  {status === "trialing" && "Trial in progress"}
                  {status === "active" && (cancelAtPeriodEnd ? "Active — cancels at period end" : "Active")}
                  {status === "past_due" && "Payment overdue"}
                  {status === "canceled" && "Canceled"}
                  {status === "unpaid" && "Unpaid"}
                  {!["trialing", "active", "past_due", "canceled", "unpaid"].includes(status ?? "") && (status ?? "—")}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Billing interval
                </dt>
                <dd className="mt-0.5 capitalize">{interval ?? "—"}{interval ? "ly" : ""}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {isCanceling ? "Cancels on" : isTrialing ? "Trial ends" : "Renews on"}
                </dt>
                <dd className="mt-0.5">
                  {isTrialing ? formatDate(trialEnd) : formatDate(currentPeriodEnd)}
                </dd>
              </div>
            </dl>

            {isPastDue && (
              <div className="rounded-lg border border-rose-200 bg-rose-50/60 p-3 text-xs text-rose-900 dark:border-rose-900/40 dark:bg-rose-950/20 dark:text-rose-200">
                Your last payment failed. Open the billing portal to update your card before access is suspended.
              </div>
            )}

            {isCanceling && (
              <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
                Your subscription is set to cancel on {formatDate(currentPeriodEnd)}. You can resume it any time before that date in the portal.
              </div>
            )}

            <button
              type="button"
              onClick={openPortal}
              disabled={pending}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              <CreditCard className="h-4 w-4" />
              {pending ? "Opening…" : "Manage subscription"}
            </button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
