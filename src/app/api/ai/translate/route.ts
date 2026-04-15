import { NextResponse } from "next/server";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: Request) {
  try {
    await requireAuth();
    const { text, from, to } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const fromLang = from === "fr" ? "French" : "English";
    const toLang = to === "fr" ? "French" : "English";

    const completion = await getOpenAI().chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a translator specializing in Canadian cosmetic product labelling. Translate the given ${fromLang} product name to ${toLang}, following Canadian French conventions for cosmetic products. Respond with ONLY the translated text, no quotes or explanation.`,
        },
        { role: "user", content: text },
      ],
      temperature: 0.2,
      max_tokens: 100,
    });

    const translated = completion.choices[0]?.message?.content?.trim();
    return NextResponse.json({ translated });
  } catch (err) {
    console.error("AI translate error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Translation failed" },
      { status: 500 }
    );
  }
}
