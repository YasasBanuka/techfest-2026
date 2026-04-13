import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User, Mail, GraduationCap, Phone, CheckCircle2, AlertCircle, ArrowRight, FileText, Megaphone } from 'lucide-react'
import Link from 'next/link'
import AnnouncementList from '@/components/dashboard/announcement-list'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Check if profile is complete (basic check)
  const isProfileComplete = profile?.phone && profile?.university && profile?.year_of_study

  // Fetch announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* ── Welcome Header ── */}
      <div className="relative overflow-hidden bg-navy-card/50 border border-navy-border rounded-3xl p-8 md:p-10">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white italic uppercase tracking-tighter mb-3">
            Welcome back, <span className="gold-gradient-text">{profile?.full_name?.split(' ')[0] || 'Innovator'}!</span>
          </h1>
          <p className="text-white-muted text-sm max-w-xl leading-relaxed">
            Your TechFest 2026 hub. Track your ticket status, upload your CV for the clinic, and manage your speaker opportunities all in one place.
          </p>
        </div>
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold/5 blur-[100px] -mr-32 -mt-32" />
      </div>

      {/* ── Status Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* CV Clinic Card */}
        <Link href="/dashboard/cv-clinic" className="group">
          <div className="h-full bg-navy-card/30 border border-navy-border p-6 rounded-2xl hover:border-gold/40 hover:bg-gold/5 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <FileText size={24} />
              </div>
              <ArrowRight size={20} className="text-white-dim group-hover:text-gold group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="text-white font-heading font-bold text-lg mb-1">CV Clinic</h3>
            <p className="text-white-dim text-xs uppercase tracking-widest mb-4 font-medium">Free Review Service</p>
            <p className="text-white-muted text-sm leading-relaxed mb-4">
              Get your technical CV reviewed by industry experts for free. Perfect for students and career switchers.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-gold font-black uppercase tracking-widest bg-gold/10 w-fit px-3 py-1 rounded-full">
              <CheckCircle2 size={10} /> Active
            </div>
          </div>
        </Link>

        {/* Announcements Card */}
        <div className="h-full bg-navy-card/30 border border-navy-border p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-gold">
                <Megaphone size={20} />
              </div>
              <h3 className="text-white font-heading font-bold text-lg">Latest Alerts</h3>
            </div>
            <Link href="/dashboard" className="text-gold text-[10px] uppercase font-black tracking-widest hover:underline">
              View All
            </Link>
          </div>
          
          <AnnouncementList announcements={announcements || []} />
        </div>
      </div>

      {/* ── Profile Completion Alert ── */}
      {!isProfileComplete && (
        <div className="bg-orange-500/10 border border-orange-500/30 p-6 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
            <AlertCircle size={24} />
          </div>
          <div className="flex-1">
            <h4 className="text-orange-400 font-bold mb-1">Profile Incomplete</h4>
            <p className="text-white-muted text-sm">Please complete your profile details below to unlock all festival features and personalized recommendations.</p>
          </div>
          <button className="bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-xs font-black uppercase tracking-widest px-6 py-2.5 rounded-lg transition-all border border-orange-500/20">
            Quick Update
          </button>
        </div>
      )}

      {/* ── Profile Details ── */}
      <div className="bg-navy-card/30 border border-navy-border rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-navy-border flex items-center justify-between">
          <div>
            <h2 className="text-xl font-heading font-black text-white italic uppercase tracking-tight">Your Identity</h2>
            <p className="text-white-dim text-xs uppercase tracking-widest mt-1">Verified Information</p>
          </div>
          <User size={20} className="text-gold/60" />
        </div>
        
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-gold/60">
                <User size={18} />
              </div>
              <div>
                <p className="text-white-dim text-[10px] uppercase tracking-[0.2em] font-black mb-1">Full Name</p>
                <p className="text-white text-sm font-medium">{profile?.full_name}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-gold/60">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-white-dim text-[10px] uppercase tracking-[0.2em] font-black mb-1">Email Address</p>
                <p className="text-white text-sm font-medium">{profile?.email}</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-gold/60">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-white-dim text-[10px] uppercase tracking-[0.2em] font-black mb-1">Phone Number</p>
                <p className="text-white text-sm font-medium">{profile?.phone || <span className="text-white-dim italic">Not provided</span>}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-gold/60">
                <GraduationCap size={18} />
              </div>
              <div>
                <p className="text-white-dim text-[10px] uppercase tracking-[0.2em] font-black mb-1">University & Year</p>
                <p className="text-white text-sm font-medium">
                  {profile?.university ? `${profile.university} (${profile.year_of_study})` : <span className="text-white-dim italic">Not provided</span>}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 bg-navy-card/50 border-t border-navy-border flex justify-end">
          <Link 
            href="/dashboard/settings"
            className="flex items-center gap-2 text-gold font-heading font-black uppercase text-xs tracking-widest hover:translate-x-1 transition-all"
          >
            Update Profile <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  )
}
