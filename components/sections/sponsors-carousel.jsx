"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import { SPONSORS } from "@/data/sponsors";

/**
 * SponsorTile — shows real logo image, falls back to name text
 * Logo displayed on a dark card with brightness filter so
 * coloured logos sit nicely on the navy background.
 */
function SponsorTile({ name, role, logo }) {
  return (
    <div className="flex-shrink-0 w-64 h-56 bg-navy-card border border-navy-border rounded-2xl flex flex-col items-center justify-center gap-4 px-6 hover:border-gold/40 hover:bg-navy-surface transition-all duration-300 group">

      {/* Logo */}
      <div className="relative w-40 h-16 flex items-center justify-center">
        {logo ? (
          <Image
            src={logo}
            alt={`${name} logo`}
            fill
            className="object-contain brightness-90 group-hover:brightness-110 transition-all duration-300"
          />
        ) : (
          <span className="text-gold/50 font-heading font-bold text-sm text-center">
            {name}
          </span>
        )}
      </div>

      {/* Name + Role */}
      <div className="text-center">
        <p className="text-white font-heading font-semibold text-sm leading-snug">
          {name}
        </p>
        <p className="text-white-dim text-xs mt-1 leading-snug">
          {role}
        </p>
      </div>
    </div>
  );
}

export default function SponsorsCarousel() {
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
            <a
              href="mailto:sponsors@techfest2026.lk"
              className="text-gold hover:text-gold-bright transition-colors underline-offset-2 hover:underline"
            >
              Get in touch →
            </a>
          </p>
        </FadeInUp>
      </div>
    </section>
  );
}
