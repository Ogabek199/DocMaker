"use client";

import React, { useState } from "react";
import { Download, FileText, Printer, Loader2, Files, FileBadge, FileCheck2 } from "lucide-react";
import { DocType, BlankaFields, DavernostFields } from "@/lib/docx-fields";
import { downloadPDF, printDocument } from "@/lib/pdf";

export type ExportTarget = "davernost" | "blanka" | "both";

interface DocumentExportButtonsProps {
  docType: DocType;
  blankaData: BlankaFields;
  davernostData: DavernostFields;
  onDocTypeChange?: (type: DocType) => void;
}

export default function DocumentExportButtons({
  docType,
  blankaData,
  davernostData,
  onDocTypeChange,
}: DocumentExportButtonsProps) {
  const [exportTarget, setExportTarget] = useState<ExportTarget>(docType);
  const [loadingDocx, setLoadingDocx] = useState(false);
  const [loadingPdf, setLoadingPdf] = useState(false);
  const [loadingPrint, setLoadingPrint] = useState(false);

  // Sync export target when docType changes from external tabs
  React.useEffect(() => {
    setExportTarget((prev) => (prev === "both" ? "both" : docType));
  }, [docType]);

  const handleSelectTarget = (target: ExportTarget) => {
    setExportTarget(target);
    if (target === "davernost" || target === "blanka") {
      onDocTypeChange?.(target);
    }
  };

  // 1. DOCX yuklab olish (bitta yoki ikkalasi)
  const downloadSingleDocx = async (type: DocType) => {
    const payload = {
      docType: type,
      fields: type === "blanka" ? blankaData : davernostData,
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
      type === "blanka"
        ? `Trudovoy_Kontrakt_${blankaData.contractNumber || "21"}.docx`
        : `Doverennost_${davernostData.workerFio?.split(" ")[0] || "doc"}.docx`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  };

  const handleDownloadDocx = async () => {
    setLoadingDocx(true);
    try {
      if (exportTarget === "both") {
        await downloadSingleDocx("davernost");
        await new Promise((r) => setTimeout(r, 400));
        await downloadSingleDocx("blanka");
      } else {
        await downloadSingleDocx(exportTarget);
      }
    } catch (err) {
      console.error(err);
      alert("DOCX faylini yuklab olishda xatolik yuz berdi.");
    } finally {
      setLoadingDocx(false);
    }
  };

  // 2. PDF yuklab olish (bitta yoki ikkalasi)
  const downloadSinglePdf = async (type: DocType) => {
    const containerId = type === "davernost" ? "pdf-export-davernost" : "pdf-export-blanka";
    const filename =
      type === "blanka"
        ? `Trudovoy_Kontrakt_${blankaData.contractNumber || "21"}.pdf`
        : `Doverennost_${davernostData.workerFio?.split(" ")[0] || "doc"}.pdf`;

    // Agar maxsus export container topilmasa, jonli preview containeridan oladi
    const targetElementId = document.getElementById(containerId) ? containerId : "docx-preview-container";
    await downloadPDF(targetElementId, filename);
  };

  const handleDownloadPdf = async () => {
    setLoadingPdf(true);
    try {
      if (exportTarget === "both") {
        await downloadSinglePdf("davernost");
        await new Promise((r) => setTimeout(r, 600));
        await downloadSinglePdf("blanka");
      } else {
        await downloadSinglePdf(exportTarget);
      }
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
      const type: DocType = exportTarget === "both" ? docType : exportTarget;
      const containerId = type === "davernost" ? "pdf-export-davernost" : "pdf-export-blanka";
      const targetElementId = document.getElementById(containerId) ? containerId : "docx-preview-container";
      await printDocument(targetElementId);
    } catch (err) {
      console.error(err);
      alert("Chop etishda xatolik yuz berdi.");
    } finally {
      setLoadingPrint(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Hujjatni tanlash (Export Target Selector) */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-700">
          Yuklab olinadigan hujjat:
        </label>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => handleSelectTarget("davernost")}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              exportTarget === "davernost"
                ? "bg-white text-blue-700 shadow-sm border border-blue-200/60"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <FileBadge className="w-3.5 h-3.5 mb-0.5" />
            <span className="truncate w-full text-center">Доверенность</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTarget("blanka")}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              exportTarget === "blanka"
                ? "bg-white text-blue-700 shadow-sm border border-blue-200/60"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <FileCheck2 className="w-3.5 h-3.5 mb-0.5" />
            <span className="truncate w-full text-center">Бланка</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelectTarget("both")}
            className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg text-xs font-semibold transition-all ${
              exportTarget === "both"
                ? "bg-white text-indigo-700 shadow-sm border border-indigo-200/60"
                : "text-gray-600 hover:text-gray-900 hover:bg-white/60"
            }`}
          >
            <Files className="w-3.5 h-3.5 mb-0.5" />
            <span className="truncate w-full text-center">Ikkalasi</span>
          </button>
        </div>
      </div>

      {/* Yuklab olish tugmalari */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {/* DOCX yuklab olish */}
        <button
          type="button"
          onClick={handleDownloadDocx}
          disabled={loadingDocx}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-60 text-xs sm:text-sm cursor-pointer"
        >
          {loadingDocx ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Tayyorlanmoqda...</span>
            </>
          ) : (
            <>
              <FileText className="w-4 h-4" />
              <span>
                {exportTarget === "both"
                  ? "DOCX (Ikkalasini)"
                  : exportTarget === "blanka"
                  ? "Бланка DOCX"
                  : "Доверенность DOCX"}
              </span>
            </>
          )}
        </button>

        {/* PDF yuklab olish */}
        <button
          type="button"
          onClick={handleDownloadPdf}
          disabled={loadingPdf}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-60 text-xs sm:text-sm cursor-pointer"
        >
          {loadingPdf ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Tayyorlanmoqda...</span>
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              <span>
                {exportTarget === "both"
                  ? "PDF (Ikkalasini)"
                  : exportTarget === "blanka"
                  ? "Бланка PDF"
                  : "Доверенность PDF"}
              </span>
            </>
          )}
        </button>
      </div>

      {/* Chop etish */}
      <button
        type="button"
        onClick={handlePrint}
        disabled={loadingPrint}
        className="btn-secondary w-full py-2.5 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
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
