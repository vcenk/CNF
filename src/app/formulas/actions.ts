"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { logActivity } from "@/lib/supabase/queries/activity";
import { checkCanCreateFormula } from "@/lib/plan-limits";

export async function createFormulaAction(_formData: FormData): Promise<void> {
  const user = await requireAuth();

  const guard = await checkCanCreateFormula(user.id);
  if (!guard.allowed) {
    redirect(`/pricing?upgradeReason=formula-limit&tier=${guard.usage.tier}`);
  }

  const supabase = await createClient();

  const name = _formData.get("name") as string;
  const productCategory = _formData.get("productCategory") as string | null;
  const usageType = _formData.get("usageType") as string | null;
  const batchSize = parseFloat(_formData.get("batchSize") as string) || 100;

  const { data: formula, error: formulaError } = await supabase
    .from("formulas")
    .insert({
      user_id: user.id,
      name: name || "Untitled Formula",
      product_category: productCategory || null,
      usage_type: usageType || null,
      target_batch_size_g: batchSize,
    })
    .select()
    .single();

  if (formulaError || !formula) {
    throw new Error(formulaError?.message ?? "Failed to create formula");
  }

  await supabase
    .from("formula_versions")
    .insert({
      formula_id: formula.id,
      version_number: 1,
      is_current: true,
      notes: "Initial version",
    });

  await logActivity(formula.id, "formula_created", `Created formula "${name || "Untitled Formula"}"`);

  redirect(`/formulas/${formula.id}`);
}

export async function updateFormulaAction(formulaId: string, formData: FormData) {
  await requireAuth();
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const productCategory = formData.get("productCategory") as string | null;
  const usageType = formData.get("usageType") as string | null;
  const batchSize = parseFloat(formData.get("batchSize") as string) || 100;

  const { error } = await supabase
    .from("formulas")
    .update({
      name,
      product_category: productCategory || null,
      usage_type: usageType || null,
      target_batch_size_g: batchSize,
      updated_at: new Date().toISOString(),
    })
    .eq("id", formulaId);

  if (error) return { error: error.message };

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true };
}

export async function addIngredientAction(
  versionId: string,
  ingredientId: string,
  percentage: number,
  phase: string
) {
  await requireAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from("formula_ingredients")
    .insert({
      formula_version_id: versionId,
      ingredient_id: ingredientId,
      percentage,
      phase,
      sort_order: 0,
    });

  if (error) return { error: error.message };

  revalidatePath("/formulas");
  return { success: true };
}

export async function updateIngredientAction(
  ingredientRowId: string,
  updates: { percentage?: number; phase?: string; sort_order?: number; notes?: string }
) {
  await requireAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from("formula_ingredients")
    .update(updates)
    .eq("id", ingredientRowId);

  if (error) return { error: error.message };

  revalidatePath("/formulas");
  return { success: true };
}

export async function removeIngredientAction(ingredientRowId: string) {
  await requireAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from("formula_ingredients")
    .delete()
    .eq("id", ingredientRowId);

  if (error) return { error: error.message };

  revalidatePath("/formulas");
  return { success: true };
}

