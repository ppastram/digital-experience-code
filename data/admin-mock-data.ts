export type ArticleStatus = "Draft" | "In Review" | "Approved" | "Published"

export interface MockArticle {
  id: string
  code: string
  title_en: string
  domain: string
  status: ArticleStatus
  author: string
  last_modified: string
  created: string
  content_preview: string
}

export interface MockVersion {
  id: string
  article_code: string
  article_title: string
  change_type: "Content Update" | "New Article" | "Requirement Added" | "Structural Change" | "Correction"
  author: string
  date: string
  before: string
  after: string
}

export interface MockAIReview {
  id: string
  query: string
  response_preview: string
  flag_reason: string
  status: "Open" | "Resolved" | "Dismissed"
  date: string
  user_satisfaction: "positive" | "negative" | "none"
  retrieved_articles: string[]
}

export interface MockAnalytics {
  kpis: {
    page_views: number
    page_views_trend: number
    ai_interactions: number
    ai_interactions_trend: number
    unique_users: number
    unique_users_trend: number
    avg_session: string
    avg_session_trend: number
  }
  daily_usage: Array<{ date: string; views: number; ai_queries: number }>
  domain_access: Array<{ domain: string; count: number }>
  top_searches: Array<{ query: string; count: number; results: number }>
  zero_result_searches: Array<{ query: string; count: number }>
  ai_satisfaction: Array<{ date: string; positive: number; negative: number }>
  flagged_topics: Array<{ topic: string; count: number; severity: string }>
}

export const MOCK_ARTICLES: MockArticle[] = [
  { id: "a1", code: "1.1.1", title_en: "WCAG 2.1 AA Compliance for Digital Services", domain: "Service Accessibility", status: "Published", author: "Dr. Fatima Al-Hashimi", last_modified: "2025-03-15", created: "2024-11-01", content_preview: "All government digital services must comply with WCAG 2.1 Level AA standards..." },
  { id: "a2", code: "1.1.2", title_en: "Physical Accessibility of Service Centers", domain: "Service Accessibility", status: "Published", author: "Ahmad Al-Mansouri", last_modified: "2025-03-10", created: "2024-11-01", content_preview: "Service centers must be fully accessible to people of determination..." },
  { id: "a3", code: "2.4.1", title_en: "Complaint Registration and Acknowledgement", domain: "Complaints Handling", status: "In Review", author: "Dr. Fatima Al-Hashimi", last_modified: "2025-04-01", created: "2024-12-15", content_preview: "Every complaint must be registered within 1 business day and acknowledged..." },
  { id: "a4", code: "2.4.2", title_en: "Complaint Escalation Procedures", domain: "Complaints Handling", status: "Draft", author: "Sara Al-Ketbi", last_modified: "2025-04-10", created: "2025-01-20", content_preview: "Unresolved complaints must be escalated through defined pathways..." },
  { id: "a5", code: "3.1.1", title_en: "Life Event Service Bundles", domain: "Humanized Services", status: "Published", author: "Omar Al-Shamsi", last_modified: "2025-02-28", created: "2024-11-15", content_preview: "Services shall be bundled around key life events such as birth, marriage..." },
  { id: "a6", code: "4.1.1", title_en: "Cross-Channel Service Parity", domain: "Channel Consistency", status: "Approved", author: "Ahmad Al-Mansouri", last_modified: "2025-03-20", created: "2024-12-01", content_preview: "All services available on one channel must be accessible across all channels..." },
  { id: "a7", code: "5.1.1", title_en: "UAE Pass Integration Requirements", domain: "Security & Systems", status: "Published", author: "Dr. Fatima Al-Hashimi", last_modified: "2025-01-15", created: "2024-11-01", content_preview: "All digital government services must integrate UAE Pass for authentication..." },
  { id: "a8", code: "5.2.1", title_en: "Data Classification and Protection", domain: "Security & Systems", status: "In Review", author: "Khalid Al-Nuaimi", last_modified: "2025-04-05", created: "2025-02-10", content_preview: "Personal data must be classified according to sensitivity levels..." },
  { id: "a9", code: "6.1.1", title_en: "Service Excellence Culture Framework", domain: "Service Culture", status: "Published", author: "Sara Al-Ketbi", last_modified: "2025-02-20", created: "2024-11-20", content_preview: "Entities shall foster a culture of outstanding service through..." },
  { id: "a10", code: "7.1.1", title_en: "Co-Design and Beta Testing Standards", domain: "Participatory Design", status: "Draft", author: "Omar Al-Shamsi", last_modified: "2025-04-12", created: "2025-03-01", content_preview: "New services must undergo co-design workshops with end-users..." },
  { id: "a11", code: "8.1.1", title_en: "System Readiness Testing Requirements", domain: "Service Quality", status: "Approved", author: "Khalid Al-Nuaimi", last_modified: "2025-03-25", created: "2025-01-10", content_preview: "Systems must undergo readiness testing before launch and after updates..." },
  { id: "a12", code: "8.5.1", title_en: "Alternative Service Delivery Paths", domain: "Proactive Services", status: "In Review", author: "Dr. Fatima Al-Hashimi", last_modified: "2025-04-08", created: "2025-02-20", content_preview: "Entities must define alternative delivery paths for service outages..." },
]

