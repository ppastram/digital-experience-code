"use client"

import { useLanguage } from "@/lib/language-context"
import { cn } from "@/lib/utils"

const UPDATES = [
  {
    date: "2025-04-12",
    date_ar: "١٢ أبريل ٢٠٢٥",
    title_en: "Co-Design and Beta Testing Standards added",
    title_ar: "إضافة معايير التصميم التشاركي والاختبار التجريبي",
    badge: "New",
    badge_ar: "جديد",
  },
  {
    date: "2025-04-05",
    date_ar: "٥ أبريل ٢٠٢٥",
    title_en: "Data Classification and Protection article published",
    title_ar: "نشر مادة تصنيف وحماية البيانات",
    badge: "New",
    badge_ar: "جديد",
  },
  {
    date: "2025-04-01",
    date_ar: "١ أبريل ٢٠٢٥",
    title_en: "Complaint Registration timelines updated to 1 business day",
    title_ar: "تحديث مواعيد تسجيل الشكاوى إلى يوم عمل واحد",
    badge: "Updated",
    badge_ar: "محدّث",
  },
  {
    date: "2025-03-25",
    date_ar: "٢٥ مارس ٢٠٢٥",
    title_en: "System Readiness Testing requirements strengthened",
    title_ar: "تعزيز متطلبات اختبار جاهزية الأنظمة",
    badge: "Updated",
    badge_ar: "محدّث",
  },
]

export function RecentUpdates() {
  const { lang, isRtl } = useLanguage()

  return (
    <section className="py-12 px-6" dir={isRtl ? "rtl" : "ltr"}>
      <div className="max-w-3xl mx-auto">
        <h2
          className="text-xl font-bold text-text-primary mb-8 text-center"
          style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
        >
          {isRtl ? "التحديثات الأخيرة" : "Recent Updates"}
        </h2>

        <div className={cn("relative", isRtl ? "pr-6" : "pl-6")}>
          {/* Timeline line */}
          <div
            className={cn(
              "absolute top-0 bottom-0 w-px bg-brand/20",
              isRtl ? "right-0" : "left-0"
            )}
          />

          <div className="space-y-6">
            {UPDATES.map((update, idx) => (
              <div key={idx} className="relative">
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute top-2 w-2.5 h-2.5 rounded-full bg-brand",
                    isRtl ? "-right-[17px]" : "-left-[17px]"
                  )}
                />

                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <span className="text-xs text-text-primary/30 font-medium min-w-[100px]">
                    {isRtl ? update.date_ar : update.date}
                  </span>
                  <p className="text-sm text-text-primary/70 flex-1">
                    {isRtl ? update.title_ar : update.title_en}
                  </p>
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2.5 py-0.5 rounded-full self-start",
                      update.badge === "New"
                        ? "bg-brand/15 text-brand-dark"
                        : "bg-page-bg text-text-primary/40"
                    )}
                  >
                    {isRtl ? update.badge_ar : update.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
