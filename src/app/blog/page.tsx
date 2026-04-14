import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { siteConfig } from "@/lib/site-config";

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

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Blog
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Articles for Canadian makers
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Formulation tips, regulatory updates, ingredient spotlights, and
          business advice for indie cosmetic makers.
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">No posts yet. Check back soon!</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardHeader>
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
                  <CardTitle className="mt-2 text-lg">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
