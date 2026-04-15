"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Loader2, AlertCircle, AlertTriangle, Info } from "lucide-react";

interface ReviewIngredient {
  inciName: string;
  percentage: number;
  hotlistStatus: string;
  hotlistMaxConcentration: number | null;
  isFragranceAllergen: boolean;
}

interface AiComplianceReviewProps {
  ingredients: ReviewIngredient[];
  category: string;
  usageType: string;
}

interface ReviewIssue {
  severity: "error" | "warning" | "info";
  message: string;
}

interface ReviewResult {
  summary: string;
  issues: ReviewIssue[];
  suggestions: string[];
}

export function AiComplianceReview({
  ingredients,
  category,
  usageType,
}: AiComplianceReviewProps) {
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState<ReviewResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleReview() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/ai/compliance-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, category, usageType }),
      });
      const json = await res.json();
      if (json.error) {
        setError(json.error);
      } else {
        setReview(json);
      }
    } catch {
      setError("Failed to get review");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <Sparkles className="h-4 w-4 text-brand" />
            AI Compliance Review
          </CardTitle>
          <button
            onClick={handleReview}
            disabled={loading || ingredients.length === 0}
            className="flex items-center gap-1.5 rounded-md bg-brand px-3 py-1 text-xs font-medium text-white hover:bg-brand-dark disabled:opacity-50"
          >
            {loading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Sparkles className="h-3 w-3" />
            )}
            {review ? "Re-run review" : "Run review"}
          </button>
        </div>
      </CardHeader>
      <CardContent>
        {!review && !error && !loading && (
          <p className="text-xs text-muted-foreground">
            Run an AI compliance review to get plain-language feedback on your
            formula, flag potential issues, and surface required warnings.
          </p>
        )}

        {error && (
          <p className="text-xs text-destructive">Error: {error}</p>
        )}

        {review && (
          <div className="space-y-3">
            <p className="rounded-md bg-brand-soft/30 p-3 text-sm">
              {review.summary}
            </p>

            {review.issues.length > 0 && (
              <div className="space-y-1.5">
                {review.issues.map((issue, i) => {
                  const Icon =
                    issue.severity === "error"
                      ? AlertCircle
                      : issue.severity === "warning"
                        ? AlertTriangle
                        : Info;
                  const colorClass =
                    issue.severity === "error"
                      ? "bg-danger-soft/50 text-danger"
                      : issue.severity === "warning"
                        ? "bg-warning-soft/50 text-warning"
                        : "bg-brand-soft/50 text-brand";
                  return (
                    <div
                      key={i}
                      className={`flex items-start gap-2 rounded-md p-2 text-xs ${colorClass}`}
                    >
                      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      <p>{issue.message}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {review.suggestions.length > 0 && (
              <div>
                <p className="mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Suggestions
                </p>
                <ul className="space-y-1 text-xs">
                  {review.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-brand">→</span>
                      <span className="text-muted-foreground">{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
