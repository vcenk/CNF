"use server";

import { createClient } from "@/lib/supabase/server";
import { PROVINCES_CA } from "@/lib/supabase/queries/suppliers";

export interface SuggestSupplierState {
  status: "idle" | "ok" | "error";
  message?: string;
  fieldErrors?: Partial<Record<
    "name" | "website" | "city" | "province" | "submitter_email" | "specialties" | "notes",
    string
  >>;
  values?: {
    name: string;
    website: string;
    city: string;
    province: string;
    submitter_email: string;
    is_customer: boolean;
    specialties: string;
    notes: string;
  };
}

const VALID_PROVINCES = new Set(PROVINCES_CA.map((p) => p.code));

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function normalizeUrl(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  const withScheme = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return url.toString();
  } catch {
    return null;
  }
}

export async function suggestSupplierAction(
  _prev: SuggestSupplierState,
  formData: FormData
): Promise<SuggestSupplierState> {
  const name = (formData.get("name") as string | null)?.trim() ?? "";
  const websiteRaw = (formData.get("website") as string | null)?.trim() ?? "";
  const city = (formData.get("city") as string | null)?.trim() ?? "";
  const province = (formData.get("province") as string | null)?.trim() ?? "";
  const submitter_email =
    (formData.get("submitter_email") as string | null)?.trim().toLowerCase() ?? "";
  const is_customer = formData.get("is_customer") === "on";
  const specialties = (formData.get("specialties") as string | null)?.trim() ?? "";
  const notes = (formData.get("notes") as string | null)?.trim() ?? "";

  const values = {
    name,
    website: websiteRaw,
    city,
    province,
    submitter_email,
    is_customer,
    specialties,
    notes,
  };

  const fieldErrors: SuggestSupplierState["fieldErrors"] = {};

  if (!name) fieldErrors.name = "Supplier name is required.";
  if (name.length > 200) fieldErrors.name = "Name is too long.";

  let website: string | null = null;
  if (websiteRaw) {
    website = normalizeUrl(websiteRaw);
    if (!website) fieldErrors.website = "Doesn't look like a valid URL.";
  } else {
    fieldErrors.website = "Website helps us verify the supplier — please add it.";
  }

  if (province && !VALID_PROVINCES.has(province as (typeof PROVINCES_CA)[number]["code"])) {
    fieldErrors.province = "Pick a Canadian province from the list.";
  }

  if (submitter_email && !isValidEmail(submitter_email)) {
    fieldErrors.submitter_email = "Doesn't look like a valid email address.";
  }
  if (submitter_email.length > 254) {
    fieldErrors.submitter_email = "Email is too long.";
  }

  if (notes.length > 2000) {
    fieldErrors.notes = "Notes are too long (max 2000).";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      fieldErrors,
      values,
      message: "Please fix the highlighted fields.",
    };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { error } = await supabase.from("supplier_submissions").insert({
    name,
    website,
    city: city || null,
    province: province || null,
    specialties: specialties || null,
    notes: notes || null,
    submitter_email: submitter_email || null,
    is_customer,
    user_id: user?.id ?? null,
  });

  if (error) {
    console.error("Supplier submission error:", {
      code: error.code,
      message: error.message,
      details: error.details,
    });
    return {
      status: "error",
      message:
        error.code === "42P01"
          ? "Submissions aren't wired up yet — run the supplier_submissions migration in Supabase first."
          : "Could not save your suggestion. Please try again or use the contact page.",
      values,
    };
  }

  return { status: "ok" };
}
