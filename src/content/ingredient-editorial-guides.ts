export interface IngredientEditorialSource {
  label: string;
  href: string;
  scope: string;
}

export interface IngredientEditorialGuide {
  reviewed: string;
  metaTitle: string;
  metaDescription: string;
  quickAnswer: string;
  formulationNotes: Array<{
    title: string;
    body: string;
  }>;
  usefulFor: string[];
  verifyBeforeUse: string[];
  sources: IngredientEditorialSource[];
}

const healthCanadaSources: IngredientEditorialSource[] = [
  {
    label: "Health Canada Cosmetic Ingredient Hotlist",
    href: "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/cosmetic-ingredient-hotlist-prohibited-restricted-ingredients/hotlist.html",
    scope: "Current Canadian prohibitions, restrictions, warnings, and conditions of use.",
  },
  {
    label: "Health Canada guide for cosmetic notifications",
    href: "https://www.canada.ca/en/health-canada/services/consumer-product-safety/cosmetics/notification-cosmetics/guide.html",
    scope: "Ingredient naming, concentration reporting, and Cosmetic Notification Form responsibilities.",
  },
];

export const INGREDIENT_EDITORIAL_GUIDES: Record<
  string,
  IngredientEditorialGuide
> = {
  "citric-acid": {
    reviewed: "October 7, 2026",
    metaTitle: "Citric Acid in Cosmetics — pH Adjustment & Formulation Guide",
    metaDescription:
      "How citric acid is used to adjust cosmetic pH, with practical mixing notes, Canadian compliance checks, INCI identity, and supplier references.",
    quickAnswer:
      "Citric acid is a water-soluble acid used mainly to lower and fine-tune the final pH of water-based cosmetics. Formulators normally add it as a pre-diluted solution in small increments, measure again after thorough mixing, and confirm the finished product remains inside the preservative system's effective pH range.",
    formulationNotes: [
      {
        title: "Treat it as a pH control tool",
        body: "Citric acid can support product stability and preservation by helping a formula reach its target pH, but it is not a complete preservative system. Establish the target from the formula, preservative supplier documentation, packaging, and intended use rather than choosing a pH from the ingredient alone.",
      },
      {
        title: "Add through the water phase",
        body: "Prepare a known aqueous dilution so small corrections are easier to reproduce. Add gradually, mix completely, and record both the dilution strength and amount added. Recheck the batch after it has cooled because temperature and incomplete equilibration can change the apparent reading.",
      },
      {
        title: "Validate the finished formula",
        body: "Use a calibrated pH meter suitable for the product rather than relying only on paper strips. A successful bench adjustment still needs stability testing, packaging compatibility work, and appropriate microbiological testing before sale.",
      },
    ],
    usefulFor: [
      "Lotions, creams, and other emulsions that need final pH adjustment",
      "Shampoos, body washes, and liquid cleansers",
      "Water-based gels, mists, and toners",
      "Documented batch corrections during scale-up",
    ],
    verifyBeforeUse: [
      "Supplier specification and whether the material is anhydrous or hydrated",
      "The preservative system's documented working pH range",
      "The finished product's pH after cooling and during stability testing",
      "Current Hotlist status and the exact concentration reported on the CNF",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Citric Acid",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/Citric-Acid",
        scope: "Chemical identity and physical-property reference for citric acid.",
      },
    ],
  },
  squalane: {
    reviewed: "October 7, 2026",
    metaTitle: "Squalane in Cosmetics — Oil-Phase Formulation Guide",
    metaDescription:
      "Use squalane in skincare and haircare formulas with practical oil-phase notes, sensory guidance, INCI identity, and Canadian compliance checks.",
    quickAnswer:
      "Squalane is a saturated, oil-soluble emollient used to improve slip and reduce a heavy or greasy after-feel in skin and hair products. It can be used in anhydrous blends or added to the oil phase of an emulsion, but it does not emulsify water, preserve a formula, or replace stability testing.",
    formulationNotes: [
      {
        title: "Use it to tune sensory feel",
        body: "Squalane is useful when a balm, facial oil, cream, or hair serum needs more glide without relying entirely on heavier plant oils. Compare several levels in the finished base because skin feel depends on the complete oil-phase composition, emulsifier system, powders, and application amount.",
      },
      {
        title: "Keep squalane and squalene distinct",
        body: "Squalane is the saturated material; squalene is a different, unsaturated ingredient. Confirm the exact INCI name, source, purity, and technical specification on the supplier documents instead of treating the names as interchangeable.",
      },
      {
        title: "Design for the whole oil phase",
        body: "Squalane is oil soluble and can be incorporated with the oil phase or during cool-down when supported by the supplier process. It is not an emulsifier, so water-containing products still need an appropriate emulsification system and preservation plan.",
      },
    ],
    usefulFor: [
      "Facial oils and lightweight oil serums",
      "Creams and lotions that need additional slip",
      "Lip, balm, and anhydrous treatment products",
      "Hair oils and leave-on conditioning products",
    ],
    verifyBeforeUse: [
      "Declared INCI identity and whether the source is plant-derived or otherwise",
      "Supplier purity, odour, colour, and storage specifications",
      "Compatibility with the complete oil phase and packaging",
      "Current Canadian requirements and the concentration reported on the CNF",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Squalane",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/Squalane",
        scope: "Identity, physical properties, synonyms, and linked cosmetic-use references.",
      },
      {
        label: "Cosmetic Ingredient Review — Squalane and Squalene",
        href: "https://www.cir-safety.org/panelbook/safety-assessment-squalane-and-squalene-used-cosmetics",
        scope: "Independent safety-assessment record and supporting review material.",
      },
    ],
  },
  "decyl-glucoside": {
    reviewed: "October 7, 2026",
    metaTitle: "Decyl Glucoside — Cleanser Formulation & INCI Guide",
    metaDescription:
      "Formulate with decyl glucoside using practical surfactant-blending, pH, viscosity, supplier-specification, and Canadian notification checks.",
    quickAnswer:
      "Decyl glucoside is a non-ionic cleansing surfactant used in rinse-off formulas. Commercial grades are supplied as mixtures with their own active-matter level, water content, pH, and preservation details, so the supplier technical data—not the INCI name alone—must drive calculations and processing.",
    formulationNotes: [
      {
        title: "Calculate from the supplied grade",
        body: "Two raw materials carrying the same INCI name may not have the same active surfactant matter or processing behaviour. Record the trade name and lot specification, then calculate the formula from the supplier's active level rather than copying a percentage from another formulation.",
      },
      {
        title: "Build a surfactant system",
        body: "Decyl glucoside can be blended with other surfactant classes to adjust cleansing, foam, mildness, and rinse feel. Evaluate the blend as a system; replacing one surfactant one-for-one can change viscosity, clarity, pH, preservation, and user experience.",
      },
      {
        title: "Check pH and viscosity last",
        body: "Glucoside systems can respond strongly to electrolyte level, fragrance, other surfactants, and pH adjustment. Complete the surfactant blend before final viscosity work, add air gently, and confirm performance after the batch has rested.",
      },
    ],
    usefulFor: [
      "Facial and body cleansers",
      "Shampoos and scalp cleansers",
      "Hand washes and other rinse-off products",
      "Surfactant blends where non-ionic cleansing is useful",
    ],
    verifyBeforeUse: [
      "Active surfactant matter, supplied pH, water content, and preservative",
      "Supplier-recommended process temperature and order of addition",
      "Finished-formula eye/skin compatibility and rinse-off performance",
      "Stability, viscosity, preservation, and packaging compatibility",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Decyl Glucoside",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/62142",
        scope: "Chemical identity, synonyms, non-ionic surfactant use, and linked safety references.",
      },
      {
        label: "European Commission cosmetic ingredient glossary",
        href: "https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database/cosing-glossary-ingredients_en",
        scope: "Official EU reference explaining the common ingredient-name glossary used for cosmetic labelling.",
      },
    ],
  },
  "caprylic-capric-triglyceride": {
    reviewed: "October 7, 2026",
    metaTitle: "Caprylic/Capric Triglyceride — MCT Formulation Guide",
    metaDescription:
      "How to use caprylic/capric triglyceride in cosmetic oil phases, with sensory, substitution, INCI, supplier, and Canadian compliance guidance.",
    quickAnswer:
      "Caprylic/capric triglyceride is a mixed medium-chain triglyceride used as a lightweight emollient and carrier in cosmetic oil phases. It is commonly called MCT oil, but cosmetic formulators should buy against the full INCI name and supplier specification because food oils and differently composed glycerides are not automatically equivalent raw materials.",
    formulationNotes: [
      {
        title: "Use it as an oil-phase emollient",
        body: "It can lighten the feel of richer butters and oils, improve spreading, and act as a carrier for compatible oil-soluble materials. It can be used in anhydrous products or as part of an emulsion's oil phase, subject to the supplier process and the rest of the formula.",
      },
      {
        title: "Do not confuse carrier with emulsifier",
        body: "Caprylic/capric triglyceride does not make oil and water stay mixed and does not preserve a water-containing product. An emulsion still needs an appropriate emulsifier system, and any formula containing water needs a preservation strategy supported by testing.",
      },
      {
        title: "Substitute by function and specification",
        body: "Replacing it with a whole plant oil can change polarity, oxidation behaviour, colour, odour, viscosity, and skin feel. Run side-by-side samples and stability work rather than treating every liquid oil as a direct substitute.",
      },
    ],
    usefulFor: [
      "Facial oils, body oils, and oil serums",
      "Balms, sticks, and colour-cosmetic oil phases",
      "Creams and lotions needing a lighter emollient",
      "Oil-soluble fragrance or active carrier systems supported by supplier data",
    ],
    verifyBeforeUse: [
      "Full INCI name, CAS reference, and fatty-acid/glyceride specification",
      "Purity, colour, odour, peroxide value, and storage instructions",
      "Solubility of every material being carried in the oil",
      "Finished-product stability and packaging compatibility",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Caprylic/Capric Triglyceride",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/Caprylic-capric-triglyceride",
        scope: "Chemical identity and synonym reference for the mixed triglyceride.",
      },
      {
        label: "Cosmetic Ingredient Review — Caprylic/Capric Triglyceride",
        href: "https://www.cir-safety.org/ingredient/caprylic/capric-triglyceride",
        scope: "Ingredient record and related safety-assessment material.",
      },
    ],
  },
  "persea-gratissima-oil": {
    reviewed: "October 7, 2026",
    metaTitle: "Avocado Oil in Cosmetics — INCI & Formulation Guide",
    metaDescription:
      "Use avocado oil in balms, emulsions, and haircare with practical oxidation, sensory, supplier-specification, INCI, and Canadian compliance checks.",
    quickAnswer:
      "Avocado oil is a botanical triglyceride oil labelled with the INCI name Persea Gratissima Oil. It is used as an emollient in anhydrous products and emulsion oil phases, but colour, odour, composition, and oxidation behaviour can vary with cultivar, extraction, refining, and supplier specification.",
    formulationNotes: [
      {
        title: "Choose refined or unrefined deliberately",
        body: "A strongly coloured or aromatic grade may suit a product story but can affect fragrance, appearance, and batch consistency. A refined grade may provide a more neutral base. Record the supplier grade and do not assume two avocado oils will behave identically.",
      },
      {
        title: "Manage oxidation as a formula issue",
        body: "Review the supplier's peroxide value, antioxidant system, packaging, headspace, light exposure, and storage instructions. An antioxidant may slow oxidation but does not replace good raw-material handling, compatible packaging, or stability testing.",
      },
      {
        title: "Evaluate the complete oil phase",
        body: "Avocado oil can increase richness and cushion in balms, oils, creams, and hair products. Its effect depends on the complete blend, so compare prototypes for rub-in, after-feel, colour, odour, and stability instead of optimizing the ingredient in isolation.",
      },
    ],
    usefulFor: [
      "Body oils, facial oils, and massage products",
      "Balms, salves, lip products, and body butters",
      "Cream and lotion oil phases",
      "Hair oils, masks, and conditioning products",
    ],
    verifyBeforeUse: [
      "Exact INCI identity, extraction method, and refining status",
      "Certificate of Analysis, peroxide value, colour, odour, and shelf life",
      "Any allergen or cross-contamination information relevant to the audience",
      "Oxidative stability in the final package under expected storage conditions",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Avocado Oil",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/avocado-oil",
        scope: "Ingredient identity and linked cosmetic-use references.",
      },
      {
        label: "Cosmetic Ingredient Review — Persea Gratissima (Avocado) Oil",
        href: "https://www.cir-safety.org/ingredient/persea-gratissima-avocado-oil",
        scope: "Ingredient record and current safety-review documents.",
      },
    ],
  },
  "mentha-piperita-oil": {
    reviewed: "October 7, 2026",
    metaTitle: "Peppermint Oil in Cosmetics — INCI & Formulation Guide",
    metaDescription:
      "Formulate cosmetics with peppermint oil using practical solubility, fragrance, sensitization, supplier-document, INCI, and Canadian compliance checks.",
    quickAnswer:
      "Peppermint oil is a complex, oil-soluble essential oil identified on cosmetic labels as Mentha Piperita (Peppermint) Oil. It can provide fragrance and a cooling sensory character, but composition varies and safe use must be based on the specific supplier documentation, intended product, exposure, and applicable fragrance guidance.",
    formulationNotes: [
      {
        title: "Formulate from the exact supplier lot",
        body: "Essential oils are mixtures rather than single molecules. Review the Certificate of Analysis, safety data, allergen declaration, and any applicable IFRA documentation for the exact material. A generic internet usage rate is not a substitute for those documents.",
      },
      {
        title: "Handle it as an oil-soluble fragrance material",
        body: "Peppermint oil does not dissolve directly in water. Water-based products need a suitable solubilization or emulsification strategy, followed by clarity, stability, odour, and packaging checks. Add it at a temperature supported by the process and supplier guidance.",
      },
      {
        title: "Avoid therapeutic shortcuts",
        body: "Cooling sensation does not prove a product treats pain, congestion, infection, or another condition. Keep cosmetic claims tied to appearance, cleansing, scent, or sensory experience unless the product is intentionally developed and authorized under another Canadian regulatory pathway.",
      },
    ],
    usefulFor: [
      "Rinse-off body and hair products",
      "Foot and body products designed around a cooling sensory profile",
      "Anhydrous balms or oils with a documented fragrance system",
      "Fragrance blends where supplier and IFRA limits are available",
    ],
    verifyBeforeUse: [
      "Botanical identity, extraction method, origin, and batch Certificate of Analysis",
      "Supplier allergen declaration and applicable IFRA certificate/category limit",
      "Finished-product sensitization risk, intended user, exposure, and directions",
      "Current Canadian labelling, Hotlist, and cosmetic-claim requirements",
    ],
    sources: [
      ...healthCanadaSources,
      {
        label: "NIH PubChem — Peppermint Oil",
        href: "https://pubchem.ncbi.nlm.nih.gov/compound/Peppermint-Oil",
        scope: "Ingredient identity, composition context, cosmetic uses, and linked safety references.",
      },
      {
        label: "Cosmetic Ingredient Review — Peppermint-derived ingredients",
        href: "https://cir-safety.org/supplementaldoc/amended-safety-assessment-mentha-piperita-peppermint-derived-ingredients-used-cosmet",
        scope: "Safety assessment and conditions relevant to peppermint-derived cosmetic ingredients.",
      },
    ],
  },
};

export function getIngredientEditorialGuide(slug: string) {
  return INGREDIENT_EDITORIAL_GUIDES[slug] ?? null;
}

export function hasIngredientEditorialGuide(slug: string) {
  return Boolean(INGREDIENT_EDITORIAL_GUIDES[slug]);
}
