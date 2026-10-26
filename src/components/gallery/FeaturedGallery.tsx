import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { featuredGallery } from "@/data/gallery";
import { useMotionProfile } from "@/hooks/useMotionProfile";
import { useGalleryReveal } from "./useGalleryReveal";

// Explicit starts pack six photos plus the text panel into a 12 × 8 desktop grid.
// Mobile uses three fully filled two-photo rows below the full-width text panel.
const positions = [
  "col-start-1 row-start-4 row-span-2 md:col-start-1 md:col-span-4 md:row-start-4 md:row-span-2",
  "col-start-4 row-start-4 row-span-2 md:col-start-1 md:col-span-4 md:row-start-6 md:row-span-3",
  "col-start-1 row-start-6 row-span-2 md:col-start-5 md:col-span-5 md:row-start-1 md:row-span-3",
  "col-start-4 row-start-6 row-span-2 md:col-start-5 md:col-span-5 md:row-start-4 md:row-span-2",
  "col-start-1 row-start-8 row-span-2 md:col-start-5 md:col-span-5 md:row-start-6 md:row-span-3",
  "col-start-4 row-start-8 row-span-2 md:col-start-10 md:col-span-3 md:row-start-1 md:row-span-8",
];

export default function FeaturedGallery() {
  const scope = useRef<HTMLElement>(null);
  const { reducedMotion, coarsePointer } = useMotionProfile();
  useGalleryReveal(scope, reducedMotion);
  return (
    <section ref={scope} aria-labelledby="featured-gallery-title" className="grid auto-rows-[5.5rem] grid-cols-6 gap-px bg-background md:auto-rows-[6rem] md:grid-cols-12 lg:auto-rows-[6.5rem]">
      <div className="col-span-6 col-start-1 row-span-3 row-start-1 flex flex-col justify-center bg-[#fff5e9] p-6 md:col-span-4 lg:p-8">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-primary">Our story in pictures</p>
        <motion.h2 id="featured-gallery-title" className="mb-4 text-3xl md:text-2xl lg:text-4xl" initial={reducedMotion ? false : "hidden"} whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}>
          {["Photo", "Gallery"].map((word, index) => <span key={word} className="mr-2 inline-block overflow-hidden align-top"><motion.span className={`inline-block ${index ? "text-secondary" : "text-forest-dark"}`}
            variants={{ hidden: { y: "110%" }, visible: { y: 0, transition: { duration: 0.55 } } }}>{word}</motion.span></span>)}
        </motion.h2>
        <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Every moment tells a story.<br />Discover the people and places behind our mission.</p>
        <Link to="/gallery" className="group mt-5 inline-flex w-fit items-center gap-2 border-b border-primary pb-1 text-sm font-semibold text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
          View full gallery <ArrowRight size={17} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none motion-reduce:transition-none" />
        </Link>
      </div>
      {featuredGallery.map((image, index) => (
        <div key={image.src} className={`wall-tile relative col-span-3 overflow-hidden ${positions[index]}`}>
          <motion.div className="h-full" initial="rest" animate="rest" whileHover={reducedMotion || coarsePointer ? "rest" : "hover"}>
            <Link to="/gallery" aria-label={`View full gallery: ${image.alt}`} className="group relative block h-full overflow-hidden focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-secondary">
              <motion.span className="absolute inset-0 block" variants={{ rest: { scale: 1 }, hover: { scale: 1.09 } }} transition={{ duration: reducedMotion ? 0 : 0.75, ease: [0.22, 1, 0.36, 1] }}>
                <img src={image.src} alt={image.alt} loading="lazy" decoding="async" className={`absolute inset-0 h-full w-full object-cover transition-[filter] duration-700 motion-reduce:transition-none ${coarsePointer ? "" : "grayscale group-hover:grayscale-0 group-focus-visible:grayscale-0"}`} />
              </motion.span>
            </Link>
          </motion.div>
        </div>
      ))}
    </section>
  );
}
