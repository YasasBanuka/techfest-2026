import { STATS } from "@/data/event";

/*
  Server Component (no "use client")
  
  WHY Server Component for Stats?
  ──────────────────────────────
  Stats are static content. There's no interactivity 
  (no clicks, no forms, no state changes).
  
  Rendering on the server means:
  - Zero JavaScript sent for this component
  - Faster page load
  - Better SEO (search engines see the content immediately)
  
  Later, when we add count-up animations, we'll create a 
  separate SMALL Client Component just for the number animation.
*/

export default function Stats() {
  return (
    <section className="py-24 px-6">
      {/*
        py-24 → Generous vertical padding (96px top + bottom)
        
        Premium spacing rule:
        More whitespace = More premium feel
        Cramped content = Cheap/amateur look
        
        Apple.com, Linear.app, Stripe.com → ALL use large padding
      */}

      <div className="max-w-6xl mx-auto">
        {/*
          max-w-6xl instead of max-w-7xl (Navbar)
          → Stats area is slightly narrower than nav
          → Creates visual "breathing room"
          → Content doesn't feel edge-to-edge
        */}

        {/* Section Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            Join the Innovation
          </h2>
          <p className="text-white-muted max-w-xl mx-auto">
            Be part of Sri Lanka&apos;s premier technology event
          </p>
          {/*
            &apos; → HTML entity for apostrophe (')
            JSX treats raw ' differently in some cases
            Using &apos; is the safe, industry-standard way
          */}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/*
            grid grid-cols-2 → 2 columns on mobile
            lg:grid-cols-4 → 4 columns on desktop
            
            CSS Grid vs Flexbox:
            - Grid = 2D layouts (rows AND columns)
            - Flexbox = 1D layouts (row OR column)
            
            Stats = Grid because we need equal-width columns
            Navbar = Flexbox because it's one row
          */}

          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="bg-black-card border border-black-border rounded-2xl p-8 text-center hover:border-gold/30 transition-colors group"
            >
              {/*
                rounded-2xl → More rounded than rounded-xl (16px vs 12px)
                             Premium sites use larger border-radius
                
                hover:border-gold/30 → Subtle gold border on hover
                                      30% opacity = visible but not harsh
                
                group → Enables group-hover on children
              */}

              <p className="text-4xl sm:text-5xl font-heading font-bold text-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </p>
              {/*
                group-hover:scale-110 → Number grows 10% when card is hovered
                transition-transform → Only animates the scale (not color, etc.)
                duration-300 → 0.3 seconds (sweet spot for micro-interactions)
              */}

              <p className="text-sm text-white-muted uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}