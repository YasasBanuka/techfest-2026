"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * SparkCursor
 * ───────────
 * An interactive mouse follower that acts like a 'Torch' in the dark Cyber-Noir world.
 * It's a soft amber glow that illuminates the background.
 * It 'ignites' (grows/brightens) when hovering over interactive elements.
 */
export default function SparkCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Movement logic
    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    // Ignition logic (hovering over buttons/links)
    const onMouseEnter = () => {
      gsap.to(cursor, {
        scale: 2.5,
        opacity: 0.15,
        duration: 0.5,
      });
    };

    const onMouseLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        opacity: 0.08,
        duration: 0.5,
      });
    };

    window.addEventListener("mousemove", moveCursor);

    // Initial scale and opacity
    gsap.set(cursor, { scale: 1, opacity: 0.08, xPercent: -50, yPercent: -50 });

    // Track interactive elements
    const updateInteractives = () => {
      const interactives = document.querySelectorAll('button, a, input, [role="button"]');
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", onMouseEnter);
        el.addEventListener("mouseleave", onMouseLeave);
      });
    };

    updateInteractives();

    // Re-check periodically for new dynamic elements
    const interval = setInterval(updateInteractives, 2000);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-[400px] h-[400px] pointer-events-none z-[50] rounded-full"
      style={{
        background: "radial-gradient(circle, rgba(255,179,0,0.4) 0%, transparent 70%)",
        filter: "blur(40px)",
        mixBlendMode: "screen",
      }}
    />
  );
}
