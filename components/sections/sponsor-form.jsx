"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, Phone, Building2, User, Mail, MessageSquare, ShieldCheck } from "lucide-react";

/**
 * Sponsorship Interest Form for TechFest Sri Lanka 2026.
 * Designed with industry best practices for B2B/Sponsorship lead generation.
 */

const TIERS = [
  "Platinum Partner",
  "Gold Partner",
  "Silver Partner",
  "Bronze Partner",
  "Tech / Tool Partner",
  "Media Partner",
  "Community Partner",
  "Other / Custom Partnership",
];

const initialState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  tier: TIERS[0],
  message: "",
};

export default function SponsorForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.company.trim()) e.company = "Company name is required";
    if (!form.email.trim()) e.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid business email";
    if (!form.message.trim()) e.message = "Please tell us how you'd like to support TechFest 2026";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
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
    
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'Sponsor', ...form }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({ message: 'Failed to send inquiry. Please try again or email us directly.' });
      setStatus("idle");
    }
  };

  const inputClass = (field) =>
    `w-full bg-navy-surface border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-300 focus:border-gold/60 focus:shadow-[0_0_0_4px_rgba(255,203,64,0.1)] group-hover:border-navy-border/80 ${
      errors[field] ? "border-red-500/60 shadow-[0_0_0_4px_rgba(239,68,68,0.1)]" : "border-navy-border"
    }`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-10 text-center gap-6"
      >
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shadow-[0_0_40px_rgba(255,203,64,0.1)]">
             <CheckCircle2 size={40} className="text-gold" />
          </div>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-gold"
          />
        </div>
        
        <div className="max-w-md space-y-3">
          <h4 className="text-white font-heading font-bold text-2xl tracking-tight">
            Interest Form Submitted!
          </h4>
          <p className="text-white-muted text-sm leading-relaxed">
            Thank you for your interest in partnering with <strong>TechFest Sri Lanka 2026</strong>. 
            Our sponsorship team will review your inquiry and reach out via email with the official prospectus within 24-48 hours.
          </p>
        </div>
        
        <button
          onClick={() => setStatus("idle")}
          className="text-gold text-sm hover:underline underline-offset-8 font-medium transition-all"
        >
          Submit another inquiry
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* Group 1: Identify */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
            <User size={12} className="text-gold/60" />
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Yasas Banuka"
            className={inputClass("name")}
          />
          {errors.name && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {errors.name}</p>}
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
            <Building2 size={12} className="text-gold/60" />
            Company / Organization
          </label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="e.g. IEEE TechVerse Sri Lanka"
            className={inputClass("company")}
          />
          {errors.company && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {errors.company}</p>}
        </div>
      </div>

      {/* Group 2: Contact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
            <Mail size={12} className="text-gold/60" />
            Business Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="e.g. partnership@techverse.lk"
            className={inputClass("email")}
          />
          {errors.email && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {errors.email}</p>}
        </div>

        <div className="group">
          <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
            <Phone size={12} className="text-gold/60" />
            Phone Number (Optional)
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="+94 7X XXX XXXX"
            className={inputClass("phone")}
          />
        </div>
      </div>

      {/* Tier Selection */}
      <div className="group">
        <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
          <ShieldCheck size={12} className="text-gold/60" />
          Interested Partnership Tier
        </label>
        <div className="relative">
          <select
            name="tier"
            value={form.tier}
            onChange={handleChange}
            className={`${inputClass("tier")} cursor-pointer appearance-none pr-10`}
          >
            {TIERS.map((t) => (
              <option key={t} value={t} className="bg-navy-deeper">
                {t}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white-dim">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="group">
        <label className="flex items-center gap-2 text-white-muted text-xs uppercase tracking-[0.2em] mb-2.5 font-medium">
          <MessageSquare size={12} className="text-gold/60" />
          Message / Special Requirements
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us how we can collaborate..."
          rows={4}
          className={`${inputClass("message")} resize-none`}
        />
        {errors.message && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-red-400" /> {errors.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy-deeper font-heading font-black py-4.5 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_35px_rgba(255,203,64,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98]"
      >
        {status === "sending" ? (
          <>
            <svg
              className="animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            <span className="tracking-tight uppercase text-xs">Processing Inquiry...</span>
          </>
        ) : (
          <>
            <span className="tracking-tight uppercase text-xs">Submit Interest Form</span>
            <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-white-dim text-[10px] uppercase tracking-widest mt-6">
        <span className="h-px w-8 bg-navy-border" />
        <span className="flex items-center gap-1">
          <ShieldCheck size={10} /> Secure & Encrypted
        </span>
        <span className="h-px w-8 bg-navy-border" />
      </div>
    </form>
  );
}
