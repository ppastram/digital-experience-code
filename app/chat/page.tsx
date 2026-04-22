"use client"

import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { useLanguage } from "@/lib/language-context"
import { Chatbot } from "@/components/explorer/chatbot"

export default function ChatPage() {
  const { lang } = useLanguage()
  const router = useRouter()

  const handleArticleClick = useCallback(
    (articleId: string) => {
      router.push(`/explorer?q=${encodeURIComponent(articleId)}`)
    },
    [router]
  )

  return (
    <div
      className="flex-1 flex flex-col bg-page-bg overflow-hidden"
      style={{ fontFamily: "'Roboto', 'Noto Kufi Arabic', sans-serif" }}
    >
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 md:px-6 py-6 flex flex-col min-h-0">
        <Chatbot language={lang} onArticleClick={handleArticleClick} fullHeight />
      </div>
    </div>
  )
}
