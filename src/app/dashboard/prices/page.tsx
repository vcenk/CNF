import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

export const metadata: Metadata = {
  title: "My Ingredient Prices",
  robots: { index: false, follow: false },
};

export default async function PricesPage() {
  const user = await requireAuth();
  const supabase = await createClient();

  const { data: prices } = await supabase
    .from("user_ingredient_prices")
    .select("*, ingredients(inci_name, common_name, slug)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <div className="p-6 lg:p-8">
      <h1 className="font-display text-2xl font-bold">My Ingredient Prices</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Custom prices you have set for ingredients. These override the default
        supplier estimates in your costing calculations.
      </p>

      {(prices ?? []).length === 0 ? (
        <div className="mt-8 rounded-lg border border-dashed border-border py-12 text-center">
          <p className="text-muted-foreground">
            No custom prices set yet. Set prices in the Costing tab of any formula.
          </p>
          <Link
            href="/formulas"
            className="mt-3 inline-block text-sm text-brand underline"
          >
            Go to formulas
          </Link>
        </div>
      ) : (
        <Table className="mt-6">
          <TableHeader>
            <TableRow>
              <TableHead>Ingredient</TableHead>
              <TableHead className="text-right">Your Price ($/kg)</TableHead>
              <TableHead className="text-right">Effective Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(prices ?? []).map((p) => {
              const ing = p.ingredients as { inci_name: string; common_name: string | null; slug: string } | null;
              return (
                <TableRow key={p.id}>
                  <TableCell>
                    <Link
                      href={`/ingredients/${ing?.slug ?? ""}`}
                      className="font-medium text-brand hover:underline"
                    >
                      {ing?.common_name || ing?.inci_name || "Unknown"}
                    </Link>
                  </TableCell>
                  <TableCell className="text-right">
                    CA${Number(p.price_per_kg).toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted-foreground">
                    {p.effective_date}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
