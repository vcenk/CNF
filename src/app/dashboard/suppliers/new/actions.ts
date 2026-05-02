"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth/require-admin";
import { PROVINCES_CA } from "@/lib/provinces";

export interface AddSupplierState {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<
    "name" | "website" | "city" | "province" | "specialties" | "notes",
    string
  >>;
  values?: {
    name: string;
    website: string;
    city: string;
    province: string;
    specialties: string;
    notes: string;
  };
}

const VALID_PROVINCES = new Set(PROVINCES_CA.map((p) => p.code));

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  // Add https:// if scheme missing
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return url.toString();
  } catch {
    return null;
  }
}

export async function addSupplierAction(
  _prevState: AddSupplierState,
  formData: FormData
): Promise<AddSupplierState> {
  await requireAdmin();

  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const websiteRaw = (formData.get("website") as string | null)?.trim() ?? "";
  const city = (formData.get("city") as string | null)?.trim() ?? "";
  const province = (formData.get("province") as string | null)?.trim() ?? "";
  const specialtiesRaw = (formData.get("specialties") as string | null)?.trim() ?? "";
  const notes = (formData.get("notes") as string | null)?.trim() ?? "";

  const values = {
    name,
    website: websiteRaw,
    city,
    province,
    specialties: specialtiesRaw,
    notes,
  };

  const fieldErrors: AddSupplierState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Supplier name is required.";
  if (name.length > 200) fieldErrors.name = "Name is too long (max 200).";

  let website: string | null = null;
  if (websiteRaw) {
    website = normalizeUrl(websiteRaw);
    if (!website) fieldErrors.website = "Doesn't look like a valid URL.";
  }

  if (province && !VALID_PROVINCES.has(province as (typeof PROVINCES_CA)[number]["code"])) {
    fieldErrors.province = "Pick a Canadian province from the list.";
  }

  // Specialties: comma-separated → array
  const specialties = specialtiesRaw
    ? specialtiesRaw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .slice(0, 12)
    : [];

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", fieldErrors, values, message: "Please fix the highlighted fields." };
  }

  const supabase = await createClient();

  // Generate a slug — append a random suffix if it collides.
  let slug = slugify(name);
  if (!slug) slug = `supplier-${Date.now()}`;

  const { data: existing } = await supabase
    .from("suppliers")
    .select("slug")
    .ilike("slug", `${slug}%`);
  if (existing && existing.length > 0) {
    const taken = new Set(existing.map((row) => row.slug as string));
    if (taken.has(slug)) {
      let n = 2;
      while (taken.has(`${slug}-${n}`)) n++;
      slug = `${slug}-${n}`;
    }
  }

  const insertPayload: Record<string, unknown> = {
    name,
    slug,
    website,
    city: city || null,
    province: province || null,
    location: city && province ? `${city}, ${province}` : city || province || null,
    is_canadian: true,
  };

  // Try to attach specialties + notes if those columns exist; ignore
  // gracefully if they don't (the schema may not have them yet).
  if (specialties.length > 0) insertPayload.specialties = specialties;
  if (notes) insertPayload.description = notes;

  const { error } = await supabase.from("suppliers").insert(insertPayload);

  if (error) {
    // If it failed because of unknown column (specialties), retry without it.
    const isMissingColumnError =
      error.code === "PGRST204" ||
      error.message?.includes("specialties") ||
      error.message?.includes("description");
    if (isMissingColumnError) {
      delete insertPayload.specialties;
      delete insertPayload.description;
      // Append specialties + notes into description as fallback (if "description" exists).
      const fallbackDesc = [
        notes,
        specialties.length > 0 ? `Specialties: ${specialties.join(", ")}` : "",
      ]
        .filter(Boolean)
        .join("\n\n");
      if (fallbackDesc) insertPayload.description = fallbackDesc;

      const retry = await supabase.from("suppliers").insert(insertPayload);
      if (retry.error) {
        console.error("Add supplier (retry) error:", {
          code: retry.error.code,
          message: retry.error.message,
        });
        return {
          status: "error",
          message:
            "Could not save. The schema may not match — check the suppliers table columns.",
          values,
        };
      }
    } else {
      console.error("Add supplier error:", {
        code: error.code,
        message: error.message,
        details: error.details,
      });
      return {
        status: "error",
        message: error.message || "Could not save the supplier.",
        values,
      };
    }
  }

  revalidatePath("/suppliers");
  revalidatePath("/dashboard/suppliers");
  redirect(`/suppliers/${slug}`);
}
