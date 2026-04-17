import { Info, AlertTriangle, CheckCircle2, Megaphone, Terminal } from 'lucide-react'
import CyberModule from '@/components/ui/cyber-module'

const getAlertStyles = (type) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'bg-orange-500/[0.02]',
        border: 'border-orange-500/20',
        accent: 'bg-orange-500/10',
        text: 'text-orange-400',
        icon: AlertTriangle
      }
    case 'success':
      return {
        bg: 'bg-emerald-500/[0.02]',
        border: 'border-emerald-500/20',
        accent: 'bg-emerald-500/10',
        text: 'text-emerald-400',
        icon: CheckCircle2
      }
    case 'error':
      return {
        bg: 'bg-red-500/[0.02]',
        border: 'border-red-500/20',
        accent: 'bg-red-500/10',
        text: 'text-red-400',
        icon: Info
      }
    default:
      return {
        bg: 'bg-white/[0.01]',
        border: 'border-white/5',
        accent: 'bg-white/5',
        text: 'text-gold',
        icon: Megaphone
      }
  }
}

export default function AnnouncementList({ announcements = [] }) {
  if (announcements.length === 0) {
    return (
      <CyberModule className="bg-white/[0.01] border-white/5 p-10 text-center">
        <Terminal className="w-10 h-10 text-white/10 mx-auto mb-4" />
        <p className="text-white/30 text-xs font-mono uppercase tracking-[0.3em]">No incoming signals detected.</p>
      </CyberModule>
    )
  }

  return (
    <div className="space-y-6">
      {announcements.map((announcement) => {
        const styles = getAlertStyles(announcement.type)
        const Icon = styles.icon

        return (
          <CyberModule 
            key={announcement.id}
            className={`${styles.bg} ${styles.border} p-6 flex gap-6 group hover:border-white/20 transition-all duration-500`}
          >
            <div className={`w-12 h-12 rounded-xl ${styles.accent} border border-white/5 flex items-center justify-center ${styles.text} shrink-0 group-hover:scale-110 transition-transform duration-700`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2 gap-4">
                <h4 className={`${styles.text} font-heading font-bold text-lg uppercase italic tracking-tight truncate`}>
                  {announcement.title}
                </h4>
                <span className="text-white/20 text-[8px] font-mono uppercase tracking-widest shrink-0 mt-1">
                   [{new Date(announcement.created_at).toLocaleDateString()}]
                </span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed italic border-l border-white/5 pl-6 group-hover:border-white/10 transition-all duration-500">
                {announcement.content}
              </p>
            </div>
          </CyberModule>
        )
      })}
    </div>
  )
}
