import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categoryLabels, type ShopCategory } from "@/domain/shop";

interface ProductCardProps {
  slug: string;
  title: string;
  description: string | null;
  priceCad: number;
  category: ShopCategory;
  isFree: boolean;
}

export function ProductCard({
  slug,
  title,
  description,
  priceCad,
  category,
  isFree,
}: ProductCardProps) {
  return (
    <Link href={`/shop/${slug}`}>
      <Card className="h-full transition-shadow hover:shadow-md">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline" className="text-xs">
              {categoryLabels[category] ?? category}
            </Badge>
            <span className="font-display text-lg font-bold text-brand">
              {isFree ? "Free" : `CA$${priceCad}`}
            </span>
          </div>
          <CardTitle className="mt-2 text-base">{title}</CardTitle>
          {description && (
            <CardDescription className="line-clamp-2">
              {description}
            </CardDescription>
          )}
        </CardHeader>
      </Card>
    </Link>
  );
}
