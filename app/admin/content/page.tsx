"use client"

import { useState } from "react"
import { MOCK_ARTICLES, type MockArticle } from "@/data/admin-mock-data"
import { ContentTable } from "@/components/admin/content-table"
import { ArticleDrawer } from "@/components/admin/article-drawer"

export default function AdminContentPage() {
  const [selected, setSelected] = useState<MockArticle | null>(null)

  const statusCounts = {
    total: MOCK_ARTICLES.length,
    published: MOCK_ARTICLES.filter((a) => a.status === "Published").length,
    review: MOCK_ARTICLES.filter((a) => a.status === "In Review").length,
    draft: MOCK_ARTICLES.filter((a) => a.status === "Draft").length,
  }

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-6">Content Management</h1>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Articles", value: statusCounts.total, color: "text-text-primary" },
          { label: "Published", value: statusCounts.published, color: "text-green-600" },
          { label: "In Review", value: statusCounts.review, color: "text-amber-600" },
          { label: "Drafts", value: statusCounts.draft, color: "text-gray-500" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-[18px] p-4 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
            <p className="text-xs text-text-primary/40 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <ContentTable
        articles={MOCK_ARTICLES}
        onSelect={setSelected}
        selectedId={selected?.id ?? null}
      />

      <ArticleDrawer
        article={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
