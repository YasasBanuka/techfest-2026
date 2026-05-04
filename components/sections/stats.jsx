"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Users, LayoutGrid, Building2, Mic2 } from "lucide-react";
import { STATS } from "@/data/event";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import GlitchCounter from "@/components/ui/glitch-counter";
import CyberModule from "@/components/ui/cyber-module";

const ICON_MAP = { Users, LayoutGrid, Building2, Mic2 };

export default function Stats() {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const HeaderWrapper = isMobile
    ? ({ children, className }) => <div className={className}>{children}</div>
    : ({ children, className }) => (
        <motion.div
          className={className}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      );

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">

        {/* Section header */}
        <HeaderWrapper className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.5em] mb-4 font-black opacity-60">
            Real-Time Metrics
          </p>
          <h2 className="text-4xl sm:text-5xl font-heading font-black text-white uppercase tracking-tight">
            The Digital Footprint
          </h2>
          <div className="h-px w-32 bg-gold/20 mx-auto mt-6" />
        </HeaderWrapper>

        {/* Stats grid */}
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {STATS.map((stat, i) => {
            const Icon = ICON_MAP[stat.icon] || Users;
            return (
              <StaggerItem key={stat.label}>
                <CyberModule className="items-center text-center p-6 sm:p-10">

                  {/* Subtle Hex/Data Background */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full hex-pattern scale-150" />
                  </div>

                  {/* Icon Frame */}
                  <div className="relative w-14 h-14 mx-auto mb-6 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/20 group-hover:border-gold/40 transition-all duration-500 shadow-[0_0_20px_rgba(255,179,0,0.1)]">
                    <Icon size={24} className="text-gold" />
                    <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold animate-pulse" />
                  </div>

                  {/* Glitch counter with HUD brackets */}
                  <div className="flex items-center justify-center gap-2 text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-white tabular-nums mb-3">
                    <span className="text-gold/20 font-light">[</span>
                    <GlitchCounter
                      fromValue={stat.previousValue}
                      toValue={stat.value}
                      delay={i * 200}
                    />
                    <span className="text-gold/20 font-light">]</span>
                  </div>

                  <p className="text-white-dim text-[10px] sm:text-xs uppercase tracking-[0.3em] font-black leading-snug max-w-[120px] mx-auto">
                    {stat.label}
                  </p>

                  {/* Bottom Archival ID */}
                  <span className="mt-8 text-[8px] font-mono text-cyan-400/20 uppercase tracking-widest">
                    TF26_METRIC_0x{i + 10}
                  </span>
                </CyberModule>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}