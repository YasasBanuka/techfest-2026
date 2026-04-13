import PageHero from "@/components/ui/page-hero";
import SpeakerGrid from "@/components/speakers/speaker-grid";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import SpeakerProposalNudge from "@/components/sections/speaker-proposal-nudge";

export const metadata = {
  title: "Speakers | TechFest Sri Lanka 2026",
  description:
    "Meet the expert speakers at TechFest Sri Lanka 2026 — industry leaders delivering keynotes, workshops, panels, and lightning talks on November 07, 2026.",
};

import { REVEAL_SPEAKERS } from "@/data/speakers";

export default function SpeakersPage() {
  const subtitle = REVEAL_SPEAKERS 
    ? "10 industry leaders. Keynotes, workshops, panels and lightning talks — crafted to challenge, inspire, and equip you for what's next."
    : "Our visionaries are aligning. 10 industry leaders are being processed for reveal. Stay connected as we synthesize the flagship lineup for November 07.";

  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="November 07, 2026"
        title="Meet Our Speakers"
        titleGold="Speakers"
        subtitle={subtitle}
      />

      {/* ── Speaker count strip ── */}
      <section className="py-8 px-6 border-b border-navy-border">
        <div className="max-w-6xl mx-auto">
          <FadeInUp className="flex flex-wrap gap-6 sm:gap-10">
            {[
              { count: "3", label: "Keynote Speakers" },
              { count: "3", label: "Workshop Leads" },
              { count: "2", label: "Panelists" },
              { count: "2+", label: "Lightning Talks" },
            ].map(({ count, label }) => (
              <div key={label} className="flex items-center gap-3">
                <span className="text-gold font-heading font-black text-2xl">{count}</span>
                <span className="text-white-muted text-sm">{label}</span>
              </div>
            ))}
          </FadeInUp>
        </div>
      </section>

      {/* ── Speakers Grid ── */}
      <section className="py-16 px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          <SpeakerGrid />
        </div>
      </section>

      {/* ── Speak at TechFest nudge (Modal Form) ── */}
      <SpeakerProposalNudge />

      {/* ── CTA ── */}
      <CTA />
    </main>
  );
}
