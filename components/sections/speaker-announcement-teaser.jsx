"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FadeInUp from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";
import SpeakerBackground from "@/components/speakers/speaker-background";
import { ArrowRight, Sparkles } from "lucide-react";

/**
 * SpeakerAnnouncementTeaser — Homepage Teaser
 * ──────────────────────────────────────────
 * An immersive portal on the homepage announcing that speakers 
 * are currently being decrypted.
 */
export default function SpeakerAnnouncementTeaser() {
  return (
    <section className="relative py-32 overflow-hidden bg-black/40">
      
      {/* ── Background: Localized Ethereal Void ── */}
      <div className="absolute inset-0 z-0">
          <SpeakerBackground />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper via-transparent to-navy-deeper" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* ── Left Content ── */}
          <div className="flex-1 text-center lg:text-left">
            <FadeInUp>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] text-gold font-black uppercase tracking-[0.4em] mb-8">
                <Sparkles size={12} />
                Signal Manifesting
              </div>
              <h2 className="text-5xl md:text-7xl font-heading font-black text-white leading-[0.9] uppercase tracking-tighter mb-8 shadow-gold/20 drop-shadow-2xl">
                The <span className="gold-gradient-text">Assembly</span> <br />
                Manifesto
              </h2>
              <p className="text-white-dim text-lg md:text-xl font-light italic leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
                A gathering of the industry&apos;s most influential figures is being finalized. 
                Individual dossiers are currently undergoing decryption.
              </p>
              
              <Link
                href="/speakers"
                className="group relative inline-flex items-center gap-4 text-xs font-black uppercase tracking-[0.4em] text-gold/80 hover:text-gold transition-colors"
              >
                Access_Redacted_Database
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ArrowRight size={18} />
                </motion.span>
              </Link>
            </FadeInUp>
          </div>

          {/* ── Right Content: Glitching Silhouettes ── */}
          <div className="flex-1 w-full max-w-lg">
            <FadeInUp delay={0.2}>
              <div className="relative grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <CyberModule key={i} className={`aspect-square !p-0 bg-navy-card/40 border-white/5 overflow-hidden transition-all duration-700 hover:border-gold/30 hover:scale-[1.02] ${i % 2 === 0 ? 'mt-8' : ''}`}>
                    <div className="absolute inset-0 flex items-center justify-center opacity-20 filter blur-sm">
                       <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 fill-white" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                       </svg>
                    </div>
                    {/* Glitch Overlay */}
                    <motion.div 
                       className="absolute inset-0 bg-gold/10 opacity-0 group-hover:opacity-100"
                       animate={{ opacity: [0, 0.2, 0], scaleY: [1, 1.3, 1] }}
                       transition={{ duration: 0.3, repeat: Infinity, repeatDelay: Math.random() * 5 }}
                    />
                    <div className="absolute bottom-4 left-4">
                       <div className="h-1 w-8 bg-gold/30 rounded-full overflow-hidden">
                          <motion.div 
                             className="h-full bg-gold"
                             animate={{ x: ["-100%", "100%"] }}
                             transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                          />
                       </div>
                    </div>
                  </CyberModule>
                ))}
                
                {/* Floating HUD Annotations */}
                <div className="absolute -top-10 -right-10 w-24 h-24 border border-gold/10 rounded-full animate-spin-slow pointer-events-none opacity-20" />
                <div className="absolute -bottom-10 -left-10 w-32 h-32 border border-gold/10 rounded-full animate-pulse pointer-events-none opacity-20" />
              </div>
            </FadeInUp>
          </div>

        </div>
      </div>
    </section>
  );
}
