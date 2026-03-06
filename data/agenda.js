/**
 * data/agenda.js
 * Full day schedule for TechFest 2026 — December 20, 2026.
 * Replace with real sessions when confirmed.
 *
 * Session types: "keynote" | "workshop" | "panel" | "competition" | "break" | "ceremony"
 * Tracks:        "Main Stage" | "Workshop A" | "Workshop B" | "Competition Arena"
 */

export const AGENDA_DATE = "December 20, 2026";
export const VENUE = "Trace Expert City, Colombo";

export const SESSIONS = [
  {
    id: 1,
    time: "09:00",
    endTime: "09:30",
    title: "Registration & Welcome Reception",
    description: "Pick up your badge, grab a coffee, and connect with fellow attendees before the main event begins.",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 2,
    time: "09:30",
    endTime: "10:00",
    title: "Opening Ceremony",
    description: "Official opening by the TechFest 2026 organizing committee and IEEE Sri Lanka Section.",
    type: "ceremony",
    track: "Main Stage",
    speaker: { name: "Organizing Committee", role: "IEEE TechVerse" },
  },
  {
    id: 3,
    time: "10:00",
    endTime: "11:00",
    title: "The Future of AI in Sri Lanka",
    description: "A deep-dive into how artificial intelligence is reshaping industries and what Sri Lankan engineers need to know to stay ahead.",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "Dr. Ashan Fernando", role: "AI Research Lead, LSEG Technology" },
    featured: true,
  },
  {
    id: 4,
    time: "11:00",
    endTime: "12:00",
    title: "Building for Billions: Scaling Systems at Global Scale",
    description: "Real-world lessons from engineering systems that handle millions of requests per second — architecture decisions, trade-offs, and failures.",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "Nishani Jayasinghe", role: "Senior Engineer, WSO2" },
    featured: true,
  },
  {
    id: 5,
    time: "11:00",
    endTime: "12:30",
    title: "Hands-On Cloud Native Workshop",
    description: "Build and deploy a containerized microservice to Kubernetes from scratch. Bring your laptop — this is a hands-on session.",
    type: "workshop",
    track: "Workshop A",
    speaker: { name: "Kasun Rathnayake", role: "DevOps Engineer, Sysco LABS" },
    badge: "Limited Seats",
  },
  {
    id: 6,
    time: "11:00",
    endTime: "12:30",
    title: "UI/UX Design Sprint",
    description: "Rapid design thinking workshop — from problem statement to hi-fi prototype in 90 minutes using Figma.",
    type: "workshop",
    track: "Workshop B",
    speaker: { name: "Dilni Senanayake", role: "Senior UX Designer, 99x" },
    badge: "Limited Seats",
  },
  {
    id: 7,
    time: "12:30",
    endTime: "13:30",
    title: "Lunch Break & Networking",
    description: "Enjoy lunch, explore the stalls and exhibits, and network with speakers and fellow innovators.",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
  {
    id: 8,
    time: "13:30",
    endTime: "14:30",
    title: "Panel: Women Leading Tech in Sri Lanka",
    description: "A candid conversation with five of Sri Lanka's most accomplished women in technology on navigating the industry, mentorship, and creating impact.",
    type: "panel",
    track: "Main Stage",
    speaker: { name: "5 Panelists", role: "Industry Leaders" },
    featured: true,
  },
  {
    id: 9,
    time: "13:30",
    endTime: "15:00",
    title: "Cybersecurity Red Team Workshop",
    description: "Ethical hacking hands-on — learn penetration testing fundamentals and practice on intentionally vulnerable systems.",
    type: "workshop",
    track: "Workshop A",
    speaker: { name: "Thilak Rajapaksa", role: "Security Engineer, Pearson" },
    badge: "Limited Seats",
  },
  {
    id: 10,
    time: "13:30",
    endTime: "15:00",
    title: "Startup Pitch Bootcamp",
    description: "Sharpen your pitch with real feedback from investors and founders. Learn the anatomy of a winning startup pitch.",
    type: "workshop",
    track: "Workshop B",
    speaker: { name: "Ruchith Alwis", role: "Co-founder, Sandbox" },
  },
  {
    id: 11,
    time: "14:30",
    endTime: "15:30",
    title: "The Open Source Economy",
    description: "How open-source is shifting power in the software industry — and how you can contribute to and benefit from the ecosystem.",
    type: "keynote",
    track: "Main Stage",
    speaker: { name: "Sameera Jayasoma", role: "Principal Engineer, Ballerina" },
  },
  {
    id: 12,
    time: "15:30",
    endTime: "16:00",
    title: "Lightning Talks",
    description: "Five 5-minute talks from emerging tech talent on topics ranging from ML model deployment to IoT in agriculture.",
    type: "panel",
    track: "Main Stage",
    speaker: { name: "Selected Speakers", role: "Community Members" },
  },
  {
    id: 13,
    time: "15:00",
    endTime: "16:30",
    title: "Hackathon Finals & Presentations",
    description: "The top 5 teams from the TechFest Hackathon present their solutions to a panel of judges from the industry.",
    type: "competition",
    track: "Competition Arena",
    speaker: { name: "5 Finalist Teams", role: "TechFest Hackathon" },
    featured: true,
  },
  {
    id: 14,
    time: "16:30",
    endTime: "17:30",
    title: "Closing Keynote & Awards Ceremony",
    description: "Celebrating the achievements of TechFest 2026 — hackathon winners, outstanding speaker awards, and a closing address.",
    type: "ceremony",
    track: "Main Stage",
    speaker: { name: "Chief Guest", role: "To Be Announced" },
    featured: true,
  },
  {
    id: 15,
    time: "17:30",
    endTime: "18:00",
    title: "Networking Reception",
    description: "The day's final chapter — connect with speakers, sponsors, and new friends over refreshments.",
    type: "break",
    track: "Main Stage",
    speaker: null,
  },
];

// Filter categories derived from sessions
export const TRACKS = ["All", "Main Stage", "Workshop A", "Workshop B", "Competition Arena"];
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
