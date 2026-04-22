"use client"

import { MOCK_ANALYTICS } from "@/data/admin-mock-data"
import { KpiCards } from "@/components/admin/kpi-cards"
import { AnalyticsCharts } from "@/components/admin/analytics-charts"

export default function AdminAnalyticsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Analytics Dashboard</h1>
      <p className="text-sm text-text-primary/40 mb-6">Platform usage and engagement metrics</p>

      <div className="space-y-6">
        <KpiCards kpis={MOCK_ANALYTICS.kpis} />
        <AnalyticsCharts analytics={MOCK_ANALYTICS} />
      </div>
    </div>
  )
}
