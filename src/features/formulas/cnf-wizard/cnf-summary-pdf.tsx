"use client";

import {
  Document,
  Image,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import type { CnfWizardData } from "@/app/formulas/[id]/cnf/actions";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1e1a17",
  },
  header: {
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "2 solid #0d6c63",
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  headerText: {
    flex: 1,
  },
  headerLogo: {
    width: 70,
    height: 52,
    objectFit: "contain",
  },
  title: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#0d6c63",
  },
  subtitle: {
    fontSize: 10,
    color: "#5a544d",
    marginTop: 4,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#5a544d",
    marginBottom: 6,
  },
  row: {
    flexDirection: "row",
    marginBottom: 3,
  },
  label: {
    width: 130,
    fontSize: 9,
    color: "#5a544d",
  },
  value: {
    flex: 1,
    fontSize: 10,
  },
  table: {
    marginTop: 6,
    border: "1 solid #ddd",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f5f0e8",
    padding: 6,
    borderBottom: "1 solid #ddd",
  },
  tableHeaderCell: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#5a544d",
    textTransform: "uppercase",
  },
  tableRow: {
    flexDirection: "row",
    padding: 6,
    borderBottom: "0.5 solid #eee",
  },
  tableCell: {
    fontSize: 9,
  },
  col1: { width: "50%" },
  col2: { width: "20%" },
  col3: { width: "15%" },
  col4: { width: "15%" },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 7,
    color: "#999",
    textAlign: "center",
    paddingTop: 8,
    borderTop: "0.5 solid #ddd",
  },
  allergenNote: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#fdf0e0",
    borderRadius: 3,
    fontSize: 8,
    color: "#b96a1b",
  },
});

interface PdfIngredient {
  inciName: string;
  commonName: string | null;
  casNumber: string | null;
  percentage: number;
  phase: string;
  isFragranceAllergen: boolean;
}

interface CnfSummaryPdfProps {
  data: CnfWizardData;
  ingredients: PdfIngredient[];
}

export function CnfSummaryPdf({ data, ingredients }: CnfSummaryPdfProps) {
  const sortedIngredients = [...ingredients].sort(
    (first, second) => second.percentage - first.percentage
  );
  const allergens = ingredients.filter((ingredient) => ingredient.isFragranceAllergen);
  const generatedAt = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src="/FormulaNorth_Logo.png" style={styles.headerLogo} />
          <View style={styles.headerText}>
            <Text style={styles.title}>
              Cosmetic Notification Preparation Summary
            </Text>
            <Text style={styles.subtitle}>
              FormulaNorth | Generated {generatedAt}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Product name (EN):</Text>
            <Text style={styles.value}>{data.productNameEn || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Product name (FR):</Text>
            <Text style={styles.value}>{data.productNameFr || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>
              {data.productCategory.replace("_", " ") || "-"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usage type:</Text>
            <Text style={styles.value}>{data.usageType || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net quantity:</Text>
            <Text style={styles.value}>
              {data.netWeightG
                ? `${data.netWeightG} g`
                : data.netVolumeMl
                  ? `${data.netVolumeMl} mL`
                  : "-"}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsible Person</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{data.companyName || "-"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{data.companyAddress || "-"}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Ingredient List ({ingredients.length})
          </Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, styles.col1]}>
                INCI Name
              </Text>
              <Text style={[styles.tableHeaderCell, styles.col2]}>CAS</Text>
              <Text style={[styles.tableHeaderCell, styles.col3]}>Phase</Text>
              <Text style={[styles.tableHeaderCell, styles.col4]}>%</Text>
            </View>
            {sortedIngredients.map((ingredient, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>
                  {ingredient.inciName}
                </Text>
                <Text style={[styles.tableCell, styles.col2]}>
                  {ingredient.casNumber ?? "-"}
                </Text>
                <Text style={[styles.tableCell, styles.col3]}>
                  {ingredient.phase}
                </Text>
                <Text style={[styles.tableCell, styles.col4]}>
                  {ingredient.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {allergens.length > 0 && (
          <View style={styles.allergenNote}>
            <Text>
              Fragrance allergens present ({allergens.length}):{" "}
              {allergens.map((allergen) => allergen.inciName).join(", ")}.
              These may require individual disclosure depending on the product
              and current Health Canada guidance.
            </Text>
          </View>
        )}

        <Text style={styles.footer}>
          This summary is provided for preparation and review only. It is not
          legal advice, regulatory approval, or confirmation of submission
          acceptance.
        </Text>
      </Page>
    </Document>
  );
}
