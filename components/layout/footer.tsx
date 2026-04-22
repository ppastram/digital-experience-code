"use client"

import Link from "next/link"
import { useLanguage } from "@/lib/language-context"

const FOOTER_LINKS = [
  { href: "/explorer", en: "Explorer", ar: "المستكشف" },
  { href: "/chat", en: "Ask the Code", ar: "اسأل الميثاق" },
  { href: "/glossary", en: "Glossary", ar: "المصطلحات" },
  { href: "/about", en: "About", ar: "حول" },
]

export function Footer() {
  const { lang, isRtl } = useLanguage()

  return (
    <footer
      className="bg-cream border-t border-brand/10 py-8 px-6"
      dir={isRtl ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto">
        <nav className="flex flex-wrap justify-center gap-6 mb-4">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-primary/40 hover:text-text-primary/70 transition-colors"
            >
              {isRtl ? link.ar : link.en}
            </Link>
          ))}
        </nav>
        <p className="text-center text-xs text-text-primary/25">
          {isRtl
            ? "برنامج الإمارات للتميز في الخدمات الحكومية"
            : "Emirates Government Service Excellence Programme"}
        </p>
      </div>
    </footer>
  )
}
