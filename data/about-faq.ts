export interface FaqItem {
  id: string
  question_en: string
  question_ar: string
  answer_en: string
  answer_ar: string
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "what-is-code",
    question_en: "What is the Emirates Code for Government Services?",
    question_ar: "ما هو ميثاق الإمارات للخدمات الحكومية؟",
    answer_en: "The Emirates Code is a comprehensive framework of 357 articles across 8 pillars that defines the standards, requirements, and best practices for government service delivery in the UAE. It covers everything from accessibility and digital services to complaint handling and data privacy.",
    answer_ar: "ميثاق الإمارات هو إطار شامل يتضمن 357 مادة عبر 8 ركائز يحدد المعايير والمتطلبات وأفضل الممارسات لتقديم الخدمات الحكومية في الإمارات.",
  },
  {
    id: "who-is-it-for",
    question_en: "Who is the Emirates Code designed for?",
    question_ar: "لمن صُمم ميثاق الإمارات؟",
    answer_en: "The Code serves multiple audiences: government entity leaders who set service strategy, service designers who build and improve services, compliance specialists who monitor adherence, front-line staff who deliver services, and citizens and residents who use them.",
    answer_ar: "يخدم الميثاق جماهير متعددة: قادة الجهات الحكومية الذين يضعون استراتيجية الخدمة، ومصممي الخدمات، وأخصائيي الامتثال، وموظفي الخط الأمامي، والمواطنين والمقيمين.",
  },
  {
    id: "pillars",
    question_en: "What are the 8 pillars of the Emirates Code?",
    question_ar: "ما هي الركائز الثماني لميثاق الإمارات؟",
    answer_en: "The 8 pillars are: (1) Simpler, Easier, Faster Experience; (2) Customer First; (3) Humanizing Services; (4) Experience Consistency Across Channels; (5) Flexible and Secure Digital Systems; (6) Culture of Outstanding Service; (7) Participatory Design; (8) Service and Systems Efficiency.",
    answer_ar: "الركائز الثماني هي: (1) تجربة أبسط وأسهل وأسرع؛ (2) المتعامل أولاً؛ (3) أنسنة الخدمات؛ (4) اتساق التجربة عبر القنوات؛ (5) أنظمة رقمية مرنة وآمنة؛ (6) ثقافة الخدمة المتميزة؛ (7) التصميم التشاركي؛ (8) كفاءة الخدمة والأنظمة.",
  },
  {
    id: "how-to-use",
    question_en: "How do I use this platform?",
    question_ar: "كيف أستخدم هذه المنصة؟",
    answer_en: "Use the Explorer to browse all 357 articles by category or search for specific topics. Use 'Ask the Code' to have an AI-powered conversation about any aspect of the Code. The Glossary explains key terms, and the Admin Console provides content management and analytics.",
    answer_ar: "استخدم المستكشف لتصفح جميع المواد الـ 357 حسب الفئة أو البحث عن مواضيع محددة. استخدم 'اسأل الميثاق' لإجراء محادثة مدعومة بالذكاء الاصطناعي. يشرح المصطلحات المصطلحات الرئيسية.",
  },
  {
    id: "ai-accuracy",
    question_en: "How accurate is the AI assistant?",
    question_ar: "ما مدى دقة المساعد الذكي؟",
    answer_en: "The AI assistant is trained on the full Emirates Code and cites specific articles in its responses. While it provides helpful guidance, responses should always be verified against the official Code text. The AI is a research tool, not a legal authority.",
    answer_ar: "المساعد الذكي مدرب على ميثاق الإمارات الكامل ويستشهد بمواد محددة في إجاباته. على الرغم من أنه يقدم إرشادات مفيدة، يجب دائماً التحقق من الإجابات مقابل النص الرسمي للميثاق.",
  },
  {
    id: "languages",
    question_en: "Is the platform available in Arabic?",
    question_ar: "هل المنصة متاحة باللغة العربية؟",
    answer_en: "Yes. The entire platform supports both English and Arabic, including right-to-left (RTL) layout. Toggle the language using the globe icon in the top navigation bar. All Code articles are available in both languages.",
    answer_ar: "نعم. تدعم المنصة بالكامل اللغتين العربية والإنجليزية، بما في ذلك تخطيط من اليمين إلى اليسار. قم بتبديل اللغة باستخدام أيقونة الكرة الأرضية في شريط التنقل العلوي.",
  },
  {
    id: "compliance",
    question_en: "How is compliance monitored?",
    question_ar: "كيف تتم مراقبة الامتثال؟",
    answer_en: "The Emirates Code provides a framework for self-assessment and external auditing. Government entities are expected to regularly evaluate their services against the Code's requirements, track KPIs, and address any gaps identified through customer feedback or formal audits.",
    answer_ar: "يوفر ميثاق الإمارات إطاراً للتقييم الذاتي والتدقيق الخارجي. يُتوقع من الجهات الحكومية تقييم خدماتها بانتظام مقابل متطلبات الميثاق.",
  },
  {
    id: "updates",
    question_en: "How often is the Code updated?",
    question_ar: "كم مرة يتم تحديث الميثاق؟",
    answer_en: "The Emirates Code is a living document that evolves with changing service delivery standards and customer expectations. Major updates are coordinated by the Ministry of Cabinet Affairs, with ongoing refinements informed by stakeholder feedback and emerging best practices.",
    answer_ar: "ميثاق الإمارات هو وثيقة حية تتطور مع تغير معايير تقديم الخدمات وتوقعات المتعاملين.",
  },
  {
    id: "reporting",
    question_en: "Can I report a service that doesn't comply with the Code?",
    question_ar: "هل يمكنني الإبلاغ عن خدمة لا تمتثل للميثاق؟",
    answer_en: "The Emirates Code establishes formal feedback and complaint handling mechanisms. Citizens can submit feedback through official government channels. The compliance monitoring system tracks reported issues and ensures appropriate follow-up by the responsible entity.",
    answer_ar: "يحدد ميثاق الإمارات آليات رسمية للتعليقات ومعالجة الشكاوى. يمكن للمواطنين تقديم ملاحظاتهم من خلال القنوات الحكومية الرسمية.",
  },
  {
    id: "scope",
    question_en: "Does the Code apply to all government entities?",
    question_ar: "هل ينطبق الميثاق على جميع الجهات الحكومية؟",
    answer_en: "The Emirates Code applies to all UAE federal government entities that deliver services to citizens, residents, and businesses. It establishes a unified standard of excellence that all entities are expected to meet, while allowing flexibility in implementation approaches.",
    answer_ar: "ينطبق ميثاق الإمارات على جميع الجهات الحكومية الاتحادية في الإمارات التي تقدم خدمات للمواطنين والمقيمين والشركات.",
  },
]
