"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"
import type { MockArticle, ArticleStatus } from "@/data/admin-mock-data"

const STATUS_STYLES: Record<ArticleStatus, string> = {
  Draft: "bg-gray-100 text-gray-600",
  "In Review": "bg-amber-50 text-amber-700",
  Approved: "bg-blue-50 text-blue-700",
  Published: "bg-green-50 text-green-700",
}

interface ContentTableProps {
  articles: MockArticle[]
  onSelect: (article: MockArticle) => void
  selectedId: string | null
}

const STATUS_LABELS: Record<ArticleStatus, string> = {
  Draft: "status_draft",
  "In Review": "status_in_review",
  Approved: "status_approved",
  Published: "status_published",
}

export function ContentTable({ articles, onSelect, selectedId }: ContentTableProps) {
  const [domainFilter, setDomainFilter] = useState<string>("all")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const { lang } = useLanguage()
  const ar = lang === "ar"

  const domains = Array.from(new Set(articles.map((a) => a.domain))).sort()
  const statuses: ArticleStatus[] = ["Draft", "In Review", "Approved", "Published"]

  const filtered = articles.filter((a) => {
    if (domainFilter !== "all" && a.domain !== domainFilter) return false
    if (statusFilter !== "all" && a.status !== statusFilter) return false
    return true
  })

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <select
          value={domainFilter}
          onChange={(e) => setDomainFilter(e.target.value)}
          className="text-xs bg-white border border-uae-gray-100 rounded-lg px-3 py-2 text-text-primary/60 focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          <option value="all">{ar ? t("all_domains", lang) : "All Domains"}</option>
          {domains.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs bg-white border border-uae-gray-100 rounded-lg px-3 py-2 text-text-primary/60 focus:outline-none focus:ring-2 focus:ring-brand/30"
        >
          <option value="all">{ar ? t("all_statuses", lang) : "All Statuses"}</option>
          {statuses.map((s) => (
            <option key={s} value={s}>{ar ? t(STATUS_LABELS[s], lang) : s}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-page-bg">
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("article", lang) : "Article"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">{ar ? t("domain", lang) : "Domain"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40">{ar ? t("status", lang) : "Status"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden lg:table-cell">{ar ? t("author", lang) : "Author"}</th>
              <th className="text-left px-5 py-3 text-xs font-semibold text-text-primary/40 hidden md:table-cell">{ar ? t("modified", lang) : "Modified"}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((article) => (
              <tr
                key={article.id}
                onClick={() => onSelect(article)}
                className={cn(
                  "border-b border-page-bg/50 cursor-pointer transition-colors",
                  selectedId === article.id
                    ? "bg-brand/5"
                    : "hover:bg-page-bg/50"
                )}
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && onSelect(article)}
              >
                <td className="px-5 py-3.5">
                  <span className="font-mono text-xs text-brand-dark/60">{article.code}</span>
                  <span className="ml-2 text-text-primary/70">{article.title_en}</span>
                </td>
                <td className="px-5 py-3.5 text-text-primary/50 hidden md:table-cell">{article.domain}</td>
                <td className="px-5 py-3.5">
                  <span className={cn("text-[10px] font-semibold px-2.5 py-1 rounded-full", STATUS_STYLES[article.status])}>
                    {ar ? t(STATUS_LABELS[article.status], lang) : article.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-text-primary/40 hidden lg:table-cell">{article.author}</td>
                <td className="px-5 py-3.5 text-text-primary/30 hidden md:table-cell">{article.last_modified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
