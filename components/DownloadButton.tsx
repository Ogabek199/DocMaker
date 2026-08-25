"use client";

import { useState } from "react";
import { Download, Printer, Loader2 } from "lucide-react";
import { downloadPDF, printDocument } from "@/lib/pdf";

interface DownloadButtonProps {
  orgName: string;
}

export default function DownloadButton({ orgName }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [printing, setPrinting] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const filename = `${orgName.replace(/[^a-zA-Z0-9а-яА-ЯёЁ\s]/g, "").trim() || "davernos"}-blanka.pdf`;
      await downloadPDF("blanka-preview", filename);
    } catch {
      alert("PDF yaratishda xatolik yuz berdi. Qaytadan urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = async () => {
    setPrinting(true);
    try {
      await printDocument("blanka-preview");
    } catch {
      alert("Chop etishda xatolik yuz berdi.");
    } finally {
      setPrinting(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <button
        type="button"
        onClick={handleDownload}
        disabled={loading}
        className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            PDF tayyorlanmoqda...
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            PDF yuklab olish
          </>
        )}
      </button>
      <button
        type="button"
        onClick={handlePrint}
        disabled={printing}
        className="btn-secondary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {printing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Tayyorlanmoqda...
          </>
        ) : (
          <>
            <Printer className="w-4 h-4" />
            Chop etish
          </>
        )}
      </button>
    </div>
  );
}
