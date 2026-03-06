"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

/**
 * GalleryGrid
 * ────────────
 * Masonry-style photo grid using CSS columns.
 * Click any photo → Framer Motion layoutId FLIP lightbox expands
 * the clicked photo to full-screen with a seamless positional animation.
 * Arrow keys and prev/next buttons let you navigate while in lightbox.
 *
 * Animation technique: Framer Motion "shared layout animations" (layoutId)
 * This is the same FLIP technique used by Vercel, Stripe, and Linear —
 * the element is the same DOM node, so the position difference is
 * automatically animated by Framer Motion's layout engine.
 */
export default function GalleryGrid({ photos }) {
  const [selectedId, setSelectedId] = useState(null);

  const selectedIndex = photos.findIndex((p) => p.id === selectedId);
  const selectedPhoto = photos[selectedIndex] ?? null;

  const close = useCallback(() => setSelectedId(null), []);

  const prev = useCallback(() => {
    setSelectedId(photos[(selectedIndex - 1 + photos.length) % photos.length].id);
  }, [selectedIndex, photos]);

  const next = useCallback(() => {
    setSelectedId(photos[(selectedIndex + 1) % photos.length].id);
  }, [selectedIndex, photos]);

  // Keyboard navigation
  const handleKey = useCallback(
    (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [close, prev, next]
  );

  return (
    <>
      {/* ── Masonry grid (CSS columns) ── */}
      <div
        className="columns-1 sm:columns-2 lg:columns-3 gap-3"
        style={{ columnFill: "balance" }}
      >
        {photos.map((photo) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-${photo.id}`}
            className="relative mb-3 rounded-xl overflow-hidden cursor-zoom-in group break-inside-avoid"
            onClick={() => setSelectedId(photo.id)}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.2 }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-auto block"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-navy-deeper/0 group-hover:bg-navy-deeper/40 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn
                size={28}
                className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
              />
            </div>
            {/* Caption on hover */}
            {photo.caption && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-navy-deeper/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-medium">{photo.caption}</p>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-navy-deeper/95 backdrop-blur-md z-50"
              onClick={close}
              onKeyDown={handleKey}
              tabIndex={0}
            />

            {/* Lightbox image — FLIP animation via layoutId */}
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`photo-${selectedPhoto.id}`}
                className="relative max-w-5xl w-full rounded-2xl overflow-hidden pointer-events-auto shadow-2xl"
                transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  className="w-full h-auto block max-h-[85vh] object-contain"
                />
                {/* Caption */}
                {selectedPhoto.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-navy-deeper/90 to-transparent">
                    <p className="text-white text-sm font-medium">{selectedPhoto.caption}</p>
                    <p className="text-white-dim text-xs mt-0.5">{selectedPhoto.year}</p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Controls */}
            <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-between px-4">
              {/* Prev */}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                onClick={prev}
                className="pointer-events-auto w-11 h-11 rounded-full bg-navy-card border border-navy-border text-white hover:border-gold/40 hover:text-gold flex items-center justify-center transition-all duration-200"
              >
                <ChevronLeft size={20} />
              </motion.button>

              {/* Next */}
              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onClick={next}
                className="pointer-events-auto w-11 h-11 rounded-full bg-navy-card border border-navy-border text-white hover:border-gold/40 hover:text-gold flex items-center justify-center transition-all duration-200"
              >
                <ChevronRight size={20} />
              </motion.button>
            </div>

            {/* Close + counter */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-white-dim text-sm font-mono"
              >
                {selectedIndex + 1} / {photos.length}
              </motion.span>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={close}
                className="w-10 h-10 rounded-full bg-navy-card border border-navy-border text-white hover:border-gold/40 hover:text-gold flex items-center justify-center transition-all duration-200"
              >
                <X size={16} />
              </motion.button>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
