"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

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

  // ── Scroll detection ──
  // At top: transparent. On scroll: navy glassmorphism.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
          ? "bg-navy-deeper/90 backdrop-blur-md border-b border-navy-border shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          : "bg-transparent border-b border-transparent"
        }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          <Image
            src="/images/logos/Techfest Logo.png"
            alt="TechFest Sri Lanka 2026 logo"
            width={140}
            height={40}
            className="object-contain"
            priority
          />
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-white-muted hover:text-gold transition-colors duration-200 text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA Button ── */}
        <Link
          href="/tickets"
          className="hidden md:inline-flex items-center bg-gold text-navy-deeper font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gold-bright transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,203,64,0.4)] tracking-wide"
        >
          Get Tickets
        </Link>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-white-muted hover:text-gold transition-colors p-2"
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
        <div className="md:hidden bg-navy-deeper/95 backdrop-blur-md border-t border-navy-border">
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
            <li className="pt-4 border-t border-navy-border">
              <Link
                href="/tickets"
                className="block text-center bg-gold text-navy-deeper font-bold py-3 rounded-lg hover:bg-gold-bright transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Tickets
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}