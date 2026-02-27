"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function calculateTimeLeft(targetDate) {
  const diff = new Date(targetDate) - new Date();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Single animated digit block */
function CountdownUnit({ value, label }) {
  const display = String(value).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 bg-navy-card border border-navy-border rounded-xl flex items-center justify-center overflow-hidden">
        {/* Gold top-edge accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gold/40" />

        <AnimatePresence mode="popLayout">
          <motion.span
            key={display}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-2xl sm:text-3xl font-heading font-bold text-gold tabular-nums"
          >
            {display}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm text-white-dim uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Mins" },
    { value: timeLeft.seconds, label: "Secs" },
  ];

  return (
    <div className="flex items-start gap-3 sm:gap-5">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-start gap-3 sm:gap-5">
          <CountdownUnit value={u.value} label={u.label} />
          {i < units.length - 1 && (
            <span className="text-gold/60 text-2xl font-bold mt-4 sm:mt-5 select-none">:</span>
          )}
        </div>
      ))}
    </div>
  );
}