export const MOCK_VERSIONS: MockVersion[] = [
  { id: "v1", article_code: "2.4.1", article_title: "Complaint Registration and Acknowledgement", change_type: "Content Update", author: "Dr. Fatima Al-Hashimi", date: "2025-04-01", before: "Complaints must be acknowledged within 2 business days of receipt.", after: "Every complaint must be registered within 1 business day and acknowledged to the customer with a reference number." },
  { id: "v2", article_code: "1.1.1", article_title: "WCAG 2.1 AA Compliance", change_type: "Requirement Added", author: "Ahmad Al-Mansouri", date: "2025-03-15", before: "Digital services must meet WCAG 2.1 Level AA standards.", after: "Digital services must meet WCAG 2.1 Level AA standards. Entities must conduct quarterly accessibility audits and publish compliance reports." },
  { id: "v3", article_code: "5.2.1", article_title: "Data Classification and Protection", change_type: "New Article", author: "Khalid Al-Nuaimi", date: "2025-04-05", before: "(New article — no previous version)", after: "Personal data must be classified according to sensitivity levels and protected with appropriate technical and organizational measures." },
  { id: "v4", article_code: "3.1.1", article_title: "Life Event Service Bundles", change_type: "Structural Change", author: "Omar Al-Shamsi", date: "2025-02-28", before: "Services may be grouped by life events.", after: "Services shall be bundled around key life events. Each bundle must include a single entry point, unified status tracking, and proactive notifications." },
  { id: "v5", article_code: "4.1.1", article_title: "Cross-Channel Service Parity", change_type: "Content Update", author: "Ahmad Al-Mansouri", date: "2025-03-20", before: "Services should be available across multiple channels.", after: "All services available on one channel must be accessible across all channels with consistent functionality and information." },
  { id: "v6", article_code: "8.1.1", article_title: "System Readiness Testing", change_type: "Requirement Added", author: "Khalid Al-Nuaimi", date: "2025-03-25", before: "Systems should be tested before launch.", after: "Systems must undergo readiness testing before launch and after major updates. Test results must be documented and signed off." },
  { id: "v7", article_code: "6.1.1", article_title: "Service Excellence Culture", change_type: "Correction", author: "Sara Al-Ketbi", date: "2025-02-20", before: "Entities should foster service excellence.", after: "Entities shall foster a culture of outstanding service through leadership commitment, employee empowerment, and recognition programs." },
  { id: "v8", article_code: "7.1.1", article_title: "Co-Design and Beta Testing", change_type: "New Article", author: "Omar Al-Shamsi", date: "2025-04-12", before: "(New article — no previous version)", after: "New services must undergo co-design workshops with representative end-users before development begins." },
  { id: "v9", article_code: "2.4.2", article_title: "Complaint Escalation", change_type: "Content Update", author: "Sara Al-Ketbi", date: "2025-04-10", before: "Complaints may be escalated to senior management.", after: "Unresolved complaints must be escalated through defined pathways with clear timelines and accountability." },
  { id: "v10", article_code: "8.5.1", article_title: "Alternative Delivery Paths", change_type: "Content Update", author: "Dr. Fatima Al-Hashimi", date: "2025-04-08", before: "Entities should have backup plans for outages.", after: "Entities must define alternative delivery paths for service outages, including manual fallback procedures and customer communication protocols." },
]

export const MOCK_AI_REVIEWS: MockAIReview[] = [
  { id: "r1", query: "Can I bribe a government official to speed up my application?", response_preview: "I cannot assist with that. Bribery is illegal under UAE law...", flag_reason: "Sensitive topic — potential legal concern", status: "Resolved", date: "2025-04-10", user_satisfaction: "none", retrieved_articles: [] },
  { id: "r2", query: "What is the deadline for complaint resolution?", response_preview: "According to Article 2.4.1, complaints must be acknowledged within 1 business day...", flag_reason: "Cited outdated article version", status: "Open", date: "2025-04-12", user_satisfaction: "negative", retrieved_articles: ["2.4.1", "2.4.2"] },
  { id: "r3", query: "How do I access services if I have a disability?", response_preview: "The Emirates Code mandates WCAG 2.1 AA compliance for all digital services...", flag_reason: "Incomplete accessibility guidance", status: "Open", date: "2025-04-11", user_satisfaction: "positive", retrieved_articles: ["1.1.1", "1.1.2", "1.1.3"] },
  { id: "r4", query: "Who is responsible for data breaches?", response_preview: "According to Articles 5.2.1 and 5.4.1, government entities must implement...", flag_reason: "Legal liability question — needs review", status: "Open", date: "2025-04-13", user_satisfaction: "positive", retrieved_articles: ["5.2.1", "5.4.1", "5.3.1"] },
  { id: "r5", query: "Tell me a joke about government services", response_preview: "I'm focused on helping you understand the Emirates Code...", flag_reason: "Off-topic query handling", status: "Dismissed", date: "2025-04-09", user_satisfaction: "none", retrieved_articles: [] },
  { id: "r6", query: "What happens if an entity doesn't comply?", response_preview: "Non-compliance with the Emirates Code may result in...", flag_reason: "Response discusses enforcement — verify accuracy", status: "Open", date: "2025-04-14", user_satisfaction: "negative", retrieved_articles: ["2.5.1", "6.3.1"] },
  { id: "r7", query: "Compare UAE services to Singapore government", response_preview: "While I can provide information about the Emirates Code, I'm not able to provide...", flag_reason: "Comparative question — potential diplomatic sensitivity", status: "Dismissed", date: "2025-04-08", user_satisfaction: "none", retrieved_articles: [] },
  { id: "r8", query: "How long should I wait at a service center?", response_preview: "The Emirates Code sets standards for service efficiency. Article 1.4.1...", flag_reason: "Response could set unrealistic expectations", status: "Open", date: "2025-04-15", user_satisfaction: "positive", retrieved_articles: ["1.4.1", "1.4.2", "1.4.3"] },
]

