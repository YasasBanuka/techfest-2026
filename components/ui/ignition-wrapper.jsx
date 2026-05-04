"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * IgnitionWrapper
 * ───────────────
 * Desktop: GSAP ScrollTrigger brightness + blur + y-slide reveal.
 * Mobile:  Children are immediately visible — no GSAP, no scroll hooks.
 */
export default function IgnitionWrapper({ children, className = "" }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    // Skip all animation on mobile — content is immediately visible
    const isMobile = window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isMobile) return;

    gsap.fromTo(el,
      {
        opacity: 0,
        y: 40,
        filter: "brightness(0.5) blur(10px)",
        scale: 0.98
      },
      {
        opacity: 1,
        y: 0,
        filter: "brightness(1) blur(0px)",
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
        }
      }
    );
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}
