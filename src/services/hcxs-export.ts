/**
 * .hcxs export generator
 *
 * Generates an XML file in Health Canada's cosmetic notification format.
 * This is a simplified version — the full .hcxs schema is proprietary,
 * so this generates a structured XML that maps to CNF portal fields.
 */

interface HcxsInput {
  productNameEn: string;
  productNameFr: string;
  companyName: string;
  companyAddress: string;
  productCategory: string;
  usageType: string;
  ingredients: {
    inciName: string;
    percentage: number;
    casNumber: string | null;
    isFragranceAllergen: boolean;
  }[];
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function generateHcxsXml(input: HcxsInput): string {
  const now = new Date().toISOString();

  const ingredientXml = input.ingredients
    .sort((a, b) => b.percentage - a.percentage)
    .map(
      (ing, i) => `    <Ingredient sequence="${i + 1}">
      <InciName>${escapeXml(ing.inciName)}</InciName>
      <ConcentrationPercent>${ing.percentage}</ConcentrationPercent>
      ${ing.casNumber ? `<CasNumber>${escapeXml(ing.casNumber)}</CasNumber>` : ""}
      <IsFragranceAllergen>${ing.isFragranceAllergen}</IsFragranceAllergen>
    </Ingredient>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<CosmeticNotification xmlns="urn:health-canada:cosmetic-notification"
  version="1.0"
  generatedAt="${now}"
  generator="FormulaNorth">

  <Product>
    <ProductNameEnglish>${escapeXml(input.productNameEn)}</ProductNameEnglish>
    <ProductNameFrench>${escapeXml(input.productNameFr)}</ProductNameFrench>
    <Category>${escapeXml(input.productCategory)}</Category>
    <UsageType>${escapeXml(input.usageType)}</UsageType>
  </Product>

  <ResponsiblePerson>
    <CompanyName>${escapeXml(input.companyName)}</CompanyName>
    <Address>${escapeXml(input.companyAddress)}</Address>
  </ResponsiblePerson>

  <IngredientList count="${input.ingredients.length}">
${ingredientXml}
  </IngredientList>

</CosmeticNotification>`;
}

export function generateHcxsFile(input: HcxsInput): {
  filename: string;
  content: string;
  mimeType: string;
} {
  const xml = generateHcxsXml(input);
  const safeName = input.productNameEn
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "-")
    .replace(/-+/g, "-");

  return {
    filename: `${safeName}-cnf.hcxs`,
    content: xml,
    mimeType: "application/xml",
  };
}
