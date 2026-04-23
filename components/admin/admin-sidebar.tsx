"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, History, Bot, Settings, BarChart3, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"

const NAV_ITEMS = [
  { href: "/admin", icon: BarChart3, en: "Analytics", key: "analytics", exact: true },
  { href: "/admin/content", icon: FileText, en: "Content", key: "content" },
  { href: "/admin/versions", icon: History, en: "Versions", key: "versions" },
  { href: "/admin/ai-review", icon: Bot, en: "AI Review", key: "ai_review" },
  { href: "/admin/settings", icon: Settings, en: "Settings", key: "settings" },
]

interface AdminSidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()
  const { lang, isRtl } = useLanguage()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const content = (
    <div className="flex flex-col h-full">
      <div className="p-5 pb-4">
        <h2 className="text-sm font-bold text-white/80 tracking-wide uppercase">{lang === "ar" ? t("admin", lang) : "Admin"}</h2>
        <p className="text-[10px] text-white/25 mt-0.5">{lang === "ar" ? t("analytics_and_management", lang) : "Analytics & Management"}</p>
      </div>
      <nav className="flex-1 px-2 space-y-0.5">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors duration-200",
              isActive(item.href, item.exact)
                ? `bg-white/10 text-white ${isRtl ? "border-r-[3px] border-l-0" : "border-l-[3px]"} border-[#FFBF36]`
                : `text-white/40 hover:text-white/70 hover:bg-white/5 ${isRtl ? "border-r-[3px] border-l-0" : "border-l-[3px]"} border-transparent`
            )}
          >
            <item.icon size={16} />
            {lang === "ar" ? t(item.key, lang) : item.en}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          className="text-xs text-white/25 hover:text-white/50 transition-colors"
        >
          {isRtl ? <>{t("back_to_site", lang)} &rarr;</> : <>&larr; Back to site</>}
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[240px] bg-[#1A1A2E] flex-shrink-0 min-h-0" dir={isRtl ? "rtl" : "ltr"}>
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className={cn("md:hidden fixed inset-0 z-50 flex", isRtl && "flex-row-reverse")}>
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="relative w-[240px] bg-[#1A1A2E] flex-shrink-0 h-full" dir={isRtl ? "rtl" : "ltr"}>
            <button
              onClick={onClose}
              className={cn("absolute top-4 text-white/40 hover:text-white", isRtl ? "left-4" : "right-4")}
            >
              <X size={18} />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  )
}
