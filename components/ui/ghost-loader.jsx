"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

/**
 * GhostLoader
 * ───────────
 * A 'High-Tech Elegance' preloader featuring ethereal blur transitions,
 * phantom typography, and a cinematic dissolve reveal.
 */
export default function GhostLoader({ onComplete }) {
  const [phase, setPhase] = useState(0); // 0: Aura, 1: Text, 2: Complete
  const auraRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => onComplete?.(), 500);
        }
      });

      // ACT 1: The Aura Pulse (Ethereal Manifestation)
      tl.fromTo(auraRef.current,
        { scale: 0.8, opacity: 0, filter: "blur(40px)" },
        { scale: 1, opacity: 0.6, filter: "blur(10px)", duration: 1.5, ease: "slow(0.7, 0.7, false)" }
      );

      // ACT 2: Ghosty Data Fragments
      tl.add(() => setPhase(1), "-=0.2");
      
      const fragments = containerRef.current.querySelectorAll(".ghost-fragment");
      tl.fromTo(fragments,
        { opacity: 0, filter: "blur(15px)", y: 10 },
        { opacity: 1, filter: "blur(0px)", y: 0, stagger: 0.4, duration: 1.2, ease: "power2.out" },
        "-=0.5"
      );

      // Persistent focus wavering (Ghosty feel)
      tl.to(fragments, {
        filter: "blur(2px)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        stagger: 0.3,
        ease: "sine.inOut"
      }, "+=0.2");

      // ACT 3: The Elegant Dissolve
      tl.to(containerRef.current, {
        opacity: 0,
        filter: "blur(30px)",
        duration: 1.5,
        ease: "power3.inOut",
        onStart: () => {
          // IMPORTANT: Unlock clicks the moment we start fading out the ghost
          gsap.set(containerRef.current, { pointerEvents: "none" });
        }
      }, "+=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] bg-[#0a0d10] flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
    >
      {/* ── The Tech-Aura ── */}
      <div 
        ref={auraRef}
        className="absolute w-[300px] h-[300px] rounded-full border border-gold/10 shadow-[0_0_100px_rgba(255,179,0,0.05)]"
      />

      {/* ── Ghosty Fragments ── */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="ghost-fragment font-mono text-[10px] uppercase tracking-[0.8em] text-gold/40">
           Manifesting_Protocols
        </div>
        
        <div className="ghost-fragment h-px w-32 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        
        <div className="ghost-fragment flex flex-col items-center gap-2">
           <div className="text-[9px] font-mono text-cyan-400 opacity-60 tracking-[0.4em] uppercase">
             Phase_02_Solidification
           </div>
           <div className="text-[8px] font-mono text-white/20 tracking-[1em] uppercase">
             Est_Link: [0x7A_STABLE]
           </div>
        </div>
      </div>

      {/* Atmospheric 'Grit' (Noise) */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay hex-pattern" />

      <style jsx>{`
        .ghost-fragment {
          will-change: filter, opacity;
        }
      `}</style>
    </div>
  );
}
