"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { useMobileMenu } from "@/lib/mobile-menu-context"
import { Globe, Menu, X, Shield } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_LINKS = [
  { href: "/explorer", en: "Explorer", ar: "المستكشف" },
  { href: "/chat", en: "Ask the Code", ar: "اسأل الميثاق" },
  { href: "/glossary", en: "Glossary", ar: "المصطلحات" },
  { href: "/about", en: "About", ar: "حول" },
]

export function Header() {
  const { lang, toggleLang } = useLanguage()
  const { isOpen, toggleMenu, closeMenu } = useMobileMenu()
  const pathname = usePathname()
  const isRtl = lang === "ar"

  const isActive = (href: string) => {
    return pathname.startsWith(href)
  }

  return (
    <>
      <header className="h-14 bg-white border-b border-uae-gray-100 flex items-center justify-between px-3 md:px-6 relative z-50">
        {/* Logo + Title */}
        <div className="flex items-center gap-2 md:gap-3">
          <Link href="/" onClick={closeMenu}>
            <Image
              src={lang === "ar" ? "/assets/ministry_of_cabinet_affairs_arabic.png" : "/assets/ministry_of_cabinet_affairs.png"}
              alt="UAE Ministry of Cabinet Affairs"
              width={160}
              height={50}
              className="h-7 md:h-9 w-auto"
              priority
            />
          </Link>
          <div className="h-6 w-px bg-uae-gray-100 hidden sm:block" />
          <div className="hidden sm:block">
            <h1 className="text-xs md:text-sm font-semibold text-uae-black leading-tight">
              {lang === "ar" ? "ميثاق الإمارات للخدمات الحكومية" : "UAE Government Services Code"}
            </h1>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" dir={isRtl ? "rtl" : "ltr"}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative px-3 py-1.5 text-sm font-medium transition-colors duration-200",
                isActive(link.href)
                  ? "text-text-primary"
                  : "text-text-primary/45 hover:text-text-primary/70"
              )}
            >
              {isRtl ? link.ar : link.en}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1 right-1 h-[2px] bg-brand rounded-full" />
              )}
            </Link>
          ))}
          <div className="h-5 w-px bg-uae-gray-100 mx-1" />
          <Link
            href="/admin"
            className={cn(
              "flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium transition-colors duration-200",
              pathname.startsWith("/admin")
                ? "text-text-primary/70"
                : "text-text-primary/25 hover:text-text-primary/45"
            )}
          >
            <Shield size={12} />
            Admin
          </Link>
        </nav>

        {/* Right side: language toggle + mobile hamburger */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            className="flex items-center gap-1.5 px-2 md:px-3 py-1.5 rounded-lg border border-uae-gray-100 text-xs md:text-sm text-uae-black/60 hover:border-uae-gold/40 hover:bg-uae-gold/5 transition-colors"
          >
            <Globe size={14} />
            <span className="hidden sm:inline">{lang === "en" ? "العربية" : "English"}</span>
          </button>
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-text-primary/50 hover:text-text-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-uae-gray-100 shadow-lg z-40" dir={isRtl ? "rtl" : "ltr"}>
          <nav className="flex flex-col py-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={cn(
                  "px-6 py-3 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "text-text-primary bg-brand/5 border-brand"
                    : "text-text-primary/50 hover:bg-page-bg border-transparent",
                  isRtl ? "border-r-[3px]" : "border-l-[3px]"
                )}
              >
                {isRtl ? link.ar : link.en}
              </Link>
            ))}
            <div className="border-t border-uae-gray-100 my-1" />
            <Link
              href="/admin"
              onClick={closeMenu}
              className="px-6 py-3 text-xs font-medium text-text-primary/30 hover:text-text-primary/50 flex items-center gap-1.5"
            >
              <Shield size={12} />
              Admin Console
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
