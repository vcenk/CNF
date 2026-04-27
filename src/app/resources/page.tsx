import type { Metadata } from "next";
import { getPublishedProducts } from "@/lib/supabase/queries/shop";
import { ProductCard } from "@/features/shop/product-card";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Free Resources - Templates, Checklists & Guides for Cosmetic Makers",
  description:
    "Free downloadable resources for Canadian cosmetic makers. Checklists, label templates, and ingredient guides.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Free Resources - FormulaNorth",
    description: "Free templates and guides for Canadian cosmetic makers.",
    url: `${siteConfig.url}/resources`,
    siteName: siteConfig.name,
  },
};

export default async function ResourcesPage() {
  const allProducts = await getPublishedProducts();
  const freeProducts = allProducts.filter((product) => product.is_free);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Free Resources
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Free tools and templates
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Downloadable checklists, templates, and guides to help you navigate
          Canadian cosmetic formulation, labeling, and CNF preparation work.
          Enter your email to download.
        </p>
      </div>

      {freeProducts.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-lg text-muted-foreground">
            Free resources coming soon! Check back shortly.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {freeProducts.map((product) => (
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
    </div>
  );
}
