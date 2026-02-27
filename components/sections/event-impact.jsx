"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMPACT_STATS, GALLERY_2025 } from "@/data/gallery-2025";

gsap.registerPlugin(ScrollTrigger);

/**
 * EventImpact — Cinematic pinned scroll sequence
 * ────────────────────────────────────────────────
 * A single pinned section that plays a full story as you scroll:
 *
 *  Scene 1: Dark screen → circle expands (portal reveal)
 *  Scene 2: "GLIMPSE / OF / 2025" — each word slides in from right,
 *           holds center-screen, slides out left (one per panel)
 *  Scene 3: 3 impact photos zoom in one by one — each with a stat overlay
 *           (700+ Participants, 10 Expert Speakers, 30+ Stalls)
 *  Scene 4: Photos zoom all the way out → full gallery mosaic fills screen
 *  Scene 5: Hold — pin releases → page continues to Communities
 *
 * Technical:
 *  - GSAP timeline + ScrollTrigger pin (single RAF-driven timeline)
 *  - scrub: 1.5 → buttery smooth, slight lag feels cinematic not mechanical
 *  - All initial states set via inline style (prevents flash before GSAP runs)
 *  - All elements absolutely positioned inside the pin container
 */

// The 3-word phrase revealed horizontally
const PHRASE = ["GLIMPSE", "OF", "2025"];

// Total scroll distance the pin occupies (in px)
const SCROLL_DISTANCE = 11000;

