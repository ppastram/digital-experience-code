"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, History, Bot, Settings, BarChart3, X } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { href: "/admin", icon: BarChart3, label: "Analytics", exact: true },
  { href: "/admin/content", icon: FileText, label: "Content" },
  { href: "/admin/versions", icon: History, label: "Versions" },
  { href: "/admin/ai-review", icon: Bot, label: "AI Review" },
  { href: "/admin/settings", icon: Settings, label: "Settings" },
]

interface AdminSidebarProps {
  mobileOpen: boolean
  onClose: () => void
}

export function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href
    return pathname.startsWith(href)
  }

  const content = (
    <div className="flex flex-col h-full">
      <div className="p-5 pb-4">
        <h2 className="text-sm font-bold text-white/80 tracking-wide uppercase">Admin</h2>
        <p className="text-[10px] text-white/25 mt-0.5">Analytics & Management</p>
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
                ? "bg-white/10 text-white border-l-[3px] border-[#FFBF36]"
                : "text-white/40 hover:text-white/70 hover:bg-white/5 border-l-[3px] border-transparent"
            )}
          >
            <item.icon size={16} />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-white/5">
        <Link
          href="/"
          className="text-xs text-white/25 hover:text-white/50 transition-colors"
        >
          &larr; Back to site
        </Link>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:block w-[240px] bg-[#1A1A2E] flex-shrink-0 min-h-0">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={onClose} />
          <aside className="relative w-[240px] bg-[#1A1A2E] flex-shrink-0 h-full">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/40 hover:text-white"
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
