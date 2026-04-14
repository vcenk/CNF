export interface LabelTemplate {
  id: string;
  formulaId: string;
  productDisplayNameEn: string;
  productDisplayNameFr: string;
  companyDisplayName: string;
  companyAddress: string | null;
  netWeightG: number | null;
  netVolumeMl: number | null;
  warningsEn: string[];
  warningsFr: string[];
  fragranceAllergens: string[]; // ingredient IDs
  customClaimsEn: string[];
  customClaimsFr: string[];
}

export interface LabelData {
  productNameEn: string;
  productNameFr: string;
  companyName: string;
  companyAddress: string;
  inciList: string[];
  mayContainList: string[];
  warningsEn: string[];
  warningsFr: string[];
  allergenDisclosure: string[];
  netWeight: string | null;
  netVolume: string | null;
}
