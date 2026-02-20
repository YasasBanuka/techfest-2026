import Communities from "@/components/sections/communities";
import CTA from "@/components/sections/cta";
import Hero from "@/components/sections/hero";
import Stats from "@/components/sections/stats";

export default function Home() {
  return (
    <main>
      <Hero />
      <Communities />
      <Stats />
      <CTA />
    </main>
  );
}