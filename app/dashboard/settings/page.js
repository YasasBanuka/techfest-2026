"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Building2, GraduationCap, Save, ShieldCheck, CheckCircle2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    university: "",
    year_of_study: "1st Year",
    marketing_consent: true,
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/auth/login");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name || "",
          phone: data.phone || "",
          university: data.university || "",
          year_of_study: data.year_of_study || "1st Year",
          marketing_consent: data.marketing_consent ?? true,
        });
      }
      setLoading(false);
    }

    getProfile();
  }, [supabase, router]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        university: profile.university,
        year_of_study: profile.year_of_study,
        marketing_consent: profile.marketing_consent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSaving(false);
    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
      // Clear message after 3 seconds
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const inputClass = "w-full bg-navy-surface border border-navy-border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-300 focus:border-gold/60 focus:shadow-[0_0_0_4px_rgba(255,203,64,0.1)] group-hover:border-navy-border/80";

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="w-12 h-12 border-4 border-gold/20 border-t-gold rounded-full animate-spin" />
        <p className="text-white-dim text-xs uppercase tracking-widest font-black">Syncing Identity...</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-black text-white italic uppercase tracking-tighter mb-2">
          Profile <span className="gold-gradient-text">Settings</span>
        </h1>
        <p className="text-white-muted text-sm">Update your personal and academic information.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-navy-card/30 border border-navy-border rounded-3xl p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <User size={12} className="text-gold/60" /> Full Name
              </label>
              <input
                type="text"
                name="full_name"
                required
                value={profile.full_name}
                onChange={handleChange}
                placeholder="e.g. Yasas Banuka"
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
                value={profile.phone}
                onChange={handleChange}
                placeholder="+94 7X XXX XXXX"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* University */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <Building2 size={12} className="text-gold/60" /> University / Institute
              </label>
              <input
                type="text"
                name="university"
                value={profile.university}
                onChange={handleChange}
                placeholder="e.g. University of Moratuwa"
                className={inputClass}
              />
            </div>

            {/* Year of Study */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <GraduationCap size={12} className="text-gold/60" /> Year of Study
              </label>
              <select
                name="year_of_study"
                value={profile.year_of_study}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
              >
                <option value="1st Year" className="bg-navy-deeper">1st Year</option>
                <option value="2nd Year" className="bg-navy-deeper">2nd Year</option>
                <option value="3rd Year" className="bg-navy-deeper">3rd Year</option>
                <option value="4th Year" className="bg-navy-deeper">4th Year</option>
                <option value="Postgraduate" className="bg-navy-deeper">Postgraduate</option>
                <option value="Industry Professional" className="bg-navy-deeper">Industry Professional</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-navy-border/50">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="marketing_consent"
                name="marketing_consent"
                checked={profile.marketing_consent}
                onChange={handleChange}
                className="w-4 h-4 rounded border-navy-border bg-navy-surface text-gold focus:ring-gold/20 cursor-pointer"
              />
              <label htmlFor="marketing_consent" className="text-xs text-white-muted cursor-pointer hover:text-white transition-colors">
                I agree to receive updates about TechFest 2026 and future innovations via email.
              </label>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            {message && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${
                  message.type === "success" ? "text-green-400" : "text-red-400"
                }`}
              >
                {message.type === "success" ? <CheckCircle2 size={14} /> : <ShieldCheck size={14} />}
                {message.text}
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-gold text-navy-deeper font-heading font-black py-4 px-10 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_35px_rgba(255,203,64,0.35)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2.5 shadow-lg active:scale-[0.98] uppercase text-xs tracking-widest"
          >
            {saving ? "Saving Changes..." : "Save Settings"}
            {!saving && <Save size={16} />}
          </button>
        </div>
      </form>

      <div className="mt-12 p-6 bg-navy-card/10 border border-navy-border/30 rounded-2xl flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-navy-surface flex items-center justify-center text-white-dim">
           <ShieldCheck size={20} />
        </div>
        <p className="text-[11px] text-white-dim leading-relaxed">
          Your data is encrypted and stored securely in accordance with our Privacy Policy. 
          Marketing consent can be toggled at any time to opt-in or out of festival communications.
        </p>
      </div>
    </div>
  );
}
