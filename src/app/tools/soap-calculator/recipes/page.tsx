import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import {
  SOAP_RECIPES,
  RECIPE_TAG_LABEL,
  type RecipeTag,
} from "@/lib/soap-recipes";
import { calculateSoap } from "@/lib/soap-calculator";
import { Sparkles, Clock, ArrowRight } from "lucide-react";

const pathname = "/tools/soap-calculator/recipes";
const title = "Free Soap Recipes — Cold Process, Castile, Salt Bar, Milk Soap";
const description =
  "Curated trustworthy soap recipes — beginner balanced bars, classic Castile, coconut salt bars, goat milk soap, hot process, liquid soap, and more. Each recipe loads into the FormulaNorth soap calculator with one click.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

interface RecipesPageProps {
  searchParams: Promise<{ tag?: string }>;
}

const ALL_TAGS: RecipeTag[] = [
  "beginner",
  "intermediate",
  "advanced",
  "vegan",
  "no_palm",
  "salt_bar",
  "milk",
  "liquid",
  "shave",
  "kitchen",
  "hot_process",
  "fragranced",
  "unscented",
];

export default async function RecipesIndexPage({ searchParams }: RecipesPageProps) {
  const params = await searchParams;
  const filter = (params.tag ?? "") as RecipeTag | "";
  const isValidFilter = ALL_TAGS.includes(filter as RecipeTag);
  const activeTag = isValidFilter ? (filter as RecipeTag) : null;

  // Tally counts per tag
  const counts = new Map<RecipeTag, number>();
  for (const r of SOAP_RECIPES) {
    for (const t of r.tags) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }

  const visible = activeTag
    ? SOAP_RECIPES.filter((r) => r.tags.includes(activeTag))
    : SOAP_RECIPES;

  const url = `${siteConfig.url}${pathname}`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    description,
    url,
    numberOfItems: SOAP_RECIPES.length,
    itemListElement: SOAP_RECIPES.map((r, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Recipe",
        name: r.name,
        description: r.summary,
        url: `${siteConfig.url}/tools/soap-calculator/recipes/${r.slug}`,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <span className="mx-2">/</span>
          <Link href="/tools/soap-calculator" className="hover:text-foreground">Soap Calculator</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Recipes</span>
        </nav>

        <header className="mb-10 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Free recipe library
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Trustworthy soap recipes
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Curated common-knowledge recipes from the indie soap-making
            community — each one runs through the FormulaNorth calculator
            with quality scores, fatty-acid breakdown, and one-click
            &ldquo;Open in calculator&rdquo; so you can scale and tweak.
          </p>
        </header>

        <div className="mb-10 max-w-3xl">
          <DisclaimerCallout title="Recipes are starting points — always lye- and zap-test before sale" />
        </div>

        {/* Tag filter pills */}
        <nav className="mb-10 flex flex-wrap items-center gap-2">
          <TagPill
            label="All"
            href="/tools/soap-calculator/recipes"
            count={SOAP_RECIPES.length}
            active={!activeTag}
          />
          {ALL_TAGS.filter((t) => (counts.get(t) ?? 0) > 0).map((t) => (
            <TagPill
              key={t}
              label={RECIPE_TAG_LABEL[t]}
              href={`/tools/soap-calculator/recipes?tag=${t}`}
              count={counts.get(t) ?? 0}
              active={activeTag === t}
            />
          ))}
        </nav>

        {visible.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">No recipes with that tag.</p>
            <Link
              href="/tools/soap-calculator/recipes"
              className="mt-2 inline-block text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              View all recipes
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((r) => {
              const result = calculateSoap(r.recipe);
              const okCount = result.qualities.filter(
                (q) => q.inRange === "ok"
              ).length;
              const totalQ = result.qualities.length;

              return (
                <Link
                  key={r.slug}
                  href={`/tools/soap-calculator/recipes/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {r.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-brand-soft/40 px-2 py-0.5 text-xs font-medium text-brand"
                      >
                        {RECIPE_TAG_LABEL[t]}
                      </span>
                    ))}
                  </div>
                  <h2 className="mt-3 line-clamp-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                    {r.name}
                  </h2>
                  <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                    {r.summary}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-brand" />
                      {okCount}/{totalQ} qualities in range
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {r.cureWeeks === 0 ? "no cure" : `${r.cureWeeks}w cure`}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Beginner CTA */}
        <section className="mt-16 rounded-2xl border border-brand/30 bg-gradient-to-br from-brand-soft/30 via-card to-card p-6 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <h2 className="font-display text-xl font-bold">
                New to soap making?
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Start with our beginner guide — it walks through the
                equipment kit, safety basics, and the cold-process step-by-step
                using the Balanced Beginner Bar recipe.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/blog/soap-maker-starter-kit"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
                >
                  Soap Maker Starter Kit <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/blog/cold-process-soap-step-by-step"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
                >
                  CP step-by-step
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Selling in Canada?</h3>
              <p className="mt-1 text-xs leading-5 text-muted-foreground">
                Soap sold to the public in Canada is generally regulated as a
                cosmetic. CNF preparation, bilingual labels, and Hotlist
                review apply.
              </p>
              <Link
                href="/how-to-sell-handmade-soap-in-canada"
                className="mt-3 inline-block text-sm font-medium text-brand underline hover:text-brand-dark"
              >
                Read the soap-seller guide →
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

function TagPill({
  label,
  href,
  count,
  active,
}: {
  label: string;
  href: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-brand bg-brand text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-brand hover:text-brand"
      }`}
    >
      {label}
      <span
        className={`rounded-full px-1.5 text-xs ${
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
