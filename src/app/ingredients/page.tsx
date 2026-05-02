import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { Suspense } from "react";
import { searchIngredients, getIngredientFunctions } from "@/lib/supabase/queries/ingredients";
import { IngredientCard } from "@/features/ingredients/ingredient-card";
import { IngredientSearch } from "@/features/ingredients/ingredient-search";
import { IngredientFilters } from "@/features/ingredients/ingredient-filters";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Cosmetic Ingredient Database — INCI Names, Hotlist & Canadian Suppliers",
  description:
    "Search 170+ cosmetic ingredients by INCI name, function, or Health Canada hotlist status. Find Canadian suppliers and pricing. Free to use.",
  alternates: { canonical: "/ingredients" },
  openGraph: {
    title: "Cosmetic Ingredient Database",
    description: "Search INCI names, check hotlist status, find Canadian suppliers.",
    url: `${siteConfig.url}/ingredients`,
    siteName: siteConfig.name,
    type: "website",
  },
};

interface PageProps {
  searchParams: Promise<{
    q?: string;
    fn?: string;
    hotlist?: string;
    page?: string;
  }>;
}

export default async function IngredientsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const functionFilter = params.fn ?? "";
  const hotlistFilter = (params.hotlist ?? "all") as "all" | "restricted" | "prohibited" | "not_listed";
  const page = parseInt(params.page ?? "1", 10);
  const pageSize = 24;

  const [{ ingredients, total }, functions] = await Promise.all([
    searchIngredients({ query, functionFilter, hotlistFilter, page, pageSize }),
    getIngredientFunctions(),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Cosmetic Ingredient Database",
    description: "Searchable database of cosmetic ingredients with INCI names, Health Canada hotlist status, and Canadian supplier information.",
    url: `${siteConfig.url}/ingredients`,
    numberOfItems: total,
    provider: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={structuredData} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Ingredient Database
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Search cosmetic ingredients
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse {total} ingredients by INCI name, function, or Health Canada
            hotlist status. Every ingredient links to Canadian suppliers and
            compliance details.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <Suspense>
            <IngredientSearch />
          </Suspense>
          <Suspense>
            <IngredientFilters functions={functions} />
          </Suspense>
        </div>

        {/* Results */}
        {ingredients.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No ingredients found{query ? ` for "${query}"` : ""}.
            </p>
            <Link
              href="/ingredients"
              className="mt-2 inline-block text-sm text-brand underline"
            >
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ingredients.map((ingredient: Record<string, unknown>) => {
              const fnMap = (ingredient.ingredient_function_map ?? []) as Array<{
                is_primary: boolean;
                ingredient_functions: { name: string; slug: string } | null;
              }>;
              const fnNames = fnMap
                .filter((m) => m.ingredient_functions)
                .map((m) => m.ingredient_functions!.name);

              return (
                <IngredientCard
                  key={ingredient.id as string}
                  slug={ingredient.slug as string}
                  inciName={ingredient.inci_name as string}
                  commonName={ingredient.common_name as string | null}
                  hotlistStatus={ingredient.hotlist_status as "not_listed" | "restricted" | "prohibited"}
                  functions={fnNames}
                  isFragranceAllergen={ingredient.is_fragrance_allergen as boolean}
                />
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/ingredients?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(functionFilter ? { fn: functionFilter } : {}), ...(hotlistFilter !== "all" ? { hotlist: hotlistFilter } : {}), page: String(page - 1) }).toString()}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
              >
                Previous
              </Link>
            )}
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            {page < totalPages && (
              <Link
                href={`/ingredients?${new URLSearchParams({ ...(query ? { q: query } : {}), ...(functionFilter ? { fn: functionFilter } : {}), ...(hotlistFilter !== "all" ? { hotlist: hotlistFilter } : {}), page: String(page + 1) }).toString()}`}
                className="rounded-md border border-border px-3 py-1.5 text-sm hover:bg-muted"
              >
                Next
              </Link>
            )}
          </nav>
        )}

        {/* Quick links */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-lg font-semibold">Browse by category</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {functions.map((fn) => (
              <Link
                key={fn.slug}
                href={`/ingredients?fn=${fn.slug}`}
                className="rounded-full border border-border bg-card px-3 py-1 text-sm transition-colors hover:border-brand hover:text-brand"
              >
                {fn.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/ingredients/hotlist"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              View Health Canada Hotlist
            </Link>
            <Link
              href="/suppliers"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Canadian Suppliers
            </Link>
            <Link
              href="/inci-name-lookup-canada"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              INCI Name Lookup guide
            </Link>
            <Link
              href="/tools/cnf-readiness-checker"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              CNF Readiness Checker
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
