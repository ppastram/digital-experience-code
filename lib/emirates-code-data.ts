import rulesData from "@/data/emirates_code_rules.json"

export interface UIRule {
  id: string
  category: string
  category_ar: string
  categoryIcon: string
  title_en: string
  title_ar: string
  text_en: string
  text_ar: string
  severity: string
  keywords: string[]
  pillar_en: string
  requirements: { text_en: string }[]
}

export interface UICategory {
  name: string
  name_ar: string
  icon: string
  count: number
}

const CATEGORY_MAP: Record<string, { ui: string; ui_ar: string; icon: string }> = {
  // Pillar 1 — Simpler, Easier, Faster Experience
  "Accessibility Standards":                          { ui: "Service Accessibility", ui_ar: "إمكانية الوصول للخدمات", icon: "🚪" },
  "Channel Effectiveness in Low Connectivity Environments": { ui: "Service Accessibility", ui_ar: "إمكانية الوصول للخدمات", icon: "🚪" },
  "Form Quality and Validation Features":             { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Simplifying Customer Journey and Information Requests": { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Clarity of Fees, Payment, and Receipts":           { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Payment Flexibility":                              { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Instant Digital Support within Service Channel":   { ui: "Digital Services", ui_ar: "الخدمات الرقمية", icon: "📱" },
  "Language Consistency in User Journey":             { ui: "Digital Services", ui_ar: "الخدمات الرقمية", icon: "📱" },
  "Content Consistency and National Design System":   { ui: "Digital Services", ui_ar: "الخدمات الرقمية", icon: "📱" },
  "Digital Literacy and Help Content":                { ui: "Communication", ui_ar: "التواصل", icon: "💬" },

  // Pillar 2 — Customer First
  "Satisfaction Measurement and Action Taking":       { ui: "Customer Experience", ui_ar: "تجربة المتعامل", icon: "🌟" },
  "Customer Segmentation":                            { ui: "Customer Experience", ui_ar: "تجربة المتعامل", icon: "🌟" },
  "Feedback Collection Mechanisms":                   { ui: "Customer Experience", ui_ar: "تجربة المتعامل", icon: "🌟" },
  "Complaint Handling and Resolution":                { ui: "Complaints Handling", ui_ar: "معالجة الشكاوى", icon: "📝" },
  "Service Performance Monitoring":                   { ui: "Service Quality", ui_ar: "جودة الخدمة", icon: "✅" },

  // Pillar 3 — Humanizing Services
  "Life Event Service Bundles":                       { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },
  "Proactive Service Delivery":                       { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },
  "Customized Notifications and Alerts":              { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },
  "Displaying Guidelines based on Customer Segmentation": { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },
  "Managing Customer Consent for Customization":      { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },
  "Unified Customer Profile":                         { ui: "Humanized Services", ui_ar: "أنسنة الخدمات", icon: "🤝" },

  // Pillar 4 — Experience Consistency Across Channels
  "Service Channel Consistency":                      { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Continuity when Switching Between Channels":       { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Universal Access Across All Channels":             { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Request Status and Notifications Across All Channels": { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Support Channels Interconnectivity":               { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Integration of In-Person Services and Appointment System": { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },
  "Unified Transaction Number and Data Matching":     { ui: "Channel Consistency", ui_ar: "اتساق القنوات", icon: "🔄" },

  // Pillar 5 — Flexible and Secure Digital Systems
  "Identity and Access":                              { ui: "Security & Systems", ui_ar: "الأمن والأنظمة", icon: "🔒" },
  "Data Management and Privacy":                      { ui: "Security & Systems", ui_ar: "الأمن والأنظمة", icon: "🔒" },
  "Data Transparency and Consents":                   { ui: "Security & Systems", ui_ar: "الأمن والأنظمة", icon: "🔒" },
  "Information Security and Fraud Protection":        { ui: "Security & Systems", ui_ar: "الأمن والأنظمة", icon: "🔒" },
  "Secure and Reliable Payment Channels":             { ui: "Security & Systems", ui_ar: "الأمن والأنظمة", icon: "🔒" },
  "Data Accuracy and Validity":                       { ui: "Data & Integration", ui_ar: "البيانات والتكامل", icon: "🗄️" },
  "Data Registries and Sharing":                      { ui: "Data & Integration", ui_ar: "البيانات والتكامل", icon: "🗄️" },
  "Integration Between Systems and Data":             { ui: "Data & Integration", ui_ar: "البيانات والتكامل", icon: "🗄️" },
  "Auto-Adaptive Interfaces and Forms":               { ui: "Data & Integration", ui_ar: "البيانات والتكامل", icon: "🗄️" },

  // Pillar 6 — Culture of Outstanding Service
  "Culture of Outstanding Service":                   { ui: "Service Culture", ui_ar: "ثقافة الخدمة", icon: "🏆" },
  "Training and Certifications":                      { ui: "Service Culture", ui_ar: "ثقافة الخدمة", icon: "🏆" },
  "Performance Evaluation and Professional Guidance": { ui: "Service Culture", ui_ar: "ثقافة الخدمة", icon: "🏆" },
  "Complaint Receipt and Escalation":                 { ui: "Complaints Handling", ui_ar: "معالجة الشكاوى", icon: "📝" },

  // Pillar 7 — Participatory Design
  "Co-Design and Beta Testing":                       { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "Customer Councils / Public Consultations":         { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "Continuous Engagement":                            { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "Measuring and Monitoring Customer Engagement":     { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "Monitoring the Voice of the Community":            { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "Inclusivity of Participation":                     { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },
  "You Engage, We Develop":                           { ui: "Participatory Design", ui_ar: "التصميم التشاركي", icon: "🎨" },

  // Pillar 8 — Service and Systems Efficiency
  "Systems Readiness Tests":                          { ui: "Service Quality", ui_ar: "جودة الخدمة", icon: "✅" },
  "Communication During Service Outages":             { ui: "Communication", ui_ar: "التواصل", icon: "💬" },
  "Security Incidents and Notifications":             { ui: "Communication", ui_ar: "التواصل", icon: "💬" },
  "Alternative Paths":                                { ui: "Proactive Services", ui_ar: "الخدمات الاستباقية", icon: "🔮" },
  "Data Recovery":                                    { ui: "Proactive Services", ui_ar: "الخدمات الاستباقية", icon: "🔮" },
  "Business Continuity for In-Person Services":       { ui: "Proactive Services", ui_ar: "الخدمات الاستباقية", icon: "🔮" },
  "Service Continuity in Case of Supplier Service Outages": { ui: "Proactive Services", ui_ar: "الخدمات الاستباقية", icon: "🔮" },
  "Collaboration Between Entities":                   { ui: "Proactive Services", ui_ar: "الخدمات الاستباقية", icon: "🔮" },
  "Service Directory and Guidelines":                 { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Access to Information and Guidelines":             { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Access to Tools and Transactions":                 { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
  "Auditable Records Accessible to Customers":        { ui: "Service Efficiency", ui_ar: "كفاءة الخدمة", icon: "⚡" },
}

function getFirstSentence(text: string): string {
  const match = text.match(/^[^.!?]+[.!?]/)
  return match ? match[0].trim() : text.substring(0, 100)
}

function mapCategory(categoryEn: string): { ui: string; ui_ar: string; icon: string } {
  return CATEGORY_MAP[categoryEn] || { ui: "Service Quality", ui_ar: "جودة الخدمة", icon: "✅" }
}

// Normalize rules from both schemas (pillars 1-2 vs 3-8 use different field names)
interface RawRule {
  code?: string
  code_number?: string
  pillar_id?: number
  pillar_number?: number
  pillar_name_en: string
  category_en?: string
  category_name_en?: string
  description_en: string
  description_ar: string
  impact_level: string
  keywords_en: string[]
  requirements: Array<{ text_en?: string; requirement_en?: string }>
}

function normalizeRule(rule: RawRule) {
  return {
    code: rule.code || rule.code_number || "",
    pillar_name_en: rule.pillar_name_en,
    category_en: rule.category_en || rule.category_name_en || "",
    description_en: rule.description_en,
    description_ar: rule.description_ar,
    impact_level: rule.impact_level,
    keywords_en: rule.keywords_en || [],
    requirements: (rule.requirements || []).map((r) => ({
      text_en: r.text_en || r.requirement_en || "",
    })),
  }
}

let cachedRules: UIRule[] | null = null

export function getRules(): UIRule[] {
  if (cachedRules) return cachedRules

  const rules: UIRule[] = (rulesData.rules as RawRule[]).map((raw) => {
    const rule = normalizeRule(raw)
    const mapped = mapCategory(rule.category_en)
    return {
      id: rule.code,
      category: mapped.ui,
      category_ar: mapped.ui_ar,
      categoryIcon: mapped.icon,
      title_en: getFirstSentence(rule.description_en),
      title_ar: getFirstSentence(rule.description_ar),
      text_en: rule.description_en,
      text_ar: rule.description_ar,
      severity: rule.impact_level,
      keywords: rule.keywords_en,
      pillar_en: rule.pillar_name_en,
      requirements: rule.requirements,
    }
  })

  cachedRules = rules
  return rules
}

export function getCategories(): UICategory[] {
  const rules = getRules()
  const counts = new Map<string, { name_ar: string; icon: string; count: number }>()

  for (const rule of rules) {
    const existing = counts.get(rule.category)
    if (existing) {
      existing.count++
    } else {
      counts.set(rule.category, { name_ar: rule.category_ar, icon: rule.categoryIcon, count: 1 })
    }
  }

  return Array.from(counts.entries()).map(([name, { name_ar, icon, count }]) => ({
    name,
    name_ar,
    icon,
    count,
  }))
}

export function getRulesForChatbot(): string {
  const rules = getRules()
  return rules
    .map(
      (r) =>
        `Article ${r.id} [${r.severity}] (${r.category}):\n${r.text_en}\nRequirements: ${r.requirements.map((req) => req.text_en).join("; ")}\nKeywords: ${r.keywords.join(", ")}`
    )
    .join("\n\n")
}
