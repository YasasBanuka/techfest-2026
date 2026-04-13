"use client";

import Link from "next/link";
import { Check, X } from "lucide-react";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";

/**
 * TicketCard — premium pricing card with feature checklist.
 * Featured tier (General Admission) gets gold border + glow + badge.
 * Hover: subtle lift + gold border intensify.
 */
export default function TicketCard({ tier, index }) {
  return (
    <FadeInUp delay={index * 0.1}>
      <div
        className={`relative flex flex-col h-full rounded-2xl border overflow-hidden transition-all duration-300 group
          ${tier.featured
            ? "border-gold/50 shadow-[0_0_40px_rgba(255,203,64,0.1)] hover:shadow-[0_0_60px_rgba(255,203,64,0.18)] hover:border-gold/70"
            : "border-navy-border hover:border-gold/25 hover:shadow-[0_0_30px_rgba(255,203,64,0.05)]"
          }
          bg-navy-card`}
      >
        {/* Gold top line for featured */}
        {tier.featured && (
          <div className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
        )}

        {/* Badge */}
        {tier.badge && (
          <div className="absolute top-5 right-5">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                tier.featured
                  ? "bg-gold/15 text-gold border-gold/40"
                  : tier.badge === "VIP"
                  ? "bg-purple-500/15 text-purple-300 border-purple-500/30"
                  : "bg-blue-500/15 text-blue-300 border-blue-500/30"
              }`}
            >
              {tier.badge}
            </span>
          </div>
        )}

        <div className="p-7 flex flex-col flex-1">
          {/* Tier name */}
          <h3 className="text-white font-heading font-bold text-xl mb-1">{tier.name}</h3>
          <p className="text-white-muted text-sm mb-6 leading-relaxed">{tier.description}</p>

          {/* Price */}
          <div className="mb-6">
            <span
              className={`font-heading font-black text-4xl ${
                tier.featured ? "text-gold" : "text-white"
              }`}
            >
              {tier.price}
            </span>
            <p className="text-white-dim text-xs mt-1">{tier.priceNote}</p>
          </div>

          {/* Features list */}
          <ul className="space-y-3 mb-8 flex-1">
            {tier.features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-3">
                <span
                  className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                    feature.included
                      ? "bg-gold/15 text-gold"
                      : "bg-white/5 text-white-dim/30"
                  }`}
                >
                  {feature.included ? (
                    <Check size={10} strokeWidth={3} />
                  ) : (
                    <X size={10} strokeWidth={2.5} />
                  )}
                </span>
                <span
                  className={`text-sm ${
                    feature.included ? "text-white-muted" : "text-white-dim/40 line-through decoration-white/20"
                  }`}
                >
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          {tier.external ? (
            <a
              href={tier.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm text-center transition-all duration-300 ${
                tier.featured
                  ? "bg-gold text-navy-deeper hover:bg-gold-bright hover:shadow-[0_0_25px_rgba(255,203,64,0.35)]"
                  : "bg-white/5 border border-navy-border text-white hover:bg-white/10 hover:border-gold/30"
              }`}
            >
              {tier.cta}
            </a>
          ) : tier.ctaLink.startsWith("/") ? (
            <Link
              href={tier.ctaLink}
              className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm text-center transition-all duration-300 ${
                tier.featured
                  ? "bg-gold text-navy-deeper hover:bg-gold-bright hover:shadow-[0_0_25px_rgba(255,203,64,0.35)]"
                  : "bg-white/5 border border-navy-border text-white hover:bg-white/10 hover:border-gold/30"
              }`}
            >
              {tier.cta}
            </Link>
          ) : (
            <a
              href={tier.ctaLink}
              className={`w-full py-3.5 rounded-xl font-heading font-bold text-sm text-center transition-all duration-300 ${
                tier.featured
                  ? "bg-gold text-navy-deeper hover:bg-gold-bright hover:shadow-[0_0_25px_rgba(255,203,64,0.35)]"
                  : "bg-white/5 border border-navy-border text-white hover:bg-white/10 hover:border-gold/30"
              }`}
            >
              {tier.cta}
            </a>
          )}
        </div>
      </div>
    </FadeInUp>
  );
}
