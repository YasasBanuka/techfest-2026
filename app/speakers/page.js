import PageHero from "@/components/ui/page-hero";
import SpeakerGrid from "@/components/speakers/speaker-grid";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";

export const metadata = {
  title: "Speakers | IEEE TechFest 2026",
  description:
    "Meet the expert speakers at TechFest 2026 — industry leaders delivering keynotes, workshops, panels, and lightning talks on December 20, 2026.",
};

export default function SpeakersPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="December 20, 2026"
        title="Meet Our Speakers"
        titleGold="Speakers"
        subtitle="10 industry leaders. Keynotes, workshops, panels and lightning talks — crafted to challenge, inspire, and equip you for what's next."
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

      {/* ── Speak at TechFest nudge ── */}
      <section className="pb-10 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-navy-card border border-navy-border rounded-2xl px-7 py-5">
              <div>
                <p className="text-white font-heading font-semibold">
                  Want to speak at TechFest 2026?
                </p>
                <p className="text-white-dim text-sm mt-0.5">
                  We welcome proposals from industry professionals and researchers.
                </p>
              </div>
              <a
                href="/contact"
                className="shrink-0 px-5 py-2.5 bg-gold/10 border border-gold/30 text-gold text-sm font-semibold rounded-xl hover:bg-gold/15 hover:border-gold/50 transition-all duration-200 whitespace-nowrap"
              >
                Submit a Proposal →
              </a>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA />
    </main>
  );
}
