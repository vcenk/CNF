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

interface Guide {
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}

const complianceGuides: Guide[] = [
  {
    title: "Cosmetic Notification Form (CNF) Canada",
    description:
      "What the CNF is, who has to file it, what to gather first, and how to keep your prep organized.",
    href: "/cosmetic-notification-form-canada",
  },
  {
    title: "Cosmetic Label Requirements in Canada",
    description:
      "Bilingual content, INCI ordering, net quantity, business identity, and warnings — what a Canadian cosmetic label needs.",
    href: "/cosmetic-label-requirements-canada",
  },
  {
    title: "Health Canada Cosmetic Ingredient Hotlist",
    description:
      "Prohibited vs restricted ingredients, conditions of use, and how to check your formula and label.",
    href: "/health-canada-cosmetic-hotlist",
  },
  {
    title: "INCI Name Lookup Canada",
    description:
      "What INCI names are, why they matter on Canadian labels, and how to look up the right name fast.",
    href: "/inci-name-lookup-canada",
  },
  {
    title: "Canadian Cosmetic Ingredient Suppliers",
    description:
      "How to find Canadian suppliers, what documentation to ask for, and how to compare them fairly.",
    href: "/cosmetic-ingredient-suppliers-canada",
  },
  {
    title: "Cosmetic Notification — Workflow Walkthrough",
    description:
      "Practical workflow for assembling cosmetic notification information before portal entry.",
    href: "/guides/health-canada-cosmetic-notification",
  },
];

const productGuides: Guide[] = [
  {
    title: "How to Sell Handmade Soap in Canada",
    description:
      "Soap-specific notes on cosmetic regulation, label, costing, and CNF preparation.",
    href: "/how-to-sell-handmade-soap-in-canada",
  },
  {
    title: "Sell Body Butter in Canada",
    description:
      "Whipped, anhydrous, or emulsified body butter — formulation, label, and CNF basics.",
    href: "/sell-body-butter-canada",
  },
  {
    title: "Sell Sugar Scrub in Canada",
    description:
      "Rinse-off scrubs — formulation considerations, slip warnings, and CNF prep.",
    href: "/sell-sugar-scrub-canada",
  },
  {
    title: "Sell Bath Bombs in Canada",
    description:
      "Stable bath bomb formulation, colourant rules, label warnings, and CNF prep.",
    href: "/sell-bath-bombs-canada",
  },
  {
    title: "Handmade Skincare Business in Canada",
    description:
      "Setup checklist for indie skincare makers covering business basics through CNF.",
    href: "/handmade-skincare-business-canada",
  },
];

const upcomingGuides: Guide[] = [
  {
    title: "Fragrance Allergen Disclosure 2026",
    description:
      "New April 2026 rules requiring individual fragrance allergen disclosure on labels and CNF records.",
    href: "/guides/fragrance-allergen-disclosure-2026",
    comingSoon: true,
  },
  {
    title: "Cosmetic Product Costing",
    description:
      "How to calculate true COGS, set profitable pricing, and track ingredient costs as a small maker.",
    href: "/guides/cosmetic-product-costing",
    comingSoon: true,
  },
];

export const metadata: Metadata = {
  title: "Guides for Canadian Cosmetic Makers — Health Canada, INCI & Labelling",
  description:
    "Practical guides for Canadian cosmetic makers covering Health Canada readiness, CNF preparation, INCI naming, labelling requirements, and product costing.",
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "Guides for Canadian Cosmetic Makers",
    description:
      "Health Canada readiness, CNF preparation, INCI naming, labelling requirements, and product costing — practical guides for indie makers.",
    url: `${siteConfig.url}/guides`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guides for Canadian Cosmetic Makers — FormulaNorth",
    description:
      "Health Canada readiness, CNF preparation, INCI naming, labelling requirements, and product costing — practical guides for indie makers.",
  },
};

function GuideGrid({ guides }: { guides: Guide[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {guides.map((guide) => (
        <Link
          key={guide.href}
          href={guide.comingSoon ? "#" : guide.href}
          className={guide.comingSoon ? "pointer-events-none" : ""}
        >
          <Card className="h-full transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-base">{guide.title}</CardTitle>
                {guide.comingSoon && (
                  <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    Soon
                  </span>
                )}
              </div>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default function GuidesIndexPage() {
  const allGuides = [...complianceGuides, ...productGuides];
  const guidesSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/guides`,
    "name": "Guides for Canadian Cosmetic Makers",
    "description": "Practical guides covering Health Canada readiness, CNF preparation, INCI naming, labelling, and product costing.",
    "url": `${siteConfig.url}/guides`,
    "inLanguage": "en",
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": siteConfig.url },
        { "@type": "ListItem", "position": 2, "name": "Guides", "item": `${siteConfig.url}/guides` },
      ],
    },
    "hasPart": allGuides.map((g) => ({
      "@type": "WebPage",
      "name": g.title,
      "description": g.description,
      "url": `${siteConfig.url}${g.href}`,
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <JsonLd data={guidesSchema} />
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Guides
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Resources for Canadian cosmetic makers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          From Health Canada readiness guidance to pricing your products,
          practical guides to help you formulate, label, and sell with more
          clarity.
        </p>
      </div>

      <section className="mb-10 max-w-3xl space-y-4 text-muted-foreground">
        <p className="leading-7">
          Selling handmade cosmetics in Canada involves more regulatory steps
          than most new makers expect. Every product must carry a bilingual
          label with correct{" "}
          <strong className="text-foreground">INCI ingredient names</strong> listed
          in descending order of predominance. Ingredients must be checked
          against Health Canada&apos;s{" "}
          <strong className="text-foreground">Cosmetic Ingredient Hotlist</strong>{" "}
          for prohibited or restricted substances. And within 10 days of first
          sale, most makers must file a{" "}
          <strong className="text-foreground">Cosmetic Notification Form (CNF)</strong>{" "}
          with Health Canada — a submission that requires detailed ingredient
          data, concentrations, product function claims, and company information.
        </p>
        <p className="leading-7">
          These guides cover the most common questions and sticking points
          across that process — written specifically for independent Canadian
          makers, not industry compliance teams. They explain what the
          requirement is, why it exists, and what you need to do about it in
          plain terms.
        </p>
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-xl font-semibold">
          Compliance and notification
        </h2>
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          Guides covering the Cosmetic Notification Form, ingredient hotlist,
          INCI naming, labelling requirements, and fragrance allergen disclosure
          rules that apply to cosmetics sold in Canada.
        </p>
        <GuideGrid guides={complianceGuides} />
      </section>

      <section className="mb-14">
        <h2 className="mb-3 font-display text-xl font-semibold">
          Product-type guides
        </h2>
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          Product-specific walkthroughs for soap, body butter, sugar scrubs,
          bath bombs, and skincare — covering formulation considerations,
          labelling specifics, and CNF preparation for each product type.
        </p>
        <GuideGrid guides={productGuides} />
      </section>

      <section>
        <h2 className="mb-3 font-display text-xl font-semibold">Coming soon</h2>
        <p className="mb-5 max-w-2xl text-sm text-muted-foreground">
          Guides in progress covering fragrance allergen disclosure requirements
          and cosmetic product costing for small-batch makers.
        </p>
        <GuideGrid guides={upcomingGuides} />
      </section>
    </div>
  );
}
