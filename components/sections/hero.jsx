"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PlexusCanvas from "@/components/background/plexus-canvas";
import Countdown from "./countdown";
import { EVENT } from "@/data/event";

/**
 * Hero Section — The WOW centerpiece
 *
 * Architecture:
 *   Server Component (this file) → renders static markup on server
 *   └── PlexusCanvas  (Client)   → animated canvas, mounts in browser
 *   └── Countdown     (Client)   → live timer, updates every second
 *
 * Visual layers (back to front):
 *   1. Plexus canvas (animated gold network)
 *   2. Radial gradient overlay (navy vignette)
 *   3. Hex grid texture
 *   4. Content (z-10)
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

      {/* ── Layer 1: Animated Plexus Canvas ── */}
      <PlexusCanvas />

      {/* ── Layer 2: Radial vignette (navy center, transparent edges) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(6,15,36,0.6) 0%, rgba(6,15,36,0.95) 100%)",
        }}
      />

      {/* ── Layer 3: Hex texture overlay ── */}
      <div className="absolute inset-0 hex-pattern pointer-events-none opacity-30" />

      {/* ── Layer 4: Gold radial glow behind content ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255,203,64,0.06) 0%, transparent 70%)",
        }}
      />

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 text-center max-w-5xl mx-auto px-6 py-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Event Badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-5 py-2 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-sm font-medium tracking-wide">
              November 07, 2026 &nbsp;·&nbsp; TBA
            </span>
          </div>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-8xl font-heading font-black leading-[1.1] mb-6 tracking-wide sm:tracking-widest uppercase"
        >
          <span className="text-white block">TechFest</span>
          <span className="gold-gradient-text block">Sri Lanka</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white-muted max-w-2xl mx-auto mb-3 leading-relaxed"
        >
          {EVENT.tagline}
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          variants={itemVariants}
          className="text-sm text-white-dim mb-12 tracking-wide"
        >
          Sri Lanka&apos;s Premier Technology Innovation Festival
        </motion.p>

        {/* Countdown */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <Countdown targetDate={EVENT.date} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            href="/tickets"
            className="inline-flex items-center justify-center bg-gold text-navy-deeper font-bold px-10 py-4 rounded-xl text-lg hover:bg-gold-bright hover:shadow-[0_0_40px_rgba(255,203,64,0.35)] transition-all duration-300 tracking-wide"
          >
            Get Tickets
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center border border-gold/40 text-gold font-semibold px-10 py-4 rounded-xl text-lg hover:bg-gold/10 hover:border-gold/70 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center mt-16 gap-2 text-white-dim"
        >
          <span className="text-xs uppercase tracking-widest">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}