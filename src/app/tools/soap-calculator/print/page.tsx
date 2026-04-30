import type { Metadata } from "next";
import {
  calculateSoap,
  decodeRecipe,
  defaultRecipe,
  fromGrams,
  SOAP_OILS_BY_SLUG,
  type WeightUnit,
} from "@/lib/soap-calculator";
import { siteConfig } from "@/lib/site-config";
import { PrintTrigger } from "./print-trigger";

export const metadata: Metadata = {
  title: "Soap Recipe — Print",
  robots: { index: false, follow: false },
};

interface PrintPageProps {
  searchParams: Promise<{ r?: string; unit?: string }>;
}

const ALLOWED_UNITS: WeightUnit[] = ["g", "kg", "oz", "lb"];

function fmt(g: number, unit: WeightUnit): string {
  return `${fromGrams(g, unit).toFixed(unit === "g" ? 1 : 3)} ${unit}`;
}

export default async function SoapCalculatorPrintPage({ searchParams }: PrintPageProps) {
  const params = await searchParams;
  const recipe =
    (params.r ? decodeRecipe(params.r) : null) ?? defaultRecipe();
  const unit = ALLOWED_UNITS.includes(params.unit as WeightUnit)
    ? (params.unit as WeightUnit)
    : "g";

  const result = calculateSoap(recipe);
  const today = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mx-auto max-w-3xl bg-white px-8 py-10 text-zinc-900 print:p-0">
      <PrintTrigger />

      <header className="mb-6 border-b border-zinc-300 pb-4 print:mb-3 print:pb-2">
        <div className="flex items-baseline justify-between">
          <h1 className="font-display text-2xl font-bold tracking-tight">
            Soap Recipe
          </h1>
          <div className="text-right text-xs text-zinc-500">
            <p>Generated {today}</p>
            <p>{siteConfig.name} · {siteConfig.url}</p>
          </div>
        </div>
        <p className="mt-2 text-sm text-zinc-600">
          {fmt(result.totalOilWeightG, unit)} batch · {recipe.lyeType} ·{" "}
          {recipe.superfatPercent}% superfat ·{" "}
          {recipe.waterMethod === "water_percent_oils"
            ? `${recipe.waterPercentOils}% water of oils`
            : recipe.waterMethod === "lye_concentration"
              ? `${recipe.lyeConcentrationPercent}% lye concentration`
              : `${recipe.waterLyeRatio}:1 water:lye`}
        </p>
      </header>

      <section className="mb-6 grid grid-cols-3 gap-4 text-sm print:mb-3">
        <ResultBlock label={`${recipe.lyeType} (lye)`} value={fmt(result.lyeG, unit)} />
        <ResultBlock label="Water" value={fmt(result.waterG, unit)} />
        <ResultBlock label="Total batch" value={fmt(result.totalBatchG, unit)} />
      </section>

      <section className="mb-6 print:mb-3">
        <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-wider text-zinc-500">
          Oils
        </h2>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-zinc-300 text-left">
              <th className="py-1 font-medium">Oil</th>
              <th className="py-1 text-right font-medium">%</th>
              <th className="py-1 text-right font-medium">Weight</th>
            </tr>
          </thead>
          <tbody>
            {result.oilLines.map((line) => {
              const def = SOAP_OILS_BY_SLUG[line.slug];
              return (
                <tr key={line.slug} className="border-b border-zinc-200">
                  <td className="py-1.5">
                    <div className="font-medium">{line.common}</div>
                    {def && (
                      <div className="text-xs text-zinc-500">{def.inci}</div>
                    )}
                  </td>
                  <td className="py-1.5 text-right tabular-nums">{line.percent}%</td>
                  <td className="py-1.5 text-right tabular-nums">{fmt(line.weightG, unit)}</td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-zinc-700 font-medium">
              <td className="py-2">Total oils</td>
              <td className="py-2 text-right tabular-nums">
                {result.oilLines.reduce((s, o) => s + o.percent, 0).toFixed(1)}%
              </td>
              <td className="py-2 text-right tabular-nums">
                {fmt(result.totalOilWeightG, unit)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {recipe.fragrancePercent > 0 && (
        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-wider text-zinc-500">
            Fragrance / Essential oil
          </h2>
          <p className="text-sm">
            {recipe.fragrancePercent}% of oil weight ={" "}
            <strong>{fmt(result.fragranceG, unit)}</strong>
          </p>
        </section>
      )}

      {result.additiveLines.length > 0 && (
        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-wider text-zinc-500">
            Additives
          </h2>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-300 text-left">
                <th className="py-1 font-medium">Additive</th>
                <th className="py-1 text-right font-medium">%</th>
                <th className="py-1 text-right font-medium">Weight</th>
              </tr>
            </thead>
            <tbody>
              {result.additiveLines.map((a) => (
                <tr key={a.slug} className="border-b border-zinc-200">
                  <td className="py-1.5 font-medium">{a.label}</td>
                  <td className="py-1.5 text-right tabular-nums">{a.percent}%</td>
                  <td className="py-1.5 text-right tabular-nums">{fmt(a.weightG, unit)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      <section className="mb-6 print:mb-3">
        <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-wider text-zinc-500">
          Soap qualities
        </h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {result.qualities.map((q) => (
              <tr key={q.label} className="border-b border-zinc-200">
                <td className="py-1.5 font-medium">{q.label}</td>
                <td className="py-1.5 text-right tabular-nums">
                  {q.value.toFixed(0)}
                </td>
                <td className="py-1.5 text-right text-xs text-zinc-500">
                  range {q.recommendedMin}–{q.recommendedMax}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {result.fattyAcids && (
        <section className="mb-6 print:mb-3">
          <h2 className="mb-2 font-display text-base font-semibold uppercase tracking-wider text-zinc-500">
            Fatty acid profile
          </h2>
          <p className="mb-2 text-xs text-zinc-600">
            Saturated: {result.fattyAcids.saturated.toFixed(0)}% · Unsaturated:{" "}
            {result.fattyAcids.unsaturated.toFixed(0)}% · Sat:Unsat ratio{" "}
            {result.fattyAcids.satRatio.toFixed(2)}
          </p>
          <div className="grid grid-cols-2 gap-x-6 text-sm">
            <FaRow label="Lauric (C12)" v={result.fattyAcids.values.lauric} />
            <FaRow label="Myristic (C14)" v={result.fattyAcids.values.myristic} />
            <FaRow label="Palmitic (C16)" v={result.fattyAcids.values.palmitic} />
            <FaRow label="Stearic (C18)" v={result.fattyAcids.values.stearic} />
            <FaRow label="Ricinoleic" v={result.fattyAcids.values.ricinoleic} />
            <FaRow label="Oleic (C18:1)" v={result.fattyAcids.values.oleic} />
            <FaRow label="Linoleic (C18:2)" v={result.fattyAcids.values.linoleic} />
            <FaRow label="Linolenic (C18:3)" v={result.fattyAcids.values.linolenic} />
          </div>
        </section>
      )}

      {result.warnings.length > 0 && (
        <section className="mb-6 rounded border border-zinc-300 bg-zinc-50 p-3 text-xs print:mb-3">
          <p className="mb-1 font-semibold">Recipe notes</p>
          <ul className="ml-4 list-disc space-y-1 text-zinc-700">
            {result.warnings.map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </section>
      )}

      <footer className="mt-6 border-t border-zinc-300 pt-3 text-xs text-zinc-500 print:mt-3 print:pt-2">
        <p>
          Lye is caustic — wear PPE. SAP and fatty-acid values are industry
          estimates; cross-reference and zap-test before sale. Soap sold to the
          public in Canada is generally regulated as a cosmetic — check{" "}
          {siteConfig.url}/cosmetic-notification-form-canada for CNF guidance.
        </p>
      </footer>
    </div>
  );
}

function ResultBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded border border-zinc-300 p-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
        {label}
      </p>
      <p className="mt-1 font-display text-lg font-bold tabular-nums">{value}</p>
    </div>
  );
}

function FaRow({ label, v }: { label: string; v: number }) {
  return (
    <div className="flex items-center justify-between border-b border-zinc-200 py-1">
      <span className="text-zinc-600">{label}</span>
      <span className="font-medium tabular-nums">{v.toFixed(0)}%</span>
    </div>
  );
}
