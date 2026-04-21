"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type Language = "en" | "ar"

interface LanguageContextType {
  lang: Language
  isRtl: boolean
  toggleLang: () => void
  setLang: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>("en")
  const isRtl = lang === "ar"
  const toggleLang = useCallback(() => setLang((l) => (l === "en" ? "ar" : "en")), [])

  return (
    <LanguageContext.Provider value={{ lang, isRtl, toggleLang, setLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider")
  return ctx
}
