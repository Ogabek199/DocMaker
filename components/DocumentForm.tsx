"use client";

import React from "react";
import { User, FileText, MapPin, Calendar, Hash, Building } from "lucide-react";
import {
  DocType,
  BlankaFields,
  DavernostFields,
} from "@/lib/docx-fields";
import CustomDatePicker from "./CustomDatePicker";
import CustomSelect from "./CustomSelect";

interface DocumentFormProps {
  docType: DocType;
  blankaData: BlankaFields;
  davernostData: DavernostFields;
  onBlankaChange: (updated: Partial<BlankaFields>) => void;
  onDavernostChange: (updated: Partial<DavernostFields>) => void;
}

const REGIONS = [
  "Ферганская область",
  "Ташкентская область",
  "город Ташкент",
  "Самаркандская область",
  "Бухарская область",
  "Андижанская область",
  "Наманганская область",
  "Кашкадарьинская область",
  "Сурхандарьинская область",
  "Хорезмская область",
  "Навоийская область",
  "Сырдарьинская область",
  "Джизакская область",
  "Республика Каракалпакстан",
];

export default function DocumentForm({
  docType,
  blankaData,
  davernostData,
  onBlankaChange,
  onDavernostChange,
}: DocumentFormProps) {
  if (docType === "davernost") {
    return (
      <div className="space-y-4">
        {/* Haydovchi ma'lumotlari */}
        <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
            <User className="w-4 h-4 text-blue-600" />
            <span>Haydovchi / Vakil ma&apos;lumotlari</span>
          </div>

          <div>
            <label className="label">F.I.Sh. (Familiya Ism Sharif)</label>
            <input
              type="text"
              className="input-field"
              value={davernostData.workerFio}
              onChange={(e) => onDavernostChange({ workerFio: e.target.value })}
              placeholder="ABDUKADIROV BAKHTIYOR IMOMALIEVICH"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="label">Pasport seriya va raqami</label>
              <input
                type="text"
                className="input-field uppercase"
                value={davernostData.passport}
                onChange={(e) => onDavernostChange({ passport: e.target.value })}
                placeholder="FA 2786135"
              />
            </div>
            <div>
              <CustomDatePicker
                label="Pasport berilgan sana"
                value={davernostData.issuedDate}
                onChange={(val) => onDavernostChange({ issuedDate: val })}
                outputFormat="with_g"
              />
            </div>
          </div>

          <div>
            <CustomSelect
              label="Pasport berilgan viloyat / joy"
              value={davernostData.issuedPlace}
              options={REGIONS}
              onChange={(val) => onDavernostChange({ issuedPlace: val })}
            />
          </div>
        </div>

        {/* Muddat */}
        <div className="p-3.5 bg-amber-50/50 rounded-xl border border-amber-100 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
            <Calendar className="w-4 h-4 text-amber-600" />
            <span>Ishonchnoma amal qilish muddati</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <CustomDatePicker
              label="Boshlanish sanasi"
              value={davernostData.validFrom}
              onChange={(val) => onDavernostChange({ validFrom: val })}
              outputFormat="raw_date"
            />
            <CustomDatePicker
              label="Tugash sanasi"
              value={davernostData.validUntil}
              onChange={(val) => onDavernostChange({ validUntil: val })}
              outputFormat="raw_date"
            />
          </div>
        </div>
      </div>
    );
  }

  // Blanka (Трудовой контракт)
  return (
    <div className="space-y-4">
      {/* Shartnoma raqami & Rahbariyat */}
      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Shartnoma ma&apos;lumotlari</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Shartnoma raqami</label>
            <div className="relative">
              <input
                type="text"
                className="input-field pl-8"
                value={blankaData.contractNumber}
                onChange={(e) =>
                  onBlankaChange({ contractNumber: e.target.value })
                }
                placeholder="21"
              />
              <Hash className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
            </div>
          </div>

          <div>
            <label className="label">Direktor F.I.Sh.</label>
            <input
              type="text"
              className="input-field"
              value={blankaData.directorFio}
              onChange={(e) => onBlankaChange({ directorFio: e.target.value })}
              placeholder="SOBIROV DAVLATBEK ATABEKOVICH"
            />
          </div>
        </div>
      </div>

      {/* Xodim ma'lumotlari */}
      <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
          <User className="w-4 h-4 text-blue-600" />
          <span>Xodim / Haydovchi ma&apos;lumotlari</span>
        </div>

        <div>
          <label className="label">Xodim F.I.Sh.</label>
          <input
            type="text"
            className="input-field"
            value={blankaData.workerFio}
            onChange={(e) => onBlankaChange({ workerFio: e.target.value })}
            placeholder="ABDUKADIROV BAKHTIYOR IMOMALIEVICH"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Pasport seriya va raqami</label>
            <input
              type="text"
              className="input-field uppercase"
              value={blankaData.passport}
              onChange={(e) => onBlankaChange({ passport: e.target.value })}
              placeholder="FA 2786135"
            />
          </div>
          <div>
            <CustomDatePicker
              label="Pasport berilgan sana"
              value={blankaData.issuedDate}
              onChange={(val) => onBlankaChange({ issuedDate: val })}
              outputFormat="with_g"
            />
          </div>
        </div>

        <div>
          <CustomSelect
            label="Pasport berilgan viloyat / joy"
            value={blankaData.issuedPlace}
            options={REGIONS}
            onChange={(val) => onBlankaChange({ issuedPlace: val })}
          />
        </div>
      </div>

      {/* Shartnoma muddati */}
      <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-100 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Shartnoma amal qilish muddati</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CustomDatePicker
            label="Boshlanish sanasi"
            value={blankaData.startDate}
            onChange={(val) => onBlankaChange({ startDate: val })}
            outputFormat="blanka_quotes"
          />
          <CustomDatePicker
            label="Tugash sanasi"
            value={blankaData.endDate}
            onChange={(val) => onBlankaChange({ endDate: val })}
            outputFormat="blanka_quotes"
          />
        </div>
      </div>
    </div>
  );
}
