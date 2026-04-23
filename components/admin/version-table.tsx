"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"
import type { MockVersion } from "@/data/admin-mock-data"

const CHANGE_TYPE_STYLES: Record<string, string> = {
  "Content Update": "bg-blue-50 text-blue-700",
  "New Article": "bg-green-50 text-green-700",
  "Requirement Added": "bg-purple-50 text-purple-700",
  "Structural Change": "bg-amber-50 text-amber-700",
  Correction: "bg-gray-100 text-gray-600",
}

const CHANGE_TYPE_KEYS: Record<string, string> = {
  "Content Update": "change_content_update",
  "New Article": "change_new_article",
  "Requirement Added": "change_requirement_added",
  "Structural Change": "change_structural_change",
  Correction: "change_correction",
}

interface VersionTableProps {
  versions: MockVersion[]
  onSelect: (version: MockVersion) => void
  selectedId: string | null
}

export function VersionTable({ versions, onSelect, selectedId }: VersionTableProps) {
  const { lang } = useLanguage()
  const ar = lang === "ar"

  return (
    <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-page-bg">
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("date", lang) : "Date"}</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("article", lang) : "Article"}</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">{ar ? t("change_type", lang) : "Change Type"}</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden lg:table-cell">{ar ? t("author", lang) : "Author"}</th>
          </tr>
        </thead>
        <tbody>
          {versions.map((version) => (
            <tr
              key={version.id}
              onClick={() => onSelect(version)}
              className={cn(
                "border-b border-page-bg/50 cursor-pointer transition-colors",
                selectedId === version.id ? "bg-brand/5" : "hover:bg-page-bg/50"
              )}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onSelect(version)}
            >
              <td className="px-5 py-3.5 text-text-primary/40">{version.date}</td>
              <td className="px-5 py-3.5">
                <span className="font-mono text-xs text-brand-dark/60">{version.article_code}</span>
                <span className="ml-2 text-text-primary/70">{version.article_title}</span>
              </td>
              <td className="px-5 py-3.5 hidden md:table-cell">
                <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", CHANGE_TYPE_STYLES[version.change_type] ?? "bg-gray-100 text-gray-600")}>
                  {ar ? t(CHANGE_TYPE_KEYS[version.change_type] ?? version.change_type, lang) : version.change_type}
                </span>
              </td>
              <td className="px-5 py-3.5 text-text-primary/40 hidden lg:table-cell">{version.author}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
