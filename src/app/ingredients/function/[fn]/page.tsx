import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { IngredientCard } from "@/features/ingredients/ingredient-card";
import { siteConfig } from "@/lib/site-config";
import {
  getIngredientFunctions,
  getIngredientsByFunction,
} from "@/lib/supabase/queries/ingredients";

interface PageProps {
  params: Promise<{ fn: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { fn } = await params;
  const functions = await getIngredientFunctions();
  const fnData = functions.find((f) => f.slug === fn);
  if (!fnData) return {};

  return {
    title: `${fnData.name} Cosmetic Ingredients — INCI Names & Canadian Suppliers | FormulaNorth`,
    description: `Browse ${fnData.name.toLowerCase()} ingredients used in cosmetic formulation. INCI names, Health Canada hotlist status, and Canadian supplier information.`,
    alternates: { canonical: `/ingredients/function/${fn}` },
    openGraph: {
      title: `${fnData.name} Cosmetic Ingredients — FormulaNorth`,
      description: `Browse ${fnData.name.toLowerCase()} ingredients with INCI names, hotlist status, and Canadian suppliers.`,
      url: `${siteConfig.url}/ingredients/function/${fn}`,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${fnData.name} Cosmetic Ingredients — FormulaNorth`,
      description: `Browse ${fnData.name.toLowerCase()} ingredients with INCI names, hotlist status, and Canadian suppliers.`,
    },
  };
}

export default async function IngredientFunctionPage({ params }: PageProps) {
  const { fn } = await params;

  const [functions, ingredients] = await Promise.all([
    getIngredientFunctions(),
    getIngredientsByFunction(fn),
  ]);

  const fnData = functions.find((f) => f.slug === fn);
  if (!fnData) notFound();

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.url}/ingredients/function/${fn}`,
    name: `${fnData.name} Cosmetic Ingredients`,
    description: `${fnData.name} ingredients used in cosmetic formulation with INCI names, Health Canada hotlist status, and Canadian supplier information.`,
    url: `${siteConfig.url}/ingredients/function/${fn}`,
    inLanguage: "en",
    isPartOf: { "@id": `${siteConfig.url}/ingredients` },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Ingredient Database", item: `${siteConfig.url}/ingredients` },
        { "@type": "ListItem", position: 3, name: `${fnData.name} Ingredients`, item: `${siteConfig.url}/ingredients/function/${fn}` },
      ],
    },
    numberOfItems: ingredients.length,
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${fnData.name} Cosmetic Ingredients`,
    numberOfItems: ingredients.length,
    itemListElement: ingredients.slice(0, 50).map((ing, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "ChemicalSubstance",
        name: (ing as Record<string, unknown>).inci_name as string,
        alternateName: (ing as Record<string, unknown>).common_name as string | undefined,
        url: `${siteConfig.url}/ingredients/${(ing as Record<string, unknown>).slug as string}`,
      },
    })),
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={itemListSchema} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"
        >
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/ingredients" className="hover:text-brand">
            Ingredients
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{fnData.name}</span>
        </nav>

        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Ingredient Database
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {fnData.name} cosmetic ingredients
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            {fnData.description
              ? fnData.description
              : `Browse ${ingredients.length} ${fnData.name.toLowerCase()} ingredients used in cosmetic formulation. Each entry includes the INCI name, common name, Health Canada hotlist status, and available Canadian suppliers.`}
          </p>
          {ingredients.length > 0 && (
            <p className="mt-2 text-sm text-muted-foreground">
              {ingredients.length} ingredient{ingredients.length !== 1 ? "s" : ""} in this category
            </p>
          )}
        </div>

        {ingredients.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-muted-foreground">
              No ingredients found for this category.
            </p>
            <Link
              href="/ingredients"
              className="mt-2 inline-block text-sm text-brand underline"
            >
              Browse all ingredients
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {ingredients.map((ingredient) => {
              const ing = ingredient as Record<string, unknown>;
              const fnMap = (ing.ingredient_function_map ?? []) as Array<{
                is_primary: boolean;
                ingredient_functions: { name: string; slug: string } | null;
              }>;
              const fnNames = fnMap
                .filter((m) => m.ingredient_functions)
                .map((m) => m.ingredient_functions!.name);

              return (
                <IngredientCard
                  key={ing.id as string}
                  slug={ing.slug as string}
                  inciName={ing.inci_name as string}
                  commonName={ing.common_name as string | null}
                  hotlistStatus={
                    ing.hotlist_status as
                      | "not_listed"
                      | "restricted"
                      | "prohibited"
                  }
                  functions={fnNames}
                  isFragranceAllergen={ing.is_fragrance_allergen as boolean}
                />
              );
            })}
          </div>
        )}

        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-lg font-semibold">Other ingredient categories</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {functions
              .filter((f) => f.slug !== fn)
              .map((f) => (
                <Link
                  key={f.slug}
                  href={`/ingredients/function/${f.slug}`}
                  className="rounded-full border border-border bg-card px-3 py-1 text-sm transition-colors hover:border-brand hover:text-brand"
                >
                  {f.name}
                </Link>
              ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/ingredients"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              ← Search all ingredients
            </Link>
            <Link
              href="/ingredients/hotlist"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Health Canada Hotlist
            </Link>
            <Link
              href="/suppliers"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Canadian Suppliers
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
