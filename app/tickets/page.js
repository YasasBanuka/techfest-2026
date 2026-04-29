import TicketCard from "@/components/tickets/ticket-card";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { TICKET_TIERS, PERKS, REGISTRATION_DEADLINE, EVENT_DATE, TIERS_REVEALED } from "@/data/tickets";
import SpeakerBackground from "@/components/speakers/speaker-background";
import CyberModule from "@/components/ui/cyber-module";
import { Activity, Clock, Users, Zap, Award, Globe, Shield, Terminal } from "lucide-react";

export const metadata = {
  title: "Access Protocols | TechFest Sri Lanka 2026",
  description:
    "Secure your integration tier for TechFest Sri Lanka 2026. Review access protocols and register your intent for the upcoming manifestation.",
};

const PERK_ICONS = [Award, Terminal, Zap, Users, Globe, Shield];

export default function TicketsPage() {
  return (
    <main className="relative min-h-screen bg-navy-deeper overflow-hidden">
      
      {/* ── Layer 1: Ethereal Atmosphere ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-gold/40 hidden md:block">
        <div className="absolute top-40 left-10 rotate-90 origin-left">
          ENTRY_ACCESS: [0x4A_INIT]
        </div>
        <div className="absolute bottom-40 right-10 -rotate-90 origin-right">
          INTEGRITY_INDEX: [VERIFIED]
        </div>
      </div>

      <div className="relative z-20">
        
        {/* ── 1. The Entry Protocol (Header) ── */}
        <section className="pt-40 pb-20 px-6">
           <div className="max-w-6xl mx-auto">
              <FadeInUp>
                 <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">
                       Temporal Gate: Open
                    </p>
                 </div>
                 <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-10 pr-4">
                    Access <span className="gold-gradient-text">Protocols</span>
                 </h1>
                 <div className="max-w-2xl">
                    <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                       Secure your place within the manifestation of TechFest Sri Lanka 2026. Choose your integration depth and register your intent for the upcoming release.
                    </p>
                 </div>
              </FadeInUp>
           </div>
        </section>

        {/* ── 2. Status HUD Readout ── */}
        <section className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <CyberModule className="bg-white/[0.01] border-white/5 py-8 px-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-white/5">
                <div className="flex flex-col items-center md:items-start md:px-6">
                   <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">Manifestation_Date</p>
                   <div className="flex items-center gap-2 text-white font-heading font-black text-sm uppercase italic tracking-widest">
                      <Clock size={12} className="text-gold/40" />
                      {EVENT_DATE}
                   </div>
                </div>
                <div className="flex flex-col items-center md:items-start md:px-6 pt-6 md:pt-0">
                   <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">Sync_Deadline</p>
                   <div className="flex items-center gap-2 text-white font-heading font-black text-sm uppercase italic tracking-widest">
                      <Terminal size={12} className="text-gold/40" />
                      {REGISTRATION_DEADLINE}
                   </div>
                </div>
                <div className="flex flex-col items-center md:items-start md:px-6 pt-6 md:pt-0">
                   <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">Availability_Index</p>
                   <div className="flex items-center gap-2 text-gold font-heading font-black text-sm uppercase italic tracking-widest">
                      <Activity size={12} className="text-gold" />
                      84% REMAINING
                   </div>
                </div>
                <div className="flex flex-col items-center md:items-start md:px-6 pt-6 md:pt-0">
                   <p className="text-[8px] font-mono text-white/30 uppercase tracking-[0.4em] mb-2">Total_Capacity</p>
                   <div className="flex items-center gap-2 text-white font-heading font-black text-sm uppercase italic tracking-widest">
                      <Users size={12} className="text-gold/40" />
                      1500+ ATTENDEES
                   </div>
                </div>
              </div>
            </CyberModule>
          </div>
        </section>

        {/* ── 3. Access Tiers ── */}
        <section className="py-20 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeInUp className="mb-20">
               <div className="flex items-center gap-3 mb-4">
                  <Shield size={14} className="text-gold/60" />
                  <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.4em]">Integration_Depth_Select</p>
               </div>
               <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter italic pr-4">
                  Integration <span className="gold-gradient-text italic">Points</span>
               </h2>
            </FadeInUp>

            {TIERS_REVEALED ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TICKET_TIERS.map((tier, i) => (
                  <TicketCard key={tier.id} tier={tier} index={i} />
                ))}
              </div>
            ) : (
              <CyberModule className="bg-white/[0.02] border-white/5 p-12 md:p-24 text-center flex flex-col items-center">
                 <div className="w-20 h-20 rounded-full bg-gold/5 border border-gold/10 flex items-center justify-center text-gold/40 mb-8 animate-pulse">
                    <Shield size={40} />
                 </div>
                 <h3 className="text-2xl md:text-4xl font-heading font-black text-white uppercase italic tracking-tighter mb-4">
                    Access Protocols <span className="gold-gradient-text">Encrypted</span>
                 </h3>
                 <p className="text-white/40 text-lg italic max-w-xl mx-auto leading-relaxed">
                    The integration tiers for TechFest 2026 are currently being finalized. Decrypted protocols will be released on this channel soon.
                 </p>
              </CyberModule>
            )}
          </div>
        </section>

        {/* ── 4. Integration Perks ── */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeInUp className="mb-16">
               <div className="flex items-center gap-3 mb-4">
                  <Activity size={14} className="text-gold/60" />
                  <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.4em]">Ecosystem_Manifestations</p>
               </div>
               <h2 className="text-3xl md:text-5xl font-heading font-black text-white uppercase tracking-tighter italic">
                  Ecosystem <span className="text-white/40 italic">Advantage</span>
               </h2>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {PERKS.map((perk, i) => {
                const Icon = PERK_ICONS[i] || Zap;
                return (
                  <StaggerItem key={perk.title}>
                    <CyberModule className="bg-white/[0.01] border-white/5 p-8 group hover:border-gold/30 transition-all duration-700 h-full">
                       <div className="flex items-center gap-5 mb-6">
                          <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30 group-hover:text-gold transition-colors duration-700">
                             <Icon size={24} />
                          </div>
                          <div>
                             <p className="text-[7px] font-mono text-white/10 uppercase tracking-[0.4em] mb-1 leading-none">Record_ID: 0xP{i+1}</p>
                             <h4 className="text-white font-heading font-bold text-base uppercase italic tracking-tighter">{perk.title}</h4>
                          </div>
                       </div>
                       <p className="text-white/50 text-[13px] leading-relaxed italic border-l border-white/5 pl-5 group-hover:border-gold/20 transition-all duration-700">
                          {perk.desc}
                       </p>
                    </CyberModule>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>


        <CTA />
      </div>
    </main>
  );
}
