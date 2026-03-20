"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/data/about";

gsap.registerPlugin(ScrollTrigger);

/**
 * StoryTimeline — Sticky scroll (not GSAP pin)
 * ─────────────────────────────────────────────
 * The outer <section> is 300vh tall — the browser scrollbar moves naturally,
 * giving the "screen scrolls with the ball" feel the user wants.
 *
 * The inner sticky div stays fixed at top:0 while the outer section
 * scrolls through the viewport, animating the ball via ScrollTrigger scrub.
 *
 * Journey (scrubbed over 300vh of scroll):
 *  0%→28%   Ball travels top → 2025 dot. Dot pops in.
 *  28%→48%  DWELL. Card25 slides in.
 *  48%→55%  Card25 exits. Ball departs.
 *  55%→83%  Ball travels 2025 → 2026. Dot pops in.
 *  83%→100% DWELL. Card26 slides in.
 */
export default function StoryTimeline() {
  const outerRef     = useRef(null); // 300vh scroll trigger target
  const stickyRef    = useRef(null); // sticky inner (visible area)
  const containerRef = useRef(null); // ball's positioned parent
  const lineRef      = useRef(null);
  const ballRef      = useRef(null);
  const dot2025Ref   = useRef(null);
  const dot2026Ref   = useRef(null);
  const card2025Ref  = useRef(null);
  const card2026Ref  = useRef(null);

  const [entry2025, entry2026] = TIMELINE;

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {
        const outer    = outerRef.current;
        const container= containerRef.current;
        const line     = lineRef.current;
        const ball     = ballRef.current;
        const dot25    = dot2025Ref.current;
        const dot26    = dot2026Ref.current;
        const card25   = card2025Ref.current;
        const card26   = card2026Ref.current;
        if (!outer || !container || !dot25 || !dot26) return;

        // Positions relative to containerRef (ball's positioned ancestor)
        const cTop    = container.getBoundingClientRect().top;
        const dot25cy = dot25.getBoundingClientRect().top - cTop + dot25.offsetHeight / 2;
        const dot26cy = dot26.getBoundingClientRect().top - cTop + dot26.offsetHeight / 2;

        // Initial states
        gsap.set(ball,   { y: 0 });
        gsap.set(line,   { scaleY: 0, transformOrigin: "top center" });
        gsap.set(dot25,  { opacity: 0, scale: 0, transformOrigin: "center center" });
        gsap.set(dot26,  { opacity: 0, scale: 0, transformOrigin: "center center" });
        gsap.set(card25, { opacity: 0, x: -60 });
        gsap.set(card26, { opacity: 0, x:  60 });

        // Scrubbed timeline on the OUTER tall section (no pin — sticky CSS handles it)
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: outer,        // 300vh outer
            start: "top top",
            end: "bottom bottom",  // natural scroll, no pin
            scrub: 1.5,
          },
        });

        // Phase 1 — travel to 2025
        tl.to(ball, { y: dot25cy, ease: "power2.inOut", duration: 1.5 })
          .to(line,  { scaleY: 0.5, ease: "none", duration: 1.5 }, "<")
          .to(dot25, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })

          // Dwell at 2025
          .to(ball, { y: dot25cy, ease: "none", duration: 1.5 })
          .to(card25, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=1.1")

          // Phase 2 — travel to 2026 (card25 stays visible)
          .to(ball, { y: dot26cy, ease: "power2.inOut", duration: 1.5 })
          .to(line,  { scaleY: 1, ease: "none", duration: 1.5 }, "<")
          .to(dot26, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" })

          // Dwell at 2026
          .to(ball, { y: dot26cy, ease: "none", duration: 1.5 })
          .to(card26, { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }, "-=1.1");

      }, outerRef);
      return () => ctx.revert();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    /* Outer: 300vh — browser scrollbar actually moves through this */
    <section ref={outerRef} style={{ height: "300vh" }}>

      {/* Sticky inner — stays in viewport as outer scrolls */}
      <div
        ref={stickyRef}
        className="sticky top-0 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-navy-deeper px-6 py-20"
      >
        {/* Background */}
        <div className="absolute inset-0 hex-pattern opacity-[0.06] pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(15,43,105,0.4) 0%, transparent 70%)" }} />

        {/* Heading */}
        <div className="relative z-10 text-center mb-16 shrink-0">
          <p className="text-gold text-xs uppercase tracking-[0.3em] mb-3 font-medium">Since 2025</p>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white">
            Our <span className="gold-gradient-text">Story</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative z-10 w-full max-w-4xl mx-auto">
          <div ref={containerRef} className="relative flex flex-col gap-14">

            {/* Vertical line */}
            <div className="absolute left-8 sm:left-1/2 -translate-x-px top-0 bottom-0 w-[2px] pointer-events-none overflow-hidden">
              <div ref={lineRef}
                className="absolute inset-0 bg-gradient-to-b from-gold/90 via-gold/50 to-gold/20" />
            </div>

            {/* Ball — w:0 h:0 so visual centre = GSAP y exactly */}
            <div ref={ballRef} className="absolute left-8 sm:left-1/2 z-30 pointer-events-none"
              style={{ top: 0, width: 0, height: 0 }}>
              <div className="absolute rounded-full animate-pulse"
                style={{ width:48, height:48, top:-24, left:-24,
                  background:"radial-gradient(circle,rgba(255,203,64,0.25) 0%,transparent 70%)", filter:"blur(8px)" }} />
              <div className="absolute rounded-full"
                style={{ width:28, height:28, top:-14, left:-14,
                  background:"radial-gradient(circle,rgba(255,203,64,0.4) 0%,transparent 70%)", filter:"blur(4px)" }} />
              <div className="absolute rounded-full bg-gold border-2 border-white/60"
                style={{ width:18, height:18, top:-9, left:-9,
                  boxShadow:"0 0 0 4px rgba(255,203,64,0.2),0 0 20px rgba(255,203,64,1),0 0 50px rgba(255,203,64,0.6)" }} />
            </div>

            {/* 2025 row */}
            <div className="relative flex items-center min-h-[8rem]">
              <div ref={card2025Ref} className="w-full pl-16 sm:w-[44%] sm:pr-10 sm:pl-0">
                <YearCard item={entry2025} align="right" />
              </div>
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-20">
                <div ref={dot2025Ref} style={{ opacity: 0 }}
                  className="w-5 h-5 rounded-full border-2 border-gold/60 bg-navy-deeper" />
              </div>
              <div className="hidden sm:block w-[44%] ml-auto" />
            </div>

            {/* 2026 row */}
            <div className="relative flex items-center min-h-[8rem]">
              <div className="hidden sm:block w-[44%]" />
              <div className="absolute left-8 sm:left-1/2 -translate-x-1/2 z-20">
                <div ref={dot2026Ref}
                  style={{ opacity:0, boxShadow:"0 0 20px rgba(255,203,64,0.4)" }}
                  className="w-5 h-5 rounded-full border-2 border-gold bg-navy-deeper" />
              </div>
              <div ref={card2026Ref} className="w-full pl-16 sm:w-[44%] sm:pl-10 sm:ml-auto">
                <YearCard item={entry2026} align="left" highlighted />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function YearCard({ item, align, highlighted }) {
  return (
    <div className={`relative bg-navy-card border rounded-2xl p-7 ${
      highlighted ? "border-gold/50 shadow-[0_0_40px_rgba(255,203,64,0.1)]" : "border-navy-border"
    }`}>
      {highlighted && (
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent rounded-t-2xl" />
      )}
      <span className={`inline-block text-xs font-mono font-black tracking-[0.25em] px-3 py-1 rounded-full border mb-4 ${
        highlighted ? "bg-gold/15 text-gold border-gold/40" : "bg-white/5 text-gold/60 border-navy-border"
      }`}>
        {item.year}
      </span>
      <h4 className={`text-white font-heading font-bold text-xl mb-3 text-left ${align === "right" ? "sm:text-right" : ""}`}>
        {item.title}
      </h4>
      <p className={`text-white-muted text-sm leading-relaxed text-left ${align === "right" ? "sm:text-right" : ""}`}>
        {item.description}
      </p>
    </div>
  );
}
