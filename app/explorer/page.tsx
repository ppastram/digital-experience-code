"use client"

import { useState, useMemo, useCallback, useEffect, useRef, Suspense } from "react"
import { Search, BookOpen, ArrowLeft, ArrowRight, Sparkles } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { getRules, getCategories, type UICategory } from "@/lib/emirates-code-data"
import { ArticleCard } from "@/components/explorer/article-card"
import { CategoryIcon } from "@/components/explorer/category-icons"
import { useLanguage } from "@/lib/language-context"
import { trackSearch, trackCategorySelect, trackArticleView } from "@/lib/posthog"
import Link from "next/link"

export default function ExplorerPage() {
  return (
    <Suspense fallback={<div className="flex-1 bg-page-bg" />}>
      <ExplorerContent />
    </Suspense>
  )
}

function ExplorerContent() {
  const { lang: language } = useLanguage()
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQ = searchParams.get("q") || ""

  const [search, setSearch] = useState(initialQ)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [expandedArticle, setExpandedArticle] = useState<string | null>(initialQ || null)
  const [titleVisible, setTitleVisible] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const isRtl = language === "ar"

  // Sync URL param changes
  useEffect(() => {
    const q = searchParams.get("q") || ""
    if (q && q !== search) {
      setSearch(q)
      setSelectedCategory(null)
      setExpandedArticle(q)
    }
  }, [searchParams])

  const rules = useMemo(() => getRules(), [])
  const categories = useMemo(() => getCategories(), [])

  const isFiltering = selectedCategory !== null || search.trim() !== ""

  const filteredRules = useMemo(() => {
    if (!isFiltering) return []

    let result = rules

    if (selectedCategory) {
      result = result.filter((r) => r.category === selectedCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase().trim()
      result = result.filter(
        (r) =>
          r.id.toLowerCase().includes(q) ||
          r.title_en.toLowerCase().includes(q) ||
          r.title_ar.includes(q) ||
          r.text_en.toLowerCase().includes(q) ||
          r.text_ar.includes(q) ||
          r.keywords.some((k) => k.toLowerCase().includes(q)) ||
          r.category.toLowerCase().includes(q)
      )
    }

    return result
  }, [rules, search, selectedCategory, isFiltering])

  useEffect(() => {
    if (!titleRef.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(titleRef.current)
    return () => observer.disconnect()
  }, [])

  // Track searches with debounce
  const searchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!search.trim()) return
    if (searchTimerRef.current) clearTimeout(searchTimerRef.current)
    searchTimerRef.current = setTimeout(() => {
      trackSearch(search.trim(), filteredRules.length)
    }, 1000)
    return () => { if (searchTimerRef.current) clearTimeout(searchTimerRef.current) }
  }, [search, filteredRules.length])

  const handleCategorySelect = (categoryName: string) => {
    trackCategorySelect(categoryName)
    setSelectedCategory(categoryName)
    setSearch("")
    setExpandedArticle(null)
  }

  const handleBackToCategories = () => {
    setSelectedCategory(null)
    setSearch("")
    setExpandedArticle(null)
  }

  return (
    <div
      className="bg-page-bg p-5 md:p-8 flex-1 overflow-auto"
      style={{ fontFamily: "'Roboto', 'Noto Kufi Arabic', sans-serif" }}
    >
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div ref={titleRef}>
            <h1
              className="text-3xl font-extrabold tracking-tight text-text-primary relative inline-block"
              style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
              dir={isRtl ? "rtl" : "ltr"}
            >
              {isRtl ? "ميثاق الإمارات" : "Emirates Code"}
              <span
                className={cn(
                  "absolute bottom-0 left-0 right-0 h-[3px] bg-brand rounded-full",
                  titleVisible ? "gold-underline-animate" : "scale-x-0"
                )}
                style={{ transformOrigin: isRtl ? "right" : "left" }}
              />
            </h1>
            <p className="text-sm text-text-primary/50 mt-1.5" dir={isRtl ? "rtl" : "ltr"}>
              {isRtl
                ? "تصفح واستكشف ميثاق الإمارات للخدمات الحكومية"
                : "Browse and explore the Emirates Code for Government Services"}
            </p>
          </div>

          <Link
            href="/chat"
            className={cn(
              "flex items-center gap-2 px-5 py-2 text-sm font-semibold",
              "rounded-[1.5rem] hover:rounded-[0.5rem]",
              "bg-cream text-text-primary/50 hover:bg-brand/10 hover:text-text-primary/80",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
            )}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <Sparkles size={15} />
            {isRtl ? "اسأل الميثاق" : "Ask the Code"}
          </Link>
        </div>

        {/* Search bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search
            size={18}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-neutral-gray",
              isRtl ? "right-5" : "left-5"
            )}
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isRtl
                ? "ابحث عن المواد بالكلمة المفتاحية أو رقم المادة أو الوصف..."
                : "Search articles by keyword, code number, or description..."
            }
            dir={isRtl ? "rtl" : "ltr"}
            className={cn(
              "w-full rounded-[18px] py-3.5 text-sm bg-white border-0",
              "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
              "focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,191,54,0.3),0_2px_8px_rgba(0,0,0,0.06)]",
              "placeholder:text-neutral-gray text-text-primary",
              "transition-shadow duration-300",
              isRtl ? "pr-12 pl-5" : "pl-12 pr-5"
            )}
          />
        </div>

        {!isFiltering ? (
          <>
            <p
              className="text-center text-sm text-text-primary/40"
              dir={isRtl ? "rtl" : "ltr"}
            >
              {isRtl
                ? `${rules.length} مادة عبر ${categories.length} فئة — اختر فئة للاستكشاف`
                : `${rules.length} articles across ${categories.length} categories — pick one to explore`}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((cat, idx) => (
                <CategoryCard
                  key={cat.name}
                  category={cat}
                  language={language}
                  index={idx}
                  onClick={() => handleCategorySelect(cat.name)}
                />
              ))}
            </div>

            <div className="flex items-center justify-center gap-6 py-5 border-t border-neutral-gray/30 text-xs text-text-primary/30">
              <span>{rules.length} Total Articles</span>
              <span className="text-brand">|</span>
              <span>{categories.length} Categories</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between" dir={isRtl ? "rtl" : "ltr"}>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToCategories}
                  className={cn(
                    "flex items-center gap-1.5 text-sm font-medium text-text-primary/50",
                    "bg-cream px-4 py-2",
                    "rounded-[1.5rem] hover:rounded-[0.5rem]",
                    "hover:bg-brand/10 hover:text-text-primary",
                    "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
                  )}
                >
                  {isRtl ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
                  {isRtl ? "كل الفئات" : "All Categories"}
                </button>
              </div>
              <p className="text-sm text-text-primary/40">
                <span className="font-semibold text-text-primary/70">{filteredRules.length}</span>{" "}
                {isRtl ? "مادة" : "articles"}
                {selectedCategory && (
                  <span>
                    {" "}{isRtl ? "في" : "in"}{" "}
                    <span className="font-semibold text-brand-dark">
                      {isRtl
                        ? categories.find((c) => c.name === selectedCategory)?.name_ar ?? selectedCategory
                        : selectedCategory}
                    </span>
                  </span>
                )}
                {search && (
                  <span>
                    {" "}{isRtl ? "مطابقة لـ" : "matching"} &ldquo;
                    <span className="font-semibold text-text-primary/70">{search}</span>&rdquo;
                  </span>
                )}
              </p>
            </div>

            {filteredRules.length > 0 ? (
              <div className="grid gap-4">
                {filteredRules.map((rule) => (
                  <ArticleCard
                    key={rule.id}
                    rule={rule}
                    language={language}
                    forceExpanded={expandedArticle === rule.id}
                    onExpand={() => setExpandedArticle(null)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-text-primary/30">
                <BookOpen size={36} className="mx-auto mb-4 opacity-40" />
                <p className="text-sm mb-3">
                  {isRtl
                    ? "لم يتم العثور على مواد تطابق معاييرك."
                    : "No articles found matching your criteria."}
                </p>
                <button
                  onClick={handleBackToCategories}
                  className={cn(
                    "text-sm font-medium text-brand-dark bg-brand/20 px-5 py-2",
                    "rounded-[1.5rem] hover:rounded-[0.5rem] hover:bg-brand/30",
                    "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
                  )}
                >
                  {isRtl ? "العودة للفئات" : "Back to categories"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function CategoryCard({
  category,
  language,
  index,
  onClick,
}: {
  category: UICategory
  language: "en" | "ar"
  index: number
  onClick: () => void
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)
  const isRtl = language === "ar"

  useEffect(() => {
    if (!ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 60)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <button
      ref={ref}
      onClick={onClick}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(
        "egsep-card-reveal",
        visible && "visible",
        "bg-white rounded-[18px] p-5 text-left",
        "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        "hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
        "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
        "hover:scale-[1.03] group cursor-pointer"
      )}
      style={{
        borderLeft: isRtl ? "none" : "4px solid #FFBF36",
        borderRight: isRtl ? "4px solid #FFBF36" : "none",
      }}
    >
      <div className="w-10 h-10 rounded-[12px] bg-brand/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]">
        <CategoryIcon category={category.name} size={20} className="text-brand-dark" />
      </div>
      <h3
        className="text-sm font-bold text-text-primary mb-1 leading-snug"
        style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
      >
        {isRtl ? category.name_ar : category.name}
      </h3>
      <p className="text-xs text-text-primary/40">
        {category.count} {isRtl ? "مادة" : "articles"}
      </p>
    </button>
  )
}
