"use client"

import { X, ThumbsUp, ThumbsDown, CheckCircle, XCircle, Flag } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MockAIReview } from "@/data/admin-mock-data"

interface AIReviewDetailProps {
  review: MockAIReview | null
  onClose: () => void
}

export function AIReviewDetail({ review, onClose }: AIReviewDetailProps) {
  if (!review) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full max-w-lg bg-white shadow-xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between p-5 border-b border-page-bg">
          <h3 className="text-base font-bold text-text-primary" style={{ fontFamily: "'Inter', sans-serif" }}>
            AI Interaction Review
          </h3>
          <button onClick={onClose} className="p-2 text-text-primary/30 hover:text-text-primary transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-5 space-y-5">
          {/* User query */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">User Query</h4>
            <div className="bg-brand/10 rounded-[12px] p-4">
              <p className="text-sm text-text-primary/70">{review.query}</p>
            </div>
          </div>

          {/* AI Response */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">AI Response</h4>
            <div className="bg-cream rounded-[12px] p-4">
              <p className="text-sm text-text-primary/60 leading-relaxed">{review.response_preview}</p>
            </div>
          </div>

          {/* Flag reason */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">Flag Reason</h4>
            <div className="bg-amber-50 border border-amber-100 rounded-[12px] p-4">
              <p className="text-sm text-amber-700">{review.flag_reason}</p>
            </div>
          </div>

          {/* Retrieved articles */}
          {review.retrieved_articles.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">Retrieved Articles</h4>
              <div className="flex flex-wrap gap-2">
                {review.retrieved_articles.map((id) => (
                  <span key={id} className="text-xs bg-brand/10 text-brand-dark px-3 py-1 rounded-full">
                    Article {id}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Satisfaction */}
          <div>
            <h4 className="text-xs font-semibold text-text-primary/40 uppercase mb-2">User Satisfaction</h4>
            <div className="flex items-center gap-2">
              {review.user_satisfaction === "positive" ? (
                <span className="flex items-center gap-1 text-xs text-green-600"><ThumbsUp size={12} /> Positive</span>
              ) : review.user_satisfaction === "negative" ? (
                <span className="flex items-center gap-1 text-xs text-red-500"><ThumbsDown size={12} /> Negative</span>
              ) : (
                <span className="text-xs text-text-primary/30">No feedback</span>
              )}
            </div>
          </div>

          {/* Metadata */}
          <div className="flex gap-4 text-xs text-text-primary/30">
            <span>Date: {review.date}</span>
            <span>Status: {review.status}</span>
          </div>
        </div>

        {/* Actions */}
        {review.status === "Open" && (
          <div className="p-5 border-t border-page-bg flex gap-2">
            <button
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold",
                "bg-green-50 text-green-700",
                "rounded-[1.5rem] hover:rounded-[0.5rem] hover:bg-green-100",
                "transition-all duration-[400ms]"
              )}
            >
              <CheckCircle size={13} /> Mark Resolved
            </button>
            <button
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold",
                "bg-page-bg text-text-primary/40",
                "rounded-[1.5rem] hover:rounded-[0.5rem] hover:text-text-primary/60",
                "transition-all duration-[400ms]"
              )}
            >
              <XCircle size={13} /> Dismiss
            </button>
            <button
              className={cn(
                "flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-semibold",
                "bg-amber-50 text-amber-700",
                "rounded-[1.5rem] hover:rounded-[0.5rem] hover:bg-amber-100",
                "transition-all duration-[400ms]"
              )}
            >
              <Flag size={13} /> Flag
            </button>
          </div>
        )}
      </div>
    </>
  )
}
