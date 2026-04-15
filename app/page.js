import Hero from "@/components/sections/hero";
import MemoryArchive from "@/components/sections/memory-archive";
import Communities from "@/components/sections/communities";
import Stats from "@/components/sections/stats";
import CTA from "@/components/sections/cta";
import SponsorsCarousel from "@/components/sections/sponsors-carousel";
import ComingSoon from "@/components/common/coming-soon";
import IgnitionWrapper from "@/components/ui/ignition-wrapper";
import SpeakerAnnouncementTeaser from "@/components/sections/speaker-announcement-teaser";

export const metadata = {
  title: "TechFest Sri Lanka 2026 | Innovate, Inspire, Impact",
  description:
    "The future is loading. Sri Lanka's premier technology innovation festival. Dive into the Memory Archive and explore the vision for TechFest 2026.",
  openGraph: {
    title: "TechFest Sri Lanka 2026 | Innovate, Inspire, Impact",
    description: "The future is loading. Join us for TechFest Sri Lanka 2026.",
    url: "https://techfest2026.lk",
    siteName: "TechFest Sri Lanka 2026",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

import AmbientHUD from "@/components/ui/ambient-hud";

export default function Home() {
  // Toggle this to false to restore the full site
  const isComingSoon = false;

  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <main className="relative bg-navy-deeper">
      {/* Global High-Tech Atmosphere */}
      <AmbientHUD />

      <Hero />
      
      <MemoryArchive />

      <div className="relative z-10">
        <IgnitionWrapper>
          <SpeakerAnnouncementTeaser />
        </IgnitionWrapper>

        <IgnitionWrapper>
          <Communities />
        </IgnitionWrapper>

        <IgnitionWrapper>
          <Stats />
        </IgnitionWrapper>

        <IgnitionWrapper>
          <CTA />
        </IgnitionWrapper>

        <IgnitionWrapper>
          <SponsorsCarousel />
        </IgnitionWrapper>
      </div>
    </main>
  );
}