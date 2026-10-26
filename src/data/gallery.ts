export type GalleryImage = { src: string; alt: string };

// Local preview photos only; replace these with Foundation photographs before launch.
// Keep this editorial order: interleave subjects and events rather than sorting or
// placing near-identical photos together (e.g. two everyday frames, one ceremony).
export const galleryImages: GalleryImage[] = [
  { src: "/images/gallery/preview-01.jpg", alt: "Evergreen forest overlooking a blue lake and distant mountains" },
  { src: "/images/gallery/preview-10.jpg", alt: "Laptop, books, and an open design magazine on a wooden desk" },
  { src: "/images/gallery/preview-12.jpg", alt: "A person walking beside a quiet city street, seen from above" },
  { src: "/images/gallery/preview-02.jpg", alt: "A winding stream crossing a misty meadow between forested hills" },
  { src: "/images/gallery/preview-14.jpg", alt: "An open book with softly lit pages and a brown cover" },
  { src: "/images/gallery/preview-11.jpg", alt: "White high-heeled shoes against a weathered red wooden wall" },
  { src: "/images/gallery/preview-03.jpg", alt: "A pebble beach beside blue water and evergreen trees" },
  { src: "/images/gallery/preview-08.jpg", alt: "Sunlit blades of grass with tall trees in the background" },
  { src: "/images/gallery/preview-13.jpg", alt: "Three metal forks crossing against a dark background" },
  { src: "/images/gallery/preview-04.jpg", alt: "Rocky shoreline meeting a calm sea beneath a pale sky" },
  { src: "/images/gallery/preview-09.jpg", alt: "Moss covering a tree branch beneath green leaves" },
  { src: "/images/gallery/preview-15.jpg", alt: "Sunlight shining through delicate flowering branches" },
  { src: "/images/gallery/preview-05.jpg", alt: "A waterfall descending into a rocky forest stream" },
  { src: "/images/gallery/preview-07.jpg", alt: "A straight footpath crossing a meadow toward evergreen trees" },
  { src: "/images/gallery/preview-06.jpg", alt: "Blue coastal water beyond a rocky shore and driftwood" },
  { src: "/images/gallery/preview-16.jpg", alt: "A neatly arranged wallet, glasses, watch, phone, and headphones" },
  { src: "/images/gallery/preview-18.jpg", alt: "Water cascading over rocks through a green forest valley" },
  { src: "/images/gallery/preview-17.jpg", alt: "A person fishing beside ocean waves in warm evening light" },
];

// Exactly six: the featured mosaic packs these into six fixed photo positions.
export const featuredGallery: GalleryImage[] = [
  galleryImages[0], galleryImages[4], galleryImages[8],
  galleryImages[2], galleryImages[10], galleryImages[13],
];
