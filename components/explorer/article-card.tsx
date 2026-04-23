"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UIRule } from "@/lib/emirates-code-data"
import { CategoryIcon } from "./category-icons"

interface ArticleCardProps {
  rule: UIRule
  language: "en" | "ar"
  forceExpanded?: boolean
  onExpand?: () => void
}

export function ArticleCard({ rule, language, forceExpanded, onExpand }: ArticleCardProps) {
  const [expanded, setExpanded] = useState(false)
  const [visible, setVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const isRtl = language === "ar"

  // Clip-path reveal on viewport entry
  useEffect(() => {
    if (!cardRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (forceExpanded) {
      setExpanded(true)
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" })
      }, 100)
      onExpand?.()
    }
  }, [forceExpanded, onExpand])

  const title = language === "en" ? rule.title_en : rule.title_ar
  const text = language === "en" ? rule.text_en : rule.text_ar
  const otherText = language === "en" ? rule.text_ar : rule.text_en
  const otherLabel = language === "en" ? "Arabic" : "English"

  return (
    <div
      ref={cardRef}
      className={cn(
        "egsep-card-reveal",
        visible && "visible",
        "bg-white rounded-[18px] overflow-hidden",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
        "hover:shadow-[0_4px_16px_rgba(0,0,0,0.1)]",
        expanded && "shadow-[0_4px_16px_rgba(0,0,0,0.1)]"
      )}
      style={{
        borderLeft: isRtl ? "none" : "4px solid #FFBF36",
        borderRight: isRtl ? "4px solid #FFBF36" : "none",
      }}
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 group"
        dir={isRtl ? "rtl" : "ltr"}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2.5">
              <span className="text-xs font-mono font-bold text-brand-dark bg-brand/15 px-2.5 py-1 rounded-[1.5rem]">
                {rule.id}
              </span>
              <span className="text-xs text-text-primary/50 bg-cream px-2.5 py-1 rounded-[1.5rem] inline-flex items-center gap-1.5">
                <CategoryIcon category={rule.category} size={12} className="text-text-primary/40" />
                {language === "ar" ? rule.category_ar : rule.category}
              </span>
            </div>
            <p
              className="text-sm font-medium text-text-primary leading-snug line-clamp-2"
              style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
            >
              {title}
            </p>
          </div>
          <div
            className={cn(
              "flex-shrink-0 mt-1 text-neutral-gray",
              "transition-transform duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
              "group-hover:text-brand"
            )}
          >
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </div>
        </div>
      </button>

      {expanded && (
        <div className="px-5 pb-5 border-t border-page-bg">
          {/* Full text */}
          <div className="mt-4" dir={isRtl ? "rtl" : "ltr"}>
            <p className="text-sm text-text-primary/70 leading-relaxed">{text}</p>
          </div>

          {/* Requirements */}
          {rule.requirements.length > 0 && (
            <div className="mt-4">
              <p
                className="text-xs font-bold text-text-primary/50 uppercase tracking-wider mb-2"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Requirements
              </p>
              <ul className="space-y-1.5">
                {rule.requirements.map((req, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-text-primary/60 flex items-start gap-2.5"
                  >
                    <span className="text-brand mt-0.5 text-lg leading-none">&#x2022;</span>
                    {req.text_en}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Other language */}
          <div
            className="mt-4 p-4 bg-cream rounded-[12px]"
            dir={language === "en" ? "rtl" : "ltr"}
          >
            <p className="text-xs font-bold text-text-primary/40 mb-1.5">{otherLabel}</p>
            <p
              className="text-sm text-text-primary/50 leading-relaxed"
              style={{ fontFamily: isRtl ? "'Inter', sans-serif" : "'Noto Kufi Arabic', sans-serif" }}
            >
              {otherText}
            </p>
          </div>

          {/* Keywords */}
          {rule.keywords.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {rule.keywords.map((kw) => (
                <span
                  key={kw}
                  className="text-xs bg-page-bg text-text-primary/40 px-3 py-1 rounded-[1.5rem]"
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
