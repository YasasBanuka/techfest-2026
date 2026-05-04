"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Linkedin, ChevronRight, Users } from "lucide-react";
import TeamMemberModal from "./team-member-modal";
import { TEAM_DATA } from "@/data/team";

/**
 * TeamSection V5 — Single Unified Roster
 * ──────────────────────────────────────
 * Desktop: Compact card grid.
 * Mobile:  Compact list rows — minimal scroll.
 * Removes the Tab Bar to avoid awkward team categorization.
 * Maintains the exact order defined in data/team.js (Chair first, etc).
 */
export default function TeamSection() {
  const currentTeam = TEAM_DATA["2026"] || [];
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <div className="w-full">

      {/* ── Content: Member Grid ── */}
      <div className="relative">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {currentTeam.map((member, i) => (
            <MemberCard
              key={`${member.name}-${i}`}
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>
      </div>

      <TeamMemberModal
        member={selectedMember}
        isOpen={!!selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </div>
  );
}

/* ──────────────────────────────────────────────
   Member Card — fully responsive
   ────────────────────────────────────────────── */
function MemberCard({ member, onClick }) {
  const initials = member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left bg-navy-card border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-gold/40
        ${member.featured 
          ? "border-gold/30 hover:border-gold shadow-[0_0_15px_rgba(255,179,0,0.05)] hover:shadow-[0_0_30px_rgba(255,179,0,0.15)]" 
          : "border-navy-border hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,179,0,0.1)]"
        }
      `}
    >
      {/* Photo area — adaptive height */}
      <div className="relative aspect-[3/4] sm:h-[180px] sm:aspect-auto w-full bg-navy-surface overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 640px) 50vw, 280px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl font-heading font-black text-white/10">
            {initials}
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-navy-card to-transparent" />
      </div>

      {/* Info */}
      <div className="px-3 py-3 sm:px-5 sm:py-4">
        <h3 className="text-white font-heading font-bold text-sm sm:text-base leading-tight mb-1 group-hover:text-gold transition-colors duration-300 truncate">
          {member.name}
        </h3>
        <p className="text-white-muted text-[10px] sm:text-xs leading-snug mb-2 sm:mb-3 truncate">{member.role}</p>
        
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
          <span className="text-[9px] sm:text-[10px] font-mono text-white-dim bg-navy-deeper/60 border border-navy-border rounded sm:rounded-md px-1.5 py-1 sm:px-2 uppercase tracking-wider truncate w-max max-w-full">
            {member.university}
          </span>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="hidden sm:block text-white-dim hover:text-gold transition-colors p-1"
              aria-label={`LinkedIn – ${member.name}`}
            >
              <Linkedin size={14} />
            </a>
          )}
        </div>
      </div>
    </button>
  );
}
