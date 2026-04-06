import { ProductDraft } from "@/domain/cnf";

export type ExportPackage = {
  format: ".hcxs";
  filename: string;
  bytes: Uint8Array;
};

export async function generateHcxsExport(draft: ProductDraft): Promise<ExportPackage> {
  void draft;
  throw new Error("`.hcxs` generation is not implemented yet.");
}
