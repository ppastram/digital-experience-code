"use client"

import { useState, useMemo } from "react"
import { Copy, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  renderMarkdown,
  parseMarkdownSections,
  extractArticleReferences,
  type ArticleClickHandler,
} from "./markdown-renderer"
import { getRules } from "@/lib/emirates-code-data"
import { CategoryIcon } from "./category-icons"

interface AssistantMessageProps {
  content: string
  onArticleClick?: ArticleClickHandler
  language: "en" | "ar"
}

export function AssistantMessage({ content, onArticleClick, language }: AssistantMessageProps) {
  const [copied, setCopied] = useState(false)
  const isRtl = language === "ar"

  const sections = useMemo(() => parseMarkdownSections(content), [content])
  const hasH2 = sections.some((s) => s.header !== null)

  const referencedArticles = useMemo(() => {
    const ids = extractArticleReferences(content)
    if (ids.length === 0) return []
    const rules = getRules()
    return ids
      .map((id) => {
        const rule = rules.find((r) => r.id === id)
        if (!rule) return null
        return {
          id,
          title_en: rule.title_en,
          title_ar: rule.title_ar,
          category: rule.category,
          category_ar: rule.category_ar,
        }
      })
      .filter(Boolean) as {
      id: string
      title_en: string
      title_ar: string
      category: string
      category_ar: string
    }[]
  }, [content])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group">
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className={cn(
          "absolute top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "p-1.5 rounded-lg bg-white/80 hover:bg-white border border-gold-muted/20 shadow-sm",
          "text-text-primary/40 hover:text-text-primary/70",
          isRtl ? "left-2" : "right-2"
        )}
        title={isRtl ? "نسخ" : "Copy"}
      >
        {copied ? <Check size={14} className="text-uae-green" /> : <Copy size={14} />}
      </button>

      {/* Message content */}
      <div className="max-w-[80%] rounded-[18px] px-5 py-3.5 bg-cream text-text-primary">
        {hasH2 ? (
          <div className="space-y-3">
            {sections.map((section, idx) => {
              if (section.header === null) {
                // Pre-header content, render without card
                if (!section.rawContent) return null
                return (
                  <div key={idx}>
                    {renderMarkdown(section.rawContent, onArticleClick)}
                  </div>
                )
              }
              // Section card
              return (
                <div
                  key={idx}
                  className={cn(
                    "bg-white rounded-[12px] px-4 py-3 shadow-[0_1px_4px_rgba(0,0,0,0.06)]",
                    isRtl ? "border-r-[3px] border-brand" : "border-l-[3px] border-brand"
                  )}
                >
                  <h3
                    className="text-base font-bold text-text-primary mb-1.5"
                    style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
                  >
                    {section.header.replace(/\*\*/g, "")}
                  </h3>
                  {section.rawContent && renderMarkdown(section.rawContent, onArticleClick)}
                </div>
              )
            })}
          </div>
        ) : (
          renderMarkdown(content, onArticleClick)
        )}
      </div>

      {/* Referenced Articles Footer */}
      {referencedArticles.length > 0 && (
        <div
          className="mt-2 max-w-[80%]"
          dir={isRtl ? "rtl" : "ltr"}
        >
          <p className="text-[11px] font-semibold text-text-primary/35 mb-1.5 px-1">
            {isRtl ? "المواد المشار إليها" : "Referenced Articles"}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {referencedArticles.map((article) => (
              <button
                key={article.id}
                onClick={() => onArticleClick?.(article.id)}
                className={cn(
                  "flex items-center gap-1.5 px-2.5 py-1 rounded-full",
                  "bg-white border border-gold-muted/20 shadow-sm",
                  "hover:border-brand hover:bg-brand/5",
                  "transition-all duration-200 cursor-pointer group/ref"
                )}
              >
                <CategoryIcon
                  category={article.category}
                  size={13}
                  className="text-brand-dark/50 group-hover/ref:text-brand-dark/80 flex-shrink-0"
                />
                <span className="text-[11px] font-semibold text-brand-dark/70">
                  {article.id}
                </span>
                <span className="text-[11px] text-text-primary/40 truncate max-w-[140px]">
                  {isRtl ? article.title_ar : article.title_en}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
