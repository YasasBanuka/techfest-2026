import Link from "next/link";

/*
  Server Component — no interactivity needed.
  
  CTA (Call to Action) Design Pattern:
  ──────────────────────────────────
  - Distinct background to "break" the visual flow
  - Large, clear heading stating the VALUE
  - One primary button (gold = action)
  - Supporting text to reduce hesitation
  
  This pattern is used by literally every event website,
  SaaS landing page, and product site in the industry.
*/

export default function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative background card */}
        <div className="relative bg-black-card border border-black-border rounded-3xl p-12 sm:p-16 overflow-hidden">
          {/*
            rounded-3xl → Very rounded corners (24px)
            p-12 sm:p-16 → Generous padding (48px mobile, 64px desktop)
            overflow-hidden → Contains the glow effect inside the card
          */}

          {/* Background Glow */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gold/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-gold/3 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
          </div>
          {/*
            Two glows positioned at opposite corners:
            → Top-right and Bottom-left
            → Creates a diagonal visual flow
            → Guides the eye from heading → button
          */}

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-white mb-6">
              Ready to Be Part of{" "}
              <span className="text-gold">Something Big?</span>
            </h2>
            {/*
              {" "} → Explicit space in JSX
              Without it, "of" and "Something" would merge
              This is a JSX quirk you need to know!
            */}

            <p className="text-white-muted text-lg max-w-2xl mx-auto mb-10">
              Secure your spot at TechFest 2026. Network with industry leaders, 
              explore cutting-edge tech, and be inspired.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tickets"
                className="bg-gold text-black-pure font-bold px-10 py-4 rounded-xl text-lg hover:bg-gold-bright hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300"
              >
                Register Now — It&apos;s Free
              </Link>
              <Link
                href="/contact"
                className="border border-white/20 text-white font-semibold px-10 py-4 rounded-xl text-lg hover:bg-white/5 hover:border-white/40 transition-all duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}