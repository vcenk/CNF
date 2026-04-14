import type { Metadata } from "next";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const guides = [
  {
    title: "Health Canada Cosmetic Notification Guide",
    description:
      "Step-by-step walkthrough of the CNF filing process, requirements, and common pitfalls.",
    href: "/guides/health-canada-cosmetic-notification",
  },
  {
    title: "INCI Names Explained",
    description:
      "What INCI names are, how to find them, and why they matter for Canadian cosmetic compliance.",
    href: "/guides/inci-names-explained",
    comingSoon: true,
  },
  {
    title: "Cosmetic Labelling in Canada",
    description:
      "Bilingual label requirements, mandatory warnings, font sizes, and INCI ordering rules.",
    href: "/guides/cosmetic-labelling-canada",
    comingSoon: true,
  },
  {
    title: "Fragrance Allergen Disclosure 2026",
    description:
      "New April 2026 rules requiring individual fragrance allergen disclosure on labels and CNFs.",
    href: "/guides/fragrance-allergen-disclosure-2026",
    comingSoon: true,
  },
  {
    title: "Cosmetic Product Costing",
    description:
      "How to calculate true COGS, set profitable pricing, and track ingredient costs as a small maker.",
    href: "/guides/cosmetic-product-costing",
    comingSoon: true,
  },
];

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Practical guides for Canadian cosmetic makers covering Health Canada compliance, INCI naming, labelling, costing, and more.",
};

export default function GuidesIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="mb-12">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand">
          Guides
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Resources for Canadian cosmetic makers
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          From Health Canada compliance to pricing your products — practical
          guides to help you formulate, label, and sell with confidence.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((guide) => (
          <Link
            key={guide.href}
            href={guide.comingSoon ? "#" : guide.href}
            className={guide.comingSoon ? "pointer-events-none" : ""}
          >
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-base">{guide.title}</CardTitle>
                  {guide.comingSoon && (
                    <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                      Soon
                    </span>
                  )}
                </div>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
