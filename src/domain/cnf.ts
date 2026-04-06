export type ValidationSeverity = "info" | "warning" | "error";

export type ValidationIssue = {
  code: string;
  field: string;
  severity: ValidationSeverity;
  message: string;
};

export type IngredientEntry = {
  id: string;
  inciName: string;
  concentrationPercent?: number;
  role?: string;
  aiSuggested: boolean;
};

export type ProductDraft = {
  id: string;
  companyProfileId?: string;
  name: string;
  category?: string;
  usageType?: "rinse-off" | "leave-on";
  description: string;
  ingredients: IngredientEntry[];
  validationIssues: ValidationIssue[];
  exportReady: boolean;
};

export type ProductPillar = {
  stage: string;
  name: string;
  description: string;
  outcomes: string[];
};

