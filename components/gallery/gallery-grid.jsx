import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Camera, Calendar, Hash } from "lucide-react";
import CyberModule from "@/components/ui/cyber-module";

/**
 * GalleryGrid — 'The Memory Shards'
 * ───────────────────────────────
 * A high-vibe visual archive. Photos manifestation through mist 
 * with technical HUD overlays and a premium 'Phantom' lightbox.
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
        className="columns-1 sm:columns-2 lg:columns-3 gap-6"
        style={{ columnFill: "balance" }}
      >
        {photos.map((photo, i) => (
          <motion.div
            key={photo.id}
            layoutId={`photo-container-${photo.id}`}
            className="mb-8 break-inside-avoid group cursor-pointer"
            onClick={() => setSelectedId(photo.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <CyberModule className="relative !p-0 bg-navy-card/40 border-white/5 overflow-hidden group-hover:border-gold/30 transition-all duration-700">
              
              {/* Photo Shard */}
              <motion.div className="relative aspect-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-[1.01] group-hover:scale-100">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-auto block"
                  loading="lazy"
                />
                
                {/* Atmospheric Overlay */}
                <div className="absolute inset-0 bg-navy-deeper/20 group-hover:bg-transparent transition-colors duration-1000" />
              </motion.div>

              {/* HUD Annotations (Visible on Hover / Inherent mystery) */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
                 <div className="flex items-center gap-1.5 font-mono text-[8px] text-gold/60 uppercase tracking-widest">
                    <Hash size={8} />
                    REF_0{photo.id}
                 </div>
                 <div className="font-mono text-[7px] text-white/20 uppercase tracking-[0.3em]">
                    ARCHIVAL_READY
                 </div>
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 pt-12 bg-gradient-to-t from-navy-deeper/90 via-navy-deeper/40 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-700">
                <p className="text-white text-xs font-bold tracking-wide mb-1 flex items-center gap-2">
                  <span className="w-1 h-1 bg-gold rounded-full" />
                  {photo.caption}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest">{photo.category}</span>
                  <Maximize2 size={12} className="text-gold opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </CyberModule>
          </motion.div>
        ))}
      </div>

      {/* ── Lightbox (Misty Manifestation) ── */}
      <AnimatePresence>
        {selectedPhoto && (
          <>
            {/* 🎭 Backdrop 🎭 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 bg-navy-deeper/90 backdrop-blur-xl z-50 overflow-hidden"
              onClick={close}
            >
               {/* Drifting Background Smoke/Mist */}
               <div className="absolute inset-0 opacity-10">
                  <motion.div 
                    className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gold/5 blur-[150px] rounded-full"
                    animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                  <motion.div 
                    className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 blur-[150px] rounded-full"
                    animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  />
               </div>
            </motion.div>

            {/* 🖼️ Main Stage 🖼️ */}
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10 pointer-events-none">
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(20px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-6xl h-full flex flex-col md:flex-row gap-8 pointer-events-auto items-center"
              >
                
                {/* ── Image Container ── */}
                <div className="relative flex-1 h-full flex items-center justify-center group/img">
                   <CyberModule className="!p-0 border-white/10 bg-black/60 shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden">
                      {/* One-time pass scan line on open */}
                      <motion.div 
                        initial={{ left: "-100%" }}
                        animate={{ left: "200%" }}
                        transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
                        className="absolute inset-y-0 w-[1px] bg-gold/40 shadow-[0_0_20px_rgba(255,179,0,0.5)] z-50"
                      />
                      <img
                        src={selectedPhoto.src}
                        alt={selectedPhoto.alt}
                        className="max-w-full max-h-[75vh] object-contain block relative z-10"
                      />
                   </CyberModule>

                   {/* Quick Actions (Floating) */}
                   <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover/img:opacity-100 transition-opacity duration-500">
                      <button onClick={(e) => { e.stopPropagation(); prev(); }} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:text-gold transition-colors backdrop-blur-md">
                         <ChevronLeft size={24} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); next(); }} className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 text-white hover:text-gold transition-colors backdrop-blur-md">
                         <ChevronRight size={24} />
                      </button>
                   </div>
                </div>

                {/* ── Metadata Sidebar (Noir Style) ── */}
                <div className="w-full md:w-72 flex flex-col gap-6 md:h-full justify-center">
                   <div className="space-y-6">
                      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
                         <p className="text-[9px] font-mono text-gold/60 uppercase tracking-[0.5em] mb-3">Memory_Shard</p>
                         <h3 className="text-xl font-heading font-black text-white uppercase tracking-tight leading-none mb-2">
                            {selectedPhoto.caption}
                         </h3>
                         <p className="text-white/60 text-xs italic leading-relaxed">
                            Captured during the peak transformation protocol of TechFest Sri Lanka 2026.
                         </p>
                      </motion.div>

                      {/* Technical Specs HUD */}
                      <motion.div 
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
                        className="p-5 border border-white/5 bg-white/[0.02] rounded-xl space-y-4"
                      >
                         <div className="flex items-center gap-3">
                            <Hash size={14} className="text-gold/40" />
                            <div className="flex flex-col">
                               <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Asset_ID</span>
                               <span className="text-[10px] font-mono text-white tracking-widest uppercase">TF26_MOD_{selectedPhoto.id}</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <Calendar size={14} className="text-gold/40" />
                            <div className="flex flex-col">
                               <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">CaptureDate</span>
                               <span className="text-[10px] font-mono text-white tracking-widest uppercase">Dec 20, 2025</span>
                            </div>
                         </div>
                         <div className="flex items-center gap-3">
                            <Camera size={14} className="text-gold/40" />
                            <div className="flex flex-col">
                               <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Format</span>
                               <span className="text-[10px] font-mono text-white tracking-widest uppercase">{selectedPhoto.category} SHOT</span>
                            </div>
                         </div>
                      </motion.div>
                   </div>

                   {/* Close Interaction */}
                   <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      onClick={close}
                      className="mt-4 flex items-center gap-3 text-[10px] font-mono text-white/40 uppercase tracking-[0.4em] hover:text-gold transition-colors group"
                   >
                      <X size={14} className="group-hover:rotate-90 transition-transform duration-500" />
                      Dismiss_Shard_Record
                   </motion.button>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
