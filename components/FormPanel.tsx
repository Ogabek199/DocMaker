"use client";

import { useState, useRef } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  FileText,
  Palette,
  Image as ImageIcon,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";
import { BlankData, templates, TemplateId } from "@/lib/templates";

interface FormPanelProps {
  data: BlankData;
  onChange: (updated: Partial<BlankData>) => void;
}

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Section({ title, icon, children, defaultOpen = true }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          {icon}
          {title}
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        )}
      </button>
      {open && <div className="p-4 space-y-3 bg-white">{children}</div>}
    </div>
  );
}

interface FieldProps {
  label: string;
  children: React.ReactNode;
  half?: boolean;
}

function Field({ label, children, half }: FieldProps) {
  return (
    <div className={half ? "flex-1 min-w-0" : "w-full"}>
      <label className="label">{label}</label>
      {children}
    </div>
  );
}

const COLORS = [
  "#1e40af",
  "#0f766e",
  "#374151",
  "#7c3aed",
  "#b91c1c",
  "#c2410c",
  "#065f46",
  "#1e3a5f",
];

export default function FormPanel({ data, onChange }: FormPanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Logotip hajmi 2MB dan oshmasligi kerak");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      onChange({ logoUrl: ev.target?.result as string });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-3" id="form">
      {/* Shablon tanlash */}
      <Section
        title="Shablon"
        icon={<Palette className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <div className="grid grid-cols-2 gap-2">
          {templates.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onChange({ template: t.id as TemplateId })}
              className={`p-3 rounded-xl border-2 text-left transition-all duration-200 ${
                data.template === t.id
                  ? "border-blue-500 bg-blue-50 shadow-md"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <div
                className="w-full h-2 rounded-full mb-2"
                style={{ backgroundColor: t.previewColor }}
              />
              <div className="text-xs font-semibold text-gray-800">
                {t.nameUz}
              </div>
              <div className="text-xs text-gray-500">{t.description}</div>
            </button>
          ))}
        </div>

        {/* Rang tanlash */}
        <div className="mt-3">
          <label className="label">Asosiy rang</label>
          <div className="flex items-center gap-2 flex-wrap">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onChange({ primaryColor: c })}
                className={`w-7 h-7 rounded-full transition-all duration-200 border-2 ${
                  data.primaryColor === c
                    ? "border-gray-800 scale-110 shadow-md"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
                title={c}
              />
            ))}
            <input
              type="color"
              value={data.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-7 h-7 rounded-full cursor-pointer border-2 border-gray-300"
              title="Rang tanlash"
            />
          </div>
        </div>

        {/* Logotip yuklash */}
        <div className="mt-3">
          <label className="label">Logotip</label>
          {data.logoUrl ? (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={data.logoUrl}
                alt="Logo"
                className="h-12 max-w-[80px] object-contain"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-green-600 font-medium">
                  ✓ Logotip yuklandi
                </p>
              </div>
              <button
                type="button"
                onClick={() => onChange({ logoUrl: null })}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => logoInputRef.current?.click()}
              className="w-full flex flex-col items-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all duration-200"
            >
              <ImageIcon className="w-8 h-8 text-gray-400" />
              <span className="text-xs text-gray-500">
                Logotip yuklash (PNG, JPG, SVG)
              </span>
              <span className="text-xs text-gray-400">Max: 2MB</span>
            </button>
          )}
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleLogoUpload}
          />
        </div>
      </Section>

      {/* Tashkilot ma'lumotlari */}
      <Section
        title="Tashkilot ma'lumotlari"
        icon={<Building2 className="w-4 h-4 text-blue-600" />}
        defaultOpen={true}
      >
        <Field label="Tashkilot nomi (O'zbek)">
          <input
            type="text"
            className="input-field"
            value={data.orgName}
            onChange={(e) => onChange({ orgName: e.target.value })}
            placeholder="KOMPANIYA NOMI"
          />
        </Field>
        <Field label="Tashkilot nomi (Inglizcha)">
          <input
            type="text"
            className="input-field"
            value={data.orgNameEn}
            onChange={(e) => onChange({ orgNameEn: e.target.value })}
            placeholder="COMPANY NAME"
          />
        </Field>
        <div className="flex gap-2">
          <Field label="Tashkilot turi" half>
            <select
              className="input-field"
              value={data.orgType}
              onChange={(e) => onChange({ orgType: e.target.value })}
            >
              <option>MChJ</option>
              <option>AJ</option>
              <option>YoQT</option>
              <option>XK</option>
              <option>Davlat muassasasi</option>
              <option>Nodavlat tashkilot</option>
              <option>Yakka tartibdagi tadbirkor</option>
            </select>
          </Field>
          <Field label="INN" half>
            <input
              type="text"
              className="input-field"
              value={data.inn}
              onChange={(e) => onChange({ inn: e.target.value })}
              placeholder="123456789"
            />
          </Field>
        </div>
        <Field label="OKED">
          <input
            type="text"
            className="input-field"
            value={data.oked}
            onChange={(e) => onChange({ oked: e.target.value })}
            placeholder="46900"
          />
        </Field>
      </Section>

      {/* Manzil */}
      <Section
        title="Manzil"
        icon={<MapPin className="w-4 h-4 text-green-600" />}
        defaultOpen={false}
      >
        <Field label="Ko'cha, uy">
          <input
            type="text"
            className="input-field"
            value={data.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Ko'cha nomi, uy raqami"
          />
        </Field>
        <div className="flex gap-2">
          <Field label="Shahar" half>
            <input
              type="text"
              className="input-field"
              value={data.city}
              onChange={(e) => onChange({ city: e.target.value })}
              placeholder="Toshkent"
            />
          </Field>
          <Field label="Indeks" half>
            <input
              type="text"
              className="input-field"
              value={data.zipCode}
              onChange={(e) => onChange({ zipCode: e.target.value })}
              placeholder="100000"
            />
          </Field>
        </div>
        <Field label="Viloyat">
          <select
            className="input-field"
            value={data.region}
            onChange={(e) => onChange({ region: e.target.value })}
          >
            {[
              "Toshkent shahri",
              "Toshkent viloyati",
              "Samarqand viloyati",
              "Buxoro viloyati",
              "Andijon viloyati",
              "Farg'ona viloyati",
              "Namangan viloyati",
              "Qashqadaryo viloyati",
              "Surxondaryo viloyati",
              "Xorazm viloyati",
              "Navoiy viloyati",
              "Sirdaryo viloyati",
              "Jizzax viloyati",
              "Qoraqalpog'iston Respublikasi",
            ].map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </Field>
      </Section>

      {/* Aloqa */}
      <Section
        title="Aloqa ma'lumotlari"
        icon={<Phone className="w-4 h-4 text-orange-600" />}
        defaultOpen={false}
      >
        <div className="flex gap-2">
          <Field label="Telefon" half>
            <input
              type="tel"
              className="input-field"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+998 71 123-45-67"
            />
          </Field>
          <Field label="Faks" half>
            <input
              type="tel"
              className="input-field"
              value={data.fax}
              onChange={(e) => onChange({ fax: e.target.value })}
              placeholder="+998 71 123-45-68"
            />
          </Field>
        </div>
        <Field label="E-mail">
          <input
            type="email"
            className="input-field"
            value={data.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="info@company.uz"
          />
        </Field>
        <Field label="Veb-sayt">
          <input
            type="url"
            className="input-field"
            value={data.website}
            onChange={(e) => onChange({ website: e.target.value })}
            placeholder="www.company.uz"
          />
        </Field>
      </Section>

      {/* Bank */}
      <Section
        title="Bank ma'lumotlari"
        icon={<CreditCard className="w-4 h-4 text-purple-600" />}
        defaultOpen={false}
      >
        <Field label="Bank nomi">
          <input
            type="text"
            className="input-field"
            value={data.bankName}
            onChange={(e) => onChange({ bankName: e.target.value })}
            placeholder="Asaka Bank"
          />
        </Field>
        <Field label="Hisob raqami (20 xona)">
          <input
            type="text"
            className="input-field"
            value={data.bankAccount}
            onChange={(e) => onChange({ bankAccount: e.target.value })}
            placeholder="20208000200123456789"
            maxLength={20}
          />
        </Field>
        <Field label="MFO">
          <input
            type="text"
            className="input-field"
            value={data.mfo}
            onChange={(e) => onChange({ mfo: e.target.value })}
            placeholder="00441"
            maxLength={5}
          />
        </Field>
      </Section>

      {/* Hujjat */}
      <Section
        title="Hujjat matni"
        icon={<FileText className="w-4 h-4 text-red-600" />}
        defaultOpen={true}
      >
        <div className="flex gap-2">
          <Field label="Hujjat raqami" half>
            <input
              type="text"
              className="input-field"
              value={data.docNumber}
              onChange={(e) => onChange({ docNumber: e.target.value })}
              placeholder="01"
            />
          </Field>
          <Field label="Sana" half>
            <input
              type="date"
              className="input-field"
              value={
                data.docDate.includes(".")
                  ? data.docDate.split(".").reverse().join("-")
                  : data.docDate
              }
              onChange={(e) => {
                const d = new Date(e.target.value);
                onChange({
                  docDate: d.toLocaleDateString("uz-UZ"),
                });
              }}
            />
          </Field>
        </div>
        <Field label="Mavzu (ixtiyoriy)">
          <input
            type="text"
            className="input-field"
            value={data.subject}
            onChange={(e) => onChange({ subject: e.target.value })}
            placeholder="Xat mavzusi..."
          />
        </Field>
        <Field label="Asosiy matn">
          <textarea
            className="input-field resize-none"
            rows={6}
            value={data.bodyText}
            onChange={(e) => onChange({ bodyText: e.target.value })}
            placeholder="Xat matnini shu yerga yozing..."
          />
        </Field>
        <div className="flex gap-2">
          <Field label="Lavozim" half>
            <input
              type="text"
              className="input-field"
              value={data.position}
              onChange={(e) => onChange({ position: e.target.value })}
              placeholder="Direktor"
            />
          </Field>
          <Field label="F.I.Sh." half>
            <input
              type="text"
              className="input-field"
              value={data.signature}
              onChange={(e) => onChange({ signature: e.target.value })}
              placeholder="Toshmatov A.B."
            />
          </Field>
        </div>
      </Section>
    </div>
  );
}
