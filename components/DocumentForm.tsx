"use client";

import React from "react";
import { User, FileText, Calendar, Hash, ShieldCheck } from "lucide-react";
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
  blankaData,
  davernostData,
  onBlankaChange,
  onDavernostChange,
}: DocumentFormProps) {
  const workerFio = davernostData.workerFio || blankaData.workerFio || "";
  const passport = davernostData.passport || blankaData.passport || "";
  const issuedDate = davernostData.issuedDate || blankaData.issuedDate || "";
  const issuedPlace = davernostData.issuedPlace || blankaData.issuedPlace || "";
  const startDate = davernostData.validFrom || blankaData.startDate || "";
  const endDate = davernostData.validUntil || blankaData.endDate || "";
  const contractNumber = blankaData.contractNumber || "21";

  const handleWorkerFio = (val: string) => {
    onBlankaChange({ workerFio: val });
  };

  const handlePassport = (val: string) => {
    onBlankaChange({ passport: val });
  };

  const handleIssuedDate = (val: string) => {
    onBlankaChange({ issuedDate: val });
  };

  const handleIssuedPlace = (val: string) => {
    onBlankaChange({ issuedPlace: val });
  };

  const handleStartDate = (val: string) => {
    onBlankaChange({ startDate: val });
  };

  const handleEndDate = (val: string) => {
    onBlankaChange({ endDate: val });
  };

  const handleContractNumber = (val: string) => {
    onBlankaChange({ contractNumber: val });
  };

  return (
    <div className="space-y-3.5 pb-2">
      {/* 1. Shartnoma raqami */}
      <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 pb-1 border-b border-slate-200/60">
          <FileText className="w-4 h-4 text-blue-600" />
          <span>Shartnoma ma&apos;lumotlari</span>
        </div>

        <div>
          <label className="label">Shartnoma raqami (Blanka uchun)</label>
          <div className="relative">
            <input
              type="text"
              className="input-field pl-8"
              value={contractNumber}
              onChange={(e) => handleContractNumber(e.target.value)}
              placeholder="21"
            />
            <Hash className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3.5" />
          </div>
        </div>
      </div>

      {/* 2. Xodim / Haydovchi ma'lumotlari (Sinxronlangan) */}
      <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/60">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
            <User className="w-4 h-4 text-blue-600" />
            <span>Xodim / Haydovchi ma&apos;lumotlari</span>
          </div>
          <span className="text-[10.5px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-200">
            <ShieldCheck className="w-3 h-3 text-emerald-600" /> Sinxronlangan
          </span>
        </div>

        <div>
          <label className="label">F.I.Sh. (Familiya Ism Sharif)</label>
          <input
            type="text"
            className="input-field"
            value={workerFio}
            onChange={(e) => handleWorkerFio(e.target.value)}
            placeholder="ABDUKADIROV BAKHTIYOR IMOMALIEVICH"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="label">Pasport seriya va raqami</label>
            <input
              type="text"
              className="input-field uppercase"
              value={passport}
              onChange={(e) => handlePassport(e.target.value)}
              placeholder="FA 2786135"
            />
          </div>
          <div>
            <CustomDatePicker
              label="Pasport berilgan sana"
              value={issuedDate}
              onChange={handleIssuedDate}
              outputFormat="with_g"
            />
          </div>
        </div>

        <div>
          <CustomSelect
            label="Pasport berilgan viloyat / joy"
            value={issuedPlace}
            options={REGIONS}
            onChange={handleIssuedPlace}
          />
        </div>
      </div>

      {/* 3. Amal qilish muddati */}
      <div className="p-3.5 bg-emerald-50/60 rounded-xl border border-emerald-200/70 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 pb-1 border-b border-emerald-200/60">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>Hujjatlar amal qilish muddati</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <CustomDatePicker
            label="Boshlanish sanasi"
            value={startDate}
            onChange={handleStartDate}
            outputFormat="raw_date"
          />
          <CustomDatePicker
            label="Tugash sanasi"
            value={endDate}
            onChange={handleEndDate}
            outputFormat="raw_date"
          />
        </div>
      </div>
    </div>
  );
}
