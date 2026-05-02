import { NextResponse } from "next/server";
import { getOpenAI, AI_MODEL } from "@/lib/openai";
import { requireAuth } from "@/lib/auth/require-auth";

interface RewriteRequest {
  claims?: string;
  productName?: string;
  productCategory?: string;
  usageType?: "leave-on" | "rinse-off" | "";
}

interface RewriteResponse {
  alternatives: string[];
  whyRisky: string;
  caveat: string;
}

export async function POST(request: Request) {
  try {
    // Require auth — this route hits OpenAI on our budget. Anonymous
    // access would let anyone burn through API credits.
    await requireAuth();

    const body = (await request.json()) as RewriteRequest;
    const claims = (body.claims ?? "").trim();

    if (!claims) {
      return NextResponse.json(
        { error: "No claims supplied. Paste your marketing claims and try again." },
        { status: 400 }
      );
    }

    if (claims.length > 1500) {
      return NextResponse.json(
        { error: "Claims text is too long. Keep it under 1500 characters." },
        { status: 400 }
      );
    }

    const productContext = [
      body.productName ? `Product name: ${body.productName}` : null,
      body.productCategory ? `Product category: ${body.productCategory}` : null,
      body.usageType ? `Usage type: ${body.usageType}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const completion = await getOpenAI().chat.completions.create({
      model: AI_MODEL,
      max_tokens: 500,
      temperature: 0.4,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You help indie Canadian cosmetic makers rewrite product claims that risk crossing into drug or natural health product territory under Health Canada regulation. Your job is to suggest cosmetic-side alternatives — sensory, descriptive, ingredient-led wording that stays clearly within the cosmetic framework.

STRICT RULES:
- Never suggest claims that mention treating, curing, preventing, or healing any condition
- Never name medical conditions (eczema, acne, psoriasis, dermatitis, rosacea, etc.)
- Never suggest antimicrobial, antibacterial, antifungal, antiviral wording
- Never suggest sunscreen / SPF / sun-protection claims
- Never imply drug-like efficacy ("clinically proven", "doctor recommended")
- Avoid "anti-aging" — suggest sensory/feel wording instead
- Keep each alternative short and realistic for cosmetic packaging (about 8 to 18 words)
- Tone: warm, honest, descriptive, indie-maker friendly. Plain English.

You return JSON in this exact shape:
{
  "alternatives": ["alt 1", "alt 2", "alt 3"],
  "whyRisky": "1-2 sentences plainly explaining what made the original wording cross the line into drug or NHP territory",
  "caveat": "1 sentence reminding the user this is a starting suggestion only and they should review final wording before printing labels"
}

Always provide exactly 3 alternatives. They should differ in angle (e.g. sensory, ingredient-led, lifestyle/use-case) so the maker has real options.`,
        },
        {
          role: "user",
          content: `${productContext ? productContext + "\n\n" : ""}Original marketing claims:\n${claims}\n\nRewrite into 3 cosmetic-side alternatives that avoid drug or NHP territory. Return only the JSON.`,
        },
      ],
    });

    const text = completion.choices[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: "No AI response" }, { status: 500 });
    }

    const parsed = JSON.parse(text) as Partial<RewriteResponse>;

    if (!parsed.alternatives || !Array.isArray(parsed.alternatives)) {
      return NextResponse.json(
        { error: "AI response was malformed. Try again." },
        { status: 500 }
      );
    }

    const response: RewriteResponse = {
      alternatives: parsed.alternatives.slice(0, 3).map((a) => String(a).trim()).filter(Boolean),
      whyRisky: typeof parsed.whyRisky === "string" ? parsed.whyRisky : "",
      caveat:
        typeof parsed.caveat === "string" && parsed.caveat.length > 0
          ? parsed.caveat
          : "AI suggestions only — review final wording with a regulatory professional before printing labels.",
    };

    return NextResponse.json(response);
  } catch (err) {
    console.error("AI rewrite-claim error:", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Rewrite failed" },
      { status: 500 }
    );
  }
}
