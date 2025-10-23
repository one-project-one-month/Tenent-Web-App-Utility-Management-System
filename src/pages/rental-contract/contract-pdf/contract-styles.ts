import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 10,
    fontFamily: "Helvetica",
    backgroundColor: "#FFFFFF",
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: "1pt solid #E5E5E5",
  },
  leftHeader: {
    flex: 1,
  },
  rightHeader: {
    flex: 1,
    alignItems: "flex-end",
  },
  companyName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  companyAddress: {
    fontSize: 9,
    color: "#6B7280",
    lineHeight: 1.3,
  },

  // Layout
  section: {
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 8,
    paddingBottom: 4,
    borderBottom: "1pt solid #F3F4F6",
  },
  twoColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    paddingVertical: 2,
  },
  label: {
    fontWeight: "bold",
    color: "#374151",
    fontSize: 9,
  },
  value: {
    color: "#6B7280",
    fontSize: 9,
  },

  // Table
  table: {
    backgroundColor: "#F9FAFB",
    border: "1pt solid #E5E7EB",
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottom: "1pt solid #F3F4F6",
  },
  tableLabel: {
    fontWeight: "bold",
    color: "#374151",
    fontSize: 9,
  },
  tableValue: {
    color: "#1F2937",
    fontSize: 9,
    fontWeight: "bold",
  },

  // Totals
  totalSection: {
    backgroundColor: "#1F2937",
    padding: 12,
    borderRadius: 6,
    marginTop: 15,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  totalAmount: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  // Footer
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    paddingTop: 15,
    borderTop: "1pt solid #E5E7EB",
    fontSize: 8,
    color: "#9CA3AF",
  },

  // Highlight / Notice Box
  highlightBox: {
    backgroundColor: "#FFFBEB",
    border: "1pt solid #F59E0B",
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  dueDateText: {
    fontSize: 9,
    color: "#B45309",
    fontWeight: "bold",
  },
});
