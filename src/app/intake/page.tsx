import type { Metadata } from "next";
import { IntakeForm } from "@/features/product-intake/intake-form";

export const metadata: Metadata = {
  title: "Product Intake",
  description:
    "Start a cosmetic notification draft with company details, product basics, ingredient capture, and validation feedback."
};

export default function IntakePage() {
  return <IntakeForm />;
}
