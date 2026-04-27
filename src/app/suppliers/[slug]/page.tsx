import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupplierBySlug } from "@/lib/supabase/queries/suppliers";
import { HotlistBadge } from "@/features/ingredients/hotlist-badge";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";
import { dataSourcesLastReviewed } from "@/lib/legal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLink, MapPin } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) return { title: "Not Found" };

  const title = `${supplier.name} — Canadian Cosmetic Ingredient Supplier`;
  const description = `Browse cosmetic ingredients available from ${supplier.name}${supplier.location ? ` in ${supplier.location}` : ""}, including INCI names, Health Canada Hotlist status, and reference pricing.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `/suppliers/${slug}` },
    openGraph: {
      title: supplier.name,
      description: description.slice(0, 160),
      url: `${siteConfig.url}/suppliers/${slug}`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary",
      title: supplier.name,
      description: description.slice(0, 160),
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
    ingredients: {
      id: string;
      inci_name: string;
      common_name: string | null;
      slug: string;
      hotlist_status: string;
    } | null;
  }>;

  const totalIngredients = prices.filter((p) => p.ingredients).length;
  const restrictedCount = prices.filter(
    (p) => p.ingredients?.hotlist_status === "restricted"
  ).length;
  const prohibitedCount = prices.filter(
    (p) => p.ingredients?.hotlist_status === "prohibited"
  ).length;

  const url = `${siteConfig.url}/suppliers/${slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: supplier.name,
      url: supplier.website,
      address: supplier.location,
      areaServed: "Canada",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Suppliers",
          item: `${siteConfig.url}/suppliers`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: supplier.name,
          item: url,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/suppliers" className="hover:text-foreground">
            Suppliers
          </Link>
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
          <p className="mt-3 text-xs text-muted-foreground">
            Listings reflect FormulaNorth&apos;s ingredient database. Last
            reviewed {dataSourcesLastReviewed}. Confirm pricing, lead time, and
            documentation directly with the supplier before ordering.
          </p>
        </header>

        {totalIngredients > 0 && (
          <section className="mb-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Ingredients listed" value={totalIngredients} />
            <SummaryCard
              label="Restricted (Hotlist)"
              value={restrictedCount}
              tone={restrictedCount > 0 ? "warning" : "neutral"}
            />
            <SummaryCard
              label="Prohibited (Hotlist)"
              value={prohibitedCount}
              tone={prohibitedCount > 0 ? "danger" : "neutral"}
            />
          </section>
        )}

        {prices.length > 0 ? (
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold">
              Ingredients ({totalIngredients})
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
                        <HotlistBadge
                          status={
                            p.ingredients.hotlist_status as
                              | "not_listed"
                              | "restricted"
                              | "prohibited"
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {p.price_per_kg
                          ? `$${p.price_per_kg} ${p.currency}`
                          : "—"}
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
            .
          </p>
        )}

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold">
            Plan with these ingredients
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/tools/cosmetic-cost-calculator",
                label: "Cosmetic Cost Calculator",
                detail: "Cost a batch using prices from this supplier.",
              },
              {
                href: "/tools/cnf-readiness-checker",
                label: "CNF Readiness Checker",
                detail: "Check a product before notifying Health Canada.",
              },
              {
                href: "/cosmetic-ingredient-suppliers-canada",
                label: "Canadian Cosmetic Ingredient Suppliers",
                detail: "How to compare and source from Canadian suppliers.",
              },
              {
                href: "/inci-name-lookup-canada",
                label: "INCI Name Lookup Canada",
                detail: "Confirm INCI naming for Canadian cosmetic labels.",
              },
            ].map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                >
                  <p className="text-sm font-semibold">{link.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {link.detail}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <div className="mb-8 rounded-xl border border-brand/20 bg-brand-soft/20 p-6 text-center">
          <p className="font-display text-lg font-semibold">
            Build a formula with these ingredients
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Save your recipes inside FormulaNorth and track ingredient costs
            from this supplier alongside your label and CNF preparation.
          </p>
          <Link
            href="/auth/signup"
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
          >
            Create a free account
          </Link>
        </div>

        <DisclaimerCallout compact />
      </div>
    </>
  );
}

function SummaryCard({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: number;
  tone?: "neutral" | "warning" | "danger";
}) {
  const toneClass =
    tone === "danger"
      ? "border-rose-200 bg-rose-50/60 dark:border-rose-900/40 dark:bg-rose-950/20"
      : tone === "warning"
        ? "border-amber-200 bg-amber-50/60 dark:border-amber-900/40 dark:bg-amber-950/20"
        : "border-border bg-card";
  return (
    <div className={`rounded-xl border p-4 ${toneClass}`}>
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-2 font-display text-2xl font-bold">{value}</p>
    </div>
  );
}
