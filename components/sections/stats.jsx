"use client";

import { motion } from "framer-motion";
import { Users, LayoutGrid, Building2, Mic2 } from "lucide-react";
import { STATS } from "@/data/event";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import ScrambleNumber from "@/components/ui/scramble-number";

const ICON_MAP = { Users, LayoutGrid, Building2, Mic2 };

export default function Stats() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3 font-medium">
            By The Numbers
          </p>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
            Join the Innovation
          </h2>
          <p className="text-white-muted mt-3 max-w-xl mx-auto">
            TechFest 2026 is set to be the biggest yet — uniting Sri Lanka&apos;s sharpest tech minds.
          </p>
        </motion.div>

        {/* Stats grid — staggered entrance */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat) => {
            const Icon = ICON_MAP[stat.icon] || Users;
            return (
              <StaggerItem key={stat.label}>
                <div className="group relative bg-navy-card border border-navy-border rounded-2xl p-6 sm:p-8 text-center hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,203,64,0.08)] transition-all duration-400 overflow-hidden h-full">

                  {/* Corner glow on hover */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -translate-y-1/2 translate-x-1/2" />

                  {/* Icon */}
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors duration-300">
                    <Icon size={22} className="text-gold" />
                  </div>

                  {/* Scramble number — digits scramble then lock in */}
                  <div className="text-3xl sm:text-4xl font-heading font-black text-gold mb-2 tabular-nums">
                    <ScrambleNumber value={stat.value} />
                  </div>

                  <p className="text-white-muted text-sm leading-snug">{stat.label}</p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}