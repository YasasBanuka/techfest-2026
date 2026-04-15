import { clsx } from "clsx";

/**
 * Merge class names conditionally (Tailwind-safe)
 * Usage: cn("base-class", condition && "conditional-class", "another")
 */
export function cn(...inputs) {
  return clsx(inputs);
}

/**
 * Format a date string for display
 * Usage: formatDate("2026-12-20") → "Sunday, December 20, 2026"
 */
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-LK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Clamp a number between min and max
 */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * Detect if the current device is a touch device
 */
export function isTouchDevice() {
  if (typeof window === "undefined") return false;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}
