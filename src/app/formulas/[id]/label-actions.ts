"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/lib/auth/require-auth";
import { createClient } from "@/lib/supabase/server";
import { logActivity } from "@/lib/supabase/queries/activity";

export async function saveLabelTemplateAction(
  formulaId: string,
  template: {
    product_display_name_en: string;
    product_display_name_fr: string;
    company_display_name: string;
    company_address: string;
    net_weight_g: number | null;
    net_volume_ml: number | null;
    custom_claims_en: string[];
    custom_claims_fr: string[];
  }
) {
  await requireAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from("label_templates")
    .upsert(
      {
        formula_id: formulaId,
        ...template,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "formula_id" }
    );

  if (error) return { error: error.message };

  await logActivity(formulaId, "label_saved", `Updated label: "${template.product_display_name_en}"`);

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true };
}

export async function getLabelTemplate(formulaId: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("label_templates")
    .select("*")
    .eq("formula_id", formulaId)
    .single();

  return data;
}
