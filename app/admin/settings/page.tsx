"use client"

import { SettingsForm } from "@/components/admin/settings-form"

export default function SettingsPage() {
  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      <h1 className="text-2xl font-bold text-text-primary mb-2">Settings</h1>
      <p className="text-sm text-text-primary/40 mb-6">Configure platform behavior and preferences</p>
      <SettingsForm />
    </div>
  )
}
