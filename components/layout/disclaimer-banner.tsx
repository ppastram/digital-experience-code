"use client"

import { useLanguage } from "@/lib/language-context"

export function DisclaimerBanner() {
  const { lang } = useLanguage()

  return (
    <div className="w-full bg-cream/60 border-b border-brand/10 py-1 px-2 text-center">
      <p className="text-[10px] text-text-primary/30">
        {lang === "ar"
          ? "نموذج أولي — ليس نظامًا رسميًا لحكومة الإمارات"
          : "Prototype — not an official UAE Government system"}
      </p>
    </div>
  )
}
