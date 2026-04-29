"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * SmoothScrollProvider
 * ─────────────────────
 * Wraps the entire app with Lenis smooth scrolling.
 *
 * What Lenis does:
 *   → Intercepts native scroll events
 *   → Replaces them with smooth, physics-based interpolation
 *   → Result: that buttery "momentum" scroll you see on Awwwards sites
 *
 * What the GSAP connection does:
 *   → lenis.on("scroll", ScrollTrigger.update) keeps GSAP's scroll
 *     trigger in sync with Lenis's virtual scroll position
 *   → Without this, ScrollTrigger would use native scroll position
 *     which lags behind Lenis = broken animations
 *   → gsap.ticker drives Lenis's RAF loop so both systems share one frame
 */
export default function SmoothScrollProvider({ children }) {
    useEffect(() => {
        // Only initialize Lenis on non-touch devices
        // Mobile/Tablet browsers have high-quality native momentum scroll
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            console.log("Smooth scroll disabled for touch device");
            return;
        }

        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // expo ease
            smoothWheel: true,
            wheelMultiplier: 1.1,
            touchMultiplier: 2.0,
            smoothTouch: false, // Ensure native touch scroll is untouched
        });

        // Keep GSAP ScrollTrigger in sync with Lenis scroll position
        lenis.on("scroll", ScrollTrigger.update);

        // Define ticker function to ensure it can be removed properly
        const updateLenis = (time) => {
            lenis.raf(time * 1000);
        };

        // Let GSAP drive Lenis's animation frame (shared RAF loop)
        gsap.ticker.add(updateLenis);

        // Prevent GSAP from compensating for lag (Lenis handles this)
        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            gsap.ticker.remove(updateLenis);
        };
    }, []);

    return <>{children}</>;
}
