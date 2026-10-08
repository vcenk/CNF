import { ArrowUpRight, CheckCircle2, FlaskConical, SearchCheck } from "lucide-react";
import type { IngredientEditorialGuide } from "@/content/ingredient-editorial-guides";

interface IngredientEditorialGuideProps {
  name: string;
  guide: IngredientEditorialGuide;
}

export function IngredientEditorialGuideSection({
  name,
  guide,
}: IngredientEditorialGuideProps) {
  return (
    <div className="mb-10 space-y-8">
      <section
        aria-labelledby="quick-answer-heading"
        className="relative overflow-hidden rounded-2xl border border-brand/20 bg-brand-soft/20 p-6 sm:p-8"
      >
        <div className="absolute -right-16 -top-20 h-48 w-48 rounded-full bg-brand/10 blur-3xl" />
        <div className="relative">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Formulator&apos;s quick answer
          </p>
          <h2
            id="quick-answer-heading"
            className="font-display text-2xl font-semibold tracking-tight"
          >
            How {name} works in a cosmetic formula
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
            {guide.quickAnswer}
          </p>
        </div>
      </section>

      <section aria-labelledby="formulation-notes-heading">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-full bg-brand-soft text-brand">
            <FlaskConical className="size-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Practical guidance
            </p>
            <h2
              id="formulation-notes-heading"
              className="font-display text-2xl font-semibold"
            >
              Formulation notes
            </h2>
          </div>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          {guide.formulationNotes.map((note, index) => (
            <article
              key={note.title}
              className="rounded-xl border border-border bg-card p-5 shadow-sm"
            >
              <span className="text-xs font-semibold tabular-nums text-brand">
                0{index + 1}
              </span>
              <h3 className="mt-2 font-display text-lg font-semibold">
                {note.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {note.body}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          aria-labelledby="useful-for-heading"
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h2
            id="useful-for-heading"
            className="font-display text-xl font-semibold"
          >
            Where formulators use it
          </h2>
          <ul className="mt-4 space-y-3">
            {guide.usefulFor.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6">
                <CheckCircle2
                  className="mt-1 size-4 shrink-0 text-brand"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="verify-heading"
          className="rounded-2xl border border-warning/25 bg-warning-soft/20 p-6"
        >
          <div className="flex items-center gap-2">
            <SearchCheck className="size-5 text-warning" aria-hidden="true" />
            <h2
              id="verify-heading"
              className="font-display text-xl font-semibold"
            >
              Verify before production
            </h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-muted-foreground">
            {guide.verifyBeforeUse.map((item) => (
              <li key={item} className="flex gap-3">
                <span className="mt-2 size-1.5 shrink-0 rounded-full bg-warning" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section
        aria-labelledby="ingredient-sources-heading"
        className="border-t border-border pt-7"
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Evidence trail
            </p>
            <h2
              id="ingredient-sources-heading"
              className="font-display text-xl font-semibold"
            >
              Sources and review notes
            </h2>
          </div>
          <p className="text-xs text-muted-foreground">
            Editorial review: {guide.reviewed}
          </p>
        </div>
        <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-card">
          {guide.sources.map((source) => (
            <li key={source.href}>
              <a
                href={source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 p-4 transition-colors hover:bg-muted/60"
              >
                <span>
                  <span className="text-sm font-semibold group-hover:text-brand">
                    {source.label}
                  </span>
                  <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                    {source.scope}
                  </span>
                </span>
                <ArrowUpRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs leading-5 text-muted-foreground">
          Sources support ingredient identity, regulatory checks, and formulation
          context. Supplier specifications and finished-product testing remain
          necessary for each formula and batch.
        </p>
      </section>
    </div>
  );
}
