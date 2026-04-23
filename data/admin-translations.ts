import type { Language } from "@/lib/language-context"

const translations: Record<string, string> = {
  // Header
  "admin": "المشرف",
  "admin_console": "لوحة المشرف",

  // Sidebar
  "analytics": "التحليلات",
  "content": "المحتوى",
  "versions": "الإصدارات",
  "ai_review": "مراجعة الذكاء الاصطناعي",
  "settings": "الإعدادات",
  "analytics_and_management": "التحليلات والإدارة",
  "back_to_site": "العودة للموقع",

  // Analytics page
  "analytics_dashboard": "لوحة التحليلات",
  "platform_usage_metrics": "مقاييس استخدام المنصة والتفاعل",
  "total_page_views": "إجمالي مشاهدات الصفحة",
  "ai_interactions": "تفاعلات الذكاء الاصطناعي",
  "unique_users": "المستخدمون الفريدون",
  "avg_session": "متوسط الجلسة",
  "vs_last_month": "مقارنة بالشهر الماضي",

  // Analytics charts
  "usage_over_time": "الاستخدام عبر الزمن (٣٠ يوم)",
  "most_accessed_domains": "أكثر المجالات زيارة",
  "top_search_queries": "أبرز استعلامات البحث",
  "zero_result_searches": "عمليات بحث بدون نتائج",
  "ai_chat_satisfaction": "رضا محادثة الذكاء الاصطناعي (٣٠ يوم)",
  "most_flagged_topics": "أكثر المواضيع إبلاغاً",
  "query": "الاستعلام",
  "searches": "عمليات البحث",
  "results": "النتائج",
  "attempts": "المحاولات",
  "topic": "الموضوع",
  "flags": "الإبلاغات",
  "severity": "الخطورة",
  "page_views": "مشاهدات الصفحة",
  "ai_queries": "استعلامات الذكاء الاصطناعي",
  "views": "المشاهدات",
  "positive": "إيجابي",
  "negative": "سلبي",
  "content_gaps_hint": "تشير هذه الاستعلامات إلى فجوات في المحتوى. يُنصح بإضافة مقالات ذات صلة.",

  // Content page
  "content_management": "إدارة المحتوى",
  "total_articles": "إجمالي المقالات",
  "published": "منشور",
  "in_review": "قيد المراجعة",
  "drafts": "مسودات",

  // Content table
  "all_domains": "جميع المجالات",
  "all_statuses": "جميع الحالات",
  "article": "المقال",
  "domain": "المجال",
  "status": "الحالة",
  "author": "المؤلف",
  "modified": "آخر تعديل",

  // Article drawer
  "content_section": "المحتوى",
  "created": "تاريخ الإنشاء",
  "last_modified": "آخر تعديل",
  "workflow": "سير العمل",
  "drafted": "تمت صياغتها",
  "approved": "تمت الموافقة",
  "submit_for_review": "تقديم للمراجعة",
  "approve": "الموافقة",
  "publish": "نشر",
  "edit": "تعديل",
  "close": "إغلاق",

  // AI Review page
  "ai_review_queue": "قائمة مراجعة الذكاء الاصطناعي",
  "flagged_interactions_awaiting": "تفاعلات مُبلغ عنها بانتظار المراجعة",

  // AI Review table
  "all": "الكل",
  "open": "مفتوح",
  "resolved": "تم الحل",
  "dismissed": "مرفوض",
  "flag_reason": "سبب الإبلاغ",
  "date": "التاريخ",

  // AI Review detail
  "ai_interaction_review": "مراجعة تفاعل الذكاء الاصطناعي",
  "user_query": "استعلام المستخدم",
  "ai_response": "رد الذكاء الاصطناعي",
  "retrieved_articles": "المقالات المسترجعة",
  "article_id": "المقال",
  "user_satisfaction": "رضا المستخدم",
  "no_feedback": "لا توجد ملاحظات",
  "mark_resolved": "تحديد كمحلول",
  "dismiss": "رفض",
  "flag": "إبلاغ",

  // Versions page
  "version_history": "سجل الإصدارات",
  "track_all_changes": "تتبع جميع التغييرات على مقالات ميثاق الإمارات",

  // Status badges (content table)
  "status_draft": "مسودة",
  "status_in_review": "قيد المراجعة",
  "status_approved": "تمت الموافقة",
  "status_published": "منشور",

  // Status badges (AI review)
  "status_open": "مفتوح",
  "status_resolved": "تم الحل",
  "status_dismissed": "مرفوض",

  // Change type badges (version table)
  "change_content_update": "تحديث المحتوى",
  "change_new_article": "مقال جديد",
  "change_requirement_added": "إضافة متطلب",
  "change_structural_change": "تغيير هيكلي",
  "change_correction": "تصحيح",

  // Version table
  "change_type": "نوع التغيير",

  // Diff viewer
  "rollback": "استرجاع",
  "before": "قبل",
  "after": "بعد",
  "confirm_rollback": "تأكيد الاسترجاع",
  "rollback_description": "سيؤدي هذا إلى إعادة المقال {code} إلى نسخته السابقة. يمكن التراجع عن هذا الإجراء.",
  "cancel": "إلغاء",
  "by_author_on_date": "بواسطة",
  "on_date": "في",

  // Settings page
  "settings_title": "الإعدادات",
  "configure_platform": "إعداد سلوك المنصة والتفضيلات",

  // Settings form
  "general": "عام",
  "platform_name": "اسم المنصة",
  "default_language": "اللغة الافتراضية",
  "show_disclaimer_banner": "إظهار شريط إخلاء المسؤولية",
  "ai_configuration": "إعدادات الذكاء الاصطناعي",
  "ai_model": "نموذج الذكاء الاصطناعي",
  "enable_ai_chat": "تفعيل محادثة الذكاء الاصطناعي",
  "auto_flag_sensitive": "الإبلاغ التلقائي عن المواضيع الحساسة",
  "max_tokens": "الحد الأقصى للرموز لكل رد",
  "notifications": "الإشعارات",
  "email_notifications": "إشعارات البريد الإلكتروني",
  "notify_ai_flags": "الإشعار عند وجود إبلاغات جديدة",
  "weekly_digest": "ملخص التحليلات الأسبوعي",
  "access_control": "التحكم بالوصول",
  "admin_email": "بريد المشرف الإلكتروني",
  "require_auth": "طلب المصادقة",
  "english": "الإنجليزية",
  "arabic": "العربية",
  "save_changes": "حفظ التغييرات",
}

export function t(key: string, lang: Language): string {
  if (lang === "en") {
    // For English, convert key to title case (replace underscores with spaces)
    // This is a fallback; English strings are hardcoded in the components
    return key
  }
  return translations[key] ?? key
}
