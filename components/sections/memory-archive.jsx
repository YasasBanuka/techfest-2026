"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IMPACT_STATS, GALLERY_2025 } from "@/data/gallery-2025";
import { isTouchDevice } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

/**
 * MemoryArchive — A Surreal Journey through History
 * ────────────────────────────────────────────────
 * A unified pinned sequence that reconstructs past excellence
 * and transitions into the future through high-tech surrealism.
 */

export default function MemoryArchive() {
  const containerRef = useRef(null);
  const pinRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isTouchDevice());
  }, []);

  const SCROLL_DISTANCE = isMobile ? 4000 : 8000;

  // Scene Refs
  const taglineRef = useRef(null);
  const archiveTitleRef = useRef(null);
  const statsContainerRef = useRef(null);
  const statsRefs = useRef([]);
  const photosRefs = useRef([]);
  const mosaicRef = useRef(null);
  const glitchOverlayRef = useRef(null);

  // Audio Context for the 'Data-Crunch'
  const audioCtxRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
  };

  const playCrunch = (freq = 1500, type = "square") => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;

    // Resume if suspended (browser policy)
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: isMobile ? false : true, // Disable expensive pinning on mobile
          pinSpacing: isMobile ? false : true,
          start: "top top",
          end: isMobile ? "+=3000" : `+=${SCROLL_DISTANCE}`, // Much shorter scroll requirement on mobile
          scrub: isMobile ? 0.5 : 1,
          onEnter: initAudio,
        }
      });

      // ─────────────────────────────────────────────────────
      // ACT 1: Data Reconstruction ("Innovate, Inspire, Impact")
      // ─────────────────────────────────────────────────────
      const words = taglineRef.current.querySelectorAll(".tagline-word");

      // Ensure everything is in its starting position immediately
      gsap.set(taglineRef.current, { opacity: 1, zIndex: 50 });
      gsap.set(archiveTitleRef.current, { opacity: 0, zIndex: 10, y: 100 });
      gsap.set(statsContainerRef.current, { opacity: 0, zIndex: 5 });
      gsap.set(mosaicRef.current, { opacity: 0, zIndex: 2 });

      // Words are hidden at start of timeline
      tl.set(words, { opacity: 0, y: 30, filter: "blur(40px) brightness(0)", scale: 0.9 });

      words.forEach((word, i) => {
        tl.to(word, {
          opacity: 1,
          y: 0,
          filter: "blur(0px) brightness(1)",
          scale: 1,
          duration: 3, // Significantly slower word reveal
          ease: "power2.out",
          onStart: () => playCrunch(2000 - i * 500, "sawtooth"),
        }, i === 0 ? "0.5" : ">-2"); // Deep overlap for smooth flow
      });

      // Massive hold on tagline to let the user breathe
      tl.to({}, { duration: 6 });

      // ─────────────────────────────────────────────────────
      // ACT 2: The Breach (Dissolve Tagline → Archive Title)
      // ─────────────────────────────────────────────────────
      tl.to(taglineRef.current, {
        opacity: 0,
        filter: "blur(80px) brightness(8)",
        duration: 4, // Very slow exposure-like dissolve
        ease: "power2.inOut",
        onStart: () => playCrunch(400, "square")
      });

      // Simultaneous appearance of Archive title
      tl.fromTo(archiveTitleRef.current,
        { opacity: 0, scale: 0.7, y: 150, filter: "blur(20px)" },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          zIndex: 60,
          duration: 4, // Matching slow reveal
          ease: "power3.out"
        },
        "-=2.5" // Start during the tagline fade
      );

      // Glitch Flash during breach
      tl.to(glitchOverlayRef.current, {
        opacity: 0.3,
        duration: 0.3,
        repeat: 10,
        yoyo: true,
        ease: "none"
      }, "<");

      tl.to({}, { duration: 6 }); // Deep hold on Archive title

      // ─────────────────────────────────────────────────────
      // ACT 3: holographic Retrospective (Stats Reveal)
      // ─────────────────────────────────────────────────────
      tl.to(archiveTitleRef.current, { y: -200, opacity: 0, duration: 1.5, ease: "slow" });

      IMPACT_STATS.forEach((stat, i) => {
        const photo = photosRefs.current[i];
        const statWrapper = statsRefs.current[i];

        // Ensure container is ready
        tl.set(statsContainerRef.current, { opacity: 1, zIndex: 70 }, "<");

        // Flash background photo
        tl.fromTo(photo,
          { opacity: 0, scale: 1.3, filter: "brightness(2)" },
          { opacity: 0.45, scale: 1, filter: "brightness(0.5)", duration: 1.8, ease: "power2.out" }
        );

        // HUD Stat Reveal
        tl.fromTo(statWrapper,
          { opacity: 0, y: 40, filter: "blur(20px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
          "<0.3"
        );

        tl.to({}, { duration: isMobile ? 2 : 5 });

        // Dissolve stat
        tl.to([photo, statWrapper], { opacity: 0, y: -40, duration: 1.2, ease: "power2.in" });
      });

      // ─────────────────────────────────────────────────────
      // ACT 4: Mosaic Dissolution (Desktop Only for Performance)
      // ─────────────────────────────────────────────────────
      if (!isMobile) {
        tl.set(mosaicRef.current, { opacity: 1, zIndex: 80, pointerEvents: "auto" });
        tl.fromTo(mosaicRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 2.5, ease: "power4.out" }
        );

        tl.to({}, { duration: 5 });

        tl.to(mosaicRef.current, {
          opacity: 0,
          filter: "blur(40px) brightness(4)",
          scale: 1.5,
          rotateX: 15,
          duration: 2.5,
          ease: "power2.in",
          onStart: () => playCrunch(200, "sawtooth"),
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={containerRef} className="relative w-full overflow-hidden bg-navy-deeper border-y border-white/5">

      {/* ── Global Glitch Overlay (Localized) ── */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 z-[100] pointer-events-none opacity-0 mix-blend-overlay bg-gold/20"
      />

      <div ref={pinRef} className={`relative ${isMobile ? "min-h-[150vh]" : "h-screen"} flex items-center justify-center`}>

        {/* Scene 1: Tagline */}
        <div ref={taglineRef} className="absolute inset-0 flex flex-col items-center justify-center z-[50]">
          <h2 className="flex flex-col sm:flex-row gap-4 sm:gap-8 lg:gap-12 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-heading font-black text-white uppercase tracking-tighter text-center">
            {["Innovate", "Inspire", "Impact"].map((word, i) => (
              <span
                key={word}
                data-text={word}
                className="tagline-word glitch-tic inline-block opacity-0"
              >
                {word === "Inspire" ? (
                  <span className="gold-gradient-text drop-shadow-[0_0_50px_rgba(255,179,0,0.3)]">{word}</span>
                ) : word}
              </span>
            ))}
          </h2>
        </div>

        {/* Scene 2: Archive Title */}
        <div ref={archiveTitleRef} className="absolute inset-0 flex flex-col items-center justify-center z-[10] opacity-0 pointer-events-none">
          {/* Subtle Cyber-Blue Data-Grid behind the year */}
          <div className="absolute w-[600px] h-[300px] bg-cyan-950/10 border border-cyan-500/5 backdrop-blur-[2px] -z-10 rounded-[4rem] flex flex-wrap gap-1 p-2 overflow-hidden opacity-40">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-cyan-400/20 rounded-full" />
            ))}
          </div>

          <p className="text-gold text-xs uppercase tracking-[0.6em] mb-4 font-black drop-shadow-[0_0_15px_rgba(255,179,0,0.5)]">Memory Sequence</p>
          <div className="relative">
            <h2 className="text-6xl sm:text-8xl lg:text-[13rem] font-heading font-black uppercase tracking-tighter leading-none text-outline-amber relative z-10">
              2025
            </h2>
            {/* Shimmering fill overlay */}
            <h2 className="absolute inset-0 text-6xl sm:text-8xl lg:text-[13rem] font-heading font-black uppercase tracking-tighter leading-none text-gold/10 blur-[2px] animate-pulse">
              2025
            </h2>
          </div>

          <div className="mt-8 flex gap-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <span className="text-[10px] font-mono text-cyan-400/40 uppercase tracking-[0.3em]">Temporal_Entry: 0x7E9</span>
            <div className="h-px w-24 bg-gradient-to-r from-cyan-500/50 via-cyan-500/50 to-transparent" />
          </div>
        </div>

        {/* Scene 3: Stats & Photos */}
        <div ref={statsContainerRef} className="absolute inset-0 z-[5] opacity-0 pointer-events-none">
          {IMPACT_STATS.map((stat, i) => (
            <div key={i} className="absolute inset-0 flex items-center justify-center">
              {/* Background Flash Photo */}
              <div
                ref={el => photosRefs.current[i] = el}
                className="absolute inset-0 opacity-0"
              >
                <img src={stat.src} alt="" className="w-full h-full object-cover grayscale brightness-[0.2] contrast-125 scale-110" />
                <div className="absolute inset-0 bg-navy-deeper/80" />
              </div>

              {/* HUD Stat */}
              <div
                ref={el => statsRefs.current[i] = el}
                className="relative z-10 flex flex-col items-start px-10 border-l border-gold/40 opacity-0"
              >
                {/* HUD Annotations (Cyber-Blue) */}
                <div className="text-[10px] font-mono text-cyan-400/50 mb-4 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  Archive_ID: TF25_REC_{i + 1} [STABLE]
                </div>

                <h3
                  data-text={stat.stat}
                  className="tagline-word glitch-tic text-6xl sm:text-8xl lg:text-9xl font-heading font-black text-gold drop-shadow-glow leading-none mb-2"
                >
                  {stat.stat}
                </h3>
                <p className="text-xl sm:text-2xl text-white uppercase tracking-[0.3em] font-light italic">
                  {stat.label}
                </p>

                {/* Sub-annotation HUD */}
                <div className="mt-8 text-[9px] font-mono text-cyan-400/30 uppercase max-w-[200px] leading-relaxed">
                  {">"} Retrieval completed: 2025_impact_metadata.bin <br />
                  {">"} Coordinate: TF_SRI_LANKA_01
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scene 4: Mosaic Dissolve */}
        <div ref={mosaicRef} className="absolute inset-0 flex flex-col items-center justify-center z-2 opacity-0 pointer-events-none px-6">
          <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-1 w-full max-w-7xl">
            {GALLERY_2025.slice(0, isMobile ? 8 : 16).map((img, i) => (
              <div key={i} className="aspect-square overflow-hidden border border-white/5 bg-white/5">
                <img src={img.src} alt="" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity grayscale active-grayscale-none" />
              </div>
            ))}
          </div>
          <p className="mt-12 text-white/30 text-[10px] uppercase tracking-[0.8em] font-black">Archival Cycle Complete</p>
        </div>

      </div>

      <style jsx>{`
        .text-outline-amber {
          -webkit-text-stroke: 1px rgba(255, 179, 0, 0.3);
          color: transparent;
        }
        .stroke-amber {
          text-shadow: 0 0 50px rgba(255, 179, 0, 0.1);
        }

        /* ── Cyber Glitch Text Effect ── */
        .tagline-word {
          position: relative;
          display: inline-block;
        }

        .tagline-word::before,
        .tagline-word::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.8;
          display: none;
        }

        .tagline-word:hover::before,
        .tagline-word:hover::after {
          display: block;
        }

        .tagline-word::before {
          color: #0ff;
          animation: glitch-anim 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both infinite;
          clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
          transform: translate(-2px, 0);
        }

        .tagline-word::after {
          color: #f0f;
          animation: glitch-anim 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) reverse both infinite;
          clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
          transform: translate(2px, 0);
        }

        /* Continuous subtle 'tic' for all unlocked words */
        .glitch-tic {
          animation: glitch-tic 5s step-end infinite;
        }

        @keyframes glitch-anim {
          0% { transform: translate(0); }
          20% { transform: translate(-3px, 2px); }
          40% { transform: translate(-3px, -2px); }
          60% { transform: translate(3px, 2px); }
          80% { transform: translate(3px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes glitch-tic {
          0%, 95%, 100% { text-shadow: none; transform: translate(0); }
          96% { text-shadow: 2px 0 #0ff, -2px 0 #f0f; transform: translate(-1px, 1px); }
          97% { text-shadow: -2px 0 #0ff, 2px 0 #f0f; transform: translate(1px, -1px); }
          98% { text-shadow: 1px 0 #0ff, -1px 0 #f0f; transform: translate(-2px, 0); }
          99% { text-shadow: none; transform: translate(0); }
        }
      `}</style>
    </section>
  );
}
