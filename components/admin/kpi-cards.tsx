"use client"

import { TrendingUp, TrendingDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"
import type { MockAnalytics } from "@/data/admin-mock-data"

interface KpiCardsProps {
  kpis: MockAnalytics["kpis"]
}

export function KpiCards({ kpis }: KpiCardsProps) {
  const { lang } = useLanguage()

  const cards = [
    { label: lang === "ar" ? t("total_page_views", lang) : "Total Page Views", value: kpis.page_views.toLocaleString(), trend: kpis.page_views_trend },
    { label: lang === "ar" ? t("ai_interactions", lang) : "AI Interactions", value: kpis.ai_interactions.toLocaleString(), trend: kpis.ai_interactions_trend },
    { label: lang === "ar" ? t("unique_users", lang) : "Unique Users", value: kpis.unique_users.toLocaleString(), trend: kpis.unique_users_trend },
    { label: lang === "ar" ? t("avg_session", lang) : "Avg. Session", value: kpis.avg_session, trend: kpis.avg_session_trend },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => {
        const isPositive = card.trend >= 0
        return (
          <div
            key={card.label}
            className="bg-white rounded-[18px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
          >
            <p className="text-xs text-text-primary/40 mb-2">{card.label}</p>
            <p className="text-2xl font-bold text-text-primary mb-1">{card.value}</p>
            <div className={cn("flex items-center gap-1 text-xs font-medium", isPositive ? "text-green-600" : "text-red-500")}>
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isPositive ? "+" : ""}{card.trend}%
              <span className="text-text-primary/25 font-normal ml-1">{lang === "ar" ? t("vs_last_month", lang) : "vs last month"}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}
