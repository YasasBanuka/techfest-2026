import Link from "next/link";
import { Linkedin, Instagram, Youtube, Facebook, Music2 } from "lucide-react";
import FadeInUp from "@/components/ui/fade-in-up";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Agenda", href: "/agenda" },
  { name: "Speakers", href: "/speakers" },
  { name: "Gallery", href: "/gallery" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", href: "https://web.facebook.com/people/IEEE-Techfest-Sri-Lanka/61576197093667", Icon: Facebook },
  { name: "Instagram", href: "https://www.instagram.com/techfestlk", Icon: Instagram },
  { name: "LinkedIn", href: "https://www.linkedin.com/company/techfestlk", Icon: Linkedin },
  { name: "TikTok", href: "https://www.tiktok.com/@ieee.techverse.sr", Icon: Music2 },
  { name: "YouTube", href: "https://www.youtube.com/@ieeetechversesrilanka", Icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="bg-navy-dark border-t border-navy-border">

      {/* ── Main 3-Pillar Grid ── */}
      <FadeInUp>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

            {/* Pillar 1: Identity */}
            <div>
              <Link href="/" className="inline-block mb-5">
                <span className="text-2xl font-heading font-bold gold-gradient-text">
                  TechFest Sri Lanka
                </span>
                <span className="text-sm text-white-dim ml-2">2026</span>
              </Link>
              <p className="text-white-dim text-sm leading-relaxed">
                Sri Lanka&apos;s premier technology innovation festival,
                organized by IEEE TechVerse.
              </p>
            </div>

            {/* Pillar 2: Quick Links (2×3 grid) */}
            <div>
              <h3 className="text-white font-heading font-semibold mb-5 text-xs uppercase tracking-[0.2em]">
                Quick Links
              </h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-white-dim hover:text-gold transition-colors text-sm py-0.5"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pillar 3: Community */}
            <div>
              <h3 className="text-white font-heading font-semibold mb-5 text-xs uppercase tracking-[0.2em]">
                Join the Community
              </h3>
              <p className="text-white-dim text-sm mb-5 leading-relaxed">
                Follow us for updates, behind-the-scenes, and exclusive content.
              </p>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ name, href, Icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${name}`}
                    className="w-10 h-10 bg-navy-card border border-navy-border rounded-lg flex items-center justify-center text-white-dim hover:text-gold hover:border-gold/40 hover:bg-navy-surface transition-all duration-300"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </FadeInUp>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-navy-border">
        <div className="max-w-7xl mx-auto px-6 py-5 text-center">
          <p className="text-white-dim text-sm">
            © {new Date().getFullYear()} IEEE TechVerse Sri Lanka. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}