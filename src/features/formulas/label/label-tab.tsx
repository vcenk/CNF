"use client";

import { useState, useTransition, useMemo } from "react";
import { useRouter } from "next/navigation";
import { saveLabelTemplateAction } from "@/app/formulas/[id]/label-actions";
import {
  generateInciList,
  generateWarnings,
  getFragranceAllergenDisclosure,
} from "@/services/label-engine";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, Tag, AlertTriangle, Download } from "lucide-react";

interface IngredientForLabel {
  inciName: string;
  percentage: number;
  isFragranceAllergen: boolean;
}

interface LabelTabProps {
  formulaId: string;
  usageType: string | null;
  ingredients: IngredientForLabel[];
  initialTemplate: {
    product_display_name_en: string;
    product_display_name_fr: string;
    company_display_name: string;
    company_address: string;
    net_weight_g: number | null;
    net_volume_ml: number | null;
    custom_claims_en: string[];
    custom_claims_fr: string[];
  } | null;
}

export function LabelTab({
  formulaId,
  usageType,
  ingredients,
  initialTemplate,
}: LabelTabProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [nameEn, setNameEn] = useState(initialTemplate?.product_display_name_en ?? "");
  const [nameFr, setNameFr] = useState(initialTemplate?.product_display_name_fr ?? "");
  const [company, setCompany] = useState(initialTemplate?.company_display_name ?? "");
  const [address, setAddress] = useState(initialTemplate?.company_address ?? "");
  const [weightG, setWeightG] = useState(initialTemplate?.net_weight_g?.toString() ?? "");
  const [volumeMl, setVolumeMl] = useState(initialTemplate?.net_volume_ml?.toString() ?? "");
  const [claimsEn, setClaimsEn] = useState(initialTemplate?.custom_claims_en?.join("\n") ?? "");
  const [claimsFr, setClaimsFr] = useState(initialTemplate?.custom_claims_fr?.join("\n") ?? "");

  const { base: inciList, mayContain } = useMemo(
    () => generateInciList(ingredients),
    [ingredients]
  );

  const allergens = useMemo(
    () => getFragranceAllergenDisclosure(ingredients, usageType as "rinse-off" | "leave-on" | null),
    [ingredients, usageType]
  );

  const autoWarnings = useMemo(
    () => generateWarnings(ingredients, usageType),
    [ingredients, usageType]
  );

  function handleSave() {
    startTransition(async () => {
      await saveLabelTemplateAction(formulaId, {
        product_display_name_en: nameEn,
        product_display_name_fr: nameFr,
        company_display_name: company,
        company_address: address,
        net_weight_g: weightG ? parseFloat(weightG) : null,
        net_volume_ml: volumeMl ? parseFloat(volumeMl) : null,
        custom_claims_en: claimsEn.split("\n").filter(Boolean),
        custom_claims_fr: claimsFr.split("\n").filter(Boolean),
      });
      router.refresh();
    });
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Editor */}
      <div className="lg:col-span-2 space-y-6">
        {/* Product info */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Product name (English)</Label>
                <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} placeholder="Body Lotion" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Product name (French)</Label>
                <Input value={nameFr} onChange={(e) => setNameFr(e.target.value)} placeholder="Lotion pour le corps" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Company name</Label>
                <Input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your Company Inc." />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Company address</Label>
                <Input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Toronto, ON, Canada" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Net weight (g)</Label>
                <Input type="number" value={weightG} onChange={(e) => setWeightG(e.target.value)} placeholder="250" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Net volume (mL)</Label>
                <Input type="number" value={volumeMl} onChange={(e) => setVolumeMl(e.target.value)} placeholder="250" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom claims */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Custom Claims (optional)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs">Claims (English, one per line)</Label>
                <Textarea value={claimsEn} onChange={(e) => setClaimsEn(e.target.value)} rows={3} placeholder="Vegan&#10;Cruelty-free" />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Claims (French, one per line)</Label>
                <Textarea value={claimsFr} onChange={(e) => setClaimsFr(e.target.value)} rows={3} placeholder="Végétalien&#10;Sans cruauté" />
              </div>
            </div>
          </CardContent>
        </Card>

        <button
          onClick={handleSave}
          disabled={isPending}
          className="flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark disabled:opacity-50"
        >
          <Save className="h-3.5 w-3.5" />
          {isPending ? "Saving..." : "Save label template"}
        </button>
      </div>

      {/* Preview sidebar */}
      <div className="space-y-4">
        {/* Label preview */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Tag className="h-4 w-4 text-brand" />
              Label Preview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            {/* Product name */}
            <div className="text-center">
              <p className="font-semibold">{nameEn || "Product Name"}</p>
              <p className="text-muted-foreground">{nameFr || "Nom du produit"}</p>
            </div>

            {/* Net quantity */}
            {(weightG || volumeMl) && (
              <p className="text-center font-bold">
                {weightG ? `${weightG} g` : `${volumeMl} mL`}
              </p>
            )}

            {/* INCI list */}
            <div>
              <p className="mb-1 font-semibold uppercase text-muted-foreground" style={{ fontSize: "9px" }}>
                Ingredients
              </p>
              <p className="leading-relaxed">
                {inciList.length > 0 ? inciList.join(", ") : "No ingredients yet"}
                {mayContain.length > 0 && (
                  <span>. +/- {mayContain.join(", ")}</span>
                )}
                .
              </p>
            </div>

            {/* Allergen disclosure */}
            {allergens.length > 0 && (
              <div className="rounded border border-warning/20 bg-warning-soft/30 p-2">
                <p className="mb-1 font-semibold text-warning" style={{ fontSize: "9px" }}>
                  FRAGRANCE ALLERGENS
                </p>
                <p>{allergens.join(", ")}</p>
              </div>
            )}

            {/* Warnings */}
            {autoWarnings.en.length > 0 && (
              <div className="space-y-1">
                {autoWarnings.en.map((w, i) => (
                  <div key={i} className="flex items-start gap-1">
                    <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
                    <div>
                      <p>{w}</p>
                      <p className="text-muted-foreground">{autoWarnings.fr[i]}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Company */}
            <div className="border-t border-border pt-2 text-center">
              <p>{company || "Company Name"}</p>
              <p className="text-muted-foreground">{address || "City, Province, Canada"}</p>
            </div>
          </CardContent>
        </Card>

        {/* PDF download */}
        <Card>
          <CardContent className="p-4">
            <button
              disabled
              className="flex w-full items-center justify-center gap-2 rounded-md bg-muted px-4 py-2 text-sm text-muted-foreground"
            >
              <Download className="h-4 w-4" />
              Export PDF (coming soon)
            </button>
            <p className="mt-2 text-center text-xs text-muted-foreground">
              PDF export with @react-pdf/renderer
            </p>
          </CardContent>
        </Card>

        {/* Stats */}
        <Card>
          <CardContent className="space-y-2 p-4 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">INCI ingredients</span>
              <span>{inciList.length}</span>
            </div>
            {mayContain.length > 0 && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">May-contain</span>
                <span>{mayContain.length}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-muted-foreground">Allergens to disclose</span>
              <Badge variant="outline" className={allergens.length > 0 ? "border-warning/30 text-warning" : ""}>
                {allergens.length}
              </Badge>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Auto-warnings</span>
              <span>{autoWarnings.en.length}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
