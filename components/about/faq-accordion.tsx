"use client"

import { useState, useRef, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import type { FaqItem } from "@/data/about-faq"

interface FaqAccordionProps {
  items: FaqItem[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  const { lang, isRtl } = useLanguage()
  const [openId, setOpenId] = useState<string | null>(null)

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <div className="space-y-3" dir={isRtl ? "rtl" : "ltr"}>
      {items.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => toggle(item.id)}
          lang={lang}
          isRtl={isRtl}
        />
      ))}
    </div>
  )
}

function AccordionItem({
  item,
  isOpen,
  onToggle,
  lang,
  isRtl,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
  lang: string
  isRtl: boolean
}) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(contentRef.current.scrollHeight)
    }
  }, [isOpen])

  return (
    <div
      className={cn(
        "bg-white rounded-[18px] overflow-hidden",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "transition-shadow duration-300",
        isOpen && "shadow-[0_6px_20px_rgba(0,0,0,0.1)]"
      )}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span
          className="text-sm font-semibold text-text-primary pr-4"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {lang === "ar" ? item.question_ar : item.question_en}
        </span>
        <ChevronDown
          size={18}
          className={cn(
            "flex-shrink-0 text-text-primary/30 transition-transform duration-300",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        style={{ maxHeight: isOpen ? `${height}px` : "0px" }}
        className="transition-all duration-300 ease-in-out overflow-hidden"
      >
        <div ref={contentRef} className="px-5 pb-5">
          <p className="text-sm text-text-primary/55 leading-relaxed">
            {lang === "ar" ? item.answer_ar : item.answer_en}
          </p>
        </div>
      </div>
    </div>
  )
}
