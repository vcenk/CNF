export type ValidationSeverity = "info" | "warning" | "error";

export interface ValidationIssue {
  code: string;
  field: string;
  severity: ValidationSeverity;
  message: string;
  ingredientId?: string;
}
