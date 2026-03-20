import Hero from "@/components/sections/hero";
import TaglineScroll from "@/components/sections/tagline-scroll";
import EventImpact from "@/components/sections/event-impact";
import Communities from "@/components/sections/communities";
import Stats from "@/components/sections/stats";
import CTA from "@/components/sections/cta";
import SponsorsCarousel from "@/components/sections/sponsors-carousel";
import ComingSoon from "@/components/common/coming-soon";

export const metadata = {
  title: "TechFest Sri Lanka 2026 | Coming Soon",
  description:
    "The future is loading. Sri Lanka's premier technology innovation festival is coming soon. Stay tuned for TechFest Sri Lanka 2026.",
  openGraph: {
    title: "TechFest Sri Lanka 2026 | Coming Soon",
    description: "The future is loading. Join us for TechFest Sri Lanka 2026.",
    url: "https://techfest2026.lk",
    siteName: "TechFest Sri Lanka 2026",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
};

export default function Home() {
  // Toggle this to false to restore the full site
  const isComingSoon = false;

  if (isComingSoon) {
    return <ComingSoon />;
  }

  return (
    <main>
      <Hero />
      <TaglineScroll />
      <EventImpact />
      <Communities />
      <Stats />
      <CTA />
      <SponsorsCarousel />
    </main>
  );
}