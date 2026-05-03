"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Phone, Building2, GraduationCap, Save, ShieldCheck, CheckCircle2, Compass } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    full_name: "",
    phone: "",
    role: "Undergraduate",
    university: "",
    year_of_study: "1st Year",
    career_preference: "Exploring Options",
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
          role: data.role || user.user_metadata?.role || "Undergraduate",
          university: data.university || "",
          year_of_study: data.year_of_study || "1st Year",
          career_preference: data.career_preference || "Exploring Options",
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

    // 1. Update auth metadata (for role and display name)
    const { error: authError } = await supabase.auth.updateUser({
      data: { 
        full_name: profile.full_name,
        role: profile.role,
        university: profile.university,
        year_of_study: profile.year_of_study,
        career_preference: profile.career_preference,
      }
    });

    if (authError) {
      setSaving(false);
      setMessage({ type: "error", text: authError.message });
      return;
    }

    // 2. Update profiles table
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        phone: profile.phone,
        role: profile.role,
        university: profile.university,
        year_of_study: profile.year_of_study,
        career_preference: profile.career_preference,
        marketing_consent: profile.marketing_consent,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    setSaving(false);
    if (profileError) {
      setMessage({ type: "error", text: profileError.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Identity Role */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <ShieldCheck size={12} className="text-gold/60" /> Identity Role
              </label>
              <select
                name="role"
                value={profile.role}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
              >
                <option value="Undergraduate" className="bg-navy-deeper">Undergraduate</option>
                <option value="School Student" className="bg-navy-deeper">School Student</option>
                <option value="Professional" className="bg-navy-deeper">Professional</option>
              </select>
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
            {/* Dynamic University/School/Company Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <Building2 size={12} className="text-gold/60" /> 
                {profile.role === "Undergraduate" ? "University / Institute" : 
                 profile.role === "School Student" ? "School Name" : "Company / Organization"}
              </label>
              <input
                type="text"
                name="university"
                value={profile.university}
                onChange={handleChange}
                placeholder={
                  profile.role === "Undergraduate" ? "e.g. University of Moratuwa" :
                  profile.role === "School Student" ? "e.g. Royal College" : "e.g. IEEE TechVerse Sri Lanka"
                }
                className={inputClass}
              />
            </div>

            {/* Dynamic Year/Grade/Designation Field */}
            <div className="group">
              <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
                <GraduationCap size={12} className="text-gold/60" /> 
                {profile.role === "Undergraduate" ? "Year of Study" : 
                 profile.role === "School Student" ? "Grade / Year" : "Designation / Job Role"}
              </label>
              {profile.role === "Undergraduate" ? (
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
                </select>
              ) : (
                <input
                  type="text"
                  name="year_of_study"
                  value={profile.year_of_study}
                  onChange={handleChange}
                  placeholder={
                    profile.role === "School Student" ? "e.g. Grade 13" : "e.g. Software Engineer"
                  }
                  className={inputClass}
                />
              )}
            </div>
          </div>

          {/* Career Preference */}
          <div className="group">
            <label className="flex items-center gap-2 text-white-muted text-[10px] uppercase tracking-[0.2em] mb-2 font-black">
              <Compass size={12} className="text-gold/60" /> Career Preference
            </label>
            <div className="relative">
              <select
                name="career_preference"
                value={profile.career_preference}
                onChange={handleChange}
                className={`${inputClass} cursor-pointer appearance-none pr-10`}
              >
                {[
                  "Exploring Options",
                  "Seeking Internship",
                  "Seeking Full-Time Job",
                  "Seeking Overseas Education",
                  "Seeking Scholarship / Funding",
                  "Building a Startup",
                  "Expanding Professional Network",
                  "Upskilling / Learning",
                ].map((pref) => (
                  <option key={pref} value={pref} className="bg-navy-deeper">{pref}</option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20 text-xs">▼</div>
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
