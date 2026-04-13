import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { FileText, Upload, Clock, CheckCircle2, AlertCircle, FileDown, Trash2 } from 'lucide-react'
import Link from 'next/link'
import CVUploadArea from './cv-upload-area'

export default async function CVClinicPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  // Fetch existing submissions
  const { data: submissions, error } = await supabase
    .from('cv_submissions')
    .select('*')
    .eq('user_id', user.id)
    .order('submitted_at', { ascending: false })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* ── Header ── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-heading font-black text-white italic uppercase tracking-tighter mb-2">
            CV <span className="gold-gradient-text">Clinic</span>
          </h1>
          <p className="text-white-muted text-sm max-w-xl">
            Upload your resume and get professional feedback from industry leaders. Enhance your profile for TechFest 2026.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-navy-card/50 border border-navy-border px-5 py-3 rounded-2xl">
          <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <p className="text-white text-xs font-bold uppercase tracking-widest">Service Status</p>
            <p className="text-gold text-[10px] font-black uppercase tracking-[0.2em]">Open & Active</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left Column: Upload ── */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-navy-card/30 border border-navy-border rounded-3xl overflow-hidden backdrop-blur-sm">
            <div className="p-8 border-b border-navy-border">
              <h2 className="text-xl font-heading font-black text-white italic uppercase tracking-tight">New Submission</h2>
              <p className="text-white-dim text-[10px] uppercase tracking-widest mt-1">PDF or DOCX (Max 5MB)</p>
            </div>
            
            <div className="p-8">
              <CVUploadArea userId={user.id} />
            </div>
          </div>

          {/* Submission History */}
          <div className="bg-navy-card/30 border border-navy-border rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-navy-border">
              <h2 className="text-xl font-heading font-black text-white italic uppercase tracking-tight">Recent Submissions</h2>
            </div>
            
            <div className="divide-y divide-navy-border/50">
              {submissions && submissions.length > 0 ? (
                submissions.map((sub) => (
                  <div key={sub.id} className="p-6 flex items-center justify-between group hover:bg-gold/5 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-white-dim group-hover:text-gold transition-colors">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="text-white text-sm font-bold truncate max-w-[200px]">{sub.file_name}</p>
                        <p className="text-white-dim text-[10px] uppercase tracking-widest mt-0.5">
                          {new Date(sub.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Status Badge */}
                      <div className="hidden md:flex items-center gap-2">
                         <div className={`w-1.5 h-1.5 rounded-full ${
                           sub.status === 'completed' ? 'bg-green-400' : 
                           sub.status === 'pending' ? 'bg-gold animate-pulse' : 'bg-white-dim'
                         }`} />
                         <span className={`text-[10px] font-black uppercase tracking-widest ${
                           sub.status === 'completed' ? 'text-green-400' : 
                           sub.status === 'pending' ? 'text-gold' : 'text-white-dim'
                         }`}>
                           {sub.status}
                         </span>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                         <button className="w-8 h-8 rounded-lg bg-navy-surface border border-navy-border flex items-center justify-center text-white-dim hover:text-white hover:border-white transition-all">
                           <FileDown size={14} />
                         </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center text-white-dim">
                  <div className="w-16 h-16 rounded-full bg-navy-surface flex items-center justify-center mx-auto mb-4 border border-navy-border/50">
                    <Clock size={24} />
                  </div>
                  <p className="text-sm">No submissions found. Your medical check-up for your career starts here!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Right Column: Info/Requirements ── */}
        <div className="space-y-6">
           <div className="bg-gold/5 border border-gold/20 p-6 rounded-3xl space-y-4">
              <div className="flex items-center gap-3 text-gold">
                 <AlertCircle size={20} />
                 <h3 className="font-heading font-black uppercase tracking-widest text-sm italic">Pro Tips</h3>
              </div>
              <ul className="space-y-4">
                 {[
                   "Use a clean, single-column layout for ATS efficiency.",
                   "Quantify your achievements (e.g., 'Reduced load by 40%').",
                   "Highlight tech stacks used in specific projects.",
                   "Keep it to 2 pages maximum for best impact."
                 ].map((tip, i) => (
                   <li key={i} className="flex gap-3 text-xs text-white-muted leading-relaxed">
                      <span className="text-gold font-black italic">{i + 1}.</span>
                      {tip}
                   </li>
                 ))}
              </ul>
           </div>

           <div className="bg-navy-card/50 border border-navy-border p-8 rounded-3xl text-center space-y-4">
              <h4 className="text-white font-heading font-black uppercase text-sm tracking-tighter italic">Premium Review Portfolio</h4>
              <p className="text-white-dim text-xs leading-relaxed">
                Connect with mentors from companies like Google, AWS, and local tech giants.
              </p>
              <div className="pt-4 grid grid-cols-4 gap-2 opacity-40">
                {[1, 2, 3, 4].map(n => <div key={n} className="h-1 bg-white-muted rounded-full" />)}
              </div>
           </div>
        </div>
      </div>
    </div>
  )
}
