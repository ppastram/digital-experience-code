"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Send, Loader2, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { type ArticleClickHandler } from "./markdown-renderer"
import { AssistantMessage } from "./assistant-message"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface ChatbotProps {
  language: "en" | "ar"
  onArticleClick?: ArticleClickHandler
  fullHeight?: boolean
}

const SUGGESTIONS_EN = [
  "What are the accessibility requirements?",
  "How should complaints be handled?",
  "What are the digital service standards?",
  "Explain Article 2.4.1",
]

const SUGGESTIONS_AR = [
  "ما هي متطلبات إمكانية الوصول؟",
  "كيف يجب التعامل مع الشكاوى؟",
  "ما هي معايير الخدمات الرقمية؟",
  "اشرح المادة 2.4.1",
]

const WELCOME_EN = {
  title: "Ask the Emirates Code",
  subtitle:
    "Ask any question about the Emirates Code for Government Services. I can help you understand specific articles, find relevant requirements, or explain compliance standards.",
}

const WELCOME_AR = {
  title: "اسأل عن ميثاق الإمارات",
  subtitle:
    "اطرح أي سؤال حول ميثاق الإمارات للخدمات الحكومية. يمكنني مساعدتك في فهم مواد محددة أو العثور على المتطلبات ذات الصلة أو شرح معايير الامتثال.",
}

export function Chatbot({ language, onArticleClick, fullHeight }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isRtl = language === "ar"
  const welcome = isRtl ? WELCOME_AR : WELCOME_EN
  const suggestions = isRtl ? SUGGESTIONS_AR : SUGGESTIONS_EN

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, loading, scrollToBottom])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = { role: "user", content: text.trim() }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, language }),
      })

      if (!res.ok) {
        const errorMsg = res.status === 504
          ? (language === "ar" ? "انتهت مهلة الطلب. يرجى المحاولة مرة أخرى." : "Request timed out. Please try again.")
          : (language === "ar" ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Sorry, an error occurred. Please try again.")
        setMessages([...newMessages, { role: "assistant", content: errorMsg }])
        return
      }

      const data = await res.json()

      if (data.error) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: language === "ar" ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Sorry, an error occurred. Please try again." },
        ])
      } else {
        setMessages([...newMessages, { role: "assistant", content: data.content }])
      }
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Failed to connect to the server. Please try again.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value)
    // Auto-grow
    const ta = e.target
    ta.style.height = "auto"
    ta.style.height = Math.min(ta.scrollHeight, 120) + "px"
  }

  return (
    <div
      className={cn(
        "flex flex-col bg-white rounded-[18px] overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.06)]",
        fullHeight ? "flex-1 min-h-0" : "h-[600px]"
      )}
      style={{ fontFamily: "'Roboto', 'Noto Kufi Arabic', sans-serif" }}
    >
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4" dir={isRtl ? "rtl" : "ltr"}>
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div
              className={cn(
                "w-14 h-14 rounded-[18px] bg-brand/10 flex items-center justify-center mb-5",
                "transition-transform duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
                "hover:scale-110"
              )}
            >
              <Sparkles className="text-brand" size={26} />
            </div>
            <h3
              className="text-xl font-bold text-text-primary mb-2"
              style={{ fontFamily: "'Inter', 'Alexandria', sans-serif" }}
            >
              {welcome.title}
            </h3>
            <p className="text-sm text-text-primary/45 max-w-md mb-8">{welcome.subtitle}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className={cn(
                    "text-left text-sm p-4 bg-cream border border-brand/20",
                    "text-text-primary/60",
                    "rounded-[1.5rem] hover:rounded-[0.5rem]",
                    "hover:border-brand hover:bg-brand/5 hover:text-text-primary",
                    "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
                  )}
                  dir={isRtl ? "rtl" : "ltr"}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "flex",
              msg.role === "user"
                ? isRtl
                  ? "justify-start"
                  : "justify-end"
                : isRtl
                  ? "justify-end"
                  : "justify-start"
            )}
          >
            {msg.role === "assistant" ? (
              <AssistantMessage
                content={msg.content}
                onArticleClick={onArticleClick}
                language={language}
              />
            ) : (
              <div className="max-w-[80%] rounded-[18px] px-5 py-3.5 bg-brand text-brand-dark">
                <p className="text-sm whitespace-pre-wrap font-medium">{msg.content}</p>
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className={cn("flex", isRtl ? "justify-end" : "justify-start")}>
            <div className="bg-cream rounded-[18px] px-5 py-3.5 flex items-center gap-2.5">
              <Loader2 size={15} className="animate-spin text-brand" />
              <span className="text-sm text-text-primary/40">
                {isRtl ? "جارٍ التحليل..." : "Analyzing..."}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="border-t border-page-bg p-4">
        <div className="flex items-end gap-3" dir={isRtl ? "rtl" : "ltr"}>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={
              isRtl
                ? "اكتب سؤالك عن ميثاق الإمارات..."
                : "Ask about the Emirates Code..."
            }
            rows={1}
            className={cn(
              "flex-1 resize-none rounded-[18px] px-4 py-3 text-sm bg-page-bg border-0",
              "focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,191,54,0.3)]",
              "placeholder:text-neutral-gray text-text-primary",
              "transition-shadow duration-300"
            )}
            dir={isRtl ? "rtl" : "ltr"}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || loading}
            className={cn(
              "p-3 flex-shrink-0",
              "rounded-[1.5rem] hover:rounded-[0.5rem]",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]",
              input.trim() && !loading
                ? "bg-brand text-brand-dark hover:shadow-md"
                : "bg-page-bg text-neutral-gray cursor-not-allowed"
            )}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-text-primary/25 mt-2 text-center">
          {isRtl
            ? "مدعوم بالذكاء الاصطناعي — قد تحتاج الإجابات إلى التحقق"
            : "AI-powered — responses may require verification"}
        </p>
      </div>
    </div>
  )
}
