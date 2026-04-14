"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createNewVersionAction } from "@/app/formulas/actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GitBranch, Plus } from "lucide-react";

interface Version {
  id: string;
  version_number: number;
  is_current: boolean;
  notes: string | null;
  created_at: string;
}

interface VersionHistoryProps {
  formulaId: string;
  versions: Version[];
  currentVersionId: string;
}

export function VersionHistory({
  formulaId,
  versions,
  currentVersionId,
}: VersionHistoryProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showNew, setShowNew] = useState(false);
  const [notes, setNotes] = useState("");

  function handleCreateVersion() {
    if (!notes.trim()) return;
    startTransition(async () => {
      await createNewVersionAction(formulaId, notes);
      setNotes("");
      setShowNew(false);
      router.refresh();
    });
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <GitBranch className="h-4 w-4" />
            Versions ({versions.length})
          </CardTitle>
          <button
            onClick={() => setShowNew(!showNew)}
            className="rounded p-1 text-muted-foreground hover:bg-muted"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {showNew && (
          <div className="space-y-2 rounded-md border border-brand/30 bg-brand-soft/10 p-2">
            <Input
              placeholder="Version notes (e.g., 'Reduced fragrance load')"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={handleCreateVersion}
                disabled={isPending || !notes.trim()}
                className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-brand-dark disabled:opacity-50"
              >
                {isPending ? "Creating..." : "Save as new version"}
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="rounded-md px-3 py-1 text-xs text-muted-foreground hover:bg-muted"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {versions.map((v) => (
          <div
            key={v.id}
            className={`rounded-md border p-2 text-xs ${
              v.id === currentVersionId
                ? "border-brand/30 bg-brand-soft/20"
                : "border-border"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">
                v{v.version_number}
                {v.id === currentVersionId && (
                  <span className="ml-1 text-brand">(current)</span>
                )}
              </span>
              <span className="text-muted-foreground">
                {new Date(v.created_at).toLocaleDateString("en-CA")}
              </span>
            </div>
            {v.notes && (
              <p className="mt-1 text-muted-foreground">{v.notes}</p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
