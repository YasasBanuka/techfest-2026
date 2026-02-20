"use client";

import { useState } from "react";
import Link from "next/link";

/*
  WHY "use client"?
  ─────────────────
  We need useState for the mobile menu toggle.
  In a real production app, you might split this into
  a Server Component parent + Client Component child.
  For learning, we'll keep it simple as one component.
*/

/*
  WHY Link from "next/link"?
  ──────────────────────────
  Regular <a> tags cause a FULL page reload.
  Next.js <Link> does CLIENT-SIDE navigation:
  - Only fetches the new page's content
  - Doesn't reload Navbar, Footer, CSS, JS
  - Result: Instant page transitions!
*/

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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black-pure/80 backdrop-blur-md border-b border-black-border">
      {/*
        fixed → Stays at top while scrolling
        z-50 → Above all other content
        bg-black-pure/80 → 80% opacity (see-through!)
        backdrop-blur-md → Blurs content behind it (glassmorphism!)
        border-b border-black-border → Subtle bottom separator
      */}

      <nav
        className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        aria-label="Main navigation"
      >
        {/*
          max-w-7xl → Content doesn't stretch on ultra-wide screens
          mx-auto → Centers the nav horizontally
          h-20 → Fixed height (80px) for consistency
        */}

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center gap-3 group">
          {/*
            "group" → Allows child elements to react to parent hover
            This is a Tailwind feature: group-hover:text-gold
          */}
          <span className="text-2xl font-heading font-bold text-gold">
            TechFest
          </span>
          <span className="text-sm font-body text-white-muted group-hover:text-gold transition-colors">
            2026
          </span>
        </Link>

        {/* ── Desktop Links ── */}
        <ul className="hidden md:flex items-center gap-8">
          {/*
            hidden → Hides on mobile
            md:flex → Shows on screens >= 768px
            This is "Mobile First" responsive design!
          */}
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="text-white-muted hover:text-gold transition-colors text-sm font-medium tracking-wide uppercase"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* ── CTA Button (Desktop) ── */}
        <Link
          href="/tickets"
          className="hidden md:inline-flex bg-gold text-black-pure font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gold-bright transition-colors tracking-wide"
        >
          Get Tickets
        </Link>

        {/* ── Mobile Menu Button ── */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileMenuOpen}
        >
          {/*
            aria-label → Screen readers announce "Open menu" or "Close menu"
            aria-expanded → Tells assistive tech if menu is open
            These are WCAG accessibility requirements!
          */}
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg> // "X" icon when menu is open - Close icon
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="4" y1="8" x2="20" y2="8" />
              <line x1="4" y1="16" x2="20" y2="16" />
            </svg> // Hamburger icon
          )}
        </button>
      </nav>

      {/* ── Mobile Menu (Dropdown) ── */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black-soft border-t border-black-border">
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
            <li className="pt-4 border-t border-black-border">
              <Link
                href="/tickets"
                className="block text-center bg-gold text-black-pure font-bold py-3 rounded-lg hover:bg-gold-bright transition-colors"
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