"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, MapPin, ChevronDown, Activity, Hash, Layers } from "lucide-react";
import { SESSIONS, TRACKS, TYPE_META } from "@/data/agenda";
import FadeInUp from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";

gsap.registerPlugin(ScrollTrigger);

/**
 * SessionCard — Temporal Node
 * ──────────────────────────────
 * High-tech node in the Chronicle Stream.
 * Features misty manifestation and HUD annotations.
 */
function SessionCard({ session, index, isHovered, onHover }) {
  const [expanded, setExpanded] = useState(false);
  const isBreak = session.type === "break";

  if (isBreak) {
    return (
      <div className="flex items-center gap-6 py-4 px-6 rounded-xl border border-dashed border-white/10 opacity-60 ml-8">
        <span className="text-white/40 text-[10px] font-mono font-black w-20 shrink-0 uppercase tracking-widest">{session.time}</span>
        <div className="w-px h-4 bg-white/10" />
        <span className="text-white/60 text-[10px] font-mono uppercase tracking-[0.2em]">{session.title}</span>
      </div>
    );
  }

  return (
    <FadeInUp delay={index * 0.04}>
      <div 
        onMouseEnter={() => onHover(true)} 
        onMouseLeave={() => onHover(false)}
        className="relative"
      >
        <motion.div
           layout
           className={`group relative ml-8 cursor-pointer transition-all duration-500`}
           onClick={() => setExpanded((p) => !p)}
        >
          <CyberModule 
            className={`!p-0 bg-navy-card/40 border-white/5 overflow-hidden transition-all duration-700 
              ${expanded ? "border-gold/40 shadow-[0_0_40px_rgba(255,179,0,0.1)]" : "hover:border-white/20"}
            `}
          >
            {/* Top Identity Line */}
            <div className={`h-[1px] w-full transition-all duration-700 ${expanded || session.featured ? "bg-gold/40" : "bg-white/5 group-hover:bg-white/10"}`} />

            <div className="p-6 md:p-8">
              <div className="flex items-start gap-6">
                
                {/* Time Cluster */}
                <div className="shrink-0 pt-1 text-right w-20">
                   <div className="flex items-center justify-end gap-2 mb-1">
                      <span className="text-gold text-[10px] font-mono font-black uppercase tracking-widest">{session.time}</span>
                      <Activity size={10} className="text-gold animate-pulse" />
                   </div>
                   <span className="text-white/20 text-[9px] font-mono uppercase tracking-widest">{session.endTime}</span>
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-4 mb-4">
                    {/* Monochrome Type Badge */}
                    <span className="text-[9px] font-mono text-gold border border-gold/20 bg-gold/5 px-2 py-0.5 uppercase tracking-widest rounded-sm">
                      {session.type}
                    </span>

                    {/* Channel / Track */}
                    <div className="flex items-center gap-2 text-[9px] font-mono text-white/30 uppercase tracking-[0.3em]">
                       <Layers size={10} />
                       CH_0{session.track === "Track 1" ? "1" : "2"}
                    </div>

                    {/* Session Sequence HUD */}
                    <div className="hidden sm:flex items-center gap-2 text-[9px] font-mono text-white/10 uppercase tracking-[0.3em]">
                       <Hash size={10} />
                       SEQ_0{session.id}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className={`text-lg md:text-xl font-heading font-black leading-tight mb-2 uppercase tracking-tight
                    ${expanded ? "gold-gradient-text" : "text-white"}
                  `}>
                    {session.title}
                  </h3>

                  {/* Speaker */}
                  {session.speaker && (
                    <div className="flex items-center gap-3">
                       <span className="w-4 h-px bg-gold/30" />
                       <p className="text-white-dim text-xs font-light italic">
                         {session.speaker.name}
                         {session.speaker.role && (
                           <span className="text-white/30 not-italic ml-2">[{session.speaker.role.toUpperCase()}]</span>
                         )}
                       </p>
                    </div>
                  )}

                  {/* Expandable Manifestation */}
                  <AnimatePresence>
                    {expanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                        animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                        exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="text-white-dim text-sm leading-relaxed mt-6 pt-6 border-t border-white/5 font-light italic">
                          {session.description}
                        </p>
                        
                        {/* Technical Footer */}
                        <div className="mt-6 flex items-center justify-between opacity-20">
                           <span className="text-[8px] font-mono tracking-[0.5em] uppercase">INTEGRITY:_LOCKED</span>
                           <span className="text-[8px] font-mono tracking-[0.5em] uppercase">ACCESS_LEVEL:_PUBLIC</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Minimalist Expand Trigger */}
                <motion.div
                  animate={{ rotate: expanded ? 45 : 0 }}
                  className="shrink-0 text-white/20 mt-1"
                >
                  <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center hover:border-white/20 transition-colors">
                     <ChevronDown size={14} />
                  </div>
                </motion.div>
              </div>
            </div>
          </CyberModule>
        </motion.div>
      </div>
    </FadeInUp>
  );
}

/**
 * ScheduleTimeline — The Chronicle Stream
 * ──────────────────────────────────────
 * Vertical timeline with pulse effects and terminal-style filters.
 */
export default function ScheduleTimeline() {
  const [activeTrack, setActiveTrack] = useState("All");
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!lineRef.current) return;
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
    <div className="max-w-4xl mx-auto">
      
      {/* ── Terminal Selector (Filters) ── */}
      <FadeInUp className="mb-16 flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex flex-wrap gap-3">
          {TRACKS.map((track) => (
            <button
              key={track}
              onClick={() => setActiveTrack(track)}
              className={`px-6 py-2 rounded-xl text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-300 border ${
                activeTrack === track
                  ? "bg-gold text-navy-deeper border-gold font-black shadow-[0_0_20px_rgba(255,179,0,0.3)]"
                  : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
              }`}
            >
              {track}
            </button>
          ))}
        </div>
        
        {/* Status Chip */}
        <div className="flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/5 bg-white/[0.02] text-[9px] font-mono text-white/40 uppercase tracking-widest">
           <Activity size={12} className={isAnyHovered ? "text-gold" : "text-white/20"} />
           {isAnyHovered ? "NODE_INTERCEPT_ACTIVE" : "STREAM_STABLE"}
        </div>
      </FadeInUp>

      {/* ── The Stream Core ── */}
      <div className="relative">
        {/* Vertical Pulse Stream Line */}
        <div className="absolute left-[0.25rem] top-0 bottom-0 w-px bg-white/5 pointer-events-none" />
        <motion.div
          ref={lineRef}
          animate={{ scaleX: isAnyHovered ? 2 : 1, opacity: isAnyHovered ? 0.8 : 0.4 }}
          className="absolute left-[0.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-gold via-gold/40 to-transparent pointer-events-none origin-top shadow-[0_0_15px_rgba(255,179,0,0.5)]"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTrack}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="space-y-6"
          >
            {filtered.map((session, index) => (
              <SessionCard
                key={session.id}
                session={session}
                index={index}
                onHover={setIsAnyHovered}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
