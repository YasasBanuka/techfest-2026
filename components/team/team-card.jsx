"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Linkedin } from "lucide-react";

/**
 * TeamCard (V3 - "Out of Bounds" Arch Design)
 * ────────────
 * Features an arched top that complements a portrait image breaking out of the top.
 * Elegant glassmorphism base and unified LinkedIn footer.
 */
export default function TeamCard({ member, onClick }) {
    const cardRef = useRef(null);
    const glowRef = useRef(null);
    const contentRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const card = cardRef.current;
        const glow = glowRef.current;
        const content = contentRef.current;
        const image = imageRef.current;
        if (!card) return;

        // Advanced 3D Parallax Tracker removed as per user request (static card feel)
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Internal ambient glow follows cursor
            if (glow) {
                gsap.to(glow, {
                    x: x - 200, // centered for 400px glow
                    y: y - 200,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        const onLeave = () => {
            if (glow) {
                gsap.to(glow, { opacity: 0, duration: 0.5 });
            }
        };

        card.addEventListener("mousemove", onMove);
        card.addEventListener("mouseleave", onLeave);
        return () => {
            card.removeEventListener("mousemove", onMove);
            card.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    const initials = member.name.substring(0, 2).toUpperCase();

    return (
        <div className="relative pt-[160px] h-[400px] w-full max-w-[280px] mx-auto">
            {/* ── Main Card Base ── */}
            <div
                ref={cardRef}
                onClick={onClick}
                className="relative group bg-[#12171C]/80 backdrop-blur-xl rounded-2xl h-full flex flex-col p-[1px] cursor-pointer transition-all duration-500 hover:border-gold/40 hover:shadow-[0_0_40px_rgba(255,179,0,0.15)] border-transparent"
                style={{
                    willChange: "transform",
                }}
            >
                {/* Static Border (Fallback) */}
                <div className="absolute inset-0 rounded-2xl z-0 bg-gradient-to-b from-white/10 to-transparent" />

                {/* Inner Card Container Wrapper - No overflow hidden, no styling that clips children */}
                <div className="relative z-10 h-full flex flex-col">

                    {/* The masked background layer to create the fade effect */}
                    <div
                        className="absolute inset-0 bg-[#12171C] rounded-[15px] z-0"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
                        }}
                    >
                        {/* Ambient Cursor Glow inside inner card - ENHANCED */}
                        <div
                            ref={glowRef}
                            className="absolute w-[400px] h-[400px] pointer-events-none opacity-0 mix-blend-screen z-0"
                            style={{
                                background: "radial-gradient(circle, rgba(255,179,0,0.2) 0%, transparent 70%)",
                                transform: "translate(0px, 0px)",
                            }}
                        />
                    </div>

                    {/* Top Accent line (sits behind the OOB image) 
                        Moved down slightly to be visible under the new fade mask */}
                    <div className="mt-8 h-[2px] w-full z-20 bg-gradient-to-r from-navy-border via-white/20 to-navy-border" />

                    {/* ── The OUT-OF-BOUNDS Image ── */}
                    <div
                        ref={imageRef}
                        className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[320px] h-[360px] z-10 pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] opacity-100 md:opacity-70 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        {member.image ? (
                            <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-contain object-bottom"
                                sizes="(max-width: 768px) 256px, 256px"
                            />
                        ) : (
                            // Fallback if no actual image exists
                            <div className="w-40 h-40 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl flex items-center justify-center font-heading font-black text-3xl border-4 border-[#12171C]"
                                style={{
                                    background: "linear-gradient(135deg, rgba(18,23,28,0.8), rgba(10,13,16,1))",
                                    color: "rgba(255,255,255,0.8)",
                                }}>
                                {initials}
                            </div>
                        )}
                    </div>

                    {/* Subtle gradient overlay to ensure text is readable over the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12171C] via-[#12171C]/80 to-transparent z-10 pointer-events-none rounded-[15px]" />

                    {/* Content Wrapper */}
                    <div ref={contentRef} className="relative flex flex-col items-center flex-1 pt-12 pb-6 px-4 text-center z-20">
                        <h3 className="text-white font-heading font-bold text-2xl mb-1 tracking-wide group-hover:text-gold transition-colors duration-300 drop-shadow-md">
                            {member.name}
                        </h3>

                        <p className="text-sm font-medium tracking-wide mb-3 drop-shadow-md text-white-dim">
                            {member.role}
                        </p>

                        <div className="mt-auto w-full">
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-navy-deeper/80 border border-white/5 text-white-muted text-xs font-semibold tracking-[0.15em] uppercase shadow-lg backdrop-blur-md">
                                {member.university}
                            </span>
                        </div>
                    </div>

                    {/* Elegant Footer / LinkedIn Link */}
                    <div className="relative z-20 mt-auto border-t border-white/5 bg-white/[0.02] backdrop-blur-md group-hover:bg-white/[0.04] transition-colors duration-300 rounded-b-[15px]">
                        <a
                            href={member.linkedin || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-4 w-full text-white-dim hover:text-gold transition-colors duration-300"
                            aria-label={`LinkedIn profile for ${member.name}`}
                        >
                            <Linkedin size={16} className="opacity-100 md:opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xs font-medium tracking-wider uppercase opacity-100 md:opacity-80 group-hover:opacity-100 transition-opacity">Connect</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
