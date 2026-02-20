import Link from "next/link";

/*
  3-Pillar Footer Architecture
  ─────────────────────────────
  Pillar 1 (Identity)   → WHO we are
  Pillar 2 (Navigation) → WHERE to go  
  Pillar 3 (Community)  → HOW to connect
  
  Each pillar has a single purpose = scannable in < 2 seconds
  
  Design Principle: "Don't make the user think"
  → If someone is looking for social links, they go RIGHT
  → If someone wants to navigate, they go CENTER
  → Brand identity anchors the LEFT
*/

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Agenda", href: "/agenda" },
  { name: "Speakers", href: "/speakers" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "Youtube",
    href: "https://youtube.com",
    icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="bg-black-soft border-t border-black-border">
      {/* ═══ Main Content: 3 Pillars ═══ */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/*
            grid-cols-1 → Stacked on mobile (Identity → Links → Social)
            md:grid-cols-3 → Equal 3 pillars on desktop
            
            Why equal columns and not weighted?
            → 3-pillar = democratic layout
            → Each section has EQUAL importance
            → Creates a balanced, "authoritative" feel
            → This is what AWS, Apple Events, Google I/O use
          */}

          {/* ── Pillar 1: Identity ── */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <span className="text-2xl font-heading font-bold text-gold">
                TechFest
              </span>
              <span className="text-sm text-white-muted ml-2">2026</span>
            </Link>
            <p className="text-white-dim text-sm leading-relaxed mb-5">
              Sri Lanka&apos;s premier technology innovation festival, 
              bringing together the brightest minds in tech.
            </p>
            <div className="flex items-center gap-2 text-white-dim text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              {/*
                This is a "map pin" SVG icon
                
                stroke="currentColor" → Icon inherits text color!
                So text-white-dim applies to BOTH the text and icon.
                This is why SVGs are powerful — they respond to CSS.
              */}
              <span>Trace Expert City, Colombo</span>
            </div>
          </div>

          {/* ── Pillar 2: Quick Links ── */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3">
              {/*
                2-column grid within this pillar:
                Home        Gallery
                Agenda      About
                Speakers    Contact
                
                gap-x-8 → Horizontal: 32px (clear column separation)
                gap-y-3 → Vertical: 12px (compact but scannable)
                
                CSS Grid auto-fills left-to-right, top-to-bottom.
                6 items ÷ 2 columns = 3 rows. Grid handles it!
              */}
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-white-dim hover:text-gold transition-colors text-sm py-1"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Pillar 3: Community ── */}
          <div>
            <h3 className="text-white font-heading font-semibold mb-5 text-sm uppercase tracking-wider">
              Join the Community
            </h3>
            <p className="text-white-dim text-sm mb-5">
              Follow us for updates, behind-the-scenes, and exclusive content.
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-black-card border border-black-border rounded-lg flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/30 transition-all duration-300"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {link.icon}
                  {/*
                    aria-label → Screen readers say "Follow us on LinkedIn"
                    Without it, screen readers would say NOTHING
                    (because the <a> only contains an SVG, no text)
                    
                    This is a CRITICAL accessibility pattern:
                    Icon-only buttons MUST have aria-label!
                  */}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Bottom Bar ═══ */}
      <div className="border-t border-black-border">
        <div className="max-w-7xl mx-auto px-6 py-6 text-center">
            <p className="text-white-dim text-sm">
            © {new Date().getFullYear()} IEEE TechVerse. All rights reserved.
            </p>
        </div>
        </div>
    </footer>
  );
}