import { Info, AlertTriangle, CheckCircle2, Megaphone } from 'lucide-react'

const getAlertStyles = (type) => {
  switch (type) {
    case 'warning':
      return {
        bg: 'bg-orange-500/10',
        border: 'border-orange-500/30',
        text: 'text-orange-400',
        icon: AlertTriangle
      }
    case 'success':
      return {
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        text: 'text-emerald-400',
        icon: CheckCircle2
      }
    case 'error':
      return {
        bg: 'bg-red-500/10',
        border: 'border-red-500/30',
        text: 'text-red-400',
        icon: Info
      }
    default:
      return {
        bg: 'bg-navy-surface border-navy-border',
        border: 'border-gold/20',
        text: 'text-gold',
        icon: Megaphone
      }
  }
}

export default function AnnouncementList({ announcements = [] }) {
  if (announcements.length === 0) {
    return (
      <div className="bg-navy-card/30 border border-navy-border rounded-2xl p-8 text-center">
        <Megaphone className="w-10 h-10 text-white-dim mx-auto mb-3 opacity-20" />
        <p className="text-white-muted text-sm">No new alerts at the moment.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {announcements.map((announcement) => {
        const styles = getAlertStyles(announcement.type)
        const Icon = styles.icon

        return (
          <div 
            key={announcement.id}
            className={`${styles.bg} border ${styles.border} p-5 rounded-2xl flex gap-4 animate-in slide-in-from-bottom-2 duration-500`}
          >
            <div className={`w-10 h-10 rounded-full ${styles.bg} border ${styles.border} flex items-center justify-center ${styles.text} shrink-0`}>
              <Icon size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1 gap-2">
                <h4 className={`${styles.text} font-bold truncate`}>{announcement.title}</h4>
                <span className="text-white-dim text-[10px] uppercase font-black shrink-0">
                  {new Date(announcement.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-white-muted text-sm leading-relaxed">
                {announcement.content}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
