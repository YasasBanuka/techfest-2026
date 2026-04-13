/**
 * data/agenda.js
 * Full day schedule for TechFest Sri Lanka 2026 — November 07, 2026.
 * Replace with real sessions when confirmed.
 *
 * Session types: "keynote" | "workshop" | "panel" | "competition" | "break" | "ceremony"
 * Tracks:        "Main Stage" | "Workshop A" | "Workshop B" | "Competition Arena"
 */

export const AGENDA_DATE = "November 07, 2026";
export const VENUE = "TBA";

export const SESSIONS = [
  {
    id: 1,
    time: "08:00",
    endTime: "09:45",
    title: "Registration & Welcome",
    description: "Check-in, welcome kit distribution, networking",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 2,
    time: "08:00",
    endTime: "19:30",
    title: "Stalls & Showcase",
    description: "IEEE chapter stalls, industry booths, startups, game stalls, food stalls",
    type: "break",
    track: "Exhibition Area",
    speaker: null,
  },
  {
    id: 3,
    time: "09:45",
    endTime: "10:00",
    title: "Opening Ceremony",
    description: "Welcome speech, event overview, sponsor acknowledgement",
    type: "ceremony",
    track: "Main Stage",
    speaker: { name: "Organizing Committee", role: "IEEE TechVerse" },
  },
  {
    id: 4,
    time: "10:00",
    endTime: "10:45",
    title: "Keynote Speech",
    description: "Visionary industry keynote",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "To Be Announced", role: "Industry Visionary" },
    featured: true,
  },
  {
    id: 5,
    time: "10:45",
    endTime: "11:30",
    title: "Panel Discussion",
    description: "Technology leaders discuss future trends & career opportunities",
    type: "panel",
    track: "Main Stage",
    speaker: { name: "Industry Leaders", role: "Various Companies" },
    featured: true,
  },
  {
    id: 6,
    time: "11:30",
    endTime: "12:15",
    title: "Session 1",
    description: "Technical talk / innovation session",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "To Be Announced", role: "Tech Lead" },
  },
  {
    id: 7,
    time: "12:15",
    endTime: "13:15",
    title: "Lunch Break",
    description: "Networking lunch with industry professionals – outdoor area",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 8,
    time: "13:15",
    endTime: "14:00",
    title: "TEDx-Style Talks",
    description: "Short inspiring technology talks",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "Various Speakers", role: "Innovators" },
    featured: true,
  },
  {
    id: 9,
    time: "14:00",
    endTime: "14:45",
    title: "Session 2",
    description: "Technical session / research showcase",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "To Be Announced", role: "Researcher" },
  },
  {
    id: 10,
    time: "14:45",
    endTime: "15:30",
    title: "Session 3",
    description: "Industry / innovation talk",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "To Be Announced", role: "Industry Expert" },
  },
  {
    id: 11,
    time: "15:30",
    endTime: "16:00",
    title: "Interactive Sessions",
    description: "Startup pitches, audience Q&A, networking activities",
    type: "panel",
    track: "Main Stage",
    speaker: { name: "Selected Founders", role: "TechFest Sri Lanka" },
  },
  {
    id: 12,
    time: "16:00",
    endTime: "16:30",
    title: "Refreshments Break",
    description: "Coffee break + exhibition exploration",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 13,
    time: "16:30",
    endTime: "17:00",
    title: "Closing Ceremony",
    description: "Official closing remarks, awards, sponsor recognition",
    type: "ceremony",
    track: "Main Stage",
    speaker: { name: "Organizing Committee", role: "IEEE TechVerse" },
    featured: true,
  },
  {
    id: 14,
    time: "19:00",
    endTime: "20:00",
    title: "Entertainment Item",
    description: "Cultural performance / music",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 15,
    time: "19:30",
    endTime: "20:00",
    title: "Closing of Stalls",
    description: "Exhibition area closing & final networking",
    type: "break",
    track: "Exhibition Area",
    speaker: null,
  },
];

// Filter categories derived from sessions
export const TRACKS = ["All", "Main Stage", "Exhibition Area", "Workshop A", "Workshop B", "Competition Arena"];
export const SESSION_TYPES = ["All", "keynote", "workshop", "panel", "competition", "ceremony", "break"];

// Type metadata: label, color classes
export const TYPE_META = {
  keynote:     { label: "Keynote",     color: "bg-gold/15 text-gold border-gold/30" },
  workshop:    { label: "Workshop",    color: "bg-blue-500/15 text-blue-300 border-blue-500/30" },
  panel:       { label: "Panel",       color: "bg-purple-500/15 text-purple-300 border-purple-500/30" },
  competition: { label: "Competition", color: "bg-red-500/15 text-red-300 border-red-500/30" },
  ceremony:    { label: "Ceremony",    color: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30" },
  break:       { label: "Break",       color: "bg-white/8 text-white-dim border-navy-border" },
};
