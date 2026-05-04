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

      {/* ── Content: Member Grid / List ── */}
      <div className="relative">

        {/* Desktop: Compact card grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentTeam.map((member, i) => (
            <DesktopCard
              key={`${member.name}-${i}`}
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Mobile: Compact list rows */}
        <div className="flex flex-col gap-3 sm:hidden">
          {currentTeam.map((member, i) => (
            <MobileRow
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
   Desktop Card — compact, no tall portrait overflow
   ────────────────────────────────────────────── */
function DesktopCard({ member, onClick }) {
  const initials = member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`group relative w-full text-left bg-navy-card border rounded-2xl overflow-hidden transition-all duration-400 focus:outline-none focus:ring-2 focus:ring-gold/40
        ${member.featured 
          ? "border-gold/30 hover:border-gold shadow-[0_0_15px_rgba(255,179,0,0.05)] hover:shadow-[0_0_30px_rgba(255,179,0,0.15)]" 
          : "border-navy-border hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,179,0,0.1)]"
        }
      `}
    >
      {/* Photo area — fixed height, no overflow breakout */}
      <div className="relative h-[180px] w-full bg-navy-surface overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top grayscale opacity-70 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, 280px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-heading font-black text-white/10">
            {initials}
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-navy-card to-transparent" />
      </div>

      {/* Info */}
      <div className="px-5 py-4">
        <h3 className="text-white font-heading font-bold text-base leading-tight mb-1 group-hover:text-gold transition-colors duration-300 truncate">
          {member.name}
        </h3>
        <p className="text-white-muted text-xs leading-snug mb-3 truncate">{member.role}</p>
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-white-dim bg-navy-deeper/60 border border-navy-border rounded-md px-2 py-1 uppercase tracking-wider truncate max-w-[120px]">
            {member.university}
          </span>
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="text-white-dim hover:text-gold transition-colors p-1"
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

/* ──────────────────────────────────────────────
   Mobile Row — horizontal compact list item
   ────────────────────────────────────────────── */
function MobileRow({ member, onClick }) {
  const initials = member.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <button
      onClick={onClick}
      className={`group w-full flex items-center gap-4 bg-navy-card border rounded-xl px-4 py-3 active:bg-navy-surface transition-colors duration-150 text-left focus:outline-none focus:ring-2 focus:ring-gold/30
        ${member.featured ? "border-gold/20" : "border-navy-border"}
      `}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0 w-12 h-12 rounded-xl overflow-hidden bg-navy-surface border border-navy-border">
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top grayscale"
            sizes="48px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-sm font-heading font-black text-white/30">
            {initials}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-white font-bold text-sm truncate">{member.name}</span>
        </div>
        <p className={`text-xs truncate ${member.featured ? "text-gold/80" : "text-white-muted"}`}>
          {member.role}
        </p>
        <p className="text-white-dim text-[10px] font-mono uppercase tracking-wider truncate mt-0.5">{member.university}</p>
      </div>

      {/* Chevron */}
      <ChevronRight size={14} className="text-white/20 group-active:text-gold flex-shrink-0 transition-colors" />
    </button>
  );
}
