"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Save,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  saveCnfWizardAction,
  recordCnfSubmissionAction,
  type CnfWizardData,
} from "@/app/formulas/[id]/cnf/actions";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AiAssistButton } from "./ai-assist-button";
import { AiComplianceReview } from "./ai-compliance-review";
import type { ValidationIssue } from "@/domain/validation";

interface Ingredient {
  id: string;
  ingredientId: string;
  inciName: string;
  commonName: string | null;
  casNumber: string | null;
  percentage: number;
  phase: string;
  hotlistStatus: string;
  hotlistMaxConcentration: number | null;
  hotlistConditions: string | null;
  usageTypeRestriction: string | null;
  isFragranceAllergen: boolean;
}

interface CnfWizardProps {
  formulaId: string;
  formulaVersionId: string;
  initialData: CnfWizardData;
  ingredients: Ingredient[];
  issues: ValidationIssue[];
}

const categories = [
  { value: "", label: "Select category..." },
  { value: "skin_care", label: "Skin Care" },
  { value: "hair_care", label: "Hair Care" },
  { value: "body_care", label: "Body Care" },
  { value: "fragrance", label: "Fragrance" },
  { value: "makeup", label: "Makeup" },
  { value: "oral_care", label: "Oral Care" },
];

export function CnfWizard({
  formulaId,
  formulaVersionId,
  initialData,
  ingredients,
  issues,
}: CnfWizardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<CnfWizardData>(initialData);
  const [saved, setSaved] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const errors = issues.filter((issue) => issue.severity === "error");
  const warnings = issues.filter((issue) => issue.severity === "warning");
  const isReady = errors.length === 0 && data.productNameEn && data.companyName;

  function update<K extends keyof CnfWizardData>(key: K, value: CnfWizardData[K]) {
    setData((previous) => ({ ...previous, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      const result = await saveCnfWizardAction(formulaId, data);
      if (result.success) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
        toast.success("Draft saved");
        router.refresh();
      } else {
        toast.error(result.error ?? "Failed to save draft");
      }
    });
  }

  async function handleDownloadHcxs() {
    if (!isReady) return;
    setDownloading(true);

    try {
      await saveCnfWizardAction(formulaId, data);

      const { generateHcxsFile } = await import("@/services/hcxs-export");
      const file = generateHcxsFile({
        productNameEn: data.productNameEn,
        productNameFr: data.productNameFr,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        productCategory: data.productCategory,
        usageType: data.usageType,
        ingredients: ingredients.map((ingredient) => ({
          inciName: ingredient.inciName,
          percentage: ingredient.percentage,
          casNumber: ingredient.casNumber,
          isFragranceAllergen: ingredient.isFragranceAllergen,
        })),
      });

      const blob = new Blob([file.content], { type: file.mimeType });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = file.filename;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);

      await recordCnfSubmissionAction(formulaId, formulaVersionId);
      toast.success("Structured CNF file downloaded", {
        description:
          "Review the file carefully before relying on it for manual portal entry or submission.",
      });
      router.refresh();
    } catch (error) {
      toast.error("Failed to generate structured CNF file", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setDownloading(false);
    }
  }

  async function handleDownloadPdf() {
    if (!isReady) return;
    setDownloading(true);

    try {
      const { pdf } = await import("@react-pdf/renderer");
      const { CnfSummaryPdf } = await import("./cnf-summary-pdf");

      const blob = await pdf(
        <CnfSummaryPdf
          data={data}
          ingredients={ingredients.map((ingredient) => ({
            inciName: ingredient.inciName,
            commonName: ingredient.commonName,
            casNumber: ingredient.casNumber,
            percentage: ingredient.percentage,
            phase: ingredient.phase,
            isFragranceAllergen: ingredient.isFragranceAllergen,
          }))}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${data.productNameEn || "cnf"}-summary.pdf`.replace(
        /[^a-zA-Z0-9-_.]/g,
        "-"
      );
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      URL.revokeObjectURL(url);
      toast.success("PDF summary downloaded");
    } catch (error) {
      toast.error("Failed to generate PDF", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-6 lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">1. Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Formula name</Label>
              <Input
                value={data.formulaName}
                onChange={(event) => update("formulaName", event.target.value)}
                placeholder="Internal name for this formula"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Product name (English)</Label>
                </div>
                <Input
                  value={data.productNameEn}
                  onChange={(event) => update("productNameEn", event.target.value)}
                  placeholder="Body Lotion"
                />
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Product name (French)</Label>
                  <AiAssistButton
                    label="Translate"
                    disabled={!data.productNameEn}
                    onClick={async () => {
                      const response = await fetch("/api/ai/translate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          text: data.productNameEn,
                          from: "en",
                          to: "fr",
                        }),
                      });
                      const payload = await response.json();
                      if (payload.translated) {
                        update("productNameFr", payload.translated);
                        toast.success("Translated", {
                          description: payload.translated,
                        });
                      } else {
                        toast.error("Translation failed", {
                          description: payload.error,
                        });
                      }
                    }}
                  />
                </div>
                <Input
                  value={data.productNameFr}
                  onChange={(event) => update("productNameFr", event.target.value)}
                  placeholder="Lotion pour le corps"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Product category</Label>
                  <AiAssistButton
                    label="AI suggest"
                    disabled={ingredients.length === 0}
                    onClick={async () => {
                      const response = await fetch("/api/ai/suggest-category", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ingredients: ingredients.map((ingredient) => ({
                            inciName: ingredient.inciName,
                            percentage: ingredient.percentage,
                          })),
                        }),
                      });
                      const payload = await response.json();
                      if (payload.category) {
                        update("productCategory", payload.category);
                        if (payload.usageType) {
                          update("usageType", payload.usageType);
                        }
                        toast.success("AI suggestion applied", {
                          description: payload.reasoning,
                        });
                      } else {
                        toast.error("AI suggestion failed", {
                          description: payload.error,
                        });
                      }
                    }}
                  />
                </div>
                <select
                  value={data.productCategory}
                  onChange={(event) => update("productCategory", event.target.value)}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Usage type</Label>
                <select
                  value={data.usageType}
                  onChange={(event) => update("usageType", event.target.value)}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                >
                  <option value="">Select...</option>
                  <option value="rinse-off">Rinse-off</option>
                  <option value="leave-on">Leave-on</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Net weight (g)</Label>
                <Input
                  type="number"
                  value={data.netWeightG ?? ""}
                  onChange={(event) =>
                    update(
                      "netWeightG",
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                  placeholder="100"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Net volume (mL)</Label>
                <Input
                  type="number"
                  value={data.netVolumeMl ?? ""}
                  onChange={(event) =>
                    update(
                      "netVolumeMl",
                      event.target.value ? Number(event.target.value) : null
                    )
                  }
                  placeholder="100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">2. Responsible Person</CardTitle>
            <p className="text-xs text-muted-foreground">
              Required by Health Canada. Must be a Canadian company or importer.
              Saved to your profile for future CNF drafts.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Company name</Label>
              <Input
                value={data.companyName}
                onChange={(event) => update("companyName", event.target.value)}
                placeholder="Your Cosmetics Inc."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Canadian address</Label>
              <Input
                value={data.companyAddress}
                onChange={(event) => update("companyAddress", event.target.value)}
                placeholder="123 Main St, Toronto, ON M5V 1A1, Canada"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                3. Ingredient List ({ingredients.length})
              </CardTitle>
              <a
                href={`/formulas/${formulaId}`}
                className="text-xs text-brand hover:underline"
              >
                Edit in Builder {"->"}
              </a>
            </div>
          </CardHeader>
          <CardContent>
            {ingredients.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No ingredients yet. Add them in the formula builder.
              </p>
            ) : (
              <div className="space-y-1.5 text-xs">
                {ingredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="flex items-center justify-between rounded px-2 py-1 hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-2">
                      <span>{ingredient.inciName}</span>
                      {ingredient.hotlistStatus === "restricted" && (
                        <Badge
                          variant="outline"
                          className="border-warning/30 text-[10px] text-warning"
                        >
                          Restricted
                        </Badge>
                      )}
                      {ingredient.hotlistStatus === "prohibited" && (
                        <Badge
                          variant="outline"
                          className="border-destructive/30 text-[10px] text-destructive"
                        >
                          Prohibited
                        </Badge>
                      )}
                      {ingredient.isFragranceAllergen && (
                        <Badge
                          variant="outline"
                          className="border-brand/30 text-[10px] text-brand"
                        >
                          Allergen
                        </Badge>
                      )}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {ingredient.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <AiComplianceReview
          ingredients={ingredients}
          category={data.productCategory}
          usageType={data.usageType}
        />
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              {isReady ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
              Preparation Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={
                  errors.length > 0
                    ? "border-destructive/30 text-destructive"
                    : "border-success/30 text-success"
                }
              >
                {errors.length} errors
              </Badge>
              <Badge
                variant="outline"
                className={
                  warnings.length > 0 ? "border-warning/30 text-warning" : ""
                }
              >
                {warnings.length} warnings
              </Badge>
            </div>

            {errors.length > 0 && (
              <div className="space-y-1">
                {errors.slice(0, 5).map((error, index) => (
                  <p key={index} className="text-xs text-destructive">
                    - {error.message}
                  </p>
                ))}
              </div>
            )}

            <button
              onClick={handleSave}
              disabled={isPending}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {isPending ? "Saving..." : saved ? "Saved!" : "Save draft"}
            </button>

            <button
              onClick={handleDownloadHcxs}
              disabled={!isReady || downloading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              {downloading ? "Generating..." : "Download structured CNF file"}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={!isReady || downloading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              Download PDF summary
            </button>

            <p className="text-xs leading-5 text-muted-foreground">
              Review all generated outputs against official Health Canada
              guidance before relying on them for sale or submission.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              AI assist powered by OpenAI. Always verify suggestions against
              official Health Canada guidance.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
