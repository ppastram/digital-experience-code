"use client"

import { cn } from "@/lib/utils"

export function SettingsForm() {
  return (
    <div className="space-y-6">
      {/* General */}
      <SettingsCard title="General">
        <FieldGroup label="Platform Name">
          <input
            type="text"
            defaultValue="Emirates Code — Digital Experience"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
        <FieldGroup label="Default Language">
          <select
            defaultValue="en"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="en">English</option>
            <option value="ar">Arabic</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Show Disclaimer Banner">
          <Toggle defaultChecked />
        </FieldGroup>
      </SettingsCard>

      {/* AI Configuration */}
      <SettingsCard title="AI Configuration">
        <FieldGroup label="AI Model">
          <select
            defaultValue="claude-sonnet"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            <option value="claude-sonnet">Claude Sonnet 4.5</option>
            <option value="claude-haiku">Claude Haiku 4.5</option>
          </select>
        </FieldGroup>
        <FieldGroup label="Enable AI Chat">
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label="Auto-flag Sensitive Topics">
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label="Max Tokens per Response">
          <input
            type="number"
            defaultValue={2048}
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
      </SettingsCard>

      {/* Notifications */}
      <SettingsCard title="Notifications">
        <FieldGroup label="Email Notifications">
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label="Notify on New AI Flags">
          <Toggle defaultChecked />
        </FieldGroup>
        <FieldGroup label="Weekly Analytics Digest">
          <Toggle />
        </FieldGroup>
      </SettingsCard>

      {/* Access */}
      <SettingsCard title="Access Control">
        <FieldGroup label="Admin Email">
          <input
            type="email"
            defaultValue="admin@egsep.gov.ae"
            className="w-full text-sm bg-page-bg border-0 rounded-[12px] px-4 py-2.5 text-text-primary focus:outline-none focus:ring-2 focus:ring-brand/30"
          />
        </FieldGroup>
        <FieldGroup label="Require Authentication">
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
          Save Changes
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
