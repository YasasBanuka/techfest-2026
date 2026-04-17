"use client";

import { Calendar, MapPin, Clock, ShieldCheck, Activity, Terminal } from "lucide-react";
import ScheduleTimeline from "@/components/agenda/schedule-timeline";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { AGENDA_DATE, VENUE } from "@/data/agenda";
import SpeakerBackground from "@/components/speakers/speaker-background";
import CyberModule from "@/components/ui/cyber-module";

export default function AgendaPage() {
  return (
    <main className="relative min-h-screen bg-navy-deeper overflow-hidden">
      
      {/* ── Layer 1: Ethereal Background ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-gold/40">
        <div className="absolute top-40 left-10 rotate-90 origin-left">
          CHRONOS_RETRIEVAL: [0x7B_SEQUENCE]
        </div>
        <div className="absolute bottom-40 right-10 -rotate-90 origin-right">
          TEMPORAL_CONSISTENCY: [STABLE]
        </div>
      </div>

      <div className="relative z-20">
        
        {/* ── Minimalist Header (Chronos Retrieval) ── */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <FadeInUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <p className="text-gold text-xs uppercase tracking-[0.5em] font-black">
                    Temporal Sequence
                  </p>
                </div>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                  The <span className="gold-gradient-text">Schedule</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                  Deciphering the temporal flow of TechFest 2026. A structured manifestation of keynotes, workshops, 
                  and innovation protocols organized by sequence and metadata.
                </p>
              </FadeInUp>
            </div>

            {/* Event Status Dashboard */}
            <FadeInUp delay={0.2} className="hidden md:block">
              <div className="flex items-center gap-8 border border-white/5 bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md">
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Global_Status</span>
                    <div className="flex items-center gap-2">
                       <ShieldCheck size={14} className="text-green-500/60" />
                       <span className="text-lg font-heading font-black text-white uppercase italic tracking-tighter">Verified</span>
                    </div>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Entry_Code</span>
                    <span className="text-xl font-heading font-black text-gold uppercase tracking-tighter">TF26_LOG</span>
                 </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── Event Info HUD Grid ── */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Calendar, label: "Sequence_Date", value: AGENDA_DATE, id: "01" },
                { icon: Clock, label: "Temporal_Range", value: "0900 - 1800 HRS", id: "02" },
                { icon: MapPin, label: "Node_Coordinates", value: VENUE, id: "03" },
              ].map(({ icon: Icon, label, value, id }) => (
                <StaggerItem key={label}>
                  <CyberModule className="bg-white/[0.02] border-white/5 py-4 px-6 group hover:border-gold/30 transition-all duration-700">
                    <div className="flex items-center justify-between mb-4 opacity-20">
                       <span className="text-[8px] font-mono tracking-widest">REF_{id}</span>
                       <Icon size={12} className="group-hover:text-gold transition-colors duration-700" />
                    </div>
                    <p className="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-white text-sm font-bold tracking-wide uppercase font-heading">{value}</p>
                  </CyberModule>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>

        {/* ── The Chronicle Stream (Timeline) ── */}
        <section className="py-20 px-6 pb-32">
          <div className="max-w-6xl mx-auto">
             <ScheduleTimeline />
          </div>
        </section>

        {/* ── Technical Disclaimer ── */}
        <section className="pb-20 px-6">
          <div className="max-w-3xl mx-auto">
            <FadeInUp>
              <div className="flex items-center gap-4 p-5 rounded-xl border border-white/5 bg-white/[0.01] backdrop-blur-sm">
                 <Terminal size={14} className="text-gold/40 shrink-0" />
                 <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em] leading-relaxed italic">
                    [NOTICE]: Temporal sequences are subject to realignment. Priority protocols maintained via the 
                    <a href="#" className="text-gold/60 hover:text-gold underline underline-offset-4 ml-1">COMM_CHANNEL</a>.
                 </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        <CTA />
      </div>
    </main>
  );
}
