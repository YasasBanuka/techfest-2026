"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import Modal from "@/components/ui/modal";
import SponsorForm from "@/components/sections/sponsor-form";
import { SPONSORS } from "@/data/sponsors";

import CyberModule from "@/components/ui/cyber-module";

/**
 * SponsorTile — shows real logo image, falls back to name text
 * Logo displayed on a dark card with brightness filter so
 * coloured logos sit nicely on the navy background.
 */
function SponsorTile({ name, role, logo }) {
  return (
    <div className="flex-shrink-0 w-72 h-64 p-2 group">
      <CyberModule className="h-full flex flex-col items-center justify-center p-6 text-center">
        {/* Logo with Surreal Manifestation */}
        <div className="relative w-44 h-20 mb-6 flex items-center justify-center group-hover:scale-105 transition-all duration-500">
          {logo ? (
            <Image
              src={logo}
              alt={`${name} logo`}
              fill
              className="object-contain grayscale contrast-125 opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:drop-shadow-[0_0_15px_rgba(255,179,0,0.2)] transition-all duration-700"
            />
          ) : (
            <span className="text-gold/40 font-heading font-black text-sm uppercase tracking-widest text-center">
              {name}
            </span>
          )}
        </div>

        {/* Name + Role */}
        <div className="relative">
          <p className="text-white font-heading font-black text-sm tracking-tight mb-1 uppercase">
            {name}
          </p>
          <div className="h-px w-8 bg-gold/30 mx-auto mb-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          <p className="text-gold/60 text-[10px] uppercase tracking-[0.3em] font-black">
            {role}
          </p>
        </div>
      </CyberModule>
    </div>
  );
}

export default function SponsorsCarousel() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Duplicate list so the infinite scroll looks seamless
  const items = [...SPONSORS, ...SPONSORS];

  return (
    <section className="py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <FadeInUp className="text-center mb-12">
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3 font-medium">
            Our Partners
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Sponsors &amp; Partners
          </h2>
          <p className="text-white-muted mt-3 max-w-xl mx-auto text-sm">
            Proudly supported by industry leaders driving technological innovation.
          </p>
        </FadeInUp>

        {/* Infinite scroll carousel */}
        <div className="relative">
          {/* Edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-deeper to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-deeper to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden">
            <motion.div
              className="flex gap-5 w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
            >
              {items.map((sponsor, index) => (
                <SponsorTile
                  key={`${sponsor.id}-${index}`}
                  name={sponsor.name}
                  role={sponsor.role}
                  logo={sponsor.logo}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Sponsor CTA */}
        <FadeInUp delay={0.2} className="text-center mt-12">
          <p className="text-white-dim text-sm">
            Interested in sponsoring TechFest Sri Lanka 2026?{" "}
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-gold hover:text-gold-bright transition-all underline-offset-8 hover:underline font-semibold tracking-wide cursor-pointer"
            >
              Get in touch →
            </button>
          </p>
        </FadeInUp>

        {/* Sponsorship Interest Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Sponsorship & Partnership Inquiry"
        >
          <SponsorForm />
        </Modal>
      </div>
    </section>
  );
}
