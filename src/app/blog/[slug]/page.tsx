import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site-config";
import { Badge } from "@/components/ui/badge";

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
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
    url: `${siteConfig.url}/blog/${slug}`,
    mainEntityOfPage: `${siteConfig.url}/blog/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-foreground">Blog</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{post.title.slice(0, 40)}...</span>
        </nav>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <Badge variant="outline">{post.category}</Badge>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString("en-CA", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
            <span>{post.readTime}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            {post.description}
          </p>
        </header>

        {/* Content */}
        <div className="prose prose-neutral max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-brand prose-a:underline hover:prose-a:text-brand-dark prose-strong:text-foreground prose-li:text-muted-foreground prose-p:text-muted-foreground prose-p:leading-relaxed">
          <MDXRemote source={post.content} />
        </div>

        {/* Footer */}
        <div className="mt-12 border-t border-border/40 pt-8">
          <div className="flex gap-4 text-sm">
            <Link href="/blog" className="text-brand underline hover:text-brand-dark">
              All articles
            </Link>
            <Link href="/ingredients" className="text-brand underline hover:text-brand-dark">
              Browse ingredients
            </Link>
            <Link href="/shop" className="text-brand underline hover:text-brand-dark">
              Shop
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
