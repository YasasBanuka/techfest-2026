import { MapPin, Mail, MessageCircle } from "lucide-react";
import PageHero from "@/components/ui/page-hero";
import ContactForm from "@/components/contact/contact-form";
import FAQAccordion from "@/components/contact/faq-accordion";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";

export const metadata = {
  title: "Contact Us | TechFest Sri Lanka 2026",
  description:
    "Get in touch with the TechFest 2026 team. Reach out for sponsorships, speaker proposals, media enquiries, or general questions.",
};

const CONTACT_CARDS = [
  {
    icon: MapPin,
    title: "Venue",
    lines: ["TBA", "Sri Lanka"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["info@techfest2026.lk", "sponsors@techfest2026.lk"],
    link: "mailto:info@techfest2026.lk",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Channel",
    lines: ["Join for real-time updates", "and exclusive announcements"],
    link: "https://whatsapp.com/channel/placeholder",
    linkLabel: "Join Channel →",
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* ── Page Hero ── */}
      <PageHero
        eyebrow="Get In Touch"
        title="Contact Us"
        titleGold="Us"
        subtitle="Have a question, a partnership idea, or want to be part of TechFest 2026? We'd love to hear from you."
      />

      {/* ── Contact Info Cards ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {CONTACT_CARDS.map((card) => {
              const Icon = card.icon;
              return (
                <StaggerItem key={card.title}>
                  <div className="bg-navy-card border border-navy-border rounded-2xl p-7 h-full hover:border-gold/30 transition-all duration-300 group">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors duration-300">
                      <Icon size={20} className="text-gold" />
                    </div>

                    {/* Title */}
                    <h3 className="text-white font-heading font-semibold text-sm uppercase tracking-wider mb-3">
                      {card.title}
                    </h3>

                    {/* Lines */}
                    <div className="space-y-0.5">
                      {card.lines.map((line) => (
                        <p key={line} className="text-white-muted text-sm">
                          {line}
                        </p>
                      ))}
                    </div>

                    {/* Optional CTA link */}
                    {card.link && card.linkLabel && (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-gold text-sm hover:text-gold-bright transition-colors hover:underline underline-offset-2"
                      >
                        {card.linkLabel}
                      </a>
                    )}
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Form + FAQ ── */}
      <section className="py-8 px-6 pb-24">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact Form — takes 3/5 columns */}
          <div className="lg:col-span-3">
            <ContactForm />
          </div>

          {/* FAQ — takes 2/5 columns */}
          <div className="lg:col-span-2">
            <FadeInUp>
              <h3 className="text-white font-heading font-bold text-xl mb-6">
                Frequently Asked{" "}
                <span className="gold-gradient-text">Questions</span>
              </h3>
            </FadeInUp>
            <FAQAccordion />
          </div>
        </div>
      </section>

      {/* ── Reusable CTA ── */}
      <CTA />
    </main>
  );
}
