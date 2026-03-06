"use client";

import { motion } from "framer-motion";

/**
 * PageHero — Reusable inner page hero banner
 *
 * Usage:
 *   <PageHero
 *     eyebrow="Get In Touch"
 *     title="Contact Us"
 *     subtitle="We'd love to hear from you."
 *   />
 *
 * Features:
 *   - Consistent navy gradient background
 *   - Gold eyebrow label
 *   - Bold heading with gold gradient on last word
 *   - Subtitle text
 *   - Hex pattern texture overlay
 *   - Framer Motion stagger entrance
 */
export default function PageHero({ eyebrow, title, subtitle, titleGold }) {
  // titleGold: optionally bold-highlight a specific word in gold gradient
  // If not provided, the last word of title gets gold treatment
  const words = title.split(" ");
  const goldWord = titleGold || words[words.length - 1];
  const regularWords = words
    .slice(0, words.findIndex((w) => w === goldWord))
    .join(" ");

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
  };

  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-navy-deeper" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(15,43,105,0.7) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 hex-pattern opacity-10 pointer-events-none" />
      {/* Gold glow at top center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,203,64,0.5), transparent)",
        }}
      />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Eyebrow */}
        {eyebrow && (
          <motion.p
            variants={itemVariants}
            className="text-gold text-xs uppercase tracking-[0.25em] mb-5 font-medium"
          >
            {eyebrow}
          </motion.p>
        )}

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black leading-tight mb-5"
        >
          {regularWords && (
            <span className="text-white">{regularWords} </span>
          )}
          <span className="gold-gradient-text">{goldWord}</span>
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            variants={itemVariants}
            className="text-white-muted text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
