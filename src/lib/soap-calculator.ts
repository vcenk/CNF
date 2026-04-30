/**
 * Soap (lye / saponification) calculator data and math.
 *
 * SAP values and quality estimates are derived from publicly available
 * indie soap-making references (SoapCalc, SoapMaking Friend, Brambleberry).
 * They are provided as a starting point — always cross-reference and
 * lye-test before producing soap to sell.
 */

export type LyeType = "NaOH" | "KOH";

export interface SoapOil {
  slug: string;
  inci: string;
  common: string;
  /** mg NaOH per gram of oil */
  sapNaOH: number;
  /** mg KOH per gram of oil */
  sapKOH: number;
  /** Quality scores 0–100 — typical SoapCalc-style estimates */
  hardness: number;
  cleansing: number;
  conditioning: number;
  bubbly: number;
  creamy: number;
  /** Iodine value (used for INS) */
  iodine: number;
}

export const SOAP_OILS: SoapOil[] = [
  {
    slug: "olive_oil",
    inci: "Olea Europaea (Olive) Fruit Oil",
    common: "Olive oil",
    sapNaOH: 0.134,
    sapKOH: 0.19,
    hardness: 17,
    cleansing: 0,
    conditioning: 82,
    bubbly: 0,
    creamy: 17,
    iodine: 85,
  },
  {
    slug: "coconut_oil_76",
    inci: "Cocos Nucifera (Coconut) Oil",
    common: "Coconut oil (76°)",
    sapNaOH: 0.19,
    sapKOH: 0.266,
    hardness: 79,
    cleansing: 67,
    conditioning: 10,
    bubbly: 67,
    creamy: 12,
    iodine: 10,
  },
  {
    slug: "palm_oil",
    inci: "Elaeis Guineensis (Palm) Oil",
    common: "Palm oil",
    sapNaOH: 0.141,
    sapKOH: 0.197,
    hardness: 50,
    cleansing: 1,
    conditioning: 49,
    bubbly: 1,
    creamy: 49,
    iodine: 53,
  },
  {
    slug: "palm_kernel_oil",
    inci: "Elaeis Guineensis (Palm) Kernel Oil",
    common: "Palm kernel oil",
    sapNaOH: 0.156,
    sapKOH: 0.218,
    hardness: 79,
    cleansing: 70,
    conditioning: 9,
    bubbly: 70,
    creamy: 9,
    iodine: 17,
  },
  {
    slug: "castor_oil",
    inci: "Ricinus Communis (Castor) Seed Oil",
    common: "Castor oil",
    sapNaOH: 0.128,
    sapKOH: 0.18,
    hardness: 16,
    cleansing: 0,
    conditioning: 85,
    bubbly: 95,
    creamy: 1,
    iodine: 86,
  },
  {
    slug: "shea_butter",
    inci: "Butyrospermum Parkii (Shea) Butter",
    common: "Shea butter",
    sapNaOH: 0.128,
    sapKOH: 0.179,
    hardness: 45,
    cleansing: 0,
    conditioning: 53,
    bubbly: 0,
    creamy: 45,
    iodine: 60,
  },
  {
    slug: "cocoa_butter",
    inci: "Theobroma Cacao (Cocoa) Seed Butter",
    common: "Cocoa butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    hardness: 61,
    cleansing: 0,
    conditioning: 38,
    bubbly: 0,
    creamy: 38,
    iodine: 38,
  },
  {
    slug: "mango_butter",
    inci: "Mangifera Indica (Mango) Seed Butter",
    common: "Mango butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    hardness: 56,
    cleansing: 0,
    conditioning: 44,
    bubbly: 0,
    creamy: 44,
    iodine: 47,
  },
  {
    slug: "sweet_almond_oil",
    inci: "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
    common: "Sweet almond oil",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    iodine: 99,
  },
  {
    slug: "avocado_oil",
    inci: "Persea Gratissima (Avocado) Oil",
    common: "Avocado oil",
    sapNaOH: 0.133,
    sapKOH: 0.187,
    hardness: 20,
    cleansing: 0,
    conditioning: 79,
    bubbly: 0,
    creamy: 20,
    iodine: 86,
  },
  {
    slug: "sunflower_oil",
    inci: "Helianthus Annuus (Sunflower) Seed Oil",
    common: "Sunflower oil",
    sapNaOH: 0.134,
    sapKOH: 0.188,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    iodine: 133,
  },
  {
    slug: "rice_bran_oil",
    inci: "Oryza Sativa (Rice) Bran Oil",
    common: "Rice bran oil",
    sapNaOH: 0.128,
    sapKOH: 0.18,
    hardness: 22,
    cleansing: 0,
    conditioning: 73,
    bubbly: 0,
    creamy: 22,
    iodine: 100,
  },
  {
    slug: "hemp_seed_oil",
    inci: "Cannabis Sativa Seed Oil",
    common: "Hemp seed oil",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    iodine: 165,
  },
  {
    slug: "apricot_kernel_oil",
    inci: "Prunus Armeniaca (Apricot) Kernel Oil",
    common: "Apricot kernel oil",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    iodine: 105,
  },
  {
    slug: "argan_oil",
    inci: "Argania Spinosa Kernel Oil",
    common: "Argan oil",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    hardness: 19,
    cleansing: 0,
    conditioning: 80,
    bubbly: 0,
    creamy: 19,
    iodine: 100,
  },
  {
    slug: "babassu_oil",
    inci: "Orbignya Oleifera Seed Oil",
    common: "Babassu oil",
    sapNaOH: 0.176,
    sapKOH: 0.246,
    hardness: 79,
    cleansing: 64,
    conditioning: 13,
    bubbly: 64,
    creamy: 16,
    iodine: 16,
  },
  {
    slug: "grapeseed_oil",
    inci: "Vitis Vinifera (Grape) Seed Oil",
    common: "Grapeseed oil",
    sapNaOH: 0.126,
    sapKOH: 0.177,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    iodine: 131,
  },
  {
    slug: "macadamia_oil",
    inci: "Macadamia Ternifolia Seed Oil",
    common: "Macadamia nut oil",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    hardness: 19,
    cleansing: 0,
    conditioning: 80,
    bubbly: 0,
    creamy: 19,
    iodine: 76,
  },
  {
    slug: "lard",
    inci: "Lard (Pig Tallow)",
    common: "Lard",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    hardness: 41,
    cleansing: 1,
    conditioning: 52,
    bubbly: 1,
    creamy: 47,
    iodine: 57,
  },
  {
    slug: "tallow_beef",
    inci: "Bos Taurus Tallow",
    common: "Beef tallow",
    sapNaOH: 0.141,
    sapKOH: 0.197,
    hardness: 58,
    cleansing: 1,
    conditioning: 41,
    bubbly: 1,
    creamy: 41,
    iodine: 50,
  },
  {
    slug: "stearic_acid",
    inci: "Stearic Acid",
    common: "Stearic acid",
    sapNaOH: 0.143,
    sapKOH: 0.2,
    hardness: 100,
    cleansing: 0,
    conditioning: 0,
    bubbly: 0,
    creamy: 0,
    iodine: 0,
  },
  {
    slug: "lanolin",
    inci: "Lanolin",
    common: "Lanolin",
    sapNaOH: 0.075,
    sapKOH: 0.105,
    hardness: 19,
    cleansing: 0,
    conditioning: 81,
    bubbly: 0,
    creamy: 19,
    iodine: 30,
  },
  {
    slug: "jojoba_oil",
    inci: "Simmondsia Chinensis (Jojoba) Seed Oil",
    common: "Jojoba oil",
    sapNaOH: 0.069,
    sapKOH: 0.097,
    hardness: 10,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 10,
    iodine: 82,
  },
  {
    slug: "beeswax",
    inci: "Cera Alba (Beeswax)",
    common: "Beeswax",
    sapNaOH: 0.069,
    sapKOH: 0.097,
    hardness: 40,
    cleansing: 0,
    conditioning: 0,
    bubbly: 0,
    creamy: 0,
    iodine: 9,
  },
  {
    slug: "kokum_butter",
    inci: "Garcinia Indica Seed Butter",
    common: "Kokum butter",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    hardness: 65,
    cleansing: 0,
    conditioning: 35,
    bubbly: 0,
    creamy: 35,
    iodine: 38,
  },
  {
    slug: "tamanu_oil",
    inci: "Calophyllum Inophyllum Seed Oil",
    common: "Tamanu oil",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    hardness: 27,
    cleansing: 0,
    conditioning: 73,
    bubbly: 0,
    creamy: 27,
    iodine: 92,
  },
  {
    slug: "neem_oil",
    inci: "Melia Azadirachta Seed Oil",
    common: "Neem oil",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    hardness: 36,
    cleansing: 0,
    conditioning: 64,
    bubbly: 0,
    creamy: 36,
    iodine: 71,
  },
  {
    slug: "wheat_germ_oil",
    inci: "Triticum Vulgare (Wheat) Germ Oil",
    common: "Wheat germ oil",
    sapNaOH: 0.131,
    sapKOH: 0.184,
    hardness: 8,
    cleansing: 0,
    conditioning: 91,
    bubbly: 0,
    creamy: 8,
    iodine: 128,
  },
  {
    slug: "soybean_oil",
    inci: "Glycine Soja (Soybean) Oil",
    common: "Soybean oil",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    hardness: 16,
    cleansing: 0,
    conditioning: 84,
    bubbly: 0,
    creamy: 16,
    iodine: 130,
  },
  {
    slug: "canola_oil",
    inci: "Brassica Napus (Canola) Seed Oil",
    common: "Canola oil",
    sapNaOH: 0.124,
    sapKOH: 0.174,
    hardness: 6,
    cleansing: 0,
    conditioning: 93,
    bubbly: 0,
    creamy: 6,
    iodine: 110,
  },
];

