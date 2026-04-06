import { ProductDraft } from "@/domain/cnf";

export type ExportPackage = {
  format: ".hcxs";
  filename: string;
  bytes: Uint8Array;
};

export async function generateHcxsExport(_draft: ProductDraft): Promise<ExportPackage> {
  throw new Error("`.hcxs` generation is not implemented yet.");
}

