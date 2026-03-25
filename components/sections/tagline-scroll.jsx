"use client";

import { useRef, useEffect, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TAGLINE = "Where Innovation Meets Excellence";
const SCROLL_DISTANCE = 3000; // px of pin window
const REVEAL_THRESHOLD = 0.68; // reveal completes at 68% progress
// → remaining 32% (~1760px) is the "hold" pause

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Build word groups for word-safe line breaking:
 * "Where Innovation Meets Excellence" →
 *   [
 *     [{ char:"W", gIdx:0 }, { char:"h", gIdx:1 }, ...],   ← "Where"
 *     [{ char:"I", gIdx:6 }, ...],                          ← "Innovation"
 *     ...
 *   ]
 * This lets us wrap each word in whitespace-nowrap so words never break mid-letter.
 */
function buildWordGroups(text) {
    const wordGroups = [];
    let currentWord = [];
    text.split("").forEach((char, gIdx) => {
        if (char === " ") {
            if (currentWord.length) wordGroups.push(currentWord);
            currentWord = [];
        } else {
            currentWord.push({ char, gIdx });
        }
    });
    if (currentWord.length) wordGroups.push(currentWord);
    return wordGroups;
}

export default function TaglineScroll() {
    const sectionRef = useRef(null);
    const charsRef = useRef([]);   // indexed by global character index
    const subRef = useRef(null);
    const badgeRef = useRef(null);
    const hintRef = useRef(null);

    const wordGroups = useMemo(() => buildWordGroups(TAGLINE), []);

    // Shuffled reveal order — only non-space chars
    const shuffledIndices = useMemo(() => {
        const nonSpaceIdx = TAGLINE.split("").reduce((acc, c, i) => {
            if (c !== " ") acc.push(i);
            return acc;
        }, []);
        return shuffle(nonSpaceIdx);
    }, []);

    useEffect(() => {
        const chars = charsRef.current;
        const totalChars = shuffledIndices.length;
        let lastRevealedCount = 0;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: sectionRef.current,
                pin: true,
                pinSpacing: true,
                start: "top top",
                end: `+=${SCROLL_DISTANCE}`,
                scrub: 1.2,

                onUpdate: (self) => {
                    // Map scroll progress to reveal progress
                    // Reveal is complete at REVEAL_THRESHOLD — after that, text stays full (hold)
                    const revealProgress = Math.min(self.progress / REVEAL_THRESHOLD, 1);
                    const targetCount = Math.floor(revealProgress * totalChars);

                    if (targetCount === lastRevealedCount) return;

                    if (targetCount > lastRevealedCount) {
                        // Scrolling down → reveal chars
                        for (let i = lastRevealedCount; i < targetCount; i++) {
                            const el = chars[shuffledIndices[i]];
                            if (el) {
                                el.style.opacity = "1";
                                el.style.transform = "scale(1) translateY(0px)";
                            }
                        }
                    } else {
                        // Scrolling up → un-reveal chars
                        for (let i = lastRevealedCount - 1; i >= targetCount; i--) {
                            const el = chars[shuffledIndices[i]];
                            if (el) {
                                el.style.opacity = "0";
                                el.style.transform = "scale(0.6) translateY(10px)";
                            }
                        }
                    }

                    lastRevealedCount = targetCount;

                    // Sub-text + badge appear near completion (>85% reveal)
                    const nearDone = revealProgress > 0.85;
                    if (subRef.current) {
                        gsap.to(subRef.current, {
                            opacity: nearDone ? 1 : 0,
                            y: nearDone ? 0 : 24,
                            duration: 0.5,
                            ease: "power2.out",
                            overwrite: true,
                        });
                    }
                    if (badgeRef.current) {
                        gsap.to(badgeRef.current, {
                            opacity: nearDone ? 1 : 0,
                            duration: 0.4,
                            overwrite: true,
                        });
                    }

                    // Scroll hint hides once user starts revealing text
                    if (hintRef.current) {
                        gsap.to(hintRef.current, {
                            opacity: revealProgress < 0.05 ? 1 : 0,
                            duration: 0.3,
                            overwrite: true,
                        });
                    }
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [shuffledIndices]);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden bg-navy-deeper"
        >
            {/* Background depth */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(15,43,105,0.4) 0%, transparent 80%)",
                    }}
                />
                <div className="absolute inset-0 hex-pattern opacity-10" />
            </div>

            {/* Vision badge — fades in near completion */}
            <div
                ref={badgeRef}
                className="absolute top-14 left-1/2 -translate-x-1/2 opacity-0"
            >
                <span className="text-gold/60 text-xs uppercase tracking-[0.3em] font-medium">
                    Our Vision
                </span>
            </div>

            {/* Tagline — word-safe, dominant, large */}
            <div className="relative z-10 text-center w-full max-w-6xl mx-auto">
                <p
                    className="font-heading font-black leading-[1.08] tracking-tight"
                    style={{ fontSize: "clamp(3rem, 9vw, 8rem)" }}
                    aria-label={TAGLINE}
                >
                    {wordGroups.map((wordChars, wIdx) => (
                        <span key={wIdx} className="inline-block whitespace-nowrap">
                            {wordChars.map(({ char, gIdx }) => (
                                <span
                                    key={gIdx}
                                    ref={(el) => (charsRef.current[gIdx] = el)}
                                    aria-hidden="true"
                                    className="inline-block"
                                    style={{
                                        opacity: 0,
                                        color: "#ffcb40",
                                        transition: "opacity 0.1s ease, transform 0.1s ease",
                                        transform: "scale(0.6) translateY(10px)",
                                    }}
                                >
                                    {char}
                                </span>
                            ))}
                            {/* Word gap — always visible, invisible spacer */}
                            {wIdx < wordGroups.length - 1 && (
                                <span
                                    className="inline-block"
                                    style={{ width: "0.35em" }}
                                    aria-hidden="true"
                                />
                            )}
                        </span>
                    ))}
                </p>

                {/* Sub-description — fades in at 85% */}
                <p
                    ref={subRef}
                    className="mt-10 text-white-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed opacity-0"
                    style={{ transform: "translateY(24px)" }}
                >
                    TechFest Sri Lanka 2026 is more than an event — it&apos;s a movement.
                    A gathering of the sharpest minds, boldest ideas, and next-generation leaders.
                </p>
            </div>

            {/* Scroll hint — visible only at start */}
            <div
                ref={hintRef}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white-dim"
            >
                <span className="text-xs uppercase tracking-widest">Scroll to reveal</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="animate-bounce"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </div>
        </section>
    );
}
