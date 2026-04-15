"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Database, Hash, Shield } from "lucide-react";

const FAQS = [
  {
    id: "01",
    question: "When and where is TechFest 2026?",
    answer:
      "TechFest Sri Lanka 2026 takes place on November 07, 2026. The physical venue is currently being finalized and will be announced to all registered participants very soon.",
  },
  {
    id: "02",
    question: "How can I register for the event?",
    answer:
      "You can register directly on our website. Simply create an account and verify your email to book your spot and receive further updates.",
  },
  {
    id: "03",
    question: "Is there a registration fee?",
    answer:
      "Ticket prices vary. General entry is open to the public, while specific workshops and hackathons may have separate booking fees. Full details are available in our ticket section.",
  },
  {
    id: "04",
    question: "Can I participate as a volunteer?",
    answer:
      "Yes! We are always looking for volunteers to help us run the event. You can submit a request through the contact form above by selecting 'Volunteering' as the subject.",
  },
];

/**
 * FAQAccordion — 'Archived Records'
 * ───────────────────────────────
 * A high-vibe FAQ system with misty transitions 
 * and clear, helpful information.
 */
export default function FAQAccordion() {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <div className="space-y-4">
      {FAQS.map((faq) => (
        <div 
          key={faq.id}
          className="border-b border-white/5 last:border-0"
        >
          <button
            onClick={() => toggle(faq.id)}
            className="w-full py-6 flex items-start gap-4 text-left group transition-all duration-300"
          >
            {/* HUD Record Index */}
            <div className="shrink-0 pt-1">
               <div className="flex flex-col items-center">
                  <span className="text-gold text-[9px] font-mono font-black tracking-widest leading-none mb-1">{faq.id}</span>
                  <div className={`w-px h-6 transition-all duration-700 ${openId === faq.id ? "bg-gold/40 h-10" : "bg-white/5"}`} />
               </div>
            </div>

            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-3 mb-2 opacity-20">
                  <Hash size={10} className="text-white" />
                  <span className="text-[8px] font-mono uppercase tracking-[0.4em]">INFO_REF_0x{faq.id}</span>
               </div>
               
               <h4 className={`text-sm md:text-base font-heading font-black uppercase tracking-tight transition-colors duration-500
                 ${openId === faq.id ? "text-white" : "text-white/60 group-hover:text-white"}
               `}>
                 {faq.question}
               </h4>
            </div>

            <motion.div
              animate={{ rotate: openId === faq.id ? 180 : 0 }}
              className={`shrink-0 mt-1 transition-colors duration-500 ${openId === faq.id ? "text-gold" : "text-white/20"}`}
            >
              <ChevronDown size={18} />
            </motion.div>
          </button>

          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                exit={{ height: 0, opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pb-8 pl-12">
                   <p className="text-white-dim text-sm leading-relaxed font-light italic">
                     {faq.answer}
                   </p>
                   
                   {/* Record Footer HUD */}
                   <div className="mt-6 flex items-center gap-6 opacity-20">
                      <div className="flex items-center gap-2">
                         <Shield size={10} />
                         <span className="text-[8px] font-mono uppercase tracking-widest">Status: Verified</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Database size={10} />
                         <span className="text-[8px] font-mono uppercase tracking-widest">Source: Official Info</span>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
