"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"
import type { MockAIReview } from "@/data/admin-mock-data"

const STATUS_STYLES: Record<string, string> = {
  Open: "bg-amber-50 text-amber-700",
  Resolved: "bg-green-50 text-green-700",
  Dismissed: "bg-gray-100 text-gray-500",
}

interface AIReviewTableProps {
  reviews: MockAIReview[]
  onSelect: (review: MockAIReview) => void
  selectedId: string | null
  statusFilter: string
  onStatusFilterChange: (status: string) => void
}

const FILTER_KEYS: Record<string, string> = {
  all: "all",
  Open: "open",
  Resolved: "resolved",
  Dismissed: "dismissed",
}

export function AIReviewTable({ reviews, onSelect, selectedId, statusFilter, onStatusFilterChange }: AIReviewTableProps) {
  const { lang } = useLanguage()
  const ar = lang === "ar"

  const filtered = statusFilter === "all"
    ? reviews
    : reviews.filter((r) => r.status === statusFilter)

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {["all", "Open", "Resolved", "Dismissed"].map((s) => (
          <button
            key={s}
            onClick={() => onStatusFilterChange(s)}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200",
              statusFilter === s
                ? "bg-brand text-brand-dark"
                : "bg-cream text-text-primary/40 hover:bg-brand/10"
            )}
          >
            {ar ? t(FILTER_KEYS[s], lang) : (s === "all" ? "All" : s)}
            {s !== "all" && (
              <span className="ml-1 opacity-60">
                ({reviews.filter((r) => r.status === s).length})
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-page-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("query", lang) : "Query"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">{ar ? t("flag_reason", lang) : "Flag Reason"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("status", lang) : "Status"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">{ar ? t("date", lang) : "Date"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((review) => (
              <tr
                key={review.id}
                onClick={() => onSelect(review)}
                className={cn(
                  "border-b border-page-bg/50 cursor-pointer transition-colors",
                  selectedId === review.id ? "bg-brand/5" : "hover:bg-page-bg/50"
                )}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelect(review)}
              >
                <td className="px-5 py-3.5 text-text-primary/70 max-w-[300px] truncate">{review.query}</td>
                <td className="px-5 py-3.5 text-text-primary/45 text-xs hidden md:table-cell max-w-[250px] truncate">{review.flag_reason}</td>
                <td className="px-5 py-3.5">
                  <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", STATUS_STYLES[review.status])}>
                    {review.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-text-primary/30 hidden md:table-cell">{review.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
