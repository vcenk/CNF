"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 9,
    color: "#1e1a17",
  },
  // Header
  header: {
    textAlign: "center",
    marginBottom: 20,
    paddingBottom: 12,
    borderBottom: "1 solid #ddd",
  },
  productNameEn: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  productNameFr: {
    fontSize: 14,
    color: "#5a544d",
    marginBottom: 8,
  },
  netQuantity: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginTop: 4,
  },
  // Claims
  claimsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
    marginTop: 6,
  },
  claim: {
    fontSize: 8,
    color: "#5a544d",
  },
  // Ingredients
  sectionTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#5a544d",
    marginBottom: 4,
    marginTop: 16,
  },
  ingredientList: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#333",
  },
  mayContain: {
    fontSize: 8,
    lineHeight: 1.5,
    color: "#333",
    marginTop: 2,
  },
  // Allergens
  allergenBox: {
    marginTop: 10,
    padding: 8,
    border: "1 solid #b96a1b",
    borderRadius: 3,
    backgroundColor: "#fdf0e0",
  },
  allergenTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#b96a1b",
    marginBottom: 3,
  },
  allergenText: {
    fontSize: 8,
    color: "#333",
  },
  // Warnings
  warningBox: {
    marginTop: 10,
    padding: 8,
    border: "1 solid #ddd",
    borderRadius: 3,
  },
  warningTitle: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#5a544d",
    marginBottom: 3,
  },
  warningText: {
    fontSize: 8,
    color: "#333",
    marginBottom: 2,
  },
  warningTextFr: {
    fontSize: 8,
    color: "#5a544d",
    fontStyle: "italic",
    marginBottom: 6,
  },
  // Company
  companySection: {
    marginTop: 20,
    paddingTop: 12,
    borderTop: "1 solid #ddd",
    textAlign: "center",
  },
  companyName: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  companyAddress: {
    fontSize: 8,
    color: "#5a544d",
    marginTop: 2,
  },
  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 6,
    color: "#999",
    textAlign: "center",
  },
});

interface LabelDocumentProps {
  productNameEn: string;
  productNameFr: string;
  companyName: string;
  companyAddress: string;
  netWeight: string | null;
  netVolume: string | null;
  inciList: string[];
  mayContain: string[];
  warningsEn: string[];
  warningsFr: string[];
  allergens: string[];
  claimsEn: string[];
  claimsFr: string[];
}

export function LabelDocument({
  productNameEn,
  productNameFr,
  companyName,
  companyAddress,
  netWeight,
  netVolume,
  inciList,
  mayContain,
  warningsEn,
  warningsFr,
  allergens,
  claimsEn,
  claimsFr,
}: LabelDocumentProps) {
  const netQty = netWeight ? `${netWeight} g` : netVolume ? `${netVolume} mL` : null;

  return (
    <Document>
      <Page size="A5" style={styles.page}>
        {/* Product name bilingual */}
        <View style={styles.header}>
          <Text style={styles.productNameEn}>{productNameEn}</Text>
          {productNameFr && (
            <Text style={styles.productNameFr}>{productNameFr}</Text>
          )}
          {netQty && <Text style={styles.netQuantity}>{netQty}</Text>}

          {/* Claims */}
          {(claimsEn.length > 0 || claimsFr.length > 0) && (
            <View style={styles.claimsRow}>
              {claimsEn.map((c, i) => (
                <Text key={`en-${i}`} style={styles.claim}>
                  {c}
                </Text>
              ))}
              {claimsFr.map((c, i) => (
                <Text key={`fr-${i}`} style={styles.claim}>
                  {c}
                </Text>
              ))}
            </View>
          )}
        </View>

        {/* INCI ingredient list */}
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Text style={styles.ingredientList}>
          {inciList.join(", ")}
          {mayContain.length > 0 && `. +/- ${mayContain.join(", ")}`}
          {"."}
        </Text>

        {/* Fragrance allergen disclosure */}
        {allergens.length > 0 && (
          <View style={styles.allergenBox}>
            <Text style={styles.allergenTitle}>
              Fragrance Allergens / Allergènes de parfum
            </Text>
            <Text style={styles.allergenText}>{allergens.join(", ")}</Text>
          </View>
        )}

        {/* Warnings bilingual */}
        {warningsEn.length > 0 && (
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>
              Caution / Mise en garde
            </Text>
            {warningsEn.map((w, i) => (
              <View key={i}>
                <Text style={styles.warningText}>{w}</Text>
                {warningsFr[i] && (
                  <Text style={styles.warningTextFr}>{warningsFr[i]}</Text>
                )}
              </View>
            ))}
          </View>
        )}

        {/* Company info */}
        <View style={styles.companySection}>
          <Text style={styles.companyName}>{companyName}</Text>
          {companyAddress && (
            <Text style={styles.companyAddress}>{companyAddress}</Text>
          )}
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Generated by FormulaNorth — formulanorth.com
        </Text>
      </Page>
    </Document>
  );
}
