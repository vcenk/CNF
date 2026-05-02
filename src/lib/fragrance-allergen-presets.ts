/**
 * Preset essential oil allergen breakdowns.
 *
 * IMPORTANT — these are TYPICAL VALUES from publicly published
 * cosmetic-chemistry references (EU SCCS opinions, IFRA Standards,
 * supplier IFRA certificates, "Essential Oil Safety" reference works).
 * Real percentages vary by:
 *   - Origin / country of production (Bulgarian rose ≠ Turkish rose)
 *   - Distillation method (steam distillation vs CO2 vs solvent)
 *   - Harvest batch and season
 *
 * The calculator UI must display a strong "VERIFY against your
 * supplier's IFRA cert" warning whenever a preset is loaded.
 *
 * Synthetic fragrance oils (FOs) are NOT presetable — they're
 * supplier-specific blends. Users must paste from the supplier's
 * IFRA / Allergen Statement.
 *
 * Allergen names use the INCI form Health Canada / EU recognize.
 */

import type { AllergenInOil } from "./fragrance-allergen-calculator";

export interface EssentialOilPreset {
  /** Common name shown in the dropdown */
  commonName: string;
  /** INCI name (Latin binomial) */
  inciName: string;
  /** Short note shown when selected */
  note: string;
  /** Typical allergen content. Use the MIDPOINT of typical published ranges. */
  allergens: AllergenInOil[];
}

