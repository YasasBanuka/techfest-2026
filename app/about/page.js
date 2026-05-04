"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Radio, Shield, Users, Zap, Search } from "lucide-react";
import StoryTimeline from "@/components/about/story-timeline";
import CoreValues from "@/components/about/core-values";
import TeamSection from "@/components/team/team-section";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { MISSION, VISION } from "@/data/about";
import SpeakerBackground from "@/components/speakers/speaker-background";
import CyberModule from "@/components/ui/cyber-module";

const COMMUNITIES = [
  {
    name: "IEEE TechVerse Sri Lanka",
    role: "Organizing Committee",
    logo: "/images/logos/techverse.png",
    caption:
      "Flagship initiative of the Student Activities Committee of IEEE Sri Lanka Section, dedicated to enlightening and empowering young tech enthusiasts across the nation.",
    href: "#",
    ref: "NODE_01",
  },
  {
    name: "SLSAC",
    role: "Co-Organizing Partner",
    logo: "/images/logos/slsac.png",
    caption:
      "Empowering student engineers to lead and innovate beyond the classroom. Connecting academia, industry, and global tech communities. Turning bold ideas into real-world impact.",
    href: "#",
    ref: "NODE_02",
  },
];

/**
 * AboutPage — 'The Manifestation Ritual'
 * ──────────────────────────────────────
 * Immersive cinematic journey into TechFest's identity.
 */
