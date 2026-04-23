"use client"

import { useState } from "react"
import { MOCK_VERSIONS, type MockVersion } from "@/data/admin-mock-data"
import { VersionTable } from "@/components/admin/version-table"
import { DiffViewer } from "@/components/admin/diff-viewer"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"

export default function VersionHistoryPage() {
  const [selected, setSelected] = useState<MockVersion | null>(null)
  const { lang } = useLanguage()
  const ar = lang === "ar"

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">{ar ? t("version_history", lang) : "Version History"}</h1>
      <p className="text-sm text-text-primary/40 mb-6">{ar ? t("track_all_changes", lang) : "Track all changes to Emirates Code articles"}</p>

      <VersionTable
        versions={MOCK_VERSIONS}
        onSelect={setSelected}
        selectedId={selected?.id ?? null}
      />

      <DiffViewer
        version={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  )
}
