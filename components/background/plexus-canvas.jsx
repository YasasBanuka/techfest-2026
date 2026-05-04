"use client";

import { useEffect, useRef, useState } from "react";

const PARTICLE_COUNT = 90;
const MAX_DISTANCE = 160;
const PARTICLE_RADIUS = 2.5;
const SPEED = 0.4;
const COLOR = "255, 203, 64"; // gold #ffcb40

export default function PlexusCanvas() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const particlesRef = useRef([]);
    const [isMobile, setIsMobile] = useState(null);

    useEffect(() => {
        setIsMobile(window.innerWidth < 768 || "ontouchstart" in window || navigator.maxTouchPoints > 0);
    }, []);

    useEffect(() => {
        if (isMobile === null) return;
        // Mobile: no canvas, no RAF — return early
        if (isMobile) return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        resize();
        window.addEventListener("resize", resize);

        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * SPEED * 2,
            vy: (Math.random() - 0.5) * SPEED * 2,
        }));

        function draw() {
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const particles = particlesRef.current;

            for (const p of particles) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            }

            // Draw connecting lines
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < MAX_DISTANCE) {
                        const opacity = (1 - dist / MAX_DISTANCE) * 0.55;
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(${COLOR}, ${opacity})`;
                        ctx.lineWidth = 1;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw dots
            for (const p of particles) {
                ctx.beginPath();
                ctx.arc(p.x, p.y, PARTICLE_RADIUS, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${COLOR}, 0.85)`;
                ctx.fill();
            }

            animRef.current = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [isMobile]);

    // Mobile: no canvas rendered at all
    if (isMobile) return null;

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}
