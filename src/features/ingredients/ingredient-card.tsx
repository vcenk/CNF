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
  return (
    <Link href={`/ingredients/${slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-sm font-semibold leading-tight">
              {commonName || inciName}
            </CardTitle>
            <HotlistBadge status={hotlistStatus} />
          </div>
          <p className="text-xs text-muted-foreground">{inciName}</p>
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
