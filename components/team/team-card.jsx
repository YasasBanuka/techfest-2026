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
export default function TeamCard({ member }) {
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

        // Advanced 3D Parallax Tracker for OOB illusion
        const onMove = (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;

            // Rotate ±10deg max on each axis for deep 3D effect
            const rotateY = ((x - cx) / cx) * 10;
            const rotateX = -((y - cy) / cy) * 10;

            gsap.to(card, {
                rotateX,
                rotateY,
                transformPerspective: 1000,
                ease: "power2.out",
                duration: 0.4,
            });

            // Internal content moves slightly opposite
            if (content) {
                gsap.to(content, {
                    x: ((x - cx) / cx) * -3,
                    y: ((y - cy) / cy) * -3,
                    ease: "power2.out",
                    duration: 0.4,
                });
            }

            // The OOB Image moves *more* to enhance the 3D depth perception
            if (image) {
                gsap.to(image, {
                    x: ((x - cx) / cx) * -8,
                    y: ((y - cy) / cy) * -8,
                    scale: 1.05,
                    ease: "power2.out",
                    duration: 0.4,
                });
            }

            // Internal ambient glow follows cursor
            if (glow) {
                gsap.to(glow, {
                    x: x - 100,
                    y: y - 100,
                    opacity: 1,
                    duration: 0.3,
                    ease: "power2.out",
                });
            }
        };

        const onLeave = () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                ease: "elastic.out(1, 0.4)",
                duration: 1,
            });
            if (content) {
                gsap.to(content, {
                    x: 0,
                    y: 0,
                    ease: "elastic.out(1, 0.4)",
                    duration: 1,
                });
            }
            if (image) {
                gsap.to(image, {
                    x: 0,
                    y: 0,
                    scale: 1,
                    ease: "elastic.out(1, 0.4)",
                    duration: 1,
                });
            }
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
                className={`relative group bg-[#070e1d]/80 backdrop-blur-xl rounded-2xl h-full flex flex-col p-[1px] cursor-pointer transition-shadow duration-500`}
                style={{
                    willChange: "transform",
                    transformStyle: "preserve-3d",
                    boxShadow: member.featured ? "0 10px 40px -10px rgba(255,203,64,0.15)" : "0 10px 40px -10px rgba(0,0,0,0.5)",
                }}
            >
                {/* Static Border (Fallback) */}
                <div className={`absolute inset-0 rounded-2xl z-0 ${member.featured ? 'bg-gradient-to-b from-gold/40 to-navy-border/20' : 'bg-gradient-to-b from-white/10 to-transparent'}`} />

                {/* Inner Card Container Wrapper - No overflow hidden, no styling that clips children */}
                <div className="relative z-10 h-full flex flex-col">

                    {/* The masked background layer to create the fade effect */}
                    <div
                        className="absolute inset-0 bg-[#0a1122] rounded-[15px] z-0"
                        style={{
                            maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
                            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)"
                        }}
                    >
                        {/* Ambient Cursor Glow inside inner card */}
                        <div
                            ref={glowRef}
                            className="absolute w-[200px] h-[200px] pointer-events-none opacity-0 mix-blend-screen z-0"
                            style={{
                                background: "radial-gradient(circle, rgba(255,203,64,0.12) 0%, transparent 70%)",
                                transform: "translate(0px, 0px)",
                            }}
                        />
                    </div>

                    {/* Top Accent line (sits behind the OOB image) 
                        Moved down slightly to be visible under the new fade mask */}
                    <div className={`mt-8 h-[2px] w-full z-20 ${member.featured ? 'bg-gradient-to-r from-gold/20 via-gold to-gold/20' : 'bg-gradient-to-r from-navy-border via-white/20 to-navy-border'}`} />

                    {/* ── The OUT-OF-BOUNDS Image ── */}
                    <div
                        ref={imageRef}
                        className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[320px] h-[360px] z-10 pointer-events-none drop-shadow-[0_15px_15px_rgba(0,0,0,0.8)] opacity-70 group-hover:opacity-100 transition-opacity duration-300"
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
                            <div className="w-40 h-40 absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full overflow-hidden shadow-2xl flex items-center justify-center font-heading font-black text-3xl border-4 border-[#0a1122]"
                                style={{
                                    background: member.featured
                                        ? "linear-gradient(135deg, rgba(255,203,64,0.4), rgba(15,43,105,1))"
                                        : "linear-gradient(135deg, rgba(30,58,122,0.8), rgba(9,29,71,1))",
                                    color: member.featured ? "#ffcb40" : "rgba(255,255,255,0.8)",
                                }}>
                                {initials}
                            </div>
                        )}
                    </div>

                    {/* Subtle gradient overlay to ensure text is readable over the image */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1122] via-[#0a1122]/80 to-transparent z-10 pointer-events-none rounded-[15px]" />

                    {/* Content Wrapper */}
                    <div ref={contentRef} className="relative flex flex-col items-center flex-1 pt-12 pb-6 px-4 text-center z-20">
                        <h3 className="text-white font-heading font-bold text-2xl mb-1 tracking-wide group-hover:text-gold transition-colors duration-300 drop-shadow-md">
                            {member.name}
                        </h3>

                        <p className={`text-sm font-medium tracking-wide mb-3 drop-shadow-md ${member.featured ? "text-gold/90" : "text-white-dim"}`}>
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
                            className="flex items-center justify-center gap-2 py-4 w-full text-white-dim hover:text-[#0a66c2] transition-colors duration-300"
                            aria-label={`LinkedIn profile for ${member.name}`}
                        >
                            <Linkedin size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
                            <span className="text-xs font-medium tracking-wider uppercase opacity-80 group-hover:opacity-100 transition-opacity">Connect</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
