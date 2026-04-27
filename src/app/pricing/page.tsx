import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Browse and research",
    cta: "Get started",
    ctaHref: "/ingredients",
    ctaVariant: "outline" as const,
    features: [
      "Full ingredient database with INCI names",
      "Supplier directory with pricing",
      "Health Canada hotlist references",
      "2 formulas (read-only, no exports)",
      "All guide content",
    ],
  },
  {
    name: "Maker",
    price: "CA$12",
    period: "/mo",
    description: "For active makers",
    cta: "Start free trial",
    ctaHref: "/auth/signup",
    ctaVariant: "primary" as const,
    highlighted: true,
    features: [
      "10 formulas with full version control",
      "Phase grouping (water, oil, cool-down)",
      "Batch scaling calculator",
      "COGS calculator with margin tools",
      "Bilingual EN/FR label generator",
      "PDF label export",
    ],
  },
  {
    name: "Studio",
    price: "CA$29",
    period: "/mo",
    description: "For growing brands",
    cta: "Start free trial",
    ctaHref: "/auth/signup",
    ctaVariant: "outline" as const,
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
    cta: "Contact us",
    ctaHref: "/contact",
    ctaVariant: "outline" as const,
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
  description: `${siteConfig.name} pricing plans for Canadian cosmetic makers. Start free, upgrade as you grow.`,
};

export default function PricingPage() {
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
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Pricing
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing that scales with you
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
            Start free with the ingredient database and supplier directory. Pay
            only when you need formula tools, labels, or CNF preparation
            workflows.
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

              <p className="text-sm font-semibold text-foreground">
                {tier.name}
              </p>

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

              <Link
                href={tier.ctaHref}
                className={`mt-6 block w-full rounded-lg py-2.5 text-center text-sm font-semibold transition-colors ${
                  tier.ctaVariant === "primary"
                    ? "bg-brand text-white hover:bg-brand-dark"
                    : "border border-border bg-card text-foreground hover:bg-muted"
                }`}
              >
                {tier.cta}
              </Link>

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

        <div className="mt-10">
          <DisclaimerCallout compact />
        </div>
      </div>
    </>
  );
}
