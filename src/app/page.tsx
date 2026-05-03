import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { FragranceAllergenAlert } from "@/components/marketing/fragrance-allergen-alert";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
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
      "250+ cosmetic ingredients with INCI names, CAS numbers, hotlist references, and Canadian supplier pricing.",
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
      "Build and version your recipes with INCI lookups, phase grouping, batch scaling, and readiness checks for common ingredient and labeling issues.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: DollarSign,
    title: "Product Costing",
    description:
      "Calculate COGS from your formula, factor in labor and packaging, and set clearer wholesale and retail pricing targets.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: Tag,
    title: "Label Generator",
    description:
      "Draft bilingual EN/FR cosmetic label content with INCI lists, warning reminders, and fragrance allergen support.",
    href: "/formulas",
    badge: "Maker",
  },
  {
    icon: FileOutput,
    title: "CNF Preparation",
    description:
      "Prepare structured CNF information packages with validation support, filing notes, and reusable company details.",
    href: "/formulas",
    badge: "Maker",
  },
];

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Browse and research",
    features: [
      "Full ingredient database",
      "Canadian supplier directory",
      "All free tools (Soap Calc, CNF Checker, Allergen Calc, INCI Formatter)",
      "1 saved formula",
    ],
  },
  {
    name: "Maker",
    price: "CA$12",
    period: "/mo",
    description: "For active makers",
    features: [
      "Unlimited saved formulas + version history",
      "Soap maker integration inside your formulas",
      "CNF Preparation Package PDF export",
      "Bilingual EN/FR label drafting",
    ],
    highlighted: true,
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
        highPrice: "12",
        priceCurrency: "CAD",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "FormulaNorth features",
      description:
        "Tools and workspace features included in FormulaNorth for Canadian indie cosmetic makers.",
      numberOfItems: features.length,
      itemListElement: features.map((feature, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          name: feature.title,
          description: feature.description,
          url: `${siteConfig.url}${feature.href}`,
          provider: { "@type": "Organization", name: siteConfig.name },
        },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <section className="mx-auto max-w-6xl px-4 pb-20 pt-24 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          For Canadian indie cosmetic makers
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          Cosmetic compliance &amp; formulation, in one workspace.
        </h1>
        <p className="mx-auto mt-5 font-display text-2xl font-semibold tracking-tight text-brand sm:text-3xl">
          Formulate. Comply. Sell.
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          FormulaNorth is cosmetic compliance and formulation software built
          for Canadian indie cosmetic makers — CNF preparation, ingredient
          research with Hotlist flags, bilingual EN/FR label drafting,
          costing, and a soap calculator, all in one workspace.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/tools/cnf-readiness-checker"
            className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Try the free CNF Readiness Checker
          </Link>
          <Link
            href="/ingredients"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            Browse ingredients
          </Link>
          <Link
            href="/pricing"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium transition-colors hover:bg-muted"
          >
            See pricing
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <FragranceAllergenAlert source="homepage" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          Everything a Canadian maker needs
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted-foreground">
          One source of truth for formula data, label drafting, costing, and
          CNF preparation support.
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
                text: "Look up INCI names, review hotlist notes, and compare Canadian suppliers.",
              },
              {
                step: "2",
                title: "Build your formula",
                text: "Add ingredients, set percentages, organize by phase, and review restrictions and usage notes.",
              },
              {
                step: "3",
                title: "Draft labels and costs",
                text: "Create bilingual label content and calculate your estimated COGS per unit.",
              },
              {
                step: "4",
                title: "Prepare your CNF package",
                text: "Assemble structured CNF details and review them before manual submission or portal entry.",
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

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6" id="pricing">
        <h2 className="text-center font-display text-2xl font-bold sm:text-3xl">
          Simple pricing that scales with you
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
          We&apos;re makers too. The existing cosmetic compliance tools cost $200+ a
          month and are built for brands with a regulatory team — we couldn&apos;t
          afford them either when we started. So we kept this honest: the public
          tools stay free for everyone, and CA$12/month covers the workflow when
          you&apos;re ready to ship.
        </p>

        <div className="mx-auto mt-12 grid max-w-3xl gap-6 sm:grid-cols-2">
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
              <p className="text-sm font-semibold">{tier.name}</p>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-3xl font-bold tracking-tight">
                  {tier.price}
                </span>
                {tier.period && (
                  <span className="text-sm text-muted-foreground">
                    {tier.period}
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {tier.description}
              </p>
              <div className="my-5 h-px bg-border" />
              <ul className="flex-1 space-y-2.5 text-sm">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <span className="mt-0.5 text-brand">&#10003;</span>
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
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

      <section className="border-t border-border/40 bg-surface/50 py-16 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Start exploring for free
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">
            The ingredient database and supplier directory are completely free.
            No account required.
          </p>
          <div className="mx-auto mt-8 max-w-3xl">
            <DisclaimerCallout compact />
          </div>
          <Link
            href="/ingredients"
            className="mt-6 inline-block rounded-lg bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            Browse the ingredient database
          </Link>
        </div>
      </section>
    </>
  );
}
