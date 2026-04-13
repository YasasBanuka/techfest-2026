"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Twitter, ExternalLink, Building2, MapPin } from "lucide-react";
import { useEffect } from "react";

/**
 * SpeakerDetails
 * ──────────────
 * A premium, glassmorphic modal overlay that shows a speaker's full profile.
 * Layout: Left (Photo) | Right (Details/Bio/Socials)
 */
export default function SpeakerDetails({ speaker, isOpen, onClose }) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!speaker) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6 py-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-navy-deeper/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-navy-card border border-gold/20 rounded-3xl overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.6)] flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-30 p-2 rounded-full bg-navy-deeper/50 border border-white/10 text-white hover:bg-gold hover:text-navy-deeper transition-all duration-300"
            >
              <X size={20} />
            </button>

            {/* Left: Speaker Image (Hidden on very small screens or top on mobile) */}
            <div className="w-full md:w-[42%] relative h-64 md:h-auto bg-navy-surface flex-shrink-0">
               {speaker.photo ? (
                <img
                  src={speaker.photo}
                  alt={speaker.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-navy-surface to-navy-deeper p-12 text-center">
                   <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center font-heading font-black text-4xl text-gold mb-4 shadow-[0_0_40px_rgba(255,179,0,0.1)]">
                      {speaker.initials}
                   </div>
                   <p className="text-white-dim text-sm uppercase tracking-widest font-bold">Speaker Profile</p>
                </div>
              )}
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-navy-deeper/40 to-transparent" />
            </div>

            {/* Right: Details / Content */}
            <div className="flex-1 flex flex-col p-8 md:p-12 overflow-y-auto scrollbar-thin scrollbar-thumb-gold/20 scrollbar-track-transparent">
              {/* Header Info */}
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest mb-4">
                  {speaker.type}
                </span>
                <h2 className="text-3xl md:text-5xl font-heading font-black text-white leading-tight mb-2">
                  {speaker.name}
                </h2>
                <div className="flex flex-col gap-2">
                  <p className="text-gold font-bold text-lg flex items-center gap-2">
                    {speaker.role}
                  </p>
                  <p className="text-white-dim flex items-center gap-2 text-sm">
                    <Building2 size={14} className="text-gold/60" />
                    {speaker.company}
                  </p>
                </div>
              </div>

              {/* Bio Section */}
              <div className="flex-1 mb-10">
                <p className="text-white-dim text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                  Biography
                  <span className="h-px bg-gold/20 flex-1 ml-2" />
                </p>
                <div className="text-white-muted text-sm md:text-base leading-relaxed space-y-4">
                  {speaker.bio}
                </div>
              </div>

              {/* Socials / Footer */}
              <div className="pt-6 border-t border-navy-border flex flex-wrap items-center justify-between gap-6">
                <div className="flex items-center gap-3">
                  {speaker.linkedin && (
                    <a
                      href={speaker.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-white-dim hover:bg-gold hover:text-navy-deeper hover:border-gold transition-all duration-300 group"
                    >
                      <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                  {speaker.twitter && (
                    <a
                      href={speaker.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center text-white-dim hover:bg-gold hover:text-navy-deeper hover:border-gold transition-all duration-300 group"
                    >
                      <Twitter size={20} className="group-hover:scale-110 transition-transform" />
                    </a>
                  )}
                </div>

                <a
                  href={`/agenda`}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold hover:text-gold-bright transition-colors group"
                >
                  View Sessions
                  <ExternalLink size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
