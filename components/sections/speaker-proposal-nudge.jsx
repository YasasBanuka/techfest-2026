"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import Modal from "@/components/ui/modal";
import SpeakerForm from "@/components/sections/speaker-form";
import CyberModule from "@/components/ui/cyber-module";
import { Send, Sparkles } from "lucide-react";

/**
 * SpeakerProposalNudge — The Ethereal Call for Signals
 * ────────────────────────────────────────────────────
 * A high-tech nudge that triggers the speaker proposal modal.
 * Styled with misty blooms and CyberModule geometry.
 */
export default function SpeakerProposalNudge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          <FadeInUp>
            <CyberModule className="relative group !p-0 bg-navy-card/40 border-white/5 overflow-hidden hover:border-gold/30 transition-colors duration-700">

              {/* Misty Background Bloom */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[100px] pointer-events-none"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.1, 1] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="max-w-xl text-center md:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] text-gold font-black uppercase tracking-[0.3em] mb-6">
                    <Sparkles size={12} />
                    Call for Signals
                  </div>
                  <h2 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight mb-4">
                    Contribute to the <span className="gold-gradient-text">Assembly</span>
                  </h2>
                  <p className="text-white-dim text-sm md:text-base leading-relaxed font-light italic">
                    We are currently decrypting signals from the industry's brightest minds. If you have a vision to share, submit your dossier and join the temporal stream.
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsModalOpen(true)}
                  className="shrink-0 px-10 py-5 bg-gold text-navy-deeper text-xs uppercase tracking-[0.4em] font-black rounded-xl hover:bg-gold-bright transition-all duration-300 shadow-[0_0_30px_rgba(255,179,0,0.15)] flex items-center gap-3"
                >
                  Submit_Dossier
                  <Send size={16} />
                </motion.button>
              </div>

              {/* Decorative Corner Label */}
              <div className="absolute top-4 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <span className="text-[8px] font-mono text-white/20 tracking-[0.5em]">AUTH_PROTOCOL_0x7A</span>
              </div>
            </CyberModule>
          </FadeInUp>
        </div>
      </section>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Speaker Dossier Submission"
      >
        <SpeakerForm />
      </Modal>
    </>
  );
}
