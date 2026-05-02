import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { Check, Sparkles } from "lucide-react";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";
import { createClient } from "@/lib/supabase/server";
import { CheckoutButton } from "@/features/billing/checkout-button";
import { FeedbackForm } from "@/app/feedback/feedback-form";

interface Tier {
  name: string;
  priceMonthly: string;
  priceAnnual?: string;
  annualSavings?: string;
  description: string;
  highlighted?: boolean;
  features: string[];
}

const tiers: Tier[] = [
  {
    name: "Free",
    priceMonthly: "$0",
    description: "Browse, research, and use every public tool. No card needed.",
    features: [
      "Full ingredient database (90+ fragrance allergens, 32 prohibited, 38 restricted with concentration caps)",
      "Canadian supplier directory",
      "All free tools — Soap Calculator, Fragrance Allergen Calculator, CNF Readiness Checker, INCI Formatter, Cost Calculator, Label Checklist",
      "All blog and guide content",
      "1 saved formula",
    ],
  },
  {
    name: "Maker",
    priceMonthly: "CA$12",
    priceAnnual: "CA$108",
    annualSavings: "Save $36",
    description: "For active makers shipping real products in Canada.",
    highlighted: true,
    features: [
      "Unlimited saved formulas with version history",
      "Soap Maker integration inside the formula builder — lye, fatty acid, hardness/cleansing/conditioning on YOUR formulas",
      "CNF Preparation Package PDF export with branded header",
      "Bilingual (EN/FR) label generator with claim risk flagging",
      "Cost-of-goods + retail/wholesale price recommendations",
      "Personal supplier price tracking",
      "Activity log + unlimited version history per formula",
    ],
  },
];

export const metadata: Metadata = {
  title: "Pricing — FormulaNorth",
  description: `${siteConfig.name} pricing for Canadian indie cosmetic makers. Free tier with all public tools. Maker tier at CA$12/month or CA$108/year — 14-day free trial, no card required.`,
};

interface PricingPageProps {
  searchParams: Promise<{
    upgradeReason?: string;
    tier?: string;
    billing?: string;
  }>;
}

const UPGRADE_REASON_COPY: Record<string, { title: string; body: string }> = {
  "formula-limit": {
    title: "You've reached your saved-formula limit",
    body: "The Free plan saves 1 formula. Upgrade to Maker for unlimited formulas, version history, and the rest of the integrated workflow. 14-day free trial — no credit card required up front.",
  },
  "soap-calculator": {
    title: "Soap Maker integration is a Maker tier feature",
    body: "The standalone Soap Calculator at /tools/soap-calculator is free for everyone. The integrated version that lives inside a saved formula and persists soap recipe state is part of Maker. Start a 14-day free trial below.",
  },
  "cnf-package": {
    title: "CNF Preparation Package is a Maker tier feature",
    body: "Export a print-ready PDF of your CNF prep with branded header, full ingredient list, allergen flags, and label content side-by-side. Start a 14-day free trial below.",
  },
  "label-export": {
    title: "Bilingual label PDF export is a Maker tier feature",
    body: "Print-ready EN/FR cosmetic labels with claim-risk flagging are part of Maker. Start a 14-day free trial below.",
  },
};

