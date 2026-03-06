"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TIMELINE } from "@/data/about";
import FadeInUp from "@/components/ui/fade-in-up";

gsap.registerPlugin(ScrollTrigger);

/**
 * StoryTimeline
 * ─────────────
 * Vertical timeline of TechFest's history.
 * GSAP draws the connecting line downward as you scroll
 * (scaleY: 0 → 1 on the line, triggered as it enters the viewport).
 * Each milestone card has a staggered FadeInUp entrance.
 */
export default function StoryTimeline() {
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: lineRef.current,
            start: "top 70%",
            end: "bottom 30%",
            scrub: 1,
          },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative max-w-3xl mx-auto">
      {/* Vertical line — drawn by GSAP scroll */}
      <div
        ref={lineRef}
        className="absolute left-6 sm:left-1/2 sm:-translate-x-px top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/30 to-transparent"
        style={{ transformOrigin: "top center", scaleY: 0 }}
      />

      <div className="space-y-10">
        {TIMELINE.map((item, i) => {
          const isRight = i % 2 === 0; // alternate sides on desktop
          return (
            <FadeInUp key={item.year} delay={i * 0.08}>
              <div
                className={`relative flex items-start gap-6 sm:gap-0 ${
                  isRight ? "sm:flex-row" : "sm:flex-row-reverse"
                }`}
              >
                {/* Content card — takes up ~45% width on desktop */}
                <div
                  className={`flex-1 sm:max-w-[45%] ${
                    isRight ? "sm:pr-10 sm:text-right" : "sm:pl-10 sm:text-left"
                  } ml-14 sm:ml-0`}
                >
                  <div
                    className={`relative bg-navy-card border rounded-xl p-5 transition-all duration-300 ${
                      item.highlight
                        ? "border-gold/40 shadow-[0_0_30px_rgba(255,203,64,0.08)]"
                        : "border-navy-border hover:border-gold/20"
                    }`}
                  >
                    {/* Gold top accent for highlighted item */}
                    {item.highlight && (
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent rounded-t-xl" />
                    )}
                    <span
                      className={`text-xs font-mono font-bold tracking-widest mb-2 block ${
                        item.highlight ? "text-gold" : "text-gold/60"
                      }`}
                    >
                      {item.year}
                    </span>
                    <h4 className="text-white font-heading font-bold text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-white-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Center dot — positioned on the line */}
                <div className="absolute left-6 sm:left-1/2 sm:-translate-x-1/2 top-5 flex-shrink-0">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      item.highlight
                        ? "bg-gold border-gold shadow-[0_0_12px_rgba(255,203,64,0.6)]"
                        : "bg-navy-deeper border-gold/50"
                    }`}
                  />
                </div>

                {/* Spacer for opposite side on desktop */}
                <div className="hidden sm:block flex-1 sm:max-w-[45%]" />
              </div>
            </FadeInUp>
          );
        })}
      </div>
    </div>
  );
}
