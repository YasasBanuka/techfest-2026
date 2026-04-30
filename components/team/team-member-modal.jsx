"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Building2, GraduationCap, ShieldCheck } from "lucide-react";
import { useEffect } from "react";
import CyberModule from "@/components/ui/cyber-module";

/**
 * TeamMemberModal — Archival Identity Dossier
 * ──────────────────────────────────────────
 * Immersive modal for Organizing Committee members.
 * Features the same high-tech Noir aesthetics as the speaker dossiers.
 */
export default function TeamMemberModal({ member, isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  if (!member) return null;

  const initials = member.name.substring(0, 2).toUpperCase();

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-12">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deeper/90 backdrop-blur-xl"
            style={{
              background: "radial-gradient(circle at 50% 50%, rgba(10,13,16,0.6) 0%, rgba(10,13,16,0.98) 100%)"
            }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, filter: "blur(40px)", y: 20 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, filter: "blur(40px)", y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full max-w-5xl z-10"
          >
            <CyberModule className="bg-navy-card/60 border-white/10 !p-0 overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">

              {/* Internal Scan-line */}
              <motion.div
                initial={{ top: "-100%" }}
                animate={{ top: "200%" }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.2 }}
                className="absolute inset-x-0 h-[2px] bg-gold/30 blur-sm z-50 pointer-events-none"
              />

              <div className="flex flex-col md:flex-row h-full max-h-[90vh] md:max-h-[85vh] relative">
                {/* Close Icon (Fixed position for mobile accessibility) */}
                <motion.button
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  onClick={onClose}
                  className="absolute top-4 right-4 md:top-8 md:right-8 text-white/60 hover:text-gold transition-colors z-[60] bg-navy-deeper/50 backdrop-blur-md p-2 rounded-full border border-white/10"
                >
                  <X size={20} strokeWidth={2} />
                </motion.button>

                {/* ── Left: The Portrait ── */}
                <div className="w-full md:w-[40%] bg-navy-surface/50 relative overflow-hidden flex-shrink-0 group/img h-[200px] md:h-auto">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale opacity-60 group-hover/img:opacity-100 group-hover/img:grayscale-0 transition-all duration-1000"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/5 text-9xl font-heading font-black">
                      {initials}
                    </div>
                  )}
                  {/* Atmospheric Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-deeper via-transparent to-transparent" />
                  <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />

                  {/* Photo Title Accent */}
                  <div className="absolute bottom-8 left-8">
                    <p className="text-[10px] font-mono text-gold/60 uppercase tracking-[0.5em] mb-2">Member_Identity</p>
                    <p className="text-white text-xs font-bold tracking-widest uppercase">{member.team}</p>
                  </div>
                </div>

                {/* ── Right: The Data Content ── */}
                <div className="flex-1 flex flex-col p-8 md:p-14 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent relative">
                  {/* Header */}
                  <div className="mb-10">
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="inline-block text-[10px] font-black uppercase tracking-[0.4em] text-gold/60 mb-4"
                    >
                      OC_Member Dossier
                    </motion.span>
                    <h2 className="text-4xl md:text-6xl font-heading font-black text-white uppercase tracking-tighter leading-[0.9] mb-4">
                      {member.name}
                    </h2>
                    <div className="flex flex-wrap items-center gap-6">
                      <p className="text-lg text-gold font-medium italic">{member.role}</p>
                      <span className="w-1 h-1 rounded-full bg-white/20" />
                      <p className="text-white-dim text-sm uppercase tracking-widest flex items-center gap-2">
                        <Building2 size={16} className="text-gold/40" />
                        {member.university}
                      </p>
                    </div>
                  </div>

                  {/* Biography (Dummy Text for now) */}
                  <div className="flex-1 mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="h-px bg-white/10 flex-1" />
                      <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Temporal_Summary</span>
                      <div className="h-px bg-white/10 w-12" />
                    </div>
                    <div className="text-white-muted text-base md:text-lg leading-relaxed font-light">
                      A dedicated member of the TechFest Sri Lanka 2026 Organizing Committee.
                      Contributing to the {member.team} team to ensure a seamless and impactful
                      experience for all participants. Committed to fostering innovation and
                      empowering the next generation of technology leaders in Sri Lanka.
                    </div>
                  </div>

                  {/* Links / Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-8 pt-8 border-t border-white/5">
                    <div className="flex items-center gap-4">
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" className="w-10 h-10 flex items-center justify-center text-white/30 hover:text-gold transition-colors border border-white/5 rounded-full hover:border-gold/30">
                          <Linkedin size={20} />
                        </a>
                      )}
                    </div>

                    <button
                      onClick={onClose}
                      className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 hover:text-gold transition-colors"
                    >
                      DISMISS_ENTRY
                      <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                        <X size={12} />
                      </motion.span>
                    </button>
                  </div>
                </div>
              </div>
            </CyberModule>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
