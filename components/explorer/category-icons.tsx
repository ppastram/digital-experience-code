import {
  DoorOpen,
  Gauge,
  Smartphone,
  MessageSquare,
  Star,
  ClipboardList,
  BadgeCheck,
  HeartHandshake,
  ArrowLeftRight,
  ShieldCheck,
  Database,
  Award,
  PenTool,
  Lightbulb,
  type LucideIcon,
} from "lucide-react"

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  "Service Accessibility": DoorOpen,
  "Service Efficiency": Gauge,
  "Digital Services": Smartphone,
  "Communication": MessageSquare,
  "Customer Experience": Star,
  "Complaints Handling": ClipboardList,
  "Service Quality": BadgeCheck,
  "Humanized Services": HeartHandshake,
  "Channel Consistency": ArrowLeftRight,
  "Security & Systems": ShieldCheck,
  "Data & Integration": Database,
  "Service Culture": Award,
  "Participatory Design": PenTool,
  "Proactive Services": Lightbulb,
}

export function CategoryIcon({
  category,
  size = 20,
  className,
}: {
  category: string
  size?: number
  className?: string
}) {
  const Icon = CATEGORY_ICON_MAP[category] || BadgeCheck
  return <Icon size={size} className={className} />
}
