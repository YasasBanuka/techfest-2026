"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * IgnitionWrapper
 * ───────────────
 * A high-performance GSAP ScrollTrigger wrapper that 'ignites' content.
 * As a section enters the viewport, it scales specifically and glows,
 * symbolizing the 'light in the dark' concept.
 */
export default function IgnitionWrapper({ children, className = "" }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const isMobile = window.innerWidth < 768;

    gsap.fromTo(el, 
      { 
        opacity: 0, 
        y: isMobile ? 20 : 40,
        filter: isMobile ? "brightness(0.5)" : "brightness(0.5) blur(10px)",
        scale: isMobile ? 1 : 0.98
      },
      {
        opacity: 1,
        y: 0,
        filter: isMobile ? "brightness(1)" : "brightness(1) blur(0px)",
        scale: 1,
        duration: isMobile ? 0.6 : 1.2,
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
