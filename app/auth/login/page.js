"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, ShieldCheck, Key } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      setStatus("success");
      router.push("/dashboard");
      router.refresh(); // Refresh to update middleware state
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid email or password.");
      setStatus("idle");
    }
  };

  const inputClass = "w-full bg-navy-surface border border-navy-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-300 focus:border-gold/60 focus:shadow-[0_0_0_4px_rgba(255,203,64,0.1)] group-hover:border-navy-border/80";

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center hex-pattern">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-navy-card/50 backdrop-blur-xl border border-navy-border rounded-3xl p-8 md:p-12 gold-glow"
      >
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-heading font-black text-white mb-2 italic uppercase tracking-tighter">
            Welcome <span className="gold-gradient-text">Back</span>
          </h1>
          <p className="text-white-muted text-sm tracking-wide uppercase">Login to your dashboard</p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
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

          {/* Password */}
          <div className="group">
            <div className="flex justify-between items-center mb-2">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] font-black">
                <Lock size={12} className="text-gold/60" /> Password
              </label>
              <Link href="/auth/reset-password" size={12} className="text-[10px] text-gold/60 hover:text-gold uppercase tracking-widest font-black transition-colors">
                Forgot?
              </Link>
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={inputClass}
            />
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
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Secure Login</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-navy-border/50 pt-8">
          <p className="text-white-muted text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-gold hover:text-gold-bright font-bold underline underline-offset-4 decoration-gold/30">
              Register Now
            </Link>
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 text-white-dim text-[10px] uppercase tracking-widest mt-8">
          <span className="h-px w-8 bg-navy-border" />
          <span className="flex items-center gap-1">
            <ShieldCheck size={10} /> PKCE Protected
          </span>
          <span className="h-px w-8 bg-navy-border" />
        </div>
      </motion.div>
    </div>
  );
}
