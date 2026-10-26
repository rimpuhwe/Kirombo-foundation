import { motion } from "framer-motion";
import { galleryImages } from "@/data/gallery";
import { useMotionProfile } from "@/hooks/useMotionProfile";

export default function HeroMarquee() {
  const { reducedMotion } = useMotionProfile();
  if (reducedMotion) return null;
  return (
    <div aria-hidden="true" className="pointer-events-none hidden h-[440px] grid-cols-2 gap-4 overflow-hidden md:grid lg:grid-cols-3"
      // Fade the entering and departing prints into the warm hero background.
      style={{ maskImage: "linear-gradient(to bottom, transparent, black 10%, black 93%, transparent)" }}>
      {[38, 46, 42].map((duration, column) => {
        const photos = galleryImages.slice(column * 5, column * 5 + 5);
        return (
          <motion.div key={column} className={`h-max ${column === 2 ? "hidden lg:block" : ""}`}
            initial={{ y: column === 1 ? "-50%" : "0%" }}
            animate={{ y: column === 1 ? "0%" : "-50%" }}
            transition={{ duration, repeat: Infinity, ease: "linear" }}>
            {[0, 1].map((copy) => (
              <div key={copy} className="flex flex-col gap-4 pb-4">
                {photos.map((image) => <img key={image.src} src={image.src} alt="" decoding="async" width="320" height="192"
                  className="h-40 w-full rounded-xl object-cover grayscale ring-1 ring-forest-dark/10 lg:h-48" />)}
              </div>
            ))}
          </motion.div>
        );
      })}
    </div>
  );
}
