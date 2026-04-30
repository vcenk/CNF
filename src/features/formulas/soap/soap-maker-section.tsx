"use client";

import Link from "next/link";
import { Sparkles, Lock, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SoapForm } from "@/app/tools/soap-calculator/soap-form";
import {
  canUseSoapCalculator,
  type SubscriptionTier,
} from "@/lib/plan-limits";

interface SoapMakerSectionProps {
  tier: SubscriptionTier;
}

export function SoapMakerSection({ tier }: SoapMakerSectionProps) {
  if (!canUseSoapCalculator(tier)) {
    return <SoapMakerPaywall tier={tier} />;
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-brand/30 bg-brand-soft/20 p-5">
        <div className="flex items-start gap-3">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
          <div className="flex-1">
            <p className="text-sm font-semibold">
              Soap Maker — full lye / SAP calculator inside your formula
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              75 oils with fatty-acid profiles, 8 quality scores including
              Longevity, fragrance and additive doses, and one-click recipe
              sharing. Recipes from the{" "}
              <Link
                href="/tools/soap-calculator/recipes"
                className="text-brand underline hover:text-brand-dark"
                target="_blank"
              >
                free recipe library
              </Link>{" "}
              can be loaded with the Share-link &amp; paste flow.
            </p>
          </div>
        </div>
      </div>

      <SoapForm />

      <p className="text-xs text-muted-foreground">
        Tip: changes to the soap calculator stay in your browser tab. To save
        them inside this formula long-term, use the Share recipe link button
        and paste it into the formula notes — full per-formula soap recipe
        persistence is coming soon.
      </p>
    </div>
  );
}

function SoapMakerPaywall({ tier }: { tier: SubscriptionTier }) {
  return (
    <div className="rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-soft/30 via-card to-card p-6 sm:p-10">
      <div className="flex items-start gap-4">
        <div className="rounded-xl bg-brand/15 p-3">
          <Lock className="h-5 w-5 text-brand" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Maker tier feature
          </p>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight">
            Use the soap calculator inside your formula
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            The full soap calculator — 75 oils with fatty-acid profiles,
            recipe presets, fragrance and additive dosing, and one-click
            share links — is part of the Maker tier.
          </p>
          <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
            You&apos;re currently on the{" "}
            <span className="font-medium text-foreground capitalize">{tier}</span>{" "}
            plan. Paid plans are opening soon — join the waitlist on the
            pricing page and we&apos;ll email you when the Maker tier is
            live. Existing formulas remain saved on your current plan.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/pricing?upgradeReason=soap-calculator"
              className={buttonVariants({ size: "lg" })}
            >
              Join Maker waitlist
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tools/soap-calculator"
              target="_blank"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Use the free standalone calculator
            </Link>
          </div>

          <ul className="mt-8 grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              75-oil database with full fatty-acid profiles
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              8 quality scores incl. Longevity, INS, Iodine
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              Three water-calc methods (% / concentration / ratio)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              19 additives with chelator + antioxidant dosing
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              7 ready-to-go recipe presets (Castile, salt bar, etc.)
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              Recipe persistence per formula (coming with Maker tier)
            </li>
          </ul>

        </div>
      </div>
    </div>
  );
}
