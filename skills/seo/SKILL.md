---
name: seo
description: >
  Apply this skill whenever the user wants to build, audit, or optimize a website for SEO (Search Engine Optimization).
  Triggers include: "make this SEO-friendly", "how should I structure my site for Google", "write meta tags",
  "add schema markup", "create a sitemap", "optimize for search", "what's missing for Google Search Console",
  "improve my ranking", "on-page SEO", "technical SEO", "structured data", "rich results", or any request
  related to making web pages discoverable by search engines. Use this skill for new builds AND audits of
  existing sites. Works for any web framework (Next.js, WordPress, plain HTML, etc.).
---

# SEO Skill

A comprehensive guide for building and optimizing websites to rank well on Google and other search engines.
Covers technical SEO, on-page SEO, structured data, Google Search Console requirements, and content structure.

## Core principles

- Google crawls HTML, not just client JavaScript.
- Every page should target a specific keyword intent.
- Content quality matters more than tricks.
- Speed and mobile usability affect rankings.
- Internal links help search engines discover and understand pages.

## Page requirements

- One clear `<h1>` per page
- Unique title and meta description
- Canonical URL
- Open Graph and Twitter metadata
- Structured data where relevant
- Crawlable internal links

## Site architecture

- Homepage links to major commercial and informational pages
- Feature pages link to guides and workflow pages
- Guides link back to product pages
- Keep URLs short, lowercase, and hyphenated

## Technical checklist

- Include indexable pages in `sitemap.xml`
- Reference the sitemap in `robots.txt`
- Disallow internal-only routes like `/api/`
- Keep important pages statically rendered or server rendered
- Validate schema with Google's rich results tools

