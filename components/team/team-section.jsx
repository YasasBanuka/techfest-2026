"use client";

import { motion } from "framer-motion";
import TeamCard from "./team-card";
import { TEAM_DATA, TEAM_GROUPS_ORDER } from "@/data/team";

export default function TeamSection() {
    // Directly use 2026 data as requested
    const currentTeam = TEAM_DATA["2026"] || [];

    // Group and sort members for row-based layout
    const teamGroups = TEAM_GROUPS_ORDER.map(groupName => {
        const members = currentTeam.filter(m => m.team === groupName);
        // Sort: featured first (leaders)
        const sortedMembers = [...members].sort((a, b) => {
            if (a.featured && !b.featured) return -1;
            if (!a.featured && b.featured) return 1;
            return 0;
        });
        return { name: groupName, members: sortedMembers };
    }).filter(g => g.members.length > 0);

    return (
        <div className="w-full relative">
            {/* ── Glowing Abstract Background ── */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/5 via-navy-deeper/0 to-navy-deeper/0 pointer-events-none" />

            {/* ── Team Rows ── */}
            <div className="relative z-10 space-y-8">
                {teamGroups.map((group, gIdx) => (
                    <motion.div
                        key={group.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, delay: gIdx * 0.05 }}
                    >
                        {/* Grid for this specific team row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12 max-w-7xl mx-auto justify-items-center">
                            {group.members.map((member, mIdx) => (
                                <motion.div
                                    key={`${member.name}-${mIdx}`}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: mIdx * 0.1 }}
                                    className="w-full max-w-[280px]"
                                >
                                    <TeamCard member={member} />
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

