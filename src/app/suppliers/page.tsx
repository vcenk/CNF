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
            Find trusted Canadian suppliers for your cosmetic ingredients.
            Each supplier page lists their available ingredients with pricing.
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
      </div>
    </>
  );
}
