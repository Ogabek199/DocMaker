"use client";

import { FileText, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-md group-hover:bg-blue-700 transition-colors">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-lg font-bold text-gray-900 leading-tight">
                DocMaker
              </div>
              <div className="text-xs text-gray-500 -mt-0.5">
                Davernos Blanka Yasatuvchi
              </div>
            </div>
          </Link>

          {/* Center tag */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 rounded-full border border-blue-100">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-xs font-medium text-blue-700">
              Professional blanka yarating
            </span>
          </div>

          {/* Right side info */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Bepul • Onlayn
            </div>
            <a
              href="#form"
              className="btn-primary py-2 px-4 text-xs"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("form")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Boshlash
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
