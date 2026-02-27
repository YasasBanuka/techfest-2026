import Hero from "@/components/sections/hero";
import TaglineScroll from "@/components/sections/tagline-scroll";
import EventImpact from "@/components/sections/event-impact";
import Communities from "@/components/sections/communities";
import Stats from "@/components/sections/stats";
import CTA from "@/components/sections/cta";
import SponsorsCarousel from "@/components/sections/sponsors-carousel";

export const metadata = {
  title: "IEEE TechFest 2026 | Sri Lanka's Premier Tech Innovation Festival",
  description:
    "Join 1000+ innovators at TechFest 2026 — December 20, 2026 at Trace Expert City, Colombo. Organized by IEEE TechVerse.",
  openGraph: {
    title: "IEEE TechFest 2026",
    description: "Sri Lanka's premier technology innovation festival.",
    url: "https://techfest2026.lk",
    siteName: "TechFest 2026",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function Home() {
  return (
    <main>
      {/* 1. Hero — plexus canvas, gold gradient title, countdown */}
      <Hero />

      {/* 2. Tagline — pinned, random letter reveal on scroll */}
      <TaglineScroll />

      {/* 3. Event Impact — cinematic 5-scene pinned sequence */}
      <EventImpact />

      {/* 4. Communities — who's behind this */}
      <Communities />

      {/* 5. Stats — scramble animation counters */}
      <Stats />

      {/* 6. CTA — register section */}
      <CTA />

      {/* 7. Sponsors carousel */}
      <SponsorsCarousel />
    </main>
  );
}