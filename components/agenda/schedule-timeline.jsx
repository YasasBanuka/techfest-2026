"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, ChevronDown } from "lucide-react";
import { SESSIONS, TRACKS, TYPE_META } from "@/data/agenda";
import FadeInUp from "@/components/ui/fade-in-up";

gsap.registerPlugin(ScrollTrigger);

/**
 * SessionCard — Individual schedule session
 * Expands on click to show full description (accordion style).
 */
function SessionCard({ session, index }) {
  const [expanded, setExpanded] = useState(false);
  const meta = TYPE_META[session.type];
  const isBreak = session.type === "break";

  if (isBreak) {
    return (
      <div className="flex items-center gap-4 py-3 px-4 rounded-xl border border-dashed border-navy-border">
        <span className="text-white-dim text-xs font-mono w-12 shrink-0">{session.time}</span>
        <div className="w-px h-4 bg-navy-border" />
        <span className="text-white-dim text-sm">{session.title}</span>
      </div>
    );
  }

  return (
    <FadeInUp delay={index * 0.04}>
      <motion.div
        layout
        className={`bg-navy-card border rounded-xl overflow-hidden cursor-pointer transition-colors duration-300 ${
          session.featured
            ? "border-gold/35 hover:border-gold/55"
            : "border-navy-border hover:border-gold/20"
        }`}
        onClick={() => setExpanded((p) => !p)}
      >
        {/* Featured gold top accent */}
        {session.featured && (
          <div className="h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        )}

        <div className="p-5">
          <div className="flex items-start gap-4">
            {/* Time column */}
            <div className="shrink-0 pt-0.5 text-right w-14">
              <span className="text-gold text-xs font-mono font-bold block">{session.time}</span>
              <span className="text-white-dim text-xs font-mono">{session.endTime}</span>
            </div>

            {/* Vertical divider */}
            <div className={`shrink-0 w-px self-stretch ${session.featured ? "bg-gold/40" : "bg-navy-border"}`} />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {/* Type badge */}
                <span className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${meta.color}`}>
                  {meta.label}
                </span>

                {/* Track badge */}
                <span className="text-xs text-white-dim border border-navy-border rounded-full px-2.5 py-0.5 flex items-center gap-1">
                  <MapPin size={10} />
                  {session.track}
                </span>

                {/* Optional badge (e.g. "Limited Seats") */}
                {session.badge && (
                  <span className="text-xs text-amber-300 border border-amber-500/30 bg-amber-500/10 rounded-full px-2.5 py-0.5">
                    {session.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className={`font-heading font-bold text-base leading-snug mb-1 ${
                session.featured ? "text-white" : "text-white"
              }`}>
                {session.title}
              </h3>

              {/* Speaker */}
              {session.speaker && (
                <p className="text-white-dim text-xs">
                  {session.speaker.name}
                  {session.speaker.role && (
                    <span className="text-white-dim/60"> · {session.speaker.role}</span>
                  )}
                </p>
              )}
            </div>

            {/* Expand chevron */}
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              className="shrink-0 text-white-dim mt-0.5"
            >
              <ChevronDown size={16} />
            </motion.div>
          </div>

          {/* Expandable description */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <p className="text-white-muted text-sm leading-relaxed mt-4 pt-4 border-t border-navy-border ml-[4.5rem]">
                  {session.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </FadeInUp>
  );
}

/**
 * ScheduleTimeline — Full agenda with track filter tabs
 */
export default function ScheduleTimeline() {
  const [activeTrack, setActiveTrack] = useState("All");
  const lineRef = useRef(null);

  // GSAP: draw the vertical timeline line on scroll
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return;
      // gsap.set() runs synchronously — forces scaleY(0) before any paint
      // This is the correct GSAP pattern to prevent the initial flash
      gsap.set(lineRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(lineRef.current, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: lineRef.current,
          start: "top 75%",
          end: "bottom 20%",
          scrub: 1.2,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const filtered =
    activeTrack === "All"
      ? SESSIONS
      : SESSIONS.filter((s) => s.track === activeTrack);

  return (
    <div className="max-w-3xl mx-auto">
      {/* ── Track filter tabs ── */}
      <FadeInUp className="mb-10">
        <div className="flex flex-wrap gap-2">
          {TRACKS.map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                activeTrack === track
                  ? "bg-gold text-navy-deeper border-gold font-bold"
                  : "bg-navy-card border-navy-border text-white-muted hover:border-gold/30 hover:text-white"
              }`}
            >
              {track}
            </button>
          ))}
        </div>
      </FadeInUp>

      {/* ── Session list with GSAP line ── */}
      <div className="relative">
        {/* Vertical line that draws as you scroll */}
        <div
          ref={lineRef}
          className="absolute left-[3.1rem] top-0 bottom-0 w-px bg-gradient-to-b from-gold/50 via-gold/20 to-transparent pointer-events-none"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-3"
          >
            {filtered.map((session, index) => (
              <SessionCard
                key={session.id}
                session={session}
                index={index}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
