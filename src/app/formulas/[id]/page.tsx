import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { requireAuth } from "@/lib/auth/require-auth";
import {
  getFormulaById,
  getCurrentVersion,
  getVersionIngredients,
  getFormulaVersions,
} from "@/lib/supabase/queries/formulas";
import { getCostConfig, getIngredientPrices } from "@/lib/supabase/queries/costing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormulaHeader } from "@/features/formulas/builder/formula-header";
import { IngredientTable } from "@/features/formulas/builder/ingredient-table";
import { FormulaSummary } from "@/features/formulas/builder/formula-summary";
import { VersionHistory } from "@/features/formulas/builder/version-history";
import { BatchScaler } from "@/features/formulas/builder/batch-scaler";
import { CostingTab } from "@/features/formulas/costing/costing-tab";
import { LabelTab } from "@/features/formulas/label/label-tab";
import { ExportTab } from "@/features/formulas/export/export-tab";
import { SubmissionHistory } from "@/features/formulas/export/submission-history";
import { ActivityTimeline } from "@/features/formulas/builder/activity-timeline";
import { getLabelTemplate } from "@/app/formulas/[id]/label-actions";
import { getFormulaActivity, getFormulaCnfSubmissions } from "@/lib/supabase/queries/activity";
import { validateFormula } from "@/services/formula-validation";
import { validateForCnfSubmission } from "@/services/cnf-validation";

