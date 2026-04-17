"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/data/about";
import { Terminal, Database, Shield, Radio } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/**
 * StoryTimeline — 'The Temporal Descent'
 * ──────────────────────────────────────
 * Cinematic GSAP journey through TechFest history.
 * Features ethereal wisps, archived monochrome states, 
 * and manifestation animations.
 */
export default function StoryTimeline() {
  const outerRef = useRef(null);
  const stickyRef = useRef(null);
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const ballRef = useRef(null);
  const dot2025Ref = useRef(null);
  const dot2026Ref = useRef(null);
  const card2025Ref = useRef(null);
  const card2026Ref = useRef(null);

  const [entry2025, entry2026] = TIMELINE;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const outer = outerRef.current;
        const container = containerRef.current;
        const line = lineRef.current;
        const ball = ballRef.current;
        const dot25 = dot2025Ref.current;
        const dot26 = dot2026Ref.current;
        const card25 = card2025Ref.current;
        const card26 = card2026Ref.current;
        if (!outer || !container || !dot25 || !dot26) return;

        const cTop = container.getBoundingClientRect().top;
        const dot25cy = dot25.getBoundingClientRect().top - cTop + dot25.offsetHeight / 2;
        const dot26cy = dot26.getBoundingClientRect().top - cTop + dot26.offsetHeight / 2;

        // Initial states — Noir (monochrome/dimmed)
        gsap.set(ball, { y: 0, opacity: 0 });
        gsap.set(line, { scaleY: 0, transformOrigin: "top center", opacity: 0.1 });
        gsap.set(dot25, { opacity: 0.2, scale: 0.8, filter: "grayscale(1)" });
        gsap.set(dot26, { opacity: 0.2, scale: 0.8, filter: "grayscale(1)" });
        gsap.set(card25, { opacity: 0.3, x: -40, filter: "grayscale(1) blur(2px)" });
        gsap.set(card26, { opacity: 0.3, x: 40, filter: "grayscale(1) blur(2px)" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Phase 1 — Manifest 2025
        tl.to(ball, { opacity: 1, duration: 0.2 })
          .to(ball, { y: dot25cy, ease: "power2.inOut", duration: 1.5 })
          .to(line, { scaleY: 0.5, opacity: 0.4, ease: "none", duration: 1.5 }, "<")
          .to(dot25, { opacity: 1, scale: 1.2, filter: "grayscale(0)", duration: 0.4 })
          .to(card25, { opacity: 1, x: 0, filter: "grayscale(0) blur(0px)", duration: 0.8, ease: "power3.out" }, "-=1.2")

          // Phase 2 — Manifest 2026
          .to(ball, { y: dot26cy, ease: "power2.inOut", duration: 1.5 })
          .to(line, { scaleY: 1, opacity: 1, ease: "none", duration: 1.5 }, "<")
          .to(dot26, { opacity: 1, scale: 1.2, filter: "grayscale(0)", duration: 0.4 })
          .to(card26, { opacity: 1, x: 0, filter: "grayscale(0) blur(0px)", duration: 0.8, ease: "power3.out" }, "-=1.2");

      }, outerRef);
      return () => ctx.revert();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section ref={outerRef} style={{ height: "300vh" }} className="relative">
      <div
        ref={stickyRef}
        className="sticky top-0 w-full h-screen flex flex-col items-center justify-center overflow-visible px-6"
      >
        {/* HUD Annotations */}
        <div className="absolute inset-x-0 top-1/4 pointer-events-none opacity-20 flex justify-between px-10">
          <div className="flex flex-col gap-2">
            <span className="text-[8px] font-mono text-gold tracking-widest uppercase">Temporal_Sequence: Active</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[8px] font-mono text-gold tracking-widest uppercase">Depth_Measure: [0x7F]</span>
            <div className="w-12 h-px bg-gold/30" />
          </div>
        </div>

        {/* Heading */}
        <div className="relative z-10 text-center mb-24 pt-12">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-40">
            <Terminal size={12} className="text-gold" />
            <p className="text-[10px] font-mono text-white/60 tracking-[0.4em] uppercase">Historical_Manifestation</p>
          </div>
          <h2 className="text-5xl md:text-7xl font-heading font-black text-white uppercase tracking-tighter italic pr-4">
            Our <span className="gold-gradient-text">Origin</span>
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="relative z-10 w-full max-w-5xl mx-auto">
          <div ref={containerRef} className="relative flex flex-col gap-20">

            {/* The Pulse Stream (Vertical line) */}
            <div className="absolute left-8 sm:left-1/2 -translate-x-px top-0 bottom-0 w-px pointer-events-none overflow-hidden">
              <div ref={lineRef} className="absolute inset-0 bg-gradient-to-b from- gold via-gold/40 to-transparent" />
            </div>

            {/* The Temporal Wisp (Ball) */}
            <div ref={ballRef} className="absolute left-8 sm:left-1/2 z-30 pointer-events-none" style={{ top: 0, width: 0, height: 0 }}>
              {/* Misty Glow */}
              <div className="absolute rounded-full"
                style={{
                  width: 120, height: 120, top: -60, left: -60,
                  background: "radial-gradient(circle, rgba(255,203,64,0.1) 0%, transparent 80%)", filter: "blur(20px)"
                }} />
              <div className="absolute rounded-full animate-pulse"
                style={{
                  width: 40, height: 40, top: -20, left: -20,
                  background: "radial-gradient(circle, rgba(255,203,64,0.4) 0%, transparent 70%)", filter: "blur(4px)"
                }} />
              {/* Core Node */}
              <div className="absolute rounded-full bg-navy-deeper border border-gold"
                style={{
                  width: 12, height: 12, top: -6, left: -6,
                  boxShadow: "0 0 20px rgba(255,179,0,0.8)"
                }} />
            </div>

            {/* 2025 Fragment */}
            <div className="relative flex items-center">
              <div ref={card2025Ref} className="w-full pl-20 sm:w-[42%] sm:pr-14 sm:pl-0 sm:text-right">
                <YearCard item={entry2025} align="right" status="Archived" />
              </div>
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-20">
                <div ref={dot2025Ref} className="w-4 h-4 rounded-full border border-white/10 bg-navy-deeper" />
              </div>
              <div className="hidden sm:block w-[42%] ml-auto" />
            </div>

            {/* 2026 Fragment */}
            <div className="relative flex items-center">
              <div className="hidden sm:block w-[42%]" />
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-20">
                <div ref={dot2026Ref} className="w-4 h-4 rounded-full border border-gold/40 bg-navy-deeper shadow-[0_0_10px_rgba(255,179,0,0.2)]" />
              </div>
              <div ref={card2026Ref} className="w-full pl-20 sm:w-[42%] sm:pl-14 sm:ml-auto">
                <YearCard item={entry2026} align="left" status="Manifesting" highlighted />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function YearCard({ item, align, status, highlighted }) {
  return (
    <div className="relative group">
      {/* HUD Record Label */}
      <div className={`flex items-center gap-3 mb-4 opacity-40 ${align === "right" ? "sm:justify-end" : ""}`}>
        <Database size={10} className="text-white" />
        <span className="text-[8px] font-mono text-white tracking-[0.4em] uppercase">Record_TF_2{item.year.slice(2)}</span>
      </div>

      <div className={`p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-sm transition-all duration-700 
         ${highlighted ? "border-gold/20 shadow-[0_0_40px_rgba(255,179,0,0.05)]" : "hover:border-white/10"}`}>

        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl font-heading font-black text-gold italic">{item.year}</span>
          <div className="h-px flex-1 bg-white/5" />
          <div className="flex items-center gap-2 px-2 py-0.5 bg-white/5 border border-white/10 rounded-sm">
            <div className={`w-1 h-1 rounded-full ${highlighted ? "bg-gold animate-pulse" : "bg-white/20"}`} />
            <span className="text-[7px] font-mono text-white/40 uppercase tracking-widest">{status}</span>
          </div>
        </div>

        <h4 className="text-white font-heading font-black text-lg uppercase tracking-tight mb-3">
          {item.title}
        </h4>
        <p className="text-white/60 text-sm leading-relaxed font-medium">
          {item.description}
        </p>
      </div>
    </div>
  );
}
