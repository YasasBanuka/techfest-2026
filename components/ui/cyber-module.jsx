"use client";

import { motion } from "framer-motion";

/**
 * CyberModule
 * ───────────
 * A high-tech wrapper that adds technical corner brackets, 
 * glassmorphism, and 'Ghosty' hover logic to any card.
 */
export default function CyberModule({ children, className = "" }) {
  return (
    <div className={`group relative bg-navy-card/40 backdrop-blur-md border border-white/5 rounded-2xl p-8 transition-all duration-500 hover:border-gold/30 hover:bg-navy-surface/60 ${className}`}>
      
      {/* Corner Brackets — Top Left */}
      <div className="absolute top-0 left-0 w-8 h-8 pointer-events-none">
        <div className="absolute top-4 left-4 w-[1px] h-4 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
        <div className="absolute top-4 left-4 h-[1px] w-4 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
      </div>

      {/* Corner Brackets — Bottom Right */}
      <div className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none">
        <div className="absolute bottom-4 right-4 w-[1px] h-4 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
        <div className="absolute bottom-4 right-4 h-[1px] w-4 bg-gold/30 group-hover:bg-gold/60 transition-colors" />
      </div>

      {/* Internal Glow Pulse (Center) */}
      <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/[0.03] rounded-2xl transition-all duration-500 pointer-events-none" />

      {/* HUD-like scan line (Vertical Wipe on hover) */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-transparent via-gold/5 to-transparent w-[2px] h-full opacity-0 group-hover:opacity-100 pointer-events-none"
        initial={{ x: "-10%" }}
        whileHover={{ x: "1100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </div>
  );
}