export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-navy-deeper">
      
      {/* ── Layer 1: Ethereal Background ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[8px] uppercase tracking-[0.4em] text-gold/40 hidden xl:block">
        <div className="absolute top-60 left-10 rotate-90 origin-left">
          ORIGIN_PROTOCOL: [0x7A_MANIFEST]
        </div>
        <div className="absolute bottom-60 right-10 -rotate-90 origin-right">
          IDENTITY_INTEGRITY: [SECURE]
        </div>
      </div>

      <div className="relative z-20">
        
        {/* ── 1. Conceptual Origin (Header) ── */}
        <section className="pt-40 pb-20 px-6">
           <div className="max-w-6xl mx-auto">
              <FadeInUp>
                 <div className="flex items-center gap-3 mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                    <p className="text-gold text-[10px] uppercase tracking-[0.5em] font-black">
                       System Genesis
                    </p>
                 </div>
                  <h1 className="text-5xl sm:text-7xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[1.1] mt-6 mb-10 pr-4">
                     Our <span className="gold-gradient-text block sm:inline">Identity</span>
                  </h1>
                 <div className="max-w-2xl">
                    <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                       TechFest Sri Lanka isn't just an event; it's a platform for the next generation of technology leaders to manifest their ideas into reality.
                    </p>
                 </div>
              </FadeInUp>
           </div>
        </section>

        {/* ── 2. Dual-Core Manifestation (Mission & Vision) ── */}
        <section className="py-20 md:py-32 px-6">
           <div className="max-w-6xl mx-auto">
              <div className="flex flex-col md:flex-row gap-12">
                 {/* Mission: The Spark */}
                 <FadeInUp className="flex-1">
                    <CyberModule className="group h-full bg-white/[0.01] border-white/5 p-10 hover:border-gold/30 transition-all duration-700">
                       <div className="flex items-center justify-between mb-10">
                          <div className="flex flex-col gap-1">
                             <span className="text-[8px] font-mono text-gold/40 uppercase tracking-widest leading-none">Protocol_ID: 0xM1</span>
                             <h2 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter">The <span className="gold-gradient-text">Mission</span></h2>
                          </div>
                          <Zap size={20} className="text-white/20 group-hover:text-gold transition-colors duration-700" />
                       </div>
                       <p className="text-white font-heading text-lg leading-relaxed italic border-l border-white/10 pl-6 group-hover:border-gold/30 transition-all duration-700">
                          &ldquo;{MISSION}&rdquo;
                       </p>
                    </CyberModule>
                 </FadeInUp>

                 {/* Vision: The Void */}
                 <FadeInUp delay={0.2} className="flex-1">
                    <CyberModule className="group h-full bg-white/[0.01] border-white/5 p-10 hover:border-white/20 transition-all duration-700">
                       <div className="flex items-center justify-between mb-10">
                          <div className="flex flex-col gap-1">
                             <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest leading-none">Protocol_ID: 0xV1</span>
                             <h2 className="text-2xl font-heading font-black text-white uppercase italic tracking-tighter">The <span className="text-white/40">Vision</span></h2>
                          </div>
                          <Radio size={20} className="text-white/20 group-hover:text-white transition-colors duration-700" />
                       </div>
                       <p className="text-white-dim font-heading text-lg leading-relaxed italic border-l border-white/10 pl-6 group-hover:border-white/30 transition-all duration-700">
                          &ldquo;{VISION}&rdquo;
                       </p>
                    </CyberModule>
                 </FadeInUp>
              </div>
           </div>
        </section>

        {/* ── 3. Fundamental Protocols (Core Values) ── */}
        <section className="py-20 md:py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <FadeInUp className="mb-16">
               <div className="flex items-center gap-3 mb-4">
                  <Shield size={14} className="text-gold/60" />
                  <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.4em]">Core_Guiding_Principles</p>
               </div>
               <h3 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[1.1] italic pr-4">
                  Fundamental <span className="gold-gradient-text italic block sm:inline">Protocols</span>
               </h3>
            </FadeInUp>
            <CoreValues />
          </div>
        </section>

        {/* ── 4. Temporal Descent (Story Timeline) ── */}
        <StoryTimeline />

        {/* ── 5. Participating Nodes (Organizers) ── */}
        <section className="py-20 md:py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <FadeInUp className="mb-20">
               <div className="flex items-center gap-3 mb-4">
                  <Users size={14} className="text-gold/60" />
                  <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.4em]">The_Movement_Architects</p>
               </div>
               <h3 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[1.1] italic pr-4">
                  Strategic <span className="gold-gradient-text italic block sm:inline">Alliance</span>
               </h3>
               <p className="text-white-dim text-lg font-light leading-relaxed italic mt-4 max-w-2xl border-l border-white/10 pl-6">
                  Two premier student organizations united by a shared belief in Sri Lanka's tech future.
               </p>
            </FadeInUp>

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-32">
              {COMMUNITIES.map((community) => (
                <StaggerItem key={community.name}>
                  <CyberModule className="bg-white/[0.01] border-white/5 p-12 transition-all duration-700 hover:border-gold/30 group">
                    <div className="flex flex-col items-center text-center">
                      <div className="relative w-48 h-28 mb-10 opacity-100 md:opacity-60 group-hover:opacity-100 transition-opacity duration-700">
                        <Image
                          src={community.logo}
                          alt={`${community.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="flex items-center gap-2 mb-2 opacity-20">
                         <span className="text-[8px] font-mono text-white tracking-widest">{community.ref}</span>
                      </div>
                      <h3 className="text-white font-heading font-black text-2xl uppercase tracking-tighter mb-4 italic group-hover:gold-gradient-text transition-all duration-700">
                        {community.name}
                      </h3>
                      <div className="inline-block px-3 py-0.5 bg-gold/10 border border-gold/20 rounded-sm mb-6">
                        <span className="text-gold text-[8px] font-mono uppercase tracking-widest font-black">{community.role}</span>
                      </div>
                      <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                        {community.caption}
                      </p>
                    </div>
                  </CyberModule>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <div className="mt-32">
               <FadeInUp className="mb-16">
                  <div className="flex items-center gap-3 mb-4">
                     <Users size={14} className="text-gold/60" />
                     <p className="text-white/40 text-[9px] font-mono uppercase tracking-[0.4em]">The_Masterminds</p>
                  </div>
                  <h3 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter leading-[1.1] italic pr-4">
                     Organizing <span className="gold-gradient-text italic block sm:inline">Committee</span>
                  </h3>
               </FadeInUp>
               <TeamSection />
            </div>
          </div>
        </section>

        {/* ── 6. CTA ── */}
        <CTA />
      </div>
    </main>
  );
}
