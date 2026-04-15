"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  saveCnfWizardAction,
  recordCnfSubmissionAction,
  type CnfWizardData,
} from "@/app/formulas/[id]/cnf/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AiAssistButton } from "./ai-assist-button";
import { AiComplianceReview } from "./ai-compliance-review";
import type { ValidationIssue } from "@/domain/validation";
import {
  Save,
  Download,
  FileText,
  CheckCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

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

  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const isReady = errors.length === 0 && data.productNameEn && data.companyName;

  function update<K extends keyof CnfWizardData>(key: K, value: CnfWizardData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
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
      // Save first to persist
      await saveCnfWizardAction(formulaId, data);

      const { generateHcxsFile } = await import("@/services/hcxs-export");
      const file = generateHcxsFile({
        productNameEn: data.productNameEn,
        productNameFr: data.productNameFr,
        companyName: data.companyName,
        companyAddress: data.companyAddress,
        productCategory: data.productCategory,
        usageType: data.usageType,
        ingredients: ingredients.map((i) => ({
          inciName: i.inciName,
          percentage: i.percentage,
          casNumber: i.casNumber,
          isFragranceAllergen: i.isFragranceAllergen,
        })),
      });

      const blob = new Blob([file.content], { type: file.mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      await recordCnfSubmissionAction(formulaId, formulaVersionId);
      toast.success(".hcxs file downloaded", {
        description: `Ready for Health Canada portal upload as ${file.filename}`,
      });
      router.refresh();
    } catch (err) {
      toast.error("Failed to generate .hcxs", {
        description: err instanceof Error ? err.message : "Unknown error",
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
          ingredients={ingredients.map((i) => ({
            inciName: i.inciName,
            commonName: i.commonName,
            casNumber: i.casNumber,
            percentage: i.percentage,
            phase: i.phase,
            isFragranceAllergen: i.isFragranceAllergen,
          }))}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${data.productNameEn || "cnf"}-summary.pdf`.replace(
        /[^a-zA-Z0-9-_.]/g,
        "-"
      );
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      toast.success("PDF summary downloaded");
    } catch (err) {
      toast.error("Failed to generate PDF", {
        description: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Left: form */}
      <div className="space-y-6 lg:col-span-2">
        {/* Product details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">1. Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Formula name</Label>
              <Input
                value={data.formulaName}
                onChange={(e) => update("formulaName", e.target.value)}
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
                  onChange={(e) => update("productNameEn", e.target.value)}
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
                      const res = await fetch("/api/ai/translate", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          text: data.productNameEn,
                          from: "en",
                          to: "fr",
                        }),
                      });
                      const json = await res.json();
                      if (json.translated) {
                        update("productNameFr", json.translated);
                        toast.success("Translated", { description: json.translated });
                      } else {
                        toast.error("Translation failed", { description: json.error });
                      }
                    }}
                  />
                </div>
                <Input
                  value={data.productNameFr}
                  onChange={(e) => update("productNameFr", e.target.value)}
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
                      const res = await fetch("/api/ai/suggest-category", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          ingredients: ingredients.map((i) => ({
                            inciName: i.inciName,
                            percentage: i.percentage,
                          })),
                        }),
                      });
                      const json = await res.json();
                      if (json.category) {
                        update("productCategory", json.category);
                        if (json.usageType) update("usageType", json.usageType);
                        toast.success("AI suggestion applied", {
                          description: json.reasoning,
                        });
                      } else {
                        toast.error("AI suggestion failed", { description: json.error });
                      }
                    }}
                  />
                </div>
                <select
                  value={data.productCategory}
                  onChange={(e) => update("productCategory", e.target.value)}
                  className="w-full rounded-md border border-border bg-card px-3 py-2 text-sm"
                >
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Usage type</Label>
                <select
                  value={data.usageType}
                  onChange={(e) => update("usageType", e.target.value)}
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
                  onChange={(e) =>
                    update("netWeightG", e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder="100"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Net volume (mL)</Label>
                <Input
                  type="number"
                  value={data.netVolumeMl ?? ""}
                  onChange={(e) =>
                    update("netVolumeMl", e.target.value ? Number(e.target.value) : null)
                  }
                  placeholder="100"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Responsible person */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">2. Responsible Person</CardTitle>
            <p className="text-xs text-muted-foreground">
              Required by Health Canada. Must be a Canadian company or importer.
              Saved to your profile for future CNFs.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <Label className="text-xs">Company name</Label>
              <Input
                value={data.companyName}
                onChange={(e) => update("companyName", e.target.value)}
                placeholder="Your Cosmetics Inc."
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Canadian address</Label>
              <Input
                value={data.companyAddress}
                onChange={(e) => update("companyAddress", e.target.value)}
                placeholder="123 Main St, Toronto, ON M5V 1A1, Canada"
              />
            </div>
          </CardContent>
        </Card>

        {/* Ingredient list (read-only summary) */}
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
                Edit in Builder →
              </a>
            </div>
          </CardHeader>
          <CardContent>
            {ingredients.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                No ingredients yet. Add them in the formula Builder.
              </p>
            ) : (
              <div className="space-y-1.5 text-xs">
                {ingredients.map((ing) => (
                  <div
                    key={ing.id}
                    className="flex items-center justify-between rounded px-2 py-1 hover:bg-muted/50"
                  >
                    <span className="flex items-center gap-2">
                      <span>{ing.inciName}</span>
                      {ing.hotlistStatus === "restricted" && (
                        <Badge variant="outline" className="border-warning/30 text-warning text-[10px]">
                          Restricted
                        </Badge>
                      )}
                      {ing.hotlistStatus === "prohibited" && (
                        <Badge variant="outline" className="border-destructive/30 text-destructive text-[10px]">
                          Prohibited
                        </Badge>
                      )}
                      {ing.isFragranceAllergen && (
                        <Badge variant="outline" className="border-brand/30 text-brand text-[10px]">
                          Allergen
                        </Badge>
                      )}
                    </span>
                    <span className="font-mono text-muted-foreground">
                      {ing.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Compliance Review */}
        <AiComplianceReview
          ingredients={ingredients}
          category={data.productCategory}
          usageType={data.usageType}
        />
      </div>

      {/* Right: Status + actions */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              {isReady ? (
                <CheckCircle className="h-4 w-4 text-success" />
              ) : (
                <AlertCircle className="h-4 w-4 text-destructive" />
              )}
              Submission Status
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
                {errors.slice(0, 5).map((e, i) => (
                  <p key={i} className="text-xs text-destructive">
                    • {e.message}
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
              {downloading ? "Generating..." : "Download .hcxs"}
            </button>

            <button
              onClick={handleDownloadPdf}
              disabled={!isReady || downloading}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-2.5 text-sm font-medium hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileText className="h-4 w-4" />
              Download PDF summary
            </button>
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
