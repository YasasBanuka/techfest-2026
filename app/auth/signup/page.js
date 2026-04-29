"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Lock, Phone, Building2, GraduationCap, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    role: "Undergraduate",
    university: "", // For Undergraduates
    year: "1st Year", // For Undergraduates
    schoolName: "", // For Students
    grade: "", // For Students
    company: "", // For Professionals
    designation: "", // For Professionals
    marketingConsent: true,
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const supabase = createClient();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      // 1. Sign up user in Supabase Auth
      // The profile is now created automatically by a DB trigger
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/callback`,
          data: {
            full_name: form.fullName,
            phone: form.phone,
            role: form.role,
            university: form.role === "Undergraduate" ? form.university : (form.role === "School Student" ? form.schoolName : form.company),
            year_of_study: form.role === "Undergraduate" ? form.year : (form.role === "School Student" ? form.grade : form.designation),
            marketing_consent: form.marketingConsent,
          }
        },
      });

      if (authError) throw authError;

      // 2. Sync to Resend Audiences (Optional marketing lead capture)
      if (authData?.user) {
        try {
          await fetch('/api/marketing/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              email: form.email, 
              name: form.fullName,
              tags: ['innovator', form.year] 
            }),
          });
        } catch (syncError) {
          console.warn("Resend sync failed but account created:", syncError);
        }
      }

      setStatus("success");
    } catch (err) {
      console.error("Signup error details:", {
        message: err.message,
        status: err.status,
        name: err.name
      });
      setError(err.message || "An unexpected error occurred. Please try again.");
      setStatus("error");
    }
  };

  const inputClass = "w-full bg-navy-surface border border-navy-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-300 focus:border-gold/60 focus:shadow-[0_0_0_4px_rgba(255,203,64,0.1)] group-hover:border-navy-border/80";

  if (status === "success") {
    return (
      <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center hex-pattern">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-navy-card/50 backdrop-blur-xl border border-navy-border rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="w-20 h-20 bg-gold/10 border border-gold/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_40px_rgba(255,203,64,0.1)]">
            <CheckCircle2 size={40} className="text-gold" />
          </div>
          <h1 className="text-3xl font-heading font-black text-white mb-4 italic uppercase tracking-tight">Confirm Your Email</h1>
          <p className="text-white-muted mb-8 leading-relaxed">
            We've sent a magic link to <strong className="text-white">{form.email}</strong>. 
            Please check your inbox (and spam folder) to verify your account and access the dashboard.
          </p>
          <Link 
            href="/auth/login"
            className="inline-flex items-center gap-2 text-gold font-heading font-bold uppercase text-sm tracking-widest hover:translate-x-2 transition-transform"
          >
            Back to Login <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center hex-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full bg-navy-card/50 backdrop-blur-xl border border-navy-border rounded-3xl p-8 md:p-12 gold-glow"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-black text-white mb-2 italic uppercase tracking-tighter">
            Join <span className="gold-gradient-text">TechFest 2026</span>
          </h1>
          <p className="text-white-muted text-sm tracking-wide uppercase">Create your innovator account</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <User size={12} className="text-gold/60" /> Full Name
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={form.fullName}
                onChange={handleChange}
                placeholder="e.g. Yasas Banuka"
                className={inputClass}
              />
            </div>

            {/* Email */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <Mail size={12} className="text-gold/60" /> Email Address
              </label>
              <input
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Password */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <Lock size={12} className="text-gold/60" /> Password
              </label>
              <input
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                className={inputClass}
              />
            </div>

            {/* Phone */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <Phone size={12} className="text-gold/60" /> Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+94 7X XXX XXXX"
                className={inputClass}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
              <ShieldCheck size={12} className="text-gold/60" /> Identity Role
            </label>
            <div className="relative">
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
              >
                <option value="Undergraduate" className="bg-navy-deeper">Undergraduate</option>
                <option value="School Student" className="bg-navy-deeper">School Student</option>
                <option value="Professional" className="bg-navy-deeper">Professional</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <ArrowRight size={14} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Conditional Fields based on Role */}
            {form.role === "Undergraduate" && (
              <>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <Building2 size={12} className="text-gold/60" /> University / Institute
                  </label>
                  <input
                    type="text"
                    name="university"
                    required
                    value={form.university}
                    onChange={handleChange}
                    placeholder="e.g. University of Moratuwa"
                    className={inputClass}
                  />
                </div>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <GraduationCap size={12} className="text-gold/60" /> Year of Study
                  </label>
                  <div className="relative">
                    <select
                      name="year"
                      value={form.year}
                      onChange={handleChange}
                      className={`${inputClass} cursor-pointer appearance-none pr-10`}
                    >
                      <option value="1st Year" className="bg-navy-deeper">1st Year</option>
                      <option value="2nd Year" className="bg-navy-deeper">2nd Year</option>
                      <option value="3rd Year" className="bg-navy-deeper">3rd Year</option>
                      <option value="4th Year" className="bg-navy-deeper">4th Year</option>
                      <option value="Postgraduate" className="bg-navy-deeper">Postgraduate</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                      <ArrowRight size={14} className="rotate-90" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {form.role === "School Student" && (
              <>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <Building2 size={12} className="text-gold/60" /> School Name
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={form.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Royal College"
                    className={inputClass}
                  />
                </div>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <GraduationCap size={12} className="text-gold/60" /> Grade / Year
                  </label>
                  <input
                    type="text"
                    name="grade"
                    required
                    value={form.grade}
                    onChange={handleChange}
                    placeholder="e.g. Grade 13"
                    className={inputClass}
                  />
                </div>
              </>
            )}

            {form.role === "Professional" && (
              <>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <Building2 size={12} className="text-gold/60" /> Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    required
                    value={form.company}
                    onChange={handleChange}
                    placeholder="e.g. TechVerse"
                    className={inputClass}
                  />
                </div>
                <div className="group">
                  <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                    <GraduationCap size={12} className="text-gold/60" /> Designation / Job Role
                  </label>
                  <input
                    type="text"
                    name="designation"
                    required
                    value={form.designation}
                    onChange={handleChange}
                    placeholder="e.g. Software Engineer"
                    className={inputClass}
                  />
                </div>
              </>
            )}
          </div>

          {/* Marketing Consent */}
          <div className="flex items-center gap-3 pt-2">
            <input
              type="checkbox"
              id="marketingConsent"
              name="marketingConsent"
              checked={form.marketingConsent}
              onChange={handleChange}
              className="w-4 h-4 rounded border-navy-border bg-navy-surface text-gold focus:ring-gold/20 cursor-pointer"
            />
            <label htmlFor="marketingConsent" className="text-xs text-white-muted cursor-pointer hover:text-white transition-colors">
              I agree to receive updates about TechFest 2026 and future events.
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-gold text-navy-deeper font-heading font-black py-4.5 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_35px_rgba(255,203,64,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.98] uppercase tracking-tighter"
          >
            {status === "loading" ? (
              <>
                <svg className="animate-spin h-5 w-5 text-navy-deeper" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Launch My Account</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-navy-border/50 pt-8">
          <p className="text-white-muted text-sm">
            Already registered?{" "}
            <Link href="/auth/login" className="text-gold hover:text-gold-bright font-bold underline underline-offset-4 decoration-gold/30">
              Back to Login
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-white-dim text-[10px] uppercase tracking-widest mt-8">
          <span className="h-px w-8 bg-navy-border" />
          <span className="flex items-center gap-1">
            <ShieldCheck size={10} /> Secure & Encrypted
          </span>
          <span className="h-px w-8 bg-navy-border" />
        </div>
      </motion.div>
    </div>
  );
}