export default async function PricingPage({ searchParams }: PricingPageProps) {
  const params = await searchParams;
  const banner = params.upgradeReason
    ? UPGRADE_REASON_COPY[params.upgradeReason]
    : null;
  const billingResult = params.billing;

  // Pre-fill the embedded feedback form for signed-in users +
  // determine if they're already on a live subscription.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;
  const defaultEmail = user?.email ?? "";

  let alreadySubscribed = false;
  if (user) {
    const { data: sub } = await supabase
      .from("subscriptions")
      .select("status")
      .eq("user_id", user.id)
      .maybeSingle();
    alreadySubscribed =
      sub?.status === "active" ||
      sub?.status === "trialing" ||
      sub?.status === "past_due";
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "CAD",
        description: "All public tools and database access, 1 saved formula.",
      },
      {
        "@type": "Offer",
        name: "Maker — Monthly",
        price: "12",
        priceCurrency: "CAD",
        description: "Unlimited formulas, soap maker integration, CNF prep package, bilingual labels.",
      },
      {
        "@type": "Offer",
        name: "Maker — Annual",
        price: "108",
        priceCurrency: "CAD",
        description: "Annual billing, equivalent to $9/month.",
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {banner && (
          <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-amber-200 bg-amber-50/70 p-5 text-sm dark:border-amber-900/40 dark:bg-amber-950/20">
            <p className="font-semibold text-amber-900 dark:text-amber-200">
              {banner.title}
            </p>
            <p className="mt-1 text-amber-900/80 dark:text-amber-200/80">
              {banner.body}
            </p>
          </div>
        )}

        {billingResult === "success" && (
          <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 text-sm dark:border-emerald-900/40 dark:bg-emerald-950/20">
            <p className="font-semibold text-emerald-900 dark:text-emerald-200">
              Thanks for subscribing!
            </p>
            <p className="mt-1 text-emerald-900/80 dark:text-emerald-200/80">
              Your Maker trial has started. Manage your subscription anytime from{" "}
              <Link href="/dashboard/account" className="underline">
                your account
              </Link>
              .
            </p>
          </div>
        )}

        {billingResult === "canceled" && (
          <div className="mx-auto mb-10 max-w-3xl rounded-xl border border-border bg-card p-5 text-sm">
            <p className="text-muted-foreground">
              Checkout cancelled — no charges made. You can start a trial any time.
            </p>
          </div>
        )}

        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Pricing
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing for Canadian indie cosmetic makers
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Free tier covers research and the public tools. Maker tier unlocks the
            integrated workflow when you&apos;re ready to ship products.
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand">
            Maker plans come with a 14-day free trial — no credit card required.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border bg-card p-6 sm:p-8 ${
                tier.highlighted
                  ? "border-brand ring-2 ring-brand/20 shadow-lg"
                  : "border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-brand px-4 py-1 text-xs font-semibold text-white shadow-sm">
                  Recommended
                </div>
              )}

              <p className="text-sm font-semibold text-foreground">
                {tier.name}
              </p>

              <div className="mt-3 flex items-baseline gap-1">
                <span className="font-display text-4xl font-bold tracking-tight">
                  {tier.priceMonthly}
                </span>
                {tier.priceAnnual && (
                  <span className="text-base text-muted-foreground"> CAD/month</span>
                )}
              </div>

              {tier.priceAnnual && (
                <p className="mt-1 text-sm text-muted-foreground">
                  Or <strong className="text-foreground">{tier.priceAnnual} CAD/year</strong> ({tier.annualSavings})
                </p>
              )}

              <p className="mt-3 text-sm text-muted-foreground">
                {tier.description}
              </p>

              <div className="mt-6 space-y-2">
                {tier.name === "Free" ? (
                  <Link
                    href={isLoggedIn ? "/formulas" : "/auth/signup"}
                    className="block w-full rounded-lg border border-border bg-card py-2.5 text-center text-sm font-semibold transition-colors hover:bg-muted"
                  >
                    {isLoggedIn ? "Go to formulas" : "Get started — Free"}
                  </Link>
                ) : (
                  <>
                    <CheckoutButton
                      interval="month"
                      isLoggedIn={isLoggedIn}
                      alreadySubscribed={alreadySubscribed}
                      className="block w-full rounded-lg bg-brand py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark disabled:opacity-50"
                    >
                      Start 14-day trial — $12/mo
                    </CheckoutButton>
                    <CheckoutButton
                      interval="year"
                      isLoggedIn={isLoggedIn}
                      alreadySubscribed={alreadySubscribed}
                      className="block w-full rounded-lg border border-brand/40 bg-brand/5 py-2.5 text-center text-sm font-semibold text-brand transition-colors hover:bg-brand/10 disabled:opacity-50"
                    >
                      Start 14-day trial — $108/year
                    </CheckoutButton>
                    {alreadySubscribed && (
                      <p className="text-center text-xs text-muted-foreground">
                        You&apos;re already subscribed. Click to{" "}
                        <Link href="/dashboard/account" className="underline">
                          manage your plan
                        </Link>
                        .
                      </p>
                    )}
                  </>
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

        <div className="mx-auto mt-12 max-w-3xl space-y-4 text-sm leading-6 text-muted-foreground">
          <h2 className="font-display text-xl font-semibold text-foreground">
            Common questions
          </h2>

          <div>
            <p className="font-semibold text-foreground">
              Do I need a credit card to start the trial?
            </p>
            <p className="mt-1">
              No. The 14-day Maker trial doesn&apos;t ask for a card up front. You&apos;ll
              be prompted to add one if you choose to continue past day 14.
              Cancel anytime during the trial — no charge.
            </p>
          </div>

          <div>
            <p className="font-semibold text-foreground">
              Can I switch from monthly to annual later?
            </p>
            <p className="mt-1">
              Yes. From your account, open the billing portal and switch the
              interval — Stripe handles proration automatically.
            </p>
          </div>

          <div>
            <p className="font-semibold text-foreground">
              What happens to my formulas if I downgrade to Free?
            </p>
            <p className="mt-1">
              Your formulas stay saved and viewable. You won&apos;t be able to create
              new ones beyond the Free limit until you re-subscribe, and Maker-only
              features (CNF prep export, bilingual labels, soap maker integration)
              become read-only.
            </p>
          </div>

          <div>
            <p className="font-semibold text-foreground">
              Is the Free tier really permanent?
            </p>
            <p className="mt-1">
              Yes. The free public tools and the 1-formula starter are how new
              makers find FormulaNorth. They will always be free.
            </p>
          </div>
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
                We&apos;re prioritising features based on what comes up most. Tick
                what you&apos;d use, add detail, and we&apos;ll email you when those
                features ship.
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
