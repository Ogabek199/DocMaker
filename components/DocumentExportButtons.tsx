"use client";

import React, { useState } from "react";
import { Download, FileText, Printer, Loader2 } from "lucide-react";
import { DocType, BlankaFields, DavernostFields } from "@/lib/docx-fields";
import { downloadPDF, printDocument } from "@/lib/pdf";

interface DocumentExportButtonsProps {
  docType: DocType;
  blankaData: BlankaFields;
  davernostData: DavernostFields;
}

export default function DocumentExportButtons({
  docType,
  blankaData,
  davernostData,
}: DocumentExportButtonsProps) {
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPrint, setLoadingPrint] = useState(false);

  // 1. DOCX yuklab olish
  const handleDownloadDocx = async () => {
    setLoadingDocx(true);
    try {
      const payload = {
        docType,
        fields: docType === "blanka" ? blankaData : davernostData,
      };

      const response = await fetch("/api/generate-docx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("DOCX faylini yaratishda xatolik yuz berdi");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        docType === "blanka"
          ? `Trudovoy_Kontrakt_${blankaData.contractNumber || "21"}.docx`
          : `Doverennost_${davernostData.workerFio?.split(" ")[0] || "doc"}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (err) {
      console.error(err);
      alert("DOCX faylini yuklab olishda xatolik yuz berdi.");
    } finally {
      setLoadingDocx(false);
    }
  };

  // 2. PDF yuklab olish
  const handleDownloadPdf = async () => {
    setLoadingPdf(true);
    try {
      const filename =
        docType === "blanka"
          ? `Trudovoy_Kontrakt_${blankaData.contractNumber || "21"}.pdf`
          : `Doverennost_${davernostData.workerFio?.split(" ")[0] || "doc"}.pdf`;
      await downloadPDF("docx-preview-container", filename);
    } catch (err) {
      console.error(err);
      alert("PDF yaratishda xatolik yuz berdi.");
    } finally {
      setLoadingPdf(false);
    }
  };

  // 3. Chop etish
  const handlePrint = async () => {
    setLoadingPrint(true);
    try {
      await printDocument("docx-preview-container");
    } catch (err) {
      console.error(err);
      alert("Chop etishda xatolik yuz berdi.");
    } finally {
      setLoadingPrint(false);
    }
  };

  return (
    <div className="flex flex-col gap-2.5 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* DOCX yuklab olish */}
        <button
          type="button"
          onClick={handleDownloadDocx}
          disabled={loadingDocx}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-60 text-xs sm:text-sm"
        >
          {loadingDocx ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>DOCX tayyorlanmoqda...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>DOCX yuklab olish</span>
            </>
          )}
        </button>

        {/* PDF yuklab olish */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={loadingPdf}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-md active:scale-95 disabled:opacity-60 text-xs sm:text-sm"
        >
          {loadingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>PDF tayyorlanmoqda...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>PDF yuklab olish</span>
            </>
          )}
        </button>
      </div>

      {/* Chop etish */}
      <button
        type="button"
        onClick={handlePrint}
        disabled={loadingPrint}
        className="btn-secondary w-full py-2.5 text-xs sm:text-sm"
      >
        {loadingPrint ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Chop etilmoqda...</span>
          </>
        ) : (
          <>
            <Printer className="w-4 h-4 text-gray-600" />
            <span>Chop etish (Print)</span>
          </>
        )}
      </button>
    </div>
  );
}
