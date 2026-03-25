"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Home, Ticket, Calendar, Users, ImageIcon, Mail } from "lucide-react";

/**
 * not-found.js — Custom 404 page (Next.js App Router)
 * ─────────────────────────────────────────────────────
 * Visual: Giant glitching "404" in the centre, navy bg, hex pattern
 * The "404" text has a CSS glitch animation — two offset copies
 * (before/after pseudo-elements) shift randomly, creating the glitch.
 * Framer Motion handles entrance stagger.
 */

const NAV_LINKS = [
  { href: "/",         icon: Home,      label: "Home" },
  { href: "/agenda",   icon: Calendar,  label: "Agenda" },
  { href: "/speakers", icon: Users,     label: "Speakers" },
  { href: "/gallery",  icon: ImageIcon, label: "Gallery" },
  { href: "/tickets",  icon: Ticket,    label: "Tickets" },
  { href: "/contact",  icon: Mail,      label: "Contact" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export default function NotFound() {
  const glitchRef = useRef(null);

  // GSAP: random glitch shake on the 404 number every few seconds
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
      tl.to(glitchRef.current, { x: -4, skewX: 2,  duration: 0.06, ease: "none" })
        .to(glitchRef.current, { x:  4, skewX: -2, duration: 0.06, ease: "none" })
        .to(glitchRef.current, { x: -2, skewX: 1,  duration: 0.04, ease: "none" })
        .to(glitchRef.current, { x:  0, skewX: 0,  duration: 0.08, ease: "none" });
    });
    return () => ctx.revert();
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-navy-deeper" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(15,43,105,0.5) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 hex-pattern opacity-10 pointer-events-none" />

      {/* Gold glow behind the 404 */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(255,203,64,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        <motion.p
          variants={item}
          className="text-gold text-xs uppercase tracking-[0.3em] mb-8 font-medium"
        >
          TechFest Sri Lanka 2026 · Page Not Found
        </motion.p>

        {/* Glitch 404 */}
        <motion.div variants={item} className="mb-6">
          <span
            ref={glitchRef}
            className="block font-heading font-black select-none"
            style={{
              fontSize: "clamp(6rem, 25vw, 18rem)",
              lineHeight: 1,
              background: "linear-gradient(135deg, #ffcb40 0%, #c49a00 60%, #ffcb40 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 40px rgba(255,203,64,0.25))",
            }}
          >
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={item}
          className="text-white font-heading font-bold text-2xl sm:text-3xl mb-3"
        >
          You&apos;ve Wandered Off the Map
        </motion.h1>

        {/* Sub */}
        <motion.p
          variants={item}
          className="text-white-muted text-base leading-relaxed mb-10 max-w-md"
        >
          This page doesn&apos;t exist — but TechFest Sri Lanka 2026 does. Head back and
          discover what&apos;s waiting for you on October 31.
        </motion.p>

        {/* Primary CTA */}
        <motion.div variants={item} className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-gold text-navy-deeper font-heading font-black px-8 py-3.5 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(255,203,64,0.3)] transition-all duration-300"
          >
            <Home size={16} />
            Back to Home
          </Link>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={item}
          className="w-32 h-px bg-gradient-to-r from-transparent via-navy-border to-transparent mb-8"
        />

        {/* Quick nav grid */}
        <motion.p
          variants={item}
          className="text-white-dim text-xs uppercase tracking-wider mb-5"
        >
          Or go somewhere else
        </motion.p>

        <motion.div
          variants={item}
          className="grid grid-cols-3 sm:grid-cols-6 gap-3"
        >
          {NAV_LINKS.map(({ href, icon: Icon, label }) => (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center gap-2 bg-navy-card border border-navy-border rounded-xl px-3 py-4 text-white-dim hover:text-gold hover:border-gold/35 transition-all duration-200 group"
            >
              <Icon
                size={18}
                className="group-hover:scale-110 transition-transform duration-200"
              />
              <span className="text-xs font-medium">{label}</span>
            </Link>
          ))}
        </motion.div>
      </motion.div>
    </main>
  );
}
