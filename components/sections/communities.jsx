import Image from "next/image";

/*
  Communities section — made more prominent because:
  - These are the OFFICIAL organizers → deserves visual weight
  - Small = looks like a footnote → wrong signal
  - Larger logos + text = authority + trust
*/

export default function Communities() {
  return (
    <section className="py-20 px-6 border-y border-black-border bg-black-soft/50">
      {/*
        py-20 → More breathing room (was py-16)
        bg-black-soft/50 → Subtle background tint
                          Differentiates from Hero's pure black
                          Creates visual "section separation"
      */}

      <div className="max-w-5xl mx-auto text-center">
        {/*
          max-w-5xl → Wider container than before (was max-w-4xl)
          Gives the logos more room to breathe
        */}

        <p className="text-base text-white-muted uppercase tracking-[0.2em] mb-10 font-medium">
          {/*
            text-base → Larger than text-sm
            tracking-[0.2em] → Wider letter spacing for elegance
            font-medium → Slightly bolder
            mb-10 → More space below heading
          */}
          A Collaboration By
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-16">
          {/*
            gap-16 → More space between orgs (was gap-12)
            Prevents them from looking cramped
          */}

          {/* IEEE TechVerse */}
          <div className="flex items-center gap-4 group">
            <Image
              src="/images/logos/techverse.png"
              alt="IEEE TechVerse logo"
              width={64}
              height={64}
              className="rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            {/*
              width/height 64 → Bigger logos (was 48)
              rounded-xl → Slightly more rounded
              scale-105 → Subtler hover (was 110, too jumpy for logos)
            */}
            <div className="text-left">
              <p className="text-white font-heading font-bold text-lg">IEEE TechVerse</p>
              {/*
                font-bold + text-lg → More prominent name
              */}
              <p className="text-white-dim text-sm">Organizing Committee</p>
            </div>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-px h-16 bg-black-border" />
          {/*
            h-16 → Taller divider (was h-12) to match larger items
          */}

          {/* SLSAC */}
          <div className="flex items-center gap-4 group">
            <Image
              src="/images/logos/slsac.png"
              alt="SLSAC logo"
              width={64}
              height={64}
              className="rounded-xl group-hover:scale-105 transition-transform duration-300"
            />
            <div className="text-left">
              <p className="text-white font-heading font-bold text-lg">SLSAC</p>
              <p className="text-white-dim text-sm">Co-Organizing Partner</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}