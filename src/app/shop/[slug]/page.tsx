import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/supabase/queries/shop";
import { categoryLabels, type ShopCategory } from "@/domain/shop";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { EmailCaptureForm } from "@/features/shop/email-capture-form";
import { BuyButton } from "@/features/shop/buy-button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Not Found" };

  return {
    title: `${product.title} — FormulaNorth Shop`,
    description: product.description ?? `${product.title} — digital product for Canadian cosmetic makers.`,
    alternates: { canonical: `/shop/${slug}` },
    openGraph: {
      title: product.title,
      description: product.description ?? undefined,
      url: `${siteConfig.url}/shop/${slug}`,
      siteName: siteConfig.name,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `${siteConfig.url}/shop/${slug}`,
    offers: {
      "@type": "Offer",
      price: product.price_cad,
      priceCurrency: "CAD",
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: siteConfig.name },
    },
    category: categoryLabels[product.category as ShopCategory],
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/shop" className="hover:text-foreground">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Badge variant="outline" className="mb-3">
              {categoryLabels[product.category as ShopCategory] ?? product.category}
            </Badge>
            <h1 className="font-display text-3xl font-bold tracking-tight">
              {product.title}
            </h1>
            {product.description && (
              <p className="mt-3 text-lg text-muted-foreground">
                {product.description}
              </p>
            )}

            {product.long_description && (
              <div className="mt-8 space-y-4 leading-relaxed text-muted-foreground">
                {(product.long_description as string).split("\n\n").map((paragraph: string, i: number) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar — Purchase card */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <div className="text-center">
                  <span className="font-display text-4xl font-bold">
                    {product.is_free ? "Free" : `CA$${product.price_cad}`}
                  </span>
                </div>

                {product.is_free ? (
                  <div className="mt-6">
                    <EmailCaptureForm
                      productSlug={product.slug}
                      productTitle={product.title}
                    />
                  </div>
                ) : (
                  <div className="mt-6">
                    <p className="mb-3 text-center text-sm text-muted-foreground">
                      Instant digital download
                    </p>
                    <BuyButton
                      productId={product.id}
                      productSlug={slug}
                      priceCad={Number(product.price_cad)}
                    />
                  </div>
                )}

                <div className="mt-6 space-y-2 text-xs text-muted-foreground">
                  <p>Instant PDF download after purchase</p>
                  <p>Lifetime access — download anytime</p>
                  <p>{product.download_count} downloads</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cross-links */}
        <div className="mt-12 flex gap-4 text-sm">
          <Link href="/shop" className="text-brand underline hover:text-brand-dark">
            Back to shop
          </Link>
          <Link href="/ingredients" className="text-brand underline hover:text-brand-dark">
            Browse ingredients
          </Link>
          <Link href="/pricing" className="text-brand underline hover:text-brand-dark">
            See subscription plans
          </Link>
        </div>
      </div>
    </>
  );
}
