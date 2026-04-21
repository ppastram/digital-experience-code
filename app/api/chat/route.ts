import { NextRequest, NextResponse } from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import { getRulesForChatbot } from "@/lib/emirates-code-data"

const SYSTEM_PROMPT = `You are an expert assistant on the Emirates Code for Government Services (UAE).
You help government officials, entity representatives, and citizens understand the rules and requirements in the Code.

Answer questions accurately based on the Code articles provided below. When referencing specific articles, always cite the article number (e.g., "Article 1.1.1").

If asked about something not covered by the Code, say so clearly.

Be professional, concise, and authoritative in tone — you are serving UAE government stakeholders.

When the user writes in Arabic, respond in Arabic. When in English, respond in English.

Use markdown formatting: headers, bold, bullet points, and numbered lists where appropriate.

IMPORTANT: The Emirates Code contains exactly 357 articles in total, organized across 8 pillars. Always use this number when asked about the total count — do not try to count them yourself.

Here are all the Emirates Code articles:

`

export async function POST(request: NextRequest) {
  try {
    const { messages, language } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "Messages are required" }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    const isMock = !apiKey || !apiKey.startsWith("sk-") || apiKey.length < 10

    if (isMock) {
      const lastMessage = messages[messages.length - 1]?.content || ""
      const mockResponse = generateMockResponse(lastMessage, language || "en")
      return NextResponse.json({ content: mockResponse })
    }

    const client = new Anthropic({ apiKey })
    const rulesContext = getRulesForChatbot()

    const response = await client.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2048,
      system: SYSTEM_PROMPT + rulesContext,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    })

    const textBlock = response.content.find((b) => b.type === "text")
    const content = textBlock ? textBlock.text : "I could not generate a response."

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    )
  }
}

function generateMockResponse(question: string, language: string): string {
  const q = question.toLowerCase()

  if (language === "ar") {
    return `## إجابة تجريبية

هذا رد تجريبي من النظام. في الوضع الحي، سيقوم الذكاء الاصطناعي بتحليل سؤالك والإجابة بناءً على مواد ميثاق الإمارات للخدمات الحكومية.

**ملاحظة:** للحصول على إجابات حية، يرجى تكوين مفتاح API الخاص بـ Anthropic.`
  }

  if (q.includes("accessibility") || q.includes("wcag")) {
    return `## Accessibility Standards

The Emirates Code addresses accessibility extensively in **Pillar 1, Category 1.1 — Accessibility Standards**.

Key articles include:

- **Article 1.1.1**: All authentication steps (login, password reset, verification) must meet **WCAG 2.2** standards, provide clear error messages, and allow sufficient time.
- **Article 1.1.2**: Every interactive element must be fully operable using **keyboard only**, with logical tab order and clear visual focus.
- **Article 1.1.3**: All digital service pages must include screen reader compatibility with proper ARIA labels and alt text.

These are all classified as **high impact** requirements.`
  }

  if (q.includes("complaint") || q.includes("شكوى")) {
    return `## Complaint Handling

The Emirates Code covers complaint handling under **Pillar 2, Category 2.4 — Complaint Handling and Resolution**.

Key requirements include:

- **Article 2.4.1**: Entities must provide a dedicated and easy-to-access complaints channel across all service platforms.
- **Article 2.4.2**: Every complaint must receive an automatic acknowledgment with a unique tracking number.
- **Article 2.4.3**: Complaints must be classified by type, priority, and service area for proper routing.

All complaint handling articles are classified as **high impact**.`
  }

  return `## Emirates Code Overview

The Emirates Code for Government Services contains **357 articles** across 8 pillars covering all aspects of government service delivery.

Key areas include:
- **Service Accessibility** — WCAG compliance, keyboard navigation, screen readers
- **Service Efficiency** — Form quality, simplified journeys, fee transparency
- **Customer Experience** — Satisfaction measurement, feedback collection
- **Digital Services** — Digital support, language consistency, design systems
- **Complaints Handling** — Dedicated channels, tracking, resolution timelines

To learn more, ask about a specific topic or article number.

*Note: This is a demo response. Configure the Anthropic API key for live AI responses.*`
}
