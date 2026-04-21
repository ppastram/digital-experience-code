"use client"

import { useLanguage } from "@/lib/language-context"

export function RtlWrapper({ children }: { children: React.ReactNode }) {
  const { lang, isRtl } = useLanguage()

  return (
    <div dir={isRtl ? "rtl" : "ltr"} lang={lang}>
      {children}
    </div>
  )
}
