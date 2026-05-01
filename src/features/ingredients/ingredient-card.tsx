import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HotlistBadge } from "./hotlist-badge";

interface IngredientCardProps {
  slug: string;
  inciName: string;
  commonName: string | null;
  hotlistStatus: "not_listed" | "restricted" | "prohibited";
  functions: string[];
  isFragranceAllergen: boolean;
}

export function IngredientCard({
  slug,
  inciName,
  commonName,
  hotlistStatus,
  functions,
  isFragranceAllergen,
}: IngredientCardProps) {
  // Display rules:
  // - If both common name and INCI exist (and differ): show common name as
  //   the headline, INCI as a styled secondary line in italic + brand colour.
  // - If only INCI exists: show INCI as the headline (no redundant subtitle).
  const hasDistinctCommon =
    commonName && commonName.trim().toLowerCase() !== inciName.trim().toLowerCase();

  return (
    <Link href={`/ingredients/${slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-tight">
              {hasDistinctCommon ? commonName : inciName}
            </CardTitle>
            <HotlistBadge status={hotlistStatus} />
          </div>

          {hasDistinctCommon && (
            <p
              title={inciName}
              className="line-clamp-2 text-xs italic leading-snug text-brand/85"
            >
              <span className="not-italic font-semibold uppercase tracking-wider text-[10px] text-muted-foreground">
                INCI
              </span>{" "}
              {inciName}
            </p>
          )}

          <CardDescription className="flex flex-wrap gap-1 pt-1">
            {functions.slice(0, 3).map((fn) => (
              <span
                key={fn}
                className="rounded-full bg-brand-soft/50 px-2 py-0.5 text-xs text-brand"
              >
                {fn}
              </span>
            ))}
            {isFragranceAllergen && (
              <span className="rounded-full bg-warning-soft px-2 py-0.5 text-xs text-warning">
                Allergen
              </span>
            )}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
