"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Linkedin, Twitter, UserX } from "lucide-react";
import { TYPE_LABELS, REVEAL_SPEAKERS } from "@/data/speakers";

/**
 * SpeakerCard
 * ────────────
 * Premium speaker card with GSAP 3D tilt on hover (desktop).
 * On mouse move: the card rotates subtly on X and Y axes,
 * creating a depth/parallax feel — used by Stripe, Linear, etc.
 *
 * Features:
 * - Avatar: photo if available, elegant initials placeholder if not
 * - Type badge (Keynote/Workshop/Panel/Lightning)
 * - Name, role, company, topic
 * - Social links reveal on hover
 * - Gold top accent for featured speakers
 */
export default function SpeakerCard({ speaker, onClick }) {
  const cardRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card) return;

    // 3D tilt effect — only on devices that support hover
    const onMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // mouse X relative to card
      const y = e.clientY - rect.top;  // mouse Y relative to card
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Rotate ±8deg max on each axis
      const rotateY =  ((x - cx) / cx) * 8;
      const rotateX = -((y - cy) / cy) * 8;

      gsap.to(card, {
        rotateX,
        rotateY,
        transformPerspective: 800,
        ease: "power1.out",
        duration: 0.3,
      });

      // Move the radial glow to follow the cursor
      if (glow) {
        gsap.to(glow, {
          x: x - 80,
          y: y - 80,
          opacity: 1,
          duration: 0.3,
          ease: "power1.out",
        });
      }
    };

    const onLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        ease: "elastic.out(1, 0.5)",
        duration: 0.8,
      });
      if (glow) {
        gsap.to(glow, { opacity: 0, duration: 0.3 });
      }
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const meta = TYPE_LABELS[speaker.type];

  return (
    <button
      ref={cardRef}
      onClick={onClick}
      className="relative w-full text-left bg-navy-card border rounded-2xl overflow-hidden h-full transition-all duration-500 cursor-pointer group/card"
      style={{
        borderColor: speaker.featured
          ? "#FFB300"
          : "#21262D",
        willChange: "transform",
        transformStyle: "preserve-3d",
      }}
    >
      {/* Featured gold top accent */}
      {speaker.featured && (
        <div className="h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
      )}

      {/* Cursor-tracking radial glow — stays inside card */}
      <div
        ref={glowRef}
        className="absolute w-40 h-40 rounded-full pointer-events-none opacity-0"
        style={{
          background: "radial-gradient(circle, rgba(255,179,0,0.12) 0%, transparent 70%)",
          transform: "translate(0px, 0px)",
        }}
      />

      {/* View Profile Hover Overlay */}
      <div className="absolute inset-0 bg-navy-deeper/40 backdrop-blur-[2px] opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
         <span className="bg-gold text-navy-deeper px-4 py-2 rounded-lg font-heading font-black text-[10px] uppercase tracking-widest translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500 shadow-2xl">
           View Profile
         </span>
      </div>

      <div className="p-6 flex flex-col h-full relative z-10">
        {/* Avatar + type badge */}
        <div className="flex items-start justify-between mb-5">
          {/* Avatar Area */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0 group-hover:scale-110 transition-transform duration-700">
            {!REVEAL_SPEAKERS ? (
              // The 'Ghostly Entity' Replacement
              <div className="w-full h-full bg-navy-deeper border border-white/5 flex items-center justify-center relative">
                 <UserX size={24} className="text-gold/20 animate-pulse" />
                 {/* Scanning Scanning Overlay */}
                 <div className="absolute inset-x-0 h-[1px] bg-gold/40 animate-scan" style={{ top: '50%' }} />
              </div>
            ) : speaker.photo ? (
              <img
                src={speaker.photo}
                alt={speaker.name}
                className="w-full h-full object-cover"
              />
            ) : (
              // Initials placeholder
              <div
                className="w-full h-full flex items-center justify-center font-heading font-black text-lg"
                style={{
                  background: speaker.featured
                    ? "linear-gradient(135deg, rgba(255,179,0,0.2), rgba(18,23,28,0.8))"
                    : "linear-gradient(135deg, rgba(33,38,45,0.8), rgba(10,13,16,0.9))",
                  color: speaker.featured ? "#FFB300" : "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(33,38,45,0.8)",
                }}
              >
                {speaker.initials}
              </div>
            )}
          </div>

          {/* Type badge */}
          <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${meta.color}`}>
            {meta.label}
          </span>
        </div>

        {/* Name + role */}
        <div className="mb-4">
          <h3 className="text-white font-heading font-black text-2xl leading-tight uppercase tracking-tight">
            {REVEAL_SPEAKERS || speaker.id === 'tba' ? speaker.name : `ENTITY_0x0${speaker.id} // TBA`}
          </h3>
          <p className="text-gold text-[12px] mt-2 uppercase font-black tracking-[0.2em] leading-none">
            {speaker.role}
            <span className="text-white-dim block sm:inline sm:ml-2 mt-1 sm:mt-0 opacity-60">[{speaker.company}]</span>
          </p>
        </div>

        {/* Topic */}
        <div className="mb-6 flex-1">
            <p className="text-white-muted text-[11px] leading-relaxed font-medium">
                <span className="text-gold/60 uppercase tracking-widest font-black block mb-1 text-[10px]">Transmission Summary</span>
                {REVEAL_SPEAKERS || speaker.id === 'tba' ? speaker.topic : "LOCKED_ENTITY_RECONSTRUCTION_IN_PROGRESS"}
            </p>
        </div>

        {/* Bio — truncated */}
        <p className={`text-white-dim/70 text-sm leading-relaxed line-clamp-3 mb-8 ${(!REVEAL_SPEAKERS && speaker.id !== 'tba') && 'blur-[2px] opacity-30 select-none'}`}>
          {speaker.bio}
        </p>

        {/* Social links (z-40 to stay clickable above the card overlay) */}
        {!REVEAL_SPEAKERS ? (
            <div className="pt-4 border-t border-white/5 relative z-40">
                <span className="text-[10px] font-mono text-cyan-400/20 uppercase tracking-[0.4em]">Signal_Pending...</span>
            </div>
        ) : (
            <div className="flex items-center gap-2 mt-auto pt-4 border-t border-navy-border relative z-40">
                {/* linkedin/twitter buttons */}
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg border border-navy-border flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/40 transition-all duration-200"
            >
              <Linkedin size={14} />
            </a>
          )}
          {speaker.twitter && (
            <a
              href={speaker.twitter}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 rounded-lg border border-navy-border flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/40 transition-all duration-200"
            >
              <Twitter size={14} />
            </a>
          )}
        </div>
      )}
    </div>
  </button>
);
}
