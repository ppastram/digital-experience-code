"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import type { GlossaryTerm } from "@/data/glossary-terms"

interface GlossaryTermCardProps {
  term: GlossaryTerm
}

export function GlossaryTermCard({ term }: GlossaryTermCardProps) {
  const { lang, isRtl } = useLanguage()

  return (
    <div
      className={cn(
        "bg-white rounded-[18px] p-5",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
      )}
      style={{
        borderLeft: isRtl ? "none" : "4px solid #FFBF36",
        borderRight: isRtl ? "4px solid #FFBF36" : "none",
      }}
      dir={isRtl ? "rtl" : "ltr"}
    >
      <h3
        className="text-base font-bold text-text-primary mb-2"
        style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
      >
        {isRtl ? term.term_ar : term.term_en}
      </h3>
      <p className="text-sm text-text-primary/60 leading-relaxed mb-3">
        {isRtl ? term.definition_ar : term.definition_en}
      </p>

      {/* Other language */}
      <div className="p-3 bg-cream rounded-[12px] mb-3" dir={isRtl ? "ltr" : "rtl"}>
        <p className="text-xs font-bold text-text-primary/40 mb-1">
          {isRtl ? "English" : "العربية"}
        </p>
        <p
          className="text-xs text-text-primary/45 leading-relaxed"
          style={{ fontFamily: isRtl ? "'Inter', sans-serif" : "'Noto Kufi Arabic', sans-serif" }}
        >
          {isRtl ? term.definition_en : term.definition_ar}
        </p>
      </div>

      {/* Related articles */}
      {term.related_articles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {term.related_articles.map((articleId) => (
            <Link
              key={articleId}
              href={`/explorer?q=${encodeURIComponent(articleId)}`}
              className={cn(
                "text-xs bg-brand/10 text-brand-dark px-3 py-1",
                "rounded-[1.5rem] hover:rounded-[0.5rem]",
                "hover:bg-brand/20",
                "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
              )}
            >
              {isRtl ? `مادة ${articleId}` : `Article ${articleId}`}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
