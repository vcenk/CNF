import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { getUserFormulas } from "@/lib/supabase/queries/formulas";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { createFormulaAction } from "./actions";
import { FlaskConical, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "My Formulas",
  robots: { index: false, follow: false },
};

export default async function FormulasPage() {
  const user = await requireAuth();
  const formulas = await getUserFormulas(user.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">
            My Formulas
          </h1>
          <p className="mt-1 text-muted-foreground">
            {formulas.length} formula{formulas.length !== 1 ? "s" : ""}
          </p>
        </div>

        <form action={createFormulaAction}>
          <input type="hidden" name="name" value="Untitled Formula" />
          <input type="hidden" name="batchSize" value="100" />
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
          >
            <Plus className="h-4 w-4" />
            New formula
          </button>
        </form>
      </div>

      {formulas.length === 0 ? (
        <div className="py-20 text-center">
          <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-semibold">No formulas yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first formula to start building with ingredients from the
            database.
          </p>
          <form action={createFormulaAction} className="mt-6">
            <input type="hidden" name="name" value="Untitled Formula" />
            <input type="hidden" name="batchSize" value="100" />
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
            >
              <Plus className="h-4 w-4" />
              Create your first formula
            </button>
          </form>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {formulas.map((formula) => {
            const currentVersion = (formula.formula_versions as Array<{
              version_number: number;
              is_current: boolean;
            }>)?.find((v) => v.is_current);

            return (
              <Link key={formula.id} href={`/formulas/${formula.id}`}>
                <Card className="h-full transition-shadow hover:shadow-md">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base">{formula.name}</CardTitle>
                      {formula.product_category && (
                        <Badge variant="outline" className="text-xs">
                          {(formula.product_category as string).replace("_", " ")}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="space-y-1">
                      {formula.usage_type && (
                        <span className="block text-xs">
                          {formula.usage_type === "rinse-off" ? "Rinse-off" : "Leave-on"}
                        </span>
                      )}
                      <span className="block text-xs">
                        v{currentVersion?.version_number ?? 1} &middot;{" "}
                        {formula.target_batch_size_g}g batch
                      </span>
                      <span className="block text-xs text-muted-foreground">
                        Updated{" "}
                        {new Date(formula.updated_at).toLocaleDateString("en-CA")}
                      </span>
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
