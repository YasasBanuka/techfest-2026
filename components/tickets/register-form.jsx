"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { REGISTER_FORM_SUBJECTS } from "@/data/tickets";
import FadeInUp from "@/components/ui/fade-in-up";

const initialState = { name: "", email: "", university: "", subject: REGISTER_FORM_SUBJECTS[0], whatsapp: "" };

/**
 * RegisterForm
 * ─────────────
 * Pre-registration form — collects interest and notifies the team.
 * Replace the submit handler with a real API (Formspree, Google Forms, etc.)
 */
export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("sending");
    // ── TODO: Replace with real form API call ──
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  const inputBase =
    "w-full bg-navy-surface border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-200 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(255,179,0,0.08)]";
  const field = (name) => `${inputBase} ${errors[name] ? "border-red-500/60" : "border-navy-border"}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-14 text-center gap-4"
      >
        <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" stroke="#FFB300" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
        <div>
          <p className="text-white font-heading font-bold text-lg">You&apos;re Registered!</p>
          <p className="text-white-muted text-sm mt-1 max-w-xs">
            We&apos;ll send confirmation details to <span className="text-gold">{form.email}</span> closer to the event.
          </p>
        </div>
        <button onClick={() => { setStatus("idle"); setForm(initialState); }} className="text-gold text-sm hover:underline underline-offset-2 mt-1">
          Register another person
        </button>
      </motion.div>
    );
  }

  return (
    <FadeInUp>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white-muted text-xs uppercase tracking-wider mb-1.5">Full Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Yasas Banuka" className={field("name")} />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label className="block text-white-muted text-xs uppercase tracking-wider mb-1.5">Email Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@example.com" className={field("email")} />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        {/* University + WhatsApp */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-white-muted text-xs uppercase tracking-wider mb-1.5">University / Organisation</label>
            <input type="text" name="university" value={form.university} onChange={handleChange} placeholder="University of Moratuwa" className={field("university")} />
          </div>
          <div>
            <label className="block text-white-muted text-xs uppercase tracking-wider mb-1.5">WhatsApp Number</label>
            <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+94 77 000 0000" className={field("whatsapp")} />
          </div>
        </div>

        {/* Ticket type */}
        <div>
          <label className="block text-white-muted text-xs uppercase tracking-wider mb-1.5">I&apos;m Interested In</label>
          <select name="subject" value={form.subject} onChange={handleChange} className={`${field("subject")} cursor-pointer`}>
            {REGISTER_FORM_SUBJECTS.map((s) => (
              <option key={s} value={s} className="bg-navy-deeper">{s}</option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full bg-gold text-navy-deeper font-heading font-black py-4 rounded-xl text-sm hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(255,179,0,0.3)] transition-all duration-300 disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {status === "sending" ? (
            <>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
              Registering...
            </>
          ) : "Register My Interest"}
        </button>

        <p className="text-white-dim/60 text-xs text-center">
          Ticket pricing will be announced soon · We&apos;ll notify you by email
        </p>
      </form>
    </FadeInUp>
  );
}