function generateDailyUsage(): Array<{ date: string; views: number; ai_queries: number }> {
  const data: Array<{ date: string; views: number; ai_queries: number }> = []
  const base = new Date("2025-03-17")
  for (let i = 0; i < 30; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    const dayOfWeek = d.getDay()
    const isWeekend = dayOfWeek === 5 || dayOfWeek === 6 // Friday/Saturday in UAE
    const viewBase = isWeekend ? 250 : 450
    const aiBase = isWeekend ? 50 : 85
    data.push({
      date: d.toISOString().split("T")[0],
      views: viewBase + Math.floor(Math.random() * 150),
      ai_queries: aiBase + Math.floor(Math.random() * 40),
    })
  }
  return data
}

function generateAISatisfaction(): Array<{ date: string; positive: number; negative: number }> {
  const data: Array<{ date: string; positive: number; negative: number }> = []
  const base = new Date("2025-03-17")
  for (let i = 0; i < 30; i++) {
    const d = new Date(base)
    d.setDate(d.getDate() + i)
    data.push({
      date: d.toISOString().split("T")[0],
      positive: 15 + Math.floor(Math.random() * 20),
      negative: 2 + Math.floor(Math.random() * 8),
    })
  }
  return data
}

export const MOCK_ANALYTICS: MockAnalytics = {
  kpis: {
    page_views: 12847,
    page_views_trend: 12.3,
    ai_interactions: 2341,
    ai_interactions_trend: 24.7,
    unique_users: 1203,
    unique_users_trend: 8.1,
    avg_session: "3m 42s",
    avg_session_trend: -2.4,
  },
  daily_usage: generateDailyUsage(),
  domain_access: [
    { domain: "Service Accessibility", count: 1842 },
    { domain: "Service Efficiency", count: 1654 },
    { domain: "Digital Services", count: 1521 },
    { domain: "Customer Experience", count: 1387 },
    { domain: "Complaints Handling", count: 1245 },
    { domain: "Channel Consistency", count: 1102 },
    { domain: "Security & Systems", count: 986 },
    { domain: "Service Quality", count: 873 },
    { domain: "Humanized Services", count: 764 },
    { domain: "Data & Integration", count: 651 },
    { domain: "Service Culture", count: 542 },
    { domain: "Proactive Services", count: 438 },
    { domain: "Participatory Design", count: 356 },
    { domain: "Communication", count: 287 },
  ],
  top_searches: [
    { query: "accessibility requirements", count: 342, results: 12 },
    { query: "complaint handling", count: 289, results: 8 },
    { query: "WCAG 2.1", count: 234, results: 5 },
    { query: "data privacy", count: 198, results: 7 },
    { query: "digital service standards", count: 176, results: 15 },
    { query: "UAE Pass", count: 154, results: 4 },
    { query: "customer journey", count: 143, results: 9 },
    { query: "service center", count: 128, results: 11 },
    { query: "complaint resolution time", count: 112, results: 3 },
    { query: "channel consistency", count: 97, results: 6 },
  ],
  zero_result_searches: [
    { query: "visa renewal", count: 45 },
    { query: "parking fine", count: 38 },
    { query: "residency permit", count: 32 },
    { query: "health insurance", count: 28 },
    { query: "school registration", count: 21 },
  ],
  ai_satisfaction: generateAISatisfaction(),
  flagged_topics: [
    { topic: "Complaint handling timelines", count: 23, severity: "high" },
    { topic: "Data privacy obligations", count: 18, severity: "high" },
    { topic: "Enforcement mechanisms", count: 15, severity: "medium" },
    { topic: "Cross-entity coordination", count: 12, severity: "medium" },
    { topic: "Accessibility exemptions", count: 9, severity: "low" },
  ],
}
