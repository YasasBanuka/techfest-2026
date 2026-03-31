"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Linkedin, 
  Briefcase, 
  Mic2, 
  FileText, 
  Layers, 
  CheckCircle2, 
  PlusCircle,
  ShieldCheck 
} from "lucide-react";

/**
 * Speaker Proposal Form for TechFest Sri Lanka 2026.
 * Designed with conference CFP best practices (Call for Proposals).
 */

const TRACKS = [
  "Technical Deep-dive",
  "Product & Innovation",
  "Future of AI/ML",
  "Cybersecurity & Privacy",
  "Software Engineering Excellence",
  "Developer Experience (DevEx)",
  "Research & Academic",
  "Other / Multi-track",
];

const initialState = {
  name: "",
  email: "",
  linkedin: "",
  role: "",
  org: "",
  bio: "",
  title: "",
  track: TRACKS[0],
  abstract: "",
};

export default function SpeakerForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email address";
    if (!form.title.trim()) e.title = "Talk title is required";
    if (!form.bio.trim()) e.bio = "Speaker bio is required";
    if (!form.abstract.trim()) e.abstract = "Talk abstract is required";
    else if (form.abstract.trim().length < 50)
      e.abstract = "Abstract must be at least 50 characters";
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
        body: JSON.stringify({ type: 'Speaker', ...form }),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      setStatus("success");
      setForm(initialState);
    } catch (error) {
      console.error('Submission failed:', error);
      setErrors({ abstract: 'Failed to submit proposal. Please try again or email us directly.' });
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
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-gold"
          />
        </div>
        
        <div className="max-w-md space-y-3">
          <h4 className="text-white font-heading font-bold text-2xl tracking-tight uppercase">
            Proposal Submitted!
          </h4>
          <p className="text-white-muted text-sm leading-relaxed">
            Thank you for sharing your expertise. Our content committee will review your proposal for <strong>TechFest Sri Lanka 2026</strong>. 
            You can expect a response within 14 business days.
          </p>
        </div>
        
        <button
          onClick={() => setStatus("idle")}
          className="text-gold text-sm hover:underline underline-offset-8 font-medium transition-all uppercase tracking-widest"
        >
          Submit another proposal
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8" noValidate>
      {/* ── Section: Speaker Info ── */}
      <div>
        <h5 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-5 flex items-center gap-3">
          <span className="w-8 h-px bg-gold/20" /> Speaker Information
        </h5>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
              <User size={12} className="text-gold/60" /> Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Dr. Jane Doe"
              className={inputClass("name")}
            />
            {errors.name && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">{errors.name}</p>}
          </div>

          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
              <Mail size={12} className="text-gold/60" /> Business Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. speaker@techverse.lk"
              className={inputClass("email")}
            />
            {errors.email && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">{errors.email}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
              <Briefcase size={12} className="text-gold/60" /> Role & Organization
            </label>
            <input
              type="text"
              name="org"
              value={form.org}
              onChange={handleChange}
              placeholder="e.g. Principal Architect at XYZ"
              className={inputClass("org")}
            />
          </div>
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
              <Linkedin size={12} className="text-gold/60" /> LinkedIn Profile URL
            </label>
            <input
              type="text"
              name="linkedin"
              value={form.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className={inputClass("linkedin")}
            />
          </div>
        </div>

        <div className="mt-6 group">
          <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
            <FileText size={12} className="text-gold/60" /> Short Bio
          </label>
          <textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="Describe your background and expertise briefly..."
            rows={2}
            className={`${inputClass("bio")} resize-none`}
          />
          {errors.bio && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">{errors.bio}</p>}
        </div>
      </div>

      {/* ── Section: Talk Details ── */}
      <div>
        <h5 className="text-gold text-[10px] uppercase tracking-[0.3em] font-bold mb-5 flex items-center gap-3">
          <span className="w-8 h-px bg-gold/20" /> Talk Details
        </h5>

        <div className="group">
          <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
            <Mic2 size={12} className="text-gold/60" /> Talk Title
          </label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Building Scalable Agentic Workflows"
            className={inputClass("title")}
          />
          {errors.title && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">{errors.title}</p>}
        </div>

        <div className="mt-6 group">
          <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
            <Layers size={12} className="text-gold/60" /> Talk Track
          </label>
          <div className="relative">
            <select
              name="track"
              value={form.track}
              onChange={handleChange}
              className={`${inputClass("track")} cursor-pointer appearance-none pr-10`}
            >
              {TRACKS.map((t) => (
                <option key={t} value={t} className="bg-navy-deeper">
                  {t}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white-dim">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
            </div>
          </div>
        </div>

        <div className="mt-6 group">
          <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-medium">
            <FileText size={12} className="text-gold/60" /> Talk Abstract / Description
          </label>
          <textarea
            name="abstract"
            value={form.abstract}
            onChange={handleChange}
            placeholder="Detailed overview of what attendees will learn... (Min. 50 characters)"
            rows={4}
            className={`${inputClass("abstract")} resize-none`}
          />
          {errors.abstract && <p className="text-red-400 text-[11px] mt-1.5 flex items-center gap-1">{errors.abstract}</p>}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-navy-deeper font-heading font-black py-4.5 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_35px_rgba(255,203,64,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] group"
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
            <span className="tracking-tighter uppercase text-xs">Processing Proposal...</span>
          </>
        ) : (
          <>
            <span className="tracking-tighter uppercase text-sm font-black">Submit Talk Proposal</span>
            <PlusCircle size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-4 text-white-dim text-[9px] uppercase tracking-widest mt-6 opacity-40">
        <ShieldCheck size={10} /> Secure Submission System
      </div>
    </form>
  );
}
