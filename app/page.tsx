"use client";

import { useState, useRef, useCallback } from "react";
import { ZoomIn, ZoomOut, RotateCcw, Eye } from "lucide-react";
import Header from "@/components/Header";
import FormPanel from "@/components/FormPanel";
import PreviewPanel from "@/components/PreviewPanel";
import DownloadButton from "@/components/DownloadButton";
import { BlankData, defaultBlankData } from "@/lib/templates";

export default function Home() {
  const [data, setData] = useState<BlankData>(defaultBlankData);
  const [zoom, setZoom] = useState(0.6);
  const [showPreviewMobile, setShowPreviewMobile] = useState(false);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  const handleChange = useCallback((updated: Partial<BlankData>) => {
    setData((prev) => ({ ...prev, ...updated }));
  }, []);

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.1, 1.2));
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.1, 0.3));
  const handleZoomReset = () => setZoom(0.6);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold">
              Professional davernos blanka yarating
            </h1>
            <p className="text-blue-200 text-xs sm:text-sm mt-0.5">
              Ma&apos;lumotlarni to&apos;ldiring → Ko&apos;ring → PDF yuklab oling
            </p>
          </div>
          {/* Mobile preview toggle */}
          <button
            type="button"
            className="lg:hidden flex-shrink-0 flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white text-sm px-3 py-2 rounded-lg transition-colors"
            onClick={() => setShowPreviewMobile(!showPreviewMobile)}
          >
            <Eye className="w-4 h-4" />
            {showPreviewMobile ? "Forma" : "Ko'rish"}
          </button>
        </div>
      </div>

      {/* Main layout */}
      <main className="flex-1 max-w-screen-2xl mx-auto w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* ── LEFT: Form panel ── */}
          <div
            className={`w-full lg:w-[380px] xl:w-[420px] flex-shrink-0 ${showPreviewMobile ? "hidden" : "block"} lg:block`}
          >
            <div className="card p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold text-gray-800">
                  Blanka ma&apos;lumotlari
                </h2>
                <button
                  type="button"
                  onClick={() => setData(defaultBlankData)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Tozalash
                </button>
              </div>

              <div className="max-h-[calc(100vh-280px)] overflow-y-auto pr-1 -mr-1">
                <FormPanel data={data} onChange={handleChange} />
              </div>

              {/* Download */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <DownloadButton orgName={data.orgName} />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Preview panel ── */}
          <div
            className={`flex-1 min-w-0 ${!showPreviewMobile ? "hidden" : "block"} lg:block`}
          >
            <div className="card p-3 sm:p-4">
              {/* Preview toolbar */}
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-bold text-gray-800">
                  Ko&apos;rish ({data.template === "classic" ? "Klassik" : data.template === "modern" ? "Zamonaviy" : data.template === "minimal" ? "Minimal" : "Korporativ"})
                </h2>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    disabled={zoom <= 0.3}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    title="Kichraytirish"
                  >
                    <ZoomOut className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomReset}
                    className="px-2 py-1 text-xs text-gray-600 hover:bg-gray-100 rounded-lg transition-colors min-w-[48px] text-center"
                  >
                    {Math.round(zoom * 100)}%
                  </button>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    disabled={zoom >= 1.2}
                    className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-40 transition-colors"
                    title="Kattalashtirish"
                  >
                    <ZoomIn className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Preview container */}
              <div
                ref={previewContainerRef}
                className="overflow-auto bg-gray-200 rounded-xl p-4 sm:p-6"
                style={{ minHeight: "400px", maxHeight: "calc(100vh - 240px)" }}
              >
                <div
                  style={{
                    transformOrigin: "top center",
                    transform: `scale(${zoom})`,
                    width: "210mm",
                    margin: "0 auto",
                    transition: "transform 0.2s ease",
                  }}
                >
                  <PreviewPanel data={data} />
                </div>
              </div>

              {/* Download (mobile) */}
              <div className="mt-3 lg:hidden">
                <DownloadButton orgName={data.orgName} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 px-4">
        <div className="max-w-screen-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-400">
            © 2026 DocMaker — Barcha huquqlar himoyalangan
          </p>
          <p className="text-xs text-gray-400">
            Professional davernos blanka yasatuvchi — Bepul, tez, qulay
          </p>
        </div>
      </footer>
    </div>
  );
}
