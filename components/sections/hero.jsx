"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import EtherealVoid from "@/components/background/ethereal-void";
import Countdown from "./countdown";
import { EVENT } from "@/data/event";
import { useEffect, useState } from "react";

/**
 * Hero Section — The WOW centerpiece
 * ─────────────────────────────────
 * Desktop: Full Framer Motion stagger, parallax hex overlay, looping arrow.
 * Mobile:  All content immediately visible, no entrance animations, no loops.
 */

// Framer Motion variants for staggered entrance (desktop only)
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function Hero() {
  const [isMobile, setIsMobile] = useState(null);

  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);

  // ── Mobile Hero ──
  if (isMobile) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

        {/* Background: static gradient from EtherealVoid */}
        <div className="absolute inset-0 z-[1]">
          <EtherealVoid />
        </div>

        {/* Deep vignette */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,13,16,0.3) 0%, rgba(10,13,16,0.98) 100%)",
          }}
        />

        {/* Gold flare */}
        <div
          className="absolute inset-0 pointer-events-none z-[3]"
          style={{
            background:
              "radial-gradient(circle at 50% 45%, rgba(255,179,0,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Content — fully visible, no animation */}
        <div className="relative z-10 text-center max-w-5xl mx-auto px-6 py-16">

          {/* Event Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/25 rounded-full px-5 py-2 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <span className="text-gold text-xs font-bold tracking-[0.2em] uppercase">
                November 07, 2026 &nbsp;·&nbsp; Sri Lanka
              </span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl font-heading font-black leading-[1] mb-6 tracking-tight uppercase">
            <span className="text-white block">TechFest</span>
            <span className="gold-gradient-text block">Sri Lanka</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg text-white-muted max-w-3xl mx-auto mb-4 leading-relaxed font-light tracking-wide italic">
            Innovate, <span className="text-gold font-bold">Inspire</span>, Impact
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <div className="h-px w-12 bg-gold/20" />
            <p className="text-xs text-white-dim uppercase tracking-[0.4em]">
              The Second Chapter of Innovation
            </p>
            <div className="h-px w-12 bg-gold/20" />
          </div>

          {/* Countdown */}
          <div className="flex justify-center mb-14">
            <Countdown targetDate={EVENT.date} />
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4">
            <Link
              href="/tickets"
              className="inline-flex items-center justify-center bg-gold text-navy-deeper font-black px-8 py-4 rounded-2xl text-base uppercase tracking-tighter active:opacity-80 transition-opacity"
            >
              Get Your Access →
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center border-2 border-gold/20 text-gold font-bold px-8 py-4 rounded-2xl text-base active:opacity-70 transition-opacity"
            >
              Explore the Vision
            </Link>
          </div>

          {/* Scroll indicator — static on mobile */}
          <div className="flex flex-col items-center mt-16 gap-3 text-white-dim">
            <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-40">Surfing Atmosphere</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gold opacity-60">
              <path d="m7 13 5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </section>
    );
  }

  // ── SSR / not yet resolved ──
  if (isMobile === null) {
    return (
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-navy-deeper z-[1]" />
      </section>
    );
  }

  // ── Desktop Hero: Full animations ──
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">

      {/* ── Layer 1: Ethereal Data Void ── */}
      <div className="absolute inset-0 z-[1]">
        <EtherealVoid />
      </div>

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
        <div className="absolute top-32 left-10 text-[10px] font-mono text-gold/30 uppercase tracking-[0.2em] opacity-40 animate-pulse">
          LAT: 6.9271° N <br /> LNG: 79.8612° E
        </div>
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

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black leading-[1] mb-6 tracking-tight uppercase"
        >
          <span className="text-white block drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">TechFest</span>
          <span className="gold-gradient-text block drop-shadow-[0_0_50px_rgba(255,179,0,0.3)]">Sri Lanka</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl lg:text-2xl text-white-muted max-w-3xl mx-auto mb-4 leading-relaxed font-light tracking-wide italic"
        >
          Innovate, <span className="text-gold font-bold">Inspire</span>, Impact
        </motion.p>

        {/* Sub-tagline */}
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

        {/* Countdown */}
        <motion.div variants={itemVariants} className="flex justify-center mb-16 scale-90 sm:scale-110">
          <Countdown targetDate={EVENT.date} />
        </motion.div>

        {/* CTA Buttons */}
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

        {/* Scroll indicator */}
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