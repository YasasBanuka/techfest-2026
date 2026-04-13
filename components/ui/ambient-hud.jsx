"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * AmbientHUD
 * ──────────
 * Fixed, low-opacity technical indicators that drift subtly as the user scrolls.
 * Creates an immersive 'Surreal Cyber-Noir' atmosphere.
 */
export default function AmbientHUD() {
  const { scrollY } = useScroll();
  
  // Subtle parallax for HUD elements
  const driftY = useTransform(scrollY, [0, 5000], [0, -100]);
  const driftRotate = useTransform(scrollY, [0, 3000], [0, 45]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden hidden lg:block">
      
      {/* Top Left: Coordinate String */}
      <motion.div 
        style={{ y: driftY }}
        className="absolute top-10 left-10 flex flex-col gap-1"
      >
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold/40 animate-pulse" />
          <span className="text-[10px] font-mono text-gold/20 uppercase tracking-[0.3em]">
            TF_LOC: 06°55&apos;38.6&quot;N 79°51&apos;40.3&quot;E
          </span>
        </div>
        <div className="text-[9px] font-mono text-white/5 uppercase tracking-[0.2em] ml-3">
          LAT_LNG_STREAM: ACTIVE
        </div>
      </motion.div>

      {/* Top Right: System Status & Version */}
      <motion.div 
        style={{ y: driftY }}
        className="absolute top-10 right-10 text-right flex flex-col items-end gap-1"
      >
        <span className="text-[10px] font-mono text-gold/20 uppercase tracking-[0.3em]">
          TF_BUILD: v2.0.7E9
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[9px] font-mono text-white/5 uppercase tracking-[0.2em]">
            KERNEL_RECOGNITION: OPTIMAL
          </span>
          <div className="w-4 h-[1px] bg-gold/20" />
        </div>
      </motion.div>

      {/* Bottom Left: Rotating Compass Indicator */}
      <motion.div 
        style={{ rotate: driftRotate }}
        className="absolute bottom-10 left-10 w-24 h-24 border border-white/5 rounded-full flex items-center justify-center"
      >
        <div className="w-px h-full bg-gradient-to-b from-transparent via-gold/10 to-transparent absolute top-0 left-1/2 -translate-x-1/2" />
        <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/10 to-transparent absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2" />
        <div className="text-[8px] font-mono text-gold/10 absolute -top-4 left-1/2 -translate-x-1/2">N</div>
      </motion.div>

      {/* Bottom Right: Clean spacer */}
      <div className="absolute bottom-10 right-10" />

      {/* Subtle Side Scanning Pulses */}
      <div className="absolute top-0 left-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent opacity-20" />
      <div className="absolute top-0 right-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/10 to-transparent opacity-20" />
    </div>
  );
}
