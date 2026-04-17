"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

/**
 * SentinelCursor (formerly SparkCursor)
 * ────────────────────────────────────
 * A high-fidelity, dual-layered interactive cursor.
 * - Core: Precise gold pinpoint (tight tracking).
 * - Ring: Ethereal gold circle (organic lag/inertia).
 * - Aura: Soft background bloom (illuminates the mist).
 */
export default function SparkCursor() {
  const coreRef = useRef(null);
  const ringRef = useRef(null);
  const auraRef = useRef(null);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    // JS-level safe-guard to hide system cursor
    const originalCursor = document.body.style.cursor;
    document.body.style.cursor = "none";

    const core = coreRef.current;
    const ring = ringRef.current;
    const aura = auraRef.current;
    if (!core || !ring || !aura) return;

    // Movement tracking
    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      
      // Core: Fast, precise
      gsap.to(core, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: "power2.out"
      });

      // Ring: Organic lag
      gsap.to(ring, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out"
      });

      // Aura: Deep atmospheric lag
      gsap.to(aura, {
        x: clientX,
        y: clientY,
        duration: 0.8,
        ease: "power2.out"
      });
    };

    // Interaction Bloom
    const ignite = () => {
      gsap.to(ring, {
        scale: 2.2,
        borderWidth: "1px",
        borderColor: "rgba(255,179,0,0.6)",
        duration: 0.4,
        ease: "back.out(2)"
      });
      gsap.to(aura, {
        scale: 1.5,
        opacity: 0.15,
        duration: 0.8
      });
      gsap.to(core, {
        scale: 2,
        backgroundColor: "rgba(255,255,255,1)",
        duration: 0.3
      });
    };

    const extinguish = () => {
      gsap.to(ring, {
        scale: 1,
        borderWidth: "1.5px",
        borderColor: "rgba(255,179,0,0.2)",
        duration: 0.6,
        ease: "power2.out"
      });
      gsap.to(aura, {
        scale: 1,
        opacity: 0.08,
        duration: 1
      });
      gsap.to(core, {
        scale: 1,
        backgroundColor: "rgba(255,179,0,0.9)",
        duration: 0.5
      });
    };

    // Global Listeners
    window.addEventListener("mousemove", moveCursor);

    // Initial state
    gsap.set([core, ring, aura], { xPercent: -50, yPercent: -50 });
    gsap.set(aura, { opacity: 0.08 });

    // Track interactives
    const updateInteractives = () => {
      const interactives = document.querySelectorAll('button, a, input, [role="button"], .group');
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", ignite);
        el.addEventListener("mouseleave", extinguish);
      });
    };

    updateInteractives();
    const interval = setInterval(updateInteractives, 2000);

    // Click effect (Bloom)
    const onClick = () => {
       const tl = gsap.timeline();
       tl.to(ring, { scale: 1.5, opacity: 1, duration: 0.2, ease: "power2.out" })
         .to(ring, { scale: 1, opacity: 1, duration: 0.4, ease: "power2.inOut" });
    };
    window.addEventListener("mousedown", onClick);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", onClick);
      document.body.style.cursor = originalCursor;
      clearInterval(interval);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      {/* Layer 1: Atmospheric Aura */}
      <div
        ref={auraRef}
        className="fixed top-0 left-0 w-[600px] h-[600px] rounded-full blur-[80px]"
        style={{
          background: "radial-gradient(circle, rgba(255,179,0,0.15) 0%, transparent 70%)",
          mixBlendMode: "screen",
        }}
      />

      {/* Layer 2: Ethereal Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border-[1.5px] border-gold/60 flex items-center justify-center transition-opacity"
        style={{
           boxShadow: "0 0 25px rgba(255,179,0,0.25), inset 0 0 10px rgba(255,179,0,0.1)"
        }}
      />

      {/* Layer 3: Precise Core */}
      <div
        ref={coreRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-gold/90 rounded-full shadow-[0_0_15px_rgba(255,179,0,0.6)]"
      />
    </div>
  );
}
