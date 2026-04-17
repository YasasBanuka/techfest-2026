"use client";

import Link from "next/link";
import { Check, X, ShieldCheck, Database, Key } from "lucide-react";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";

/**
 * TicketCard — transformed into a 'Noir' Access Protocol shard.
 */
export default function TicketCard({ tier, index }) {
  const Icon = tier.id === "vip" ? ShieldCheck : tier.id === "workshop" ? Key : Database;

  return (
    <FadeInUp delay={index * 0.1} className="h-full">
      <CyberModule
        className={`relative flex flex-col h-full bg-white/[0.01] border-white/5 p-8 transition-all duration-700 group
          ${tier.featured ? "border-gold/30 shadow-[0_0_50px_rgba(255,179,0,0.05)]" : "hover:border-white/20"}`}
      >
        {/* HUD Decoration Header */}
        <div className="flex items-center justify-between mb-8 opacity-40">
           <div className="flex items-center gap-2">
              <Icon size={14} className={tier.featured ? "text-gold" : "text-white/40"} />
              <span className="text-[8px] font-mono text-white mt-0.5 uppercase tracking-[0.4em]">Protocol: {tier.id.toUpperCase()}</span>
           </div>
           <span className="text-[7px] font-mono text-white/20 uppercase tracking-[0.3em] group-hover:text-gold/40 transition-colors">Entry_CID: 0x{index + 52}</span>
        </div>

        {/* Badge */}
        {tier.badge && (
          <div className="mb-6">
            <span
              className={`text-[8px] font-mono font-black uppercase tracking-[0.3em] px-3 py-1 rounded-sm border ${
                tier.featured
                  ? "bg-gold/10 text-gold border-gold/20 shadow-[0_0_15px_rgba(255,179,0,0.1)]"
                  : "bg-white/5 text-white/40 border-white/10"
              }`}
            >
              {tier.badge}
            </span>
          </div>
        )}

        <div className="flex flex-col flex-1">
          {/* Tier name */}
          <h3 className="text-white font-heading font-black text-2xl uppercase italic tracking-tighter mb-2 group-hover:gold-gradient-text transition-all duration-700">
             {tier.name.split(' ')[0]} <span className={tier.featured ? "gold-gradient-text" : "text-white/40"}>{tier.name.split(' ')[1] || "Access"}</span>
          </h3>
          <p className="text-white/60 text-sm mb-8 leading-relaxed italic border-l border-white/5 pl-6 group-hover:border-gold/20 transition-all duration-700">
             {tier.description}
          </p>

          {/* Price */}
          <div className="mb-10 p-6 bg-white/[0.01] border border-white/5 rounded-xl flex flex-col items-center justify-center text-center group-hover:bg-gold/[0.02] transition-colors duration-700">
            <span
              className={`font-heading font-black text-4xl italic tracking-tighter ${
                tier.featured ? "gold-gradient-text drop-shadow-[0_0_20px_rgba(255,179,0,0.2)]" : "text-white"
              }`}
            >
              {tier.price}
            </span>
            <p className="text-white/20 text-[8px] font-mono uppercase tracking-[0.5em] mt-2">{tier.priceNote}</p>
          </div>

          {/* Features list */}
          <ul className="space-y-4 mb-10 flex-1">
            {tier.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-4 group/item">
                <span
                  className={`mt-1 flex-shrink-0 w-4 h-4 rounded-sm border flex items-center justify-center transition-all duration-500 ${
                    feature.included
                      ? "bg-gold/10 border-gold/20 text-gold group-hover/item:shadow-[0_0_10px_rgba(255,179,0,0.3)]"
                      : "bg-white/5 border-white/5 text-white/10"
                  }`}
                >
                  {feature.included ? (
                    <Check size={10} strokeWidth={4} />
                  ) : (
                    <X size={10} strokeWidth={2} />
                  )}
                </span>
                <span
                  className={`text-xs uppercase tracking-widest font-mono ${
                    feature.included ? "text-white/60 group-hover/item:text-white transition-colors" : "text-white/10 italic"
                  }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <div className="relative overflow-hidden rounded-xl border border-white/5 mt-auto">
             <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none bg-gradient-to-r from-transparent via-gold/5 to-transparent`} />
             
             {tier.ctaLink.startsWith("/") ? (
               <Link
                 href={tier.ctaLink}
                 className={`block w-full py-5 text-[10px] font-mono font-black text-center uppercase tracking-[0.4em] transition-all duration-500 ${
                   tier.featured
                     ? "bg-gold text-navy-deeper hover:shadow-[0_0_30px_rgba(255,179,0,0.3)]"
                     : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                 }`}
               >
                 {tier.cta}
               </Link>
             ) : (
               <a
                 href={tier.ctaLink}
                 className={`block w-full py-5 text-[10px] font-mono font-black text-center uppercase tracking-[0.4em] transition-all duration-500 ${
                   tier.featured
                     ? "bg-gold text-navy-deeper hover:shadow-[0_0_30px_rgba(255,179,0,0.3)]"
                     : "bg-white/5 text-white/40 hover:text-white hover:bg-white/10"
                 }`}
               >
                 {tier.cta}
               </a>
             )}
          </div>
        </div>
      </CyberModule>
    </FadeInUp>
  );
}
