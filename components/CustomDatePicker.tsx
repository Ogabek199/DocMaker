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
}

export default function CustomDatePicker({
  label,
  value,
  onChange,
  outputFormat = "raw_date",
}: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

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
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between input-field cursor-pointer hover:border-blue-400 bg-white"
      >
        <span
          className={
            value
              ? "text-gray-900 font-medium text-sm"
              : "text-gray-400 text-sm"
          }
        >
          {value || "Sanani tanlang..."}
        </span>
        <div className="flex items-center gap-1">
          <CalendarIcon className="w-4 h-4 text-blue-600" />
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-50 mt-1.5 p-3 bg-white rounded-2xl shadow-2xl border border-gray-100 left-0 right-auto animate-in fade-in zoom-in-95 duration-150">
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
          <DayPicker
            mode="single"
            selected={selectedDate}
            onSelect={handleSelect}
            locale={ru}
            showOutsideDays
            startMonth={new Date(1990, 0)}
            endMonth={new Date(2035, 11)}
            classNames={{
              root: "custom-day-picker",
              chevron: "fill-blue-600",
              day: "text-sm p-2 rounded-lg hover:bg-blue-50 text-gray-800 transition-colors",
              selected: "bg-blue-600 text-white font-bold hover:bg-blue-700",
              today: "border border-blue-400 font-semibold",
              month_caption:
                "flex justify-center font-bold text-sm text-gray-800 pb-2",
              nav: "flex justify-between items-center mb-1",
              button_previous:
                "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
              button_next: "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
            }}
          />
        </div>
      )}
    </div>
  );
}
