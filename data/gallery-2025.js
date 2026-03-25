/**
 * data/gallery-2025.js
 * Past event impact data — using real images from public/images/gallery/2025/
 */

// 3 impact scenes shown one-by-one with zoom + stat overlay
export const IMPACT_STATS = [
    {
        stat: "700+",
        label: "Participants",
        src: "/images/gallery/2025/impact-1.jpg",
    },
    {
        stat: "10",
        label: "Expert Speakers",
        src: "/images/gallery/2025/impact-2.jpg",
    },
    {
        stat: "10+",
        label: "Stalls & Exhibits",
        src: "/images/gallery/2025/impact-3.jpg",
    },
];

// 24 gallery mosaic tiles — cycling through 10 real photos
// (photo-1.jpg through photo-10.jpg, index wraps with modulo)
export const GALLERY_2025 = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    src: `/images/gallery/2025/photo-${(i % 10) + 1}.jpg`,
}));
