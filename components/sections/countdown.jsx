"use client";

import { useState, useEffect } from "react";

/*
  WHY "use client"?
  ─────────────────
  This component uses useState + useEffect (browser-only features).
  The countdown MUST run in the browser because:
  - Server doesn't know the user's timezone
  - Server renders once, countdown needs to update every second
*/

function calculateTimeLeft(targetDate) {
  const difference = new Date(targetDate) - new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    /*
      setInterval → Runs a function repeatedly at a fixed interval
      1000ms = 1 second → Updates countdown every second
    */
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    /*
      CLEANUP FUNCTION:
      When this component is removed from the page (unmounts),
      React calls this function to stop the timer.
      Without this → memory leak (timer runs forever in background)
    */
    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ];

  return (
    <div className="flex gap-4 sm:gap-6">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="bg-black-card border border-black-border rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-2">
            {/*
              Why fixed width/height (w-20 h-20)?
              → Prevents layout shift when numbers change
              → "12" and "9" take same space
              This prevents CLS (Cumulative Layout Shift) = better Lighthouse score!
            */}
            <span className="text-2xl sm:text-3xl font-heading font-bold text-gold">
              {String(unit.value).padStart(2, "0")}
            </span>
            {/*
              padStart(2, "0"):
              9 → "09"  (always 2 digits)
              12 → "12" (unchanged)
              Why? Prevents "jumping" when 10 → 9 (2 chars → 1 char)
            */}
          </div>
          <span className="text-xs sm:text-sm text-white-muted uppercase tracking-wider">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}