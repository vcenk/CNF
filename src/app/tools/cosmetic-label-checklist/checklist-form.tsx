"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  buildLabelChecklist,
  CATEGORY_LABEL,
  PRODUCT_TYPE_LABELS,
  type ChecklistInput,
  type ProductTypeKey,
} from "@/lib/label-checklist";

const DEFAULT_INPUT: ChecklistInput = {
  productType: "leave_on_skincare",
  hasFragrance: false,
  containsEssentialOils: false,
  containsColourants: false,
  smallContainer: false,
  shipsToQuebec: true,
};

export function ChecklistForm() {
  const [input, setInput] = useState<ChecklistInput>(DEFAULT_INPUT);
  const [generated, setGenerated] = useState(false);
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const items = useMemo(() => (generated ? buildLabelChecklist(input) : []), [generated, input]);

  const grouped = useMemo(() => {
    const map: Record<string, typeof items> = {};
    for (const item of items) {
      if (!map[item.category]) map[item.category] = [];
      map[item.category].push(item);
    }
    return map;
  }, [items]);

  const completedCount = items.filter((i) => checked[i.id]).length;

  const toggle = (key: keyof ChecklistInput) =>
    setInput((prev) => ({ ...prev, [key]: !prev[key as keyof ChecklistInput] }));

  return (
    <div className="space-y-10">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setGenerated(true);
          setChecked({});
        }}
        className="space-y-6 rounded-xl border border-border bg-card p-6"
      >
        <div className="space-y-2">
          <Label htmlFor="productType">Product type</Label>
          <select
            id="productType"
            value={input.productType}
            onChange={(e) => setInput((p) => ({ ...p, productType: e.target.value as ProductTypeKey }))}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm shadow-xs outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            {Object.entries(PRODUCT_TYPE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold">Product specifics</legend>
          <Toggle checked={input.hasFragrance} onChange={() => toggle("hasFragrance")} label="Contains added fragrance / parfum" />
          <Toggle checked={input.containsEssentialOils} onChange={() => toggle("containsEssentialOils")} label="Contains essential oils" />
          <Toggle checked={input.containsColourants} onChange={() => toggle("containsColourants")} label="Contains colour additives (CI numbers, mica, iron oxides)" />
          <Toggle checked={input.smallContainer} onChange={() => toggle("smallContainer")} label="Small container under ~30 mL or 30 g" />
          <Toggle checked={input.shipsToQuebec} onChange={() => toggle("shipsToQuebec")} label="Ships to or sold in Quebec" />
        </fieldset>

        <div className="flex flex-wrap items-center gap-3">
          <Button type="submit">Generate checklist</Button>
        </div>
      </form>

      {generated && items.length > 0 && (
        <section className="space-y-6 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <header className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">
                Label checklist
              </p>
              <h2 className="mt-1 font-display text-2xl font-bold">
                {PRODUCT_TYPE_LABELS[input.productType]}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {completedCount} of {items.length} items checked
              </p>
            </div>
          </header>

          {Object.entries(grouped).map(([category, list]) => (
            <div key={category} className="space-y-3">
              <h3 className="font-display text-lg font-semibold">
                {CATEGORY_LABEL[category as keyof typeof CATEGORY_LABEL]}
              </h3>
              <ul className="space-y-2">
                {list.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3"
                  >
                    <input
                      type="checkbox"
                      id={`item-${item.id}`}
                      checked={!!checked[item.id]}
                      onChange={(e) =>
                        setChecked((prev) => ({ ...prev, [item.id]: e.target.checked }))
                      }
                      className="mt-1 h-4 w-4 cursor-pointer accent-[var(--brand)]"
                    />
                    <label htmlFor={`item-${item.id}`} className="flex-1 cursor-pointer text-sm">
                      <span className={`font-medium ${checked[item.id] ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {item.label}
                      </span>
                      {item.detail && (
                        <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                      )}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="rounded-xl border border-brand/20 bg-brand-soft/30 p-5">
            <h3 className="font-display text-lg font-semibold">
              Save this checklist alongside your formula
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              FormulaNorth keeps label content next to your formula and CNF
              prep, so updates flow through and the same review applies across
              product variants.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/auth/signup" className={buttonVariants({ size: "lg" })}>
                Create a free account
              </Link>
              <Link
                href="/cosmetic-label-requirements-canada"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Read the labelling guide
              </Link>
            </div>
          </div>

          <p className="text-xs leading-6 text-muted-foreground">
            This checklist is preparation support, not legal or regulatory
            review. Always verify your final label against current Health
            Canada cosmetic labelling guidance and applicable provincial
            requirements.
          </p>
        </section>
      )}
    </div>
  );
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex items-start gap-3 rounded-lg border border-border bg-background/40 p-3 text-sm">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="mt-0.5 h-4 w-4 cursor-pointer accent-[var(--brand)]"
      />
      <span>{label}</span>
    </label>
  );
}
