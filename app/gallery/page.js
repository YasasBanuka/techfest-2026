"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GalleryGrid from "@/components/gallery/gallery-grid";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import SpeakerBackground from "@/components/speakers/speaker-background";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, CATEGORY_LABELS } from "@/data/gallery";
import CyberModule from "@/components/ui/cyber-module";
import { Database, Search, Share2, Sparkles } from "lucide-react";

/**
 * GalleryPage — 'The Memory Shards'
 * ────────────────────────────────
 * A visual archive of past tech excellence.
 */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <main className="relative min-h-screen bg-navy-deeper overflow-hidden">
      
      {/* ── Layer 1: Ethereal Background ── */}
      <SpeakerBackground />

      {/* ── Layer 2: HUD Decorative Annotations ── */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden opacity-30 font-mono text-[9px] uppercase tracking-[0.4em] text-gold/40">
        <div className="absolute top-40 left-10 rotate-90 origin-left">
          ARCHIVE_RETRIEVAL: [0x25_MOMENTS]
        </div>
        <div className="absolute bottom-40 right-10 -rotate-90 origin-right">
          INTEGRITY_CHECK: [VERIFIED]
        </div>
      </div>

      <div className="relative z-20">
        
        {/* ── Minimalist Header (Noir Archive Style) ── */}
        <section className="pt-32 pb-16 px-6">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-10">
            <div className="max-w-2xl">
              <FadeInUp>
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                  <p className="text-gold text-xs uppercase tracking-[0.5em] font-black">
                    Identity Archive
                  </p>
                </div>
                <h1 className="text-5xl md:text-8xl font-heading font-black text-white uppercase tracking-tighter leading-[0.85] mb-6">
                  Memory <span className="gold-gradient-text">Shards</span>
                </h1>
                <p className="text-white/70 text-lg leading-relaxed italic border-l-2 border-gold/10 pl-6">
                  A visual journey through TechFest Sri Lanka 2025. Accessing encrypted records of innovation, 
                  community engagement, and temporal excellence.
                </p>
              </FadeInUp>
            </div>

            {/* Archive Status HUD */}
            <FadeInUp delay={0.2} className="hidden md:block">
              <div className="flex items-center gap-8 border border-white/5 bg-white/[0.02] p-6 rounded-2xl backdrop-blur-md">
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Assets_Cached</span>
                    <span className="text-3xl font-heading font-black text-gold">700+</span>
                 </div>
                 <div className="w-px h-10 bg-white/10" />
                 <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Entry_Point</span>
                    <span className="text-xl font-heading font-black text-white italic tracking-tighter uppercase">TF25_ARC</span>
                 </div>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* ── Filter Station ── */}
        <section className="py-10 px-6">
          <div className="max-w-6xl mx-auto">
            
            {/* Category selection (High-Tech Tabs) */}
            <FadeInUp className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
              <div className="flex flex-wrap gap-3">
                {GALLERY_CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`relative px-6 py-2.5 rounded-xl text-[10px] font-mono uppercase tracking-[0.3em] transition-all duration-300 border ${
                      activeCategory === cat
                        ? "bg-gold text-navy-deeper border-gold font-black shadow-[0_0_20px_rgba(255,179,0,0.3)]"
                        : "bg-white/5 border-white/5 text-white/40 hover:border-white/20 hover:text-white"
                    }`}
                  >
                    {activeCategory === cat && (
                       <motion.span layoutId="cat-glow" className="absolute inset-0 rounded-xl bg-gold/20 blur-sm -z-10" />
                    )}
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>

              {/* Status Indicator */}
              <div className="flex items-center gap-4 px-5 py-2 rounded-full border border-white/5 bg-white/[0.02]">
                 <Search size={14} className="text-white/20" />
                 <p className="text-white-dim text-[10px] uppercase tracking-widest font-mono">
                    Manifesting: <span className="text-gold">{filtered.length} Results</span>
                 </p>
              </div>
            </FadeInUp>

            {/* The Shard Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <GalleryGrid photos={filtered} />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>

        {/* ── Call for Signals (Repurposed for Gallery) ── */}
        <section className="py-20 px-6 pb-32">
          <div className="max-w-4xl mx-auto">
            <FadeInUp>
              <CyberModule className="relative group !p-0 bg-navy-card/40 border-white/5 overflow-hidden hover:border-gold/30 transition-all duration-700">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[100px] pointer-events-none" />
                
                <div className="relative z-10 p-8 md:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
                  <div className="max-w-xl text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-[10px] text-gold font-black uppercase tracking-[0.3em] mb-6">
                      <Database size={12} />
                      Contribute Records
                    </div>
                    <h2 className="text-3xl md:text-4xl font-heading font-black text-white leading-tight mb-4 uppercase italic">
                      Were you in the <span className="gold-gradient-text">Stream</span>?
                    </h2>
                    <p className="text-white-dim text-sm md:text-base leading-relaxed font-light italic">
                      We are expanding the TF25 Archive. If you have captured significant moments, submit your shards through the communication protocols.
                    </p>
                  </div>

                  <a
                    href="/contact"
                    className="shrink-0 px-10 py-5 bg-gold text-navy-deeper text-xs uppercase tracking-[0.4em] font-black rounded-xl hover:bg-gold-bright transition-all duration-300 shadow-[0_0_30px_rgba(255,179,0,0.15)] flex items-center gap-3"
                  >
                    Share_Shards
                    <Share2 size={16} />
                  </a>
                </div>
              </CyberModule>
            </FadeInUp>
          </div>
        </section>

        <CTA />
      </div>
    </main>
  );
}
