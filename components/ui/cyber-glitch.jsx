"use client";

import { useEffect } from "react";
import { gsap } from "gsap";

/**
 * CyberGlitch
 * ───────────
 * A global system that injects random, intermittent 'Cyber-Noir' glitches.
 * It simulates digital instability through rapid, subtle frame shifts
 * and color aberrations.
 */
export default function CyberGlitch() {
  useEffect(() => {
    // We'll target the main content area for glitches
    const target = document.querySelector("main");
    if (!target) return;

    const triggerGlitch = () => {
      const tl = gsap.timeline();

      // Rapid-fire random jitter
      tl.to(target, {
        skewX: () => (Math.random() - 0.5) * 2,
        x: () => (Math.random() - 0.5) * 5,
        scaleY: () => 1 + (Math.random() - 0.5) * 0.02,
        filter: "contrast(1.2) brightness(1.1) hue-rotate(5deg)",
        duration: 0.05,
        ease: "none",
      })
      .to(target, {
        skewX: 0,
        x: 0,
        scaleY: 1,
        filter: "contrast(1) brightness(1) hue-rotate(0deg)",
        duration: 0.05,
        ease: "none",
      })
      .to(target, {
        opacity: 0.95,
        duration: 0.03,
      })
      .to(target, {
        opacity: 1,
        duration: 0.03,
      });

      // Schedule next glitch at a random interval (5-15 seconds)
      const nextDelay = Math.random() * 10000 + 5000;
      setTimeout(triggerGlitch, nextDelay);
    };

    // Initial delay before first glitch
    const initialDelay = Math.random() * 5000 + 3000;
    const timerId = setTimeout(triggerGlitch, initialDelay);

    return () => clearTimeout(timerId);
  }, []);

  return null; // Side-effect component
}
