/**
 * Curated beginner-to-intermediate soap recipes.
 *
 * These are documented common-knowledge ratios in the indie soap-making
 * community — published and re-published in dozens of references over the
 * decades. We include them as starting points, run them through our own
 * soap calculator for quality scoring, and add Canadian context (cure
 * times, climate, CNF reminder).
 *
 * Always lye-test and zap-test the finished bar before sale, regardless
 * of how trustworthy a recipe looks on paper.
 */

import type {
  LyeType,
  ShareableRecipe,
  SoapInputAdditive,
  SoapInputOil,
  WaterMethod,
} from "./soap-calculator";

export type RecipeTag =
  | "beginner"
  | "intermediate"
  | "advanced"
  | "vegan"
  | "no_palm"
  | "salt_bar"
  | "milk"
  | "liquid"
  | "fragranced"
  | "unscented"
  | "kitchen"
  | "shave"
  | "hot_process";

export interface SoapRecipe {
  slug: string;
  name: string;
  summary: string;
  /** Longer paragraph for the recipe detail page. */
  description: string;
  tags: RecipeTag[];
  /** Recommended cure time in weeks (CP standard is 4–6; high-olive longer). */
  cureWeeks: number;
  /** Recipe inputs, identical shape to ShareableRecipe — drives the calculator preview + share link. */
  recipe: ShareableRecipe;
  /** Step-by-step instructions specific to this recipe. */
  instructions: string[];
  /** Things to watch for, common mistakes, troubleshooting tips. */
  notes: string[];
}

const baseInputs = (
  oils: SoapInputOil[],
  opts: Partial<{
    lyeType: LyeType;
    superfatPercent: number;
    waterMethod: WaterMethod;
    waterPercentOils: number;
    fragrancePercent: number;
    additives: SoapInputAdditive[];
    totalOilWeightG: number;
    lyePurityPercent: number;
  }> = {}
): ShareableRecipe => ({
  oils,
  totalOilWeightG: opts.totalOilWeightG ?? 1000,
  lyeType: opts.lyeType ?? "NaOH",
  lyePurityPercent: opts.lyePurityPercent ?? 99,
  superfatPercent: opts.superfatPercent ?? 5,
  waterMethod: opts.waterMethod ?? "water_percent_oils",
  waterPercentOils: opts.waterPercentOils ?? 33,
  lyeConcentrationPercent: 33,
  waterLyeRatio: 1.5,
  fragrancePercent: opts.fragrancePercent ?? 0,
  additives: opts.additives ?? [],
});

