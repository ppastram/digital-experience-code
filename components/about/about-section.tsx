"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"
import { Users, PenTool, ShieldCheck, Award, Search } from "lucide-react"

const USER_TYPES = [
  {
    icon: Users,
    en: "Citizens & Residents",
    ar: "المواطنون والمقيمون",
    desc_en: "Understand the service standards you are entitled to.",
    desc_ar: "افهم معايير الخدمة التي تستحقها.",
  },
  {
    icon: PenTool,
    en: "Service Designers",
    ar: "مصممو الخدمات",
    desc_en: "Build services that meet the Code's requirements from day one.",
    desc_ar: "صمم خدمات تلبي متطلبات الميثاق منذ اليوم الأول.",
  },
  {
    icon: ShieldCheck,
    en: "Compliance Specialists",
    ar: "أخصائيو الامتثال",
    desc_en: "Monitor adherence and identify gaps across 357 articles.",
    desc_ar: "راقب الالتزام وحدد الثغرات عبر 357 مادة.",
  },
  {
    icon: Award,
    en: "Senior Leaders",
    ar: "القيادات العليا",
    desc_en: "Set service strategy aligned with national excellence standards.",
    desc_ar: "ضع استراتيجية الخدمة بما يتماشى مع معايير التميز الوطنية.",
  },
  {
    icon: Search,
    en: "Researchers",
    ar: "الباحثون",
    desc_en: "Study government service frameworks and best practices.",
    desc_ar: "ادرس أطر الخدمات الحكومية وأفضل الممارسات.",
  },
]

export function AboutSection() {
  const { lang, isRtl } = useLanguage()

  return (
    <section dir={isRtl ? "rtl" : "ltr"}>
      {/* What is the Code */}
      <div className="mb-12">
        <h2
          className="text-xl font-bold text-text-primary mb-4"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "ما هو ميثاق الإمارات؟" : "What is the Emirates Code?"}
        </h2>
        <p className="text-sm text-text-primary/60 leading-relaxed max-w-3xl">
          {isRtl
            ? "ميثاق الإمارات للخدمات الحكومية هو إطار شامل يحدد معايير التميز في تقديم الخدمات الحكومية في دولة الإمارات العربية المتحدة. يتكون من 357 مادة موزعة على 8 ركائز تغطي كل جانب من جوانب تجربة الخدمة — من إمكانية الوصول والخدمات الرقمية إلى معالجة الشكاوى وخصوصية البيانات."
            : "The Emirates Code for Government Services is a comprehensive framework defining the standards of excellence in government service delivery across the UAE. Comprising 357 articles across 8 pillars, it covers every aspect of the service experience — from accessibility and digital services to complaint handling and data privacy."}
        </p>
      </div>

      {/* Who is it for */}
      <div className="mb-12">
        <h2
          className="text-xl font-bold text-text-primary mb-6"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "لمن هذه المنصة؟" : "Who is this platform for?"}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {USER_TYPES.map((type) => (
            <div
              key={type.en}
              className={cn(
                "bg-white rounded-[18px] p-5",
                "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
                "hover:shadow-[0_6px_20px_rgba(0,0,0,0.1)]",
                "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
                "group"
              )}
            >
              <div className="w-10 h-10 rounded-[12px] bg-brand/10 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-brand/20 transition-all duration-[400ms]">
                <type.icon size={20} className="text-brand-dark" />
              </div>
              <h3
                className="text-sm font-bold text-text-primary mb-1"
                style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
              >
                {isRtl ? type.ar : type.en}
              </h3>
              <p className="text-xs text-text-primary/45">{isRtl ? type.desc_ar : type.desc_en}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Getting started */}
      <div>
        <h2
          className="text-xl font-bold text-text-primary mb-4"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "كيف تبدأ" : "Getting Started"}
        </h2>
        <div className="space-y-3">
          {[
            {
              en: "Use the Explorer to browse all 357 articles by category or search for specific topics.",
              ar: "استخدم المستكشف لتصفح جميع المواد الـ 357 حسب الفئة أو البحث عن مواضيع محددة.",
            },
            {
              en: "Try 'Ask the Code' for AI-powered answers about any aspect of the Emirates Code.",
              ar: "جرب 'اسأل الميثاق' للحصول على إجابات مدعومة بالذكاء الاصطناعي.",
            },
            {
              en: "Check the Glossary to understand key terms and concepts.",
              ar: "تحقق من المصطلحات لفهم المصطلحات والمفاهيم الرئيسية.",
            },
          ].map((tip, i) => (
            <div
              key={i}
              className="flex items-start gap-3 text-sm text-text-primary/55"
            >
              <span className="text-brand mt-0.5 text-lg leading-none">&#x2022;</span>
              {isRtl ? tip.ar : tip.en}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
