"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowRight, ShieldCheck, Key, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const supabase = createClient();

  const handleReset = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      });

      if (resetError) throw resetError;

      setStatus("success");
    } catch (err) {
      console.error("Reset password error:", err);
      setError(err.message || "Failed to send reset email.");
      setStatus("idle");
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
          <h1 className="text-3xl font-heading font-black text-white mb-4 italic uppercase tracking-tight">Check Your Inbox</h1>
          <p className="text-white-muted mb-8 leading-relaxed">
            We've sent a password reset link to <strong className="text-white">{email}</strong>. 
            Follow the instructions in the email to set a new password.
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
        className="max-w-md w-full bg-navy-card/50 backdrop-blur-xl border border-navy-border rounded-3xl p-8 md:p-12 gold-glow"
      >
        <div className="mb-10 text-center">
          <div className="w-16 h-16 bg-gold/10 border border-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
             <Key size={30} className="text-gold" />
          </div>
          <h1 className="text-4xl font-heading font-black text-white mb-2 italic uppercase tracking-tighter">
            Reset <span className="gold-gradient-text">Password</span>
          </h1>
          <p className="text-white-muted text-sm tracking-wide uppercase">Recover your techfest account</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        <form onSubmit={handleReset} className="space-y-6">
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
              <Mail size={12} className="text-gold/60" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

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
                <span>Sending...</span>
              </>
            ) : (
              <>
                <span>Send Reset Link</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-navy-border/50 pt-8">
          <p className="text-white-muted text-sm">
            Remembered your password?{" "}
            <Link href="/auth/login" className="text-gold hover:text-gold-bright font-bold underline underline-offset-4 decoration-gold/30">
              Return to Login
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-white-dim text-[10px] uppercase tracking-widest mt-8">
          <span className="h-px w-8 bg-navy-border" />
          <span className="flex items-center gap-1">
            <ShieldCheck size={10} /> Secure Recovery
          </span>
          <span className="h-px w-8 bg-navy-border" />
        </div>
      </motion.div>
    </div>
  );
}
