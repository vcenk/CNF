/**
 * Soap (lye / saponification) calculator data and math.
 *
 * SAP and fatty-acid values are derived from publicly available indie
 * soap-making references (SoapCalc, SoapMaking Friend, Brambleberry).
 * They are starting points — always cross-reference with your supplier's
 * spec sheet and lye-test before producing soap to sell.
 */

// =====================================================================
// Types
// =====================================================================

export type LyeType = "NaOH" | "KOH";

export type WeightUnit = "g" | "oz" | "lb" | "kg";

export type WaterMethod =
  | "water_percent_oils" // water as % of oil weight
  | "lye_concentration" // lye as % of (lye+water) total
  | "water_lye_ratio"; // water-to-lye ratio (e.g. 1.5)

export interface FattyAcidProfile {
  /** Saturated */
  lauric: number;
  myristic: number;
  palmitic: number;
  stearic: number;
  /** Monounsaturated */
  ricinoleic: number;
  oleic: number;
  /** Polyunsaturated */
  linoleic: number;
  linolenic: number;
}

export interface SoapOil {
  slug: string;
  inci: string;
  common: string;
  /** mg NaOH per gram of oil */
  sapNaOH: number;
  /** mg KOH per gram of oil */
  sapKOH: number;
  /** Iodine value */
  iodine: number;
  /** Quality scores 0–100 (SoapCalc-compatible) */
  hardness: number;
  cleansing: number;
  conditioning: number;
  bubbly: number;
  creamy: number;
  /** Fatty acid percentages (typically 0–80 each, sum near 100) */
  fa: FattyAcidProfile;
  /** Optional category for grouping in the picker */
  category:
    | "base_liquid"
    | "base_hard"
    | "butter"
    | "exotic"
    | "animal"
    | "wax_specialty";
}

export interface SoapInputOil {
  slug: string;
  /** Percentage of total oil weight (0–100) */
  percent: number;
}

export interface SoapInputAdditive {
  slug: string;
  /** Percentage of total oil weight (0–20 typical) */
  percent: number;
}

export interface SoapInput {
  oils: SoapInputOil[];
  totalOilWeightG: number;
  lyeType: LyeType;
  /** Lye purity, 90 or 99 typical for NaOH; 90 typical for KOH */
  lyePurityPercent: number;
  /** Superfat percentage (0–20). 5–8% is typical. */
  superfatPercent: number;
  /** Water configuration */
  waterMethod: WaterMethod;
  waterPercentOils: number; // used when waterMethod === "water_percent_oils"
  lyeConcentrationPercent: number; // used when waterMethod === "lye_concentration"
  waterLyeRatio: number; // used when waterMethod === "water_lye_ratio"
  /** Fragrance / essential oil percentage of oil weight (0–8 typical) */
  fragrancePercent: number;
  /** Additives (clay, honey, oats, sugar, salt, etc.) */
  additives: SoapInputAdditive[];
}

export interface SoapQualityScore {
  label: string;
  value: number;
  recommendedMin: number;
  recommendedMax: number;
  inRange: "low" | "ok" | "high";
}

export interface FattyAcidBreakdown {
  /** All FAs as a percentage of total oils */
  values: FattyAcidProfile;
  saturated: number; // sum of saturated FAs
  unsaturated: number; // sum of unsaturated FAs
  satRatio: number; // saturated / unsaturated
}

export interface SoapResult {
  totalOilWeightG: number;
  /** Lye amount in grams (after superfat + purity) */
  lyeG: number;
  /** Water amount in grams */
  waterG: number;
  /** Total batch weight (oils + lye + water + fragrance + additives) */
  totalBatchG: number;
  /** Computed weights per oil in grams */
  oilLines: Array<{
    slug: string;
    common: string;
    inci: string;
    percent: number;
    weightG: number;
  }>;
  /** Computed weights per additive in grams */
  additiveLines: Array<{
    slug: string;
    label: string;
    percent: number;
    weightG: number;
    typicalRange: string;
  }>;
  /** Fragrance / EO weight in grams */
  fragranceG: number;
  /** Quality score panel */
  qualities: SoapQualityScore[];
  /** Iodine value (computed weighted) */
  iodine: number | null;
  /** INS value */
  ins: number | null;
  /** Fatty acid breakdown */
  fattyAcids: FattyAcidBreakdown | null;
  warnings: string[];
}

export interface AdditiveDef {
  slug: string;
  label: string;
  typicalMin: number;
  typicalMax: number;
  notes: string;
}

// =====================================================================
// Oil database (~80 oils)
// =====================================================================

