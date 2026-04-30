import type { Metadata } from "next";
import Link from "next/link";
import { requireAuth } from "@/lib/auth/require-auth";
import { getUserFormulas } from "@/lib/supabase/queries/formulas";
import { getFormulaUsage } from "@/lib/plan-limits-server";
import { createFormulaAction } from "./actions";
import { FormulaSearch } from "@/features/formulas/formula-search";
import { FormulaUsageCard } from "@/features/dashboard/formula-usage";
import { FlaskConical, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "My Formulas",
  robots: { index: false, follow: false },
};

interface RawFormula {
  id: string;
  name: string;
  product_category: string | null;
  usage_type: string | null;
  target_batch_size_g: number;
  updated_at: string;
  formula_versions?: Array<{ version_number: number; is_current: boolean }>;
}

export default async function FormulasPage() {
  const user = await requireAuth();
  const [raw, usage] = await Promise.all([
    getUserFormulas(user.id),
    getFormulaUsage(user.id),
  ]);

  const formulas = (raw as RawFormula[]).map((f) => ({
    id: f.id,
    name: f.name,
    product_category: f.product_category,
    usage_type: f.usage_type,
    target_batch_size_g: Number(f.target_batch_size_g),
    updated_at: f.updated_at,
    formula_versions: f.formula_versions,
  }));

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold tracking-tight">
            My Formulas
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {formulas.length} formula{formulas.length !== 1 ? "s" : ""}
          </p>
        </div>

        {usage.atLimit ? (
          <Link
            href="/pricing?upgradeReason=formula-limit"
            className="flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-4 py-2.5 text-sm font-medium text-amber-800 hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200"
          >
            <Plus className="h-4 w-4" />
            Upgrade to add more formulas
          </Link>
        ) : (
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
        )}
      </div>

      <div className="mb-8">
        <FormulaUsageCard usage={usage} variant="compact" />
      </div>

      {formulas.length === 0 ? (
        <div className="py-20 text-center">
          <FlaskConical className="mx-auto h-12 w-12 text-muted-foreground/40" />
          <h2 className="mt-4 text-lg font-semibold">No formulas yet</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first formula to start building with ingredients from the
            database.
          </p>
          {usage.atLimit ? (
            <Link
              href="/pricing?upgradeReason=formula-limit"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-amber-300 bg-amber-50 px-6 py-3 text-sm font-medium text-amber-800 hover:bg-amber-100 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-200"
            >
              <Plus className="h-4 w-4" />
              Upgrade to create a formula
            </Link>
          ) : (
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
          )}
        </div>
      ) : (
        <FormulaSearch formulas={formulas} />
      )}
    </div>
  );
}
