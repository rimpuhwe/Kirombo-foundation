import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import type { GalleryImage } from "@/data/gallery";

interface Props {
  images: GalleryImage[];
  index: number;
  setIndex: (index: number) => void;
  onClose: () => void;
  reducedMotion: boolean;
}

export default function GalleryLightbox({ images, index, setIndex, onClose, reducedMotion }: Props) {
  const dialog = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    const paddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    closeButton.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  const step = (direction: number) => setIndex((index + direction + images.length) % images.length);
  const image = images[index];
  const controlClass = "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white transition-colors hover:bg-white/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
  return createPortal(
    <motion.div ref={dialog} role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-caption"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 px-4 py-16 backdrop-blur-md md:px-20"
      initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.2 }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
      onKeyDown={(event) => {
        if (event.key === "Escape") { event.preventDefault(); onClose(); }
        if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
        if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
        if (event.key === "Tab") {
          const controls = dialog.current?.querySelectorAll<HTMLButtonElement>("button");
          if (!controls?.length) return;
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      }}>
      <button ref={closeButton} type="button" onClick={onClose} aria-label="Close image" className={`${controlClass} absolute right-4 top-4 md:right-8 md:top-6`}><X size={22} /></button>
      <div className="pointer-events-none flex w-full items-center justify-center gap-3 md:gap-6">
        <button type="button" aria-label="Previous image" onClick={() => step(-1)} className={`${controlClass} pointer-events-auto absolute left-2 z-10 md:static`}><ArrowLeft size={22} /></button>
        <div className="relative w-full max-w-6xl">
          <AnimatePresence initial={false} mode="wait">
            <motion.figure key={image.src} initial={{ opacity: reducedMotion ? 1 : 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.18 }}>
              <img src={image.src} alt={image.alt} className="pointer-events-auto h-[64vh] w-full object-contain md:h-[76vh]" />
              <figcaption id="gallery-lightbox-caption" aria-live="polite" className="mt-5 text-center text-sm text-white/90">
                {image.alt}<span className="mt-2 block text-xs tracking-widest text-white/60">{index + 1} / {images.length}</span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>
        <button type="button" aria-label="Next image" onClick={() => step(1)} className={`${controlClass} pointer-events-auto absolute right-2 z-10 md:static`}><ArrowRight size={22} /></button>
      </div>
    </motion.div>, document.body,
  );
}
