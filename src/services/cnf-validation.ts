import type { ValidationIssue } from "@/domain/validation";
import { validateFormula } from "./formula-validation";

interface CnfInput {
  formulaName: string;
  usageType: string | null;
  productCategory: string | null;
  companyName: string | null;
  companyAddress: string | null;
  productNameEn: string | null;
  hasLabelTemplate: boolean;
}

interface IngredientInput {
  id: string;
  ingredientId: string;
  inciName: string;
  percentage: number;
  hotlistStatus: string;
  hotlistMaxConcentration: number | null;
  hotlistConditions: string | null;
  usageTypeRestriction: string | null;
  isFragranceAllergen: boolean;
}

export function validateForCnfSubmission(
  input: CnfInput,
  ingredients: IngredientInput[]
): ValidationIssue[] {
  // Start with all formula-level validations
  const issues = validateFormula(
    { name: input.formulaName, usageType: input.usageType },
    ingredients
  );

  // CNF-specific validations
  if (!input.companyName || input.companyName.trim() === "") {
    issues.push({
      code: "CNF_COMPANY_NAME",
      field: "company",
      severity: "error",
      message: "Company name is required for CNF submission. Set it in your profile or label template.",
    });
  }

  if (!input.companyAddress || input.companyAddress.trim() === "") {
    issues.push({
      code: "CNF_COMPANY_ADDRESS",
      field: "company",
      severity: "error",
      message: "A Canadian address is required for CNF submission.",
    });
  }

  if (!input.productNameEn || input.productNameEn.trim() === "") {
    issues.push({
      code: "CNF_PRODUCT_NAME",
      field: "productName",
      severity: "error",
      message: "Product display name is required. Set it in the Label tab.",
    });
  }

  if (!input.productCategory) {
    issues.push({
      code: "CNF_CATEGORY",
      field: "category",
      severity: "error",
      message: "Product category must be selected for CNF submission.",
    });
  }

  if (!input.usageType) {
    issues.push({
      code: "CNF_USAGE_TYPE",
      field: "usageType",
      severity: "error",
      message: "Usage type (rinse-off or leave-on) must be selected for CNF submission.",
    });
  }

  if (!input.hasLabelTemplate) {
    issues.push({
      code: "CNF_NO_LABEL",
      field: "label",
      severity: "warning",
      message: "Create a label template in the Label tab before exporting. It provides product name and company details.",
    });
  }

  // Hard block on any prohibited ingredients
  const prohibited = ingredients.filter((i) => i.hotlistStatus === "prohibited");
  if (prohibited.length > 0) {
    issues.push({
      code: "CNF_PROHIBITED_BLOCK",
      field: "ingredients",
      severity: "error",
      message: `Cannot submit CNF: ${prohibited.length} prohibited ingredient(s) must be removed first.`,
    });
  }

  return issues;
}
