import SpeakerGrid from "@/components/speakers/speaker-grid";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import SpeakerProposalNudge from "@/components/sections/speaker-proposal-nudge";
import SpeakerBackground from "@/components/speakers/speaker-background";
import { IS_REVEALED } from "@/data/speakers";
import { motion } from "framer-motion";

export const metadata = {
  title: "Speakers | TechFest Sri Lanka 2026",
  description:
    "Meet the expert speakers at TechFest Sri Lanka 2026 — industry leaders delivering keynotes, workshops, panels, and lightning talks on November 07, 2026.",
};

export default function SpeakersPage() {
  return (
    <main className="relative min-h-screen bg-navy-deeper overflow-hidden">
      
      {/* ── Layer 1: Ethereal Background ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-gold/40">
        <div className="absolute top-40 left-10 rotate-90 origin-left">
          SESSION_MONITOR: [0x7B_ACTIVE]
        </div>
        <div className="absolute bottom-40 right-10 -rotate-90 origin-right">
          ASSEMBLY_STATUS: {IS_REVEALED ? "[VERIFIED]" : "[ENCRYPTED]"}
        </div>
        <div className="absolute top-1/2 left-6 -translate-y-1/2 flex flex-col gap-8">
           <div className="h-32 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
           <div className="h-32 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
        </div>
      </div>

      {/* ── Content Wrapper ── */}
      <div className="relative z-20">
        
        {/* ── Minimalist Header ── */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <FadeInUp>
                <p className="text-gold text-xs uppercase tracking-[0.5em] mb-4 font-black">
                  {IS_REVEALED ? "Speaker Archive" : "Identity Redaction"}
                </p>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                  The <span className="gold-gradient-text">Assembly</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                  {IS_REVEALED 
                    ? "Meet the industry leaders and visionaries crafting the next chapter of innovation at TechFest 2026."
                    : "The decrypted dossiers of our speakers will be revealed soon. The assembly is currently being finalized."
                  }
                </p>
              </FadeInUp>
            </div>

            {/* HUD Speaker Count */}
            <FadeInUp delay={0.2}>
              <div className="flex flex-col items-center md:items-end gap-2 border-l-2 md:border-l-0 md:border-r-2 border-gold/20 pr-6 pl-6 md:pl-0">
                <span className="text-[10px] uppercase tracking-widest text-white/40">Registered_Profiles</span>
                <span className="text-6xl font-heading font-black text-gold leading-none">
                  {IS_REVEALED ? "10" : "REDACTED"}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/20">Archival_Entry: TF26</span>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── Speakers Grid ── */}
        <section className="py-12 px-6 pb-32">
          <div className="max-w-6xl mx-auto">
            <SpeakerGrid />
          </div>
        </section>

        <SpeakerProposalNudge />
        <CTA />
      </div>
    </main>
  );
}