export async function createNewVersionAction(formulaId: string, notes: string) {
  await requireAuth();
  const supabase = await createClient();

  // Get current version
  const { data: currentVersion } = await supabase
    .from("formula_versions")
    .select("*, formula_ingredients(*)")
    .eq("formula_id", formulaId)
    .eq("is_current", true)
    .single();

  if (!currentVersion) return { error: "No current version found" };

  // Mark old version as not current
  await supabase
    .from("formula_versions")
    .update({ is_current: false })
    .eq("id", currentVersion.id);

  // Create new version
  const { data: newVersion, error: versionError } = await supabase
    .from("formula_versions")
    .insert({
      formula_id: formulaId,
      version_number: currentVersion.version_number + 1,
      is_current: true,
      notes,
    })
    .select()
    .single();

  if (versionError || !newVersion) {
    return { error: versionError?.message ?? "Failed to create version" };
  }

  // Copy ingredients to new version
  const ingredients = currentVersion.formula_ingredients as Array<{
    ingredient_id: string;
    percentage: number;
    phase: string;
    role_override: string | null;
    sort_order: number;
    notes: string | null;
  }>;

  if (ingredients.length > 0) {
    const { error: copyError } = await supabase
      .from("formula_ingredients")
      .insert(
        ingredients.map((ing) => ({
          formula_version_id: newVersion.id,
          ingredient_id: ing.ingredient_id,
          percentage: ing.percentage,
          phase: ing.phase,
          role_override: ing.role_override,
          sort_order: ing.sort_order,
          notes: ing.notes,
        }))
      );

    if (copyError) return { error: copyError.message };
  }

  await logActivity(
    formulaId,
    "version_created",
    `Created v${newVersion.version_number}: ${notes}`,
    { version_number: newVersion.version_number, ingredient_count: ingredients.length }
  );

  revalidatePath(`/formulas/${formulaId}`);
  return { success: true, versionId: newVersion.id };
}

export async function archiveFormulaAction(formulaId: string) {
  await requireAuth();
  const supabase = await createClient();

  const { error } = await supabase
    .from("formulas")
    .update({ is_archived: true })
    .eq("id", formulaId);

  if (error) return { error: error.message };

  revalidatePath("/formulas");
  redirect("/formulas");
}

export async function duplicateFormulaAction(formulaId: string): Promise<void> {
  const user = await requireAuth();

  const guard = await checkCanCreateFormula(user.id);
  if (!guard.allowed) {
    redirect(`/pricing?upgradeReason=formula-limit&tier=${guard.usage.tier}`);
  }

  const supabase = await createClient();

  // Get original formula + current version + ingredients
  const { data: original } = await supabase
    .from("formulas")
    .select("*")
    .eq("id", formulaId)
    .single();

  if (!original) {
    throw new Error("Original formula not found");
  }

  const { data: currentVersion } = await supabase
    .from("formula_versions")
    .select("*, formula_ingredients(*)")
    .eq("formula_id", formulaId)
    .eq("is_current", true)
    .single();

  if (!currentVersion) {
    throw new Error("Current version not found");
  }

  // Create new formula
  const { data: newFormula, error: formulaError } = await supabase
    .from("formulas")
    .insert({
      user_id: user.id,
      name: `${original.name} (copy)`,
      description: original.description,
      product_category: original.product_category,
      usage_type: original.usage_type,
      target_batch_size_g: original.target_batch_size_g,
    })
    .select()
    .single();

  if (formulaError || !newFormula) {
    throw new Error(formulaError?.message ?? "Failed to duplicate formula");
  }

  // Create initial version
  const { data: newVersion, error: versionError } = await supabase
    .from("formula_versions")
    .insert({
      formula_id: newFormula.id,
      version_number: 1,
      is_current: true,
      notes: `Duplicated from "${original.name}" v${currentVersion.version_number}`,
    })
    .select()
    .single();

  if (versionError || !newVersion) {
    throw new Error(versionError?.message ?? "Failed to create version");
  }

  // Copy ingredients
  const ingredients = currentVersion.formula_ingredients as Array<{
    ingredient_id: string;
    percentage: number;
    phase: string;
    role_override: string | null;
    sort_order: number;
    notes: string | null;
  }>;

  if (ingredients.length > 0) {
    await supabase.from("formula_ingredients").insert(
      ingredients.map((ing) => ({
        formula_version_id: newVersion.id,
        ingredient_id: ing.ingredient_id,
        percentage: ing.percentage,
        phase: ing.phase,
        role_override: ing.role_override,
        sort_order: ing.sort_order,
        notes: ing.notes,
      }))
    );
  }

  await logActivity(
    newFormula.id,
    "formula_created",
    `Duplicated from "${original.name}"`
  );

  revalidatePath("/formulas");
  redirect(`/formulas/${newFormula.id}`);
}
