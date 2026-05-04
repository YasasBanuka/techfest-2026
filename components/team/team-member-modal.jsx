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
        <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-0 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deeper/95 backdrop-blur-md"
          />

          {/* Modal Container — slides up on mobile, fades in on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 60 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="relative w-full sm:max-w-3xl z-10 max-h-[92dvh] sm:max-h-[85vh] flex flex-col"
          >
            {/* ── Modal Content ── */}
            <div className="bg-navy-card border border-navy-border rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col" style={{ maxHeight: "92dvh" }}>

              {/* Close button — large, always accessible */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-navy-border flex-shrink-0">
                <div>
                  <span className="text-[9px] font-mono text-gold/50 uppercase tracking-[0.4em]">OC_Member Dossier</span>
                  <p className="text-white font-heading font-bold text-base mt-0.5">{member.name}</p>
                </div>
                <button
                  onClick={onClose}
                  className="w-9 h-9 flex items-center justify-center rounded-xl bg-navy-surface border border-navy-border text-white/50 hover:text-gold hover:border-gold/30 transition-colors"
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="overflow-y-auto overscroll-contain flex-1">
                <div className="flex flex-col sm:flex-row">

                  {/* Photo */}
                  <div className="w-full md:w-[40%] bg-navy-surface/50 relative overflow-hidden flex-shrink-0 group/img h-[200px] md:h-auto">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover object-top opacity-100 transition-all duration-1000"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/5 text-8xl font-heading font-black">
                        {initials}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-[9px] font-mono text-gold/50 uppercase tracking-[0.4em] mb-1">Team</p>
                      <p className="text-white text-xs font-bold tracking-widest uppercase">{member.team}</p>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 p-6 sm:p-10 flex flex-col gap-6">
                    {/* Header */}
                    <div>
                      <h2 className="text-3xl sm:text-5xl font-heading font-black text-white uppercase tracking-tighter leading-none mb-3">
                        {member.name}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="text-base text-gold font-medium italic">{member.role}</p>
                        <span className="w-1 h-1 rounded-full bg-white/20" />
                        <p className="text-white-dim text-xs uppercase tracking-widest flex items-center gap-1.5">
                          <Building2 size={12} className="text-gold/40" />
                          {member.university}
                        </p>
                      </div>
                    </div>

                    {/* Bio */}
                    <div className="border-t border-white/5 pt-6">
                      <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                        A dedicated member of the TechFest Sri Lanka 2026 Organizing Committee,
                        contributing to the {member.team} team to ensure a seamless and impactful
                        experience for all participants.
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/5">
                      {member.linkedin ? (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-white-dim hover:text-gold transition-colors text-xs font-bold uppercase tracking-widest"
                        >
                          <Linkedin size={16} />
                          LinkedIn
                        </a>
                      ) : <span />}
                      <button
                        onClick={onClose}
                        className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
