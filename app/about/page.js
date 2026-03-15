import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/page-hero";
import StoryTimeline from "@/components/about/story-timeline";
import CoreValues from "@/components/about/core-values";
import TeamSection from "@/components/team/team-section";
import CTA from "@/components/sections/cta";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import { MISSION, VISION } from "@/data/about";

export const metadata = {
  title: "About | IEEE TechFest 2026",
  description:
    "Learn about TechFest 2026 — Sri Lanka's premier tech innovation festival organised by IEEE TechVerse. Our story, mission, values, and the community behind the event.",
};

const COMMUNITIES = [
  {
    name: "IEEE TechVerse",
    role: "Organizing Committee",
    logo: "/images/logos/techverse.png",
    caption:
      "Flagship initiative of the Student Activities Committee of IEEE Sri Lanka Section, dedicated to enlightening and empowering young tech enthusiasts across the nation.",
    href: "#",
  },
  {
    name: "SLSAC",
    role: "Co-Organizing Partner",
    logo: "/images/logos/slsac.png",
    caption:
      "Empowering student engineers to lead and innovate beyond the classroom. Connecting academia, industry, and global tech communities. Turning bold ideas into real-world impact, together.",
    href: "#",
  },
];

// Section header used across all inner sections
function SectionHeader({ eyebrow, title, titleGold, subtitle, center = true }) {
  const words = title.split(" ");
  const goldWord = titleGold || words[words.length - 1];
  const regularWords = words.slice(0, words.findIndex((w) => w === goldWord)).join(" ");

  return (
    <FadeInUp className={`mb-14 ${center ? "text-center" : ""}`}>
      <p className="text-gold text-xs uppercase tracking-[0.25em] mb-3 font-medium">
        {eyebrow}
      </p>
      <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
        {regularWords && <span>{regularWords} </span>}
        <span className="gold-gradient-text">{goldWord}</span>
      </h2>
      {subtitle && (
        <p className="text-white-muted mt-3 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </FadeInUp>
  );
}

export default function AboutPage() {
  return (
    <main>
      {/* ── 1. Page Hero ── */}
      <PageHero
        eyebrow="Who We Are"
        title="About TechFest"
        titleGold="TechFest"
        subtitle="Born from passion, built by community. TechFest is Sri Lanka's platform for the next generation of technology leaders."
      />

      {/* ── 2. Mission & Vision ── */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="Our Purpose"
            title="Mission & Vision"
            titleGold="Vision"
            subtitle="Two ideas that guide everything we build."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Mission */}
            <StaggerItem>
              <div className="relative bg-navy-card border border-navy-border rounded-2xl p-8 h-full overflow-hidden group hover:border-gold/30 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                <div className="absolute inset-0 hex-pattern opacity-5" />
                <div className="relative">
                  <span className="inline-block text-gold text-xs font-mono font-bold uppercase tracking-widest bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-5">
                    Mission
                  </span>
                  <p className="text-white text-lg leading-relaxed font-heading">
                    &ldquo;{MISSION}&rdquo;
                  </p>
                </div>
              </div>
            </StaggerItem>

            {/* Vision */}
            <StaggerItem>
              <div className="relative bg-navy-card border border-navy-border rounded-2xl p-8 h-full overflow-hidden group hover:border-gold/30 transition-all duration-300">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                <div className="absolute inset-0 hex-pattern opacity-5" />
                <div className="relative">
                  <span className="inline-block text-white-dim text-xs font-mono font-bold uppercase tracking-widest bg-white/5 border border-navy-border rounded-full px-3 py-1 mb-5">
                    Vision
                  </span>
                  <p className="text-white-muted text-lg leading-relaxed font-heading">
                    &ldquo;{VISION}&rdquo;
                  </p>
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* ── 3. Core Values ── */}
      <section className="py-20 px-6 border-y border-navy-border">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow="What Drives Us"
            title="Our Core Values"
            titleGold="Values"
            subtitle="The four principles that shape every decision we make."
          />
          <CoreValues />
        </div>
      </section>

      {/* ── 4. Our Story (Full-screen pinned GSAP section) ── */}
      <StoryTimeline />

      {/* ── 5. The Teams Behind It ── */}
      <section className="py-20 px-6 border-t border-navy-border">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow="The Organizers"
            title="Who's Behind TechFest"
            titleGold="TechFest"
            subtitle="Two student organizations united by a shared belief in Sri Lanka's tech future."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {COMMUNITIES.map((community) => (
              <StaggerItem key={community.name}>
                <div className="flex flex-col items-center text-center bg-navy-card border border-navy-border rounded-2xl p-10 h-full hover:border-gold/30 transition-all duration-300 group">
                  <div className="relative w-40 h-24 mb-6 flex-shrink-0">
                    <Image
                      src={community.logo}
                      alt={`${community.name} logo`}
                      fill
                      className="object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-white font-heading font-bold text-xl mb-1">
                    {community.name}
                  </h3>
                  <span className="inline-block text-gold text-xs font-medium uppercase tracking-widest bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-4">
                    {community.role}
                  </span>
                  <p className="text-white-dim text-sm leading-relaxed">
                    {community.caption}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-20">
            <SectionHeader
              eyebrow="The Masterminds"
              title="Organizing Committee"
              titleGold="Committee"
              subtitle="Meet the dedicated individuals working behind the scenes to make TechFest 2026 a reality."
              center={true}
            />
            <TeamSection />
          </div>
        </div>
      </section>

      {/* ── 6. CTA ── */}
      <CTA />
    </main>
  );
}
