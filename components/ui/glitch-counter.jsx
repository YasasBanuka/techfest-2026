"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const GLITCH_CHARS = "0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
const TOTAL_DURATION = 3500; // 3.5s total journey
const PHASE_RECORDS = 0.35;    // Show archive data for first 35% of time
const PHASE_GLITCH = 0.70;     // Intense glitching until 70%

export default function GlitchCounter({ fromValue, toValue, delay = 0 }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [display, setDisplay] = useState(fromValue);
    const [phase, setPhase] = useState("archive"); // archive | glitch | settle | final
    const [isMemoryGlitched, setIsMemoryGlitched] = useState(false);
    const rafRef = useRef(null);

    const extractDigits = (val) => val.replace(/[^0-9]/g, "");
    const extractSuffix = (val) => val.replace(/[0-9]/g, "");

    useEffect(() => {
        if (!isInView) return;

        const startDigits = extractDigits(fromValue);
        const endDigits = extractDigits(toValue);
        const endSuffix = extractSuffix(toValue);

        let startTime = null;

        function update(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / TOTAL_DURATION, 1);

            if (progress < PHASE_RECORDS) {
                setPhase("archive");
                setDisplay(fromValue);
            } else if (progress < PHASE_GLITCH) {
                setPhase("glitch");
                const currentLen = Math.max(startDigits.length, endDigits.length);
                const result = new Array(currentLen)
                    .fill(null)
                    .map(() => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)])
                    .join("");
                setDisplay(result);
            } else {
                setPhase("settle");
                const settleProgress = (progress - PHASE_GLITCH) / (1 - PHASE_GLITCH);
                const result = endDigits
                    .split("")
                    .map((target, i) => {
                        const charSettleAt = i / endDigits.length;
                        if (settleProgress >= charSettleAt) return target;
                        return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
                    })
                    .join("");
                setDisplay(result + (settleProgress > 0.8 ? endSuffix : ""));
            }

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(update);
            } else {
                setPhase("final");
                setDisplay(toValue);
            }
        }

        const timeout = setTimeout(() => {
            rafRef.current = requestAnimationFrame(update);
        }, delay);

        return () => {
            clearTimeout(timeout);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [isInView, fromValue, toValue, delay]);

    // ACT 4: The Persistent Memory Glitch (Haunting Archive)
    useEffect(() => {
        if (phase !== "final") return;

        const triggerGlitch = () => {
            // Random chance to glitch back to 'fromValue' (the archive)
            if (Math.random() > 0.75) {
                setIsMemoryGlitched(true);
                const duration = 300 + Math.random() * 300; // Middle ground duration (0.3s - 0.6s)
                setTimeout(() => setIsMemoryGlitched(false), duration);
            }
        };

        const interval = setInterval(triggerGlitch, 1200); // Check much more frequently (every 1.2s)
        return () => clearInterval(interval);
    }, [phase]);

    return (
        <span
            ref={ref}
            className={`relative transition-all duration-300 inline-block
                ${phase === 'glitch' ? 'text-white scale-110 brightness-200 blur-[4px]' : ''}
                ${phase === 'settle' || phase === 'final' ? 'text-gold' : 'text-white/60'}
                ${isMemoryGlitched ? 'text-cyan-400 font-bold mix-blend-screen blur-[1px]' : ''}
            `}
        >
            <span className={phase === 'glitch' || isMemoryGlitched ? 'glitch-classic' : ''}>
                {isMemoryGlitched ? fromValue : display}
            </span>

            {/* Cyan/Magenta RGB Split Shadows during glitch or memory snap */}
            {(phase === 'glitch' || isMemoryGlitched) && (
                <>
                    <span className="absolute inset-0 text-cyan-400 opacity-50 -translate-x-1 animate-pulse pointer-events-none blur-[2px]">
                        {isMemoryGlitched ? fromValue : display}
                    </span>
                    <span className="absolute inset-0 text-magenta opacity-50 translate-x-1 animate-pulse pointer-events-none delay-75 blur-[2px]">
                        {isMemoryGlitched ? fromValue : display}
                    </span>
                    {phase === 'glitch' && <span className="absolute inset-0 bg-cyan-400/20 blur-2xl -z-10 animate-ping" />}
                </>
            )}

            <style jsx>{`
                .glitch-classic {
                    animation: glitch-skew 0.15s infinite linear alternate-reverse, glitch-blur 0.3s infinite step-end;
                }
                @keyframes glitch-skew {
                    0% { transform: skew(0deg); }
                    20% { transform: skew(3deg) scaleY(1.1); }
                    40% { transform: skew(-5deg) scaleX(1.2); }
                    60% { transform: skew(2deg); }
                    80% { transform: skew(-2deg) scale(1.05); }
                    100% { transform: skew(0deg); }
                }
                @keyframes glitch-blur {
                    0%, 100% { filter: blur(0px); }
                    20% { filter: blur(2px) contrast(200%); }
                    50% { filter: blur(4px) brightness(1.5); }
                    80% { filter: blur(1px); }
                }
            `}</style>
        </span>
    );
}