export const SOAP_OILS: SoapOil[] = [
  // ============ LIQUID BASE OILS ============
  {
    slug: "olive_oil",
    inci: "Olea Europaea (Olive) Fruit Oil",
    common: "Olive oil",
    category: "base_liquid",
    sapNaOH: 0.134,
    sapKOH: 0.19,
    iodine: 85,
    hardness: 17,
    cleansing: 0,
    conditioning: 82,
    bubbly: 0,
    creamy: 17,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 3, ricinoleic: 0, oleic: 69, linoleic: 12, linolenic: 1 },
  },
  {
    slug: "olive_pomace_oil",
    inci: "Olea Europaea (Olive) Pomace Oil",
    common: "Olive pomace oil",
    category: "base_liquid",
    sapNaOH: 0.134,
    sapKOH: 0.19,
    iodine: 85,
    hardness: 17,
    cleansing: 0,
    conditioning: 82,
    bubbly: 0,
    creamy: 17,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 3, ricinoleic: 0, oleic: 69, linoleic: 12, linolenic: 1 },
  },
  {
    slug: "sunflower_oil",
    inci: "Helianthus Annuus (Sunflower) Seed Oil",
    common: "Sunflower oil",
    category: "base_liquid",
    sapNaOH: 0.134,
    sapKOH: 0.188,
    iodine: 133,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 4, ricinoleic: 0, oleic: 19, linoleic: 68, linolenic: 1 },
  },
  {
    slug: "sunflower_high_oleic",
    inci: "Helianthus Annuus (Sunflower) Seed Oil (High Oleic)",
    common: "Sunflower oil (high oleic)",
    category: "base_liquid",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    iodine: 80,
    hardness: 16,
    cleansing: 0,
    conditioning: 84,
    bubbly: 0,
    creamy: 16,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 4, ricinoleic: 0, oleic: 80, linoleic: 11, linolenic: 0 },
  },
  {
    slug: "safflower_oil",
    inci: "Carthamus Tinctorius (Safflower) Seed Oil",
    common: "Safflower oil",
    category: "base_liquid",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 141,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 2, ricinoleic: 0, oleic: 14, linoleic: 76, linolenic: 0 },
  },
  {
    slug: "safflower_high_oleic",
    inci: "Carthamus Tinctorius (Safflower) Seed Oil (High Oleic)",
    common: "Safflower oil (high oleic)",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 90,
    hardness: 14,
    cleansing: 0,
    conditioning: 86,
    bubbly: 0,
    creamy: 14,
    fa: { lauric: 0, myristic: 0, palmitic: 5, stearic: 2, ricinoleic: 0, oleic: 75, linoleic: 17, linolenic: 0 },
  },
  {
    slug: "canola_oil",
    inci: "Brassica Napus (Canola) Seed Oil",
    common: "Canola oil",
    category: "base_liquid",
    sapNaOH: 0.124,
    sapKOH: 0.174,
    iodine: 110,
    hardness: 6,
    cleansing: 0,
    conditioning: 93,
    bubbly: 0,
    creamy: 6,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 2, ricinoleic: 0, oleic: 62, linoleic: 19, linolenic: 9 },
  },
  {
    slug: "soybean_oil",
    inci: "Glycine Soja (Soybean) Oil",
    common: "Soybean oil",
    category: "base_liquid",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 130,
    hardness: 16,
    cleansing: 0,
    conditioning: 84,
    bubbly: 0,
    creamy: 16,
    fa: { lauric: 0, myristic: 0, palmitic: 11, stearic: 4, ricinoleic: 0, oleic: 23, linoleic: 53, linolenic: 7 },
  },
  {
    slug: "rice_bran_oil",
    inci: "Oryza Sativa (Rice) Bran Oil",
    common: "Rice bran oil",
    category: "base_liquid",
    sapNaOH: 0.128,
    sapKOH: 0.18,
    iodine: 100,
    hardness: 22,
    cleansing: 0,
    conditioning: 73,
    bubbly: 0,
    creamy: 22,
    fa: { lauric: 0, myristic: 0, palmitic: 16, stearic: 2, ricinoleic: 0, oleic: 42, linoleic: 37, linolenic: 1 },
  },
  {
    slug: "corn_oil",
    inci: "Zea Mays (Corn) Oil",
    common: "Corn oil",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 119,
    hardness: 13,
    cleansing: 0,
    conditioning: 87,
    bubbly: 0,
    creamy: 13,
    fa: { lauric: 0, myristic: 0, palmitic: 11, stearic: 2, ricinoleic: 0, oleic: 28, linoleic: 58, linolenic: 1 },
  },
  {
    slug: "peanut_oil",
    inci: "Arachis Hypogaea (Peanut) Oil",
    common: "Peanut oil",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.191,
    iodine: 92,
    hardness: 19,
    cleansing: 0,
    conditioning: 80,
    bubbly: 0,
    creamy: 19,
    fa: { lauric: 0, myristic: 0, palmitic: 11, stearic: 2, ricinoleic: 0, oleic: 47, linoleic: 32, linolenic: 0 },
  },
  {
    slug: "sesame_oil",
    inci: "Sesamum Indicum (Sesame) Seed Oil",
    common: "Sesame oil",
    category: "base_liquid",
    sapNaOH: 0.133,
    sapKOH: 0.187,
    iodine: 110,
    hardness: 14,
    cleansing: 0,
    conditioning: 86,
    bubbly: 0,
    creamy: 14,
    fa: { lauric: 0, myristic: 0, palmitic: 9, stearic: 4, ricinoleic: 0, oleic: 41, linoleic: 45, linolenic: 0 },
  },
  // ============ HARD BASE OILS ============
  {
    slug: "coconut_oil_76",
    inci: "Cocos Nucifera (Coconut) Oil",
    common: "Coconut oil 76°",
    category: "base_hard",
    sapNaOH: 0.19,
    sapKOH: 0.266,
    iodine: 10,
    hardness: 79,
    cleansing: 67,
    conditioning: 10,
    bubbly: 67,
    creamy: 12,
    fa: { lauric: 48, myristic: 19, palmitic: 9, stearic: 3, ricinoleic: 0, oleic: 7, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "coconut_oil_92",
    inci: "Cocos Nucifera (Coconut) Oil (92° melt)",
    common: "Coconut oil 92°",
    category: "base_hard",
    sapNaOH: 0.193,
    sapKOH: 0.27,
    iodine: 8,
    hardness: 79,
    cleansing: 67,
    conditioning: 10,
    bubbly: 67,
    creamy: 12,
    fa: { lauric: 48, myristic: 19, palmitic: 9, stearic: 3, ricinoleic: 0, oleic: 7, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "coconut_oil_fractionated",
    inci: "Caprylic/Capric Triglyceride",
    common: "Fractionated coconut oil",
    category: "base_hard",
    sapNaOH: 0.232,
    sapKOH: 0.325,
    iodine: 0,
    hardness: 100,
    cleansing: 100,
    conditioning: 0,
    bubbly: 100,
    creamy: 0,
    fa: { lauric: 0, myristic: 0, palmitic: 0, stearic: 0, ricinoleic: 0, oleic: 0, linoleic: 0, linolenic: 0 },
  },
  {
    slug: "palm_oil",
    inci: "Elaeis Guineensis (Palm) Oil",
    common: "Palm oil",
    category: "base_hard",
    sapNaOH: 0.141,
    sapKOH: 0.197,
    iodine: 53,
    hardness: 50,
    cleansing: 1,
    conditioning: 49,
    bubbly: 1,
    creamy: 49,
    fa: { lauric: 0, myristic: 1, palmitic: 44, stearic: 5, ricinoleic: 0, oleic: 39, linoleic: 10, linolenic: 0 },
  },
  {
    slug: "palm_kernel_oil",
    inci: "Elaeis Guineensis (Palm) Kernel Oil",
    common: "Palm kernel oil",
    category: "base_hard",
    sapNaOH: 0.156,
    sapKOH: 0.218,
    iodine: 17,
    hardness: 79,
    cleansing: 70,
    conditioning: 9,
    bubbly: 70,
    creamy: 9,
    fa: { lauric: 48, myristic: 16, palmitic: 8, stearic: 3, ricinoleic: 0, oleic: 15, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "babassu_oil",
    inci: "Orbignya Oleifera Seed Oil",
    common: "Babassu oil",
    category: "base_hard",
    sapNaOH: 0.176,
    sapKOH: 0.246,
    iodine: 16,
    hardness: 79,
    cleansing: 64,
    conditioning: 13,
    bubbly: 64,
    creamy: 16,
    fa: { lauric: 50, myristic: 20, palmitic: 11, stearic: 4, ricinoleic: 0, oleic: 10, linoleic: 2, linolenic: 0 },
  },
  // ============ CASTOR ============
  {
    slug: "castor_oil",
    inci: "Ricinus Communis (Castor) Seed Oil",
    common: "Castor oil",
    category: "base_liquid",
    sapNaOH: 0.128,
    sapKOH: 0.18,
    iodine: 86,
    hardness: 16,
    cleansing: 0,
    conditioning: 85,
    bubbly: 95,
    creamy: 1,
    fa: { lauric: 0, myristic: 0, palmitic: 1, stearic: 1, ricinoleic: 90, oleic: 4, linoleic: 4, linolenic: 0 },
  },
  // ============ BUTTERS ============
  {
    slug: "shea_butter",
    inci: "Butyrospermum Parkii (Shea) Butter",
    common: "Shea butter",
    category: "butter",
    sapNaOH: 0.128,
    sapKOH: 0.179,
    iodine: 60,
    hardness: 45,
    cleansing: 0,
    conditioning: 53,
    bubbly: 0,
    creamy: 45,
    fa: { lauric: 0, myristic: 0, palmitic: 5, stearic: 41, ricinoleic: 0, oleic: 47, linoleic: 6, linolenic: 0 },
  },
  {
    slug: "cocoa_butter",
    inci: "Theobroma Cacao (Cocoa) Seed Butter",
    common: "Cocoa butter",
    category: "butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 38,
    hardness: 61,
    cleansing: 0,
    conditioning: 38,
    bubbly: 0,
    creamy: 38,
    fa: { lauric: 0, myristic: 0, palmitic: 28, stearic: 33, ricinoleic: 0, oleic: 35, linoleic: 3, linolenic: 0 },
  },
  {
    slug: "mango_butter",
    inci: "Mangifera Indica (Mango) Seed Butter",
    common: "Mango butter",
    category: "butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 47,
    hardness: 56,
    cleansing: 0,
    conditioning: 44,
    bubbly: 0,
    creamy: 44,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 42, ricinoleic: 0, oleic: 44, linoleic: 4, linolenic: 0 },
  },
  {
    slug: "kokum_butter",
    inci: "Garcinia Indica Seed Butter",
    common: "Kokum butter",
    category: "butter",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    iodine: 38,
    hardness: 65,
    cleansing: 0,
    conditioning: 35,
    bubbly: 0,
    creamy: 35,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 56, ricinoleic: 0, oleic: 39, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "illipe_butter",
    inci: "Shorea Stenoptera Seed Butter",
    common: "Illipe butter",
    category: "butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 35,
    hardness: 64,
    cleansing: 0,
    conditioning: 36,
    bubbly: 0,
    creamy: 36,
    fa: { lauric: 0, myristic: 0, palmitic: 17, stearic: 45, ricinoleic: 0, oleic: 35, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "sal_butter",
    inci: "Shorea Robusta Seed Butter",
    common: "Sal butter",
    category: "butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 41,
    hardness: 65,
    cleansing: 0,
    conditioning: 35,
    bubbly: 0,
    creamy: 35,
    fa: { lauric: 0, myristic: 0, palmitic: 5, stearic: 45, ricinoleic: 0, oleic: 41, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "mowrah_butter",
    inci: "Madhuca Latifolia Seed Butter",
    common: "Mowrah butter",
    category: "butter",
    sapNaOH: 0.187,
    sapKOH: 0.262,
    iodine: 60,
    hardness: 47,
    cleansing: 0,
    conditioning: 53,
    bubbly: 0,
    creamy: 47,
    fa: { lauric: 0, myristic: 0, palmitic: 24, stearic: 21, ricinoleic: 0, oleic: 38, linoleic: 16, linolenic: 0 },
  },
  {
    slug: "cupuacu_butter",
    inci: "Theobroma Grandiflorum Seed Butter",
    common: "Cupuaçu butter",
    category: "butter",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 47,
    hardness: 53,
    cleansing: 0,
    conditioning: 47,
    bubbly: 0,
    creamy: 47,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 33, ricinoleic: 0, oleic: 43, linoleic: 4, linolenic: 0 },
  },
  {
    slug: "murumuru_butter",
    inci: "Astrocaryum Murumuru Seed Butter",
    common: "Murumuru butter",
    category: "butter",
    sapNaOH: 0.176,
    sapKOH: 0.247,
    iodine: 12,
    hardness: 80,
    cleansing: 60,
    conditioning: 18,
    bubbly: 60,
    creamy: 20,
    fa: { lauric: 47, myristic: 26, palmitic: 6, stearic: 4, ricinoleic: 0, oleic: 14, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "tucuma_butter",
    inci: "Astrocaryum Tucuma Seed Butter",
    common: "Tucuma butter",
    category: "butter",
    sapNaOH: 0.183,
    sapKOH: 0.256,
    iodine: 14,
    hardness: 79,
    cleansing: 58,
    conditioning: 20,
    bubbly: 58,
    creamy: 21,
    fa: { lauric: 49, myristic: 22, palmitic: 8, stearic: 3, ricinoleic: 0, oleic: 14, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "kpangnan_butter",
    inci: "Pentadesma Butyracea Seed Butter",
    common: "Kpangnan butter",
    category: "butter",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    iodine: 38,
    hardness: 60,
    cleansing: 0,
    conditioning: 39,
    bubbly: 0,
    creamy: 39,
    fa: { lauric: 0, myristic: 0, palmitic: 3, stearic: 49, ricinoleic: 0, oleic: 46, linoleic: 1, linolenic: 0 },
  },
  // ============ SOFT / LIGHT OILS ============
  {
    slug: "sweet_almond_oil",
    inci: "Prunus Amygdalus Dulcis (Sweet Almond) Oil",
    common: "Sweet almond oil",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 99,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 2, ricinoleic: 0, oleic: 70, linoleic: 20, linolenic: 0 },
  },
  {
    slug: "avocado_oil",
    inci: "Persea Gratissima (Avocado) Oil",
    common: "Avocado oil",
    category: "base_liquid",
    sapNaOH: 0.133,
    sapKOH: 0.187,
    iodine: 86,
    hardness: 20,
    cleansing: 0,
    conditioning: 79,
    bubbly: 0,
    creamy: 20,
    fa: { lauric: 0, myristic: 0, palmitic: 16, stearic: 1, ricinoleic: 0, oleic: 65, linoleic: 13, linolenic: 1 },
  },
  {
    slug: "apricot_kernel_oil",
    inci: "Prunus Armeniaca (Apricot) Kernel Oil",
    common: "Apricot kernel oil",
    category: "base_liquid",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    iodine: 105,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 6, stearic: 1, ricinoleic: 0, oleic: 64, linoleic: 28, linolenic: 0 },
  },
  {
    slug: "peach_kernel_oil",
    inci: "Prunus Persica (Peach) Kernel Oil",
    common: "Peach kernel oil",
    category: "base_liquid",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 110,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 6, stearic: 2, ricinoleic: 0, oleic: 60, linoleic: 31, linolenic: 0 },
  },
  {
    slug: "grapeseed_oil",
    inci: "Vitis Vinifera (Grape) Seed Oil",
    common: "Grapeseed oil",
    category: "base_liquid",
    sapNaOH: 0.126,
    sapKOH: 0.177,
    iodine: 131,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 4, ricinoleic: 0, oleic: 16, linoleic: 71, linolenic: 0 },
  },
  {
    slug: "hazelnut_oil",
    inci: "Corylus Avellana (Hazelnut) Seed Oil",
    common: "Hazelnut oil",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 95,
    hardness: 8,
    cleansing: 0,
    conditioning: 91,
    bubbly: 0,
    creamy: 8,
    fa: { lauric: 0, myristic: 0, palmitic: 5, stearic: 2, ricinoleic: 0, oleic: 78, linoleic: 13, linolenic: 0 },
  },
  {
    slug: "macadamia_oil",
    inci: "Macadamia Ternifolia Seed Oil",
    common: "Macadamia nut oil",
    category: "base_liquid",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 76,
    hardness: 19,
    cleansing: 0,
    conditioning: 80,
    bubbly: 0,
    creamy: 19,
    fa: { lauric: 0, myristic: 1, palmitic: 9, stearic: 3, ricinoleic: 0, oleic: 60, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "argan_oil",
    inci: "Argania Spinosa Kernel Oil",
    common: "Argan oil",
    category: "base_liquid",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 100,
    hardness: 19,
    cleansing: 0,
    conditioning: 80,
    bubbly: 0,
    creamy: 19,
    fa: { lauric: 0, myristic: 0, palmitic: 13, stearic: 6, ricinoleic: 0, oleic: 47, linoleic: 33, linolenic: 0 },
  },
  {
    slug: "camellia_oil",
    inci: "Camellia Oleifera Seed Oil",
    common: "Camellia (tea) seed oil",
    category: "base_liquid",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 88,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    fa: { lauric: 0, myristic: 0, palmitic: 9, stearic: 2, ricinoleic: 0, oleic: 80, linoleic: 8, linolenic: 0 },
  },
  // ============ SPECIALTY / EXOTIC ============
  {
    slug: "hemp_seed_oil",
    inci: "Cannabis Sativa Seed Oil",
    common: "Hemp seed oil",
    category: "exotic",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 165,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    fa: { lauric: 0, myristic: 0, palmitic: 6, stearic: 2, ricinoleic: 0, oleic: 11, linoleic: 56, linolenic: 22 },
  },
  {
    slug: "rosehip_oil",
    inci: "Rosa Canina Fruit Oil",
    common: "Rosehip seed oil",
    category: "exotic",
    sapNaOH: 0.133,
    sapKOH: 0.187,
    iodine: 190,
    hardness: 7,
    cleansing: 0,
    conditioning: 92,
    bubbly: 0,
    creamy: 7,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 2, ricinoleic: 0, oleic: 14, linoleic: 47, linolenic: 32 },
  },
  {
    slug: "evening_primrose_oil",
    inci: "Oenothera Biennis (Evening Primrose) Oil",
    common: "Evening primrose oil",
    category: "exotic",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 152,
    hardness: 10,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 10,
    fa: { lauric: 0, myristic: 0, palmitic: 6, stearic: 2, ricinoleic: 0, oleic: 9, linoleic: 73, linolenic: 9 },
  },
  {
    slug: "borage_oil",
    inci: "Borago Officinalis Seed Oil",
    common: "Borage seed oil",
    category: "exotic",
    sapNaOH: 0.136,
    sapKOH: 0.19,
    iodine: 150,
    hardness: 10,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 10,
    fa: { lauric: 0, myristic: 0, palmitic: 10, stearic: 4, ricinoleic: 0, oleic: 17, linoleic: 38, linolenic: 23 },
  },
  {
    slug: "neem_oil",
    inci: "Melia Azadirachta Seed Oil",
    common: "Neem oil",
    category: "exotic",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 71,
    hardness: 36,
    cleansing: 0,
    conditioning: 64,
    bubbly: 0,
    creamy: 36,
    fa: { lauric: 0, myristic: 0, palmitic: 18, stearic: 18, ricinoleic: 0, oleic: 50, linoleic: 13, linolenic: 0 },
  },
  {
    slug: "tamanu_oil",
    inci: "Calophyllum Inophyllum Seed Oil",
    common: "Tamanu oil",
    category: "exotic",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 92,
    hardness: 27,
    cleansing: 0,
    conditioning: 73,
    bubbly: 0,
    creamy: 27,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 13, ricinoleic: 0, oleic: 49, linoleic: 21, linolenic: 0 },
  },
  {
    slug: "wheat_germ_oil",
    inci: "Triticum Vulgare (Wheat) Germ Oil",
    common: "Wheat germ oil",
    category: "exotic",
    sapNaOH: 0.131,
    sapKOH: 0.184,
    iodine: 128,
    hardness: 8,
    cleansing: 0,
    conditioning: 91,
    bubbly: 0,
    creamy: 8,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 1, ricinoleic: 0, oleic: 16, linoleic: 56, linolenic: 6 },
  },
  {
    slug: "pumpkin_seed_oil",
    inci: "Cucurbita Pepo (Pumpkin) Seed Oil",
    common: "Pumpkin seed oil",
    category: "exotic",
    sapNaOH: 0.134,
    sapKOH: 0.188,
    iodine: 116,
    hardness: 12,
    cleansing: 0,
    conditioning: 88,
    bubbly: 0,
    creamy: 12,
    fa: { lauric: 0, myristic: 0, palmitic: 12, stearic: 6, ricinoleic: 0, oleic: 30, linoleic: 50, linolenic: 0 },
  },
  {
    slug: "moringa_oil",
    inci: "Moringa Oleifera Seed Oil",
    common: "Moringa oil",
    category: "exotic",
    sapNaOH: 0.131,
    sapKOH: 0.184,
    iodine: 70,
    hardness: 21,
    cleansing: 0,
    conditioning: 78,
    bubbly: 0,
    creamy: 21,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 5, ricinoleic: 0, oleic: 73, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "meadowfoam_oil",
    inci: "Limnanthes Alba (Meadowfoam) Seed Oil",
    common: "Meadowfoam oil",
    category: "exotic",
    sapNaOH: 0.121,
    sapKOH: 0.169,
    iodine: 90,
    hardness: 7,
    cleansing: 0,
    conditioning: 92,
    bubbly: 0,
    creamy: 7,
    fa: { lauric: 0, myristic: 0, palmitic: 1, stearic: 0, ricinoleic: 0, oleic: 15, linoleic: 1, linolenic: 1 },
  },
  {
    slug: "broccoli_seed_oil",
    inci: "Brassica Oleracea Italica (Broccoli) Seed Oil",
    common: "Broccoli seed oil",
    category: "exotic",
    sapNaOH: 0.124,
    sapKOH: 0.174,
    iodine: 110,
    hardness: 10,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 10,
    fa: { lauric: 0, myristic: 0, palmitic: 3, stearic: 1, ricinoleic: 0, oleic: 12, linoleic: 11, linolenic: 9 },
  },
  {
    slug: "karanja_oil",
    inci: "Pongamia Glabra Seed Oil",
    common: "Karanja oil",
    category: "exotic",
    sapNaOH: 0.135,
    sapKOH: 0.189,
    iodine: 85,
    hardness: 22,
    cleansing: 0,
    conditioning: 78,
    bubbly: 0,
    creamy: 22,
    fa: { lauric: 0, myristic: 0, palmitic: 10, stearic: 7, ricinoleic: 0, oleic: 51, linoleic: 16, linolenic: 4 },
  },
  {
    slug: "baobab_oil",
    inci: "Adansonia Digitata Seed Oil",
    common: "Baobab oil",
    category: "exotic",
    sapNaOH: 0.143,
    sapKOH: 0.2,
    iodine: 75,
    hardness: 33,
    cleansing: 0,
    conditioning: 67,
    bubbly: 0,
    creamy: 33,
    fa: { lauric: 0, myristic: 0, palmitic: 22, stearic: 5, ricinoleic: 0, oleic: 33, linoleic: 30, linolenic: 1 },
  },
  {
    slug: "buriti_oil",
    inci: "Mauritia Flexuosa Fruit Oil",
    common: "Buriti oil",
    category: "exotic",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 75,
    hardness: 21,
    cleansing: 0,
    conditioning: 78,
    bubbly: 0,
    creamy: 21,
    fa: { lauric: 0, myristic: 0, palmitic: 19, stearic: 2, ricinoleic: 0, oleic: 73, linoleic: 4, linolenic: 0 },
  },
  {
    slug: "monoi_oil",
    inci: "Cocos Nucifera (Coconut) Oil & Tiare Flower",
    common: "Monoi oil",
    category: "exotic",
    sapNaOH: 0.19,
    sapKOH: 0.266,
    iodine: 10,
    hardness: 79,
    cleansing: 67,
    conditioning: 10,
    bubbly: 67,
    creamy: 12,
    fa: { lauric: 48, myristic: 19, palmitic: 9, stearic: 3, ricinoleic: 0, oleic: 7, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "sacha_inchi_oil",
    inci: "Plukenetia Volubilis Seed Oil",
    common: "Sacha inchi oil",
    category: "exotic",
    sapNaOH: 0.134,
    sapKOH: 0.188,
    iodine: 192,
    hardness: 6,
    cleansing: 0,
    conditioning: 93,
    bubbly: 0,
    creamy: 6,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 3, ricinoleic: 0, oleic: 9, linoleic: 36, linolenic: 48 },
  },
  {
    slug: "chia_seed_oil",
    inci: "Salvia Hispanica Seed Oil",
    common: "Chia seed oil",
    category: "exotic",
    sapNaOH: 0.134,
    sapKOH: 0.188,
    iodine: 200,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 3, ricinoleic: 0, oleic: 7, linoleic: 18, linolenic: 60 },
  },
  {
    slug: "flaxseed_oil",
    inci: "Linum Usitatissimum (Linseed) Seed Oil",
    common: "Flaxseed (linseed) oil",
    category: "exotic",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 178,
    hardness: 9,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 9,
    fa: { lauric: 0, myristic: 0, palmitic: 6, stearic: 4, ricinoleic: 0, oleic: 19, linoleic: 14, linolenic: 53 },
  },
  {
    slug: "raspberry_seed_oil",
    inci: "Rubus Idaeus (Raspberry) Seed Oil",
    common: "Raspberry seed oil",
    category: "exotic",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 184,
    hardness: 7,
    cleansing: 0,
    conditioning: 92,
    bubbly: 0,
    creamy: 7,
    fa: { lauric: 0, myristic: 0, palmitic: 2, stearic: 1, ricinoleic: 0, oleic: 13, linoleic: 53, linolenic: 30 },
  },
  {
    slug: "blackcurrant_seed_oil",
    inci: "Ribes Nigrum (Black Currant) Seed Oil",
    common: "Blackcurrant seed oil",
    category: "exotic",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 175,
    hardness: 8,
    cleansing: 0,
    conditioning: 91,
    bubbly: 0,
    creamy: 8,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 2, ricinoleic: 0, oleic: 12, linoleic: 47, linolenic: 13 },
  },
  {
    slug: "pomegranate_seed_oil",
    inci: "Punica Granatum Seed Oil",
    common: "Pomegranate seed oil",
    category: "exotic",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 220,
    hardness: 7,
    cleansing: 0,
    conditioning: 92,
    bubbly: 0,
    creamy: 7,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 3, ricinoleic: 0, oleic: 7, linoleic: 7, linolenic: 0 },
  },
  {
    slug: "carrot_seed_oil",
    inci: "Daucus Carota Sativa (Carrot) Seed Oil",
    common: "Carrot seed oil",
    category: "exotic",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 96,
    hardness: 14,
    cleansing: 0,
    conditioning: 86,
    bubbly: 0,
    creamy: 14,
    fa: { lauric: 0, myristic: 0, palmitic: 4, stearic: 1, ricinoleic: 0, oleic: 70, linoleic: 11, linolenic: 0 },
  },
  // ============ ANIMAL ============
  {
    slug: "lard",
    inci: "Lard (Pig Tallow)",
    common: "Lard",
    category: "animal",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 57,
    hardness: 41,
    cleansing: 1,
    conditioning: 52,
    bubbly: 1,
    creamy: 47,
    fa: { lauric: 0, myristic: 1, palmitic: 26, stearic: 14, ricinoleic: 0, oleic: 44, linoleic: 10, linolenic: 0 },
  },
  {
    slug: "tallow_beef",
    inci: "Bos Taurus Tallow",
    common: "Beef tallow",
    category: "animal",
    sapNaOH: 0.141,
    sapKOH: 0.197,
    iodine: 50,
    hardness: 58,
    cleansing: 1,
    conditioning: 41,
    bubbly: 1,
    creamy: 41,
    fa: { lauric: 0, myristic: 3, palmitic: 27, stearic: 22, ricinoleic: 0, oleic: 36, linoleic: 3, linolenic: 0 },
  },
  {
    slug: "tallow_deer",
    inci: "Cervus Tallow",
    common: "Deer tallow",
    category: "animal",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 35,
    hardness: 70,
    cleansing: 1,
    conditioning: 30,
    bubbly: 1,
    creamy: 30,
    fa: { lauric: 0, myristic: 4, palmitic: 22, stearic: 32, ricinoleic: 0, oleic: 36, linoleic: 2, linolenic: 1 },
  },
  {
    slug: "lanolin",
    inci: "Lanolin",
    common: "Lanolin",
    category: "animal",
    sapNaOH: 0.075,
    sapKOH: 0.105,
    iodine: 30,
    hardness: 19,
    cleansing: 0,
    conditioning: 81,
    bubbly: 0,
    creamy: 19,
    fa: { lauric: 0, myristic: 0, palmitic: 0, stearic: 0, ricinoleic: 0, oleic: 0, linoleic: 0, linolenic: 0 },
  },
  {
    slug: "emu_oil",
    inci: "Emu (Dromiceius) Oil",
    common: "Emu oil",
    category: "animal",
    sapNaOH: 0.139,
    sapKOH: 0.195,
    iodine: 75,
    hardness: 22,
    cleansing: 0,
    conditioning: 78,
    bubbly: 0,
    creamy: 22,
    fa: { lauric: 0, myristic: 0, palmitic: 22, stearic: 9, ricinoleic: 0, oleic: 49, linoleic: 13, linolenic: 1 },
  },
  {
    slug: "duck_fat",
    inci: "Anas Platyrhynchos Tallow",
    common: "Duck fat",
    category: "animal",
    sapNaOH: 0.137,
    sapKOH: 0.192,
    iodine: 70,
    hardness: 27,
    cleansing: 0,
    conditioning: 73,
    bubbly: 0,
    creamy: 27,
    fa: { lauric: 0, myristic: 1, palmitic: 25, stearic: 9, ricinoleic: 0, oleic: 50, linoleic: 13, linolenic: 1 },
  },
  // ============ WAXES / SPECIALTY ============
  {
    slug: "stearic_acid",
    inci: "Stearic Acid",
    common: "Stearic acid",
    category: "wax_specialty",
    sapNaOH: 0.143,
    sapKOH: 0.2,
    iodine: 0,
    hardness: 100,
    cleansing: 0,
    conditioning: 0,
    bubbly: 0,
    creamy: 0,
    fa: { lauric: 0, myristic: 0, palmitic: 5, stearic: 90, ricinoleic: 0, oleic: 0, linoleic: 0, linolenic: 0 },
  },
  {
    slug: "beeswax",
    inci: "Cera Alba (Beeswax)",
    common: "Beeswax",
    category: "wax_specialty",
    sapNaOH: 0.069,
    sapKOH: 0.097,
    iodine: 9,
    hardness: 40,
    cleansing: 0,
    conditioning: 0,
    bubbly: 0,
    creamy: 0,
    fa: { lauric: 0, myristic: 0, palmitic: 0, stearic: 0, ricinoleic: 0, oleic: 0, linoleic: 0, linolenic: 0 },
  },
  {
    slug: "jojoba_oil",
    inci: "Simmondsia Chinensis (Jojoba) Seed Oil",
    common: "Jojoba oil",
    category: "wax_specialty",
    sapNaOH: 0.069,
    sapKOH: 0.097,
    iodine: 82,
    hardness: 10,
    cleansing: 0,
    conditioning: 90,
    bubbly: 0,
    creamy: 10,
    fa: { lauric: 0, myristic: 0, palmitic: 0, stearic: 0, ricinoleic: 0, oleic: 10, linoleic: 0, linolenic: 0 },
  },
  // ============ A few more popular ones ============
  {
    slug: "walnut_oil",
    inci: "Juglans Regia (Walnut) Oil",
    common: "Walnut oil",
    category: "base_liquid",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 145,
    hardness: 12,
    cleansing: 0,
    conditioning: 87,
    bubbly: 0,
    creamy: 12,
    fa: { lauric: 0, myristic: 0, palmitic: 7, stearic: 3, ricinoleic: 0, oleic: 18, linoleic: 60, linolenic: 11 },
  },
  {
    slug: "brazilnut_oil",
    inci: "Bertholletia Excelsa Seed Oil",
    common: "Brazil nut oil",
    category: "base_liquid",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 110,
    hardness: 22,
    cleansing: 0,
    conditioning: 78,
    bubbly: 0,
    creamy: 22,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 8, ricinoleic: 0, oleic: 32, linoleic: 41, linolenic: 0 },
  },
  {
    slug: "pistachio_oil",
    inci: "Pistacia Vera Seed Oil",
    common: "Pistachio oil",
    category: "base_liquid",
    sapNaOH: 0.133,
    sapKOH: 0.187,
    iodine: 91,
    hardness: 11,
    cleansing: 0,
    conditioning: 89,
    bubbly: 0,
    creamy: 11,
    fa: { lauric: 0, myristic: 0, palmitic: 11, stearic: 1, ricinoleic: 0, oleic: 50, linoleic: 33, linolenic: 0 },
  },
  {
    slug: "cohune_oil",
    inci: "Attalea Cohune Seed Oil",
    common: "Cohune oil",
    category: "base_hard",
    sapNaOH: 0.18,
    sapKOH: 0.252,
    iodine: 13,
    hardness: 79,
    cleansing: 64,
    conditioning: 13,
    bubbly: 64,
    creamy: 16,
    fa: { lauric: 46, myristic: 16, palmitic: 9, stearic: 3, ricinoleic: 0, oleic: 13, linoleic: 2, linolenic: 0 },
  },
  {
    slug: "ucuuba_butter",
    inci: "Virola Sebifera Seed Butter",
    common: "Ucuuba butter",
    category: "butter",
    sapNaOH: 0.235,
    sapKOH: 0.329,
    iodine: 8,
    hardness: 85,
    cleansing: 70,
    conditioning: 12,
    bubbly: 70,
    creamy: 12,
    fa: { lauric: 14, myristic: 70, palmitic: 9, stearic: 1, ricinoleic: 0, oleic: 6, linoleic: 1, linolenic: 0 },
  },
  {
    slug: "olive_oil_unsaponifiable",
    inci: "Olive Oil Unsaponifiables",
    common: "Olive butter (hydrogenated)",
    category: "butter",
    sapNaOH: 0.135,
    sapKOH: 0.19,
    iodine: 75,
    hardness: 25,
    cleansing: 0,
    conditioning: 75,
    bubbly: 0,
    creamy: 25,
    fa: { lauric: 0, myristic: 0, palmitic: 14, stearic: 3, ricinoleic: 0, oleic: 69, linoleic: 12, linolenic: 1 },
  },
];

