"use client";

import { BlankData } from "@/lib/templates";

interface PreviewPanelProps {
  data: BlankData;
}

// ─── KLASSIK SHABLON ───────────────────────────────────────────────────────────
function ClassicTemplate({ data }: { data: BlankData }) {
  const c = data.primaryColor;

  return (
    <div className="w-full h-full font-sans text-gray-900 relative">
      {/* Header */}
      <div
        className="px-8 py-6 flex items-start justify-between gap-4"
        style={{ borderBottom: `3px solid ${c}` }}
      >
        {/* Logo */}
        <div className="flex-shrink-0">
          {data.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logoUrl}
              alt="Logo"
              className="h-16 max-w-[100px] object-contain"
            />
          ) : (
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white font-bold text-xl"
              style={{ backgroundColor: c }}
            >
              {data.orgName?.charAt(0) || "T"}
            </div>
          )}
        </div>

        {/* Org name */}
        <div className="flex-1 text-center">
          <div
            className="text-xs font-bold tracking-widest uppercase mb-0.5"
            style={{ color: c }}
          >
            O'ZBEKISTON RESPUBLIKASI
          </div>
          <div className="text-base font-bold text-gray-900 leading-tight">
            {data.orgType} «{data.orgName}»
          </div>
          {data.orgNameEn && (
            <div className="text-xs text-gray-500 italic">{data.orgNameEn}</div>
          )}
          <div className="text-xs text-gray-500 mt-1">
            INN: {data.inn} | OKED: {data.oked}
          </div>
        </div>

        {/* Contact info */}
        <div className="flex-shrink-0 text-right text-xs text-gray-600 space-y-0.5">
          <div>{data.address}</div>
          <div>
            {data.city}, {data.zipCode}
          </div>
          <div>Tel: {data.phone}</div>
          {data.fax && <div>Faks: {data.fax}</div>}
          <div>{data.email}</div>
          {data.website && <div>{data.website}</div>}
        </div>
      </div>

      {/* Doc number */}
      <div className="px-8 py-3 flex items-center justify-between text-xs text-gray-600 bg-gray-50">
        <span>
          № {data.docNumber} — {data.docDate}
        </span>
        {data.subject && (
          <span className="font-medium text-gray-800">
            Mavzu: {data.subject}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-8 py-6 min-h-[160mm]">
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {data.bodyText}
        </div>
      </div>

      {/* Footer / Signature */}
      <div className="px-8 py-4 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold">{data.position}</div>
          <div className="mt-6 border-b border-gray-400 w-40" />
          <div className="text-xs text-gray-500 mt-1">{data.signature}</div>
        </div>
        <div className="text-xs text-gray-400 text-right">
          <div>M.O.</div>
          <div className="text-gray-300">(Muhr o'rni)</div>
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-1"
        style={{ backgroundColor: c }}
      />

      {/* Bank info */}
      <div className="px-8 pb-6 pt-2">
        <div
          className="text-[9px] text-gray-500 border-t pt-2"
          style={{ borderColor: c + "40" }}
        >
          Bank: {data.bankName} | Hisob: {data.bankAccount} | MFO:{" "}
          {data.mfo}
        </div>
      </div>
    </div>
  );
}

// ─── ZAMONAVIY SHABLON ─────────────────────────────────────────────────────────
function ModernTemplate({ data }: { data: BlankData }) {
  const c = data.primaryColor;

  return (
    <div className="w-full h-full font-sans flex">
      {/* Left sidebar */}
      <div
        className="w-[60mm] flex-shrink-0 flex flex-col px-5 py-8"
        style={{ backgroundColor: c }}
      >
        {/* Logo */}
        <div className="mb-6">
          {data.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.logoUrl}
              alt="Logo"
              className="h-16 max-w-[80px] object-contain filter brightness-0 invert"
            />
          ) : (
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
              {data.orgName?.charAt(0) || "T"}
            </div>
          )}
        </div>

        {/* Org name */}
        <div className="text-white mb-6">
          <div className="text-xs font-bold uppercase tracking-widest opacity-70 mb-1">
            {data.orgType}
          </div>
          <div className="text-sm font-bold leading-tight">{data.orgName}</div>
          {data.orgNameEn && (
            <div className="text-xs opacity-60 italic mt-1">{data.orgNameEn}</div>
          )}
        </div>

        <div className="border-t border-white/20 mb-4" />

        {/* Contacts */}
        <div className="text-white/80 text-xs space-y-2 flex-1">
          <div>
            <div className="text-white/50 uppercase tracking-wider text-[9px] mb-0.5">Manzil</div>
            <div>{data.address}</div>
            <div>{data.city}, {data.zipCode}</div>
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-[9px] mb-0.5">Telefon</div>
            <div>{data.phone}</div>
            {data.fax && <div>Faks: {data.fax}</div>}
          </div>
          <div>
            <div className="text-white/50 uppercase tracking-wider text-[9px] mb-0.5">Elektron pochta</div>
            <div>{data.email}</div>
            {data.website && <div>{data.website}</div>}
          </div>
        </div>

        {/* Bank */}
        <div className="border-t border-white/20 pt-3 text-[8px] text-white/50">
          <div>INN: {data.inn}</div>
          <div>Bank: {data.bankName}</div>
          <div>MFO: {data.mfo}</div>
        </div>
      </div>

      {/* Right content */}
      <div className="flex-1 flex flex-col px-7 py-8">
        {/* Doc info */}
        <div className="flex items-center justify-between mb-6 pb-3" style={{ borderBottom: `2px solid ${c}` }}>
          <div className="text-xs text-gray-500">
            <span className="font-semibold text-gray-800">№ {data.docNumber}</span> — {data.docDate}
          </div>
          {data.subject && (
            <div className="text-xs font-medium" style={{ color: c }}>
              {data.subject}
            </div>
          )}
        </div>

        {/* Body */}
        <div className="flex-1">
          <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
            {data.bodyText}
          </div>
        </div>

        {/* Signature */}
        <div className="mt-8 flex items-end justify-between">
          <div>
            <div className="text-sm font-semibold text-gray-800">{data.position}</div>
            <div className="mt-8 border-b border-gray-400 w-36" />
            <div className="text-xs text-gray-500 mt-1">{data.signature}</div>
          </div>
          <div className="text-xs text-gray-300 text-center">
            <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-300 text-[9px]">
              M.O.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MINIMAL SHABLON ───────────────────────────────────────────────────────────
function MinimalTemplate({ data }: { data: BlankData }) {
  const c = data.primaryColor;

  return (
    <div className="w-full h-full font-sans px-10 py-8">
      {/* Top line */}
      <div className="flex items-start justify-between mb-1">
        <div className="flex items-center gap-3">
          {data.logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.logoUrl} alt="Logo" className="h-10 object-contain" />
          ) : (
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
              style={{ backgroundColor: c }}
            >
              {data.orgName?.charAt(0) || "T"}
            </div>
          )}
          <div>
            <div className="font-bold text-gray-900">
              {data.orgType} «{data.orgName}»
            </div>
            <div className="text-xs text-gray-400">{data.orgNameEn}</div>
          </div>
        </div>
        <div className="text-right text-xs text-gray-500">
          <div>{data.phone}</div>
          <div>{data.email}</div>
        </div>
      </div>

      {/* Divider */}
      <div className="flex gap-1 mb-6">
        <div className="h-0.5 flex-1" style={{ backgroundColor: c }} />
        <div className="h-0.5 w-4 bg-gray-200" />
      </div>

      {/* Doc ref */}
      <div className="text-xs text-gray-500 mb-6 flex gap-6">
        <span>Sana: <strong className="text-gray-800">{data.docDate}</strong></span>
        <span>Raqam: <strong className="text-gray-800">№ {data.docNumber}</strong></span>
        {data.subject && <span>Mavzu: <strong style={{ color: c }}>{data.subject}</strong></span>}
      </div>

      {/* Body */}
      <div className="min-h-[170mm]">
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {data.bodyText}
        </div>
      </div>

      {/* Signature */}
      <div className="mt-8 flex items-end justify-between">
        <div>
          <div className="text-sm font-semibold text-gray-700">{data.position}</div>
          <div className="mt-8 w-40 border-b border-gray-300" />
          <div className="text-xs text-gray-400 mt-1">{data.signature}</div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 pt-3 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-[9px] text-gray-400">
          <div>INN: {data.inn} | OKED: {data.oked}</div>
          <div className="text-center">{data.address}, {data.city}</div>
          <div className="text-right">Bank: {data.bankName} | MFO: {data.mfo}</div>
        </div>
      </div>
    </div>
  );
}

