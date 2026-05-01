import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock } from "lucide-react";

interface FragranceAllergenAlertProps {
  /** "compact" for in-page callout, "full" for prominent landing-card use */
  variant?: "compact" | "full";
  /** Where the alert is being shown — used for CTA tracking via ?source= */
  source?: string;
}

const TIMELINE = [
  {
    date: "April 12, 2026",
    label: "24 allergens — IN EFFECT",
    detail:
      "All cosmetics sold in Canada must individually disclose 24 fragrance allergens above 0.001% (leave-on) or 0.01% (rinse-off).",
    status: "active" as const,
  },
  {
    date: "August 1, 2026",
    label: "Expands to 81 — for new products",
    detail:
      "Newly-marketed cosmetics must disclose the expanded list of 81 fragrance allergens above the same thresholds.",
    status: "upcoming" as const,
  },
  {
    date: "August 1, 2028",
    label: "Expanded list — for existing products",
    detail:
      "Existing products on the market must comply with the 81-allergen disclosure requirement.",
    status: "future" as const,
  },
];

const STATUS_STYLES = {
  active: {
    icon: AlertTriangle,
    iconClass: "text-rose-600 dark:text-rose-400",
    badgeClass:
      "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-300",
    label: "In effect",
  },
  upcoming: {
    icon: Clock,
    iconClass: "text-amber-600 dark:text-amber-400",
    badgeClass:
      "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300",
    label: "Coming",
  },
  future: {
    icon: CheckCircle2,
    iconClass: "text-sky-600 dark:text-sky-400",
    badgeClass:
      "bg-sky-100 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300",
    label: "2028",
  },
};

export function FragranceAllergenAlert({
  variant = "full",
  source = "",
}: FragranceAllergenAlertProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-900/40 dark:bg-amber-950/20">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="flex-1 text-sm">
          <p className="font-semibold text-amber-900 dark:text-amber-200">
            Heads up: Canadian fragrance allergen disclosure is in effect
          </p>
          <p className="mt-1 leading-6 text-amber-900/80 dark:text-amber-200/80">
            Since April 12, 2026, 24 fragrance allergens must be individually
            named on labels and in CNFs above the disclosure threshold.{" "}
            <strong>The list expands to 81 on August 1, 2026</strong> for new
            products, and to all existing products by August 1, 2028.
          </p>
          <Link
            href={`/blog/fragrance-allergen-rules-2026${
              source ? `?source=${source}` : ""
            }`}
            className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-amber-900 underline hover:text-amber-700 dark:text-amber-200"
          >
            Read what changed
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50/50 p-6 shadow-sm dark:border-amber-900/50 dark:from-amber-950/30 dark:via-card dark:to-amber-950/20 sm:p-8">
      <div className="flex flex-wrap items-start gap-4">
        <div className="rounded-xl bg-amber-200/60 p-3 dark:bg-amber-900/40">
          <AlertTriangle className="h-6 w-6 text-amber-700 dark:text-amber-300" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-300">
              Health Canada · Active regulation
            </p>
          </div>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight">
            Fragrance allergen disclosure — 24 now, 81 coming
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Canadian cosmetic labels and CNF filings must individually name
            specific fragrance allergens above the disclosure threshold —
            <strong className="text-foreground">
              {" "}
              0.001% in leave-on products, 0.01% in rinse-off
            </strong>
            . The list is rolling out in phases. If you use essential oils or
            fragrance oils in any product, this affects you.
          </p>
        </div>
      </div>

      {/* Timeline */}
      <ol className="mt-6 grid gap-3 sm:grid-cols-3">
        {TIMELINE.map((entry) => {
          const styles = STATUS_STYLES[entry.status];
          const Icon = styles.icon;
          return (
            <li
              key={entry.date}
              className="rounded-xl border border-border bg-card/70 p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <Icon className={`h-4 w-4 shrink-0 ${styles.iconClass}`} />
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${styles.badgeClass}`}
                >
                  {styles.label}
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold text-foreground">
                {entry.date}
              </p>
              <p className="mt-0.5 text-xs font-medium text-muted-foreground">
                {entry.label}
              </p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">
                {entry.detail}
              </p>
            </li>
          );
        })}
      </ol>

      {/* CTAs */}
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Link
          href={`/tools/cnf-readiness-checker${
            source ? `?source=${source}` : ""
          }`}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-brand-dark"
        >
          Run a free CNF + label readiness check
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
        <Link
          href="/blog/fragrance-allergen-rules-2026"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-muted"
        >
          What changed and why
        </Link>
        <Link
          href="https://www.canada.ca/en/health-canada/services/cosmetics/cosmetic-advertising-labelling-ingredients.html#s4"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-muted-foreground underline hover:text-foreground"
        >
          Read on canada.ca →
        </Link>
      </div>
    </div>
  );
}
