"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar as CalendarIcon, X } from "lucide-react";
import "react-day-picker/dist/style.css";

interface CustomDatePickerProps {
  label: string;
  value: string;
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
  const [mounted, setMounted] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Popover ochilganda yoki scroll bo'lganda uning koordinatalarini hisoblash
  const updatePosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const popoverWidth = 280;
      let left = rect.left;

      if (left + popoverWidth > window.innerWidth - 16) {
        left = window.innerWidth - popoverWidth - 16;
      }
      if (left < 16) {
        left = 16;
      }

      setCoords({
        top: rect.bottom + 6,
        left: left,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      updatePosition();
    }
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScroll = () => updatePosition();
      window.addEventListener("scroll", handleScroll, true);
      window.addEventListener("resize", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll, true);
        window.removeEventListener("resize", handleScroll);
      };
    }
  }, [isOpen]);

  // Qo'lda yozilganda avtomatik formatlash (Mask)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value;

    // Faqat raqamlarni ajratib olish
    const digits = rawVal.replace(/\D/g, "").slice(0, 8);

    if (!digits) {
      onChange("");
      return;
    }

    let formatted = "";
    if (digits.length <= 2) {
      formatted = digits;
    } else if (digits.length <= 4) {
      formatted = `${digits.slice(0, 2)}.${digits.slice(2)}`;
    } else {
      formatted = `${digits.slice(0, 2)}.${digits.slice(2, 4)}.${digits.slice(4)}`;
    }

    // 8 ta raqam to'liq yozilganda formatga moslash
    if (digits.length === 8) {
      const dd = digits.slice(0, 2);
      const mm = digits.slice(2, 4);
      const yyyy = digits.slice(4);

      if (outputFormat === "with_g") {
        formatted = `${dd}.${mm}.${yyyy}г`;
      } else if (outputFormat === "blanka_quotes") {
        formatted = `«${dd}» ${mm}. ${yyyy}`;
      } else {
        formatted = `${dd}.${mm}.${yyyy}`;
      }
    }

    onChange(formatted);
  };

  // Qiymatdan Date obyektini ajratib olish (DayPicker uchun)
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

  // Tashqariga bosilganda yopish
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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
    <div className="w-full relative" ref={containerRef}>
      <div className="flex items-center justify-between">
        <label className="label">{label}</label>
        <span className="text-[10px] text-gray-400 font-mono">KK.OO.YYYY</span>
      </div>

      {/* Input maydoni: Avtomatik formatlovchi (Mask) bilan */}
      <div className="relative flex items-center">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="input-field pr-10 font-medium tracking-wide"
        />
        <button
          ref={buttonRef}
          type="button"
          onClick={handleToggle}
          className="absolute right-2 p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
          title="Kalendardan tanlash"
        >
          <CalendarIcon className="w-4 h-4" />
        </button>
      </div>

      {/* Portal orqali to'g'ridan-to'g'ri body ga render bo'luvchi kalendar */}
      {isOpen &&
        mounted &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: "fixed",
              top: `${coords.top}px`,
              left: `${coords.left}px`,
              zIndex: 999999,
              width: "280px",
            }}
            className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.25)] border border-gray-200 p-3 animate-in fade-in zoom-in-95 duration-150"
          >
            <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
              <span className="text-xs font-bold text-gray-800 truncate pr-2">
                {label}
              </span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-700 rounded-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex justify-center">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                locale={ru}
                showOutsideDays
                startMonth={new Date(1990, 0)}
                endMonth={new Date(2035, 11)}
                classNames={{
                  root: "w-full",
                  chevron: "fill-blue-600",
                  day: "text-xs p-1 rounded-lg hover:bg-blue-50 text-gray-800 transition-colors text-center w-8 h-8",
                  selected:
                    "bg-blue-600 text-white font-bold hover:bg-blue-700",
                  today:
                    "border border-blue-400 font-semibold text-blue-600",
                  month_caption:
                    "flex justify-center font-bold text-xs text-gray-800 pb-2 capitalize",
                  nav: "flex justify-between items-center mb-1",
                  button_previous:
                    "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
                  button_next:
                    "p-1 hover:bg-gray-100 rounded-lg text-gray-600",
                  weekday:
                    "text-[10.5px] font-semibold text-gray-400 text-center w-8 pb-1",
                }}
              />
            </div>

            <div className="mt-2 pt-2 border-t border-gray-100 flex items-center justify-between">
              <button
                type="button"
                onClick={() => handleSelect(new Date())}
                className="text-xs text-blue-600 font-semibold hover:underline"
              >
                Bugun
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Yopish
              </button>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
