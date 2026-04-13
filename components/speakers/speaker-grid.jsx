"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPEAKERS, SPEAKER_TYPES, TYPE_LABELS, REVEAL_SPEAKERS } from "@/data/speakers";
import SpeakerCard from "@/components/speakers/speaker-card";
import SpeakerDetails from "@/components/speakers/speaker-details";
import FadeInUp from "@/components/ui/fade-in-up";

/**
 * SpeakerGrid
 * ────────────
 * Filter tabs (All / Keynote / Workshop / Panel / Lightning)
 * + staggered card grid with AnimatePresence on filter change.
 *
 * Featured speakers (keynotes) always show first via sort.
 */
export default function SpeakerGrid() {
  const [activeType, setActiveType] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const filtered = (
    activeType === "All"
      ? SPEAKERS
      : SPEAKERS.filter((s) => s.type === activeType)
  ).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div>
      {/* ── Filter tabs ── */}
      {REVEAL_SPEAKERS && (
        <FadeInUp className="flex flex-wrap gap-2 mb-10">
          {SPEAKER_TYPES.map((type) => {
            const isAll = type === "All";
            const meta = isAll ? null : TYPE_LABELS[type];
            return (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border capitalize ${
                  activeType === type
                    ? "bg-gold text-navy-deeper border-gold font-bold"
                    : "bg-navy-card border-navy-border text-white-muted hover:border-gold/30 hover:text-white"
                }`}
              >
                {isAll ? "All Speakers" : meta.label}
              </button>
            );
          })}
        </FadeInUp>
      )}

      {/* ── Card grid/Placeholder ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className={REVEAL_SPEAKERS 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "flex justify-center"
          }
        >
          {REVEAL_SPEAKERS ? (
            filtered.map((speaker, i) => (
              <motion.div
                key={speaker.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
                className="h-full"
              >
                <SpeakerCard
                  speaker={speaker}
                  onClick={() => setSelectedSpeaker(speaker)}
                />
              </motion.div>
            ))
          ) : (
            <div className="w-full py-20 px-10 relative overflow-hidden border border-gold/10 rounded-3xl bg-navy-card/30 backdrop-blur-sm">
                {/* Technical Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold/40 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold/40 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold/40 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold/40 rounded-br-3xl" />

                {/* Content */}
                <div className="text-center relative z-10">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-gold/5 border border-gold/20 text-gold text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-pulse">
                        Transmission Pending
                    </div>
                    <h3 className="text-4xl sm:text-6xl font-heading font-black text-white uppercase tracking-tighter mb-6">
                        Revealing Soon
                    </h3>
                    <p className="text-white-dim text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-medium">
                        The flagship lineup of industry visionaries and technical leaders is currently undergoing identity synthesis. 
                        Stay connected as we prepare to unveil the minds that will define TechFest 2026.
                    </p>
                    
                    {/* Accessibile Date Note */}
                    <div className="mt-12 flex flex-col items-center gap-2">
                         <span className="text-gold/40 text-[9px] font-mono tracking-[0.5em] uppercase">Status: Initializing_Reveal</span>
                         <div className="h-0.5 w-32 bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
                    </div>
                </div>

                {/* Ambient Scanning Effect */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
                    <div className="absolute inset-0 hex-pattern" />
                </div>
                <motion.div 
                    className="absolute inset-x-0 h-px bg-gold/30 z-20"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <SpeakerDetails
        speaker={selectedSpeaker}
        isOpen={!!selectedSpeaker}
        onClose={() => setSelectedSpeaker(null)}
      />

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-white-dim text-sm">No speakers in this category yet.</p>
        </div>
      )}
    </div>
  );
}
