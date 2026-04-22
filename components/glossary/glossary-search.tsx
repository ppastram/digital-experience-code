"use client"

import { Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"

interface GlossarySearchProps {
  value: string
  onChange: (value: string) => void
}

export function GlossarySearch({ value, onChange }: GlossarySearchProps) {
  const { isRtl } = useLanguage()

  return (
    <div className="relative max-w-xl mx-auto">
      <Search
        size={18}
        className={cn(
          "absolute top-1/2 -translate-y-1/2 text-neutral-gray",
          isRtl ? "right-5" : "left-5"
        )}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          isRtl
            ? "ابحث عن مصطلح..."
            : "Search terms..."
        }
        dir={isRtl ? "rtl" : "ltr"}
        className={cn(
          "w-full rounded-[18px] py-3.5 text-sm bg-white border-0",
          "shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
          "focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,191,54,0.3),0_2px_8px_rgba(0,0,0,0.06)]",
          "placeholder:text-neutral-gray text-text-primary",
          "transition-shadow duration-300",
          isRtl ? "pr-12 pl-5" : "pl-12 pr-5"
        )}
      />
    </div>
  )
}
