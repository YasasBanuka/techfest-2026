"use client";

import { MapPin, Mail, MessageCircle, Terminal, Radio, Share2, Database } from "lucide-react";
import ContactForm from "@/components/contact/contact-form";
import FAQAccordion from "@/components/contact/faq-accordion";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import SpeakerBackground from "@/components/speakers/speaker-background";
import CyberModule from "@/components/ui/cyber-module";

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Event_Location",
    label: "Venue Location",
    lines: ["TBA", "SRI LANKA"],
    ref: "LOC_0x01",
  },
  {
    icon: Mail,
    title: "Support_Channels",
    label: "Official Email",
    lines: ["info@techfest2026.lk", "sponsors@techfest2026.lk"],
    link: "mailto:info@techfest2026.lk",
    ref: "MAIL_0x02",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp_Updates",
    label: "Real-time Signals",
    lines: ["JOIN FOR REAL-TIME UPDATES", "AND EXCLUSIVE ANNOUNCEMENTS"],
    link: "https://whatsapp.com/channel/placeholder",
    linkLabel: "Join the Channel →",
    ref: "COMM_0x03",
  },
];

/**
 * ContactPage — 'The Signal Hub'
 * ──────────────────────────────
 * Immersive but clear communication center.
 */
export default function ContactPage() {
  return (
    <main className="relative min-h-screen bg-navy-deeper overflow-hidden">
      
      {/* ── Layer 1: Ethereal Background ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-gold/40">
        <div className="absolute top-40 left-10 rotate-90 origin-left">
          COMM_LINK_ACTIVE: [0x4A_STABLE]
        </div>
        <div className="absolute bottom-40 right-10 -rotate-90 origin-right">
          SUPPORT_STATUS: [ONLINE]
        </div>
      </div>

      <div className="relative z-20">
        
        {/* ── Custom Header ── */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <FadeInUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <p className="text-gold text-xs uppercase tracking-[0.5em] font-black">
                    Support Center
                  </p>
                </div>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                  Contact <span className="gold-gradient-text">Us</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                  Establishing secure multi-channel support. Reach out for sponsorships, speaker proposals, 
                  or general questions. Every message is processed with priority.
                </p>
              </FadeInUp>
            </div>

            {/* Dashboard Status HUD */}
            <FadeInUp delay={0.2} className="hidden md:block">
              <div className="flex items-center gap-8 border border-white/5 bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md">
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Protocol</span>
                    <div className="flex items-center gap-2">
                       <Radio size={14} className="text-gold shadow-[0_0_10px_rgba(255,179,0,0.5)]" />
                       <span className="text-lg font-heading font-black text-white uppercase italic tracking-tighter">Active</span>
                    </div>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Link_Ready</span>
                    <span className="text-xl font-heading font-black text-gold uppercase tracking-tighter italic">ONLINE</span>
                 </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── Contact Nodes HUD Grid ── */}
        <section className="pb-16 px-6">
          <div className="max-w-6xl mx-auto">
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {CONTACT_CARDS.map((card) => {
                const Icon = card.icon;
                return (
                  <StaggerItem key={card.title}>
                    <CyberModule className="bg-white/[0.02] border-white/5 py-8 px-8 group hover:border-gold/30 transition-all duration-700 h-full flex flex-col">
                      <div className="flex items-center justify-between mb-8">
                         <div className="flex flex-col">
                            <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest mb-1">{card.ref}</span>
                            <span className="text-[10px] font-mono text-gold uppercase tracking-[0.3em] font-black">{card.title}</span>
                         </div>
                         <Icon size={16} className="text-white/20 group-hover:text-gold transition-colors duration-700 group-hover:scale-110" />
                      </div>
                      
                      <div className="flex-1">
                         <p className="text-xs text-white/40 uppercase tracking-widest mb-3 font-mono">{card.label}</p>
                         <div className="space-y-1">
                           {card.lines.map((line) => (
                             <p key={line} className="text-white font-heading font-bold text-sm tracking-wide uppercase italic">
                               {line}
                             </p>
                           ))}
                         </div>
                      </div>

                      {card.link && (
                        <a
                          href={card.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-8 flex items-center gap-3 text-[10px] font-mono text-gold/60 uppercase tracking-[0.4em] hover:text-gold transition-all group/link"
                        >
                          <span className="w-4 h-px bg-gold/20 group-hover/link:w-8 transition-all" />
                          {card.linkLabel || "Connect"}
                        </a>
                      )}
                    </CyberModule>
                  </StaggerItem>
                );
              })}
            </StaggerContainer>
          </div>
        </section>

        {/* ── Form + FAQ (The Signal Portal) ── */}
        <section className="py-20 px-6 pb-32">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-16">
            
            {/* The Form */}
            <div className="lg:col-span-3">
               <ContactForm />
            </div>

            {/* Questions (FAQ) */}
            <div className="lg:col-span-2">
               <FadeInUp>
                  <div className="flex items-center gap-3 mb-8">
                     <Database size={16} className="text-gold/40" />
                     <h3 className="text-xl font-heading font-black text-white uppercase tracking-tighter">
                        Frequently Asked <span className="gold-gradient-text italic">Questions</span>
                     </h3>
                  </div>
               </FadeInUp>
               <FAQAccordion />

               {/* Manual Support HUD */}
               <FadeInUp delay={0.3} className="mt-12 p-6 border border-white/5 bg-white/[0.01] rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 group">
                  <div>
                     <p className="text-white font-heading font-bold uppercase tracking-tight text-sm mb-1">Still Hidden?</p>
                     <p className="text-white/30 text-[10px] font-mono uppercase tracking-widest leading-relaxed">If protocol remains unclear, use the manual signal.</p>
                  </div>
                  <a href="#" className="shrink-0 px-6 py-2 border border-gold/40 text-gold text-[9px] font-mono uppercase tracking-[0.4em] hover:bg-gold/10 transition-all rounded-sm">
                     Support_Log
                  </a>
               </FadeInUp>
            </div>
          </div>
        </section>

        <CTA />
      </div>
    </main>
  );
}
