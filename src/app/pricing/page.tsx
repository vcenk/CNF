import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Browse and research",
    features: [
      "Full ingredient database with INCI names",
      "Supplier directory with pricing",
      "Health Canada hotlist checks",
      "2 formulas (read-only, no exports)",
      "All guide content",
    ],
  },
  {
    name: "Maker",
    price: "CA$12",
    period: "/mo",
    description: "For active makers",
    features: [
      "10 formulas with full version control",
      "Phase grouping (water, oil, cool-down)",
      "Batch scaling calculator",
      "COGS calculator with margin tools",
      "Bilingual EN/FR label generator",
      "PDF label export",
    ],
    highlighted: true,
  },
  {
    name: "Studio",
    price: "CA$29",
    period: "/mo",
    description: "For growing brands",
    features: [
      "50 formulas",
      "Everything in Maker",
      "CNF export (.hcxs generation)",
      "Pre-submission validation",
      "May-contain variant support",
      "Filing status tracking",
    ],
  },
  {
    name: "Business",
    price: "CA$59",
    period: "/mo",
    description: "For established brands",
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
            only when you need formula tools, labels, or CNF exports.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative flex flex-col ${tier.highlighted ? "border-brand shadow-md" : ""}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-xs font-medium text-white">
                  Most popular
                </div>
              )}
              <CardHeader className="flex-1">
                <CardTitle className="text-base">{tier.name}</CardTitle>
                <div className="mt-3">
                  <span className="font-display text-4xl font-bold">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>
                <CardDescription className="mt-1">
                  {tier.description}
                </CardDescription>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-brand">&#10003;</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
