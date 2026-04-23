"use client"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { t } from "@/data/admin-translations"

export function SettingsForm() {
  const { lang } = useLanguage()
  const ar = lang === "ar"

  return (
    <div className="space-y-6">
      {/* General */}
      <SettingsCard title={ar ? t("general", lang) : "General"}>
        <FieldGroup label={ar ? t("platform_name", lang) : "Platform Name"}>
          <input
            type="text"
            defaultValue="Emirates Code — Digital Experience"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
        <FieldGroup label={ar ? t("default_language", lang) : "Default Language"}>
          <select
            defaultValue="en"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="en">{ar ? t("english", lang) : "English"}</option>
            <option value="ar">{ar ? t("arabic", lang) : "Arabic"}</option>
          </select>
        </FieldGroup>
        <FieldGroup label={ar ? t("show_disclaimer_banner", lang) : "Show Disclaimer Banner"}>
          <Toggle defaultChecked />
        </FieldGroup>
      </SettingsCard>

      {/* AI Configuration */}
      <SettingsCard title={ar ? t("ai_configuration", lang) : "AI Configuration"}>
        <FieldGroup label={ar ? t("ai_model", lang) : "AI Model"}>
          <select
            defaultValue="claude-sonnet"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="claude-sonnet">Claude Sonnet 4.5</option>
            <option value="claude-haiku">Claude Haiku 4.5</option>
          </select>
        </FieldGroup>
        <FieldGroup label={ar ? t("enable_ai_chat", lang) : "Enable AI Chat"}>
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label={ar ? t("auto_flag_sensitive", lang) : "Auto-flag Sensitive Topics"}>
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label={ar ? t("max_tokens", lang) : "Max Tokens per Response"}>
          <input
            type="number"
            defaultValue={2048}
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard title={ar ? t("notifications", lang) : "Notifications"}>
        <FieldGroup label={ar ? t("email_notifications", lang) : "Email Notifications"}>
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label={ar ? t("notify_ai_flags", lang) : "Notify on New AI Flags"}>
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label={ar ? t("weekly_digest", lang) : "Weekly Analytics Digest"}>
          <Toggle />
        </FieldGroup>
      </SettingsCard>

      {/* Access */}
      <SettingsCard title={ar ? t("access_control", lang) : "Access Control"}>
        <FieldGroup label={ar ? t("admin_email", lang) : "Admin Email"}>
          <input
            type="email"
            defaultValue="admin@egsep.gov.ae"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
        <FieldGroup label={ar ? t("require_auth", lang) : "Require Authentication"}>
          <Toggle />
        </FieldGroup>
      </SettingsCard>

      <div className="flex justify-end">
        <button
          className={cn(
            "px-8 py-2.5 text-sm font-semibold",
            "bg-brand text-brand-dark",
            "rounded-[1.5rem] hover:rounded-[0.5rem]",
            "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
          )}
        >
          {ar ? t("save_changes", lang) : "Save Changes"}
        </button>
      </div>
    </div>
  )
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-[18px] shadow-[0_2px_8px_rgba(0,0,0,0.06)] p-6">
      <h3 className="text-sm font-bold text-text-primary mb-4" style={{ fontFamily: "'Inter', sans-serif" }}>
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function FieldGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <label className="text-sm text-text-primary/60 min-w-[160px]">{label}</label>
      <div className="flex-1 max-w-xs">
        {children}
      </div>
    </div>
  )
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-9 h-5 bg-page-bg rounded-full peer peer-checked:bg-brand transition-colors duration-200 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-full after:shadow-sm" />
    </label>
  )
}
