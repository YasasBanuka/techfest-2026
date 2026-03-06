import { Lightbulb, Users, Star, Zap } from "lucide-react";
import { VALUES } from "@/data/about";
import { StaggerContainer, StaggerItem } from "@/components/ui/fade-in-up";

const ICON_MAP = { Lightbulb, Users, Star, Zap };

/**
 * CoreValues — 4-card grid of TechFest's guiding principles.
 * Staggered scroll entrance via StaggerContainer.
 */
export default function CoreValues() {
  return (
    <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {VALUES.map((value) => {
        const Icon = ICON_MAP[value.icon] || Zap;
        return (
          <StaggerItem key={value.id}>
            <div className="group bg-navy-card border border-navy-border rounded-2xl p-6 h-full hover:border-gold/40 hover:shadow-[0_0_30px_rgba(255,203,64,0.07)] transition-all duration-300 relative overflow-hidden">
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gold/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 -translate-y-1/2 translate-x-1/2" />

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-5 group-hover:bg-gold/15 transition-colors duration-300">
                <Icon size={20} className="text-gold" />
              </div>

              {/* Value number */}
              <span className="text-gold/30 text-xs font-mono font-bold tracking-widest mb-2 block">
                0{value.id}
              </span>

              <h3 className="text-white font-heading font-bold text-lg mb-2">
                {value.title}
              </h3>
              <p className="text-white-muted text-sm leading-relaxed">
                {value.description}
              </p>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