export const metadata: Metadata = {
  title: "Formula Builder",
  robots: { index: false, follow: false },
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FormulaBuilderPage({ params }: PageProps) {
  const user = await requireAuth();
  const { id } = await params;

  const formula = await getFormulaById(id);
  if (!formula) notFound();

  const currentVersion = await getCurrentVersion(id);
  if (!currentVersion) notFound();

  const [ingredients, versions] = await Promise.all([
    getVersionIngredients(currentVersion.id),
    getFormulaVersions(id),
  ]);

  // Build validation input
  const validationIngredients = ingredients.map((ing) => {
    const details = ing.ingredients as Record<string, unknown>;
    return {
      id: ing.id,
      ingredientId: ing.ingredient_id,
      inciName: (details?.inci_name as string) ?? "",
      percentage: Number(ing.percentage),
      hotlistStatus: (details?.hotlist_status as string) ?? "not_listed",
      hotlistMaxConcentration: details?.hotlist_max_concentration as number | null,
      hotlistConditions: (details?.hotlist_conditions as string) ?? null,
      usageTypeRestriction: (details?.usage_type_restriction as string) ?? null,
      isFragranceAllergen: (details?.is_fragrance_allergen as boolean) ?? false,
    };
  });

  const issues = validateFormula(
    { name: formula.name, usageType: formula.usage_type },
    validationIngredients
  );

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const infos = issues.filter((i) => i.severity === "info");

  // Costing + label + activity data
  const ingredientIds = ingredients.map((i) => i.ingredient_id);
  const [costConfig, priceData, labelTemplate, activities, cnfSubmissions] = await Promise.all([
    getCostConfig(id),
    getIngredientPrices(user.id, ingredientIds),
    getLabelTemplate(id),
    getFormulaActivity(id),
    getFormulaCnfSubmissions(id),
  ]);

  const costingIngredients = ingredients.map((ing) => {
    const details = ing.ingredients as Record<string, unknown>;
    return {
      ingredientId: ing.ingredient_id,
      inciName: (details?.inci_name as string) ?? "",
      commonName: (details?.common_name as string) ?? null,
      percentage: Number(ing.percentage),
    };
  });

  // Merge price sources
  const costingPrices: { ingredientId: string; pricePerKg: number; source: "user" | "seed" }[] = [];
  for (const p of priceData.userPrices) {
    costingPrices.push({
      ingredientId: p.ingredient_id,
      pricePerKg: Number(p.price_per_kg),
      source: "user",
    });
  }
  for (const p of priceData.seedPrices) {
    if (!costingPrices.some((cp) => cp.ingredientId === p.ingredient_id)) {
      costingPrices.push({
        ingredientId: p.ingredient_id,
        pricePerKg: Number(p.price_per_kg),
        source: "seed",
      });
    }
  }

  // CNF export validation
  const cnfIssues = validateForCnfSubmission(
    {
      formulaName: formula.name,
      usageType: formula.usage_type,
      productCategory: formula.product_category,
      companyName: labelTemplate?.company_display_name ?? null,
      companyAddress: labelTemplate?.company_address ?? null,
      productNameEn: labelTemplate?.product_display_name_en ?? null,
      hasLabelTemplate: !!labelTemplate,
    },
    validationIngredients
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <FormulaHeader formula={formula} />

      <Tabs defaultValue="builder" className="mt-6">
        <TabsList>
          <TabsTrigger value="builder">Builder</TabsTrigger>
          <TabsTrigger value="costing">Costing</TabsTrigger>
          <TabsTrigger value="label">Label</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <IngredientTable
                versionId={currentVersion.id}
                ingredients={ingredients}
              />
            </div>
            <div className="space-y-4">
              <FormulaSummary
                ingredients={validationIngredients}
                errors={errors}
                warnings={warnings}
                infos={infos}
                batchSizeG={Number(formula.target_batch_size_g)}
              />
              <BatchScaler
                currentBatchSizeG={Number(formula.target_batch_size_g)}
                ingredients={ingredients.map((ing) => {
                  const d = ing.ingredients as Record<string, unknown>;
                  return {
                    id: ing.id,
                    inciName: (d?.inci_name as string) ?? "",
                    commonName: (d?.common_name as string) ?? null,
                    percentage: Number(ing.percentage),
                  };
                })}
              />
              <VersionHistory
                formulaId={formula.id}
                versions={versions}
                currentVersionId={currentVersion.id}
              />
              <ActivityTimeline activities={activities} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="costing" className="mt-6">
          <CostingTab
            formulaId={formula.id}
            batchSizeG={Number(formula.target_batch_size_g)}
            ingredients={costingIngredients}
            prices={costingPrices}
            initialConfig={{
              laborCostPerBatch: Number(costConfig.labor_cost_per_batch),
              packagingCostPerUnit: Number(costConfig.packaging_cost_per_unit),
              overheadPercent: Number(costConfig.overhead_percent),
              targetMarginPercent: Number(costConfig.target_margin_percent),
              unitsPerBatch: Number(costConfig.units_per_batch),
            }}
          />
        </TabsContent>

        <TabsContent value="label" className="mt-6">
          <LabelTab
            formulaId={formula.id}
            usageType={formula.usage_type}
            productCategory={formula.product_category}
            ingredients={ingredients.map((ing) => {
              const details = ing.ingredients as Record<string, unknown>;
              return {
                inciName: (details?.inci_name as string) ?? "",
                percentage: Number(ing.percentage),
                isFragranceAllergen: (details?.is_fragrance_allergen as boolean) ?? false,
              };
            })}
            initialTemplate={labelTemplate ? {
              product_display_name_en: labelTemplate.product_display_name_en,
              product_display_name_fr: labelTemplate.product_display_name_fr,
              company_display_name: labelTemplate.company_display_name,
              company_address: labelTemplate.company_address ?? "",
              net_weight_g: labelTemplate.net_weight_g ? Number(labelTemplate.net_weight_g) : null,
              net_volume_ml: labelTemplate.net_volume_ml ? Number(labelTemplate.net_volume_ml) : null,
              custom_claims_en: labelTemplate.custom_claims_en ?? [],
              custom_claims_fr: labelTemplate.custom_claims_fr ?? [],
            } : null}
          />
        </TabsContent>

        <TabsContent value="export" className="mt-6">
          <div className="space-y-6">
            <ExportTab
              formulaId={formula.id}
              issues={cnfIssues}
              exportData={labelTemplate ? {
                productNameEn: labelTemplate.product_display_name_en,
                productNameFr: labelTemplate.product_display_name_fr,
                companyName: labelTemplate.company_display_name,
                companyAddress: labelTemplate.company_address ?? "",
                productCategory: formula.product_category ?? "",
                usageType: formula.usage_type ?? "",
                ingredients: ingredients.map((ing) => {
                  const d = ing.ingredients as Record<string, unknown>;
                  return {
                    inciName: (d?.inci_name as string) ?? "",
                    percentage: Number(ing.percentage),
                    casNumber: (d?.cas_number as string) ?? null,
                    isFragranceAllergen: (d?.is_fragrance_allergen as boolean) ?? false,
                  };
                }),
              } : undefined}
            />
            <SubmissionHistory submissions={cnfSubmissions} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