/** Quick lookup map by slug */
export const SOAP_OILS_BY_SLUG: Record<string, SoapOil> = Object.fromEntries(
  SOAP_OILS.map((o) => [o.slug, o])
);

export interface SoapInputOil {
  slug: string;
  /** Percentage of total oil weight (0–100) */
  percent: number;
}

export interface SoapInput {
  oils: SoapInputOil[];
  totalOilWeightG: number;
  lyeType: LyeType;
  /** Superfat percentage (0–20). 5–8% is typical. */
  superfatPercent: number;
  /** Water as a percentage of oil weight (typical 33–38). */
  waterRatioPercent: number;
}

export interface SoapQualityScore {
  label: string;
  value: number;
  recommendedMin: number;
  recommendedMax: number;
  inRange: "low" | "ok" | "high";
}

export interface SoapResult {
  totalOilWeightG: number;
  /** Lye amount in grams */
  lyeG: number;
  /** Water amount in grams */
  waterG: number;
  /** Computed weights per oil in grams */
  oilLines: Array<{
    slug: string;
    common: string;
    inci: string;
    percent: number;
    weightG: number;
  }>;
  /** Quality score panel */
  qualities: SoapQualityScore[];
  /** INS value (target ~ 136-170) */
  ins: number | null;
  /** Iodine value (target < 70 for hard bars, < 100 acceptable) */
  iodine: number | null;
  warnings: string[];
}

