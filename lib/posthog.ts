import posthog from "posthog-js"

export const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY || ""
export const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com"

export function initPostHog() {
  if (typeof window === "undefined") return
  if (posthog.__loaded) return
  if (!POSTHOG_KEY) return

  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    capture_pageview: true,
    capture_pageleave: true,
    autocapture: true,
    persistence: "localStorage",
  })
}

// Custom event helpers
export function trackSearch(query: string, resultCount: number) {
  posthog.capture("search_performed", { query, result_count: resultCount })
}

export function trackCategorySelect(category: string) {
  posthog.capture("category_selected", { category })
}

export function trackArticleView(articleId: string, category: string) {
  posthog.capture("article_viewed", { article_id: articleId, category })
}

export function trackChatMessage(messageLength: number, language: string) {
  posthog.capture("chat_message_sent", { message_length: messageLength, language })
}

export function trackLanguageToggle(newLanguage: string) {
  posthog.capture("language_toggled", { language: newLanguage })
}

export function trackGlossaryTermView(termId: string) {
  posthog.capture("glossary_term_viewed", { term_id: termId })
}
