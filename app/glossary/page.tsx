"use client"

import { useState, useMemo } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { GLOSSARY_TERMS } from "@/data/glossary-terms"
import { GlossarySearch } from "@/components/glossary/glossary-search"
import { GlossaryTermCard } from "@/components/glossary/glossary-term-card"
import { Footer } from "@/components/layout/footer"

export default function GlossaryPage() {
  const { lang, isRtl } = useLanguage()
  const [search, setSearch] = useState("")
  const [activeLetter, setActiveLetter] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let terms = GLOSSARY_TERMS

    if (search.trim()) {
      const q = search.toLowerCase()
      terms = terms.filter(
        (t) =>
          t.term_en.toLowerCase().includes(q) ||
          t.term_ar.includes(q) ||
          t.definition_en.toLowerCase().includes(q) ||
          t.definition_ar.includes(q)
      )
    }

    if (activeLetter) {
      terms = terms.filter((t) =>
        t.term_en.charAt(0).toUpperCase() === activeLetter
      )
    }

    return terms
  }, [search, activeLetter])

  // Group by first letter
  const grouped = useMemo(() => {
    const groups: Record<string, typeof filtered> = {}
    for (const term of filtered) {
      const letter = term.term_en.charAt(0).toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(term)
    }
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b))
  }, [filtered])

  // Available letters
  const allLetters = useMemo(() => {
    const letters = new Set(GLOSSARY_TERMS.map((t) => t.term_en.charAt(0).toUpperCase()))
    return Array.from(letters).sort()
  }, [])

  return (
    <div className="bg-page-bg" style={{ fontFamily: "'Roboto', 'Noto Kufi Arabic', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10">
        <div className="text-center mb-8" dir={isRtl ? "rtl" : "ltr"}>
          <h1
            className="text-3xl font-extrabold text-text-primary mb-2"
            style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
          >
            {isRtl ? "المصطلحات" : "Glossary"}
          </h1>
          <p className="text-sm text-text-primary/45">
            {isRtl
              ? "المصطلحات الرئيسية المستخدمة في ميثاق الإمارات للخدمات الحكومية"
              : "Key terms used in the Emirates Code for Government Services"}
          </p>
        </div>

        <div className="mb-8">
          <GlossarySearch value={search} onChange={setSearch} />
        </div>

        {/* Letter index */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
          <button
            onClick={() => setActiveLetter(null)}
            className={cn(
              "w-8 h-8 text-xs font-semibold flex items-center justify-center",
              "rounded-[1.5rem] hover:rounded-[0.5rem]",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
              activeLetter === null
                ? "bg-brand text-brand-dark shadow-md"
                : "bg-cream text-text-primary/40 hover:bg-brand/10"
            )}
          >
            {isRtl ? "الكل" : "All"}
          </button>
          {allLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setActiveLetter(activeLetter === letter ? null : letter)}
              className={cn(
                "w-8 h-8 text-xs font-semibold flex items-center justify-center",
                "rounded-[1.5rem] hover:rounded-[0.5rem]",
                "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
                activeLetter === letter
                  ? "bg-brand text-brand-dark shadow-md"
                  : "bg-cream text-text-primary/40 hover:bg-brand/10"
              )}
            >
              {letter}
            </button>
          ))}
        </div>

        {/* Term groups */}
        <div className="space-y-8">
          {grouped.map(([letter, terms]) => (
            <div key={letter}>
              <h2
                className="text-lg font-bold text-text-primary/20 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                {letter}
              </h2>
              <div className="grid gap-4">
                {terms.map((term) => (
                  <GlossaryTermCard key={term.id} term={term} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-text-primary/30">
            <p className="text-sm">
              {isRtl
                ? "لم يتم العثور على مصطلحات مطابقة."
                : "No matching terms found."}
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}
