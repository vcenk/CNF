"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/queries/activity";

export interface CnfWizardData {
  // Formula-level
  formulaName: string;
  productCategory: string;
  usageType: string;
  // Label template
  productNameEn: string;
  productNameFr: string;
  netWeightG: number | null;
  netVolumeMl: number | null;
  // Profile / company
  companyName: string;
  companyAddress: string;
}

export async function saveCnfWizardAction(
  formulaId: string,
  data: CnfWizardData
) {
  const user = await requireAuth();
  const supabase = await createClient();

  // 1. Update formula
  const { error: formulaError } = await supabase
    .from("formulas")
    .update({
      name: data.formulaName,
      product_category: data.productCategory || null,
      usage_type: data.usageType || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formulaId);

  if (formulaError) return { error: formulaError.message };

  // 2. Upsert label template
  const { error: labelError } = await supabase
    .from("label_templates")
    .upsert(
      {
        formula_id: formulaId,
        product_display_name_en: data.productNameEn,
        product_display_name_fr: data.productNameFr,
        company_display_name: data.companyName,
        company_address: data.companyAddress,
        net_weight_g: data.netWeightG,
        net_volume_ml: data.netVolumeMl,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "formula_id" }
    );

  if (labelError) return { error: labelError.message };

  // 3. Update profile with company info (so it persists across formulas)
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      company_name: data.companyName,
      company_address: data.companyAddress,
    })
    .eq("id", user.id);

  if (profileError) return { error: profileError.message };

  await logActivity(
    formulaId,
    "formula_updated",
    "Updated CNF wizard data (formula + label + company)"
  );

  revalidatePath(`/formulas/${formulaId}`);
  revalidatePath(`/formulas/${formulaId}/cnf`);
  return { success: true };
}

export async function recordCnfSubmissionAction(
  formulaId: string,
  formulaVersionId: string
) {
  await requireAuth();
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cnf_submissions")
    .insert({
      formula_id: formulaId,
      formula_version_id: formulaVersionId,
      status: "exported",
      notes: "Generated via CNF wizard",
    })
    .select()
    .single();

  if (error) return { error: error.message };

  await logActivity(
    formulaId,
    "cnf_exported",
    "CNF file exported via wizard"
  );

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true, submissionId: data.id };
}
