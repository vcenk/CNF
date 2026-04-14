"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { ValidationIssue } from "@/domain/validation";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  FileOutput,
  ClipboardCheck,
} from "lucide-react";

interface ExportTabProps {
  formulaId: string;
  issues: ValidationIssue[];
}

const checklistItems = [
  { code: "FORMULA_NAME_REQUIRED", label: "Formula has a name" },
  { code: "NO_INGREDIENTS", label: "At least one ingredient added" },
  { code: "TOTAL_UNDER_100", label: "Total percentage is ~100%" },
  { code: "TOTAL_OVER_100", label: "Total percentage is ~100%" },
  { code: "HOTLIST_PROHIBITED", label: "No prohibited ingredients" },
  { code: "HOTLIST_OVER_MAX", label: "All ingredients within concentration limits" },
  { code: "USAGE_TYPE_MISMATCH", label: "No usage type conflicts" },
  { code: "CNF_COMPANY_NAME", label: "Company name set" },
  { code: "CNF_COMPANY_ADDRESS", label: "Canadian address provided" },
  { code: "CNF_PRODUCT_NAME", label: "Product display name set (Label tab)" },
  { code: "CNF_CATEGORY", label: "Product category selected" },
  { code: "CNF_USAGE_TYPE", label: "Usage type selected (rinse-off / leave-on)" },
  { code: "CNF_NO_LABEL", label: "Label template created" },
];

export function ExportTab({ issues }: ExportTabProps) {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");
  const infos = issues.filter((i) => i.severity === "info");

  const issueCodes = new Set(issues.map((i) => i.code));
  const isReady = errors.length === 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        {/* Checklist */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-sm">
              <ClipboardCheck className="h-4 w-4 text-brand" />
              CNF Submission Checklist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {checklistItems.map((item) => {
                const hasProblem = issueCodes.has(item.code);
                return (
                  <li key={item.code} className="flex items-center gap-2 text-sm">
                    {hasProblem ? (
                      <XCircle className="h-4 w-4 shrink-0 text-destructive" />
                    ) : (
                      <CheckCircle className="h-4 w-4 shrink-0 text-success" />
                    )}
                    <span className={hasProblem ? "text-foreground" : "text-muted-foreground"}>
                      {item.label}
                    </span>
                  </li>
                );
              })}
            </ul>
          </CardContent>
        </Card>

        {/* Validation issues detail */}
        {issues.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Validation Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {errors.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-danger-soft/50 p-3">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-danger" />
                  <p className="text-sm">{issue.message}</p>
                </div>
              ))}
              {warnings.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-warning-soft/50 p-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning" />
                  <p className="text-sm">{issue.message}</p>
                </div>
              ))}
              {infos.map((issue, i) => (
                <div key={i} className="flex items-start gap-2 rounded-md bg-brand-soft/50 p-3">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  <p className="text-sm">{issue.message}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <FileOutput className="h-4 w-4 text-brand" />
              Export Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="text-center">
              {isReady ? (
                <>
                  <CheckCircle className="mx-auto h-10 w-10 text-success" />
                  <p className="mt-2 font-semibold text-success">Ready to export</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    All validation checks passed
                  </p>
                </>
              ) : (
                <>
                  <XCircle className="mx-auto h-10 w-10 text-destructive" />
                  <p className="mt-2 font-semibold text-destructive">Not ready</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {errors.length} error{errors.length !== 1 ? "s" : ""} must be resolved
                  </p>
                </>
              )}
            </div>

            <div className="flex justify-center gap-2">
              <Badge variant="outline" className={errors.length > 0 ? "border-destructive/30 text-destructive" : "border-success/30 text-success"}>
                {errors.length} errors
              </Badge>
              <Badge variant="outline" className={warnings.length > 0 ? "border-warning/30 text-warning" : ""}>
                {warnings.length} warnings
              </Badge>
              <Badge variant="outline">
                {infos.length} info
              </Badge>
            </div>

            <button
              disabled={!isReady}
              className="flex w-full items-center justify-center gap-2 rounded-md bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileOutput className="h-4 w-4" />
              Generate .hcxs file
            </button>
            {!isReady && (
              <p className="text-center text-xs text-muted-foreground">
                Resolve all errors to enable export
              </p>
            )}
          </CardContent>
        </Card>

        {/* Status tracker */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Filing Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {["Draft", "Validated", "Exported", "Submitted", "Accepted"].map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-sm">
                  <div className={`h-2 w-2 rounded-full ${i === 0 ? "bg-brand" : "bg-muted"}`} />
                  <span className={i === 0 ? "font-medium" : "text-muted-foreground"}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
