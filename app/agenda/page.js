import { Calendar, MapPin, Clock } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import ScheduleTimeline from "@/components/agenda/schedule-timeline";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { AGENDA_DATE, VENUE, TYPE_META } from "@/data/agenda";

export const metadata = {
  title: "Agenda | IEEE TechFest 2026",
  description:
    "Full schedule for TechFest 2026 — December 20, 2026 at Trace Expert City, Colombo. Keynotes, workshops, panels, competitions, and networking.",
};

// Quick-glance event info cards
const EVENT_INFO = [
  { icon: Calendar, label: "Date",  value: AGENDA_DATE },
  { icon: Clock,    label: "Time",  value: "9:00 AM – 6:00 PM" },
  { icon: MapPin,   label: "Venue", value: VENUE },
];

// Legend for session type colors shown above the schedule
const LEGEND = Object.entries(TYPE_META).filter(([key]) => key !== "break");

export default function AgendaPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="December 20, 2026"
        title="Event Agenda"
        titleGold="Agenda"
        subtitle="A full day of keynotes, hands-on workshops, panel discussions, and competitions. Filter by track to plan your day."
      />

      {/* ── Event Info Strip ── */}
      <section className="py-10 px-6 border-b border-navy-border">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EVENT_INFO.map(({ icon: Icon, label, value }) => (
              <StaggerItem key={label}>
                <div className="flex items-center gap-4 bg-navy-card border border-navy-border rounded-xl px-5 py-4">
                  <div className="w-10 h-10 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-white-dim text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-white text-sm font-semibold font-heading">{value}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Schedule ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">

          {/* Legend */}
          <FadeInUp className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-white-dim text-xs uppercase tracking-wider mr-1">Legend:</span>
            {LEGEND.map(([key, meta]) => (
              <span
                key={key}
                className={`text-xs font-medium border rounded-full px-2.5 py-0.5 ${meta.color}`}
              >
                {meta.label}
              </span>
            ))}
          </FadeInUp>

          {/* Main schedule component (client — has filter tabs + GSAP) */}
          <ScheduleTimeline />
        </div>
      </section>

      {/* ── Note on schedule ── */}
      <section className="pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <FadeInUp>
            <p className="text-white-dim text-xs text-center leading-relaxed border border-navy-border rounded-xl px-6 py-4 bg-navy-card">
              ⚠️ Schedule is subject to change. Follow our{" "}
              <a href="#" className="text-gold hover:underline underline-offset-2">
                WhatsApp channel
              </a>{" "}
              for real-time updates on the day of the event.
            </p>
          </FadeInUp>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTA />
    </main>
  );
}
