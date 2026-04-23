"use client"

import { SettingsForm } from "@/components/admin/settings-form"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"

export default function SettingsPage() {
  const { lang } = useLanguage()
  const ar = lang === "ar"

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">{ar ? t("settings_title", lang) : "Settings"}</h1>
      <p className="text-sm text-text-primary/40 mb-6">{ar ? t("configure_platform", lang) : "Configure platform behavior and preferences"}</p>
      <SettingsForm />
    </div>
  )
}
