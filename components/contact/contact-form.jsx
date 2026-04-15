"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";
import { Send, CheckCircle2, Wifi, Database, Terminal, ChevronDown } from "lucide-react";

const SUBJECTS = [
  "General Inquiry",
  "Sponsorship",
  "Speaker / Workshop Proposal",
  "Media & Press",
  "Volunteering",
  "Other",
];

const initialState = {
  name: "",
  email: "",
  subject: SUBJECTS[0],
  message: "",
};

/**
 * ContactForm — 'The Transmission Portal'
 * ──────────────────────────────────────
 * Immersive noir form with high-tech focus states 
 * and clear, accessible communication.
 */
export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Identification required";
    if (!form.email.trim()) e.email = "Communication link required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Invalid link format";
    if (!form.message.trim()) e.message = "Message payload missing";
    else if (form.message.trim().length < 20)
      e.message = "Payload too short (min 20 chars)";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 2000)); // Simulating deep encryption/uplink
    setStatus("success");
    setForm(initialState);
  };

  const inputClass = (field) =>
    `w-full bg-white/[0.03] border rounded-xl px-5 py-4 text-white text-sm placeholder:text-white/20 outline-none transition-all duration-700 
    ${focusedField === field ? "border-gold/40 shadow-[0_0_20px_rgba(255,179,0,0.1)] blur-none opacity-100" : "border-white/5 blur-[0.5px] opacity-80"}
    ${errors[field] ? "!border-red-500/40" : ""}
    `;

  return (
    <FadeInUp>
      <CyberModule className="relative !p-0 bg-navy-card/40 border-white/5 overflow-hidden">
        
        {/* Form Header HUD */}
        <div className="p-6 md:p-10 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
           <div className="flex items-center gap-3">
              <Terminal size={16} className="text-gold/60" />
              <h3 className="text-white font-heading font-black text-xl uppercase tracking-tighter">
                 Transmission <span className="gold-gradient-text italic">Portal</span>
              </h3>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 bg-gold/10 border border-gold/20 rounded-full">
                 <div className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
                 <span className="text-[9px] font-mono text-gold font-black uppercase tracking-widest leading-none">Uplink_Ready</span>
              </div>
           </div>
        </div>

        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(20px)" }}
                className="flex flex-col items-center justify-center py-16 text-center gap-6"
              >
                <div className="relative">
                  <motion.div 
                    animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute inset-0 bg-gold/20 blur-xl rounded-full"
                  />
                  <div className="relative w-20 h-20 rounded-full bg-gold/5 border border-gold/40 flex items-center justify-center shadow-[0_0_40px_rgba(255,179,0,0.2)]">
                    <CheckCircle2 size={32} className="text-gold" />
                  </div>
                </div>

                <div>
                  <p className="text-white font-heading font-black text-2xl uppercase tracking-tight mb-2">
                    Uplink Established
                  </p>
                  <p className="text-white-dim text-sm font-light italic max-w-sm mx-auto">
                    Your transmission has been encrypted and buffered for processing. 
                    Expect a response via the designated signal channel within 48 cycles.
                  </p>
                </div>

                <button
                  onClick={() => setStatus("idle")}
                  className="flex items-center gap-2 text-gold text-[10px] font-mono uppercase tracking-[0.4em] hover:text-gold-bright transition-colors group pt-4"
                >
                  <span className="w-4 h-px bg-gold/30 group-hover:w-8 transition-all" />
                  Initiate_New_Link
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                
                {/* HUD Field Annotation */}
                <div className="flex items-center gap-4 opacity-10">
                   <div className="h-px flex-1 bg-white" />
                   <span className="text-[8px] font-mono uppercase tracking-widest whitespace-nowrap">Input_Fields_Start</span>
                   <div className="h-px flex-1 bg-white" />
                </div>

                {/* Name + Email row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Your Name</span>
                      <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">FLD_01</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleChange}
                      placeholder="e.g. Yasas Banuka"
                      className={inputClass("name")}
                    />
                    {errors.name && (
                      <p className="text-red-400 text-[10px] font-mono uppercase italic px-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Email Address</span>
                      <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">FLD_02</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={inputClass("email")}
                    />
                    {errors.email && (
                      <p className="text-red-400 text-[10px] font-mono uppercase italic px-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Subject</span>
                    <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">FLD_03</span>
                  </label>
                  <div className="relative">
                    <select
                      name="subject"
                      value={form.subject}
                      onFocus={() => setFocusedField("subject")}
                      onBlur={() => setFocusedField(null)}
                      onChange={handleChange}
                      className={`${inputClass("subject")} cursor-pointer appearance-none`}
                    >
                      {SUBJECTS.map((s) => (
                        <option key={s} value={s} className="bg-navy-card text-white">
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="flex items-center justify-between px-1">
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Your Message</span>
                    <span className="text-[8px] font-mono text-white/10 uppercase tracking-widest">FLD_04</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={handleChange}
                    placeholder="How can we help you?"
                    rows={6}
                    className={`${inputClass("message")} resize-none`}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-[10px] font-mono uppercase italic px-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Container */}
                <div className="pt-6 relative">
                   {/* Bottom Status HUD */}
                   <div className="flex items-center gap-6 mb-8 px-2">
                      <div className="flex items-center gap-2">
                         <Database size={12} className="text-white/20" />
                         <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">System: Ready</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Wifi size={12} className="text-white/20" />
                         <span className="text-[8px] font-mono text-white/30 tracking-widest uppercase">Signal: Stable</span>
                      </div>
                   </div>

                   <button
                     type="submit"
                     disabled={status === "sending"}
                     className="relative w-full group overflow-hidden"
                   >
                     <div className="absolute inset-0 bg-gold transform skew-x-12 translate-x-1 duration-300 group-hover:translate-x-0" />
                     <div className="relative w-full bg-gold text-navy-deeper font-heading font-black py-5 rounded-sm hover:bg-gold-bright transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 uppercase tracking-[0.3em] text-xs">
                        {status === "sending" ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                               <Wifi size={18} />
                            </motion.div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </>
                        )}
                     </div>
                   </button>
                </div>
              </form>
            )}
          </AnimatePresence>
        </div>
      </CyberModule>
    </FadeInUp>
  );
}
