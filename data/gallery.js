/**
 * data/gallery.js
 * All gallery photos organised by year.
 * Add more years as TechFest grows.
 */

export const GALLERY_YEARS = ["2025"];

export const GALLERY_PHOTOS = [
  // ── TechFest 2025 ──────────────────────────────────────
  {
    id: 1,
    src: "/images/gallery/2025/photo-1.jpg",
    alt: "TechFest 2025 — Main Stage",
    caption: "Main Stage — Opening Ceremony",
    year: "2025",
    category: "stage",
  },
  {
    id: 2,
    src: "/images/gallery/2025/photo-2.jpg",
    alt: "TechFest 2025 — Attendees",
    caption: "700+ Participants gathered at Trace Expert City",
    year: "2025",
    category: "crowd",
  },
  {
    id: 3,
    src: "/images/gallery/2025/photo-3.jpg",
    alt: "TechFest 2025 — Workshop",
    caption: "Hands-on Workshop Session",
    year: "2025",
    category: "workshop",
  },
  {
    id: 4,
    src: "/images/gallery/2025/photo-4.jpg",
    alt: "TechFest 2025 — Speaker",
    caption: "Keynote Address",
    year: "2025",
    category: "stage",
  },
  {
    id: 5,
    src: "/images/gallery/2025/photo-5.jpg",
    alt: "TechFest 2025 — Stalls",
    caption: "30+ Stalls & Exhibits",
    year: "2025",
    category: "exhibits",
  },
  {
    id: 6,
    src: "/images/gallery/2025/photo-6.jpg",
    alt: "TechFest 2025 — Networking",
    caption: "Networking Reception",
    year: "2025",
    category: "networking",
  },
  {
    id: 7,
    src: "/images/gallery/2025/photo-7.jpg",
    alt: "TechFest 2025 — Competition",
    caption: "Hackathon Finals",
    year: "2025",
    category: "workshop",
  },
  {
    id: 8,
    src: "/images/gallery/2025/photo-8.jpg",
    alt: "TechFest 2025 — Awards",
    caption: "Closing Ceremony & Awards",
    year: "2025",
    category: "stage",
  },
  {
    id: 9,
    src: "/images/gallery/2025/photo-9.jpg",
    alt: "TechFest 2025 — Panel",
    caption: "Panel Discussion",
    year: "2025",
    category: "stage",
  },
  {
    id: 10,
    src: "/images/gallery/2025/photo-10.jpg",
    alt: "TechFest 2025 — Community",
    caption: "The TechFest Community",
    year: "2025",
    category: "crowd",
  },
  // Impact photos also included in gallery
  {
    id: 11,
    src: "/images/gallery/2025/impact-1.jpg",
    alt: "TechFest 2025 — Participants",
    caption: "700+ Participants",
    year: "2025",
    category: "crowd",
  },
  {
    id: 12,
    src: "/images/gallery/2025/impact-2.jpg",
    alt: "TechFest 2025 — Expert Speakers",
    caption: "10 Expert Speakers",
    year: "2025",
    category: "stage",
  },
  {
    id: 13,
    src: "/images/gallery/2025/impact-3.jpg",
    alt: "TechFest 2025 — Exhibits",
    caption: "30+ Stalls & Exhibits",
    year: "2025",
    category: "exhibits",
  },
];

export const GALLERY_CATEGORIES = ["All", "stage", "crowd", "workshop", "exhibits", "networking"];

export const CATEGORY_LABELS = {
  All: "All Photos",
  stage: "Stage & Talks",
  crowd: "Crowd & Community",
  workshop: "Workshops",
  exhibits: "Stalls & Exhibits",
  networking: "Networking",
};
