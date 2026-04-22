"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { CategoryIcon } from "@/components/explorer/category-icons"
import { getCategories } from "@/lib/emirates-code-data"

const FEATURED = [
  {
    name: "Service Accessibility",
    name_ar: "إمكانية الوصول للخدمات",
    desc_en: "Standards ensuring government services are accessible to all residents regardless of ability.",
    desc_ar: "معايير تضمن إمكانية الوصول إلى الخدمات الحكومية لجميع المقيمين.",
  },
  {
    name: "Digital Services",
    name_ar: "الخدمات الرقمية",
    desc_en: "Requirements for digital service quality, language consistency, and online support.",
    desc_ar: "متطلبات جودة الخدمة الرقمية واتساق اللغة والدعم عبر الإنترنت.",
  },
  {
    name: "Customer Experience",
    name_ar: "تجربة المتعامل",
    desc_en: "Frameworks for measuring satisfaction, collecting feedback, and segmenting customers.",
    desc_ar: "أطر لقياس الرضا وجمع الملاحظات وتصنيف المتعاملين.",
  },
  {
    name: "Service Quality",
    name_ar: "جودة الخدمة",
    desc_en: "Performance monitoring, system readiness testing, and continuous improvement standards.",
    desc_ar: "مراقبة الأداء واختبار جاهزية الأنظمة ومعايير التحسين المستمر.",
  },
]

export function FeaturedDomains() {
  const { lang, isRtl } = useLanguage()
  const router = useRouter()
  const categories = getCategories()

  return (
    <section className="py-12 px-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="text-xl font-bold text-text-primary mb-6 text-center"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "المجالات الرئيسية" : "Key Domains"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURED.map((item, idx) => {
            const cat = categories.find((c) => c.name === item.name)
            return (
              <DomainCard
                key={item.name}
                name={isRtl ? item.name_ar : item.name}
                description={isRtl ? item.desc_ar : item.desc_en}
                category={item.name}
                count={cat?.count ?? 0}
                index={idx}
                isRtl={isRtl}
                lang={lang}
                onClick={() => router.push("/explorer")}
              />
            )
          })}
        </div>
      </div>
    </section>
  )
}

function DomainCard({
  name,
  description,
  category,
  count,
  index,
  isRtl,
  lang,
  onClick,
}: {
  name: string
  description: string
  category: string
  count: number
  index: number
  isRtl: boolean
  lang: string
  onClick: () => void
}) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

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
      <div className="w-10 h-10 rounded-[12px] bg-brand/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-[400ms]">
        <CategoryIcon category={category} size={20} className="text-brand-dark" />
      </div>
      <h3
        className="text-sm font-bold text-text-primary mb-1 leading-snug"
        style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
      >
        {name}
      </h3>
      <p className="text-xs text-text-primary/40 mb-2 line-clamp-2">{description}</p>
      <p className="text-xs text-brand-dark/60 font-medium">
        {count} {lang === "ar" ? "مادة" : "articles"}
      </p>
    </button>
  )
}
