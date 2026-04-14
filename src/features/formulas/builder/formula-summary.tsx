import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ValidationIssue } from "@/domain/validation";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";

interface FormulaSummaryProps {
  ingredients: { percentage: number }[];
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
  infos: ValidationIssue[];
  batchSizeG: number;
}

export function FormulaSummary({
  ingredients,
  errors,
  warnings,
  infos,
  batchSizeG,
}: FormulaSummaryProps) {
  const total = ingredients.reduce((sum, ing) => sum + ing.percentage, 0);
  const isValid = errors.length === 0 && total >= 99.5 && total <= 100.5;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          {isValid ? (
            <CheckCircle className="h-4 w-4 text-success" />
          ) : (
            <AlertCircle className="h-4 w-4 text-destructive" />
          )}
          Formula Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-md bg-muted/50 p-2 text-center">
            <p className="text-lg font-bold">{ingredients.length}</p>
            <p className="text-xs text-muted-foreground">Ingredients</p>
          </div>
          <div className="rounded-md bg-muted/50 p-2 text-center">
            <p className={`text-lg font-bold ${total >= 99.5 && total <= 100.5 ? "text-success" : "text-destructive"}`}>
              {total.toFixed(1)}%
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>

        {/* Batch info */}
        <div className="rounded-md bg-muted/50 p-2 text-center">
          <p className="text-xs text-muted-foreground">
            Batch: {batchSizeG}g
          </p>
        </div>

        {/* Issues */}
        {errors.length > 0 && (
          <div className="space-y-1">
            {errors.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md bg-danger-soft/50 p-2">
                <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-danger" />
                <p className="text-xs text-danger">{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {warnings.length > 0 && (
          <div className="space-y-1">
            {warnings.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md bg-warning-soft/50 p-2">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-warning" />
                <p className="text-xs text-warning">{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {infos.length > 0 && (
          <div className="space-y-1">
            {infos.map((issue, i) => (
              <div key={i} className="flex items-start gap-2 rounded-md bg-brand-soft/50 p-2">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-brand" />
                <p className="text-xs text-brand">{issue.message}</p>
              </div>
            ))}
          </div>
        )}

        {isValid && errors.length === 0 && warnings.length === 0 && (
          <div className="flex items-center gap-2 rounded-md bg-success-soft/50 p-2">
            <CheckCircle className="h-3.5 w-3.5 text-success" />
            <p className="text-xs text-success">Formula is valid</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
