"use client"

import { useState } from "react"
import { X, RotateCcw } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"
import type { MockVersion } from "@/data/admin-mock-data"

interface DiffViewerProps {
  version: MockVersion | null
  onClose: () => void
}

export function DiffViewer({ version, onClose }: DiffViewerProps) {
  const [showRollback, setShowRollback] = useState(false)
  const { lang } = useLanguage()
  const ar = lang === "ar"

  if (!version) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed inset-4 md:inset-12 bg-white rounded-[18px] shadow-xl z-50 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-page-bg">
          <div>
            <span className="font-mono text-xs text-brand-dark/60">{version.article_code}</span>
            <h3 className="text-base font-bold text-text-primary mt-0.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              {version.article_title}
            </h3>
            <p className="text-xs text-text-primary/40 mt-0.5">
              {ar
                ? `${version.change_type} ${t("by_author_on_date", lang)} ${version.author} ${t("on_date", lang)} ${version.date}`
                : `${version.change_type} by ${version.author} on ${version.date}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowRollback(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-primary/40 bg-page-bg rounded-lg hover:text-text-primary/70 transition-colors"
            >
              <RotateCcw size={12} />
              {ar ? t("rollback", lang) : "Rollback"}
            </button>
            <button onClick={onClose} className="p-2 text-text-primary/30 hover:text-text-primary transition-colors">
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-0 overflow-auto">
          {/* Before */}
          <div className="p-5 border-b md:border-b-0 md:border-r border-page-bg">
            <h4 className="text-xs font-semibold text-red-400 uppercase mb-3">{ar ? t("before", lang) : "Before"}</h4>
            <div className="bg-red-50/50 rounded-[12px] p-4">
              <p className="text-sm text-text-primary/60 leading-relaxed">{version.before}</p>
            </div>
          </div>

          {/* After */}
          <div className="p-5">
            <h4 className="text-xs font-semibold text-green-500 uppercase mb-3">{ar ? t("after", lang) : "After"}</h4>
            <div className="bg-green-50/50 rounded-[12px] p-4">
              <p className="text-sm text-text-primary/60 leading-relaxed">{version.after}</p>
            </div>
          </div>
        </div>

        {/* Rollback confirmation */}
        {showRollback && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-10">
            <div className="bg-white rounded-[18px] p-6 shadow-xl max-w-sm mx-4">
              <h4 className="text-sm font-bold text-text-primary mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
                {ar ? t("confirm_rollback", lang) : "Confirm Rollback"}
              </h4>
              <p className="text-xs text-text-primary/50 mb-4">
                {ar
                  ? t("rollback_description", lang).replace("{code}", version.article_code)
                  : `This will revert Article ${version.article_code} to its previous version. This action can be undone.`}
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRollback(false)}
                  className={cn(
                    "flex-1 px-4 py-2 text-xs font-semibold",
                    "bg-brand text-brand-dark",
                    "rounded-[1.5rem] hover:rounded-[0.5rem]",
                    "transition-all duration-[400ms]"
                  )}
                >
                  {ar ? t("confirm_rollback", lang) : "Confirm Rollback"}
                </button>
                <button
                  onClick={() => setShowRollback(false)}
                  className="px-4 py-2 text-xs font-medium text-text-primary/40 bg-page-bg rounded-[1.5rem]"
                >
                  {ar ? t("cancel", lang) : "Cancel"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