export const SOAP_OILS_BY_SLUG: Record<string, SoapOil> = Object.fromEntries(
  SOAP_OILS.map((o) => [o.slug, o])
);

export const OIL_CATEGORY_LABEL: Record<SoapOil["category"], string> = {
  base_liquid: "Liquid base oils",
  base_hard: "Hard base oils",
  butter: "Butters",
  exotic: "Specialty / exotic",
  animal: "Animal fats",
  wax_specialty: "Waxes & specialty",
};

// =====================================================================
// Additives
// =====================================================================

export const ADDITIVES: AdditiveDef[] = [
  // Chelators / antioxidants (anti-DOS / longer shelf life)
  { slug: "sodium_lactate", label: "Sodium lactate", typicalMin: 1, typicalMax: 3, notes: "Hardens bars and helps unmold faster. 60% solution typical." },
  { slug: "rosemary_oleoresin", label: "Rosemary oleoresin extract (ROE)", typicalMin: 0.1, typicalMax: 0.5, notes: "Antioxidant. Slows DOS (dreaded orange spots). Add to oils before lye." },
  { slug: "tetrasodium_edta", label: "Tetrasodium EDTA", typicalMin: 0.1, typicalMax: 0.5, notes: "Chelator that binds metal ions in hard water; reduces soap scum." },
  { slug: "citric_acid", label: "Citric acid", typicalMin: 0.5, typicalMax: 2, notes: "Chelator; pre-dissolve and increase lye to compensate (see soap-making references for amount)." },
  { slug: "sodium_citrate", label: "Sodium citrate", typicalMin: 1, typicalMax: 3, notes: "Pre-neutralised chelator alternative to citric acid; no extra lye needed." },
  // Clays
  { slug: "kaolin_clay", label: "Kaolin clay", typicalMin: 1, typicalMax: 3, notes: "Adds slip and silkiness, mild absorption." },
  { slug: "bentonite_clay", label: "Bentonite clay", typicalMin: 1, typicalMax: 3, notes: "More absorptive, popular in shave bars." },
  { slug: "rose_clay", label: "Rose clay", typicalMin: 1, typicalMax: 2, notes: "Pale pink color and gentle exfoliation." },
  { slug: "activated_charcoal", label: "Activated charcoal", typicalMin: 0.5, typicalMax: 2, notes: "Black color and oil binding." },
  // Humectants / sugars
  { slug: "honey", label: "Honey", typicalMin: 0.5, typicalMax: 2, notes: "Adds humectancy. Can heat the batch — go low." },
  { slug: "sugar", label: "Sugar", typicalMin: 1, typicalMax: 3, notes: "Boosts lather. Dissolve in lye-water before mixing." },
  // Texture / scrub
  { slug: "salt", label: "Sea salt", typicalMin: 1, typicalMax: 100, notes: "Up to 100% of oils for salt bars; <3% otherwise." },
  { slug: "oats_colloidal", label: "Colloidal oats", typicalMin: 1, typicalMax: 5, notes: "Soothing, gentle exfoliation." },
  { slug: "coffee_grounds", label: "Coffee grounds", typicalMin: 1, typicalMax: 3, notes: "Exfoliation; deodorizing for kitchen soap." },
  { slug: "poppy_seeds", label: "Poppy seeds", typicalMin: 0.5, typicalMax: 2, notes: "Light exfoliation." },
  // Liquids
  { slug: "milk", label: "Milk (goat / coconut)", typicalMin: 5, typicalMax: 100, notes: "Replaces water; freeze first to keep cool." },
  { slug: "aloe_juice", label: "Aloe vera juice", typicalMin: 5, typicalMax: 100, notes: "Replaces water for soothing properties." },
  // Botanicals / colour
  { slug: "calendula_petals", label: "Calendula petals", typicalMin: 0.5, typicalMax: 2, notes: "Decorative botanical." },
  { slug: "titanium_dioxide", label: "Titanium dioxide", typicalMin: 0.5, typicalMax: 2, notes: "White opacity / brightening." },
];

