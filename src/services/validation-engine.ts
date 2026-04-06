import { ProductDraft, ValidationIssue } from "@/domain/cnf";

export function validateDraft(draft: ProductDraft): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  if (!draft.companyName.trim()) {
    issues.push({
      code: "company_name_required",
      field: "companyName",
      severity: "error",
      message: "Company name is required to prepare a CNF draft."
    });
  }

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

  if (!draft.category) {
    issues.push({
      code: "category_missing",
      field: "category",
      severity: "warning",
      message: "Choose a product category so the draft can map cleanly to CNF fields."
    });
  }

  if (!draft.usageType) {
    issues.push({
      code: "usage_type_missing",
      field: "usageType",
      severity: "warning",
      message: "Select rinse-off or leave-on so the submission flow has the right context."
    });
  }

  return issues;
}
