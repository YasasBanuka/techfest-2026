"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * CyberHorizon Component
 * ──────────────────────
 * Desktop: A 3D perspective grid floor that 'scrolls' toward the user.
 * Mobile:  Static perspective grid — same visual, no GSAP animation.
 */
export default function CyberHorizon() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Skip GSAP animations on mobile/touch devices
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      gsap.to(".grid-floor", {
        backgroundPositionY: "40px",
        repeat: -1,
        duration: 2,
        ease: "none",
      });

      // Random 'data pulses' across the grid
      const pulses = gsap.utils.toArray(".grid-pulse");
      pulses.forEach((pulse) => {
        gsap.to(pulse, {
          opacity: 0.15,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          delay: Math.random() * 5,
          ease: "sine.inOut"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[1] flex items-center justify-center overflow-hidden">

      {/* Perspective Container */}
      <div className="absolute inset-0 preserve-3d" style={{ perspective: "800px" }}>

        {/* The Grid Floor */}
        <div
          className="grid-floor absolute bottom-0 left-[-50%] w-[200%] h-[120%] origin-bottom"
          style={{
            transform: "rotateX(65deg)",
            backgroundImage: `
              linear-gradient(to right, rgba(255, 179, 0, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 179, 0, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px"
          }}
        />

        {/* Floating Data Pulses — desktop only (opacity-0 on mobile = invisible) */}
        <div
          className="grid-pulse absolute top-1/2 left-[-20%] w-[140%] h-[1px] bg-cyan-400/20 blur-[2px] opacity-0"
          style={{ transform: "translateY(50px) rotateX(65deg)" }}
        />
        <div
          className="grid-pulse absolute top-1/2 left-[-20%] w-[140%] h-[1px] bg-cyan-400/20 blur-[2px] opacity-0"
          style={{ transform: "translateY(150px) rotateX(65deg)" }}
        />
        <div
          className="grid-pulse absolute top-1/2 left-[-20%] w-[140%] h-[1px] bg-gold/10 blur-[2px] opacity-0"
          style={{ transform: "translateY(-100px) rotateX(65deg)" }}
        />

      </div>

      {/* Atmospheric Fog */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deeper via-transparent to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-navy-deeper via-transparent to-transparent" />

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}