// ─── KORPORATIV SHABLON ────────────────────────────────────────────────────────
function CorporateTemplate({ data }: { data: BlankData }) {
  const c = data.primaryColor;

  return (
    <div className="w-full h-full font-sans">
      {/* Header */}
      <div className="px-8 py-7 flex items-center gap-6" style={{ backgroundColor: c }}>
        {data.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.logoUrl} alt="Logo" className="h-14 object-contain filter brightness-0 invert" />
        ) : (
          <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
            {data.orgName?.charAt(0) || "T"}
          </div>
        )}
        <div className="flex-1 text-white">
          <div className="text-xl font-bold tracking-wide">{data.orgType} «{data.orgName}»</div>
          {data.orgNameEn && <div className="text-sm opacity-70">{data.orgNameEn}</div>}
        </div>
        <div className="text-white/80 text-xs text-right space-y-0.5">
          <div>{data.phone}</div>
          <div>{data.email}</div>
          {data.website && <div>{data.website}</div>}
        </div>
      </div>

      {/* Sub-header */}
      <div className="px-8 py-2 flex items-center justify-between text-xs bg-gray-800 text-gray-300">
        <span>INN: {data.inn} | OKED: {data.oked} | {data.address}, {data.city}</span>
        <span>№ {data.docNumber} | {data.docDate}</span>
      </div>

      {/* Content */}
      <div className="px-8 py-8 min-h-[180mm]">
        {data.subject && (
          <div className="mb-4">
            <span
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: c }}
            >
              {data.subject}
            </span>
          </div>
        )}
        <div className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
          {data.bodyText}
        </div>
      </div>

      {/* Signature */}
      <div className="px-8 py-4 flex items-end justify-between">
        <div>
          <div className="text-sm font-bold text-gray-800">{data.position}</div>
          <div className="mt-8 border-b-2 border-gray-400 w-40" style={{ borderColor: c }} />
          <div className="text-xs text-gray-500 mt-1">{data.signature}</div>
        </div>
        <div className="text-xs text-gray-300 text-center">
          <div className="w-16 h-16 rounded-full border-2 border-gray-200 flex items-center justify-center">
            M.O.
          </div>
        </div>
      </div>

      {/* Bank footer */}
      <div className="px-8 pb-4 pt-2 border-t border-gray-100">
        <div className="text-[9px] text-gray-400">
          Bank: {data.bankName} | Hisob: {data.bankAccount} | MFO: {data.mfo}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN PREVIEW ──────────────────────────────────────────────────────────────
export default function PreviewPanel({ data }: PreviewPanelProps) {
  const templateMap = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
    corporate: CorporateTemplate,
  };

  const TemplateComponent = templateMap[data.template] || ClassicTemplate;

  return (
    <div
      id="blanka-preview"
      className="a4-paper template-transition"
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <TemplateComponent data={data} />
    </div>
  );
}
