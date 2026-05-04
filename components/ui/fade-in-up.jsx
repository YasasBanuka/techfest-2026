"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Mobile detection hook — SSR safe
 */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(null);
  useEffect(() => {
    setIsMobile(
      window.innerWidth < 768 ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
  }, []);
  return isMobile;
}

/**
 * FadeInUp — Reusable scroll-triggered animation wrapper
 *
 * Desktop: Framer Motion whileInView fade + slide up.
 * Mobile:  Plain div — content immediately visible, no animation overhead.
 */
export default function FadeInUp({ children, delay = 0, className = "" }) {
  const isMobile = useIsMobile();

  // On mobile (or before detection): render as plain visible div
  if (isMobile || isMobile === null) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer — Wrapper that staggers children animations
 *
 * Desktop: Framer Motion stagger.
 * Mobile:  Plain div.
 */
export function StaggerContainer({ children, className = "" }) {
  const isMobile = useIsMobile();

  if (isMobile || isMobile === null) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  const isMobile = useIsMobile();

  if (isMobile || isMobile === null) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 35 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
    >
      {children}
    </motion.div>
  );
}
