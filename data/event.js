/*
  Event Data — The single source of truth for TechFest 2026
  
  WHY a separate file?
  ────────────────────
  This follows "Separation of Concerns":
  - Components handle HOW things look (UI)
  - Data files handle WHAT is displayed (content)
  
  When TechFest 2027 happens, you just update THIS file.
  No need to dig through 20 components!
*/

export const EVENT = {
  name: "IEEE TechFest",
  year: "2026",
  tagline: "Where Innovation Meets Excellence",
  date: "2026-09-20T09:00:00",
  time: "09:00 AM - 06:00 PM",
  venue: "Trace Expert City, Colombo",
};

export const STATS = [
  { value: "1000+", label: "Expected Attendees" },
  { value: "30+", label: "Tech Stalls" },
  { value: "25+", label: "Companies" },
  { value: "15+", label: "Speakers" },
];