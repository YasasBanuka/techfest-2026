"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const SCRAMBLE_CHARS = "0123456789";

const TOTAL_FRAMES = 200; // ~3.3s at 60fps
const SETTLE_START = 0.50; // scramble until 50%, then start locking in
const UPDATE_EVERY = 5;   // only update display every 5th frame → ~12fps
// 12fps = each digit flip is clearly visible, like a physical slot machine reel

/**
 * ScrambleNumber
 * ──────────────
 * When this element enters the viewport, digits scramble through random
 * characters then "settle" one by one from left to right into the real value.
 *
 * Phases:
 *  0 → 55%  — All digits randomizing rapidly (full chaos)
 *  55% → 100% — Digits lock in left-to-right, one at a time
 *
 * Looks like a data stream resolving, or a secret being decrypted.
 * Much more dramatic than a simple count-up.
 *
 * Usage:
 *   <ScrambleNumber value="1000+" />
 *   <ScrambleNumber value="30+" />
 */
export default function ScrambleNumber({ value }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });
    const [display, setDisplay] = useState("—");
    const rafRef = useRef(null);

    // Parse the numeric string and suffix separately
    // e.g. "1000+" → { digits: "1000", suffix: "+" }
    const digits = value.replace(/[^0-9]/g, "");
    const suffix = value.replace(/[0-9]/g, "");

    useEffect(() => {
        if (!isInView) return;

        let frame = 0;

        function update() {
            frame++;
            const progress = frame / TOTAL_FRAMES;

            // Only update the display every UPDATE_EVERY frames
            // → digits change at ~20fps: slow enough to read, fast enough to feel frantic
            if (frame % UPDATE_EVERY === 0 || frame >= TOTAL_FRAMES) {
                const result = digits
                    .split("")
                    .map((targetChar, i) => {
                        // Each char locks in at a staggered point — left digit settles first
                        const charSettleAt = SETTLE_START + (i / digits.length) * (1 - SETTLE_START);
                        if (progress >= charSettleAt) return targetChar; // locked
                        return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                    })
                    .join("");

                setDisplay(result + suffix);
            }

            if (frame < TOTAL_FRAMES) {
                rafRef.current = requestAnimationFrame(update);
            }
        }

        // Short delay before starting — lets the card fade-in complete first
        const timeout = setTimeout(() => {
            rafRef.current = requestAnimationFrame(update);
        }, 400); // wait for card fade-in + a beat before scramble starts

        return () => {
            clearTimeout(timeout);
            cancelAnimationFrame(rafRef.current);
        };
    }, [isInView, digits, suffix]);

    return <span ref={ref}>{display}</span>;
}
