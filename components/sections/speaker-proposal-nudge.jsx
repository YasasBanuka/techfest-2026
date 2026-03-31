"use client";

import { useState } from "react";
import FadeInUp from "@/components/ui/fade-in-up";
import Modal from "@/components/ui/modal";
import SpeakerForm from "@/components/sections/speaker-form";

/**
 * SpeakerProposalNudge — An interactive section that triggers the speaker proposal modal.
 * Extracted from the main speakers page to maintain SEO/Metadata in the server component.
 */
export default function SpeakerProposalNudge() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 bg-navy-card border border-navy-border rounded-2xl px-8 py-6 shadow-2xl shadow-black/20">
              <div className="max-w-md">
                <p className="text-white font-heading font-bold text-lg mb-1">
                  Want to speak at TechFest Sri Lanka 2026?
                </p>
                <p className="text-white-dim text-sm leading-relaxed">
                  We welcome proposals from industry professionals, academic researchers, and innovation leaders. Share your insights with the community.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="shrink-0 px-6 py-3 bg-gold text-navy-deeper text-xs uppercase tracking-widest font-black rounded-xl hover:bg-gold-bright hover:shadow-[0_0_25px_rgba(255,203,64,0.25)] transition-all duration-300 whitespace-nowrap active:scale-95 group flex items-center gap-2"
              >
                Submit a Proposal 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* Sponsorship Interest Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Speaker Proposal Submission"
      >
        <SpeakerForm />
      </Modal>
    </>
  );
}
