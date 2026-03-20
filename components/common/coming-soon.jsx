"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Mail, ArrowRight, Loader2, Calendar, Clock, MapPin } from "lucide-react";

/**
 * High-End "Coming Soon" Experience
 * ────────────────────────────────
 * A full-screen atmospheric portal featuring:
 * - Interactive particle/star background
 * - GSAP-animated countdown
 * - Premium glassmorphism "Notify Me" interaction
 */
export default function ComingSoon() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // idle | loading | success
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

    const containerRef = useRef(null);
    const contentRef = useRef(null);
    const particlesRef = useRef(null);

    // Target Date: July 15, 2026
    const targetDate = new Date("2026-10-31T09:00:00").getTime();

    useEffect(() => {
        // --- Countdown Logic ---
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000)
            });
        }, 1000);

        // --- GSAP Animations ---
        const ctx = gsap.context(() => {
            // Initial Entry
            gsap.from(contentRef.current, {
                opacity: 0,
                y: 30,
                duration: 1.5,
                ease: "power3.out",
                delay: 0.5
            });

            // Subtle Background Pulse
            gsap.to(".bg-orb", {
                scale: 1.2,
                opacity: 0.6,
                duration: 4,
                repeat: -1,
                yoyo: true,
                stagger: 2,
                ease: "sine.inOut"
            });
        });

        return () => {
            clearInterval(interval);
            ctx.revert();
        };
    }, []);

    const handleNotify = (e) => {
        e.preventDefault();
        if (!email) return;
        setStatus("loading");

        // Simulate API call
        setTimeout(() => {
            setStatus("success");
            setEmail("");
        }, 2000);
    };

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#020617] font-sans selection:bg-gold selection:text-black"
        >
            {/* ── 🎭 Atmospheric Background ── */}
            <div className="absolute inset-0 z-0">
                {/* Dynamic Orbs */}
                <div className="bg-orb absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold/5 blur-[120px] rounded-full" />
                <div className="bg-orb absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[120px] rounded-full" />
                <div className="bg-orb absolute top-[20%] left-[40%] w-[30%] h-[30%] bg-purple-500/5 blur-[120px] rounded-full" />

                {/* Fine Dust Map (Canvas or CSS Grid) */}
                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
            </div>

            {/* ── 🚀 Content Portal ── */}
            <div
                ref={contentRef}
                className="relative z-10 w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center"
            >
                {/* TechFest Badge */}
                <div className="mb-8 mt-10 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-xl text-white-dim text-xs font-semibold tracking-widest uppercase animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-gold" />
                    TechFest 2026 • Coming Soon
                </div>

                <h1 className="text-5xl md:text-8xl font-heading font-black text-white mb-6 leading-tight tracking-tighter">
                    THE FUTURE <br />
                    <span className="text-gold drop-shadow-[0_0_30px_rgba(255,203,64,0.3)]">IS LOADING</span>
                </h1>

                <p className="max-w-2xl text-white-dim text-lg md:text-xl mb-16 leading-relaxed">
                    Prepare for the ultimate fusion of technology, innovation, and human ingenuity.
                    The next iteration of TechFest is currently being engineered to blow your mind.
                </p>

                {/* ── ⏱️ Premium Countdown ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 w-full max-w-3xl">
                    <CountdownItem value={timeLeft.days} label="Days" />
                    <CountdownItem value={timeLeft.hours} label="Hours" />
                    <CountdownItem value={timeLeft.minutes} label="Minutes" />
                    <CountdownItem value={timeLeft.seconds} label="Seconds" />
                </div>

                {/* ── ✉️ Notify Me Form ── */}
                <div className="w-full max-w-md group">
                    {status === "success" ? (
                        <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 backdrop-blur-md text-green-400 font-semibold animate-in fade-in slide-in-from-bottom-2">
                            ✨ You&apos;re on the list! We&apos;ll ping you when we launch.
                        </div>
                    ) : (
                        <form onSubmit={handleNotify} className="relative">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full h-16 pl-14 pr-32 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-gold/50 transition-all duration-300 backdrop-blur-xl hover:bg-white/[0.08]"
                                required
                            />
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-gold transition-colors" size={20} />

                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="absolute right-2 top-1/2 -translate-y-1/2 h-12 px-6 rounded-xl bg-gold text-black font-bold flex items-center gap-2 hover:bg-gold/90 hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(255,203,64,0.4)]"
                            >
                                {status === "loading" ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <>
                                        Join Waitlist <ArrowRight size={18} />
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>

                {/* Footer Meta */}
                <div className="mt-20 flex flex-wrap justify-center gap-8 md:gap-12 opacity-40 hover:opacity-100 transition-opacity duration-500">
                    <MetaItem icon={<Calendar size={16} />} text="Coming in 2026" />
                    <MetaItem icon={<Clock size={16} />} text="Time to be decided" />
                    <MetaItem icon={<MapPin size={16} />} text="Location TBA" />
                </div>
            </div>
        </section>
    );
}

function CountdownItem({ value, label }) {
    return (
        <div className="relative group">
            <div className="p-6 md:p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.08] shadow-2xl">
                <span className="block text-4xl md:text-6xl font-heading font-black text-white mb-2 tracking-tighter">
                    {value < 10 ? `0${value}` : value}
                </span>
                <span className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
                    {label}
                </span>
            </div>
            {/* Top Shine */}
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>
    );
}

function MetaItem({ icon, text }) {
    return (
        <div className="flex items-center gap-2.5 text-xs font-bold tracking-widest uppercase text-white">
            <span className="text-gold">{icon}</span>
            <span>{text}</span>
        </div>
    );
}
