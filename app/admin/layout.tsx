"use client"

import { useState } from "react"
import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { Menu } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex flex-1 min-h-0">
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="flex-1 flex flex-col min-h-0 overflow-auto bg-page-bg">
        <div className="md:hidden flex items-center gap-2 px-4 py-3 border-b border-uae-gray-100 bg-white">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-1.5 text-text-primary/50 hover:text-text-primary"
          >
            <Menu size={18} />
          </button>
          <span className="text-sm font-semibold text-text-primary/70">Admin</span>
        </div>
        <main className="flex-1 p-5 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
