import type { ValidationIssue } from "./validation";

export type SubmissionStatus =
  | "draft"
  | "validated"
  | "exported"
  | "submitted"
  | "accepted"
  | "rejected";

export interface CnfSubmission {
  id: string;
  formulaId: string;
  formulaVersionId: string;
  status: SubmissionStatus;
  validationIssues: ValidationIssue[];
  hcxsFileUrl: string | null;
  submittedAt: string | null;
  notes: string | null;
  createdAt: string;
}

export interface ExportPackage {
  format: "hcxs";
  filename: string;
  bytes: Uint8Array;
}
