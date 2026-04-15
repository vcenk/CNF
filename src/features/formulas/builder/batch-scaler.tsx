"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale } from "lucide-react";

interface BatchScalerProps {
  currentBatchSizeG: number;
  ingredients: {
    id: string;
    inciName: string;
    commonName: string | null;
    percentage: number;
  }[];
}

const presets = [
  { label: "100g", value: 100 },
  { label: "500g", value: 500 },
  { label: "1kg", value: 1000 },
  { label: "5kg", value: 5000 },
];

export function BatchScaler({ currentBatchSizeG, ingredients }: BatchScalerProps) {
  const [targetSize, setTargetSize] = useState(currentBatchSizeG);
  const [unit, setUnit] = useState<"g" | "kg">("g");

  const sizeInGrams = unit === "kg" ? targetSize * 1000 : targetSize;

  const scaled = useMemo(() => {
    return ingredients
      .map((ing) => ({
        ...ing,
        weightG: (sizeInGrams * ing.percentage) / 100,
      }))
      .sort((a, b) => b.weightG - a.weightG);
  }, [ingredients, sizeInGrams]);

  const totalWeight = scaled.reduce((sum, i) => sum + i.weightG, 0);

  function formatWeight(g: number): string {
    if (g >= 1000) return `${(g / 1000).toFixed(2)} kg`;
    if (g >= 1) return `${g.toFixed(2)} g`;
    return `${(g * 1000).toFixed(1)} mg`;
  }

  if (ingredients.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm">
          <Scale className="h-4 w-4 text-brand" />
          Batch Scaler
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Target size input */}
        <div>
          <Label className="text-xs text-muted-foreground">Target batch size</Label>
          <div className="mt-1.5 flex gap-2">
            <Input
              type="number"
              value={targetSize}
              onChange={(e) => setTargetSize(Number(e.target.value) || 0)}
              min={1}
              className="flex-1"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value as "g" | "kg")}
              className="rounded-md border border-border bg-card px-3 py-1.5 text-sm"
            >
              <option value="g">g</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>

        {/* Preset buttons */}
        <div className="flex flex-wrap gap-1.5">
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                if (p.value >= 1000) {
                  setTargetSize(p.value / 1000);
                  setUnit("kg");
                } else {
                  setTargetSize(p.value);
                  setUnit("g");
                }
              }}
              className="rounded-full border border-border bg-card px-2.5 py-0.5 text-xs transition-colors hover:border-brand hover:text-brand"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Scaled weights */}
        <div className="space-y-1 text-xs">
          <div className="flex items-center justify-between border-b border-border pb-1 font-medium">
            <span className="text-muted-foreground">Ingredient</span>
            <span className="text-muted-foreground">Weight</span>
          </div>
          {scaled.map((ing) => (
            <div
              key={ing.id}
              className="flex items-center justify-between py-0.5"
            >
              <span className="max-w-[60%] truncate">
                {ing.commonName || ing.inciName}
                <span className="ml-1 text-muted-foreground">
                  ({ing.percentage}%)
                </span>
              </span>
              <span className="font-mono text-brand">
                {formatWeight(ing.weightG)}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between border-t border-border pt-1 font-semibold">
            <span>Total</span>
            <span className="font-mono">{formatWeight(totalWeight)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
