import { NextResponse } from "next/server";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireAuth } from "@/lib/auth/require-auth";

type TranslationKind = "product_name" | "claims" | "warnings" | "general";

interface TranslateRequest {
  text?: string;
  from?: "en" | "fr";
  to?: "en" | "fr";
  kind?: TranslationKind;
  productCategory?: string;
}

const KIND_GUIDANCE: Record<TranslationKind, string> = {
  product_name:
    "This is a cosmetic product display name (one short line). Translate concisely using Canadian French cosmetic conventions. Keep the brand-name feel — short, descriptive, marketable. Do not add adjectives that weren't in the source. Output only the translated name, no quotes.",
  claims:
    'These are short marketing claim lines for a cosmetic label, one per line. Translate each line into Canadian French, preserving line breaks one-to-one. Stay within cosmetic regulation: never introduce drug/NHP wording (cure, treat, prevent, heal, name medical conditions, antibacterial, sunscreen, anti-aging). If a line crosses into drug territory, reword it into a cosmetic-side French phrase. Output only the translated lines, in the same order, separated by single newlines, no numbering or quotes.',
  warnings:
    "These are cosmetic-label warning statements, one per line. Translate to Canadian French using standard cosmetic warning phrasing. Preserve line breaks one-to-one. Output only the translated warnings, in the same order, no numbering or quotes.",
  general:
    "Translate this cosmetic-label text to Canadian French. Output only the translated text, no quotes or commentary.",
};

export async function POST(request: Request) {
  try {
    await requireAuth();
    const body = (await request.json()) as TranslateRequest;
    const text = (body.text ?? "").trim();
    const from = body.from === "fr" ? "fr" : "en";
    const to = body.to === "fr" ? "fr" : "en";
    const kind: TranslationKind = (
      ["product_name", "claims", "warnings", "general"] as const
    ).includes(body.kind as TranslationKind)
      ? (body.kind as TranslationKind)
      : "general";

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }
    if (text.length > 4000) {
      return NextResponse.json(
        { error: "Text is too long. Keep it under 4000 characters." },
        { status: 400 }
      );
    }

    const fromLang = from === "fr" ? "French" : "English";
    const toLang = to === "fr" ? "French" : "English";

    const lineCount = text.split("\n").filter((l) => l.trim().length > 0).length;
    const maxTokens =
      kind === "product_name"
        ? 80
        : Math.min(1200, Math.max(120, lineCount * 80 + 200));

    const categoryNote = body.productCategory
      ? `Product category: ${body.productCategory}.`
      : "";

    const systemPrompt = `You translate cosmetic product label text from ${fromLang} to ${toLang} for Canadian indie cosmetic makers. Use Canadian French conventions where ${toLang === "French" ? "French is the target" : "appropriate"}. ${KIND_GUIDANCE[kind]} ${categoryNote}`.trim();

    const completion = await getOpenAI().chat.completions.create({
      model: AI_MODEL,
      max_tokens: maxTokens,
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: text },
      ],
    });

    const translated = completion.choices[0]?.message?.content?.trim() ?? "";

    if (!translated) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 }
      );
    }

    return NextResponse.json({ translated });
  } catch (err) {
    console.error("AI translate error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Translation failed" },
      { status: 500 }
    );
  }
}
