import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";
import type { ReactNode } from "react";
import Link from "next/link";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { siteConfig } from "@/lib/site-config";

export interface SeoGuideFaq {
  question: string;
  answer: string;
}

export interface SeoGuideSection {
  heading: string;
  body?: ReactNode;
  bullets?: string[];
}

export interface SeoGuideCta {
  label: string;
  href: string;
  description?: string;
}

export interface SeoGuideBreadcrumb {
  label: string;
  href?: string;
}

export interface SeoGuideSource {
  label: string;
  href: string;
  publisher: string;
  note?: string;
}

export interface SeoGuideProps {
  eyebrow: string;
  title: string;
  description: string;
  intro: ReactNode;
  pathname: string;
  datePublished: string;
  dateModified: string;
  lastReviewed: string;
  breadcrumbs: SeoGuideBreadcrumb[];
  sections: SeoGuideSection[];
  faqs: SeoGuideFaq[];
  primaryCta: SeoGuideCta;
  relatedLinks?: SeoGuideCta[];
  sources?: SeoGuideSource[];
}

export function buildSeoGuideMetadata(input: {
  title: string;
  description: string;
  pathname: string;
}): Metadata {
  const url = `${siteConfig.url}${input.pathname}`;
  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.pathname },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      type: "article",
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
    },
  };
}

export function SeoGuide({
  eyebrow,
  title,
  description,
  intro,
  pathname,
  datePublished,
  dateModified,
  lastReviewed,
  breadcrumbs,
  sections,
  faqs,
  primaryCta,
  relatedLinks,
  sources,
}: SeoGuideProps) {
  const url = `${siteConfig.url}${pathname}`;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      description,
      author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      publisher: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
      citation: sources?.map((source) => source.href),
      datePublished,
      dateModified,
      mainEntityOfPage: url,
      inLanguage: "en-CA",
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.url },
        ...breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: crumb.label,
          item: crumb.href ? `${siteConfig.url}${crumb.href}` : url,
        })),
      ],
    },
  ];

  return (
    <>
      <JsonLd data={structuredData} />

      <article className="mx-auto max-w-4xl px-4 py-16 sm:px-6">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return (
              <span key={`${crumb.label}-${index}`}>
                <span className="mx-2">/</span>
                {isLast || !crumb.href ? (
                  <span className="text-foreground">{crumb.label}</span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground">
                    {crumb.label}
                  </Link>
                )}
              </span>
            );
          })}
        </nav>

        <header className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            {eyebrow}
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-6 border-y border-border/80 py-4">
            <dl className="grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Prepared by
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  FormulaNorth Editorial Team
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Last reviewed
                </dt>
                <dd className="mt-1 font-medium text-foreground">
                  {lastReviewed}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Our method
                </dt>
                <dd className="mt-1">
                  <Link
                    href="/data-sources"
                    className="font-medium text-brand underline decoration-brand/30 underline-offset-4 hover:text-brand-dark"
                  >
                    Sources and corrections
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </header>

        <div className="prose-intro space-y-4 leading-relaxed text-muted-foreground">
          {intro}
        </div>

        <div className="mt-10 space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-display text-2xl font-semibold">
                {section.heading}
              </h2>
              {section.body && (
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  {section.body}
                </div>
              )}
              {section.bullets && (
                <ul className="mt-4 list-inside list-disc space-y-1 text-muted-foreground">
                  {section.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-12">
          <DisclaimerCallout compact />
        </div>

        {sources && sources.length > 0 && (
          <section className="mt-12 border-l-2 border-brand/50 pl-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Evidence desk
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold">
              Primary sources
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              We used these official sources for the regulatory statements in
              this guide. Open the current source before making a filing,
              printing a label, or selling a product.
            </p>
            <ol className="mt-5 space-y-4">
              {sources.map((source) => (
                <li key={source.href}>
                  <a
                    href={source.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-foreground underline decoration-brand/40 underline-offset-4 hover:text-brand"
                  >
                    {source.label}
                  </a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {source.publisher}
                    {source.note ? ` — ${source.note}` : ""}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">
            Frequently asked questions
          </h2>
          <div className="mt-6 divide-y divide-border">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-5">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="mt-2 text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {relatedLinks && relatedLinks.length > 0 && (
          <section className="mt-12">
            <h2 className="font-display text-2xl font-semibold">
              Related on FormulaNorth
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-lg border border-border bg-card p-4 transition-colors hover:bg-muted"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {link.label}
                    </p>
                    {link.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {link.description}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <div className="mt-12 rounded-xl border border-brand/20 bg-brand-soft/30 p-6 text-center">
          <p className="font-display text-lg font-semibold">
            {primaryCta.description ?? "Ready to start your prep?"}
          </p>
          <Link
            href={primaryCta.href}
            className="mt-4 inline-block rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
          >
            {primaryCta.label}
          </Link>
        </div>
      </article>
    </>
  );
}
