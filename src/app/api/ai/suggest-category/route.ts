import { NextResponse } from "next/server";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireAuth } from "@/lib/auth/require-auth";

export async function POST(request: Request) {
  try {
    await requireAuth();
    const { ingredients } = await request.json();

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "No ingredients provided" }, { status: 400 });
    }

    const ingredientList = ingredients
      .map((i: { inciName: string; percentage: number }) => `- ${i.inciName} (${i.percentage}%)`)
      .join("\n");

    const completion = await getOpenAI().chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a cosmetic regulatory expert. Given a list of INCI ingredients and percentages, suggest the most appropriate Health Canada product category AND usage type.

Categories: skin_care, hair_care, body_care, fragrance, makeup, oral_care
Usage types: rinse-off, leave-on

Respond with ONLY a JSON object: {"category": "skin_care", "usageType": "leave-on", "reasoning": "Brief explanation"}`,
        },
        {
          role: "user",
          content: `Suggest category and usage type for this formula:\n\n${ingredientList}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "No response" }, { status: 500 });
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed);
  } catch (err) {
    console.error("AI category error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "AI request failed" },
      { status: 500 }
    );
  }
}
