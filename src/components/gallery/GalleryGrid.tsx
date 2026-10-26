import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GalleryImage } from "@/data/gallery";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import { useGalleryReveal } from "./useGalleryReveal";
import GalleryLightbox from "./GalleryLightbox";

const bands = [
  { spans: [4, 5, 3], rows: 3 }, { spans: [3, 4, 5], rows: 2 },
  { spans: [5, 3, 4], rows: 3 }, { spans: [4, 4, 4], rows: 2 },
  { spans: [3, 5, 4], rows: 3 },
];
const columns: Record<number, string> = { 3: "md:col-span-3", 4: "md:col-span-4", 5: "md:col-span-5" };
const rows: Record<number, string> = { 2: "md:row-span-2", 3: "md:row-span-3" };

export default function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const scope = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const { reducedMotion, coarsePointer } = useMotionProfile();
  useGalleryReveal(scope, reducedMotion);
  return (
    <>
      <div ref={scope} className="grid auto-rows-[5.5rem] grid-cols-6 gap-px bg-background sm:auto-rows-[7rem] md:auto-rows-[7.5rem] md:grid-cols-12 xl:auto-rows-[8.5rem]">
        {images.map((image, index) => {
          // Three frames fill exactly 12 columns and share a height: no desktop holes.
          const band = bands[Math.floor(index / 3) % bands.length];
          return (
            <div key={image.src} className={`wall-tile relative col-span-3 row-span-2 overflow-hidden ${columns[band.spans[index % 3]]} ${rows[band.rows]}`}>
              <motion.button type="button" aria-label={`Open image: ${image.alt}`} onClick={() => setActiveIndex(index)}
                className="group relative block h-full w-full overflow-hidden focus-visible:z-10 focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-secondary"
                initial="rest" animate="rest" whileHover={reducedMotion || coarsePointer ? "rest" : "hover"} whileFocus={reducedMotion ? "rest" : "hover"}>
                <motion.span className="absolute inset-0 block" variants={{ rest: { scale: 1 }, hover: { scale: 1.09 } }} transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}>
                  <img src={image.src} alt={image.alt} loading="lazy" decoding="async"
                    className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 motion-reduce:transition-none ${coarsePointer ? "" : "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"}`} />
                </motion.span>
              </motion.button>
            </div>
          );
        })}
      </div>
      <AnimatePresence>
        {activeIndex !== null && images[activeIndex] && <GalleryLightbox images={images} index={activeIndex} setIndex={setActiveIndex} onClose={() => setActiveIndex(null)} reducedMotion={reducedMotion} />}
      </AnimatePresence>
    </>
  );
}
