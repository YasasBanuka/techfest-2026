"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import GhostLoader from "@/components/ui/ghost-loader";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import SmoothScrollProvider from "@/components/providers/smooth-scroll";
import NoiseOverlay from "@/components/ui/noise-overlay";
import SparkCursor from "@/components/ui/spark-cursor";

/**
 * ClientContent
 * ─────────────
 * A client-side wrapper that manages the initial 'Ghostly' preloader
 * and ensures the main application only reveals itself after solidification.
 */
export default function ClientContent({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Manage body scroll lock
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100%"; // Prevent scroll-through
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      // Force a resize event for Lenis/GSAP to recalculate
      window.dispatchEvent(new Event('resize'));
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.height = "";
    };
  }, [isLoading]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (!isMounted) return <div className="bg-black fixed inset-0" />;

  return (
    <>
      <div className="relative">
        <SmoothScrollProvider>
          <NoiseOverlay />
          <SparkCursor />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>

        <AnimatePresence>
          {isLoading && (
            <GhostLoader key="preloader" onComplete={handleLoadingComplete} />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
