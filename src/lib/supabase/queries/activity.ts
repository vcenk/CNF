import { createClient } from "@/lib/supabase/server";

export type ActivityAction =
  | "formula_created"
  | "formula_updated"
  | "ingredient_added"
  | "ingredient_removed"
  | "ingredient_updated"
  | "version_created"
  | "label_saved"
  | "cnf_validated"
  | "cnf_exported"
  | "cnf_submitted"
  | "cnf_status_changed";

export async function logActivity(
  formulaId: string,
  action: ActivityAction,
  description: string,
  metadata?: Record<string, unknown>
) {
  const supabase = await createClient();

  await supabase.from("formula_activity_log").insert({
    formula_id: formulaId,
    action,
    description,
    metadata: metadata ?? {},
  });
}

export async function getFormulaActivity(formulaId: string, limit = 30) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("formula_activity_log")
    .select("*")
    .eq("formula_id", formulaId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching activity:", error);
    return [];
  }
  return data ?? [];
}

export async function getFormulaCnfSubmissions(formulaId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cnf_submissions")
    .select("*, formula_versions(version_number)")
    .eq("formula_id", formulaId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching submissions:", error);
    return [];
  }
  return data ?? [];
}
