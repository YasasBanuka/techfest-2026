import PageHero from "@/components/ui/page-hero";
import TicketCard from "@/components/tickets/ticket-card";
import RegisterForm from "@/components/tickets/register-form";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { TICKET_TIERS, PERKS, REGISTRATION_DEADLINE, EVENT_DATE } from "@/data/tickets";

export const metadata = {
  title: "Register | TechFest Sri Lanka 2026",
  description:
    "Get your ticket for TechFest Sri Lanka 2026 — November 07, 2026 at TBA. Ticket pricing and tiers will be announced soon. Register your interest now.",
};

export default function TicketsPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="November 07, 2026 · Tickets Available Soon"
        title="Get Your Ticket"
        titleGold="Ticket"
        subtitle={`Secure your place at TechFest Sri Lanka 2026 before ${REGISTRATION_DEADLINE}. Ticket pricing and tiers will be announced soon.`}
      />

      {/* ── Urgency strip ── */}
      <section className="py-5 px-6 border-b border-navy-border">
        <div className="max-w-5xl mx-auto">
          <FadeInUp className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-center">
            <div>
              <p className="text-gold font-heading font-black text-lg">TBA</p>
              <p className="text-white-dim text-xs">Ticket Pricing</p>
            </div>
            <div className="w-px h-8 bg-navy-border hidden sm:block" />
            <div>
              <p className="text-white font-heading font-bold text-lg">{EVENT_DATE}</p>
              <p className="text-white-dim text-xs">Event Date</p>
            </div>
            <div className="w-px h-8 bg-navy-border hidden sm:block" />
            <div>
              <p className="text-white font-heading font-bold text-lg">{REGISTRATION_DEADLINE}</p>
              <p className="text-white-dim text-xs">Registration Deadline</p>
            </div>
            <div className="w-px h-8 bg-navy-border hidden sm:block" />
            <div>
              <p className="text-gold font-heading font-black text-lg">1000+</p>
              <p className="text-white-dim text-xs">Expected Attendees</p>
            </div>
          </FadeInUp>
        </div>
      </section>

      {/* ── Ticket tiers ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <FadeInUp className="text-center mb-14">
            <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3 font-medium">Choose Your Pass</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              Ticket <span className="gold-gradient-text">Tiers</span>
            </h2>
            <p className="text-white-muted mt-3 max-w-xl mx-auto">
              Choose the experience that fits you best. More details coming soon.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TICKET_TIERS.map((tier, i) => (
              <TicketCard key={tier.id} tier={tier} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── What you get (perks) ── */}
      <section className="py-16 px-6 border-y border-navy-border">
        <div className="max-w-5xl mx-auto">
          <FadeInUp className="text-center mb-12">
            <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3 font-medium">Your Day</p>
            <h2 className="text-3xl font-heading font-bold text-white">
              What&apos;s <span className="gold-gradient-text">Included</span>
            </h2>
          </FadeInUp>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {PERKS.map((perk) => (
              <StaggerItem key={perk.title}>
                <div className="flex gap-4 items-start bg-navy-card border border-navy-border rounded-xl p-5 hover:border-gold/25 transition-colors duration-300">
                  <span className="text-2xl shrink-0">{perk.emoji}</span>
                  <div>
                    <h4 className="text-white font-heading font-semibold text-sm mb-1">{perk.title}</h4>
                    <p className="text-white-dim text-xs leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Register form ── */}
      <section id="register" className="py-20 px-6">
        <div className="max-w-2xl mx-auto">
          <FadeInUp className="text-center mb-10">
            <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3 font-medium">Ready?</p>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-3">
              Secure Your <span className="gold-gradient-text">Spot</span>
            </h2>
            <p className="text-white-muted text-sm">
              Register your interest now — ticket pricing will be announced soon.
            </p>
          </FadeInUp>

          <div className="bg-navy-card border border-gold/25 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
            <div className="absolute inset-0 hex-pattern opacity-5" />
            <div className="relative z-10">
              <RegisterForm />
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </main>
  );
}
