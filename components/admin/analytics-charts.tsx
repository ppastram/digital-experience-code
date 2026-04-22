"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"
import type { MockAnalytics } from "@/data/admin-mock-data"

interface AnalyticsChartsProps {
  analytics: MockAnalytics
}

export function AnalyticsCharts({ analytics }: AnalyticsChartsProps) {
  return (
    <div className="space-y-6">
      {/* Usage over time */}
      <ChartCard title="Usage Over Time (30 Days)">
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={analytics.daily_usage}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#0C0D0C66" }}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis tick={{ fontSize: 10, fill: "#0C0D0C66" }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="views" stroke="#FFBF36" strokeWidth={2} dot={false} name="Page Views" />
            <Line type="monotone" dataKey="ai_queries" stroke="#773610" strokeWidth={2} dot={false} name="AI Queries" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Domain access bar chart */}
      <ChartCard title="Most Accessed Domains">
        <ResponsiveContainer width="100%" height={360}>
          <BarChart data={analytics.domain_access} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis type="number" tick={{ fontSize: 10, fill: "#0C0D0C66" }} />
            <YAxis
              type="category"
              dataKey="domain"
              tick={{ fontSize: 10, fill: "#0C0D0C99" }}
              width={140}
            />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}
            />
            <Bar dataKey="count" fill="#FFBF36" radius={[0, 4, 4, 0]} name="Views" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top search queries */}
        <ChartCard title="Top Search Queries">
          <div className="space-y-0">
            <div className="flex items-center justify-between px-1 pb-2 border-b border-page-bg">
              <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Query</span>
              <div className="flex gap-8">
                <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Searches</span>
                <span className="text-[10px] font-semibold text-text-primary/40 uppercase w-12 text-right">Results</span>
              </div>
            </div>
            {analytics.top_searches.map((s) => (
              <div key={s.query} className="flex items-center justify-between px-1 py-2.5 border-b border-page-bg/50">
                <span className="text-sm text-text-primary/60">{s.query}</span>
                <div className="flex gap-8">
                  <span className="text-sm font-medium text-text-primary/70">{s.count}</span>
                  <span className="text-sm text-text-primary/35 w-12 text-right">{s.results}</span>
                </div>
              </div>
            ))}
          </div>
        </ChartCard>

        {/* Zero-result searches */}
        <ChartCard title="Zero-Result Searches">
          <div className="space-y-0">
            <div className="flex items-center justify-between px-1 pb-2 border-b border-page-bg">
              <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Query</span>
              <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Attempts</span>
            </div>
            {analytics.zero_result_searches.map((s) => (
              <div key={s.query} className="flex items-center justify-between px-1 py-2.5 border-b border-page-bg/50">
                <span className="text-sm text-text-primary/60">{s.query}</span>
                <span className="text-sm font-medium text-red-400">{s.count}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-text-primary/25 mt-3">
            These queries indicate content gaps. Consider adding relevant articles.
          </p>
        </ChartCard>
      </div>

      {/* AI Satisfaction */}
      <ChartCard title="AI Chat Satisfaction (30 Days)">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={analytics.ai_satisfaction}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: "#0C0D0C66" }}
              tickFormatter={(v) => v.slice(5)}
            />
            <YAxis tick={{ fontSize: 10, fill: "#0C0D0C66" }} />
            <Tooltip
              contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", fontSize: 12 }}
            />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="positive" stroke="#22c55e" strokeWidth={2} dot={false} name="Positive" />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} dot={false} name="Negative" />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Flagged topics */}
      <ChartCard title="Most Flagged Topics">
        <div className="space-y-0">
          <div className="flex items-center justify-between px-1 pb-2 border-b border-page-bg">
            <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Topic</span>
            <div className="flex gap-8">
              <span className="text-[10px] font-semibold text-text-primary/40 uppercase">Flags</span>
              <span className="text-[10px] font-semibold text-text-primary/40 uppercase w-16 text-right">Severity</span>
            </div>
          </div>
          {analytics.flagged_topics.map((t) => (
            <div key={t.topic} className="flex items-center justify-between px-1 py-2.5 border-b border-page-bg/50">
              <span className="text-sm text-text-primary/60">{t.topic}</span>
              <div className="flex gap-8 items-center">
                <span className="text-sm font-medium text-text-primary/70">{t.count}</span>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full w-16 text-center ${
                  t.severity === "high" ? "bg-red-50 text-red-600" :
                  t.severity === "medium" ? "bg-amber-50 text-amber-600" :
                  "bg-gray-100 text-gray-500"
                }`}>
                  {t.severity}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-5">
      <h3 className="text-sm font-bold text-text-primary mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h3>
      {children}
    </div>
  )
}
