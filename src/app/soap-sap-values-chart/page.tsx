import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ExternalLink, FlaskConical, ShieldAlert } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import { siteConfig } from "@/lib/site-config";
import { SOAP_OILS } from "@/lib/soap-calculator";

const pathname = "/soap-sap-values-chart";
const title = "Soap SAP Values Chart — NaOH & KOH for Oils and Butters";
const description =
  "Compare NaOH and KOH SAP values, iodine numbers, fatty acids, and predicted soap qualities for oils, fats, butters, and waxes. Then open any blend in FormulaNorth's free soap lye calculator.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: pathname },
  openGraph: {
    title,
    description,
    url: `${siteConfig.url}${pathname}`,
    siteName: siteConfig.name,
    type: "article",
    locale: siteConfig.locale,
  },
  twitter: { card: "summary_large_image", title, description },
};

const categoryLabels = {
  base_liquid: "Liquid oils",
  base_hard: "Hard oils",
  butter: "Butters",
  exotic: "Specialty oils",
  animal: "Animal fats",
  wax_specialty: "Waxes and specialty fats",
} as const;

const groupedOils = Object.entries(categoryLabels).map(([key, label]) => ({
  key,
  label,
  oils: SOAP_OILS.filter((oil) => oil.category === key),
}));

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description,
  url: `${siteConfig.url}${pathname}`,
  dateModified: "2026-09-13",
  isPartOf: { "@id": `${siteConfig.url}/#website` },
  about: [
    { "@type": "Thing", name: "Saponification value" },
    { "@type": "Thing", name: "Soap making" },
    { "@type": "Thing", name: "Sodium hydroxide" },
    { "@type": "Thing", name: "Potassium hydroxide" },
  ],
};

