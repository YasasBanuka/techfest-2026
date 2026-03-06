/**
 * data/tickets.js
 * Ticket tiers and registration info for TechFest 2026.
 */

export const REGISTRATION_DEADLINE = "November 30, 2026";
export const EVENT_DATE = "December 20, 2026";

export const TICKET_TIERS = [
  {
    id: "general",
    name: "General Admission",
    price: "TBA",
    priceNote: "Pricing to be announced",
    badge: "Most Popular",
    featured: true,
    cta: "Register Interest",
    ctaLink: "#register",
    description: "Full access to the main event — everything TechFest has to offer.",
    features: [
      { text: "All keynote sessions", included: true },
      { text: "Panel discussions", included: true },
      { text: "Lightning talks", included: true },
      { text: "Stalls & exhibits area", included: true },
      { text: "Networking reception", included: true },
      { text: "TechFest merchandise bag", included: false },
      { text: "Workshop sessions", included: false },
      { text: "Speaker meet & greet", included: false },
    ],
  },
  {
    id: "workshop",
    name: "Workshop Pass",
    price: "TBA",
    priceNote: "Limited seats available",
    badge: "Limited",
    featured: false,
    cta: "Join Waitlist",
    ctaLink: "#register",
    description: "Everything in General Admission, plus access to hands-on workshop sessions with industry experts.",
    features: [
      { text: "All keynote sessions", included: true },
      { text: "Panel discussions", included: true },
      { text: "Lightning talks", included: true },
      { text: "Stalls & exhibits area", included: true },
      { text: "Networking reception", included: true },
      { text: "TechFest merchandise bag", included: false },
      { text: "Workshop sessions (1 of your choice)", included: true },
      { text: "Speaker meet & greet", included: false },
    ],
  },
  {
    id: "vip",
    name: "VIP Pass",
    price: "TBA",
    priceNote: "Exclusive — very limited",
    badge: "VIP",
    featured: false,
    cta: "Express Interest",
    ctaLink: "/contact",
    description: "The full premium TechFest experience — front-row seats, workshops, exclusive speaker access, and swag.",
    features: [
      { text: "All keynote sessions (front row)", included: true },
      { text: "Panel discussions", included: true },
      { text: "Lightning talks", included: true },
      { text: "Stalls & exhibits area", included: true },
      { text: "Networking reception", included: true },
      { text: "TechFest merchandise bag", included: true },
      { text: "All workshop sessions", included: true },
      { text: "Exclusive speaker meet & greet", included: true },
    ],
  },
];

export const REGISTER_FORM_SUBJECTS = [
  "General Admission",
  "Workshop Pass Waitlist",
  "VIP Pass Enquiry",
];

export const PERKS = [
  { emoji: "🎤", title: "World-Class Speakers", desc: "10+ industry leaders across keynotes, panels and workshops." },
  { emoji: "🛠️", title: "Hands-On Workshops", desc: "Cloud, security, design, startups — learn by doing." },
  { emoji: "🏆", title: "Hackathon & Competitions", desc: "Compete, win prizes, and get noticed by industry." },
  { emoji: "🤝", title: "Networking", desc: "700+ attendees, sponsors, and mentors under one roof." },
  { emoji: "🛍️", title: "30+ Stalls & Exhibits", desc: "Discover projects, products, and companies changing tech." },
  { emoji: "📍", title: "Prime Venue", desc: "Trace Expert City, Colombo — Sri Lanka's tech hub." },
];
