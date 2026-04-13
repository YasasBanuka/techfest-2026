"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PlexusCanvas from "@/components/background/plexus-canvas";
import Countdown from "./countdown";
import { EVENT } from "@/data/event";

/**
 * Hero Section — The WOW centerpiece
 * ─────────────────────────────────
 * Transforming the experience into a 'Surreal Cyber-Noir' journey.
 */

// Framer Motion variants for staggered entrance
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* ── Layer 1: Animated Plexus Canvas (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ scale: 1.1 }}
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <PlexusCanvas />
      </motion.div>

      {/* ── Layer 2: Deep Cyber-Noir Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[2]"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,13,16,0.3) 0%, rgba(10,13,16,0.98) 100%)",
        }}
      />

      {/* ── Layer 3: Hex texture overlay (Parallax) ── */}
      <motion.div 
        className="absolute inset-0 hex-pattern pointer-events-none opacity-20 z-[1]"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Layer 4: Intense Gold Light Flare ── */}
      <div
        className="absolute inset-0 pointer-events-none z-[3]"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,179,0,0.1) 0%, transparent 60%)",
        }}
      />

      {/* ── Technical Annotations (Surreal Detail) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
          {/* Coordinates Top Left */}
          <div className="absolute top-32 left-10 text-[10px] font-mono text-gold/30 uppercase tracking-[0.2em] opacity-40 animate-pulse">
            LAT: 6.9271° N <br /> LNG: 79.8612° E
          </div>
          {/* Status Bottom Right */}
          <div className="absolute bottom-32 right-10 text-[10px] font-mono text-gold/30 uppercase tracking-[0.2em] opacity-40">
             SYS_STATUS: [0x7A_OPTIMAL] <br /> NOISE_LVL: {">"} 0.05RMS
          </div>
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Event Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-5 py-2 backdrop-blur-sm shadow-[0_0_20px_rgba(255,179,0,0.15)]">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
              November 07, 2026 &nbsp;·&nbsp; Sri Lanka
            </span>
          </div>
        </motion.div>

        {/* Main Heading (Glow effect) */}
        <motion.h1
          variants={itemVariants}
          className="text-6xl sm:text-7xl lg:text-9xl font-heading font-black leading-[1] mb-6 tracking-tight uppercase"
        >
          <span className="text-white block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">TechFest</span>
          <span className="gold-gradient-text block drop-shadow-[0_0_50px_rgba(255,179,0,0.3)]">Sri Lanka</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-2xl text-white-muted max-w-3xl mx-auto mb-4 leading-relaxed font-light tracking-wide italic"
        >
          {EVENT.tagline}
        </motion.p>

        {/* Sub-tagline with cyber styling */}
        <motion.div
           variants={itemVariants}
           className="flex items-center justify-center gap-4 mb-14"
        >
           <div className="h-px w-12 bg-gold/20" />
           <p className="text-xs text-white-dim uppercase tracking-[0.4em]">
             The Second Chapter of Innovation
           </p>
           <div className="h-px w-12 bg-gold/20" />
        </motion.div>

        {/* Countdown - with glow */}
        <motion.div variants={itemVariants} className="flex justify-center mb-16 scale-90 sm:scale-110">
          <Countdown targetDate={EVENT.date} />
        </motion.div>

        {/* CTA Buttons - Aggressive Energy */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Link
            href="/tickets"
            className="group relative inline-flex items-center justify-center bg-gold text-navy-deeper font-black px-12 py-5 rounded-2xl text-lg hover:bg-gold-bright transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,179,0,0.5)] tracking-tighter uppercase overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
               Get Your Access
               <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1 }}>→</motion.span>
            </span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border-2 border-gold/20 text-gold font-bold px-12 py-5 rounded-2xl text-lg hover:bg-gold/5 hover:border-gold/60 transition-all duration-500 backdrop-blur-sm"
          >
            Explore the Vision
          </Link>
        </motion.div>

        {/* Scroll indicator with surreal pulse */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mt-20 gap-3 text-white-dim"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-40">Surfing Atmosphere</span>
          <motion.div
            animate={{ y: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 13 5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}