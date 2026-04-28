import Link from "next/link";

export function BcScopeCallout() {
  return (
    <div className="rounded-xl border border-brand/20 bg-brand-soft/20 p-5 text-sm">
      <p className="font-semibold text-foreground">
        What FormulaNorth covers — and what it doesn&apos;t
      </p>
      <p className="mt-2 leading-6 text-muted-foreground">
        Selling at a market is local. Cosmetic notification, ingredient
        review, and label preparation are Canada-wide responsibilities.
        FormulaNorth helps with the cosmetic formulation, label, costing,
        and CNF preparation side. Local vendor permits, business licensing,
        provincial taxes, and insurance are handled by the maker through
        the relevant municipal, provincial, or insurance partner.
      </p>
      <p className="mt-3 text-muted-foreground">
        Use this page as a starting checklist for the local side, and use
        the <Link href="/cosmetic-notification-form-canada" className="text-brand underline hover:text-brand-dark">CNF guide</Link>
        ,{" "}
        <Link href="/cosmetic-label-requirements-canada" className="text-brand underline hover:text-brand-dark">labelling guide</Link>
        , and{" "}
        <Link href="/tools/cnf-readiness-checker" className="text-brand underline hover:text-brand-dark">readiness checker</Link>
        {" "}for the cosmetic side.
      </p>
    </div>
  );
}
