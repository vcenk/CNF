import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HotlistBadge } from "@/features/ingredients/hotlist-badge";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";
import {
  getIngredientBySlug,
  getRelatedIngredients,
} from "@/lib/supabase/queries/ingredients";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { dataSourcesLastReviewed } from "@/lib/legal";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const ingredient = await getIngredientBySlug(slug);
  if (!ingredient) return { title: "Not Found" };

  const name = ingredient.common_name || ingredient.inci_name;
  const title = `${name} (${ingredient.inci_name}) — INCI, Hotlist Status & Canadian Suppliers`;
  const description =
    ingredient.description ||
    `${name} is a cosmetic ingredient with INCI name ${ingredient.inci_name}. See Health Canada Hotlist status, typical use level, and Canadian supplier availability.`;

  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `/ingredients/${slug}` },
    openGraph: {
      title: name,
      description: description.slice(0, 160),
      url: `${siteConfig.url}/ingredients/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: name,
      description: description.slice(0, 160),
    },
  };
}

export default async function IngredientDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const ingredient = await getIngredientBySlug(slug);
  if (!ingredient) notFound();

  const functionMap = (ingredient.ingredient_function_map ?? []) as Array<{
    is_primary: boolean;
    ingredient_functions: {
      id: string;
      name: string;
      slug: string;
      description: string | null;
    } | null;
  }>;
  const functions = functionMap
    .filter((item) => item.ingredient_functions)
    .map((item) => ({
      ...item.ingredient_functions!,
      isPrimary: item.is_primary,
    }));

  const supplierPrices = (ingredient.ingredient_supplier_prices ?? []) as Array<{
    id: string;
    price_per_kg: number | null;
    currency: string;
    min_order_kg: number | null;
    suppliers: {
      id: string;
      name: string;
      slug: string;
      website: string | null;
      location: string | null;
    } | null;
  }>;

  const functionIds = functions.map((fn) => fn.id);
  const related = await getRelatedIngredients(ingredient.id, functionIds, 6);
  const name = ingredient.common_name || ingredient.inci_name;
  const url = `${siteConfig.url}/ingredients/${slug}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: ingredient.inci_name,
      alternateName: ingredient.common_name,
      description: ingredient.description,
      category: "Cosmetic Ingredient",
      url,
      additionalProperty: [
        ingredient.cas_number && {
          "@type": "PropertyValue",
          name: "CAS Number",
          value: ingredient.cas_number,
        },
        {
          "@type": "PropertyValue",
          name: "INCI Name",
          value: ingredient.inci_name,
        },
        {
          "@type": "PropertyValue",
          name: "Health Canada Status",
          value:
            ingredient.hotlist_status === "not_listed"
              ? "Not listed"
              : ingredient.hotlist_status,
        },
      ].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        {
          "@type": "ListItem",
          position: 2,
          name: "Ingredients",
          item: `${siteConfig.url}/ingredients`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name,
          item: url,
        },
      ],
    },
  ];

  const isRestricted =
    ingredient.hotlist_status === "restricted" ||
    ingredient.hotlist_status === "prohibited";

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/ingredients" className="hover:text-foreground">
            Ingredients
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{name}</span>
        </nav>

        <header className="mb-8">
          <div className="flex items-start gap-3">
            <div className="flex-1">
              <h1 className="font-display text-3xl font-bold tracking-tight">
                {name}
              </h1>
              {ingredient.common_name && (
                <div className="mt-2 flex flex-wrap items-baseline gap-2">
                  <span className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    INCI
                  </span>
                  <p className="text-lg font-medium italic text-brand">
                    {ingredient.inci_name}
                  </p>
                </div>
              )}
            </div>
            <HotlistBadge status={ingredient.hotlist_status} />
          </div>
          {ingredient.description && (
            <p className="mt-4 leading-relaxed text-muted-foreground">
              {ingredient.description}
            </p>
          )}
          <p className="mt-3 text-xs text-muted-foreground">
            Last reviewed {dataSourcesLastReviewed} · Always verify against the
            current Health Canada Cosmetic Ingredient Hotlist before use.
          </p>
        </header>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ingredient.cas_number && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
                  CAS Number
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-mono text-sm">{ingredient.cas_number}</p>
              </CardContent>
            </Card>
          )}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
                Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-1">
                {functions.map((fn) => (
                  <Link
                    key={fn.slug}
                    href={`/ingredients?fn=${fn.slug}`}
                    className="rounded-full bg-brand-soft/50 px-2 py-0.5 text-xs text-brand hover:bg-brand-soft"
                  >
                    {fn.name}
                    {fn.isPrimary && " *"}
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
          {(ingredient.typical_use_level_min != null ||
            ingredient.typical_use_level_max != null) && (
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-medium uppercase text-muted-foreground">
                  Typical Usage Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  {ingredient.typical_use_level_min}% -{" "}
                  {ingredient.typical_use_level_max}%
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {isRestricted && (
          <section className="mb-8 rounded-xl border border-warning/30 bg-warning-soft/30 p-5">
            <h2 className="font-display text-lg font-semibold text-warning">
              Health Canada Hotlist —{" "}
              {ingredient.hotlist_status === "restricted"
                ? "Restricted"
                : "Prohibited"}
            </h2>
            {ingredient.hotlist_max_concentration != null && (
              <p className="mt-2 text-sm">
                <strong>Max concentration:</strong>{" "}
                {ingredient.hotlist_max_concentration}%
              </p>
            )}
            {ingredient.hotlist_conditions && (
              <p className="mt-1 text-sm text-muted-foreground">
                {ingredient.hotlist_conditions}
              </p>
            )}
            {ingredient.usage_type_restriction && (
              <p className="mt-1 text-sm">
                <strong>Product type restriction:</strong>{" "}
                {ingredient.usage_type_restriction === "rinse-off"
                  ? "Rinse-off products only"
                  : ingredient.usage_type_restriction === "leave-on"
                    ? "Leave-on products only"
                    : "Both types"}
              </p>
            )}
            <p className="mt-3 text-sm">
              <Link
                href="/health-canada-cosmetic-hotlist"
                className="text-brand underline hover:text-brand-dark"
              >
                Read the Hotlist guide →
              </Link>
            </p>
          </section>
        )}

        {ingredient.is_fragrance_allergen && (
          <section className="mb-8 rounded-xl border border-brand/20 bg-brand-soft/20 p-5">
            <h2 className="font-display text-lg font-semibold text-brand">
              Fragrance allergen — disclosure threshold applies
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              This ingredient is recognized as a fragrance allergen. When
              present above the disclosure threshold (0.001% in leave-on
              products, 0.01% in rinse-off products), it should be named
              individually on the Canadian cosmetic label.
            </p>
            <p className="mt-2 text-sm">
              <Link
                href="/cosmetic-label-requirements-canada"
                className="text-brand underline hover:text-brand-dark"
              >
                Read the Canadian labelling guide →
              </Link>
            </p>
          </section>
        )}

        {supplierPrices.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold">
              Canadian suppliers
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pricing is for reference. Always confirm current price, lead
              time, and Certificate of Analysis directly with the supplier.
            </p>
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Supplier</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Price/kg</TableHead>
                  <TableHead className="text-right">Min Order</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {supplierPrices.map((supplierPrice) =>
                  supplierPrice.suppliers ? (
                    <TableRow key={supplierPrice.id}>
                      <TableCell>
                        <Link
                          href={`/suppliers/${supplierPrice.suppliers.slug}`}
                          className="font-medium text-brand hover:underline"
                        >
                          {supplierPrice.suppliers.name}
                        </Link>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {supplierPrice.suppliers.location}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {supplierPrice.price_per_kg
                          ? `$${supplierPrice.price_per_kg} ${supplierPrice.currency}`
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right text-sm">
                        {supplierPrice.min_order_kg
                          ? `${supplierPrice.min_order_kg} kg`
                          : "-"}
                      </TableCell>
                    </TableRow>
                  ) : null
                )}
              </TableBody>
            </Table>
          </section>
        )}

        {related.length > 0 && (
          <section className="mb-8">
            <h2 className="font-display text-xl font-semibold">
              Related ingredients
            </h2>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item: Record<string, unknown>) => (
                <Link
                  key={item.id as string}
                  href={`/ingredients/${item.slug}`}
                  className="rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:border-brand"
                >
                  <p className="font-medium">
                    {(item.common_name as string) || (item.inci_name as string)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {item.inci_name as string}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold">
            Plan with this ingredient
          </h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                href: "/tools/cnf-readiness-checker",
                label: "CNF Readiness Checker",
                detail: "Check a product including this ingredient before notification.",
              },
              {
                href: "/tools/inci-list-formatter",
                label: "INCI List Formatter",
                detail: "Build a clean ingredient list with correct ordering.",
              },
              {
                href: "/inci-name-lookup-canada",
                label: "INCI Name Lookup Canada",
                detail: "Confirm INCI naming for Canadian cosmetic labels.",
              },
              {
                href: "/cosmetic-label-requirements-canada",
                label: "Cosmetic Label Requirements in Canada",
                detail: "Bilingual content, ordering rules, and warnings.",
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
            Use {name} in a formula
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Build formulas with INCI lookups, hotlist checks, batch scaling,
            costing, and CNF preparation in one workspace.
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
