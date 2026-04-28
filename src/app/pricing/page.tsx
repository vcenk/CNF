import type { Metadata } from "next";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import { WaitlistForm } from "./waitlist-form";
import { FeedbackForm } from "@/app/feedback/feedback-form";

type Cta =
  | { kind: "link"; label: string; href: string; variant: "primary" | "outline" }
  | { kind: "waitlist"; tier: "maker" | "studio"; tierLabel: string };

interface Tier {
  name: string;
  price: string;
  period?: string;
  description: string;
  cta: Cta;
  comingSoon?: boolean;
  highlighted?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    price: "$0",
    description: "Browse and research",
    cta: {
      kind: "link",
      label: "Get started",
      href: "/ingredients",
      variant: "outline",
    },
    features: [
      "Full ingredient database with INCI names",
      "Supplier directory with pricing",
      "Health Canada Hotlist references",
      "All free tools (CNF Readiness Checker, INCI formatter, cost calculator, label checklist)",
      "All guide content",
      "Save up to 2 formulas",
    ],
  },
  {
    name: "Maker",
    price: "CA$12",
    period: "/mo",
    description: "For active makers",
    comingSoon: true,
    highlighted: true,
    cta: { kind: "waitlist", tier: "maker", tierLabel: "Maker" },
    features: [
      "10 formulas with full version control",
      "Phase grouping (water, oil, cool-down)",
      "Batch scaling calculator",
      "COGS calculator with margin tools",
      "Bilingual EN/FR label drafting",
      "PDF label export",
    ],
  },
  {
    name: "Studio",
    price: "CA$29",
    period: "/mo",
    description: "For growing brands",
    comingSoon: true,
    cta: { kind: "waitlist", tier: "studio", tierLabel: "Studio" },
    features: [
      "50 formulas",
      "Everything in Maker",
      "CNF preparation package tools",
      "Readiness review support",
      "May-contain variant support",
      "Filing status tracking",
    ],
  },
  {
    name: "Business",
    price: "CA$59",
    period: "/mo",
    description: "For established brands",
    comingSoon: true,
    cta: {
      kind: "link",
      label: "Contact us",
      href: "/contact",
      variant: "outline",
    },
    features: [
      "Unlimited formulas",
      "Everything in Studio",
      "Priority support",
      "Early access to new features",
    ],
  },
];

export const metadata: Metadata = {
  title: "Pricing",
  description: `${siteConfig.name} pricing plans for Canadian cosmetic makers. Free tier available now; paid tiers opening soon — join the waitlist.`,
};

interface PricingPageProps {
  searchParams: Promise<{
    upgradeReason?: string;
    tier?: string;
  }>;
}

const UPGRADE_REASON_COPY: Record<string, { title: string; body: string }> = {
  "formula-limit": {
    title: "You've reached your formula limit",
    body: "Free accounts can save 2 formulas. Paid tiers (Maker, Studio, Business) are coming soon — join the waitlist below and we'll email you when they open. Existing formulas remain saved on your current plan.",
  },
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const banner = params.upgradeReason
    ? UPGRADE_REASON_COPY[params.upgradeReason]
    : null;
  const fromTier = params.tier ?? "";

  // Pre-fill the embedded feedback form for signed-in users.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const defaultEmail = user?.email ?? "";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: tiers.map((tier) => ({
      "@type": "Offer",
      name: tier.name,
      price: tier.price.replace(/[^0-9.]/g, "") || "0",
      priceCurrency: "CAD",
      description: tier.description,
      availability: tier.comingSoon
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {banner && (
          <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              {banner.title}
              {fromTier ? ` (current plan: ${fromTier})` : ""}
            </p>
            <p className="mt-1 text-amber-900/80 dark:text-amber-200/80">
              {banner.body}
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Pricing
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing, when paid plans open
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            The Free plan is available today: ingredient database, supplier
            directory, all free tools, and 2 saved formulas. Paid plans (Maker,
            Studio, Business) are coming soon — join the waitlist below and
            we&apos;ll email you when they open.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-xl border bg-card p-6 ${
                tier.highlighted
                  ? "border-brand ring-2 ring-brand/20 shadow-lg"
                  : "border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white shadow-sm">
                  Most popular
                </div>
              )}

              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-semibold text-foreground">
                  {tier.name}
                </p>
                {tier.comingSoon ? (
                  <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    Coming soon
                  </span>
                ) : (
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                    Available
                  </span>
                )}
              </div>

              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-base text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </div>

              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <div className="mt-6">
                {tier.cta.kind === "link" ? (
                  <Link
                    href={tier.cta.href}
                    className={`block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                      tier.cta.variant === "primary"
                        ? "bg-brand text-white hover:bg-brand-dark"
                        : "border border-border bg-card text-foreground hover:bg-muted"
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                ) : (
                  <WaitlistForm
                    tier={tier.cta.tier}
                    tierLabel={tier.cta.tierLabel}
                  />
                )}
              </div>

              <div className="my-6 h-px bg-border" />

              <ul className="flex-1 space-y-3 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-4 text-sm leading-6 text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Why a waitlist?</span>{" "}
            Paid subscriptions are not yet enabled. We want to keep the public
            site honest about what works today: the Free tier and all free
            tools are fully usable, and we&apos;re finishing the billing,
            invoicing, and feature gating for the paid plans before turning
            them on.
          </p>
          <p>
            Have a specific question about a plan, or want to be a
            beta tester?{" "}
            <Link
              href="/contact"
              className="text-brand underline hover:text-brand-dark"
            >
              Get in touch
            </Link>
            . Have a feature request?{" "}
            <Link
              href="#feedback"
              className="text-brand underline hover:text-brand-dark"
            >
              Tell us what you need below
            </Link>
            .
          </p>
        </div>

        <section
          id="feedback"
          className="mt-20 scroll-mt-24 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-soft/30 via-card to-card p-6 shadow-sm sm:p-10"
        >
          <div className="mb-8 flex items-start gap-4">
            <div className="rounded-xl bg-brand/15 p-3">
              <Sparkles className="h-5 w-5 text-brand" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Help shape what we build next
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                What would make FormulaNorth more useful for you?
              </h2>
              <p className="mt-3 max-w-2xl text-muted-foreground">
                We&apos;re prioritising paid-tier features based on what
                comes up most. Tick what you&apos;d use, add detail, and we&apos;ll
                email you when those features ship.
              </p>
            </div>
          </div>

          <FeedbackForm defaultEmail={defaultEmail} source="pricing" />
        </section>

        <div className="mt-12">
          <DisclaimerCallout compact />
        </div>
      </div>
    </>
  );
}
