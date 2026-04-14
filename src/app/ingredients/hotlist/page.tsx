import type { Metadata } from "next";
import Link from "next/link";
import { getHotlistIngredients } from "@/lib/supabase/queries/ingredients";
import { siteConfig } from "@/lib/site-config";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "Health Canada Cosmetic Ingredient Hotlist — Restricted & Prohibited",
  description:
    "Complete list of restricted and prohibited cosmetic ingredients per the Health Canada Cosmetic Ingredient Hotlist. Includes concentration limits and conditions.",
  alternates: { canonical: "/ingredients/hotlist" },
  openGraph: {
    title: "Health Canada Cosmetic Ingredient Hotlist",
    description: "Restricted and prohibited cosmetic ingredients with concentration limits.",
    url: `${siteConfig.url}/ingredients/hotlist`,
    siteName: siteConfig.name,
  },
};

export default async function HotlistPage() {
  const ingredients = await getHotlistIngredients();

  const restricted = ingredients.filter((i) => i.hotlist_status === "restricted");
  const prohibited = ingredients.filter((i) => i.hotlist_status === "prohibited");

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/ingredients" className="hover:text-foreground">Ingredients</Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">Hotlist</span>
      </nav>

      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-warning">
          Health Canada
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Cosmetic Ingredient Hotlist
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Ingredients that are restricted or prohibited in cosmetics sold in
          Canada. Always verify against the{" "}
          <a
            href="https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand underline"
          >
            official Health Canada hotlist
          </a>{" "}
          for the most current information.
        </p>
      </header>

      {/* Restricted */}
      <section className="mb-12">
        <h2 className="font-display text-xl font-semibold">
          Restricted Ingredients ({restricted.length})
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Permitted under specific conditions — concentration limits, product
          type restrictions, or mandatory warnings.
        </p>
        <Table className="mt-4">
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead>Max %</TableHead>
              <TableHead>Conditions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restricted.map((ing) => (
              <TableRow key={ing.id}>
                <TableCell>
                  <Link
                    href={`/ingredients/${ing.slug}`}
                    className="font-medium text-brand hover:underline"
                  >
                    {ing.common_name || ing.inci_name}
                  </Link>
                  <p className="text-xs text-muted-foreground">{ing.inci_name}</p>
                </TableCell>
                <TableCell className="text-sm">
                  {ing.hotlist_max_concentration != null ? `${ing.hotlist_max_concentration}%` : "—"}
                </TableCell>
                <TableCell className="max-w-xs text-sm text-muted-foreground">
                  {ing.hotlist_conditions || "—"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Prohibited */}
      {prohibited.length > 0 && (
        <section>
          <h2 className="font-display text-xl font-semibold">
            Prohibited Ingredients ({prohibited.length})
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Must not appear in any cosmetic product sold in Canada.
          </p>
          <Table className="mt-4">
            <TableHeader>
              <TableRow>
                <TableHead>Ingredient</TableHead>
                <TableHead>INCI Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prohibited.map((ing) => (
                <TableRow key={ing.id}>
                  <TableCell>
                    <Link
                      href={`/ingredients/${ing.slug}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {ing.common_name || ing.inci_name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {ing.inci_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </div>
  );
}
