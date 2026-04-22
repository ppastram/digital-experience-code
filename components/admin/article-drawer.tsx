"use client"

import { X, Clock, Check, FileText, Send } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MockArticle } from "@/data/admin-mock-data"

interface ArticleDrawerProps {
  article: MockArticle | null
  onClose: () => void
}

const WORKFLOW_STEPS = [
  { status: "Draft", icon: FileText, label: "Drafted" },
  { status: "In Review", icon: Clock, label: "In Review" },
  { status: "Approved", icon: Check, label: "Approved" },
  { status: "Published", icon: Send, label: "Published" },
]

const STATUS_ORDER: Record<string, number> = {
  Draft: 0,
  "In Review": 1,
  Approved: 2,
  Published: 3,
}

export function ArticleDrawer({ article, onClose }: ArticleDrawerProps) {
  if (!article) return null

  const currentStep = STATUS_ORDER[article.status] ?? 0

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b border-page-bg">
          <div>
            <span className="font-mono text-xs text-brand-dark/60">{article.code}</span>
            <h3
              className="text-base font-bold text-text-primary mt-0.5"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              {article.title_en}
            </h3>
          </div>
          <button onClick={onClose} className="p-2 text-text-primary/30 hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-6">
          {/* Content preview */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">Content</h4>
            <p className="text-sm text-text-primary/60 leading-relaxed">{article.content_preview}</p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-1">Domain</h4>
              <p className="text-sm text-text-primary/70">{article.domain}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-1">Author</h4>
              <p className="text-sm text-text-primary/70">{article.author}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-1">Created</h4>
              <p className="text-sm text-text-primary/70">{article.created}</p>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-1">Last Modified</h4>
              <p className="text-sm text-text-primary/70">{article.last_modified}</p>
            </div>
          </div>

          {/* Workflow timeline */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-4">Workflow</h4>
            <div className="space-y-0">
              {WORKFLOW_STEPS.map((step, idx) => {
                const isCompleted = idx <= currentStep
                const isCurrent = idx === currentStep
                return (
                  <div key={step.status} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div
                        className={cn(
                          "w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0",
                          isCurrent
                            ? "bg-brand text-brand-dark"
                            : isCompleted
                            ? "bg-green-50 text-green-600"
                            : "bg-page-bg text-text-primary/20"
                        )}
                      >
                        <step.icon size={13} />
                      </div>
                      {idx < WORKFLOW_STEPS.length - 1 && (
                        <div
                          className={cn(
                            "w-px h-6",
                            isCompleted ? "bg-green-200" : "bg-page-bg"
                          )}
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p
                        className={cn(
                          "text-sm font-medium",
                          isCurrent ? "text-text-primary" : isCompleted ? "text-text-primary/50" : "text-text-primary/20"
                        )}
                      >
                        {step.label}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-5 border-t border-page-bg flex gap-3">
          <button
            className={cn(
              "flex-1 px-4 py-2.5 text-sm font-semibold",
              "bg-brand text-brand-dark",
              "rounded-[1.5rem] hover:rounded-[0.5rem]",
              "transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)]"
            )}
          >
            {article.status === "Draft"
              ? "Submit for Review"
              : article.status === "In Review"
              ? "Approve"
              : article.status === "Approved"
              ? "Publish"
              : "Edit"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-sm font-medium text-text-primary/40 bg-page-bg rounded-[1.5rem] hover:rounded-[0.5rem] transition-all duration-[400ms]"
          >
            Close
          </button>
        </div>
      </div>
    </>
  )
}
