"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import FadeInUp from "@/components/ui/fade-in-up";

const PHRASES = [
  "Something Big?",
  "The Next Chapter?",
  "The Evolution?",
  "The Inner Circle?",
  "The Revolution?",
  "The Visionary Movement?",
  "The Tech Frontier?"
];

export default function CTA() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <FadeInUp>
          <div className="relative bg-navy-card border border-navy-border rounded-3xl p-12 sm:p-16 overflow-hidden text-center">

            {/* Background glows — diagonal: top-right and bottom-left */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-[350px] h-[350px] bg-gold/6 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
              <div className="absolute bottom-0 left-0 w-[280px] h-[280px] bg-navy-light/40 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
            </div>

            {/* Hex texture overlay */}
            <div className="absolute inset-0 hex-pattern opacity-20 pointer-events-none" />

            {/* Gold top border accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />

            <div className="relative z-10">
              <p className="text-gold text-sm uppercase tracking-[0.2em] mb-5 font-medium">
                Don&apos;t Miss Out
              </p>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-5 leading-tight flex flex-wrap justify-center items-center gap-x-3">
                <span>Ready to Be Part of</span>
                <span className="relative inline-block min-w-[300px] text-center">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={PHRASES[index]}
                      initial={{ opacity: 0, filter: "blur(10px)", y: 10 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      exit={{ opacity: 0, filter: "blur(10px)", y: -10 }}
                      transition={{ duration: 0.8 }}
                      className="gold-gradient-text block"
                    >
                      {PHRASES[index]}
                    </motion.span>
                  </AnimatePresence>
                </span>
              </h2>

              <p className="text-white-muted text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                Secure your spot at TechFest Sri Lanka 2026. Network with industry leaders,
                explore cutting-edge tech, and be inspired by the brightest minds in Sri Lanka.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center bg-gold text-navy-deeper font-bold px-10 py-4 rounded-xl text-lg hover:bg-gold-bright hover:shadow-[0_0_40px_rgba(255,203,64,0.3)] transition-all duration-300 tracking-wide"
                >
                  Register Interest Now
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center border border-gold/30 text-white-muted font-semibold px-10 py-4 rounded-xl text-lg hover:bg-white/5 hover:border-gold/60 hover:text-white transition-all duration-300"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}