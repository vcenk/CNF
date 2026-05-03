import type { Metadata } from "next";
import Image from "next/image";
import { JsonLd } from "@/components/seo/json-ld";
import Link from "next/link";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import {
  RECIPES_BY_SLUG,
  SOAP_RECIPES,
  RECIPE_TAG_LABEL,
  getRecipeImagePath,
} from "@/lib/soap-recipes";
import {
  calculateSoap,
  encodeRecipe,
  formatWeight,
  SOAP_OILS_BY_SLUG,
  ADDITIVES_BY_SLUG,
} from "@/lib/soap-calculator";
import { Calculator, Clock, ArrowLeft, Sparkles, AlertTriangle } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return SOAP_RECIPES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const recipe = RECIPES_BY_SLUG[slug];
  if (!recipe) return { title: "Not Found" };

  const title = `${recipe.name} — Free Soap Recipe with Quality Scores`;
  const description = `${recipe.summary} Free recipe with full instructions, quality scores, and one-click open-in-calculator from FormulaNorth.`;

  return {
    title,
    description,
    alternates: { canonical: `/tools/soap-calculator/recipes/${slug}` },
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/tools/soap-calculator/recipes/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function RecipeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const recipe = RECIPES_BY_SLUG[slug];
  if (!recipe) notFound();

  const result = calculateSoap(recipe.recipe);
  const encoded = encodeRecipe(recipe.recipe);
  const calculatorUrl = `/tools/soap-calculator?r=${encoded}`;
  const printUrl = `/tools/soap-calculator/print?r=${encoded}&unit=g`;

  const url = `${siteConfig.url}/tools/soap-calculator/recipes/${slug}`;

  const ingredientList: Array<{ name: string; amount: string }> = [
    ...result.oilLines.map((l) => ({
      name: l.common,
      amount: `${formatWeight(l.weightG, "g", 1)} (${l.percent}%)`,
    })),
    {
      name: `${recipe.recipe.lyeType} (lye)`,
      amount: `${formatWeight(result.lyeG, "g", 1)} (${recipe.recipe.lyePurityPercent}% purity)`,
    },
    {
      name: "Distilled water",
      amount: formatWeight(result.waterG, "g", 1),
    },
    ...(result.fragranceG > 0
      ? [
          {
            name: `Fragrance / EO (${recipe.recipe.fragrancePercent}%)`,
            amount: formatWeight(result.fragranceG, "g", 1),
          },
        ]
      : []),
    ...result.additiveLines.map((a) => ({
      name: a.label,
      amount: `${formatWeight(a.weightG, "g", 1)} (${a.percent}% of oils)`,
    })),
  ];

  // ISO 8601 duration covering soap-making + cure. cureWeeks=0 (liquid soap)
  // collapses to P2D for the make-and-test process.
  const totalDurationDays = recipe.cureWeeks * 7 + 2;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Recipe",
      name: recipe.name,
      description: recipe.summary,
      url,
      image: `${siteConfig.url}${getRecipeImagePath(slug)}`,
      author: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url,
      },
      datePublished: "2026-04-15",
      prepTime: "PT45M",
      totalTime: `P${totalDurationDays}D`,
      recipeYield: "12–14 bars (1 kg batch)",
      recipeCategory: "Soap making",
      recipeInstructions: recipe.instructions.map((step, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        text: step,
      })),
      recipeIngredient: ingredientList.map((i) => `${i.amount} ${i.name}`),
      keywords: recipe.tags.map((t) => RECIPE_TAG_LABEL[t]).join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Tools", item: `${siteConfig.url}/tools` },
        { "@type": "ListItem", position: 3, name: "Soap Calculator", item: `${siteConfig.url}/tools/soap-calculator` },
        { "@type": "ListItem", position: 4, name: "Recipes", item: `${siteConfig.url}/tools/soap-calculator/recipes` },
        { "@type": "ListItem", position: 5, name: recipe.name, item: url },
      ],
    },
  ];

  // Suggested related recipes — same first tag, different slug
  const related = SOAP_RECIPES.filter(
    (r) => r.slug !== recipe.slug && r.tags.some((t) => recipe.tags.includes(t))
  ).slice(0, 3);

  return (
    <>
      <JsonLd data={structuredData} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-1">/</span>
          <Link href="/tools" className="hover:text-foreground">Tools</Link>
          <span className="mx-1">/</span>
          <Link href="/tools/soap-calculator" className="hover:text-foreground">Soap Calculator</Link>
          <span className="mx-1">/</span>
          <Link href="/tools/soap-calculator/recipes" className="hover:text-foreground">Recipes</Link>
        </nav>

        <header className="mb-8">
          <div className="flex flex-wrap gap-1.5">
            {recipe.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-brand-soft/40 px-2 py-0.5 text-xs font-medium text-brand"
              >
                {RECIPE_TAG_LABEL[t]}
              </span>
            ))}
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {recipe.name}
          </h1>
          <p className="mt-3 text-lg leading-relaxed text-muted-foreground">
            {recipe.summary}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {recipe.cureWeeks === 0 ? "No cure (zap-test only)" : `${recipe.cureWeeks}-week cure`}
            </span>
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              {result.qualities.filter((q) => q.inRange === "ok").length} of {result.qualities.length} qualities in range
            </span>
          </div>
        </header>

        {/* Hero image */}
        <div className="mb-8 overflow-hidden rounded-2xl border border-border bg-muted">
          <Image
            src={getRecipeImagePath(slug)}
            alt={`${recipe.name} — handmade soap`}
            width={1200}
            height={675}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        {/* Action buttons */}
        <div className="mb-10 flex flex-wrap gap-3 rounded-xl border border-brand/30 bg-brand-soft/20 p-4">
          <Link
            href={calculatorUrl}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
          >
            <Calculator className="h-4 w-4" />
            Open in calculator (scale &amp; tweak)
          </Link>
          <Link
            href={printUrl}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
          >
            Print recipe sheet
          </Link>
        </div>

        {/* Description */}
        <section className="mb-10 space-y-4">
          <p className="leading-relaxed text-muted-foreground">{recipe.description}</p>
        </section>

        {/* Ingredients */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">
            Ingredients (1 kg batch)
          </h2>
          <div className="overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="border-b border-border bg-muted/40">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Ingredient</th>
                  <th className="px-4 py-2 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody>
                {ingredientList.map((row, i) => {
                  const oil = SOAP_OILS_BY_SLUG[recipe.recipe.oils[i]?.slug];
                  const additive = ADDITIVES_BY_SLUG[recipe.recipe.additives[i - recipe.recipe.oils.length - (recipe.recipe.fragrancePercent > 0 ? 3 : 2)]?.slug];
                  void additive;
                  return (
                    <tr key={i} className="border-b border-border/60 last:border-b-0">
                      <td className="px-4 py-2">
                        <div className="font-medium">{row.name}</div>
                        {oil && (
                          <div className="text-xs text-muted-foreground">{oil.inci}</div>
                        )}
                      </td>
                      <td className="px-4 py-2 text-right tabular-nums">{row.amount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Open the recipe in the calculator to scale up or down by gram, ounce, kg, or pound.
          </p>
        </section>

        {/* Quality scores */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">Expected qualities</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {result.qualities.map((q) => {
              const fillClass =
                q.inRange === "ok"
                  ? "bg-emerald-500"
                  : q.inRange === "low"
                    ? "bg-sky-500"
                    : "bg-amber-500";
              return (
                <div key={q.label} className="rounded-lg border border-border bg-card p-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{q.label}</span>
                    <span className="text-muted-foreground">
                      {q.value.toFixed(0)}{" "}
                      <span className="opacity-60">({q.recommendedMin}–{q.recommendedMax})</span>
                    </span>
                  </div>
                  <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    {q.label !== "INS" && q.label !== "Iodine" && (
                      <div
                        className="absolute inset-y-0 bg-muted-foreground/15"
                        style={{
                          left: `${q.recommendedMin}%`,
                          width: `${q.recommendedMax - q.recommendedMin}%`,
                        }}
                      />
                    )}
                    <div
                      className={`absolute inset-y-0 left-0 ${fillClass} opacity-85`}
                      style={{
                        width: `${
                          q.label === "INS"
                            ? Math.max(0, Math.min(100, (q.value / 200) * 100))
                            : Math.max(0, Math.min(100, q.value))
                        }%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Instructions */}
        <section className="mb-10">
          <h2 className="mb-4 font-display text-2xl font-semibold">Step-by-step</h2>
          <ol className="list-decimal space-y-3 pl-6 text-muted-foreground marker:text-brand">
            {recipe.instructions.map((step, i) => (
              <li key={i} className="leading-relaxed">{step}</li>
            ))}
          </ol>
        </section>

        {/* Notes */}
        {recipe.notes.length > 0 && (
          <section className="mb-10 rounded-xl border border-amber-200/60 bg-amber-50/60 p-5 dark:border-amber-900/40 dark:bg-amber-950/20">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold text-amber-900 dark:text-amber-200">
              <AlertTriangle className="h-4 w-4" />
              Notes &amp; troubleshooting
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-amber-900/80 dark:text-amber-200/80">
              {recipe.notes.map((n, i) => (
                <li key={i}>{n}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Recipe-level warnings (from calculator) */}
        {result.warnings.length > 0 && (
          <section className="mb-10 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-lg font-semibold">
              Calculator-flagged recipe notes
            </h2>
            <ul className="mt-3 list-inside list-disc space-y-1.5 text-sm text-muted-foreground">
              {result.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>
        )}

        <DisclaimerCallout />

        {/* Save to FormulaNorth */}
        <section className="mt-12 rounded-xl border border-brand/20 bg-brand-soft/30 p-6">
          <h2 className="font-display text-lg font-semibold">
            Selling in Canada?
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Soap sold to the public in Canada is generally regulated as a
            cosmetic. Save this recipe to a free FormulaNorth account, then
            use the bilingual label drafter and CNF preparation tools to get
            ready for sale.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
            >
              Create a free account
            </Link>
            <Link
              href="/how-to-sell-handmade-soap-in-canada"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              Soap-seller guide
            </Link>
            <Link
              href="/tools/cnf-readiness-checker"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
            >
              CNF Readiness Checker
            </Link>
          </div>
        </section>

        {/* Related recipes */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-display text-xl font-semibold">More recipes</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/tools/soap-calculator/recipes/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug transition-colors group-hover:text-brand">
                    {r.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-xs text-muted-foreground">
                    {r.summary}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-6">
          <Link
            href="/tools/soap-calculator/recipes"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All recipes
          </Link>
          <Link
            href="/tools/soap-calculator"
            className="text-sm font-medium text-brand underline hover:text-brand-dark"
          >
            Open soap calculator
          </Link>
        </div>
      </article>
    </>
  );
}
