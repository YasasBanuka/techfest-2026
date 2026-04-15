"use client";

import { motion } from "framer-motion";
import { Linkedin, Twitter, ExternalLink, ChevronRight } from "lucide-react";
import CyberModule from "@/components/ui/cyber-module";

/**
 * SpeakerCard — The Ethereal Dossier
 * ─────────────────────────────────
 * A minimalist, atmospheric card that reveals details through 
 * soft glows and misty transitions.
 */
export default function SpeakerCard({ speaker, onClick }) {
  if (!speaker) return null;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      onClick={onClick}
      className="group relative h-full cursor-pointer"
    >
      <CyberModule className="h-full !p-0 overflow-hidden bg-navy-card/40 border-white/5 group-hover:border-gold/20 transition-colors duration-700">
        
        {/* ── Avatar Frame ── */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {speaker.photo ? (
            <motion.img
              src={speaker.photo}
              alt={speaker.name}
              className="w-full h-full object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000 ease-soft"
              whileHover={{ scale: 1.05 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-navy-surface">
              <span className="text-4xl font-heading font-black text-white/5 uppercase select-none">
                {speaker.initials}
              </span>
            </div>
          )}

          {/* Misty Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-transparent to-transparent opacity-80" />
          <div className="absolute inset-0 border-t border-white/5" />
          
          {/* Subtle Annotations */}
          <div className="absolute top-4 left-4 text-[9px] font-mono text-white/20 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            ASSET_REF: TF_0{speaker.id}
          </div>
        </div>

        {/* ── Content ── */}
        <div className="p-6 relative">
          <div className="mb-4">
            <p className="text-gold/60 text-[10px] uppercase tracking-[0.3em] font-extrabold mb-1">
              {speaker.type}
            </p>
            <h3 className="text-2xl font-heading font-black text-white leading-tight mb-1 group-hover:text-gold transition-colors duration-500">
              {speaker.name}
            </h3>
            <p className="text-white-dim text-xs font-medium uppercase tracking-widest">
              {speaker.role}
            </p>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <span className="text-[10px] text-white/20 font-mono group-hover:text-gold/40 transition-colors">
              {speaker.company}
            </span>
            <motion.div 
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 group-hover:border-gold/50 group-hover:text-gold transition-all duration-500"
              whileHover={{ rotate: 90 }}
            >
              <ChevronRight size={16} />
            </motion.div>
          </div>
        </div>

        {/* Ethereal Glow Footprint (Desktop Only) */}
        <div className="absolute -inset-px bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
      </CyberModule>
    </motion.div>
  );
}
