import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import {
  getFormulaById,
  getCurrentVersion,
  getVersionIngredients,
} from "@/lib/supabase/queries/formulas";
import { getLabelTemplate } from "@/app/formulas/[id]/label-actions";
import { CnfWizard } from "@/features/formulas/cnf-wizard/cnf-wizard";
import { validateForCnfSubmission } from "@/services/cnf-validation";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "CNF Wizard",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CnfWizardPage({ params }: PageProps) {
  const user = await requireAuth();
  const { id } = await params;

  const formula = await getFormulaById(id);
  if (!formula) notFound();

  const currentVersion = await getCurrentVersion(id);
  if (!currentVersion) notFound();

  const supabase = await createClient();
  const [rawIngredients, labelTemplate, { data: profile }] = await Promise.all([
    getVersionIngredients(currentVersion.id),
    getLabelTemplate(id),
    supabase.from("profiles").select("*").eq("id", user.id).single(),
  ]);

  // Normalize ingredients with full details
  const ingredients = rawIngredients.map((ing) => {
    const d = ing.ingredients as Record<string, unknown>;
    return {
      id: ing.id,
      ingredientId: ing.ingredient_id,
      inciName: (d?.inci_name as string) ?? "",
      commonName: (d?.common_name as string) ?? null,
      casNumber: (d?.cas_number as string) ?? null,
      percentage: Number(ing.percentage),
      phase: ing.phase,
      hotlistStatus: (d?.hotlist_status as string) ?? "not_listed",
      hotlistMaxConcentration: d?.hotlist_max_concentration as number | null,
      hotlistConditions: (d?.hotlist_conditions as string) ?? null,
      usageTypeRestriction: (d?.usage_type_restriction as string) ?? null,
      isFragranceAllergen: (d?.is_fragrance_allergen as boolean) ?? false,
    };
  });

  const companyName =
    labelTemplate?.company_display_name || profile?.company_name || "";
  const companyAddress =
    labelTemplate?.company_address || profile?.company_address || "";

  const issues = validateForCnfSubmission(
    {
      formulaName: formula.name,
      usageType: formula.usage_type,
      productCategory: formula.product_category,
      companyName,
      companyAddress,
      productNameEn: labelTemplate?.product_display_name_en ?? null,
      hasLabelTemplate: !!labelTemplate,
    },
    ingredients
  );

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-6">
        <Link
          href={`/formulas/${id}`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to formula
        </Link>
        <h1 className="mt-3 font-display text-2xl font-bold">CNF Wizard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill out your Health Canada Cosmetic Notification Form in one place.
          AI can help suggest categories, translate, and review compliance.
        </p>
      </div>

      <CnfWizard
        formulaId={id}
        formulaVersionId={currentVersion.id}
        initialData={{
          formulaName: formula.name,
          productCategory: formula.product_category ?? "",
          usageType: formula.usage_type ?? "",
          productNameEn: labelTemplate?.product_display_name_en ?? "",
          productNameFr: labelTemplate?.product_display_name_fr ?? "",
          netWeightG: labelTemplate?.net_weight_g
            ? Number(labelTemplate.net_weight_g)
            : null,
          netVolumeMl: labelTemplate?.net_volume_ml
            ? Number(labelTemplate.net_volume_ml)
            : null,
          companyName,
          companyAddress,
        }}
        ingredients={ingredients}
        issues={issues}
      />
    </div>
  );
}
