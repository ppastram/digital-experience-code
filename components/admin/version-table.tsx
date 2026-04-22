"use client"

import { cn } from "@/lib/utils"
import type { MockVersion } from "@/data/admin-mock-data"

const CHANGE_TYPE_STYLES: Record<string, string> = {
  "Content Update": "bg-blue-50 text-blue-700",
  "New Article": "bg-green-50 text-green-700",
  "Requirement Added": "bg-purple-50 text-purple-700",
  "Structural Change": "bg-amber-50 text-amber-700",
  Correction: "bg-gray-100 text-gray-600",
}

interface VersionTableProps {
  versions: MockVersion[]
  onSelect: (version: MockVersion) => void
  selectedId: string | null
}

export function VersionTable({ versions, onSelect, selectedId }: VersionTableProps) {
  return (
    <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-page-bg">
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">Date</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">Article</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">Change Type</th>
            <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden lg:table-cell">Author</th>
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
                  {version.change_type}
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
