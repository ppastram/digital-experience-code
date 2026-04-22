"use client"

import { useState } from "react"
import { MOCK_AI_REVIEWS, type MockAIReview } from "@/data/admin-mock-data"
import { AIReviewTable } from "@/components/admin/ai-review-table"
import { AIReviewDetail } from "@/components/admin/ai-review-detail"

export default function AIReviewPage() {
  const [selected, setSelected] = useState<MockAIReview | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  const openCount = MOCK_AI_REVIEWS.filter((r) => r.status === "Open").length

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">AI Review Queue</h1>
      <p className="text-sm text-text-primary/40 mb-6">
        {openCount} flagged interactions awaiting review
      </p>

      <AIReviewTable
        reviews={MOCK_AI_REVIEWS}
        onSelect={setSelected}
        selectedId={selected?.id ?? null}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
      />

      <AIReviewDetail
        review={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
