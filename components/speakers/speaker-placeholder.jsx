"use client";

import { motion } from "framer-motion";
import CyberModule from "@/components/ui/cyber-module";

/**
 * SpeakerPlaceholder — The Encryption Phase
 * ───────────────────────────────────────
 * A high-vibe, misty placeholder for when identities are redacted.
 * Features drifting data smoke and a 'DECRYPTING' status readout.
 */
export default function SpeakerPlaceholder() {
  return (
    <div className="relative py-20 flex flex-col items-center justify-center">
      
      {/* ── Layer 1: The Misty Core ── */}
      <motion.div 
        className="relative w-full max-w-2xl aspect-video"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <CyberModule className="h-full bg-navy-card/40 border-white/5 flex flex-col items-center justify-center overflow-hidden">
          
          {/* Drifting Mist Background (Localized) */}
          <div className="absolute inset-0 z-0 opacity-40">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,179,0,0.05),transparent_70%)] animate-pulse" />
             <motion.div 
               className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gold/10 rounded-full blur-[100px]"
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
             />
          </div>

          {/* ── Redacted Silhouette ── */}
          <div className="relative z-10 mb-8">
            <div className="relative w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-white/10 rounded-full flex items-center justify-center overflow-hidden">
               {/* Ghostly User Icon */}
               <svg viewBox="0 0 24 24" className="w-2/3 h-2/3 text-white/5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
               </svg>
               {/* Glitch Overlay */}
               <motion.div 
                 className="absolute inset-0 bg-gold/20 mix-blend-overlay opacity-0"
                 animate={{ opacity: [0, 0.3, 0, 0.1, 0], scaleY: [1, 1.2, 1, 0.8, 1] }}
                 transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
               />
            </div>
            
            {/* Scan Beam */}
            <motion.div 
              className="absolute inset-x-0 h-[2px] bg-gold/30 blur-sm pointer-events-none"
              animate={{ top: ["0%", "100%", "0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* ── Technical Readout ── */}
          <div className="text-center relative z-10 px-8">
            <h3 className="text-xl md:text-2xl font-heading font-black text-white uppercase tracking-widest mb-2 flex items-center justify-center gap-3">
               <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
               Speakers To Be Announced
            </h3>
            <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.4em] mb-8 leading-relaxed">
              [SYSTEM_STATUS]: REVEALING_SOON <br />
              [LOCATION]: TECHFEST_SRILANKA_2026
            </p>
            
            <div className="flex gap-4 justify-center">
              <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gold"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="h-1 w-12 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gold"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                />
              </div>
            </div>
          </div>

        </CyberModule>
      </motion.div>

      {/* ── Sub-CTA ── */}
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-12 text-white-dim text-sm font-light italic tracking-wide text-center max-w-md px-6"
      >
        Records of past excellence are currently in the process of decryption. Confirmations are arriving via temporal stream soon.
      </motion.p>
      
    </div>
  );
}
