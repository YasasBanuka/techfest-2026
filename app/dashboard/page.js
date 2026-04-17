import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { User, Mail, GraduationCap, Phone, CheckCircle2, AlertCircle, ArrowRight, FileText, Megaphone, ShieldCheck, Database, Terminal } from 'lucide-react'
import Link from 'next/link'
import AnnouncementList from '@/components/dashboard/announcement-list'
import CyberModule from '@/components/ui/cyber-module'
import { StaggerContainer, StaggerItem } from '@/components/ui/fade-in-up'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  // Check if profile is complete
  const isProfileComplete = profile?.phone && profile?.university && profile?.year_of_study

  // Fetch announcements
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <StaggerContainer className="space-y-12 pb-20">
      
      {/* ── Welcome Manifestation ── */}
      <StaggerItem>
        <CyberModule className="relative overflow-hidden bg-white/[0.01] border-white/5 p-10 md:p-14 group">
          {/* Ethereal Glow Behind Title */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/[0.03] blur-[120px] -mr-64 -mt-64 group-hover:bg-gold/[0.05] transition-all duration-1000" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6 opacity-40">
               <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
               <p className="text-[10px] font-mono text-white mt-0.5 uppercase tracking-[0.4em]">Auth_Sequence: Verified</p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-heading font-black text-white italic uppercase tracking-tighter mb-6 leading-none">
              Welcome back, <br />
              <span className="gold-gradient-text drop-shadow-[0_0_30px_rgba(255,179,0,0.1)]">
                {profile?.full_name?.split(' ')[0] || 'Innovator'}
              </span>
            </h1>
            
            <div className="max-w-2xl border-l-2 border-gold/10 pl-8">
               <p className="text-white/60 text-lg font-light leading-relaxed italic mb-8">
                  Your entry into the TechFest 2026 ecosystem has been confirmed. Navigate through your dossiers, manifest your CV shards, and track your integration progress below.
               </p>
               <div className="flex items-center gap-8 opacity-20">
                  <div className="flex items-center gap-2">
                     <ShieldCheck size={14} className="text-white" />
                     <span className="text-[9px] font-mono text-white uppercase tracking-widest">Integrity: 100%</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Database size={14} className="text-white" />
                     <span className="text-[9px] font-mono text-white uppercase tracking-widest">Records: Processed</span>
                  </div>
               </div>
            </div>
          </div>
        </CyberModule>
      </StaggerItem>

      {/* ── Status Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* CV Clinic Card */}
        <StaggerItem className="h-full">
          <Link href="/dashboard/cv-clinic" className="group block h-full">
            <CyberModule className="h-full bg-white/[0.01] border-white/5 p-8 group-hover:border-gold/30 transition-all duration-700">
              <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 rounded-2xl bg-gold/5 border border-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-700">
                  <FileText size={28} />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                   <span className="text-[8px] font-mono text-gold uppercase tracking-[0.3em]">Navigate_Shard</span>
                   <ArrowRight size={16} className="text-gold" />
                </div>
              </div>
              
              <h3 className="text-white font-heading font-black text-2xl uppercase italic tracking-tighter mb-2">CV <span className="gold-gradient-text">Clinic</span></h3>
              <p className="text-gold text-[10px] uppercase tracking-[0.4em] font-black mb-6 opacity-60">Memory_Structure_Optimization</p>
              
              <p className="text-white/60 text-sm leading-relaxed mb-8 italic border-l border-white/5 pl-6 group-hover:border-gold/20 transition-all duration-700">
                Submit your career dossier for a peer-to-peer technical review. Our architects will help you optimize your professional manifestation.
              </p>
              
              <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-gold/5 border border-gold/10">
                <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                <span className="text-[9px] font-mono text-gold uppercase tracking-widest font-black">Shard_Capture_Active</span>
              </div>
            </CyberModule>
          </Link>
        </StaggerItem>

        {/* Announcements Card */}
        <StaggerItem className="h-full">
          <CyberModule className="h-full bg-white/[0.01] border-white/5 p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                  <Megaphone size={22} />
                </div>
                <div className="flex flex-col">
                   <h3 className="text-white font-heading font-black text-xl uppercase tracking-tighter italic">Latest <span className="text-white/40">Signals</span></h3>
                   <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.3em]">Network_Announcements</span>
                </div>
              </div>
              <Link href="/dashboard" className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/30 hover:text-gold hover:border-gold/40 transition-all">
                <ArrowRight size={14} />
              </Link>
            </div>
            
            <AnnouncementList announcements={announcements || []} />
          </CyberModule>
        </StaggerItem>
      </div>

      {/* ── Profile Completion Alert ── */}
      {!isProfileComplete && (
        <StaggerItem>
          <CyberModule className="bg-red-500/[0.02] border-red-500/20 p-8 flex flex-col md:flex-row items-center gap-8 group">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 group-hover:scale-110 transition-transform duration-700">
              <AlertCircle size={32} />
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                 <span className="text-[9px] font-mono text-red-500/40 uppercase tracking-[0.3em]">Alert_Signal: Urgent</span>
                 <h4 className="text-red-400 font-heading font-black text-xl uppercase italic">Dossier Incomplete</h4>
              </div>
              <p className="text-white/50 text-sm italic max-w-xl">
                 Significant data fragments are missing from your identity record. Complete your profile to manifest the full festival experience.
              </p>
            </div>
            <Link 
              href="/dashboard/settings"
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-[10px] font-mono font-black uppercase tracking-[0.4em] px-8 py-4 rounded-xl transition-all border border-red-500/20 hover:border-red-500/40"
            >
              Update_Record
            </Link>
          </CyberModule>
        </StaggerItem>
      )}

      {/* ── Profile Details (The Identity Dossier) ── */}
      <StaggerItem>
        <CyberModule className="bg-white/[0.01] border-white/5 overflow-hidden">
          <div className="p-8 md:p-10 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-6">
               <div className="w-14 h-14 rounded-2xl bg-navy-surface border border-white/5 flex items-center justify-center text-gold/60">
                  <Terminal size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-heading font-black text-white italic uppercase tracking-tighter leading-none mb-1">Your Identity</h2>
                 <p className="text-white/20 text-[9px] font-mono uppercase tracking-[0.4em]">Archival_Record_0x24F1</p>
               </div>
            </div>
            <ShieldCheck size={28} className="text-gold/20" />
          </div>
          
          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                  <User size={18} />
                </div>
                <div>
                  <p className="text-white/20 text-[8px] font-mono uppercase tracking-[0.4em] font-black mb-2 leading-none">Identity_Name</p>
                  <p className="text-white font-heading font-bold text-lg uppercase tracking-tight italic">{profile?.full_name}</p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-white/20 text-[8px] font-mono uppercase tracking-[0.4em] font-black mb-2 leading-none">Signal_Address</p>
                  <p className="text-white/80 font-mono text-sm tracking-widest">{profile?.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-10">
              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-white/20 text-[8px] font-mono uppercase tracking-[0.4em] font-black mb-2 leading-none">Comm_Link</p>
                  <p className="text-white font-heading font-bold text-lg uppercase tracking-tight italic">
                    {profile?.phone || <span className="text-white/10">--- --- ---</span>}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-white/20 group-hover:text-gold transition-colors duration-500">
                  <GraduationCap size={18} />
                </div>
                <div>
                  <p className="text-white/20 text-[8px] font-mono uppercase tracking-[0.4em] font-black mb-2 leading-none">Academy_Origin</p>
                  <p className="text-white/80 font-heading text-base uppercase italic leading-tight">
                    {profile?.university ? `${profile.university} (${profile.year_of_study})` : <span className="text-white/10 italic">Redacted</span>}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="px-10 py-8 bg-white/[0.01] border-t border-white/5 flex justify-end">
            <Link 
              href="/dashboard/settings"
              className="flex items-center gap-3 text-gold/60 font-mono font-black uppercase text-[10px] tracking-[0.3em] hover:text-gold hover:translate-x-1 transition-all group"
            >
              Modify_Identity_Shards 
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </CyberModule>
      </StaggerItem>
    </StaggerContainer>
  )
}
