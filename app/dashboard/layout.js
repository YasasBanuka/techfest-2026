import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, CreditCard, LogOut, User } from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/cv-clinic', label: 'CV Clinic', icon: FileText },
]

export default async function DashboardLayout({ children }) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  const name = profile?.full_name || user.email
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-navy-deeper">
      {/* ─── Sidebar (desktop) + Top bar (mobile) ─── */}
      <div className="flex flex-col md:flex-row min-h-screen pt-20">

        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-navy-border bg-navy-card/30 backdrop-blur-md px-4 py-8 gap-2 sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          {/* Avatar */}
          <div className="flex items-center gap-3 px-3 py-4 mb-4 border-b border-navy-border">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center text-navy-deeper font-heading font-black text-sm">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-white text-sm font-bold truncate">{name}</p>
              <p className="text-white-dim text-[10px] uppercase tracking-widest">Innovator</p>
            </div>
          </div>

          {/* Nav */}
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white-muted hover:text-gold hover:bg-gold/5 transition-all duration-200 text-sm font-medium group"
            >
              <Icon size={16} className="shrink-0 group-hover:text-gold transition-colors" />
              {label}
            </Link>
          ))}

          {/* Logout at bottom */}
          <div className="mt-auto pt-6 border-t border-navy-border">
            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="flex items-center gap-3 px-3 py-2.5 w-full rounded-xl text-white-dim hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 text-sm font-medium"
              >
                <LogOut size={16} className="shrink-0" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-navy-card/90 backdrop-blur-md border-t border-navy-border flex justify-around py-3 px-4">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-1 text-white-dim hover:text-gold transition-colors"
            >
              <Icon size={20} />
              <span className="text-[9px] uppercase tracking-widest">{label}</span>
            </Link>
          ))}
          <form action="/api/auth/signout" method="post">
            <button type="submit" className="flex flex-col items-center gap-1 text-white-dim hover:text-red-400 transition-colors">
              <LogOut size={20} />
              <span className="text-[9px] uppercase tracking-widest">Logout</span>
            </button>
          </form>
        </nav>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8 pb-28 md:pb-8 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  )
}
