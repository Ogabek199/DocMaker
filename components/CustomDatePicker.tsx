"use client";

import React, { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import "react-day-picker/dist/style.css";

interface CustomDatePickerProps {
  label: string;
  value: string; // Masalan: "12.05.2021г" yoki "«25» 08. 2026" yoki "24.08.2026"
  onChange: (val: string) => void;
  outputFormat?: "raw_date" | "with_g" | "blanka_quotes";
  placeholder?: string;
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  outputFormat = "raw_date",
  placeholder = "KK.OO.YYYY",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Qiymatdan Date obyektini ajratib olish
  const parseCurrentDate = (valStr: string): Date | undefined => {
    if (!valStr) return undefined;
    const cleanStr = valStr.replace(/[^0-9.]/g, "");
    const parts = cleanStr.split(".").filter(Boolean);
    if (parts.length >= 3) {
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      let year = parseInt(parts[2], 10);
      if (year < 100) year += 2000;
      const d = new Date(year, month, day);
      if (!isNaN(d.getTime())) return d;
    }
    return undefined;
  };

  const selectedDate = parseCurrentDate(value);

  // Calendar dan sana tanlanganda
  const handleSelect = (date?: Date) => {
    if (!date) return;
    const day = format(date, "dd");
    const month = format(date, "MM");
    const year = format(date, "yyyy");

    let formatted = "";
    if (outputFormat === "with_g") {
      formatted = `${day}.${month}.${year}г`;
    } else if (outputFormat === "blanka_quotes") {
      formatted = `«${day}» ${month}. ${year}`;
    } else {
      formatted = `${day}.${month}.${year}`;
    }

    onChange(formatted);
    setIsOpen(false);
  };

  // Popover tashqarisiga bosilganda yopish
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="w-full relative" ref={popoverRef}>
      <label className="label">{label}</label>

      {/* Input maydoni: ham qo'lda yoziladi, ham ikonkasi orqali kalendar ochiladi */}
      <div className="relative flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="input-field pr-10 font-medium"
        />
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-2 p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          title="Kalendardan tanlash"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Calendar Popover */}
      {isOpen && (
        <div
          className="absolute z-[9999] mt-2 p-3 bg-white rounded-2xl shadow-2xl border border-gray-200 right-0 sm:left-0 sm:right-auto animate-in fade-in zoom-in-95 duration-150"
          style={{ width: "max-content", minWidth: "270px" }}
        >
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
            <span className="text-xs font-bold text-gray-700">{label}</span>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="custom-calendar-wrapper">
            <DayPicker
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              locale={ru}
              showOutsideDays
              startMonth={new Date(1990, 0)}
              endMonth={new Date(2035, 11)}
              classNames={{
                root: "p-1",
                chevron: "fill-blue-600",
                day: "text-xs p-2 rounded-lg hover:bg-blue-50 text-gray-800 transition-colors text-center w-8 h-8",
                selected: "bg-blue-600 text-white font-bold hover:bg-blue-700",
                today: "border border-blue-400 font-semibold text-blue-600",
                month_caption:
                  "flex justify-center font-bold text-xs text-gray-800 pb-2",
                nav: "flex justify-between items-center mb-1",
                button_previous:
                  "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
                button_next: "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
                weekday: "text-[11px] font-semibold text-gray-400 text-center w-8 pb-1",
              }}
            />
          </div>

          <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
            <button
              type="button"
              onClick={() => handleSelect(new Date())}
              className="text-[11px] text-blue-600 font-semibold hover:underline"
            >
              Bugun
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[11px] text-gray-500 hover:text-gray-700"
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
