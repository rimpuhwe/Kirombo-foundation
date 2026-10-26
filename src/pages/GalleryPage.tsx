import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { galleryImages } from "@/data/gallery";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import HeroMarquee from "@/components/gallery/HeroMarquee";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const siteName = "Abdallah Kiromba Foundation";
const siteUrl = "https://www.abdallahkirombafoundation.org";
const description = "A glimpse into the people, shared moments, and community spirit at the heart of the Abdallah Kiromba Foundation.";

export default function GalleryPage() {
  const { reducedMotion } = useMotionProfile();
  useEffect(() => {
    // The static fallback head otherwise duplicates the gallery's live metadata.
    // Restore it on exit so other pages retain their existing fallback behavior.
    const selectors = [
      'link[rel="canonical"]', 'meta[name="description"]',
      'meta[property^="og:"]', 'meta[name^="twitter:"]:not([name="twitter:site"])',
    ];
    const fallback = Array.from(document.head.querySelectorAll(
      selectors.map(selector => `${selector}:not([data-rh])`).join(","),
    ));
    fallback.forEach(element => element.remove());
    return () => { fallback.forEach(element => document.head.appendChild(element)); };
  }, []);
  const socialImage = new URL(galleryImages[0].src, siteUrl).href;
  const structuredData = {
    "@context": "https://schema.org", "@type": "ImageGallery",
    name: `Gallery | ${siteName}`, description, url: `${siteUrl}/gallery`,
    image: galleryImages.slice(0, 12).map((image) => ({
      "@type": "ImageObject", contentUrl: new URL(image.src, siteUrl).href, caption: image.alt,
    })),
  };
  return (
    <>
      <Helmet defer={false}>
        <title>Gallery | Abdallah Kiromba Foundation</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${siteUrl}/gallery`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={`Gallery | ${siteName}`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteUrl}/gallery`} />
        <meta property="og:image" content={socialImage} />
        <meta property="og:image:alt" content={galleryImages[0].alt} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Gallery | ${siteName}`} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage} />
        <meta name="twitter:image:alt" content={galleryImages[0].alt} />
        <script type="application/ld+json">{JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>
      </Helmet>
      <section className="relative overflow-hidden bg-[#fff9f2] pb-14 pt-28 md:pb-12 md:pt-32">
        <div className="container mx-auto grid items-center gap-10 px-6 md:grid-cols-2 lg:gap-16">
          <motion.div initial={reducedMotion ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reducedMotion ? 0 : 0.7 }} className="py-8 md:py-12">
            <p className="mb-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-primary"><Camera size={16} aria-hidden="true" /> Our story in pictures</p>
            <h1 className="mb-6 text-6xl font-bold tracking-tight text-forest-dark md:text-7xl lg:text-8xl">Photo<br /><span className="text-secondary">Gallery</span></h1>
            <p className="mb-5 max-w-md text-base leading-relaxed text-forest-dark/75 md:text-lg">{description}</p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Hover a frame to bring it to life, click to open it full size.</p>
            <p className="mt-5 text-xs text-muted-foreground">Preview collection · Placeholder photography</p>
          </motion.div>
          <HeroMarquee />
        </div>
        <svg aria-hidden="true" viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute -bottom-px left-0 h-12 w-full fill-background md:h-16"><path d="M0,35 C360,100 780,-25 1440,40 L1440,80 L0,80 Z" /></svg>
      </section>
      <section aria-label="Photo gallery" className="bg-background"><GalleryGrid images={galleryImages} /></section>
    </>
  );
}