export const ADDITIVES_BY_SLUG: Record<string, AdditiveDef> = Object.fromEntries(
  ADDITIVES.map((a) => [a.slug, a])
);

// =====================================================================
// Recipe presets
// =====================================================================

export interface RecipePreset {
  slug: string;
  name: string;
  description: string;
  oils: SoapInputOil[];
  superfat: number;
}

export const RECIPE_PRESETS: RecipePreset[] = [
  {
    slug: "beginner_cp",
    name: "Beginner CP (balanced)",
    description: "Reliable starter recipe — balanced quality scores, forgiving trace.",
    oils: [
      { slug: "olive_oil", percent: 50 },
      { slug: "coconut_oil_76", percent: 25 },
      { slug: "palm_oil", percent: 20 },
      { slug: "castor_oil", percent: 5 },
    ],
    superfat: 5,
  },
  {
    slug: "castile",
    name: "Castile (100% olive)",
    description: "Pure olive oil. Long cure (6+ months). Gentle, slow-tracing, low-lather.",
    oils: [{ slug: "olive_oil", percent: 100 }],
    superfat: 5,
  },
  {
    slug: "bastille",
    name: "Bastille (80% olive)",
    description: "Olive-dominant with a touch of coconut and castor for lather.",
    oils: [
      { slug: "olive_oil", percent: 80 },
      { slug: "coconut_oil_76", percent: 15 },
      { slug: "castor_oil", percent: 5 },
    ],
    superfat: 5,
  },
  {
    slug: "salt_bar",
    name: "Coconut salt bar",
    description: "High coconut + salt up to 100% of oil weight. Use 20% superfat.",
    oils: [
      { slug: "coconut_oil_76", percent: 80 },
      { slug: "castor_oil", percent: 5 },
      { slug: "olive_oil", percent: 15 },
    ],
    superfat: 20,
  },
  {
    slug: "luxe_butter",
    name: "Luxe butter blend",
    description: "Butters-forward conditioning bar — slower trace, harder bar.",
    oils: [
      { slug: "olive_oil", percent: 30 },
      { slug: "coconut_oil_76", percent: 20 },
      { slug: "shea_butter", percent: 20 },
      { slug: "cocoa_butter", percent: 15 },
      { slug: "castor_oil", percent: 5 },
      { slug: "sweet_almond_oil", percent: 10 },
    ],
    superfat: 6,
  },
  {
    slug: "vegan_no_palm",
    name: "Vegan, no palm",
    description: "Plant-based, palm-free; uses shea + cocoa for hardness.",
    oils: [
      { slug: "olive_oil", percent: 40 },
      { slug: "coconut_oil_76", percent: 25 },
      { slug: "shea_butter", percent: 15 },
      { slug: "cocoa_butter", percent: 10 },
      { slug: "castor_oil", percent: 5 },
      { slug: "rice_bran_oil", percent: 5 },
    ],
    superfat: 6,
  },
  {
    slug: "liquid_soap",
    name: "Liquid soap (KOH)",
    description: "Potassium hydroxide for liquid/cream soap. 90% KOH purity.",
    oils: [
      { slug: "coconut_oil_76", percent: 40 },
      { slug: "olive_oil", percent: 30 },
      { slug: "sunflower_oil", percent: 25 },
      { slug: "castor_oil", percent: 5 },
    ],
    superfat: 3,
  },
];

