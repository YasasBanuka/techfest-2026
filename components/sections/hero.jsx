import Link from "next/link";
import Countdown from "./countdown";
import { EVENT } from "@/data/event";

/*
  NO "use client" here!
  ─────────────────────
  This is a SERVER Component. All the static text
  (title, tagline, date) renders on the server as HTML.
  
  But wait — it imports Countdown which IS a Client Component!
  
  That's the pattern:
  - Server Component renders static HTML (fast, SEO-friendly)
  - It CAN contain Client Components for interactive parts
  - Only the Client Component's JS is sent to the browser
  
  Result: Best of both worlds!
*/

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/*
        min-h-screen → Full viewport height (100vh)
        pt-20 → Padding-top = Navbar height (80px)
                Without this, content hides BEHIND the fixed navbar!
        overflow-hidden → Prevents any decorative elements from causing scrollbars
      */}

      {/* ── Background Glow Effect ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/*
          pointer-events-none → Users can click THROUGH this element
          Without it, the glow would block clicks on buttons underneath
        */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
        {/*
          What this creates: A large, soft, golden glow in the center
          bg-gold/5 → 5% opacity gold (very subtle)
          blur-3xl → Heavy blur (makes it look like a light source)
          -translate-x/y-1/2 → Centers the circle perfectly
          
          This is a PREMIUM design technique used by Apple, Stripe, Linear
        */}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/*
          relative z-10 → Sits ABOVE the background glow
          max-w-4xl → Constrains content width (readable line length)
          mx-auto → Centers horizontally
        */}

        {/* Event Badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/20 rounded-full px-4 py-1.5 mb-8">
          <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
          {/*
            animate-pulse → Built-in Tailwind animation
            Creates a gentle pulsing glow effect
            Draws attention without being distracting
          */}
          <span className="text-gold text-sm font-medium">
            December 20, 2026
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-heading font-bold mb-6">
          {/*
            Responsive font sizes:
            text-5xl → Mobile (3rem / 48px)
            sm:text-6xl → Tablet (3.75rem / 60px)  
            lg:text-7xl → Desktop (4.5rem / 72px)
            
            This is "fluid typography" — text scales with screen size!
          */}
          <span className="text-white">{EVENT.name}</span>
          <br />
          <span className="text-gold">{EVENT.year}</span>
        </h1>

        {/* Tagline */}
        <p className="text-lg sm:text-xl text-white-muted max-w-2xl mx-auto mb-4">
          {EVENT.tagline}
        </p>

        {/* Venue */}
        <p className="text-sm text-white-dim mb-12">
          {EVENT.venue} • {EVENT.time}
        </p>

        {/* Countdown */}
        <div className="flex justify-center mb-12">
          <Countdown targetDate={EVENT.date} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/*
            flex-col → Stacked on mobile (buttons full-width)
            sm:flex-row → Side-by-side on tablet+
          */}
          <Link
            href="/tickets"
            className="bg-gold text-black-pure font-bold px-8 py-4 rounded-xl text-lg hover:bg-gold-bright hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all duration-300"
          >
            {/*
              hover:shadow-[...] → Custom gold glow on hover!
              The [...] syntax = arbitrary value in Tailwind
              transition-all duration-300 → Smooth 0.3s animation
            */}
            Get Tickets
          </Link>
          <Link
            href="/about"
            className="border border-gold/50 text-gold font-semibold px-8 py-4 rounded-xl text-lg hover:bg-gold/10 hover:border-gold transition-all duration-300"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}