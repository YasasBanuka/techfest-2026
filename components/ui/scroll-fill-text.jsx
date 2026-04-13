"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollFillText
 * ───────────────
 * Splits text into individual character <span>s.
 * As the user scrolls through this section, each character
 * fills from dim white → electric gold, left to right.
 *
 * The effect:
 *   - Characters start as rgba(255,255,255,0.15) — barely visible outline feel
 *   - scrub: true → animation is tied DIRECTLY to scroll position
 *     (scroll down = fill, scroll up = unfill)
 *   - stagger: each char fills slightly after the previous
 *
 * This pattern is used by Linear, Stripe, and Vercel for hero taglines.
 */
export default function ScrollFillText({ text, className = "" }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const chars = containerRef.current.querySelectorAll(".fill-char");

        const ctx = gsap.context(() => {
            gsap.fromTo(
                chars,
                { color: "rgba(255, 255, 255, 0.12)" },
                {
                    color: "#FFB300",
                    stagger: 0.04,
                    ease: "none",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                        end: "bottom 30%",
                        scrub: 1.5,  // smooth tie to scroll — 1.5s lag for elegance
                    },
                }
            );
        }, containerRef);

        return () => ctx.revert(); // cleanup on unmount
    }, [text]);

    return (
        <p ref={containerRef} className={className} aria-label={text}>
            {text.split("").map((char, i) => (
                <span
                    key={i}
                    className="fill-char inline-block"
                    style={{ color: "rgba(255, 255, 255, 0.12)" }}
                    aria-hidden="true"
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </p>
    );
}
