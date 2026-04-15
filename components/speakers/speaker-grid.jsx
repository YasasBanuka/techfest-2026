"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPEAKERS, SPEAKER_TYPES, TYPE_LABELS, IS_REVEALED } from "@/data/speakers";
import SpeakerCard from "@/components/speakers/speaker-card";
import SpeakerDetails from "@/components/speakers/speaker-details";
import FadeInUp from "@/components/ui/fade-in-up";
import SpeakerPlaceholder from "@/components/speakers/speaker-placeholder";

/**
 * SpeakerGrid
 * ────────────
 * Filter tabs + staggered grid.
 * If IS_REVEALED is false (from data/speakers.js), shows the SpeakerPlaceholder instead.
 */
export default function SpeakerGrid() {
  const [activeType, setActiveType] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  if (!IS_REVEALED) {
    return <SpeakerPlaceholder />;
  }

  const filtered = (
    activeType === "All"
      ? SPEAKERS
      : SPEAKERS.filter((s) => s.type === activeType)
  ).sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <div>
      {/* ── Filter tabs ── */}
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

      {/* ── Card grid ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((speaker, i) => (
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
          ))}
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
