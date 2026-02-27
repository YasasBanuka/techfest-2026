"use client";

import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import { SPONSORS } from "@/data/sponsors";

/**
 * SponsorTile — uniform size card: logo placeholder + name + role
 * When real logos arrive, swap the icon placeholder with next/image.
 */
function SponsorTile({ name, role }) {
    return (
        <div className="flex-shrink-0 w-52 h-44 bg-navy-card border border-navy-border rounded-2xl flex flex-col items-center justify-center gap-3 px-5 hover:border-gold/40 hover:bg-navy-surface transition-all duration-300 group">

            {/* Logo placeholder — swap with <Image> when real logos arrive */}
            <div className="w-16 h-16 rounded-xl bg-navy-surface border border-navy-border flex items-center justify-center group-hover:border-gold/30 transition-colors duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold/50">
                    <rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
            </div>

            {/* Name */}
            <div className="text-center">
                <p className="text-white font-heading font-semibold text-sm leading-snug">
                    {name}
                </p>
                <p className="text-white-dim text-xs mt-1 leading-snug">
                    {role}
                </p>
            </div>
        </div>
    );
}

export default function SponsorsCarousel() {
    const items = [...SPONSORS, ...SPONSORS];

    return (
        <section className="py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <FadeInUp className="text-center mb-12">
                    <p className="text-gold text-sm uppercase tracking-[0.2em] mb-3 font-medium">
                        Our Partners
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
                        Sponsors &amp; Partners
                    </h2>
                    <p className="text-white-muted mt-3 max-w-xl mx-auto text-sm">
                        Proudly supported by industry leaders driving technological innovation.
                    </p>
                </FadeInUp>

                {/* Carousel */}
                <div className="relative">
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-navy-deeper to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-navy-deeper to-transparent z-10 pointer-events-none" />

                    <div className="overflow-hidden">
                        <motion.div
                            className="flex gap-5 w-max"
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
                        >
                            {items.map((sponsor, index) => (
                                <SponsorTile
                                    key={`${sponsor.id}-${index}`}
                                    name={sponsor.name}
                                    role={sponsor.role}
                                />
                            ))}
                        </motion.div>
                    </div>
                </div>

                {/* Sponsor CTA */}
                <FadeInUp delay={0.2} className="text-center mt-12">
                    <p className="text-white-dim text-sm">
                        Interested in sponsoring TechFest 2026?{" "}
                        <a
                            href="mailto:info@techfest2026.lk"
                            className="text-gold hover:text-gold-bright transition-colors underline-offset-2 hover:underline"
                        >
                            Get in touch →
                        </a>
                    </p>
                </FadeInUp>
            </div>
        </section>
    );
}
