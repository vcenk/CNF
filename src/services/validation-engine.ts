import { ProductDraft, ValidationIssue } from "@/domain/cnf";

export function validateDraft(draft: ProductDraft): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!draft.name.trim()) {
    issues.push({
      code: "product_name_required",
      field: "name",
      severity: "error",
      message: "Product name is required."
    });
  }

  if (!draft.description.trim()) {
    issues.push({
      code: "description_required",
      field: "description",
      severity: "warning",
      message: "A plain-language product description helps AI-assisted intake."
    });
  }

  if (draft.ingredients.length === 0) {
    issues.push({
      code: "ingredients_missing",
      field: "ingredients",
      severity: "warning",
      message: "At least one ingredient should be captured before export readiness."
    });
  }

  return issues;
}