const RECOMMENDED_RANGES: Record<string, [number, number]> = {
  Hardness: [29, 54],
  Cleansing: [12, 22],
  Conditioning: [44, 69],
  Bubbly: [14, 46],
  Creamy: [16, 48],
};

function classify(value: number, [min, max]: [number, number]): "low" | "ok" | "high" {
  if (value < min) return "low";
  if (value > max) return "high";
  return "ok";
}

export function calculateSoap(input: SoapInput): SoapResult {
  const warnings: string[] = [];

  const totalOil = input.totalOilWeightG > 0 ? input.totalOilWeightG : 1000;
  const totalPercent = input.oils.reduce((s, o) => s + (o.percent || 0), 0);

  if (input.oils.length === 0) {
    warnings.push("Add at least one oil to compute lye and water.");
  } else if (Math.abs(totalPercent - 100) > 0.5) {
    warnings.push(
      `Oil percentages total ${totalPercent.toFixed(1)}%. Should sum to 100%.`
    );
  }

  // Per-oil weights
  const oilLines = input.oils
    .map((o) => {
      const def = SOAP_OILS_BY_SLUG[o.slug];
      if (!def) return null;
      const weightG = (o.percent / 100) * totalOil;
      return {
        slug: o.slug,
        common: def.common,
        inci: def.inci,
        percent: o.percent,
        weightG,
      };
    })
    .filter(Boolean) as SoapResult["oilLines"];

  // Lye calc — sum(weight * SAP) * (1 - superfat)
  const sapKey: keyof Pick<SoapOil, "sapNaOH" | "sapKOH"> =
    input.lyeType === "KOH" ? "sapKOH" : "sapNaOH";
  const superfat = Math.max(0, Math.min(20, input.superfatPercent ?? 5)) / 100;
  let lyeRaw = 0;
  for (const line of oilLines) {
    const def = SOAP_OILS_BY_SLUG[line.slug];
    if (!def) continue;
    lyeRaw += line.weightG * def[sapKey];
  }
  const lyeG = lyeRaw * (1 - superfat);

  // Water calc
  const waterRatio = Math.max(15, Math.min(60, input.waterRatioPercent ?? 33)) / 100;
  const waterG = totalOil * waterRatio;

  // Quality calc — weighted average of each oil's quality times its percentage
  function weighted(prop: keyof Pick<SoapOil, "hardness" | "cleansing" | "conditioning" | "bubbly" | "creamy" | "iodine">): number {
    let sum = 0;
    let weight = 0;
    for (const line of oilLines) {
      const def = SOAP_OILS_BY_SLUG[line.slug];
      if (!def) continue;
      sum += def[prop] * line.percent;
      weight += line.percent;
    }
    return weight > 0 ? sum / weight : 0;
  }

  const hardness = weighted("hardness");
  const cleansing = weighted("cleansing");
  const conditioning = weighted("conditioning");
  const bubbly = weighted("bubbly");
  const creamy = weighted("creamy");
  const iodine = weighted("iodine");
  const ins = oilLines.length > 0 ? hardness + (130 - iodine) : null;

  const qualities: SoapQualityScore[] = [
    { label: "Hardness", value: hardness, recommendedMin: 29, recommendedMax: 54, inRange: classify(hardness, RECOMMENDED_RANGES.Hardness) },
    { label: "Cleansing", value: cleansing, recommendedMin: 12, recommendedMax: 22, inRange: classify(cleansing, RECOMMENDED_RANGES.Cleansing) },
    { label: "Conditioning", value: conditioning, recommendedMin: 44, recommendedMax: 69, inRange: classify(conditioning, RECOMMENDED_RANGES.Conditioning) },
    { label: "Bubbly", value: bubbly, recommendedMin: 14, recommendedMax: 46, inRange: classify(bubbly, RECOMMENDED_RANGES.Bubbly) },
    { label: "Creamy", value: creamy, recommendedMin: 16, recommendedMax: 48, inRange: classify(creamy, RECOMMENDED_RANGES.Creamy) },
  ];

  // Soft warnings on oils-specific issues
  if (oilLines.some((l) => l.slug === "coconut_oil_76" && l.percent > 30)) {
    warnings.push(
      "Coconut oil over 30% can be drying. Consider raising superfat to 20% if you go higher."
    );
  }
  if (oilLines.some((l) => l.slug === "castor_oil" && l.percent > 10)) {
    warnings.push(
      "Castor oil over 10% can produce a soft, slow-tracing soap. Most makers stay between 3–8%."
    );
  }
  if (input.lyeType === "NaOH" && oilLines.length > 0) {
    if (hardness < 29) {
      warnings.push(
        `Hardness score ${hardness.toFixed(0)} is below the ${RECOMMENDED_RANGES.Hardness[0]} range — bar may be soft.`
      );
    }
    if (cleansing > 22) {
      warnings.push(
        `Cleansing score ${cleansing.toFixed(0)} is above the ${RECOMMENDED_RANGES.Cleansing[1]} range — bar may be drying.`
      );
    }
  }
  if (superfat * 100 < 1) {
    warnings.push(
      "Superfat under 1% leaves no margin for measurement error. Most makers use 5–8%."
    );
  }
  if (superfat * 100 > 12) {
    warnings.push(
      "Superfat over 12% can leave free oils that go rancid (DOS — dreaded orange spots) over time."
    );
  }

  return {
    totalOilWeightG: totalOil,
    lyeG,
    waterG,
    oilLines,
    qualities,
    ins: ins !== null ? Math.round(ins) : null,
    iodine: oilLines.length > 0 ? Math.round(iodine) : null,
    warnings,
  };
}
