"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { User, LogOut, LayoutDashboard, Volume2, VolumeX } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import AmbientAudio from "@/components/audio/ambient-audio";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Agenda", href: "/agenda" },
  { name: "Speakers", href: "/speakers" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef(null);
  
  const supabase = createClient();
  const router = useRouter();

  // ── Auth state ──
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };

    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  // ── Scroll detection ──
  // At top: transparent. On scroll: navy glassmorphism.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Mobile menu scroll lock ──
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${scrolled
          ? "bg-navy-deeper/90 backdrop-blur-xl border-b border-gold/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)]"
          : "bg-gradient-to-b from-navy-deeper/80 to-transparent border-b border-transparent"
        }`}
    >
      {/* ── Visual Effect: Top Scanning Line ── */}
      {scrolled && (
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent animate-pulse" />
      )}

      <nav
        className="max-w-7xl mx-auto px-4 xl:px-6 h-20 flex items-center justify-between relative"
        aria-label="Main navigation"
      >
        {/* Subtle HUD background glow for logo */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-40 h-10 bg-gold/5 blur-2xl rounded-full opacity-50 pointer-events-none" />
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logos/Techfest Logo.png"
            alt="TechFest Sri Lanka 2026 logo"
            width={140}
            height={40}
            className="object-contain brightness-110 filter drop-shadow-[0_0_10px_rgba(255,179,0,0.15)]"
            priority
          />
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden lg:flex items-center gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="relative group/nav text-white-muted hover:text-white transition-all duration-300 text-[13px] xl:text-sm font-bold tracking-widest uppercase"
              >
                {link.name}
                {/* Holographic Underline */}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gold shadow-[0_0_10px_rgba(255,179,0,0.8)] group-hover/nav:w-full transition-all duration-500" />
              </Link>
            </li>
          ))}
        </ul>

        {/* ── Desktop CTAs ── */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-4">
          <Link
            href="/tickets"
            className="inline-flex items-center bg-gold text-navy-deeper font-bold text-[11px] xl:text-xs px-3 xl:px-5 py-2.5 rounded-lg hover:bg-gold-bright transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,179,0,0.4)] tracking-wider uppercase"
          >
            Get Tickets
          </Link>

          {/* ── Audio Toggle ── */}
          <button
            onClick={() => {
              audioRef.current?.toggle();
              setIsAudioPlaying(!isAudioPlaying);
            }}
            className="p-2 text-white-dim hover:text-gold transition-colors mr-1 xl:mr-2 border-r border-navy-border pr-3 xl:pr-5"
            title={isAudioPlaying ? "Turn off atmosphere" : "Turn on atmosphere"}
          >
            {isAudioPlaying ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          {!loading && (
            user ? (
              <div className="flex items-center gap-1 xl:gap-3 ml-1 xl:ml-2 pl-2 xl:pl-4 border-l border-navy-border">
                <Link
                  href="/dashboard"
                  className="text-white-muted hover:text-gold transition-colors flex items-center gap-2 text-[10px] xl:text-xs font-bold uppercase tracking-widest p-2"
                  title="Dashboard"
                >
                  <LayoutDashboard size={14} />
                  <span className="hidden xl:inline">Dashboard</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-white-dim hover:text-red-400 transition-colors p-2"
                  title="Logout"
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="text-white-muted hover:text-gold transition-colors text-[10px] xl:text-xs font-bold uppercase tracking-widest ml-2 xl:ml-4 flex items-center gap-2"
              >
                <User size={14} />
                Login
              </Link>
            )
          )}
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden text-white-muted hover:text-gold transition-colors p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8" /><line x1="4" y1="16" x2="20" y2="16" />
            </svg>
          )}
        </button>
      </nav>

      {/* ── Mobile Menu ── */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-deeper/95 backdrop-blur-md border-t border-navy-border">
          <ul className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-white-muted hover:text-gold transition-colors text-lg font-medium block py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-navy-border flex flex-col gap-3">
              <Link
                href="/tickets"
                className="block text-center bg-gold text-navy-deeper font-bold py-3 rounded-lg active:opacity-80 transition-opacity"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Tickets
              </Link>

              {/* Audio toggle intentionally hidden on mobile — no audio on touch devices */}

              {!loading && (
                user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block text-center border border-navy-border text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LayoutDashboard size={18} /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-white-dim hover:text-red-400 py-2 text-sm uppercase tracking-widest font-black"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/login"
                    className="block text-center border border-navy-border text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <User size={18} /> Login / Register
                  </Link>
                )
              )}
            </li>
          </ul>
        </div>
      )}

      {/* Global Audio Component */}
      <AmbientAudio ref={audioRef} />
    </header>
  );
}