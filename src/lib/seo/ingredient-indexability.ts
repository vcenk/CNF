export interface IngredientIndexRecord {
  description?: string | null;
  cas_number?: string | null;
  hotlist_status?: string | null;
  hotlist_max_concentration?: number | null;
  hotlist_conditions?: string | null;
  typical_use_level_min?: number | null;
  typical_use_level_max?: number | null;
  is_fragrance_allergen?: boolean | null;
  ingredient_function_map?: unknown[] | null;
  ingredient_supplier_prices?: unknown[] | null;
}

/**
 * Keeps template-only ingredient records out of the search index until they
 * contain enough record-specific information to satisfy a standalone search.
 * This affects discoverability only; records remain available in the database
 * and can be improved without changing their URLs.
 */
export function isIngredientIndexable(ingredient: IngredientIndexRecord) {
  const descriptionLength = ingredient.description?.trim().length ?? 0;
  const hasIdentity = Boolean(ingredient.cas_number);
  const hasFunction = Boolean(ingredient.ingredient_function_map?.length);
  const hasUsageRange =
    ingredient.typical_use_level_min != null ||
    ingredient.typical_use_level_max != null;
  const hasSupplierEvidence = Boolean(
    ingredient.ingredient_supplier_prices?.length
  );
  const hasRegulatoryDetail =
    ingredient.hotlist_status === "restricted" ||
    ingredient.hotlist_status === "prohibited"
      ? Boolean(
          ingredient.hotlist_conditions ||
            ingredient.hotlist_max_concentration != null
        )
      : false;

  const supportingSignals = [
    hasIdentity,
    hasFunction,
    hasUsageRange,
    hasSupplierEvidence,
    hasRegulatoryDetail,
    Boolean(ingredient.is_fragrance_allergen),
  ].filter(Boolean).length;

  return (
    (descriptionLength >= 140 && supportingSignals >= 2) ||
    (descriptionLength >= 80 && hasRegulatoryDetail && supportingSignals >= 2)
  );
}
