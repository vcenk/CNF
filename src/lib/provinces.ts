/**
 * Pure (server-AND-client safe) province constants.
 *
 * Moved out of `lib/supabase/queries/suppliers.ts` because that file
 * imports from `lib/supabase/server.ts` → `next/headers`, which can't
 * be reached from a client component. Client components (e.g. the
 * supplier admin form, public submission form) need the dropdown
 * options without dragging in the server runtime.
 */

export const PROVINCES_CA = [
  { code: "AB", name: "Alberta" },
  { code: "BC", name: "British Columbia" },
  { code: "MB", name: "Manitoba" },
  { code: "NB", name: "New Brunswick" },
  { code: "NL", name: "Newfoundland & Labrador" },
  { code: "NS", name: "Nova Scotia" },
  { code: "NT", name: "Northwest Territories" },
  { code: "NU", name: "Nunavut" },
  { code: "ON", name: "Ontario" },
  { code: "PE", name: "Prince Edward Island" },
  { code: "QC", name: "Quebec" },
  { code: "SK", name: "Saskatchewan" },
  { code: "YT", name: "Yukon" },
] as const;

export type ProvinceCode = (typeof PROVINCES_CA)[number]["code"];

export const PROVINCE_LABEL: Record<ProvinceCode, string> = Object.fromEntries(
  PROVINCES_CA.map((p) => [p.code, p.name])
) as Record<ProvinceCode, string>;
