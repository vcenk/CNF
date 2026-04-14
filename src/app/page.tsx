import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Search,
  FlaskConical,
  DollarSign,
  Tag,
  FileOutput,
  Store,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Ingredient Database",
    description:
      "250+ cosmetic ingredients with INCI names, CAS numbers, Health Canada hotlist status, and Canadian supplier pricing.",
    href: "/ingredients",
    badge: "Free",
  },
  {
    icon: Store,
    title: "Supplier Directory",
    description:
      "Canadian cosmetic ingredient suppliers with pricing, location info, and direct links to their ingredient catalogs.",
    href: "/suppliers",
    badge: "Free",
  },
  {
    icon: FlaskConical,
    title: "Formula Management",
    description:
      "Build and version your recipes with INCI lookups, phase grouping, batch scaling, and real-time compliance checks.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: DollarSign,
    title: "Product Costing",
    description:
      "Auto-calculate COGS from your formula, factor in labour and packaging, and set profitable wholesale and retail prices.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: Tag,
    title: "Label Generator",
    description:
      "Generate compliant bilingual EN/FR cosmetic labels with INCI list, mandatory warnings, and fragrance allergen disclosure.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: FileOutput,
    title: "CNF Export",
    description:
      "Export .hcxs files for Health Canada portal upload with pre-submission validation and filing status tracking.",
    href: "/formulas",
    badge: "Studio",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Browse and research",
    features: [
      "Full ingredient database",
      "Supplier directory",
      "2 formulas (read-only)",
    ],
  },
  {
    name: "Maker",
    price: "CA$12",
    period: "/mo",
    description: "For active makers",
    features: [
      "10 formulas with version control",
      "Batch scaling & COGS calculator",
      "Bilingual label generator",
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
      "CNF export & .hcxs generation",
      "May-contain variants",
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
    ],
  },
];

export default function HomePage() {
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      description: siteConfig.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      description: siteConfig.description,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "0",
        highPrice: "59",
        priceCurrency: "CAD",
      },
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          For Canadian cosmetic makers
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Formulate. Comply. Sell.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          The all-in-one platform for indie cosmetic makers in Canada. Manage
          ingredients, build formulas, calculate costs, generate bilingual
          labels, and export CNF filings — all from one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/ingredients"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Browse ingredients — free
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            See pricing
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          Everything a Canadian maker needs
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          One source of truth — your formula drives labels, costing, and CNF
          exports automatically.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Link key={feature.title} href={feature.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <feature.icon className="h-5 w-5 text-brand" />
                    <span className="rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                      {feature.badge}
                    </span>
                  </div>
                  <CardTitle className="mt-3 text-base">
                    {feature.title}
                  </CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border/40 bg-surface/50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
            How it works
          </h2>
          <div className="mt-12 grid gap-8 sm:grid-cols-4">
            {[
              {
                step: "1",
                title: "Search ingredients",
                text: "Look up INCI names, check hotlist status, find Canadian suppliers.",
              },
              {
                step: "2",
                title: "Build your formula",
                text: "Add ingredients, set percentages, organize by phase, validate compliance.",
              },
              {
                step: "3",
                title: "Generate labels & costs",
                text: "Auto-create bilingual labels and calculate your true COGS per unit.",
              },
              {
                step: "4",
                title: "Export your CNF",
                text: "Generate .hcxs files ready for Health Canada portal upload.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand text-sm font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mt-4 font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="pricing">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          Simple pricing that scales with you
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          Start free with the ingredient database. Upgrade when you need
          formulas, labels, and exports.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <Card
              key={tier.name}
              className={`relative ${tier.highlighted ? "border-brand shadow-md" : ""}`}
            >
              {tier.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-0.5 text-xs font-medium text-white">
                  Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-base">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="font-display text-3xl font-bold">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="text-sm text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
                <ul className="mt-4 space-y-2 text-sm">
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

        <div className="mt-8 text-center">
          <Link
            href="/pricing"
            className="text-sm font-medium text-brand underline hover:text-brand-dark"
          >
            View full pricing comparison
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/40 bg-surface/50 py-16 text-center">
        <h2 className="font-display text-2xl font-bold sm:text-3xl">
          Start exploring for free
        </h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          The ingredient database and supplier directory are completely free. No
          account required.
        </p>
        <Link
          href="/ingredients"
          className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
        >
          Browse the ingredient database
        </Link>
      </section>
    </>
  );
}
