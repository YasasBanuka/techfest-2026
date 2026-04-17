import Image from "next/image";
import FadeInUp, { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";
import CyberModule from "@/components/ui/cyber-module";

const COMMUNITIES = [
  {
    name: "IEEE TechVerse",
    role: "Organizing Committee",
    logo: "/images/logos/techverse.png",
    id: "TF_COM_01",
    caption:
      "Flagship initiative of the Student Activities Committee of IEEE Sri Lanka Section, dedicated to enlightening and empowering young tech enthusiasts across the nation.",
  },
  {
    name: "SLSAC",
    role: "Co-Organizing Partner",
    logo: "/images/logos/slsac.png",
    id: "TF_COM_02",
    caption:
      "Empowering student engineers to lead and innovate beyond the classroom. Connecting academia, industry, and global tech communities. Turning bold ideas into real-world impact, together.",
  },
];

export default function Communities() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-5xl mx-auto">

        {/* Title — centered on top */}
        <FadeInUp className="text-center mb-16">
          <p className="text-gold text-xs uppercase tracking-[0.4em] font-black opacity-60">
            A Collaboration By
          </p>
          <div className="h-px w-24 bg-gold/20 mx-auto mt-4" />
        </FadeInUp>

        {/* Two community cards side by side */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12">
          {COMMUNITIES.map((community) => (
            <StaggerItem key={community.name}>
              <CyberModule className="items-center text-center">
                
                {/* HUD Data ID */}
                <span className="absolute top-8 left-12 text-[9px] font-mono text-cyan-400/20 tracking-widest hidden sm:block">
                   [{community.id}]
                </span>

                {/* Logo with Monochrome to Color manifestation */}
                <div className="relative w-44 h-28 mb-8 mx-auto flex-shrink-0 group-hover:scale-105 transition-all duration-500">
                  <Image
                    src={community.logo}
                    alt={`${community.name} logo`}
                    fill
                    className="object-contain grayscale contrast-125 opacity-70 transition-all duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:drop-shadow-[0_0_20px_rgba(255,179,0,0.3)] touch:grayscale-0 touch:opacity-100"
                  />
                </div>

                {/* Name */}
                <h3 className="text-white font-heading font-black text-2xl mb-2 tracking-tight">
                  {community.name}
                </h3>

                {/* Role badge */}
                <span className="inline-block text-gold text-[10px] font-black uppercase tracking-[0.25em] bg-gold/5 border border-gold/10 rounded-lg px-4 py-1.5 mb-6">
                  {community.role}
                </span>

                {/* Caption */}
                <p className="text-white/70 text-sm leading-relaxed max-w-sm">
                  {community.caption}
                </p>

                {/* Bottom decorative bar */}
                <div className="mt-8 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              </CyberModule>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}