import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BetaBadge } from "@/components/marketing/beta-badge";

interface Tool {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
  badge?: string;
}

const tools: Tool[] = [
  {
    title: "Soap Calculator (Lye / SAP)",
    description:
      "Enter oils, superfat, water ratio. Get NaOH or KOH amounts and live hardness/cleansing/conditioning/bubbly/creamy scores.",
    href: "/tools/soap-calculator",
    badge: "Free",
  },
  {
    title: "CNF Readiness Checker",
    description:
      "Paste your ingredients and product details — get a quick readiness report with hotlist flags, label reminders, and claim-risk notes.",
    href: "/tools/cnf-readiness-checker",
    badge: "Free",
  },
  {
    title: "Fragrance Allergen Calculator",
    description:
      "Calculate which of the 81 EU/Canadian fragrance allergens (Linalool, Limonene, Citral…) cross the disclosure threshold in your formula. Soap, lotion, balm — all product types covered.",
    href: "/tools/fragrance-allergen-calculator",
    badge: "New",
  },
  {
    title: "INCI Ingredient List Formatter",
    description:
      "Clean up an ingredient list and get suggested INCI ordering and allergen disclosure reminders.",
    href: "/tools/inci-list-formatter",
    badge: "Free",
  },
  {
    title: "Cosmetic Cost Calculator",
    description:
      "Calculate cost per batch and per unit, including labour, packaging, and overhead — with wholesale and retail price suggestions.",
    href: "/tools/cosmetic-cost-calculator",
    badge: "Free",
  },
  {
    title: "Cosmetic Label Checklist",
    description:
      "Generate a Canadian cosmetic label checklist tailored to your product type, including bilingual reminders and net quantity tips.",
    href: "/tools/cosmetic-label-checklist",
    badge: "Free",
  },
];

export const metadata: Metadata = {
  title: "Free Tools for Canadian Cosmetic Makers",
  description:
    "Free FormulaNorth tools for Canadian cosmetic makers — CNF readiness checks, ingredient list formatting, costing, and label checklists.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Free Tools for Canadian Cosmetic Makers",
    description:
      "Soap calculator, fragrance allergen checker, CNF readiness tool, INCI formatter, cost calculator, and label checklist — all free.",
    url: `${siteConfig.url}/tools`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Tools for Canadian Cosmetic Makers — FormulaNorth",
    description:
      "Soap calculator, fragrance allergen checker, CNF readiness tool, INCI formatter, cost calculator, and label checklist — all free.",
  },
};

export default function ToolsIndexPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Free Tools for Canadian Cosmetic Makers",
    "numberOfItems": tools.filter((t) => !t.comingSoon).length,
    "itemListElement": tools
      .filter((t) => !t.comingSoon)
      .map((tool, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": tool.title,
          "url": `${siteConfig.url}${tool.href}`,
          "description": tool.description,
          "applicationCategory": "UtilitiesApplication",
          "operatingSystem": "Web",
          "offers": { "@type": "Offer", "price": "0", "priceCurrency": "CAD" },
        },
      })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <JsonLd data={toolsSchema} />
      <div className="mb-12">
        <div className="flex flex-wrap items-center gap-3">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Free tools
          </p>
          <BetaBadge />
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Tools for Canadian cosmetic makers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Quick helpers for the most common parts of cosmetic formulation,
          label drafting, costing, and CNF preparation. No account required.
          All tools are free during the FormulaNorth public beta — saving
          recipes inside formulas and CNF preparation packages are part of
          the upcoming Maker tier.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.comingSoon ? "#" : tool.href}
            className={tool.comingSoon ? "pointer-events-none" : ""}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{tool.title}</CardTitle>
                  {tool.comingSoon ? (
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Soon
                    </span>
                  ) : tool.badge === "New" ? (
                    <span className="shrink-0 rounded-full bg-brand px-2 py-0.5 text-xs font-semibold text-primary-foreground">
                      New
                    </span>
                  ) : tool.badge ? (
                    <span className="shrink-0 rounded-full bg-brand-soft px-2 py-0.5 text-xs font-medium text-brand">
                      {tool.badge}
                    </span>
                  ) : null}
                </div>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