// =====================================================================
// Unit conversion
// =====================================================================

const TO_GRAMS: Record<WeightUnit, number> = {
  g: 1,
  kg: 1000,
  oz: 28.3495,
  lb: 453.592,
};

export function toGrams(weight: number, unit: WeightUnit): number {
  return weight * TO_GRAMS[unit];
}

export function fromGrams(grams: number, unit: WeightUnit): number {
  return grams / TO_GRAMS[unit];
}

export function formatWeight(grams: number, unit: WeightUnit, digits = 2): string {
  return `${fromGrams(grams, unit).toFixed(digits)} ${unit}`;
}

// =====================================================================
// Calculation
// =====================================================================

const RECOMMENDED_RANGES: Record<string, [number, number]> = {
  Hardness: [29, 54],
  Cleansing: [12, 22],
  Conditioning: [44, 69],
  Bubbly: [14, 46],
  Creamy: [16, 48],
  Longevity: [54, 100],
  Iodine: [41, 70],
  INS: [136, 165],
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

  // Lye calc
  const sapKey = input.lyeType === "KOH" ? "sapKOH" : "sapNaOH";
  const superfat = Math.max(0, Math.min(20, input.superfatPercent ?? 5)) / 100;
  const purity = Math.max(50, Math.min(100, input.lyePurityPercent ?? 99)) / 100;
  let lyeRaw = 0;
  for (const line of oilLines) {
    const def = SOAP_OILS_BY_SLUG[line.slug];
    if (!def) continue;
    lyeRaw += line.weightG * def[sapKey];
  }
  // After superfat reduction, then divided by purity (need more impure lye to get same active amount)
  const lyeG = (lyeRaw * (1 - superfat)) / purity;

  // Water calc — depends on method
  let waterG = 0;
  switch (input.waterMethod) {
    case "lye_concentration": {
      // Lye is X% of (lye + water) total
      const concPct = Math.max(20, Math.min(50, input.lyeConcentrationPercent ?? 33));
      const totalLyeWater = lyeG / (concPct / 100);
      waterG = totalLyeWater - lyeG;
      break;
    }
    case "water_lye_ratio": {
      const ratio = Math.max(0.8, Math.min(4, input.waterLyeRatio ?? 1.5));
      waterG = lyeG * ratio;
      break;
    }
    case "water_percent_oils":
    default: {
      const waterRatio = Math.max(15, Math.min(60, input.waterPercentOils ?? 33)) / 100;
      waterG = totalOil * waterRatio;
      break;
    }
  }

  // Fragrance
  const fragrancePct = Math.max(0, Math.min(15, input.fragrancePercent ?? 0)) / 100;
  const fragranceG = totalOil * fragrancePct;

  // Additive lines
  const additiveLines = (input.additives ?? [])
    .map((a) => {
      const def = ADDITIVES_BY_SLUG[a.slug];
      if (!def) return null;
      const weightG = (a.percent / 100) * totalOil;
      return {
        slug: a.slug,
        label: def.label,
        percent: a.percent,
        weightG,
        typicalRange: `${def.typicalMin}–${def.typicalMax}%`,
      };
    })
    .filter(Boolean) as SoapResult["additiveLines"];

  // Quality calc — weighted by oil %
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
  // Longevity is the average of saturated-fatty-acid contributions to bar
  // life — approximated here as hardness + bubbly + creamy / 3 over the
  // upper-bound scale, capped at 100.
  const longevity = oilLines.length > 0
    ? Math.min(100, (hardness + bubbly + creamy) / 2)
    : 0;
  const ins = oilLines.length > 0 ? hardness + (130 - iodine) : null;

  const qualities: SoapQualityScore[] = [
    { label: "Hardness", value: hardness, recommendedMin: 29, recommendedMax: 54, inRange: classify(hardness, RECOMMENDED_RANGES.Hardness) },
    { label: "Cleansing", value: cleansing, recommendedMin: 12, recommendedMax: 22, inRange: classify(cleansing, RECOMMENDED_RANGES.Cleansing) },
    { label: "Conditioning", value: conditioning, recommendedMin: 44, recommendedMax: 69, inRange: classify(conditioning, RECOMMENDED_RANGES.Conditioning) },
    { label: "Bubbly", value: bubbly, recommendedMin: 14, recommendedMax: 46, inRange: classify(bubbly, RECOMMENDED_RANGES.Bubbly) },
    { label: "Creamy", value: creamy, recommendedMin: 16, recommendedMax: 48, inRange: classify(creamy, RECOMMENDED_RANGES.Creamy) },
    { label: "Longevity", value: longevity, recommendedMin: 54, recommendedMax: 100, inRange: classify(longevity, RECOMMENDED_RANGES.Longevity) },
    { label: "Iodine", value: iodine, recommendedMin: 41, recommendedMax: 70, inRange: classify(iodine, RECOMMENDED_RANGES.Iodine) },
    {
      label: "INS",
      value: ins ?? 0,
      recommendedMin: 136,
      recommendedMax: 165,
      inRange: ins === null ? "ok" : classify(ins, RECOMMENDED_RANGES.INS),
    },
  ];

  // Fatty acid breakdown
  let fattyAcids: FattyAcidBreakdown | null = null;
  if (oilLines.length > 0) {
    const fa: FattyAcidProfile = {
      lauric: 0,
      myristic: 0,
      palmitic: 0,
      stearic: 0,
      ricinoleic: 0,
      oleic: 0,
      linoleic: 0,
      linolenic: 0,
    };
    let totalP = 0;
    for (const line of oilLines) {
      const def = SOAP_OILS_BY_SLUG[line.slug];
      if (!def) continue;
      totalP += line.percent;
      fa.lauric += def.fa.lauric * line.percent;
      fa.myristic += def.fa.myristic * line.percent;
      fa.palmitic += def.fa.palmitic * line.percent;
      fa.stearic += def.fa.stearic * line.percent;
      fa.ricinoleic += def.fa.ricinoleic * line.percent;
      fa.oleic += def.fa.oleic * line.percent;
      fa.linoleic += def.fa.linoleic * line.percent;
      fa.linolenic += def.fa.linolenic * line.percent;
    }
    if (totalP > 0) {
      (Object.keys(fa) as Array<keyof FattyAcidProfile>).forEach((k) => {
        fa[k] = fa[k] / totalP;
      });
    }
    const saturated = fa.lauric + fa.myristic + fa.palmitic + fa.stearic;
    const unsaturated = fa.ricinoleic + fa.oleic + fa.linoleic + fa.linolenic;
    fattyAcids = {
      values: fa,
      saturated,
      unsaturated,
      satRatio: unsaturated > 0 ? saturated / unsaturated : 0,
    };
  }

  // Warnings
  if (oilLines.some((l) => l.slug.startsWith("coconut_oil") && l.percent > 30)) {
    warnings.push(
      "Coconut oil over 30% can be drying. Consider raising superfat to 20% if you go higher (salt bars often use 20%)."
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
  if (superfat * 100 > 12 && input.lyeType === "NaOH") {
    warnings.push(
      "Superfat over 12% can leave free oils that go rancid (DOS — dreaded orange spots) over time."
    );
  }
  if (fragrancePct * 100 > 6) {
    warnings.push(
      `Fragrance over 6% (${(fragrancePct * 100).toFixed(1)}%) can accelerate trace and may exceed IFRA limits depending on FO/EO type.`
    );
  }

  return {
    totalOilWeightG: totalOil,
    lyeG,
    waterG,
    totalBatchG:
      totalOil + lyeG + waterG + fragranceG + additiveLines.reduce((s, a) => s + a.weightG, 0),
    oilLines,
    additiveLines,
    fragranceG,
    qualities,
    iodine: oilLines.length > 0 ? Math.round(iodine) : null,
    ins: ins !== null ? Math.round(ins) : null,
    fattyAcids,
    warnings,
  };
}

// =====================================================================
// Recipe sharing — encode/decode to URL-safe string
// =====================================================================

export interface ShareableRecipe {
  oils: SoapInputOil[];
  totalOilWeightG: number;
  lyeType: LyeType;
  lyePurityPercent: number;
  superfatPercent: number;
  waterMethod: WaterMethod;
  waterPercentOils: number;
  lyeConcentrationPercent: number;
  waterLyeRatio: number;
  fragrancePercent: number;
  additives: SoapInputAdditive[];
}

/** Encode a recipe to a URL-safe base64 string */
export function encodeRecipe(recipe: ShareableRecipe): string {
  const json = JSON.stringify(recipe);
  if (typeof window === "undefined") {
    return Buffer.from(json, "utf-8").toString("base64url");
  }
  // Browser path
  const bytes = new TextEncoder().encode(json);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** Decode a URL-safe base64 string back into a recipe */
export function decodeRecipe(encoded: string): ShareableRecipe | null {
  try {
    if (typeof window === "undefined") {
      const json = Buffer.from(encoded, "base64url").toString("utf-8");
      return JSON.parse(json) as ShareableRecipe;
    }
    let b64 = encoded.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json) as ShareableRecipe;
  } catch {
    return null;
  }
}

// =====================================================================
// Default starting recipe (used when no preset / share param)
// =====================================================================

export function defaultRecipe(): ShareableRecipe {
  return {
    totalOilWeightG: 1000,
    lyeType: "NaOH",
    lyePurityPercent: 99,
    superfatPercent: 5,
    waterMethod: "water_percent_oils",
    waterPercentOils: 33,
    lyeConcentrationPercent: 33,
    waterLyeRatio: 1.5,
    fragrancePercent: 0,
    additives: [],
    oils: [
      { slug: "olive_oil", percent: 50 },
      { slug: "coconut_oil_76", percent: 25 },
      { slug: "palm_oil", percent: 20 },
      { slug: "castor_oil", percent: 5 },
    ],
  };
}
