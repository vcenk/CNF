import { NextResponse } from "next/server";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireAuth } from "@/lib/auth/require-auth";

interface ReviewIngredient {
  inciName: string;
  percentage: number;
  hotlistStatus: string;
  hotlistMaxConcentration?: number | null;
  isFragranceAllergen: boolean;
}

export async function POST(request: Request) {
  try {
    await requireAuth();
    const { ingredients, usageType, category } = await request.json();

    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return NextResponse.json({ error: "No ingredients provided" }, { status: 400 });
    }

    const ingredientSummary = (ingredients as ReviewIngredient[])
      .map((i) => {
        const parts = [`${i.inciName} @ ${i.percentage}%`];
        if (i.hotlistStatus === "restricted") {
          parts.push(`[RESTRICTED, max ${i.hotlistMaxConcentration ?? "?"}%]`);
        }
        if (i.hotlistStatus === "prohibited") parts.push("[PROHIBITED]");
        if (i.isFragranceAllergen) parts.push("[fragrance allergen]");
        return `- ${parts.join(" ")}`;
      })
      .join("\n");

    const completion = await getOpenAI().chat.completions.create({
      model: AI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are a Health Canada cosmetic compliance expert. Review a formula and return a plain-language assessment for the maker.

Focus on:
1. Any compliance issues (hotlist violations, concentration limits)
2. Fragrance allergens requiring label disclosure (April 2026 rule: >0.01% rinse-off, >0.001% leave-on)
3. Required warnings based on ingredients (AHA sun warnings, salicylic acid, etc.)
4. Any missing data or red flags

Respond with JSON: {
  "summary": "1-2 sentence overall status",
  "issues": [{"severity": "error|warning|info", "message": "Plain language explanation"}],
  "suggestions": ["Action items for the maker"]
}`,
        },
        {
          role: "user",
          content: `Product category: ${category || "unspecified"}\nUsage type: ${usageType || "unspecified"}\n\nIngredients:\n${ingredientSummary}\n\nProvide a compliance review.`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.3,
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "No response" }, { status: 500 });
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    console.error("AI compliance error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Review failed" },
      { status: 500 }
    );
  }
}
