"use client";

import {
  Document,
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
    (a, b) => b.percentage - a.percentage
  );
  const allergens = ingredients.filter((i) => i.isFragranceAllergen);
  const generatedAt = new Date().toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cosmetic Notification Form Summary</Text>
          <Text style={styles.subtitle}>
            FormulaNorth — Generated {generatedAt}
          </Text>
        </View>

        {/* Product details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Product Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Product name (EN):</Text>
            <Text style={styles.value}>{data.productNameEn || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Product name (FR):</Text>
            <Text style={styles.value}>{data.productNameFr || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Category:</Text>
            <Text style={styles.value}>
              {data.productCategory.replace("_", " ") || "—"}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usage type:</Text>
            <Text style={styles.value}>{data.usageType || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Net quantity:</Text>
            <Text style={styles.value}>
              {data.netWeightG
                ? `${data.netWeightG} g`
                : data.netVolumeMl
                  ? `${data.netVolumeMl} mL`
                  : "—"}
            </Text>
          </View>
        </View>

        {/* Responsible person */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Responsible Person</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Company:</Text>
            <Text style={styles.value}>{data.companyName || "—"}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Address:</Text>
            <Text style={styles.value}>{data.companyAddress || "—"}</Text>
          </View>
        </View>

        {/* Ingredient list */}
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
            {sortedIngredients.map((ing, i) => (
              <View key={i} style={styles.tableRow}>
                <Text style={[styles.tableCell, styles.col1]}>
                  {ing.inciName}
                </Text>
                <Text style={[styles.tableCell, styles.col2]}>
                  {ing.casNumber ?? "—"}
                </Text>
                <Text style={[styles.tableCell, styles.col3]}>
                  {ing.phase}
                </Text>
                <Text style={[styles.tableCell, styles.col4]}>
                  {ing.percentage}%
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Fragrance allergens */}
        {allergens.length > 0 && (
          <View style={styles.allergenNote}>
            <Text>
              Fragrance allergens present ({allergens.length}):{" "}
              {allergens.map((a) => a.inciName).join(", ")}. These must be
              individually disclosed on the product label per the April 2026
              Health Canada rule.
            </Text>
          </View>
        )}

        {/* Footer */}
        <Text style={styles.footer}>
          This is a human-readable summary of your Cosmetic Notification Form
          data. Use the .hcxs file for portal upload. Generated by FormulaNorth.
        </Text>
      </Page>
    </Document>
  );
}
