"use client"

import { useLanguage } from "@/lib/language-context"

export function DisclaimerBanner() {
  const { lang } = useLanguage()

  return (
    <div className="w-full bg-uae-gray-50 border-b border-uae-gray-100 py-1.5 px-2 text-center">
      <p className="text-[10px] sm:text-xs text-uae-gray-200">
        {lang === "ar"
          ? "⚠️ عرض تجريبي — للاطلاع فقط. ليس نظامًا رسميًا لحكومة الإمارات."
          : "⚠️ Prototype Demo — For reference purposes only. Not an official UAE Government system."}
      </p>
    </div>
  )
}
