"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, BookOpen, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

export function HeroSection() {
  const { lang, isRtl } = useLanguage()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/explorer?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-24 px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className={cn(
        "max-w-3xl mx-auto text-center transition-all duration-700",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      )}>
        <h1
          className="text-4xl md:text-5xl font-extrabold text-text-primary tracking-tight mb-4"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "ميثاق الإمارات" : "Emirates Code"}
          <span className="block text-2xl md:text-3xl font-bold text-text-primary/50 mt-2">
            {isRtl ? "للخدمات الحكومية" : "for Government Services"}
          </span>
        </h1>

        <p className="text-base text-text-primary/45 max-w-xl mx-auto mb-10">
          {isRtl
            ? "تصفح وفهم 357 مادة عبر 8 ركائز تحدد معايير التميز في تقديم الخدمات الحكومية"
            : "Browse and understand 357 articles across 8 pillars defining the standards of excellence in government service delivery"}
        </p>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-10">
          <Search
            size={18}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-neutral-gray",
              isRtl ? "right-5" : "left-5"
            )}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              isRtl
                ? "ابحث عن المواد بالكلمة المفتاحية أو الموضوع..."
                : "Search articles by keyword or topic..."
            }
            dir={isRtl ? "rtl" : "ltr"}
            className={cn(
              "w-full rounded-[18px] py-4 text-sm bg-white border-0",
              "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
              "focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,191,54,0.3),0_2px_8px_rgba(0,0,0,0.06)]",
              "placeholder:text-neutral-gray text-text-primary",
              "transition-shadow duration-300",
              isRtl ? "pr-12 pl-5" : "pl-12 pr-5"
            )}
          />
        </form>

        {/* CTA cards */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => router.push("/explorer")}
            className={cn(
              "egsep-card-reveal",
              visible && "visible",
              "flex items-center justify-center gap-3 px-8 py-4 bg-white",
              "rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
              "hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
              "hover:scale-[1.03] group cursor-pointer"
            )}
            style={{ transitionDelay: "100ms" }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-brand/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-[400ms]">
              <BookOpen size={20} className="text-brand-dark" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-text-primary" style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}>
                {isRtl ? "تصفح الميثاق" : "Browse the Code"}
              </p>
              <p className="text-xs text-text-primary/40">
                {isRtl ? "357 مادة في 14 فئة" : "357 articles in 14 categories"}
              </p>
            </div>
          </button>

          <button
            onClick={() => router.push("/chat")}
            className={cn(
              "egsep-card-reveal",
              visible && "visible",
              "flex items-center justify-center gap-3 px-8 py-4 bg-white",
              "rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
              "hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
              "hover:scale-[1.03] group cursor-pointer"
            )}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="w-10 h-10 rounded-[12px] bg-brand/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-[400ms]">
              <Sparkles size={20} className="text-brand-dark" />
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-text-primary" style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}>
                {isRtl ? "اسأل الميثاق" : "Ask the Code"}
              </p>
              <p className="text-xs text-text-primary/40">
                {isRtl ? "مساعد ذكي مدعوم بالذكاء الاصطناعي" : "AI-powered assistant"}
              </p>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