export const SOAP_RECIPES: SoapRecipe[] = [
  // 1. Classic balanced beginner CP
  {
    slug: "balanced-beginner-bar",
    name: "Balanced Beginner Bar",
    summary:
      "A reliable starter — balanced quality scores, forgiving trace, and cures in standard time.",
    description:
      "If you're making your first batch, start here. The 50/25/20/5 olive-coconut-palm-castor ratio has been a beginner workhorse in the soap community for decades because every score lands inside the recommended range. Trace happens at a comfortable pace, the bars firm up cleanly, and the lather is rich without being drying.",
    tags: ["beginner", "fragranced"],
    cureWeeks: 4,
    instructions: [
      "Suit up: gloves, eye protection, long sleeves, well-ventilated space. Lye is caustic.",
      "Weigh the oils into your soaping pot and warm gently to 38–43°C (100–110°F).",
      "Slowly add the lye to the cold water (never the reverse). Stir until clear. Set aside to cool.",
      "When both lye-water and oils are between 38–43°C, slowly pour lye-water into the oils.",
      "Stick-blend in short pulses until you reach light trace.",
      "Add fragrance and any colourant, blend briefly to combine.",
      "Pour into a lined wood or silicone loaf mould. Tap to release air bubbles.",
      "Cover and insulate. Let sit 24–48 hours before unmoulding.",
      "Cut into bars and cure on a rack for at least 4 weeks before use.",
    ],
    notes: [
      "If your house is hot, soap to lower temperatures (32–38°C) so trace doesn't accelerate.",
      "First-batch makers often hit a thicker trace than expected — pour as soon as you see it, don't keep blending.",
      "Some essential oils (citrus, peppermint) can cause acceleration. Save the wild oils for batch #5.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 50 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "palm_oil", percent: 20 },
        { slug: "castor_oil", percent: 5 },
      ],
      { fragrancePercent: 3 }
    ),
  },
  // 2. Classic Castile (100% olive)
  {
    slug: "100-olive-castile",
    name: "Pure Olive Castile",
    summary:
      "100% olive oil. Centuries-old recipe. Long cure (6+ months), gentle, low-lather, near-mythical mildness.",
    description:
      "True Castile soap dates to medieval Spain — pure olive oil saponified with lye. The trade-off for its legendary mildness is that fresh bars are soft, slow-tracing, and the lather is creamy rather than bubbly. Cure for at least 6 months for a hard, long-lasting bar. Many makers cure 9–12 months for the best texture. Don't rush this one.",
    tags: ["intermediate", "vegan", "no_palm", "unscented"],
    cureWeeks: 26,
    instructions: [
      "Soap at lower temperatures (32–38°C / 90–100°F). Olive can take a long time to trace at higher temps but also has a tendency to volcano if overheated.",
      "Mix the lye-water and let it cool fully — patience is the whole game with Castile.",
      "Combine and stick-blend. Trace will be slow — 10–30 minutes is normal.",
      "Pour at light-to-medium trace into a lined mould.",
      "DO NOT insulate aggressively. Castile is prone to overheat and crack.",
      "Unmould carefully after 48–72 hours; the bar will still feel soft.",
      "Cut into thicker bars (more surface area = faster cure) and cure 6+ months.",
    ],
    notes: [
      "Bars feel slimy in the first months — that's normal Castile behaviour, will go away with cure.",
      "If you want a similar feel with a faster cure, see the Bastille recipe.",
      "Use unflavoured olive oil pomace if your budget is tight; quality is similar for soap.",
    ],
    recipe: baseInputs([{ slug: "olive_oil", percent: 100 }], {
      superfatPercent: 5,
      waterPercentOils: 38,
    }),
  },
  // 3. Bastille (80% olive)
  {
    slug: "bastille-80-olive",
    name: "Bastille (80% Olive)",
    summary:
      "Olive-dominant with 15% coconut for lather and 5% castor for stability. Castile mildness at half the cure time.",
    description:
      "A Bastille bar is olive oil's mildness with a touch of coconut for cleansing and bubbles. Cure time drops to 3 months while keeping most of Castile's gentleness. Excellent for sensitive skin, baby soaps, and dish soap (cured long enough).",
    tags: ["intermediate", "vegan", "no_palm", "unscented"],
    cureWeeks: 12,
    instructions: [
      "Soap at moderate temperatures (38–43°C / 100–110°F).",
      "Stick-blend in short pulses. Trace is faster than pure Castile but still measured.",
      "Pour at light trace. The bar slabs cleanly into thinner bars.",
      "Unmould after 24–48 hours. Cut. Cure 12+ weeks for best feel.",
    ],
    notes: [
      "Common variation: 70% olive / 25% coconut / 5% castor for slightly more lather.",
      "Goes well with mild fragrance — lavender, chamomile, calendula. Avoid heavy florals here.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 80 },
        { slug: "coconut_oil_76", percent: 15 },
        { slug: "castor_oil", percent: 5 },
      ],
      { fragrancePercent: 2 }
    ),
  },
  // 4. Coconut Salt Bar
  {
    slug: "coconut-salt-bar",
    name: "Coconut Salt Bar",
    summary:
      "High-coconut bar with sea salt up to 100% of oils. 20% superfat keeps it from being drying. Spa-feel hardness.",
    description:
      "Salt bars use sea salt up to 100% of the oil weight, which makes the bars unbelievably hard, long-lasting, and luxurious-feeling. The catch is high coconut + low superfat = drying skin, so we run 20% superfat to compensate. Salt suppresses lather, but bubbles return after a short cure.",
    tags: ["intermediate", "vegan", "no_palm", "salt_bar"],
    cureWeeks: 6,
    instructions: [
      "Use individual silicone moulds — salt bars get rock-hard fast and cracking is common in loaf moulds.",
      "Bring lye-water and oils to 43–50°C (110–120°F) — you need the heat to keep the high-coconut soap fluid through trace.",
      "Stir salt into oils before adding lye-water. Use fine-grain sea salt for smooth bars, coarser for exfoliating.",
      "Combine, stick-blend to light trace, pour quickly into individual moulds.",
      "Cut/unmould early — salt bars can become uncuttable after 24 hours.",
      "Cure 6+ weeks. Lather builds during cure; the first weeks have minimal bubbles.",
    ],
    notes: [
      "Most makers find 50–80% salt is more practical than 100% — easier to cut, still feels great.",
      "Avoid colourants that bleed at high pH; oxides and ultramarines work well here.",
    ],
    recipe: baseInputs(
      [
        { slug: "coconut_oil_76", percent: 80 },
        { slug: "olive_oil", percent: 15 },
        { slug: "castor_oil", percent: 5 },
      ],
      {
        superfatPercent: 20,
        additives: [{ slug: "salt", percent: 75 }],
        fragrancePercent: 3,
      }
    ),
  },
  // 5. Goat milk soap
  {
    slug: "goat-milk-cp",
    name: "Goat Milk CP Soap",
    summary:
      "Replaces water with frozen goat milk. Adds creamy lather and is famously gentle. Soap cool to keep colour.",
    description:
      "Goat milk soap has a devoted following because the proteins and fats add a softness to the lather most water-based soap can't match. The trick is keeping the milk cold — milk sugars scorch under the heat of saponification, turning the bars orange or brown. Freeze the milk first and add lye slowly.",
    tags: ["intermediate", "milk", "no_palm"],
    cureWeeks: 4,
    instructions: [
      "Freeze the goat milk into ice cubes the day before. Use it semi-frozen.",
      "Wear PPE. Set the milk-and-lye container in an ice bath to keep it cool.",
      "Add lye to the milk a tablespoon at a time, stirring to dissolve, watching the temperature. Keep it under 38°C (100°F).",
      "If milk turns yellow that's normal; if it turns dark brown the proteins have scorched — cool faster next time.",
      "Soap at lower temperatures (30–35°C) to preserve a paler colour.",
      "Combine, stick-blend to light trace, pour and DO NOT insulate. Refrigerate or freeze the mould for 24 hours to prevent gel.",
      "Unmould after 36–48 hours. Cure 4 weeks.",
    ],
    notes: [
      "Pale tan to cream is normal for milk soap. If you want pure white, add 0.5–1% titanium dioxide.",
      "Honey is a beautiful pairing — but adds heat. Add 0.5% honey or skip if you're nervous about overheating.",
      "Refrigerating the mould reliably prevents the partial gel ring that ruins milk soap appearance.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 40 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "shea_butter", percent: 15 },
        { slug: "castor_oil", percent: 5 },
        { slug: "sweet_almond_oil", percent: 15 },
      ],
      { additives: [{ slug: "milk", percent: 100 }] }
    ),
  },
  // 6. Coffee kitchen soap
  {
    slug: "coffee-kitchen-bar",
    name: "Coffee Kitchen Bar",
    summary:
      "High-coconut, high-cleansing bar with coffee grounds for exfoliation. Strips garlic and onion smell from hands.",
    description:
      "A bar made specifically for the kitchen. The high coconut percentage (60%) gives huge lather and oil-cutting power, and ground coffee acts as a gentle abrasive that absorbs strong smells like garlic, fish, and onions. Don't use this on your face — it's too cleansing.",
    tags: ["beginner", "vegan", "no_palm", "kitchen"],
    cureWeeks: 4,
    instructions: [
      "Brew strong coffee, freeze it, and use the cubes to dissolve the lye for extra coffee-scented impact (optional).",
      "Standard procedure: weigh oils, melt, cool to 38–43°C.",
      "Mix lye-water, cool to similar temp.",
      "Combine, stick-blend to light trace.",
      "Add coffee grounds (used or fresh, depending on how dark you want), stir in.",
      "Pour into mould, unmould after 24 hours, cure 4 weeks.",
    ],
    notes: [
      "Use FINE-grind grounds — coarse coffee feels like sandpaper.",
      "Used grounds (after brewing) work fine and are eco-friendly.",
      "Coffee can darken a soap to deep tan over the cure — leave room for colour shift.",
    ],
    recipe: baseInputs(
      [
        { slug: "coconut_oil_76", percent: 60 },
        { slug: "olive_oil", percent: 25 },
        { slug: "castor_oil", percent: 5 },
        { slug: "shea_butter", percent: 10 },
      ],
      {
        superfatPercent: 8,
        additives: [{ slug: "coffee_grounds", percent: 2 }],
      }
    ),
  },
  // 7. Oatmeal honey
  {
    slug: "oatmeal-honey-bar",
    name: "Oatmeal & Honey",
    summary:
      "Soothing colloidal oats and a touch of honey. Mild, creamy, popular with sensitive skin.",
    description:
      "A classic gentle bar for sensitive or dry skin. Colloidal oats bind moisture and reduce irritation; honey adds humectancy and a faint sweetness to the lather. Honey heats the batch — keep the percentage low and watch your temps.",
    tags: ["beginner", "vegan", "no_palm", "unscented"],
    cureWeeks: 4,
    instructions: [
      "Standard CP procedure with one twist: dissolve the honey in a tablespoon of warm water before mixing in.",
      "Soap at lower temps (32–38°C). Honey accelerates trace and heats the batch.",
      "At light trace, add colloidal oats and the honey-water. Stir gently — don't over-blend.",
      "Pour, do NOT insulate (honey + insulation = volcano).",
      "Unmould after 24–48 hours, cure 4 weeks.",
    ],
    notes: [
      "Stay at or below 1% honey for your first attempts.",
      "Colloidal oats give a creamier feel without graininess. Whole oats add visual interest but feel scratchy.",
      "Common pairing: vanilla fragrance — but vanilla discolours soap to brown. If you want it pale, skip the vanilla.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 50 },
        { slug: "coconut_oil_76", percent: 20 },
        { slug: "shea_butter", percent: 20 },
        { slug: "castor_oil", percent: 5 },
        { slug: "sweet_almond_oil", percent: 5 },
      ],
      {
        additives: [
          { slug: "oats_colloidal", percent: 3 },
          { slug: "honey", percent: 1 },
        ],
      }
    ),
  },
  // 8. Vegan no-palm
  {
    slug: "vegan-no-palm",
    name: "Vegan, Palm-Free",
    summary:
      "Plant-based, palm-free workhorse. Shea and cocoa replace palm for hardness.",
    description:
      "A fully vegan, palm-free balanced bar. Shea and cocoa butter pull the hardness up where palm would normally sit, while olive and coconut do the daily-driver work. A great default for makers who avoid palm for sustainability reasons.",
    tags: ["beginner", "vegan", "no_palm", "fragranced"],
    cureWeeks: 4,
    instructions: [
      "Standard CP procedure.",
      "Melt the cocoa and shea butters first; they're hard at room temperature.",
      "Combine all oils, cool to 38–43°C.",
      "Trace, fragrance, pour, unmould after 24–48 hours, cure 4 weeks.",
    ],
    notes: [
      "Refined shea is unscented; raw shea has a smoky-nutty aroma that can clash with delicate fragrances.",
      "Cocoa butter brings a faint chocolate scent; deodorised cocoa butter avoids it.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 40 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "shea_butter", percent: 15 },
        { slug: "cocoa_butter", percent: 10 },
        { slug: "castor_oil", percent: 5 },
        { slug: "rice_bran_oil", percent: 5 },
      ],
      { fragrancePercent: 3 }
    ),
  },
  // 9. Liquid soap
  {
    slug: "liquid-castile",
    name: "Liquid Castile (KOH)",
    summary:
      "Potassium hydroxide soap paste for diluted hand soap, body wash, dish soap, or shampoo base.",
    description:
      "Liquid soap uses potassium hydroxide instead of sodium hydroxide. The result is a thick paste that you dilute with water (typically 1:1 to 1:3) to make finished liquid soap. Longer process than CP but the yield is enormous and the soap is endlessly customisable.",
    tags: ["advanced", "vegan", "no_palm", "liquid"],
    cureWeeks: 0,
    instructions: [
      "Weigh oils into a slow cooker or double boiler. Heat to 71°C (160°F).",
      "Mix KOH (90% pure) into water in a separate vessel. Combine slowly, stirring.",
      "Pour lye-water into the oils. Stick-blend to thick trace, then keep cooking on low.",
      "After about 3 hours of cook, the paste should be translucent amber. Check zap (taste a tiny dab — if it stings, it needs more cook).",
      "When the paste is zap-free, you have soap paste. Store as-is or dilute.",
      "To dilute: mix 1 part paste with 1 part hot water, let sit overnight; adjust thickness with more water or cook longer.",
    ],
    notes: [
      "KOH is sold at 85–95% purity. Set the calculator's lye purity field to match your KOH (90% is most common).",
      "Use a dedicated KOH stick blender if you can — KOH is harsher on tools than NaOH.",
      "Liquid soap doesn't need a cure. It's ready when the zap test passes.",
    ],
    recipe: baseInputs(
      [
        { slug: "coconut_oil_76", percent: 40 },
        { slug: "olive_oil", percent: 30 },
        { slug: "sunflower_oil", percent: 25 },
        { slug: "castor_oil", percent: 5 },
      ],
      { lyeType: "KOH", lyePurityPercent: 90, superfatPercent: 3 }
    ),
  },
  // 10. Luxe butter
  {
    slug: "luxe-butter-blend",
    name: "Luxe Butter Blend",
    summary:
      "Butters-forward conditioning bar — slower trace, harder bar, intermediate-level recipe.",
    description:
      "When you're past beginner and want to taste real luxury, butters are where it goes. Shea, cocoa, and a touch of mango deliver creamy, conditioning lather with a marble-firm bar. Slower trace gives time for fancy swirls.",
    tags: ["intermediate", "vegan", "no_palm", "fragranced"],
    cureWeeks: 6,
    instructions: [
      "Melt all hard butters together. Add liquid oils and cool to 38–43°C.",
      "Mix lye-water, cool to similar temp.",
      "Combine, stick-blend in short pulses to light trace — butters slow trace, you have time.",
      "Add fragrance, divide for swirls if desired, pour, insulate lightly, unmould 24–48 hours.",
      "Cure 6 weeks for the butters to fully integrate.",
    ],
    notes: [
      "If your butters seize the batter, blend through it; it usually smooths back out.",
      "Save this for batch 5+; trace timing on butter-heavy bars takes practice.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 30 },
        { slug: "coconut_oil_76", percent: 20 },
        { slug: "shea_butter", percent: 20 },
        { slug: "cocoa_butter", percent: 15 },
        { slug: "castor_oil", percent: 5 },
        { slug: "sweet_almond_oil", percent: 10 },
      ],
      { superfatPercent: 6, fragrancePercent: 4 }
    ),
  },
  // 11. Shave bar
  {
    slug: "shave-bar",
    name: "Shave Bar",
    summary:
      "Slip-rich shave bar with bentonite clay and high castor for slick lather.",
    description:
      "A shave bar needs three things: slick lather (high castor), creamy bubbles (bentonite clay), and a hard bar (high stearic-acid sources). This recipe stacks all three.",
    tags: ["intermediate", "shave", "vegan", "no_palm"],
    cureWeeks: 6,
    instructions: [
      "Standard CP procedure. Melt cocoa and shea first.",
      "Pre-mix the bentonite clay with a small amount of distilled water and add at trace to avoid clumping.",
      "Pour into individual round moulds (puck shape) for shave bars.",
      "Cure 6 weeks.",
    ],
    notes: [
      "Bentonite at 2–3% gives noticeable slip; >5% can be drying.",
      "Add menthol crystals (0.5%) at thin trace for a cooling shave.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 30 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "shea_butter", percent: 15 },
        { slug: "cocoa_butter", percent: 10 },
        { slug: "castor_oil", percent: 15 },
        { slug: "sweet_almond_oil", percent: 5 },
      ],
      {
        superfatPercent: 6,
        additives: [{ slug: "bentonite_clay", percent: 2 }],
      }
    ),
  },
  // 12. Hot Process Quick
  {
    slug: "hot-process-quick",
    name: "Hot Process — Use in 1 Week",
    summary:
      "Cooked soap that's safe to use in 7 days. Rustic look, full saponification before pour.",
    description:
      "Hot process soap is fully saponified in the pot before you pour it. The advantage: bars are usable in 7 days instead of 4 weeks. The trade-off: the pour is thick and rustic-looking, harder to swirl. Great when you need product fast.",
    tags: ["intermediate", "vegan", "no_palm", "hot_process"],
    cureWeeks: 1,
    instructions: [
      "Standard procedure to bring to trace in a slow cooker.",
      "Cook on low. The mass will go through stages: applesauce, mashed potatoes, vaseline, then translucent.",
      "Total cook time is usually 45–90 minutes depending on cooker.",
      "Test for zap — when it's gone, the soap is done.",
      "Add fragrance and any heat-sensitive additives AFTER cook (off-heat).",
      "Pour into mould — the texture is thick like mashed potato. Pack down firmly.",
      "Unmould after 12–24 hours. Cut. Bars are safe to use in 7 days but firm up further over weeks.",
    ],
    notes: [
      "HP forgives lye-calculation errors slightly because you can see saponification finish.",
      "Add purées (pumpkin, avocado) AFTER cook; they'd burn during the hot phase.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 45 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "shea_butter", percent: 20 },
        { slug: "castor_oil", percent: 5 },
        { slug: "rice_bran_oil", percent: 5 },
      ],
      { fragrancePercent: 3 }
    ),
  },
  // 13. Lavender beginner
  {
    slug: "lavender-beginner",
    name: "Lavender Lullaby",
    summary:
      "Beginner-friendly lavender essential oil bar with a touch of purple clay for colour.",
    description:
      "Lavender is one of the most reliable essential oils for soap — it doesn't accelerate trace, holds its scent through the cure, and pairs beautifully with rose clay for a soft purple-pink colour.",
    tags: ["beginner", "vegan", "no_palm", "fragranced"],
    cureWeeks: 4,
    instructions: [
      "Standard CP procedure (see Balanced Beginner Bar).",
      "Add lavender essential oil at 3% (30g per 1000g oils).",
      "Add rose clay (1.5%) pre-mixed with a small amount of water at light trace.",
      "Pour, unmould 24–48 hours, cure 4 weeks.",
    ],
    notes: [
      "Lavender 40/42 is a soap-safe blend that holds scent well.",
      "True lavender essential oil (Lavandula angustifolia) costs more but has a sweeter note.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 50 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "palm_oil", percent: 20 },
        { slug: "castor_oil", percent: 5 },
      ],
      {
        fragrancePercent: 3,
        additives: [{ slug: "rose_clay", percent: 1.5 }],
      }
    ),
  },
  // 14. Charcoal facial
  {
    slug: "activated-charcoal-bar",
    name: "Activated Charcoal Bar",
    summary:
      "Black bar with activated charcoal — popular for face soap and acne-prone skin marketing.",
    description:
      "Activated charcoal at 1% gives a dramatic black bar with a velvety lather. Popular for face bars and oily-skin marketing. Pairs well with peppermint or tea tree EO for a tingle.",
    tags: ["intermediate", "vegan", "no_palm", "fragranced"],
    cureWeeks: 4,
    instructions: [
      "Standard CP. Pre-mix activated charcoal with a small amount of oil before adding to the batch — adding dry powder causes specks.",
      "Add at light trace.",
      "Add fragrance / EO at light trace as well.",
      "Pour, unmould 24–48 hours, cure 4 weeks.",
    ],
    notes: [
      "Charcoal stains everything (including your face cloth in the early days). Good shower drainage helps.",
      "Avoid claiming it 'detoxifies' — that crosses into drug-territory wording. Stick to sensory claims.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 40 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "shea_butter", percent: 15 },
        { slug: "castor_oil", percent: 5 },
        { slug: "sweet_almond_oil", percent: 15 },
      ],
      {
        fragrancePercent: 3,
        additives: [{ slug: "activated_charcoal", percent: 1 }],
      }
    ),
  },
  // 15. Long-shelf life
  {
    slug: "long-shelf-life",
    name: "Long-Shelf-Life Bar (Anti-DOS)",
    summary:
      "Stable, low-oleic recipe with ROE and EDTA to prevent dreaded orange spots over a 1–2 year shelf life.",
    description:
      "If you're selling at market and bars need to keep for 12+ months without rancidity (DOS — dreaded orange spots), this recipe stacks the deck. Low-oleic oils, ROE antioxidant, and tetrasodium EDTA chelator combine for a stable bar that ages well.",
    tags: ["advanced", "vegan", "no_palm"],
    cureWeeks: 6,
    instructions: [
      "Standard CP procedure.",
      "Pre-mix EDTA in a small amount of warm distilled water. Add to lye-water before combining.",
      "Add ROE to the warm oils before adding lye-water.",
      "Combine, stick-blend, fragrance, pour, unmould, cure 6 weeks.",
    ],
    notes: [
      "Refined / deodorised oils have longer shelf lives than unrefined. Pay for the quality if you're aiming for long shelf life.",
      "Store cured bars in a cool dark place — sunlight and heat trigger DOS too.",
    ],
    recipe: baseInputs(
      [
        { slug: "olive_oil", percent: 25 },
        { slug: "coconut_oil_76", percent: 25 },
        { slug: "palm_oil", percent: 25 },
        { slug: "shea_butter", percent: 15 },
        { slug: "castor_oil", percent: 5 },
        { slug: "high_oleic_safflower_or_sunflower" as never, percent: 5 }, // placeholder — falls through to filter
      ].filter((o) => o.slug !== ("high_oleic_safflower_or_sunflower" as never)),
      {
        superfatPercent: 5,
        additives: [
          { slug: "rosemary_oleoresin", percent: 0.2 },
          { slug: "tetrasodium_edta", percent: 0.2 },
        ],
      }
    ),
  },
];

// Replace the placeholder in #15 with a real oil; the filter above removes
// the placeholder so we add the proper safflower high-oleic separately.
const recipe15 = SOAP_RECIPES.find((r) => r.slug === "long-shelf-life");
if (recipe15) {
  recipe15.recipe.oils = [
    { slug: "olive_oil", percent: 25 },
    { slug: "coconut_oil_76", percent: 25 },
    { slug: "palm_oil", percent: 25 },
    { slug: "shea_butter", percent: 15 },
    { slug: "castor_oil", percent: 5 },
    { slug: "safflower_high_oleic", percent: 5 },
  ];
}

export const RECIPES_BY_SLUG: Record<string, SoapRecipe> = Object.fromEntries(
  SOAP_RECIPES.map((r) => [r.slug, r])
);

export const RECIPE_TAG_LABEL: Record<RecipeTag, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
  vegan: "Vegan",
  no_palm: "Palm-free",
  salt_bar: "Salt bar",
  milk: "Milk",
  liquid: "Liquid soap",
  fragranced: "Fragranced",
  unscented: "Unscented",
  kitchen: "Kitchen",
  shave: "Shave",
  hot_process: "Hot process",
};
