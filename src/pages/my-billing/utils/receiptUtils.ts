import {jsPDF} from "jspdf";
import {formatDate} from "./tableDataUtils";

interface Fee {
    name: string;
    fee: number;
}

interface ReceiptData {
    invoiceNo: string;
    paidDate?: string;
    totalAmount: number | string;
    billTo: { name: string; email: string };
    billFrom: string;
    fees: Fee[];
}

export const generateReceiptPDF = ({
                                       invoiceNo = "N/A",
                                       paidDate,
                                       totalAmount = 0,
                                       billTo = {name: "Unknown", email: "N/A"},
                                       billFrom = "Property Management",
                                       fees = [],
                                   }: ReceiptData) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    let currentY = 14;
    const ACCENT_COLOR = "#1976D2";
    const formatCurrency = (amount: number | string) =>
        `${Number(amount).toLocaleString()} MMK`;
    const today = new Date().toLocaleDateString();

    currentY += 10;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(ACCENT_COLOR);
    doc.text("RECEIPT", margin, currentY);

    currentY += 5;
    doc.setDrawColor(ACCENT_COLOR);
    doc.setLineWidth(1.5);
    doc.line(margin, currentY, pageWidth - margin, currentY);

    currentY += 10;
    doc.setFontSize(10);
    doc.setTextColor(100);
    const col1X = margin;
    const col2X = pageWidth / 2 + 20;

    doc.setFont("helvetica", "normal");
    doc.text("Invoice No:", col1X, currentY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(invoiceNo, col1X + 25, currentY);

    currentY += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Paid Date:", col1X, currentY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(paidDate ? formatDate(paidDate) : "N/A", col1X + 25, currentY);

    currentY += 6;
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Downloaded:", col1X, currentY);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(today, col1X + 25, currentY);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Bill From:", col2X, currentY - 12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(billFrom, col2X + 20, currentY - 12);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(100);
    doc.text("Bill To:", col2X, currentY - 6);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0);
    doc.text(billTo.name, col2X + 20, currentY - 6);
    doc.setFontSize(8);
    doc.text(billTo.email, col2X + 20, currentY);

    currentY += 15;
    doc.setLineWidth(0.5);
    doc.setDrawColor(200);
    doc.setFillColor(ACCENT_COLOR);
    doc.setTextColor(255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.rect(margin, currentY, pageWidth - 2 * margin, 8, "F");
    doc.text("FEEs", margin + 2, currentY + 5.5);
    doc.text("AMOUNT (MMK)", pageWidth - margin - 30, currentY + 5.5);
    currentY += 8;

    doc.setTextColor(0);
    doc.setFont("helvetica", "normal");
    fees.forEach((f, index) => {
        const rowHeight = 7;
        if (index % 2 === 0) {
            doc.setFillColor("#F0F0F0");
            doc.rect(margin, currentY, pageWidth - 2 * margin, rowHeight, "F");
        }
        doc.text(f.name, margin + 2, currentY + 4.5);
        doc.text(formatCurrency(f.fee), pageWidth - margin - 30, currentY + 4.5);
        currentY += rowHeight;
    });

    currentY += 5;
    doc.setLineWidth(1);
    doc.setDrawColor(0);
    doc.line(pageWidth - 80, currentY, pageWidth - margin, currentY);
    currentY += 5;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL AMOUNT:", pageWidth - 95, currentY + 5);
    doc.setFontSize(14);
    doc.setTextColor(ACCENT_COLOR);
    doc.text(formatCurrency(totalAmount), pageWidth - margin - 3, currentY + 5, {
        align: "right",
    });

    currentY += 30;
    doc.setTextColor(150);
    doc.setFontSize(8);
    doc.text("Thank you for your business!", margin, currentY);

    doc.save(`receipt-${invoiceNo}.pdf`);
};

export const generateReceiptText = ({
                                        invoiceNo = "N/A",
                                        paidDate,
                                        totalAmount = 0,
                                        billTo = {name: "Unknown", email: "N/A"},
                                        billFrom = "Property Management",
                                        fees = [],
                                    }: ReceiptData) => {
    const formatCurrency = (amount: number | string) =>
        `${Number(amount).toLocaleString()} MMK`;
    const today = new Date().toLocaleDateString();
    const maxDescriptionLength = Math.max(...fees.map((f) => f.name.length), 20);
    const separator = "=".repeat(50);
    const spacer = "-".repeat(50);

    // Header
    let content = `RECEIPT\n${separator}\n`;
    content += `Invoice No: ${invoiceNo.padEnd(maxDescriptionLength + 10)}\n`;
    content += `Paid Date: ${(paidDate ? formatDate(paidDate) : "N/A").padEnd(
        maxDescriptionLength + 10
    )}\n`;
    content += `Downloaded: ${today.padEnd(maxDescriptionLength + 10)}\n`;
    content += `${spacer}\n`;

    // Bill To/From
    content += `Bill From: ${billFrom}\n`;
    content += `Bill To:   ${billTo.name}\n`;
    content += `Email:     ${billTo.email}\n`;
    content += `${spacer}\n`;

    // Fees Table
    content += `FEEs${" ".repeat(maxDescriptionLength - 5)} AMOUNT (MMK)\n`;
    content += `${"-".repeat(maxDescriptionLength + 15)}\n`;
    fees.forEach((f) => {
        const paddedName = f.name.padEnd(maxDescriptionLength);
        content += `${paddedName} ${formatCurrency(f.fee)}\n`;
    });

    // Total
    content += `${spacer}\n`;
    content += `TOTAL AMOUNT:${" ".repeat(
        maxDescriptionLength - 12
    )} ${formatCurrency(totalAmount)}\n`;
    content += `${separator}\n`;

    // Footer
    content += `Thank you for your business!\n`;

    const blob = new Blob([content], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt_${invoiceNo}.txt`;
    link.click();
    URL.revokeObjectURL(url);
};
