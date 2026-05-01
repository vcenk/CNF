"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ALL_UNITS, UNIT_LABELS, UNIT_VERBOSE, type FormulaUnit } from "@/lib/units";
import { updateFormulaAction } from "@/app/formulas/actions";

interface UnitToggleProps {
  formulaId: string;
  currentUnit: FormulaUnit;
  // Other formula fields that updateFormulaAction expects so we don't
  // wipe them out when only the unit changes.
  formula: {
    name: string;
    product_category: string | null;
    usage_type: string | null;
    target_batch_size_g: number;
  };
}

export function UnitToggle({ formulaId, currentUnit, formula }: UnitToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleSelect(unit: FormulaUnit) {
    if (unit === currentUnit || isPending) return;

    const fd = new FormData();
    fd.set("name", formula.name);
    fd.set("productCategory", formula.product_category ?? "");
    fd.set("usageType", formula.usage_type ?? "");
    fd.set("batchSize", String(formula.target_batch_size_g));
    fd.set("preferredUnit", unit);

    startTransition(async () => {
      const result = await updateFormulaAction(formulaId, fd);
      if (result.success) {
        if (result.warning) {
          toast.warning("Switched, with caveat", { description: result.warning });
        } else {
          toast.success(`Now working in ${UNIT_VERBOSE[unit].toLowerCase()}`);
        }
        router.refresh();
      } else if (result.error) {
        toast.error("Could not switch units", { description: result.error });
      }
    });
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground">Working in:</span>
      <div
        role="radiogroup"
        aria-label="Formula display unit"
        className="inline-flex rounded-lg border border-border bg-card p-0.5"
      >
        {ALL_UNITS.map((u) => {
          const active = u === currentUnit;
          return (
            <button
              key={u}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={isPending}
              onClick={() => handleSelect(u)}
              title={UNIT_VERBOSE[u]}
              className={
                "rounded-md px-2.5 py-1 text-xs font-semibold transition-colors disabled:opacity-50 " +
                (active
                  ? "bg-brand text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {UNIT_LABELS[u]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