export default function SoapSapValuesChartPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      <article className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <Link href="/tools/soap-calculator" className="hover:text-foreground">
            Soap calculator
          </Link>
          <span aria-hidden="true" className="mx-2">/</span>
          <span className="text-foreground">SAP values chart</span>
        </nav>

        <header className="mt-8 overflow-hidden rounded-3xl border border-brand/20 bg-gradient-to-br from-brand-soft/40 via-background to-amber-50/60 p-6 sm:p-10 dark:to-amber-950/10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">
              Soap science reference · reviewed September 2026
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight sm:text-5xl">
              Soap SAP values chart
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">
              Compare NaOH and KOH saponification values for {SOAP_OILS.length} oils,
              fats, butters, and waxes. Use the quality columns to understand a
              blend, then calculate the actual lye and water required for your batch.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/tools/soap-calculator"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-dark"
              >
                <Calculator className="h-4 w-4" />
                Open the free lye calculator
              </Link>
              <a
                href="#sap-chart"
                className="inline-flex items-center rounded-lg border border-border bg-card px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
              >
                Jump to the values
              </a>
            </div>
          </div>
        </header>

        <section className="mt-12 grid gap-4 md:grid-cols-3" aria-labelledby="read-the-chart">
          <h2 id="read-the-chart" className="sr-only">How to read the chart</h2>
          {[
            {
              term: "NaOH SAP",
              definition: "Grams of sodium hydroxide needed to fully saponify one gram of oil before superfat and purity adjustments. Used for hard bar soap.",
            },
            {
              term: "KOH SAP",
              definition: "Grams of potassium hydroxide needed per gram of oil before adjustments. Used primarily for liquid and soft soap.",
            },
            {
              term: "Quality values",
              definition: "Recipe-planning estimates based on fatty-acid profiles. They help compare blends but do not predict every finished-bar property.",
            },
          ].map((item) => (
            <div key={item.term} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-lg font-semibold">{item.term}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.definition}</p>
            </div>
          ))}
        </section>

        <section id="sap-chart" className="mt-14 scroll-mt-24" aria-labelledby="chart-heading">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand">Reference table</p>
              <h2 id="chart-heading" className="mt-2 font-display text-3xl font-bold">
                NaOH and KOH SAP values by oil
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Values are working averages. Natural oils vary by crop, processing,
              and supplier lot; confirm critical production data with your supplier.
            </p>
          </div>

          <div className="mt-7 space-y-10">
            {groupedOils.map((group) =>
              group.oils.length > 0 ? (
                <section key={group.key} aria-labelledby={`group-${group.key}`}>
                  <h3 id={`group-${group.key}`} className="font-display text-xl font-semibold">
                    {group.label} <span className="text-sm font-normal text-muted-foreground">({group.oils.length})</span>
                  </h3>
                  <div className="mt-3 overflow-x-auto rounded-xl border border-border bg-card">
                    <table className="w-full min-w-[900px] border-collapse text-left text-sm">
                      <caption className="sr-only">{group.label} soap SAP and quality values</caption>
                      <thead className="bg-muted/70 text-xs uppercase tracking-wider text-muted-foreground">
                        <tr>
                          <th scope="col" className="px-4 py-3">Oil or fat</th>
                          <th scope="col" className="px-4 py-3">INCI name</th>
                          <th scope="col" className="px-4 py-3 text-right">NaOH SAP</th>
                          <th scope="col" className="px-4 py-3 text-right">KOH SAP</th>
                          <th scope="col" className="px-4 py-3 text-right">Iodine</th>
                          <th scope="col" className="px-4 py-3 text-right">Hardness</th>
                          <th scope="col" className="px-4 py-3 text-right">Cleansing</th>
                          <th scope="col" className="px-4 py-3 text-right">Conditioning</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {group.oils.map((oil) => (
                          <tr key={oil.slug} className="transition-colors hover:bg-brand-soft/15">
                            <th scope="row" className="whitespace-nowrap px-4 py-3 font-medium">{oil.common}</th>
                            <td className="px-4 py-3 text-muted-foreground">{oil.inci}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.sapNaOH.toFixed(3)}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.sapKOH.toFixed(3)}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.iodine}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.hardness}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.cleansing}</td>
                            <td className="px-4 py-3 text-right tabular-nums">{oil.conditioning}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              ) : null
            )}
          </div>
        </section>

        <section className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]" aria-labelledby="calculation-heading">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-brand-soft p-2 text-brand"><FlaskConical className="h-5 w-5" /></span>
              <h2 id="calculation-heading" className="font-display text-2xl font-semibold">How the lye calculation works</h2>
            </div>
            <ol className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground">
              <li><strong className="text-foreground">1. Calculate each oil.</strong> Multiply its weight by the matching NaOH or KOH SAP value.</li>
              <li><strong className="text-foreground">2. Add the results.</strong> The sum is the theoretical lye required for full saponification.</li>
              <li><strong className="text-foreground">3. Apply superfat.</strong> A 5% superfat multiplies the theoretical lye by 0.95.</li>
              <li><strong className="text-foreground">4. Adjust for purity.</strong> Divide by the decimal purity of the lye listed on its supplier documentation.</li>
              <li><strong className="text-foreground">5. Calculate water separately.</strong> Choose lye concentration, water-to-lye ratio, or water as a percentage of oils.</li>
            </ol>
            <div className="mt-6 rounded-xl bg-muted/60 p-5">
              <p className="text-sm font-semibold">Worked example</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                FormulaNorth&apos;s 1,000 g beginner blend—50% olive, 25% coconut,
                20% palm, and 5% castor—requires about 143.08 g of 99%-pure NaOH
                at 5% superfat. At 33% water as a percentage of oils, water is
                330 g. Recalculate whenever an oil, batch size, superfat, or lye
                purity changes.
              </p>
            </div>
          </div>

          <aside className="rounded-2xl border border-amber-300/70 bg-amber-50/70 p-6 sm:p-8 dark:border-amber-900/60 dark:bg-amber-950/20">
            <div className="flex items-center gap-3">
              <ShieldAlert className="h-6 w-6 text-amber-700 dark:text-amber-300" />
              <h2 className="font-display text-2xl font-semibold">Use lye safely</h2>
            </div>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              Sodium hydroxide and potassium hydroxide are corrosive. Read the
              supplier Safety Data Sheet, use suitable eye and skin protection,
              work with ventilation, and keep children and animals away. A
              calculator is a formulation aid, not a substitute for training,
              supplier documentation, or finished-product assessment.
            </p>
            <a
              href="https://www.ccohs.ca/oshanswers/chemicals/chem_profiles/sodium_hydroxide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-800 underline hover:text-amber-950 dark:text-amber-200"
            >
              CCOHS sodium hydroxide profile <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </aside>
        </section>

        <section className="mt-16 border-t border-border pt-12" aria-labelledby="sources-heading">
          <h2 id="sources-heading" className="font-display text-2xl font-semibold">Methodology and reference checks</h2>
          <p className="mt-4 max-w-3xl leading-7 text-muted-foreground">
            FormulaNorth uses a normalized working dataset for recipe planning.
            We compare entries against established soap-calculator references,
            but published SAP values are averages and can differ between sources.
            For production, keep the specification sheet and Safety Data Sheet
            for the exact material and lye lot you purchased.
          </p>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              ["SoapCalc oil and SAP reference", "https://soapcalc.net/oil-list"],
              ["Soapmaking Friend recipe calculator", "https://www.soapmakingfriend.com/soap-making-recipe-builder-lye-calculator"],
              ["Bramble Berry lye calculator", "https://www.brambleberry.com/lyecalculator"],
              ["Health Canada cosmetic notification guide", "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/notification-cosmetics/guide.html"],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium transition-colors hover:border-brand">
                  {label}<ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-16 rounded-3xl bg-foreground p-7 text-background sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-background/60">From reference to recipe</p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold">Build the blend, then check the Canadian selling requirements.</h2>
          <p className="mt-4 max-w-2xl leading-7 text-background/75">
            Calculate NaOH or KOH, compare predicted qualities, print the batch,
            and continue into FormulaNorth&apos;s labelling and Cosmetic Notification Form guides.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/tools/soap-calculator" className="rounded-lg bg-background px-5 py-3 text-sm font-semibold text-foreground hover:bg-background/90">Calculate a soap recipe</Link>
            <Link href="/how-to-sell-handmade-soap-in-canada" className="rounded-lg border border-background/30 px-5 py-3 text-sm font-semibold hover:bg-background/10">Sell soap in Canada</Link>
          </div>
        </section>
      </article>
    </>
  );
}
