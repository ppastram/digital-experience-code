"use client"

import Image from "next/image"
import { useLanguage } from "@/lib/language-context"
import { Globe } from "lucide-react"

export function Header() {
  const { lang, toggleLang } = useLanguage()

  return (
    <header className="h-14 bg-white border-b border-uae-gray-100 flex items-center justify-between px-3 md:px-6">
      {/* Logo + Title */}
      <div className="flex items-center gap-2 md:gap-3">
        <Image
          src={lang === "ar" ? "/assets/ministry_of_cabinet_affairs_arabic.png" : "/assets/ministry_of_cabinet_affairs.png"}
          alt="UAE Ministry of Cabinet Affairs"
          width={160}
          height={50}
          className="h-7 md:h-9 w-auto"
          priority
        />
        <div className="h-6 w-px bg-uae-gray-100 hidden sm:block" />
        <div className="hidden sm:block">
          <h1 className="text-xs md:text-sm font-semibold text-uae-black leading-tight">
            {lang === "ar" ? "نظام مراقبة تقديم الخدمات" : "Service Delivery Monitoring"}
          </h1>
        </div>
      </div>

      {/* Language toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={toggleLang}
          className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg border border-uae-gray-100 text-xs md:text-sm text-uae-black/60 hover:border-uae-gold/40 hover:bg-uae-gold/5 transition-colors"
        >
          <Globe size={14} />
          <span className="hidden sm:inline">{lang === "en" ? "العربية" : "English"}</span>
        </button>
      </div>
    </header>
  )
}
