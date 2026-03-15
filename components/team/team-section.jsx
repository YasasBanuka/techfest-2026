"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TeamCard from "./team-card";
import { TEAM_DATA, TEAM_GROUPS_ORDER } from "@/data/team";

export default function TeamSection() {
    const [activeYear, setActiveYear] = useState("2026");

    const currentTeam = TEAM_DATA[activeYear] || [];

    // Group members dynamically for the Org Chart tree layout
    const treeData = TEAM_GROUPS_ORDER.map(groupName => {
        return {
            groupName,
            members: currentTeam.filter((m) => m.team === groupName),
        };
    }).filter(group => group.members.length > 0);

    return (
        <div className="w-full relative">
            {/* ── Glowing Abstract Background for the Tree ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-navy-deeper/0 to-navy-deeper/0 pointer-events-none" />

            {/* ── Fancy Year Toggle ── */}
            <div className="flex justify-center mb-24 relative z-10">
                <div className="bg-navy-card/80 backdrop-blur-xl border border-white/10 p-1.5 rounded-[1.25rem] inline-flex shadow-2xl">
                    {["2025", "2026"].map((year) => {
                        const isActive = activeYear === year;
                        return (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={`relative px-8 py-3 text-sm font-bold font-heading uppercase tracking-widest rounded-xl transition-all duration-300 ${isActive ? "text-navy-deeper" : "text-white-dim hover:text-white"
                                    }`}
                            >
                                {isActive && (
                                    <motion.div
                                        layoutId="activeTab2"
                                        className="absolute inset-0 bg-gradient-to-r from-gold to-gold-bright rounded-xl shadow-[0_0_20px_rgba(255,203,64,0.4)]"
                                        initial={false}
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                                <span className="relative z-10">TF {year}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* ── Tree Structure Layout (Org Chart Style) ── */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeYear}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                    transition={{ duration: 0.5, ease: "easeOut", staggerChildren: 0.1 }}
                    className="relative z-10"
                >
                    {treeData.map((group, groupIdx) => (
                        <div key={group.groupName} className="mb-20 relative">
                            {/* Tree connecting lines (Desktop only) */}
                            {groupIdx !== 0 && (
                                <div className="hidden md:block absolute -top-16 left-1/2 w-0.5 h-16 bg-gradient-to-b from-gold/30 to-navy-border/20 -translate-x-1/2" />
                            )}
                            {groupIdx !== 0 && group.members.length > 1 && (
                                <div className="hidden md:block absolute -top-8 left-[10%] right-[10%] h-0.5 bg-navy-border/40" />
                            )}

                            {/* Group Label */}
                            <div className="flex justify-center mb-16 relative">
                                {groupIdx !== 0 && (
                                    <div className="hidden md:block absolute -top-12 left-1/2 w-0.5 h-12 bg-gold/30 -translate-x-1/2" />
                                )}
                                <span className="relative z-10 px-6 py-2 rounded-full bg-navy-card border border-gold/20 shadow-[0_0_15px_rgba(255,203,64,0.1)] text-gold font-mono text-sm tracking-[0.2em] uppercase font-bold text-center">
                                    {group.groupName === "Core" ? "Executive Board" : `${group.groupName} Team`}
                                </span>
                            </div>

                            {/* Members Row */}
                            <div
                                className={`grid gap-8 justify-center ${group.members.length === 1
                                        ? "grid-cols-1 max-w-sm mx-auto"
                                        : group.members.length === 2
                                            ? "grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto"
                                            : group.members.length === 3
                                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto"
                                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
                                    }`}
                            >
                                {group.members.map((member, idx) => (
                                    <motion.div
                                        key={`${member.name}-${idx}`}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: (groupIdx * 0.1) + (idx * 0.05) }}
                                        className="relative"
                                    >
                                        {/* Inner tree lines connecting cards to horizontal bar */}
                                        {groupIdx !== 0 && group.members.length > 1 && (
                                            <div className="hidden md:block absolute -top-20 left-1/2 w-0.5 h-20 bg-navy-border/40 -translate-x-1/2 -z-10" />
                                        )}

                                        <TeamCard member={member} />
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
