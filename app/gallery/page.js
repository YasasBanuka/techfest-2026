"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/page-hero";
import GalleryGrid from "@/components/gallery/gallery-grid";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { GALLERY_PHOTOS, GALLERY_CATEGORIES, CATEGORY_LABELS } from "@/data/gallery";

/**
 * GalleryPage — needs "use client" for filter state
 */
export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="TechFest Sri Lanka 2025"
        title="Photo Gallery"
        titleGold="Gallery"
        subtitle="A visual journey through TechFest Sri Lanka 2025 — 700+ participants, 10 speakers, 10+ stalls, and memories that last a lifetime."
      />

      {/* ── Stats strip ── */}
      <section className="py-8 px-6 border-b border-navy-border">
        <div className="max-w-6xl mx-auto">
          <FadeInUp className="flex flex-wrap gap-6 sm:gap-10">
            {[
              { count: "13", label: "Photos" },
              { count: "1",  label: "Year Archived" },
              { count: "700+", label: "Participants Captured" },
            ].map(({ count, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-gold font-heading font-black text-2xl">{count}</span>
                <span className="text-white-muted text-sm">{label}</span>
              </div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── Gallery ── */}
      <section className="py-14 px-6 pb-24">
        <div className="max-w-6xl mx-auto">

          {/* Category filter tabs */}
          <FadeInUp className="flex flex-wrap gap-2 mb-10">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 border ${
                  activeCategory === cat
                    ? "bg-gold text-navy-deeper border-gold font-bold"
                    : "bg-navy-card border-navy-border text-white-muted hover:border-gold/30 hover:text-white"
                }`}
              >
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </FadeInUp>

          {/* Photo count */}
          <FadeInUp className="mb-6">
            <p className="text-white-dim text-xs">
              Showing <span className="text-gold font-semibold">{filtered.length}</span> photo{filtered.length !== 1 ? "s" : ""}
              {activeCategory !== "All" && (
                <span> in <span className="text-white">{CATEGORY_LABELS[activeCategory]}</span></span>
              )}
            </p>
          </FadeInUp>

          {/* Masonry grid with FLIP lightbox */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <GalleryGrid photos={filtered} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Contribute notice ── */}
      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-card border border-navy-border rounded-2xl px-7 py-5">
              <div>
                <p className="text-white font-heading font-semibold">
                  Were you at TechFest 2025?
                </p>
                <p className="text-white-dim text-sm mt-0.5">
                  Share your photos — tag us{" "}
                  <span className="text-gold">@techfestlk</span> or send them via our contact page.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-semibold rounded-xl hover:bg-gold/15 hover:border-gold/50 transition-all duration-200 whitespace-nowrap"
              >
                Share Photos →
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      <CTA />
    </main>
  );
}
