"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * SpeakerBackground — VignetteVoid
 * ───────────────────────────────
 * A surreal, misty background for the Speakers page.
 * Features slow-drifting 'Digital Smoke' and volumetric beams.
 */
export default function SpeakerBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];
    
    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 15 : 30; // Fewer but larger 'mist' particles

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    class MistParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = Math.random() * 200 + 100;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.opacity = Math.random() * 0.05 + 0.02;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius) this.x = canvas.width + this.radius;
        if (this.x > canvas.width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = canvas.height + this.radius;
        if (this.y > canvas.height + this.radius) this.y = -this.radius;
      }
      draw() {
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
        grad.addColorStop(0, `rgba(255, 203, 64, ${this.opacity})`);
        grad.addColorStop(1, "transparent");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    particles = Array.from({ length: count }, () => new MistParticle());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    }
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-navy-deeper">
      {/* ── Base Vignette ── */}
      <div 
        className="absolute inset-0 z-1 shadow-[inset_0_0_200px_rgba(0,0,0,0.8)]"
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 20%, rgba(10,13,16,0.9) 100%)"
        }}
      />

      {/* ── Volumetric Beams ── */}
      <motion.div 
        className="absolute top-0 left-1/4 w-[1px] h-full bg-gold/5 blur-sm"
        animate={{ opacity: [0.1, 0.3, 0.1], x: ["-10%", "10%", "-10%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute top-0 right-1/3 w-[2px] h-full bg-cyan-500/5 blur-md"
        animate={{ opacity: [0.05, 0.2, 0.05], x: ["10%", "-10%", "10%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Mist Canvas ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-2 opacity-50 mix-blend-screen" />

      {/* ── Depth Grain ── */}
      <div className="absolute inset-0 opacity-[0.02] bg-[url('/textures/noise.png')] mix-blend-overlay pointer-events-none" />
    </div>
  );
}
