"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/**
 * EtherealVoid — The 'Dark Matter' Edition
 * ──────────────────────────────────────
 * A surreal, high-elegance interactive background where 'Embers' swarm 
 * the cursor (Attraction) and react to clicks (Shockwave).
 */
export default function EtherealVoid() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const isClickingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationFrameId;
    let particles = [];
    
    // Performance optimization for mobile
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 100;
    const mouseRadius = isMobile ? 180 : 250; 
    const useShadows = !isMobile; // Disable expensive shadows on mobile

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1.2;
        this.baseVx = (Math.random() - 0.5) * 0.4;
        this.baseVy = (Math.random() - 0.5) * 0.4;
        this.vx = this.baseVx;
        this.vy = this.baseVy;
        this.opacity = Math.random() * 0.6 + 0.4;
        this.color = "255, 179, 0"; 
      }

      update(mouse, clicking) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseRadius) {
            const force = Math.pow((mouseRadius - distance) / mouseRadius, 2);
            const directionX = (dx / distance) * force * 0.6;
            const directionY = (dy / distance) * force * 0.6;
            
            this.vx += directionX;
            this.vy += directionY;

            if (clicking && distance < 180) {
               const pushForce = Math.pow((180 - distance) / 180, 2) * 15;
               this.vx -= (dx / distance) * pushForce;
               this.vy -= (dy / distance) * pushForce;
            }
        }

        this.vx *= 0.95;
        this.vy *= 0.95;
        this.vx += this.baseVx * 0.05;
        this.vy += this.baseVy * 0.05;
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
      }

      draw() {
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        
        if (useShadows) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = `rgb(${this.color})`;
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        if (useShadows) {
          ctx.shadowBlur = 0; // Reset for performance
        }
      }
    }

    const init = () => {
      resize();
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update(mouseRef.current, isClickingRef.current);
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e) => {
        if (!isMobile) {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleMouseDown = () => { if (!isMobile) isClickingRef.current = true; };
    const handleMouseUp = () => { if (!isMobile) isClickingRef.current = false; };

    window.addEventListener("resize", resize);
    if (!isMobile) {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
    }

    init();
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-auto z-[1] overflow-hidden bg-navy-deeper">
      
      {/* ── Layer 1: The Phantom Nebula (Consistent with Theme) ── */}
      <motion.div 
        className="absolute inset-0 z-[1]"
        animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-cyan-500/5 rounded-full blur-[100px]" />
      </motion.div>

      {/* ── Layer 2: Interactive Embers (Canvas) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[2] opacity-80 mix-blend-screen" />

      {/* Layer 3: Depth Grain */}
      <div className="absolute inset-0 opacity-[0.03] hex-pattern z-[4]" />
    </div>
  );
}
