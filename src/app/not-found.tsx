import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found",
  description:
    "The page you were looking for doesn't exist on FormulaNorth. Use the links below to find what you need.",
  robots: { index: false, follow: false },
};

const popularDestinations = [
  {
    title: "Free tools",
    description: "Soap calculator, CNF readiness checker, allergen calculator, and more.",
    href: "/tools",
  },
  {
    title: "Ingredient database",
    description: "INCI names, Hotlist status, fragrance-allergen flags.",
    href: "/ingredients",
  },
  {
    title: "Soap recipe library",
    description: "18 cold-process and hot-process recipes with quality scores.",
    href: "/tools/soap-calculator/recipes",
  },
  {
    title: "Canadian supplier directory",
    description: "Real Canadian cosmetic ingredient suppliers, grouped by province.",
    href: "/suppliers",
  },
  {
    title: "Compliance guides",
    description: "CNF preparation, Hotlist, label rules, INCI naming.",
    href: "/guides",
  },
  {
    title: "Blog",
    description: "Soap making, ingredient choices, Canadian regulatory updates.",
    href: "/blog",
  },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
        We couldn&apos;t find that page.
      </h1>
      <p className="mt-5 text-lg text-muted-foreground">
        The link may be broken, the page may have moved, or it might never have
        existed. Here&apos;s where most makers are headed.
      </p>

      <ul className="mt-10 grid gap-3 sm:grid-cols-2">
        {popularDestinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-md"
            >
              <span className="font-display text-base font-semibold transition-colors group-hover:text-brand">
                {d.title}
              </span>
              <span className="mt-1 text-sm text-muted-foreground">
                {d.description}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-brand">
                Open <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-12 border-t border-border/40 pt-6 text-sm text-muted-foreground">
        Still stuck?{" "}
        <Link href="/contact" className="text-brand underline hover:text-brand-dark">
          Send a quick message
        </Link>{" "}
        and we&apos;ll point you the right way.
      </div>
    </div>
  );
}
