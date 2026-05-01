import type { Metadata } from "next";
import Link from "next/link";
import { ContentPageShell } from "@/components/marketing/content-page-shell";
import { DisclaimerCallout } from "@/components/marketing/disclaimer-callout";
import { dataSourcesLastReviewed } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Data Sources",
  description:
    "How FormulaNorth handles ingredient, hotlist, and supplier data — the canonical sources we link to, what we can and can't auto-sync, and how to flag a data issue.",
};

export default function DataSourcesPage() {
  return (
    <ContentPageShell
      eyebrow="Data Sources"
      title="How FormulaNorth handles ingredient and supplier data"
      description="Transparency about what is reference material, what is canonical, and what still requires manual verification before sale or notification."
    >
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What data we surface
        </h2>
        <p className="leading-7 text-muted-foreground">
          FormulaNorth combines ingredient identity fields (INCI name,
          common name, CAS number when available, cosmetic function notes),
          Health Canada Hotlist status references, fragrance allergen flags
          per the April 12, 2026 disclosure rule, Canadian supplier
          listings, and reference pricing. The data is curated for the
          ingredients indie cosmetic makers actually use — it is not a
          full mirror of every cosmetic ingredient ever published.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Canonical sources we link to
        </h2>
        <p className="leading-7 text-muted-foreground">
          When you see a regulatory claim on FormulaNorth, the canonical
          authority is one of these:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            <a
              href="https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              Health Canada — Cosmetic Ingredient Hotlist
            </a>{" "}
            for prohibited and restricted ingredients (with concentration
            limits and conditions of use)
          </li>
          <li>
            <a
              href="https://www.canada.ca/en/health-canada/services/cosmetics/cosmetic-advertising-labelling-ingredients.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              Health Canada — Cosmetic advertising, labelling and ingredients
            </a>{" "}
            for the fragrance allergen disclosure rule
          </li>
          <li>
            <a
              href="https://laws-lois.justice.gc.ca/eng/regulations/C.R.C.,_c._869/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              Cosmetic Regulations C.R.C., c. 869
            </a>{" "}
            (legal text, including SOR/2024-63 amendment)
          </li>
          <li>
            <a
              href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:02009R1223"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              EU Cosmetic Regulation 1223/2009 Annex III
            </a>{" "}
            — the Restricted Substances List that Section 21.4 of the
            Canadian Cosmetic Regulations explicitly defers to for
            fragrance allergens
          </li>
          <li>
            <a
              href="https://pubchem.ncbi.nlm.nih.gov/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              PubChem (NIH National Library of Medicine)
            </a>{" "}
            for CAS numbers and chemical identity cross-reference
          </li>
        </ul>
        <p className="leading-7 text-muted-foreground">
          Every ingredient page on FormulaNorth links back to the
          canada.ca Hotlist for live verification of regulatory status.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          What we can and can&apos;t auto-sync
        </h2>
        <p className="leading-7 text-muted-foreground">
          The Health Canada website does not allow automated fetching of
          its content (returns HTTP 403 to programmatic requests). This is
          a Health Canada policy decision, not a limitation on our side.
          Industry tools that claim &ldquo;auto-synced from canada.ca&rdquo;
          either use manually-maintained mirrors or violate the canada.ca
          terms of use.
        </p>
        <p className="leading-7 text-muted-foreground">
          Our practical approach:
        </p>
        <ul className="ml-6 list-disc space-y-2 text-muted-foreground">
          <li>
            We manually verify ingredient and Hotlist data against the
            official canada.ca page on a quarterly cadence
          </li>
          <li>
            For fragrance allergens, we use the EU Annex III list directly
            (which Canadian Section 21.4 defers to) — that source allows
            programmatic access
          </li>
          <li>
            For Cosmetic Regulations text, we use{" "}
            <a
              href="https://laws-lois.justice.gc.ca/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand underline hover:text-brand-dark"
            >
              laws-lois.justice.gc.ca
            </a>
            , Canada&apos;s official law database, which does allow
            programmatic access
          </li>
          <li>
            CAS numbers are verified against PubChem
          </li>
        </ul>
        <p className="leading-7 text-muted-foreground">
          Because we can&apos;t auto-sync canada.ca, our database is a
          curated reference, not a real-time mirror. <strong className="text-foreground">Always
          verify the live canada.ca Hotlist before notification or sale.</strong>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Supplier information
        </h2>
        <p className="leading-7 text-muted-foreground">
          Supplier listings and pricing snapshots are provided for research
          convenience. Availability, pricing, shipping, and catalog details
          can change without notice and must be confirmed directly with
          the supplier. The directory is grown from real maker
          recommendations submitted via the{" "}
          <Link
            href="/feedback?source=suppliers"
            className="text-brand underline hover:text-brand-dark"
          >
            feedback form
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">
          Found a discrepancy?
        </h2>
        <p className="leading-7 text-muted-foreground">
          If you find an ingredient flagged differently from canada.ca, an
          INCI naming inconsistency, or a missing fragrance allergen, tell
          us — include the canada.ca link so we can verify quickly.
        </p>
        <p className="leading-7 text-muted-foreground">
          <Link
            href="/feedback?source=data-correction"
            className="text-brand underline hover:text-brand-dark"
          >
            Send a data correction →
          </Link>
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl font-semibold">Review cadence</h2>
        <p className="leading-7 text-muted-foreground">
          Last full data review: {dataSourcesLastReviewed}. We re-verify
          fragrance allergens against the EU source every quarter. Hotlist
          entries are re-verified manually as Health Canada publishes
          updates and as user reports come in via the feedback form.
        </p>
      </section>

      <DisclaimerCallout title="Verification reminder" />
    </ContentPageShell>
  );
}
