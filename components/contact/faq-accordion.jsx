"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/data/faq";
import FadeInUp from "@/components/ui/fade-in-up";

/**
 * FAQAccordion — Animated expand/collapse FAQ list
 * One item open at a time. Smooth height animation via Framer Motion.
 */
export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <div className="space-y-3">
      {FAQ.map((item, i) => {
        const isOpen = openId === item.id;
        return (
          <FadeInUp key={item.id} delay={i * 0.05}>
            <div
              className={`border rounded-xl overflow-hidden transition-colors duration-300 ${
                isOpen
                  ? "border-gold/40 bg-navy-card"
                  : "border-navy-border bg-navy-card hover:border-gold/20"
              }`}
            >
              {/* Question row */}
              <button
                onClick={() => toggle(item.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <span
                  className={`font-heading font-semibold text-sm sm:text-base transition-colors duration-200 ${
                    isOpen ? "text-gold" : "text-white"
                  }`}
                >
                  {item.question}
                </span>

                {/* Animated chevron */}
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex-shrink-0 w-6 h-6 rounded-full border border-navy-border flex items-center justify-center text-white-dim"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </motion.span>
              </button>

              {/* Answer — animated open/close */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-answer-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="px-6 pb-5 text-white-muted text-sm leading-relaxed border-t border-navy-border pt-4">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeInUp>
        );
      })}
    </div>
  );
}
