import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FlaskConical,
  Plus,
  Minus,
  GitBranch,
  Tag,
  FileOutput,
  Send,
  History,
  Edit,
} from "lucide-react";

interface ActivityEntry {
  id: string;
  action: string;
  description: string;
  created_at: string;
}

const actionIcons: Record<string, typeof FlaskConical> = {
  formula_created: FlaskConical,
  formula_updated: Edit,
  ingredient_added: Plus,
  ingredient_removed: Minus,
  ingredient_updated: Edit,
  version_created: GitBranch,
  label_saved: Tag,
  cnf_validated: FileOutput,
  cnf_exported: FileOutput,
  cnf_submitted: Send,
  cnf_status_changed: History,
};

interface ActivityTimelineProps {
  activities: ActivityEntry[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (activities.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">No activity yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <History className="h-4 w-4" />
          Activity ({activities.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {activities.map((entry) => {
            const Icon = actionIcons[entry.action] ?? History;
            return (
              <div key={entry.id} className="flex gap-2 text-xs">
                <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="text-foreground">{entry.description}</p>
                  <p className="text-muted-foreground">
                    {new Date(entry.created_at).toLocaleString("en-CA", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
