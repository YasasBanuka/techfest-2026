"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Linkedin, Twitter } from "lucide-react";
import { TYPE_LABELS } from "@/data/speakers";

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
export default function SpeakerCard({ speaker }) {
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
    <div
      ref={cardRef}
      className="relative bg-navy-card border rounded-2xl overflow-hidden h-full transition-colors duration-300 cursor-default"
      style={{
        borderColor: speaker.featured
          ? "rgba(255,203,64,0.35)"
          : "rgba(30,58,122,1)",
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
          background: "radial-gradient(circle, rgba(255,203,64,0.12) 0%, transparent 70%)",
          transform: "translate(0px, 0px)",
        }}
      />

      <div className="p-6 flex flex-col h-full relative z-10">
        {/* Avatar + type badge */}
        <div className="flex items-start justify-between mb-5">
          {/* Avatar */}
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden flex-shrink-0">
            {speaker.photo ? (
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
                    ? "linear-gradient(135deg, rgba(255,203,64,0.2), rgba(15,43,105,0.8))"
                    : "linear-gradient(135deg, rgba(30,58,122,0.8), rgba(9,29,71,0.9))",
                  color: speaker.featured ? "#ffcb40" : "rgba(255,255,255,0.6)",
                  border: "1px solid rgba(30,58,122,0.8)",
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
        <div className="mb-3">
          <h3 className="text-white font-heading font-bold text-lg leading-snug">
            {speaker.name}
          </h3>
          <p className="text-white-dim text-sm mt-0.5">
            {speaker.role}
            <span className="text-white-dim/50"> · </span>
            <span className="text-gold/80 text-xs">{speaker.company}</span>
          </p>
        </div>

        {/* Topic */}
        <p className="text-white-muted text-xs leading-relaxed mb-4 flex-1">
          <span className="text-white-dim/50 uppercase tracking-wider text-[10px]">Topic: </span>
          {speaker.topic}
        </p>

        {/* Bio — truncated */}
        <p className="text-white-dim/70 text-xs leading-relaxed line-clamp-3 mb-5">
          {speaker.bio}
        </p>

        {/* Social links */}
        <div className="flex items-center gap-2 mt-auto pt-4 border-t border-navy-border">
          {speaker.linkedin && (
            <a
              href={speaker.linkedin}
              target="_blank"
              rel="noopener noreferrer"
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
              className="w-8 h-8 rounded-lg border border-navy-border flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/40 transition-all duration-200"
            >
              <Twitter size={14} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
