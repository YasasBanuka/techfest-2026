"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FadeInUp from "@/components/ui/fade-in-up";

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
 * ContactForm — Animated form with validation feedback
 * Simulates a successful send (replace the handler with a real API call).
 */
export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    else if (form.message.trim().length < 20)
      e.message = "Message must be at least 20 characters";
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
    // ── TODO: Replace with real form submission (e.g. Formspree, Resend, etc.) ──
    await new Promise((r) => setTimeout(r, 1500)); // simulate network
    setStatus("success");
    setForm(initialState);
  };

  const inputClass = (field) =>
    `w-full bg-navy-surface border rounded-xl px-4 py-3 text-white text-sm placeholder:text-white-dim outline-none transition-all duration-200 focus:border-gold/60 focus:shadow-[0_0_0_3px_rgba(255,203,64,0.08)] ${
      errors[field] ? "border-red-500/60" : "border-navy-border"
    }`;

  return (
    <FadeInUp>
      <div className="bg-navy-card border border-navy-border rounded-2xl p-8">
        <h3 className="text-white font-heading font-bold text-xl mb-6">
          Send Us a Message
        </h3>

        {status === "success" ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center gap-4"
          >
            <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffcb40"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <div>
              <p className="text-white font-heading font-bold text-lg">
                Message Sent!
              </p>
              <p className="text-white-muted text-sm mt-1">
                We&apos;ll get back to you within 48 hours.
              </p>
            </div>
            <button
              onClick={() => setStatus("idle")}
              className="text-gold text-sm hover:underline underline-offset-2 mt-2"
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-white-muted text-xs uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Yasas Banuka"
                  className={inputClass("name")}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label className="block text-white-muted text-xs uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={inputClass("email")}
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Subject */}
            <div>
              <label className="block text-white-muted text-xs uppercase tracking-wider mb-2">
                Subject
              </label>
              <select
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className={`${inputClass("subject")} cursor-pointer`}
              >
                {SUBJECTS.map((s) => (
                  <option key={s} value={s} className="bg-navy-deeper">
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-white-muted text-xs uppercase tracking-wider mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us how we can help..."
                rows={5}
                className={`${inputClass("message")} resize-none`}
              />
              {errors.message && (
                <p className="text-red-400 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-gold text-navy-deeper font-heading font-bold py-4 rounded-xl hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(255,203,64,0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {status === "sending" ? (
                <>
                  <svg
                    className="animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        )}
      </div>
    </FadeInUp>
  );
}
