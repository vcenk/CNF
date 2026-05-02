import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { BcScopeCallout } from "@/components/marketing/bc-scope-callout";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const pathname = "/bc";
const title = "BC Cosmetic Maker & Market Vendor Resources";
const description =
  "British Columbia-specific guides for indie cosmetic makers — market vendor checklists, business licensing, insurance, and where Canada-wide cosmetic rules apply.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

const guides = [
  {
    title: "Farmers Market Cosmetic Vendor Checklist",
    description:
      "What to bring, what to confirm, and where Canada-wide cosmetic rules apply at a BC farmers market.",
    href: "/bc/farmers-market-cosmetic-vendor-checklist",
  },
  {
    title: "How to Sell Handmade Soap at BC Markets",
    description:
      "Soap-specific notes for BC market vendors — vendor agreements, signage, and bilingual labels.",
    href: "/bc/sell-handmade-soap-at-markets",
  },
  {
    title: "Vancouver Market Vendor Checklist",
    description:
      "Vancouver-specific reminders alongside cosmetic notification and labelling responsibilities.",
    href: "/bc/vancouver-market-vendor-checklist",
  },
  {
    title: "Cosmetic Business License Guide (BC)",
    description:
      "Provincial business registration, GST/PST, and where Health Canada cosmetic notification fits in.",
    href: "/bc/cosmetic-business-license-guide",
  },
  {
    title: "Handmade Skincare Insurance in BC",
    description:
      "Product liability insurance basics for BC makers — what brokers usually ask about.",
    href: "/bc/handmade-skincare-insurance",
  },
  {
    title: "Temporary Food vs Cosmetic Vendor (BC)",
    description:
      "How to tell whether your product is regulated as food, a cosmetic, or something else — and which BC permits apply.",
    href: "/bc/temporary-food-vs-cosmetic-vendor",
  },
];

export default function BcIndexPage() {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: title,
      description,
      url,
      provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "BC resources", item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">BC resources</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            British Columbia
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            BC cosmetic maker &amp; market vendor resources
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Local market vendor checklists, business licensing notes, and
            insurance pointers for British Columbia indie cosmetic makers.
            FormulaNorth handles the cosmetic side — formulation, label, and
            CNF preparation — across Canada.
          </p>
        </header>

        <div className="mb-10 max-w-3xl">
          <BcScopeCallout />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.href} href={guide.href}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 max-w-3xl">
          <DisclaimerCallout compact />
        </div>
      </div>
    </>
  );
}
