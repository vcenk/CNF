import type { Metadata } from "next";
import Link from "next/link";
import { getAllSuppliers } from "@/lib/supabase/queries/suppliers";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { MapPin, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Canadian Cosmetic Ingredient Suppliers — Directory",
  description:
    "Directory of Canadian cosmetic ingredient suppliers for indie makers. Find suppliers by location with ingredient catalogs and pricing.",
  alternates: { canonical: "/suppliers" },
  openGraph: {
    title: "Canadian Cosmetic Ingredient Suppliers",
    description: "Find Canadian suppliers for your cosmetic ingredients.",
    url: `${siteConfig.url}/suppliers`,
    siteName: siteConfig.name,
  },
};

export default async function SuppliersPage() {
  const suppliers = await getAllSuppliers();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Canadian Cosmetic Ingredient Suppliers",
    numberOfItems: suppliers.length,
    itemListElement: suppliers.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: s.name,
        url: s.website,
        address: s.location,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Supplier Directory
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Canadian cosmetic ingredient suppliers
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse Canadian suppliers for cosmetic ingredients. Each supplier
            page lists available ingredients, INCI names, Health Canada
            Hotlist status, and reference pricing. Confirm pricing and lead
            time directly with the supplier.
          </p>
          <p className="mt-3 max-w-2xl text-sm">
            <Link
              href="/cosmetic-ingredient-suppliers-canada"
              className="text-brand underline hover:text-brand-dark"
            >
              How to choose a Canadian cosmetic ingredient supplier →
            </Link>
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suppliers.map((supplier) => (
            <Link key={supplier.id} href={`/suppliers/${supplier.slug}`}>
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <CardTitle className="text-base">{supplier.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {supplier.location}
                  </CardDescription>
                  {supplier.website && (
                    <p className="flex items-center gap-1 text-xs text-brand">
                      <ExternalLink className="h-3 w-3" />
                      Visit website
                    </p>
                  )}
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-lg font-semibold">Related on FormulaNorth</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/cosmetic-ingredient-suppliers-canada"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Suppliers guide
            </Link>
            <Link
              href="/inci-name-lookup-canada"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              INCI Name Lookup
            </Link>
            <Link
              href="/health-canada-cosmetic-hotlist"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Cosmetic Ingredient Hotlist
            </Link>
            <Link
              href="/tools/cosmetic-cost-calculator"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Cost Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
