import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, getCategoriesWithCounts } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";
import { Calendar, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Formulation Tips, Regulatory Updates & Business Advice",
  description:
    "Practical articles for Canadian cosmetic makers. Formulation tips, Health Canada regulatory updates, ingredient spotlights, and business advice.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "FormulaNorth Blog",
    description: "Articles for Canadian cosmetic makers.",
    url: `${siteConfig.url}/blog`,
    siteName: siteConfig.name,
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string }>;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;
  const allPosts = getAllPosts();
  const categories = getCategoriesWithCounts();

  const activeCategory = category && categories.some((c) => c.name === category)
    ? category
    : null;

  const visiblePosts = activeCategory
    ? allPosts.filter((p) => p.category === activeCategory)
    : allPosts;

  const featured = !activeCategory ? visiblePosts[0] : null;
  const rest = featured ? visiblePosts.slice(1) : visiblePosts;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Blog
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Articles for Canadian cosmetic makers
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Formulation tips, Health Canada regulatory updates, ingredient
          spotlights, and business advice for indie makers.
        </p>
      </header>

      {categories.length > 0 && (
        <nav className="mb-10 flex flex-wrap items-center gap-2">
          <CategoryPill
            label="All"
            href="/blog"
            count={allPosts.length}
            active={!activeCategory}
          />
          {categories.map((c) => (
            <CategoryPill
              key={c.name}
              label={c.name}
              href={`/blog?category=${encodeURIComponent(c.name)}`}
              count={c.count}
              active={activeCategory === c.name}
            />
          ))}
        </nav>
      )}

      {visiblePosts.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-10 text-center">
          <p className="text-muted-foreground">
            No posts in this category yet.
          </p>
          <Link
            href="/blog"
            className="mt-2 inline-block text-sm font-medium text-brand underline hover:text-brand-dark"
          >
            View all articles
          </Link>
        </div>
      ) : (
        <>
          {featured && (
            <Link
              href={`/blog/${featured.slug}`}
              className="group mb-12 block overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-lg sm:p-8"
            >
              <div className="grid gap-6 sm:grid-cols-5">
                <div className="sm:col-span-3">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <Badge variant="outline" className="border-brand/30 text-brand">
                      Featured
                    </Badge>
                    <Badge variant="outline">{featured.category}</Badge>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-brand sm:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    {featured.description}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5" />
                      {featured.readTime}
                    </span>
                  </div>
                </div>
                <div className="hidden items-center justify-end sm:col-span-2 sm:flex">
                  <span className="inline-flex items-center gap-2 rounded-lg bg-brand-soft/40 px-4 py-2.5 text-sm font-medium text-brand transition-all group-hover:gap-3">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </Link>
          )}

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Badge variant="outline" className="self-start">
                  {post.category}
                </Badge>
                <h3 className="mt-3 line-clamp-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-brand">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">
                  {post.description}
                </p>
                <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function CategoryPill({
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
          active ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
