import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupplierBySlug } from "@/lib/supabase/queries/suppliers";
import { HotlistBadge } from "@/features/ingredients/hotlist-badge";
import { siteConfig } from "@/lib/site-config";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { ExternalLink, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) return { title: "Not Found" };

  return {
    title: `${supplier.name} — Canadian Cosmetic Ingredient Supplier`,
    description: `${supplier.name} in ${supplier.location}. Browse their cosmetic ingredient catalog with pricing.`,
    alternates: { canonical: `/suppliers/${slug}` },
    openGraph: {
      title: supplier.name,
      description: `Canadian cosmetic ingredient supplier in ${supplier.location}.`,
      url: `${siteConfig.url}/suppliers/${slug}`,
      siteName: siteConfig.name,
    },
  };
}

export default async function SupplierDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) notFound();

  const prices = (supplier.ingredient_supplier_prices ?? []) as Array<{
    id: string;
    price_per_kg: number | null;
    currency: string;
    min_order_kg: number | null;
    ingredients: { id: string; inci_name: string; common_name: string | null; slug: string; hotlist_status: string } | null;
  }>;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: supplier.name,
    url: supplier.website,
    address: supplier.location,
    areaServed: "Canada",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/suppliers" className="hover:text-foreground">Suppliers</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{supplier.name}</span>
        </nav>

        <header className="mb-8">
          <h1 className="font-display text-3xl font-bold tracking-tight">
            {supplier.name}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {supplier.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" /> {supplier.location}
              </span>
            )}
            {supplier.website && (
              <a
                href={supplier.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-brand hover:underline"
              >
                <ExternalLink className="h-4 w-4" /> Visit website
              </a>
            )}
          </div>
        </header>

        {prices.length > 0 ? (
          <section>
            <h2 className="font-display text-xl font-semibold">
              Ingredients ({prices.length})
            </h2>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Ingredient</TableHead>
                  <TableHead>INCI Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Price/kg</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prices.map((p) =>
                  p.ingredients ? (
                    <TableRow key={p.id}>
                      <TableCell>
                        <Link
                          href={`/ingredients/${p.ingredients.slug}`}
                          className="font-medium text-brand hover:underline"
                        >
                          {p.ingredients.common_name || p.ingredients.inci_name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {p.ingredients.inci_name}
                      </TableCell>
                      <TableCell>
                        <HotlistBadge status={p.ingredients.hotlist_status as "not_listed" | "restricted" | "prohibited"} />
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {p.price_per_kg ? `$${p.price_per_kg} ${p.currency}` : "—"}
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </section>
        ) : (
          <p className="text-muted-foreground">
            No ingredient pricing data available yet for this supplier.
            <Link href="/ingredients" className="ml-1 text-brand underline">
              Browse all ingredients
            </Link>
          </p>
        )}
      </div>
    </>
  );
}