export const ESSENTIAL_OIL_PRESETS: EssentialOilPreset[] = [
  {
    commonName: "Lavender (Lavandula angustifolia)",
    inciName: "Lavandula Angustifolia Oil",
    note:
      "True lavender. Typical range: Linalool 25-50%, Linalyl acetate 25-45%. Range varies widely by origin (Bulgarian, French Provence, etc.). Verify your supplier's IFRA cert.",
    allergens: [
      { inciName: "Linalool", percentInOil: 35 },
      { inciName: "Linalyl Acetate", percentInOil: 35 },
      { inciName: "Limonene", percentInOil: 0.5 },
      { inciName: "Geraniol", percentInOil: 0.3 },
      { inciName: "Coumarin", percentInOil: 0.2 },
    ],
  },
  {
    commonName: "Lavandin (Lavandula hybrida)",
    inciName: "Lavandula Hybrida Oil",
    note:
      "Lavender hybrid (lavender × spike lavender). Higher camphor than true lavender.",
    allergens: [
      { inciName: "Linalool", percentInOil: 30 },
      { inciName: "Linalyl Acetate", percentInOil: 25 },
      { inciName: "Camphor", percentInOil: 8 },
      { inciName: "Limonene", percentInOil: 1 },
    ],
  },
  {
    commonName: "Lemon (Citrus limon)",
    inciName: "Citrus Limon Peel Oil",
    note:
      "Cold-pressed lemon peel. Very high in Limonene. Phototoxic — use FCF for leave-on products.",
    allergens: [
      { inciName: "Limonene", percentInOil: 65 },
      { inciName: "Citral", percentInOil: 3 },
      { inciName: "Linalool", percentInOil: 0.5 },
      { inciName: "Geraniol", percentInOil: 0.3 },
    ],
  },
  {
    commonName: "Sweet Orange (Citrus sinensis)",
    inciName: "Citrus Sinensis Peel Oil",
    note: "Cold-pressed sweet orange peel. ~95% Limonene.",
    allergens: [
      { inciName: "Limonene", percentInOil: 92 },
      { inciName: "Linalool", percentInOil: 0.5 },
    ],
  },
  {
    commonName: "Bergamot (Citrus aurantium bergamia)",
    inciName: "Citrus Aurantium Bergamia (Bergamot) Fruit Oil",
    note:
      "Cold-pressed bergamot. Phototoxic unless FCF (furocoumarin-free). High Limonene + Linalyl acetate.",
    allergens: [
      { inciName: "Limonene", percentInOil: 35 },
      { inciName: "Linalool", percentInOil: 12 },
      { inciName: "Linalyl Acetate", percentInOil: 35 },
      { inciName: "Geraniol", percentInOil: 0.3 },
    ],
  },
  {
    commonName: "Grapefruit (Citrus paradisi)",
    inciName: "Citrus Paradisi Peel Oil",
    note: "Cold-pressed grapefruit peel. Very high Limonene.",
    allergens: [
      { inciName: "Limonene", percentInOil: 90 },
      { inciName: "Linalool", percentInOil: 0.3 },
    ],
  },
  {
    commonName: "Lime (Citrus aurantifolia)",
    inciName: "Citrus Aurantifolia Peel Oil",
    note: "Cold-pressed lime peel. Mostly Limonene, some Citral.",
    allergens: [
      { inciName: "Limonene", percentInOil: 50 },
      { inciName: "Citral", percentInOil: 5 },
      { inciName: "Linalool", percentInOil: 0.5 },
    ],
  },
  {
    commonName: "Peppermint (Mentha piperita)",
    inciName: "Mentha Piperita Oil",
    note:
      "Peppermint EO. High menthol/menthone. Trace allergens.",
    allergens: [
      { inciName: "Menthol", percentInOil: 40 },
      { inciName: "Limonene", percentInOil: 1 },
      { inciName: "Linalool", percentInOil: 0.3 },
    ],
  },
  {
    commonName: "Spearmint (Mentha spicata)",
    inciName: "Mentha Spicata Flower / Leaf / Stem Oil",
    note: "Spearmint EO. High Carvone (~60-70%).",
    allergens: [
      { inciName: "Carvone", percentInOil: 65 },
      { inciName: "Limonene", percentInOil: 12 },
    ],
  },
  {
    commonName: "Eucalyptus (Eucalyptus globulus)",
    inciName: "Eucalyptus Globulus Leaf Oil",
    note:
      "Eucalyptus globulus. ~70% 1,8-cineole (not regulated as fragrance allergen). Trace Limonene + pinenes.",
    allergens: [
      { inciName: "Limonene", percentInOil: 5 },
      { inciName: "Alpha-Pinene", percentInOil: 4 },
    ],
  },
  {
    commonName: "Tea Tree (Melaleuca alternifolia)",
    inciName: "Melaleuca Alternifolia Leaf Oil",
    note: "Tea tree. Major component is terpinen-4-ol (not in EU allergen list). Trace Limonene.",
    allergens: [
      { inciName: "Limonene", percentInOil: 1 },
    ],
  },
  {
    commonName: "Rose Otto (Rosa damascena)",
    inciName: "Rosa Damascena Flower Oil",
    note:
      "Steam-distilled damask rose. High in citronellol + geraniol — major allergens above threshold even at low usage.",
    allergens: [
      { inciName: "Citronellol", percentInOil: 30 },
      { inciName: "Geraniol", percentInOil: 18 },
      { inciName: "Linalool", percentInOil: 2 },
      { inciName: "Eugenol", percentInOil: 1 },
      { inciName: "Farnesol", percentInOil: 1 },
    ],
  },
  {
    commonName: "Geranium (Pelargonium graveolens)",
    inciName: "Pelargonium Graveolens Flower Oil",
    note: "Rose geranium. Major Citronellol + Geraniol.",
    allergens: [
      { inciName: "Citronellol", percentInOil: 30 },
      { inciName: "Geraniol", percentInOil: 18 },
      { inciName: "Linalool", percentInOil: 8 },
    ],
  },
  {
    commonName: "Ylang Ylang (Cananga odorata)",
    inciName: "Cananga Odorata Flower Oil",
    note: "Heady tropical floral. Multiple allergens.",
    allergens: [
      { inciName: "Linalool", percentInOil: 13 },
      { inciName: "Benzyl Benzoate", percentInOil: 8 },
      { inciName: "Benzyl Salicylate", percentInOil: 4 },
      { inciName: "Geraniol", percentInOil: 6 },
      { inciName: "Eugenol", percentInOil: 1 },
      { inciName: "Isoeugenol", percentInOil: 0.5 },
      { inciName: "Farnesol", percentInOil: 2 },
    ],
  },
  {
    commonName: "Patchouli (Pogostemon cablin)",
    inciName: "Pogostemon Cablin Oil",
    note: "Earthy base note. Mostly patchoulol; small allergen content.",
    allergens: [
      { inciName: "Limonene", percentInOil: 0.5 },
    ],
  },
  {
    commonName: "Cedarwood — Atlas (Cedrus atlantica)",
    inciName: "Cedrus Atlantica Bark Oil",
    note: "Atlas cedar. High Cedrol.",
    allergens: [
      { inciName: "Cedrol", percentInOil: 18 },
    ],
  },
  {
    commonName: "Sandalwood (Santalum album)",
    inciName: "Santalum Album Oil",
    note: "East Indian sandalwood. High alpha + beta santalol.",
    allergens: [
      { inciName: "Alpha-Santalol", percentInOil: 45 },
      { inciName: "Beta-Santalol", percentInOil: 22 },
    ],
  },
  {
    commonName: "Frankincense (Boswellia carterii)",
    inciName: "Boswellia Carterii Oil",
    note: "Frankincense. Major component is alpha-pinene.",
    allergens: [
      { inciName: "Alpha-Pinene", percentInOil: 35 },
      { inciName: "Beta-Pinene", percentInOil: 4 },
      { inciName: "Limonene", percentInOil: 12 },
      { inciName: "Linalool", percentInOil: 0.5 },
    ],
  },
  {
    commonName: "Clove Bud (Eugenia caryophyllus)",
    inciName: "Eugenia Caryophyllus Leaf Oil",
    note:
      "Clove bud / leaf oil — up to 90% Eugenol. Strong skin sensitizer; severely restrict in leave-on.",
    allergens: [
      { inciName: "Eugenol", percentInOil: 80 },
      { inciName: "Benzyl Benzoate", percentInOil: 1 },
    ],
  },
  {
    commonName: "Cinnamon Bark (Cinnamomum zeylanicum)",
    inciName: "Cinnamomum Zeylanicum Bark Oil",
    note:
      "Cinnamon bark. Very high Cinnamal — potent sensitizer. Use sparingly in any leave-on formula.",
    allergens: [
      { inciName: "Cinnamal", percentInOil: 55 },
      { inciName: "Eugenol", percentInOil: 8 },
      { inciName: "Linalool", percentInOil: 2 },
      { inciName: "Benzyl Benzoate", percentInOil: 1 },
    ],
  },
  {
    commonName: "Citronella (Cymbopogon nardus)",
    inciName: "Cymbopogon Nardus Oil",
    note: "Citronella. High citronellal + citronellol + geraniol.",
    allergens: [
      { inciName: "Citronellal", percentInOil: 35 },
      { inciName: "Citronellol", percentInOil: 18 },
      { inciName: "Geraniol", percentInOil: 22 },
      { inciName: "Limonene", percentInOil: 3 },
    ],
  },
  {
    commonName: "Lemongrass (Cymbopogon citratus)",
    inciName: "Cymbopogon Citratus Oil",
    note:
      "Lemongrass. ~75% Citral (geranial + neral). Major sensitization risk above threshold.",
    allergens: [
      { inciName: "Citral", percentInOil: 75 },
      { inciName: "Geraniol", percentInOil: 4 },
      { inciName: "Limonene", percentInOil: 1 },
    ],
  },
  {
    commonName: "Rosemary (Rosmarinus officinalis)",
    inciName: "Rosmarinus Officinalis Leaf Oil",
    note: "Rosemary. Major eucalyptol + camphor; trace allergens.",
    allergens: [
      { inciName: "Limonene", percentInOil: 4 },
      { inciName: "Camphor", percentInOil: 14 },
      { inciName: "Linalool", percentInOil: 1 },
      { inciName: "Alpha-Pinene", percentInOil: 12 },
    ],
  },
  {
    commonName: "Basil (Ocimum basilicum)",
    inciName: "Ocimum Basilicum Oil",
    note: "Sweet basil. Linalool chemotype shown here; methyl chavicol chemotypes vary.",
    allergens: [
      { inciName: "Linalool", percentInOil: 50 },
      { inciName: "Eugenol", percentInOil: 2 },
      { inciName: "Limonene", percentInOil: 0.5 },
    ],
  },
  {
    commonName: "Tonka Bean (absolute)",
    inciName: "Dipteryx Odorata Seed Extract",
    note:
      "Tonka absolute is dominated by Coumarin (often 30-60%). Strong sensitization risk; verify supplier IFRA.",
    allergens: [
      { inciName: "Coumarin", percentInOil: 40 },
    ],
  },
  {
    commonName: "Vanilla (absolute, CO2 extract)",
    inciName: "Vanilla Planifolia Fruit Extract",
    note:
      "Vanilla absolute typically contains 1-3% Vanillin. (Vanilla extracts vary widely — verify supplier.)",
    allergens: [
      { inciName: "Vanillin", percentInOil: 2 },
    ],
  },
  {
    commonName: "Roman Chamomile (Anthemis nobilis)",
    inciName: "Anthemis Nobilis Flower Oil",
    note: "Roman chamomile. Trace allergens.",
    allergens: [
      { inciName: "Limonene", percentInOil: 0.3 },
      { inciName: "Linalool", percentInOil: 0.2 },
    ],
  },
  {
    commonName: "Pine (Pinus sylvestris)",
    inciName: "Pinus Sylvestris Leaf Oil",
    note: "Scots pine. High alpha + beta pinene.",
    allergens: [
      { inciName: "Alpha-Pinene", percentInOil: 38 },
      { inciName: "Beta-Pinene", percentInOil: 18 },
      { inciName: "Limonene", percentInOil: 5 },
    ],
  },
  {
    commonName: "Pink Pepper (Schinus molle)",
    inciName: "Schinus Molle Fruit Oil",
    note: "Pink pepper. High Limonene + alpha-pinene.",
    allergens: [
      { inciName: "Limonene", percentInOil: 35 },
      { inciName: "Alpha-Pinene", percentInOil: 18 },
    ],
  },
  {
    commonName: "Ginger (Zingiber officinale)",
    inciName: "Zingiber Officinale Root Oil",
    note: "Ginger. Mostly zingiberene; trace allergens.",
    allergens: [
      { inciName: "Citral", percentInOil: 1 },
      { inciName: "Limonene", percentInOil: 1 },
    ],
  },
];