export default function EventImpact() {
    const sectionRef = useRef(null);
    const contentRef = useRef(null); // the circle-clipped inner container
    const wordsRef = useRef([]);   // word panels [0,1,2]
    const photosRef = useRef([]);   // photo scenes [0,1,2]
    const statsRef = useRef([]);   // stat overlays [0,1,2]
    const galleryRef = useRef(null); // gallery mosaic
    const labelRef = useRef(null); // top label

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "power2.inOut" },
                scrollTrigger: {
                    trigger: sectionRef.current,
                    pin: true,
                    pinSpacing: true,
                    start: "top top",
                    end: `+=${SCROLL_DISTANCE}`,
                    scrub: 1.5,
                },
            });

            // ─────────────────────────────────────────────────────
            // SCENE 1: Circle clip-path expands (portal opening)
            // ─────────────────────────────────────────────────────
            tl.fromTo(
                contentRef.current,
                { clipPath: "circle(36px at 50% 50%)" },
                { clipPath: "circle(200% at 50% 50%)", duration: 2, ease: "power3.inOut" }
            );

            // Label fades in slightly after circle opens
            tl.fromTo(labelRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 }, "-=0.8");

            // ─────────────────────────────────────────────────────
            // SCENE 2: Word-by-word horizontal reveal
            // Each word: enters from right → holds → exits left
            // ─────────────────────────────────────────────────────
            PHRASE.forEach((_, i) => {
                const word = wordsRef.current[i];
                tl
                    // Slide in from right
                    .fromTo(
                        word,
                        { x: "110vw" },
                        { x: "0vw", duration: 0.9, ease: "power3.out" }
                    )
                    // Hold at center
                    .to(word, { duration: 0.7 })
                    // Slide out to left
                    .to(word, { x: "-110vw", duration: 0.8, ease: "power3.in" });
            });

            // Brief pause after last word exits
            tl.to({}, { duration: 0.5 });

            // ─────────────────────────────────────────────────────
            // SCENE 3: Photo zoom-in cycle with stat overlays
            // Each photo:
            //   → Zooms IN from 2.5× (camera rushes toward it)
            //   → Stat text fades in as photo reaches 1×
            //   → Hold
            //   → Photo + stat zoom OUT together (camera pulls back)
            // ─────────────────────────────────────────────────────
            IMPACT_STATS.forEach((_, i) => {
                const photo = photosRef.current[i];
                const stat = statsRef.current[i];

                tl
                    // Zoom in (starts at 2.5× and comes to rest at 1×)
                    .fromTo(
                        photo,
                        { scale: 2.5, opacity: 0 },
                        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" }
                    )
                    // Stat overlay fades in as photo settles
                    .fromTo(
                        stat,
                        { opacity: 0, scale: 0.85 },
                        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
                        "-=0.5"
                    )
                    // Hold
                    .to({}, { duration: 0.8 })
                    // Stat fades first
                    .to(stat, { opacity: 0, duration: 0.4, ease: "power1.in" })
                    // Photo zooms out and disappears
                    .to(
                        photo,
                        { scale: 0.15, opacity: 0, duration: 1, ease: "power2.in" },
                        "-=0.3"
                    );
            });

            // Brief pause before gallery reveal
            tl.to({}, { duration: 0.4 });

            // ─────────────────────────────────────────────────────
            // SCENE 4: Gallery mosaic fills the screen
            // ─────────────────────────────────────────────────────
            tl.fromTo(
                galleryRef.current,
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.out" }
            );

            // ─────────────────────────────────────────────────────
            // SCENE 5: Hold on gallery before pin releases
            // ─────────────────────────────────────────────────────
            tl.to({}, { duration: 2.5 });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden"
            style={{ background: "#060f24" }}
        >
            {/* Dark base background — visible before circle opens */}
            <div className="absolute inset-0" style={{ background: "#060f24" }} />

            {/*
        Content container — everything lives inside here.
        clip-path starts as tiny circle, GSAP expands it to full screen.
        Initial style matches GSAP "from" state to prevent flash.
      */}
            <div
                ref={contentRef}
                className="absolute inset-0"
                style={{
                    clipPath: "circle(36px at 50% 50%)",
                    background: "linear-gradient(180deg, #091d47 0%, #060f24 100%)",
                }}
            >
                {/* ── Top label ── */}
                <div
                    ref={labelRef}
                    className="absolute top-12 left-1/2 -translate-x-1/2 z-20 opacity-0"
                >
                    <span className="text-gold/50 text-xs uppercase tracking-[0.35em] font-medium">
                        TechFest 2025
                    </span>
                </div>

                {/* ── PHRASE WORDS (one per panel, stacked, slide horizontally) ── */}
                {PHRASE.map((word, i) => (
                    <div
                        key={word}
                        ref={(el) => (wordsRef.current[i] = el)}
                        className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
                        style={{ transform: "translateX(110vw)" }}
                    >
                        <span
                            className="font-heading font-black tracking-tighter select-none"
                            style={{
                                fontSize: "clamp(4rem, 16vw, 14rem)",
                                color: "#ffcb40",
                                lineHeight: 1,
                                textShadow: "0 0 80px rgba(255,203,64,0.3)",
                            }}
                        >
                            {word}
                        </span>
                    </div>
                ))}

                {/* ── PHOTO SCENES (stacked, each initially invisible+tiny) ── */}
                {IMPACT_STATS.map((impact, i) => (
                    <div
                        key={i}
                        ref={(el) => (photosRef.current[i] = el)}
                        className="absolute inset-0 z-10"
                        style={{ opacity: 0, transform: "scale(2.5)" }}
                    >
                        {/* Real photo */}
                        <img
                            src={impact.src}
                            alt={`TechFest 2025 — ${impact.label}`}
                            className="absolute inset-0 w-full h-full object-cover"
                        />

                        {/* Photo dark overlay for readability */}
                        <div
                            className="absolute inset-0"
                            style={{ background: "rgba(6,15,36,0.45)" }}
                        />

                        {/* Hex texture */}
                        <div className="absolute inset-0 hex-pattern opacity-10" />

                        {/* Stat overlay */}
                        <div
                            ref={(el) => (statsRef.current[i] = el)}
                            className="absolute inset-0 flex flex-col items-center justify-center z-10"
                            style={{ opacity: 0, transform: "scale(0.85)" }}
                        >
                            <p
                                className="font-heading font-black text-gold leading-none"
                                style={{
                                    fontSize: "clamp(5rem, 18vw, 16rem)",
                                    textShadow: "0 0 60px rgba(255,203,64,0.4)",
                                }}
                            >
                                {impact.stat}
                            </p>
                            <p
                                className="text-white font-heading font-semibold tracking-widest uppercase mt-4"
                                style={{ fontSize: "clamp(1rem, 3vw, 2.5rem)" }}
                            >
                                {impact.label}
                            </p>
                        </div>
                    </div>
                ))}

                {/* ── GALLERY MOSAIC (full-screen grid, initially invisible) ── */}
                <div
                    ref={galleryRef}
                    className="absolute inset-0 z-10"
                    style={{ opacity: 0, transform: "scale(0.6)" }}
                >
                    <div
                        className="w-full h-full grid"
                        style={{
                            gridTemplateColumns: "repeat(6, 1fr)",
                            gridTemplateRows: "repeat(4, 1fr)",
                            gap: "2px",
                        }}
                    >
                        {GALLERY_2025.map((item) => (
                            <div key={item.id} className="overflow-hidden">
                                <img
                                    src={item.src}
                                    alt=""
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Gallery overlay text */}
                    <div className="absolute inset-0 flex items-end justify-center pb-10 z-20">
                        <p className="text-white/50 text-xs uppercase tracking-[0.3em]">
                            TechFest 2025 — Memories
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
