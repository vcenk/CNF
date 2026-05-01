import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllSuppliers,
  PROVINCES_CA,
  PROVINCE_LABEL,
  type ProvinceCode,
} from "@/lib/supabase/queries/suppliers";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { siteConfig } from "@/lib/site-config";
import { MapPin, ExternalLink, Plus, ShieldCheck } from "lucide-react";
import { getOptionalUser } from "@/lib/auth/require-auth";
import { isAdminEmail } from "@/lib/auth/require-admin";

export const metadata: Metadata = {
  title: "Canadian Cosmetic Ingredient Suppliers — Directory by Province",
  description:
    "Directory of Canadian cosmetic ingredient suppliers grouped by province. Find suppliers by location with ingredient catalogs, INCI names, and reference pricing.",
  alternates: { canonical: "/suppliers" },
  openGraph: {
    title: "Canadian Cosmetic Ingredient Suppliers",
    description:
      "Find Canadian suppliers for your cosmetic ingredients, grouped by province.",
    url: `${siteConfig.url}/suppliers`,
    siteName: siteConfig.name,
  },
};

interface SuppliersPageProps {
  searchParams: Promise<{ province?: string }>;
}

interface SupplierRow {
  id: string;
  name: string;
  slug: string;
  website: string | null;
  location: string | null;
  city: string | null;
  province: string | null;
}

