"use client";

import { useState, useRef, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Eye,
  FileCheck2,
  FileBadge,
  Sparkles,
} from "lucide-react";
import Header from "@/components/Header";
import DocumentForm from "@/components/DocumentForm";
import DocumentPreview from "@/components/DocumentPreview";
import DocumentExportButtons from "@/components/DocumentExportButtons";
import {
  DocType,
  BlankaFields,
  DavernostFields,
  BLANKA_DEFAULTS,
  DAVERNOST_DEFAULTS,
} from "@/lib/docx-fields";

export default function Home() {
  const [docType, setDocType] = useState<DocType>("davernost");
  const [blankaData, setBlankaData] = useState<BlankaFields>({
    ...BLANKA_DEFAULTS,
  });
  const [davernostData, setDavernostData] = useState<DavernostFields>({
    ...DAVERNOST_DEFAULTS,
  });

  const [zoom, setZoom] = useState(0.8);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Blanka o'zgarganda davernostning umumiy maydonlari ham avtomatik sinxronlanadi
  const handleBlankaChange = useCallback((updated: Partial<BlankaFields>) => {
    setBlankaData((prev) => {
      const next = { ...prev, ...updated };
      setDavernostData((prevDav) => ({
        ...prevDav,
        ...(updated.workerFio !== undefined && { workerFio: updated.workerFio }),
        ...(updated.passport !== undefined && { passport: updated.passport }),
        ...(updated.issuedDate !== undefined && { issuedDate: updated.issuedDate }),
        ...(updated.issuedPlace !== undefined && { issuedPlace: updated.issuedPlace }),
        ...(updated.startDate !== undefined && { validFrom: updated.startDate }),
        ...(updated.endDate !== undefined && { validUntil: updated.endDate }),
      }));
      return next;
    });
  }, []);

  // Davernost o'zgarganda blankaning umumiy maydonlari ham avtomatik sinxronlanadi
  const handleDavernostChange = useCallback(
    (updated: Partial<DavernostFields>) => {
      setDavernostData((prev) => {
        const next = { ...prev, ...updated };
        setBlankaData((prevBlanka) => ({
          ...prevBlanka,
          ...(updated.workerFio !== undefined && { workerFio: updated.workerFio }),
          ...(updated.passport !== undefined && { passport: updated.passport }),
          ...(updated.issuedDate !== undefined && { issuedDate: updated.issuedDate }),
          ...(updated.issuedPlace !== undefined && { issuedPlace: updated.issuedPlace }),
          ...(updated.validFrom !== undefined && { startDate: updated.validFrom }),
          ...(updated.validUntil !== undefined && { endDate: updated.validUntil }),
        }));
        return next;
      });
    },
    []
  );

  // Tiklash (Reset) tugmasi - ikkala hujjatni ham boshlang'ich holatga qaytaradi
  const handleReset = () => {
    setBlankaData({ ...BLANKA_DEFAULTS });
    setDavernostData({ ...DAVERNOST_DEFAULTS });
  };

  const handleZoomIn = () =>
    setZoom((z) => Math.min(Number((z + 0.1).toFixed(1)), 1.3));
  const handleZoomOut = () =>
    setZoom((z) => Math.max(Number((z - 0.1).toFixed(1)), 0.4));
  const handleZoomReset = () => setZoom(0.8);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <Header />

      {/* Top Banner & Document Switcher */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 sticky top-16 z-30 shadow-xs">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Document Type Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-gray-100 rounded-xl w-full sm:w-auto">
            <button
              type="button"
              onClick={() => {
                setDocType("davernost");
                setShowPreviewMobile(false);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                docType === "davernost"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileBadge className="w-4 h-4" />
              <span>Доверенность</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setDocType("blanka");
                setShowPreviewMobile(false);
              }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                docType === "blanka"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Бланка (Трудовой контракт)</span>
            </button>
          </div>

          {/* Quick info / Mobile preview toggle */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <div className="hidden md:flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ma&apos;lumotlarni bir marta kiriting — ikkala hujjat ham tayyorlanadi</span>
            </div>

            <button
              type="button"
              className="lg:hidden flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-2 rounded-lg ml-auto"
              onClick={() => setShowPreviewMobile(!showPreviewMobile)}
            >
              <Eye className="w-4 h-4" />
              <span>
                {showPreviewMobile ? "Formaga qaytish" : "Hujjatni ko'rish"}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main workspace */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* ── LEFT: FORM PANEL ── */}
          <div
            className={`w-full lg:w-[420px] xl:w-[460px] flex-shrink-0 ${
              showPreviewMobile ? "hidden" : "block"
            } lg:block`}
          >
            <div className="card p-4 sm:p-5 sticky top-36 bg-white shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-gray-900">
                    Hujjat ma&apos;lumotlari
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Доверенность va Бланка uchun umumiy
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-gray-600 hover:text-red-600 transition-colors flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 active:scale-95 cursor-pointer font-medium"
                  title="Boshlang'ich holatga qaytarish"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-gray-500 hover:text-red-600" />
                  <span>Tiklash</span>
                </button>
              </div>

              {/* Scrollable Form Fields */}
              <div className="max-h-[calc(100vh-320px)] overflow-y-auto pr-1">
                <DocumentForm
                  docType={docType}
                  blankaData={blankaData}
                  davernostData={davernostData}
                  onBlankaChange={handleBlankaChange}
                  onDavernostChange={handleDavernostChange}
                />
              </div>

              {/* Export Buttons */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <DocumentExportButtons
                  docType={docType}
                  blankaData={blankaData}
                  davernostData={davernostData}
                  onDocTypeChange={setDocType}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: PREVIEW PANEL ── */}
          <div
            className={`flex-1 min-w-0 ${
              !showPreviewMobile ? "hidden" : "block"
            } lg:block`}
          >
            <div className="card p-3 sm:p-4 bg-white shadow-sm border border-gray-200">
              {/* Preview toolbar */}
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <h2 className="text-xs sm:text-sm font-bold text-gray-800">
                    Jonli ko&apos;rish —{" "}
                    {docType === "davernost" ? "Доверенность" : "Бланка (Трудовой контракт)"}
                  </h2>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.4}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
                    title="Kichraytirish"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    className="px-2 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded-lg transition-colors min-w-[52px] text-center cursor-pointer"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoom >= 1.3}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors cursor-pointer"
                    title="Kattalashtirish"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Preview container */}
              <div
                ref={previewContainerRef}
                className="overflow-auto bg-slate-200/80 rounded-xl p-3 sm:p-6 flex justify-center"
                style={{
                  minHeight: "450px",
                  maxHeight: "calc(100vh - 240px)",
                }}
              >
                <div
                  style={{
                    transformOrigin: "top center",
                    transform: `scale(${zoom})`,
                    width: "210mm",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <DocumentPreview
                    docType={docType}
                    blankaData={blankaData}
                    davernostData={davernostData}
                    containerId="docx-preview-container"
                  />
                </div>
              </div>

              {/* Mobile Export */}
              <div className="mt-4 lg:hidden">
                <DocumentExportButtons
                  docType={docType}
                  blankaData={blankaData}
                  davernostData={davernostData}
                  onDocTypeChange={setDocType}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Offscreen hidden containers for instantaneous PDF generation of both documents */}
      <div
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: "210mm",
          pointerEvents: "none",
          zIndex: -1,
        }}
        aria-hidden="true"
      >
        <DocumentPreview
          docType="davernost"
          blankaData={blankaData}
          davernostData={davernostData}
          containerId="pdf-export-davernost"
        />
        <DocumentPreview
          docType="blanka"
          blankaData={blankaData}
          davernostData={davernostData}
          containerId="pdf-export-blanka"
        />
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-3.5 px-4 mt-auto">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2026 DocMaker — Davernos & Blanka Muharriri</p>
          <p>DOCX va PDF formatlarida yuklab olish imkoniyati bilan</p>
        </div>
      </footer>
    </div>
  );
}
