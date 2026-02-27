import Image from "next/image";
import FadeInUp from "@/components/ui/fade-in-up";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";

const COMMUNITIES = [
  {
    name: "IEEE TechVerse",
    role: "Organizing Committee",
    logo: "/images/logos/techverse.png",
    caption:
      "Flagship initiative of the Student Activities Committee of IEEE Sri Lanka Section, dedicated to enlightening and empowering young tech enthusiasts across the nation.",
  },
  {
    name: "SLSAC",
    role: "Co-Organizing Partner",
    logo: "/images/logos/slsac.png",
    caption:
      "Empowering student engineers to lead and innovate beyond the classroom. Connecting academia, industry, and global tech communities. Turning bold ideas into real-world impact, together.",
  },
];

export default function Communities() {
  return (
    <section className="py-20 px-6 border-y border-navy-border">
      <div className="max-w-5xl mx-auto">

        {/* Title — centered on top */}
        <FadeInUp className="text-center mb-14">
          <p className="text-white-dim text-xs uppercase tracking-[0.25em]">
            A Collaboration By
          </p>
        </FadeInUp>

        {/* Two community cards side by side */}
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {COMMUNITIES.map((community) => (
            <StaggerItem key={community.name}>
              <div className="flex flex-col items-center text-center bg-navy-card border border-navy-border rounded-2xl p-8 h-full hover:border-gold/30 transition-all duration-300 group">

                {/* Logo */}
                <div className="relative w-36 h-24 mb-6 flex-shrink-0">
                  <Image
                    src={community.logo}
                    alt={`${community.name} logo`}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Name */}
                <h3 className="text-white font-heading font-bold text-xl mb-1">
                  {community.name}
                </h3>

                {/* Role badge */}
                <span className="inline-block text-gold text-xs font-medium uppercase tracking-widest bg-gold/10 border border-gold/20 rounded-full px-3 py-1 mb-4">
                  {community.role}
                </span>

                {/* Caption */}
                <p className="text-white-dim text-sm leading-relaxed">
                  {community.caption}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}