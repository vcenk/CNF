import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileOutput } from "lucide-react";

interface Submission {
  id: string;
  status: string;
  notes: string | null;
  created_at: string;
  submitted_at: string | null;
  formula_versions: { version_number: number } | null;
}

const statusColors: Record<string, string> = {
  draft: "border-muted text-muted-foreground",
  validated: "border-brand/30 text-brand",
  exported: "border-brand/30 text-brand",
  submitted: "border-warning/30 text-warning",
  accepted: "border-success/30 text-success",
  rejected: "border-destructive/30 text-destructive",
};

interface SubmissionHistoryProps {
  submissions: Submission[];
}

export function SubmissionHistory({ submissions }: SubmissionHistoryProps) {
  if (submissions.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <FileOutput className="h-4 w-4" />
            Submission History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            No CNF submissions yet. Complete the checklist above to generate your first export.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <FileOutput className="h-4 w-4" />
          Submission History ({submissions.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {submissions.map((sub) => (
            <div key={sub.id} className="rounded-md border border-border p-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs capitalize ${statusColors[sub.status] ?? ""}`}
                  >
                    {sub.status}
                  </Badge>
                  {sub.formula_versions && (
                    <span className="text-xs text-muted-foreground">
                      v{sub.formula_versions.version_number}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(sub.created_at).toLocaleDateString("en-CA")}
                </span>
              </div>
              {sub.notes && (
                <p className="mt-1 text-xs text-muted-foreground">{sub.notes}</p>
              )}
              {sub.submitted_at && (
                <p className="mt-1 text-xs text-muted-foreground">
                  Submitted: {new Date(sub.submitted_at).toLocaleDateString("en-CA")}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
