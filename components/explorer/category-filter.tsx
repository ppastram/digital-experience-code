"use client"

import { cn } from "@/lib/utils"
import type { UICategory } from "@/lib/emirates-code-data"
import { useLanguage } from "@/lib/language-context"

interface CategoryFilterProps {
  categories: UICategory[]
  selected: string | null
  onSelect: (category: string | null) => void
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  const { lang } = useLanguage()
  return (
    <div className="flex flex-wrap gap-2.5 justify-center">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "px-4 py-2 text-sm font-medium border-0",
          "rounded-[1.5rem] hover:rounded-[0.5rem]",
          "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
          selected === null
            ? "bg-brand text-brand-dark shadow-md"
            : "bg-cream text-text-primary/50 hover:bg-brand/10 hover:text-text-primary/80"
        )}
      >
        {lang === "ar" ? "الكل" : "All"}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onSelect(selected === cat.name ? null : cat.name)}
          className={cn(
            "px-4 py-2 text-sm font-medium border-0",
            "rounded-[1.5rem] hover:rounded-[0.5rem]",
            "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
            selected === cat.name
              ? "bg-brand text-brand-dark shadow-md"
              : "bg-cream text-text-primary/50 hover:bg-brand/10 hover:text-text-primary/80"
          )}
        >
          {cat.icon} {lang === "ar" ? cat.name_ar : cat.name}
          <span className={cn(
            "ml-1.5 text-xs",
            selected === cat.name ? "text-brand-dark/60" : "opacity-50"
          )}>
            ({cat.count})
          </span>
        </button>
      ))}
    </div>
  )
}
