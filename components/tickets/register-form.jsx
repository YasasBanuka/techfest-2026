"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { REGISTER_FORM_SUBJECTS } from "@/data/tickets";
import FadeInUp from "@/components/ui/fade-in-up";
import { Terminal, Send, CheckCircle2, Loader2 } from "lucide-react";

const initialState = { 
  name: "", 
  email: "", 
  role: "Undergraduate",
  university: "", 
  schoolName: "",
  grade: "",
  company: "",
  jobRole: "",
  subject: REGISTER_FORM_SUBJECTS[0], 
  whatsapp: "" 
};

/**
 * RegisterForm — Redesigned as a Noir 'Signal Transmission' portal.
 */
export default function RegisterForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid signal address";
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
    // ── Simulation: Transmitting signal ──
    await new Promise((r) => setTimeout(r, 1800));
    setStatus("success");
  };

  const inputBase =
    "w-full bg-white/[0.02] border rounded-xl px-4 py-4 text-white text-sm font-mono placeholder:text-white/10 outline-none transition-all duration-700 focus:border-gold/30 focus:bg-gold/[0.01]";
  const fieldClass = (name) => `${inputBase} ${errors[name] ? "border-red-500/40" : "border-white/5"}`;

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center py-20 text-center gap-6"
      >
        <div className="w-20 h-20 rounded-full bg-gold/5 border border-gold/20 flex items-center justify-center text-gold shadow-[0_0_30px_rgba(255,179,0,0.1)]">
           <CheckCircle2 size={32} />
        </div>
        <div>
          <h3 className="text-white font-heading font-black text-2xl uppercase italic tracking-tighter">Signal Received</h3>
          <p className="text-white/50 text-sm italic mt-2 max-w-xs mx-auto leading-relaxed">
            Your integration intent has been archived. We will transmit confirmation details to <span className="text-gold">{form.email}</span> soon.
          </p>
        </div>
        <button 
           onClick={() => { setStatus("idle"); setForm(initialState); }} 
           className="text-white/20 hover:text-gold text-[10px] font-mono uppercase tracking-[0.4em] transition-all duration-300 border-b border-transparent hover:border-gold/20 pb-1"
        >
          Transmit_Another_Signal
        </button>
      </motion.div>
    );
  }

  return (
    <FadeInUp>
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name + Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group">
            <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Identity_Full_Name *</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Yasas Banuka" className={fieldClass("name")} />
            {errors.name && <p className="text-red-500/60 text-[8px] font-mono uppercase tracking-widest mt-2 px-1">{errors.name}</p>}
          </div>
          <div className="group">
            <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Signal_Address *</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="operator@nexus.lk" className={fieldClass("email")} />
            {errors.email && <p className="text-red-500/60 text-[8px] font-mono uppercase tracking-widest mt-2 px-1">{errors.email}</p>}
          </div>
        </div>

        {/* Role Selection */}
        <div className="group">
          <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Identity_Role</label>
          <div className="relative">
            <select name="role" value={form.role} onChange={handleChange} className={`${fieldClass("role")} appearance-none cursor-pointer pr-10`}>
              <option value="Undergraduate" className="bg-navy-deeper">Undergraduate</option>
              <option value="School Student" className="bg-navy-deeper">School Student</option>
              <option value="Professional" className="bg-navy-deeper">Professional</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
              <Terminal size={14} />
            </div>
          </div>
        </div>

        {/* Dynamic Fields Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {form.role === "Undergraduate" && (
            <>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Origin_Academy</label>
                <input type="text" name="university" value={form.university} onChange={handleChange} placeholder="University of Moratuwa" className={fieldClass("university")} />
              </div>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Direct_Signal_Link</label>
                <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+94 77 000 0000" className={fieldClass("whatsapp")} />
              </div>
            </>
          )}

          {form.role === "School Student" && (
            <>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">School_Name</label>
                <input type="text" name="schoolName" value={form.schoolName} onChange={handleChange} placeholder="Royal College" className={fieldClass("schoolName")} />
              </div>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Grade_Level</label>
                <input type="text" name="grade" value={form.grade} onChange={handleChange} placeholder="Grade 13" className={fieldClass("grade")} />
              </div>
            </>
          )}

          {form.role === "Professional" && (
            <>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Organization_Node</label>
                <input type="text" name="company" value={form.company} onChange={handleChange} placeholder="TechVerse" className={fieldClass("company")} />
              </div>
              <div className="group">
                <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Designation_Code</label>
                <input type="text" name="jobRole" value={form.jobRole} onChange={handleChange} placeholder="Software Engineer" className={fieldClass("jobRole")} />
              </div>
            </>
          )}
        </div>

        {/* WhatsApp for non-undergraduates */}
        {form.role !== "Undergraduate" && (
          <div className="group">
            <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Direct_Signal_Link</label>
            <input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="+94 77 000 0000" className={fieldClass("whatsapp")} />
          </div>
        )}

        {/* Ticket type */}
        <div className="group">
          <label className="block text-white/30 text-[9px] font-mono uppercase tracking-[0.4em] mb-2 px-1">Integration_Subject</label>
          <div className="relative">
             <select name="subject" value={form.subject} onChange={handleChange} className={`${fieldClass("subject")} appearance-none cursor-pointer pr-10`}>
               {REGISTER_FORM_SUBJECTS.map((s) => (
                 <option key={s} value={s} className="bg-navy-deeper">{s}</option>
               ))}
             </select>
             <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/20">
                <Terminal size={14} />
             </div>
          </div>
        </div>

        <div className="pt-4">
           <button
             type="submit"
             disabled={status === "sending"}
             className="w-full bg-gold text-navy-deeper font-heading font-black py-5 rounded-xl text-[11px] uppercase tracking-[0.5em] hover:bg-gold-bright hover:shadow-[0_0_40px_rgba(255,179,0,0.3)] transition-all duration-700 disabled:opacity-40 flex items-center justify-center gap-4 group"
           >
             {status === "sending" ? (
               <>
                 <Loader2 size={16} className="animate-spin" />
                 Transmitting...
               </>
             ) : (
               <>
                 Initiate_Transmission
                 <Send size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
               </>
             )}
           </button>
        </div>

        <div className="flex items-center gap-4 opacity-20 pointer-events-none">
           <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/20" />
           <p className="text-[7px] font-mono text-white uppercase tracking-[0.4em]">Integrated_Sync: Pending_Validation</p>
           <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/20" />
        </div>
      </form>
    </FadeInUp>
  );
}
