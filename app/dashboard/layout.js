import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { LayoutDashboard, FileText, CreditCard, LogOut, User, Activity } from 'lucide-react'
import SpeakerBackground from '@/components/speakers/speaker-background'
import CyberModule from '@/components/ui/cyber-module'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, ref: '0x01' },
  { href: '/dashboard/cv-clinic', label: 'CV Clinic', icon: FileText, ref: '0x02' },
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

  const fullName = profile?.full_name || user.user_metadata?.full_name || user.email
  const firstName = fullName.includes('@') ? fullName.split('@')[0] : fullName.split(' ')[0]
  const role = user.user_metadata?.role || 'Innovator'

  const initials = (profile?.full_name || user.user_metadata?.full_name || firstName)
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="min-h-screen bg-navy-deeper relative overflow-hidden">
      
      {/* ── Layer 1: Ethereal Atmosphere ── */}
      <SpeakerBackground />

      <div className="relative z-20 flex flex-col min-h-screen">
        
        {/* ── Top Bar (Mobile + Desktop Branding) ── */}
        <div className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-white/5 bg-navy-deeper/40 backdrop-blur-md sticky top-0 z-50">
           <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center text-gold">
                 <Activity size={16} />
              </div>
              <div className="flex flex-col">
                 <span className="text-white font-heading font-black text-xs uppercase tracking-widest italic">TF26_Control</span>
                 <span className="text-[7px] font-mono text-white/30 uppercase tracking-[0.4em]">Integrated_Sync: Stable</span>
              </div>
           </div>
           
           <div className="hidden md:flex items-center gap-6">
              <div className="h-8 w-px bg-white/5" />
              <div className="flex items-center gap-3">
                 <div className="text-right">
                    <p className="text-white text-[10px] font-bold tracking-tight">{firstName}</p>
                    <p className="text-gold/60 text-[8px] font-mono uppercase tracking-widest">{role}</p>
                 </div>
                 <div className="w-8 h-8 rounded-full bg-navy-surface border border-gold/20 flex items-center justify-center text-[10px] font-black text-gold">
                    {initials}
                 </div>
              </div>
           </div>
        </div>

        <div className="flex flex-1 relative">
          
          {/* ── Sidebar (The HUD Rail) ── */}
          <aside className="hidden md:block w-72 shrink-0 p-6 sticky top-20 h-[calc(100vh-5rem)]">
             <CyberModule className="h-full flex flex-col bg-white/[0.01] border-white/5 p-6 border-r-0 rounded-r-none">
                
                {/* HUD Header */}
                <div className="mb-10 px-2">
                   <p className="text-[8px] font-mono text-white/20 uppercase tracking-[0.5em] mb-2">Systems_Index</p>
                   <div className="w-8 h-0.5 bg-gold/40" />
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                   {navItems.map(({ href, label, icon: Icon, ref }) => (
                     <Link
                       key={href}
                       href={href}
                       className="group flex items-center justify-between px-4 py-3 rounded-xl hover:bg-white/[0.02] border border-transparent hover:border-white/5 transition-all duration-300"
                     >
                        <div className="flex items-center gap-4">
                           <Icon size={16} className="text-white/40 group-hover:text-gold transition-colors duration-300" />
                           <span className="text-[11px] font-mono text-white/60 uppercase tracking-widest group-hover:text-white transition-colors">
                              {label}
                           </span>
                        </div>
                        <span className="text-[7px] font-mono text-white/10 group-hover:text-gold/40 transition-colors">
                           [{ref}]
                        </span>
                     </Link>
                   ))}
                </nav>

                {/* Logout Station */}
                <div className="mt-auto pt-6 border-t border-white/5">
                   <form action="/api/auth/signout" method="post">
                     <button
                       type="submit"
                       className="group flex items-center gap-4 w-full px-4 py-3 rounded-xl hover:bg-red-500/5 transition-all duration-300"
                     >
                       <LogOut size={16} className="text-white/20 group-hover:text-red-400 transition-colors" />
                       <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest group-hover:text-red-400 transition-colors">
                          Terminate
                       </span>
                     </button>
                   </form>
                </div>
             </CyberModule>
          </aside>

          {/* ── Mobile Bottom Nav ── */}
          <nav className="md:hidden fixed bottom-6 left-6 right-6 z-50">
             <CyberModule className="bg-navy-card/80 backdrop-blur-xl border-white/10 flex justify-around py-4 px-2 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                {navItems.map(({ href, label, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    className="flex flex-col items-center gap-1.5 px-4 text-white/40 hover:text-gold transition-colors"
                  >
                    <Icon size={20} />
                    <span className="text-[8px] font-mono uppercase tracking-[0.2em]">{label}</span>
                  </Link>
                ))}
                <form action="/api/auth/signout" method="post">
                   <button type="submit" className="flex flex-col items-center gap-1.5 px-4 text-white/20 hover:text-red-400 transition-colors">
                     <LogOut size={20} />
                     <span className="text-[8px] font-mono uppercase tracking-[0.2em]">Exit</span>
                   </button>
                </form>
             </CyberModule>
          </nav>

          {/* ── Main Workstation Stage ── */}
          <main className="flex-1 px-6 py-10 pb-32 md:pb-10 max-w-6xl w-full animate-in fade-in duration-1000">
             {/* HUD Top Annotation */}
             <div className="flex items-center gap-4 mb-10 opacity-20 pointer-events-none">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
                <span className="text-[7px] font-mono text-white uppercase tracking-[0.5em]">Terminal_Manifestation: Active</span>
                <div className="h-px w-20 bg-white/20" />
             </div>

             {children}
          </main>

        </div>
      </div>
    </div>
  )
}
