import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts, getRelatedPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";
import { ShareButton } from "./share-button";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  DollarSign,
  Search,
  Tag,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: post.date,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

const CATEGORY_CTAS: Record<
  string,
  { title: string; body: string; ctaLabel: string; ctaHref: string; icon: typeof CheckCircle2 }
> = {
  "Regulatory Updates": {
    title: "Run a CNF Readiness Check",
    body: "Apply this article to a real product — paste your ingredients and get a free readiness report with hotlist flags and label reminders.",
    ctaLabel: "Open the readiness checker",
    ctaHref: "/tools/cnf-readiness-checker",
    icon: CheckCircle2,
  },
  "Business Tips": {
    title: "Cost a real product",
    body: "Try the free Cosmetic Cost Calculator — get cost per unit, cost per batch, and suggested wholesale and retail pricing in seconds.",
    ctaLabel: "Open the cost calculator",
    ctaHref: "/tools/cosmetic-cost-calculator",
    icon: DollarSign,
  },
  "Ingredient Spotlights": {
    title: "Look it up in the database",
    body: "Search FormulaNorth's ingredient database for INCI names, hotlist status, and Canadian supplier availability.",
    ctaLabel: "Browse ingredients",
    ctaHref: "/ingredients",
    icon: Search,
  },
};

const DEFAULT_CTA = {
  title: "Plan your product",
  body: "FormulaNorth helps Canadian indie cosmetic makers organize formulation, label drafting, costing, and CNF preparation in one workspace.",
  ctaLabel: "Try the free tools",
  ctaHref: "/tools",
  icon: Tag,
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${siteConfig.url}/blog/${slug}`;
  const related = getRelatedPosts(slug, 3);
  const cta = CATEGORY_CTAS[post.category] ?? DEFAULT_CTA;
  const CtaIcon = cta.icon;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.description,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      url,
      mainEntityOfPage: url,
      articleSection: post.category,
      inLanguage: "en-CA",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteConfig.url}/blog` },
        { "@type": "ListItem", position: 3, name: post.category, item: `${siteConfig.url}/blog?category=${encodeURIComponent(post.category)}` },
        { "@type": "ListItem", position: 4, name: post.title, item: url },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <nav className="mb-6 flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/blog" className="hover:text-foreground">
            Blog
          </Link>
          <span className="mx-1">/</span>
          <Link
            href={`/blog?category=${encodeURIComponent(post.category)}`}
            className="hover:text-foreground"
          >
            {post.category}
          </Link>
        </nav>

        <header className="mb-10">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline" className="border-brand/30 text-brand">
              {post.category}
            </Badge>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {post.description}
          </p>
          <div className="mt-6 flex items-center gap-3">
            <ShareButton url={url} />
          </div>
        </header>

        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-semibold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-10 prose-h3:text-xl prose-a:text-brand prose-a:underline hover:prose-a:text-brand-dark prose-strong:text-foreground prose-li:text-muted-foreground prose-li:leading-relaxed prose-p:text-muted-foreground prose-p:leading-relaxed prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none">
          <MDXRemote source={post.content} />
        </div>

        <section className="mt-12 rounded-2xl border border-brand/30 bg-brand-soft/20 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-brand/15 p-3">
              <CtaIcon className="h-5 w-5 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">{cta.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {cta.body}
              </p>
              <Link
                href={cta.ctaHref}
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
              >
                {cta.ctaLabel} <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-xl font-semibold">Keep reading</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                >
                  <Badge variant="outline" className="self-start text-xs">
                    {r.category}
                  </Badge>
                  <h3 className="mt-2 line-clamp-3 font-display text-sm font-semibold leading-snug transition-colors group-hover:text-brand">
                    {r.title}
                  </h3>
                  <span className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {r.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-border/40 pt-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand hover:text-brand-dark"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All articles
          </Link>
          <ShareButton url={url} />
        </div>
      </article>
    </>
  );
}
