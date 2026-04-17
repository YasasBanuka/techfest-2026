"use client";

import { Lightbulb, Users, Star, Zap, Terminal, Shield } from "lucide-react";
import { VALUES } from "@/data/about";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";

const ICON_MAP = { Lightbulb, Users, Star, Zap };

/**
 * CoreValues — 'Fundamental Protocols'
 * ──────────────────────────────────────
 * Key principles presented as high-tech manifest nodes.
 */
export default function CoreValues() {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {VALUES.map((value) => {
        const Icon = ICON_MAP[value.icon] || Zap;
        return (
          <StaggerItem key={value.id}>
            <CyberModule className="group h-full !p-0 bg-white/[0.01] border-white/5 overflow-hidden transition-all duration-700 hover:border-gold/30">
               
               {/* Metadata Header */}
               <div className="px-6 py-3 border-b border-white/5 flex items-center justify-between opacity-20">
                  <span className="text-[7px] font-mono uppercase tracking-[0.4em]">Val_Ref: 0x0{value.id}</span>
                  <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
               </div>

               <div className="p-8">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center mb-6 group-hover:border-gold/30 transition-all duration-700">
                    <Icon size={18} className="text-white/40 group-hover:text-gold transition-colors duration-700" />
                  </div>

                  <h3 className="text-white font-heading font-black text-lg uppercase tracking-tight mb-4 group-hover:gold-gradient-text transition-all duration-700">
                    {value.title}
                  </h3>

                  {/* Misty Manifestation Description */}
                  <p className="text-white/70 text-sm leading-relaxed font-normal transition-all duration-700 group-hover:text-white">
                    {value.description}
                  </p>

                  {/* Footer Annotation */}
                  <div className="mt-8 flex items-center gap-2 opacity-10">
                     <Shield size={10} />
                     <span className="text-[8px] font-mono uppercase tracking-widest leading-none">Status: Integral</span>
                  </div>
               </div>
            </CyberModule>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
