import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import { Suspense } from "react";
import Link from "next/link";
import { getPublishedProducts } from "@/lib/supabase/queries/shop";
import { ProductCard } from "@/features/shop/product-card";
import { siteConfig } from "@/lib/site-config";
import { categoryLabels } from "@/domain/shop";

export const metadata: Metadata = {
  title: "Shop - Digital Products for Canadian Cosmetic Makers",
  description:
    "Formula packs, readiness templates, ingredient guides, and business kits for indie cosmetic makers in Canada. Instant digital download.",
  alternates: { canonical: "/shop" },
  openGraph: {
    title: "Shop - FormulaNorth",
    description: "Digital products for Canadian cosmetic makers.",
    url: `${siteConfig.url}/shop`,
    siteName: siteConfig.name,
  },
};

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function ShopPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const category = params.category ?? undefined;
  const products = await getPublishedProducts(category);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "FormulaNorth Shop",
    description: "Digital products for Canadian cosmetic makers.",
    url: `${siteConfig.url}/shop`,
    numberOfItems: products.length,
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Shop
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Digital products for makers
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Formula packs, readiness templates, ingredient guides, and business
            kits. Instant download after purchase.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/shop"
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              !category
                ? "border-brand bg-brand text-white"
                : "border-border hover:border-brand"
            }`}
          >
            All
          </Link>
          {Object.entries(categoryLabels).map(([key, label]) => (
            <Link
              key={key}
              href={`/shop?category=${key}`}
              className={`rounded-full border px-3 py-1 text-sm transition-colors ${
                category === key
                  ? "border-brand bg-brand text-white"
                  : "border-border hover:border-brand"
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        <Suspense>
          {products.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground">
                No products available yet. Check back soon!
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  slug={product.slug}
                  title={product.title}
                  description={product.description}
                  priceCad={product.price_cad}
                  category={product.category}
                  isFree={product.is_free}
                />
              ))}
            </div>
          )}
        </Suspense>

        <div className="mt-16 rounded-xl border border-brand/20 bg-brand-soft/20 p-6 text-center">
          <p className="font-display text-lg font-semibold">
            Need more than templates?
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Build your own formulas with label drafting, costing, and CNF
            preparation tools.
          </p>
          <Link
            href="/pricing"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
          >
            See subscription plans
          </Link>
        </div>
      </div>
    </>
  );
}
