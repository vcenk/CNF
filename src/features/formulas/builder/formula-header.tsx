"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { updateFormulaAction } from "@/app/formulas/actions";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save } from "lucide-react";

interface FormulaHeaderProps {
  formula: {
    id: string;
    name: string;
    product_category: string | null;
    usage_type: string | null;
    target_batch_size_g: number;
  };
}

const categories = [
  { value: "", label: "Select category" },
  { value: "skin_care", label: "Skin Care" },
  { value: "hair_care", label: "Hair Care" },
  { value: "body_care", label: "Body Care" },
  { value: "fragrance", label: "Fragrance" },
  { value: "makeup", label: "Makeup" },
  { value: "oral_care", label: "Oral Care" },
];

export function FormulaHeader({ formula }: FormulaHeaderProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(formula.name);
  const [category, setCategory] = useState(formula.product_category ?? "");
  const [usageType, setUsageType] = useState(formula.usage_type ?? "");
  const [batchSize, setBatchSize] = useState(String(formula.target_batch_size_g));

  function handleSave() {
    const formData = new FormData();
    formData.set("name", name);
    formData.set("productCategory", category);
    formData.set("usageType", usageType);
    formData.set("batchSize", batchSize);

    startTransition(async () => {
      await updateFormulaAction(formula.id, formData);
      router.refresh();
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Link
          href="/formulas"
          className="rounded-md p-1.5 text-muted-foreground hover:bg-muted"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleSave}
          className="max-w-md border-none bg-transparent font-display text-2xl font-bold shadow-none focus-visible:ring-0"
          placeholder="Formula name"
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => { setCategory(e.target.value); }}
          onBlur={handleSave}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
        >
          {categories.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>

        <select
          value={usageType}
          onChange={(e) => { setUsageType(e.target.value); }}
          onBlur={handleSave}
          className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
        >
          <option value="">Usage type</option>
          <option value="rinse-off">Rinse-off</option>
          <option value="leave-on">Leave-on</option>
        </select>

        <div className="flex items-center gap-1.5">
          <Input
            type="number"
            value={batchSize}
            onChange={(e) => setBatchSize(e.target.value)}
            onBlur={handleSave}
            className="w-24 text-sm"
            min={1}
          />
          <span className="text-sm text-muted-foreground">g batch</span>
        </div>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="ml-auto flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:bg-brand-dark disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          {isPending ? "Saving..." : "Save"}
        </button>
      </div>
    </div>
  );
}