export default async function SuppliersPage({ searchParams }: SuppliersPageProps) {
  const params = await searchParams;
  const filter = (params.province ?? "").toUpperCase();
  const isValidFilter = (PROVINCES_CA as readonly { code: string }[]).some(
    (p) => p.code === filter
  );
  const activeProvince = isValidFilter ? (filter as ProvinceCode) : null;

  const [suppliers, user] = await Promise.all([
    getAllSuppliers() as Promise<SupplierRow[]>,
    getOptionalUser(),
  ]);
  const isAdmin = isAdminEmail(user?.email);

  // Tally counts per province for the filter pills
  const counts = new Map<string, number>();
  let unknownCount = 0;
  for (const s of suppliers) {
    if (s.province) {
      counts.set(s.province, (counts.get(s.province) ?? 0) + 1);
    } else {
      unknownCount += 1;
    }
  }

  // Apply filter
  const visible = activeProvince
    ? suppliers.filter((s) => s.province === activeProvince)
    : suppliers;

  // Group visible suppliers by province (preserve sort order from query)
  const byProvince = new Map<string, SupplierRow[]>();
  const unknownGroup: SupplierRow[] = [];
  for (const s of visible) {
    if (s.province) {
      if (!byProvince.has(s.province)) byProvince.set(s.province, []);
      byProvince.get(s.province)!.push(s);
    } else {
      unknownGroup.push(s);
    }
  }
  const orderedProvinces = (PROVINCES_CA as readonly { code: string }[])
    .map((p) => p.code as ProvinceCode)
    .filter((code) => byProvince.has(code));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Canadian Cosmetic Ingredient Suppliers",
    numberOfItems: suppliers.length,
    itemListElement: suppliers.slice(0, 50).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "LocalBusiness",
        name: s.name,
        url: s.website ?? undefined,
        address: [s.city, s.province].filter(Boolean).join(", ") || s.location || undefined,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Supplier Directory
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Canadian cosmetic ingredient suppliers
          </h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Browse {suppliers.length} Canadian suppliers grouped by province.
            Each supplier page lists ingredients, INCI names, Health Canada
            Hotlist status, and reference pricing. Confirm pricing and lead
            time directly with the supplier.
          </p>
          <p className="mt-3 max-w-2xl text-sm">
            <Link
              href="/cosmetic-ingredient-suppliers-canada"
              className="text-brand underline hover:text-brand-dark"
            >
              How to choose a Canadian cosmetic ingredient supplier →
            </Link>
          </p>
          {isAdmin && (
            <Link
              href="/dashboard/suppliers/new"
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-brand/40 bg-brand/5 px-3 py-1.5 text-xs font-medium text-brand transition-colors hover:bg-brand/10"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin: add a supplier
            </Link>
          )}
        </div>

        {/* Province filter pills */}
        <nav className="mb-8 flex flex-wrap items-center gap-2">
          <ProvincePill
            label="All"
            href="/suppliers"
            count={suppliers.length}
            active={!activeProvince}
          />
          {(PROVINCES_CA as readonly { code: string; name: string }[])
            .filter((p) => (counts.get(p.code) ?? 0) > 0)
            .map((p) => (
              <ProvincePill
                key={p.code}
                label={p.name}
                shortLabel={p.code}
                href={`/suppliers?province=${p.code}`}
                count={counts.get(p.code) ?? 0}
                active={activeProvince === p.code}
              />
            ))}
        </nav>

        {visible.length === 0 ? (
          <div className="rounded-xl border border-border bg-card p-10 text-center">
            <p className="text-muted-foreground">
              No suppliers in this province yet.
            </p>
            <Link
              href="/suppliers"
              className="mt-2 inline-block text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              View all suppliers
            </Link>
          </div>
        ) : (
          <div className="space-y-12">
            {orderedProvinces.map((code) => (
              <section key={code}>
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="font-display text-2xl font-semibold">
                    {PROVINCE_LABEL[code]}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {byProvince.get(code)!.length} supplier
                    {byProvince.get(code)!.length === 1 ? "" : "s"}
                  </span>
                </div>
                <SupplierGrid suppliers={byProvince.get(code)!} />
              </section>
            ))}

            {unknownGroup.length > 0 && (
              <section>
                <div className="mb-4 flex items-baseline justify-between">
                  <h2 className="font-display text-2xl font-semibold">
                    Online or unspecified
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    {unknownGroup.length} supplier
                    {unknownGroup.length === 1 ? "" : "s"}
                  </span>
                </div>
                <SupplierGrid suppliers={unknownGroup} />
              </section>
            )}
          </div>
        )}

        {/* Suggest a supplier */}
        <section className="mt-16 rounded-2xl border border-brand/30 bg-brand-soft/20 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-brand/15 p-3">
              <Plus className="h-5 w-5 text-brand" />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-lg font-semibold">
                Know a Canadian supplier we should add?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                We&apos;re growing the directory based on real maker
                recommendations. Tell us who you order from — supplier name,
                location, what they specialise in — and we&apos;ll review and
                add them.
              </p>
              <Link
                href="/suppliers/suggest"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-brand-dark"
              >
                Suggest a supplier
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-12 border-t border-border/40 pt-8">
          <h2 className="text-lg font-semibold">Related on FormulaNorth</h2>
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="/cosmetic-ingredient-suppliers-canada"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Suppliers guide
            </Link>
            <Link
              href="/inci-name-lookup-canada"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              INCI Name Lookup
            </Link>
            <Link
              href="/health-canada-cosmetic-hotlist"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Cosmetic Ingredient Hotlist
            </Link>
            <Link
              href="/tools/cosmetic-cost-calculator"
              className="text-sm font-medium text-brand underline hover:text-brand-dark"
            >
              Cost Calculator
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function SupplierGrid({ suppliers }: { suppliers: SupplierRow[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {suppliers.map((supplier) => {
        const locationLabel =
          supplier.city && supplier.province
            ? `${supplier.city}, ${supplier.province}`
            : supplier.city || supplier.location || null;
        return (
          <Link key={supplier.id} href={`/suppliers/${supplier.slug}`}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-base">{supplier.name}</CardTitle>
                {locationLabel && (
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {locationLabel}
                  </CardDescription>
                )}
                {supplier.website && (
                  <p className="flex items-center gap-1 text-xs text-brand">
                    <ExternalLink className="h-3 w-3" />
                    Visit website
                  </p>
                )}
              </CardHeader>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}

function ProvincePill({
  label,
  shortLabel,
  href,
  count,
  active,
}: {
  label: string;
  shortLabel?: string;
  href: string;
  count: number;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm transition-colors ${
        active
          ? "border-brand bg-brand text-primary-foreground"
          : "border-border bg-card text-foreground hover:border-brand hover:text-brand"
      }`}
    >
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{shortLabel ?? label}</span>
      <span
        className={`rounded-full px-1.5 text-xs ${
          active
            ? "bg-primary-foreground/20 text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        {count}
      </span>
    </Link>
  );
}
