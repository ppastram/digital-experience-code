"use client"

import { useLanguage } from "@/lib/language-context"
import { AboutSection } from "@/components/about/about-section"
import { FaqAccordion } from "@/components/about/faq-accordion"
import { FAQ_ITEMS } from "@/data/about-faq"
import { Footer } from "@/components/layout/footer"

export default function AboutPage() {
  const { lang, isRtl } = useLanguage()

  return (
    <div className="bg-page-bg" style={{ fontFamily: "'Roboto', 'Noto Kufi Arabic', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-10">
        <div className="text-center mb-10" dir={isRtl ? "rtl" : "ltr"}>
          <h1
            className="text-3xl font-extrabold text-text-primary mb-2"
            style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
          >
            {isRtl ? "حول المنصة" : "About"}
          </h1>
          <p className="text-sm text-text-primary/45">
            {isRtl
              ? "تعرف على ميثاق الإمارات وكيفية استخدام هذه المنصة"
              : "Learn about the Emirates Code and how to use this platform"}
          </p>
        </div>

        <AboutSection />

        <div className="mt-16" dir={isRtl ? "rtl" : "ltr"}>
          <h2
            className="text-xl font-bold text-text-primary mb-6"
            style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
          >
            {isRtl ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h2>
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </div>
      <Footer />
    </div>
  )
}
