import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import HeroVideo from "@/components/HeroVideo";
import SectionHeader from "@/components/SectionHeader";
import ImpactStats from "@/components/ImpactStats";
import ProgramCard from "@/components/ProgramCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import CarouselDots from "@/components/ui/CarouselDots";
import { Button } from "@/components/ui/button";
import { ArrowRight, BadgeCheck, ShieldCheck, ExternalLink } from "lucide-react";
import { works } from "../../types/Work";
import { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";

const Index = () => {
  // Show first 3 works from What We Do
  const programs = works.slice(0, 3).map((work) => ({
    title: work.title,
    description: work.content,
    image: work.img,
    link: `/programs/${work.slug}`,
  }));

  useTitle("Abdallah Kiromba Foundation | Empowering Communities in Rwanda");

  // Carousel auto-advance logic
  const carouselApiRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // Auto-advance logic
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselApiRef.current) {
        carouselApiRef.current.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Attach select event handler when Embla API is set
  const handleSetApi = (api: any) => {
    carouselApiRef.current = api;
    if (api) {
      const onSelect = () => setCurrentSlide(api.selectedScrollSnap());
      api.on("select", onSelect);
      onSelect();
    }
  };

  // Testimonial carousel logic
  const testimonialApiRef = useRef<any>(null);
  const [testimonialSlide, setTestimonialSlide] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (testimonialApiRef.current) {
        testimonialApiRef.current.scrollNext();
      }
    }, 50000); // 50 seconds
    return () => clearInterval(interval);
  }, []);
  const handleTestimonialApi = (api: any) => {
    testimonialApiRef.current = api;
    if (api) {
      const onSelect = () => setTestimonialSlide(api.selectedScrollSnap());
      api.on("select", onSelect);
      onSelect();
    }
  };

  return (
    <>
      <Helmet>
        <title>Abdallah Kiromba Foundation | Empowering Communities in Rwanda</title>
        <meta
          name="description"
          content="the Abdallah Kiromba Foundation is dedicated to supporting orphaned children and vulnerable communities by providing essential services such as education, healthcare, livelihood, skills training, seasonal giving, and clean water."
        />
        {/* Open Graph */}
        <meta
          property="og:title"
          content="Abdallah Kiromba Foundation | Empowering Communities in Rwanda"
        />
        <meta
          property="og:description"
          content="Uplifting communities through education, health, and social programs in Rwanda."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dcgmi6w24/image/upload/v1764227923/logo_fbe3pg.png"
        />
        <meta
          property="og:url"
          content="https://www.abdallahkirombafoundation.com/"
        />
        <meta property="og:type" content="website" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Abdallah Kiromba Foundation | Empowering Communities in Rwanda"
        />
        <meta
          name="twitter:description"
          content="Uplifting communities through education, health, and social programs in Rwanda."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/your-cloud-name/image/upload/homepage-hero.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Abdallah Kiromba Foundation",
        "url": "https://www.abdallahkirombafoundation.com/",
        "logo": "https://res.cloudinary.com/dcgmi6w24/image/upload/v1764227923/logo_fbe3pg.png",
        "sameAs": [
          "https://www.facebook.com/profile.php?id=61573925694268",
          "https://x.com/AbdallahKiromba"
        ],
        "description": "Uplifting communities through education, health, and social programs in Rwanda."
      }
    `}
        </script>
      </Helmet>


      <div className="min-h-screen bg-background">
        <main>
          {/* Hero Section */}
          <HeroVideo />

          {/* About Us Preview */}
          <section className="py-16 bg-background">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <SectionHeader
                    subtitle="Who We Are"
                    title="Building a Better Tomorrow"
                    centered={false}
                  />
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6">
                    <strong className="text-foreground">
                      The Abdallah Kiromba Foundation
                    </strong>{" "}
                    is a Rwanda based charity aiming at regional and
                    international level, dedicated to supporting orphaned
                    children and vulnerable communities by providing essential
                    services such as education and orphan care, healthcare,
                    livelihood, skills training, Seasonal giving as well as
                    clean water. The foundation actively works across more than{" "}
                    <strong className="text-foreground">15 districts</strong>,
                    including Kigali, Gatsibo, Rubavu, and Musanze. Its key
                    activities include providing scholastic materials and
                    tuitions to orphans, health insurance to households, running
                    tailoring training programs for teenage mothers and young
                    men in Gatsibo District, and distributing food packages and
                    humanitarian aid, especially during the holy month of
                    Ramadan and Eid Udihiya.
                  </p>
                  <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-8">
                    Foundation officially established in 2024, honors the legacy
                    of our late father{" "}
                    <strong className="text-foreground">
                      Abdallah Kiromba
                    </strong>
                    , As his{" "}
                    <strong className="text-foreground">Sadaqah Jariyah</strong>{" "}
                    means of "continuous charity".
                  </p>
                  <Button
                    asChild
                    size="lg"
                    className="bg-transparent border-2 border-secondary text-secondary hover:bg-secondary hover:text-white w-full md:w-auto"
                  >
                    <Link
                      to="/about#vision-mission-values"
                      className="flex items-center justify-center w-full"
                    >
                      Learn More About Our Mission
                      <ArrowRight className="ml-2" size={20} />
                    </Link>
                  </Button>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative"
                >
                  <div className="rounded-2xl overflow-hidden shadow-strong w-full">
                    <img
                      src="https://live.staticflickr.com/65535/54362268936_088d7927fc_z.jpg"
                      alt="Community education"
                      className="w-full h-56 md:h-[500px] object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Impact Statistics */}
          <ImpactStats />

          {/* Programs Section */}
          <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
              <SectionHeader
                subtitle="Our Programs"
                title="How We Make a Difference"
                description="Comprehensive programs designed to address the most pressing needs in our communities."
              />
              <div className="flex flex-col items-center w-full">
                <div className="w-full flex flex-col items-center">
                  {/* Mobile: Carousel */}
                  <div className="block md:hidden w-full">
                    <Carousel
                      opts={{ loop: true }}
                      setApi={handleSetApi}
                      className="w-full max-w-md mx-auto"
                    >
                      <CarouselContent>
                        {programs.map((program, index) => (
                          <CarouselItem key={index} className="w-full">
                            <div className="w-full max-w-md mx-auto">
                              <ProgramCard {...program} index={index} />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                    <CarouselDots
                      count={programs.length}
                      current={currentSlide}
                      onSelect={(i) =>
                        carouselApiRef.current &&
                        carouselApiRef.current.scrollTo(i)
                      }
                    />
                  </div>
                  {/* Desktop: Grid */}
                  <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mx-auto px-2 md:px-0">
                    {programs.map((program, index) => (
                      <div key={index} className="flex justify-center w-full">
                        <ProgramCard {...program} index={index} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Certifications & Awards */}
          <section className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-4">
              {/* Heading */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-14"
              >
                <span className="inline-flex items-center gap-2 text-secondary font-semibold text-sm uppercase tracking-widest mb-3">
                  <BadgeCheck className="w-4 h-4" />
                  Official Recognition
                </span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Certifications &amp; Awards
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                  Independently verified and internationally recognised.
                </p>
              </motion.div>

              {/* Content */}
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">

                {/* Certificate image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65 }}
                  className="flex justify-center"
                >
                  <a
                    href="https://www.ngosource.org/about-equivalency-determination-on-file-badge"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                    title="Verify our NGOsource Equivalency Determination"
                  >
                    <img
                      src="https://public.boxcloud.com/api/2.0/internal_files/1538547383706/versions/1690003401306/representations/png_paged_2048x2048/content/1.png?access_token=1!4W5HLOLOh-LstIMpNp6V_PDeLTpBmyRb7ELLRt8duwTplY_ZoOTDRN2bn0R50eMtGRyitxuPtndMiTYDaGJVC8uADDLNhVVL5Crq8F9TwiSBr8xiJeoHJKRIwKHXIgAxCgOKD6I5eCLG5Dbq6Euhy4HKsX3zslAi_urCjwMKCuhGMlcZ081M5YJYUCs4V79Shfur5AcP32rl9TrBX1qOraPXZTkW7P2DDrnoN2pd6At2XCnLcbMGcdGr2Rw_r3j1vU5vdSnQ1ZyAn21rMkAWlAj3tfxQErIs2CG1g4AP1s-5P3W9fWyIR99g1o4TAbLm7TRct74rsAfXypPBh-iTExJIJIRU3vveQloeUXHqVTW8ZdzwNWrwg3rU06Ns8V369d4j54wONXbGzf9eUSzPu6Qc4yNvjsvJ5gYYHkEGk3D-Gi3j9sMKZ3bAefY3cNUdgLMYABYVEKibaI01GH_3AIrDkeNZN-cqEwNyiaBEINIS5uFkDhKH5eYjcZwzj13Zn1BHidUHC2WmkN63ieZLcfabm0U-Y08LFvfI5cD4GKRVptGoZlq8nRQgO6KlggAh47MfLNmU0Qu9GS66teHel7EYv-WfXbU28YWPX8ZQw7SgiAhyc9WZJp8q3ubQD6MChqg20dsN5Err98oBrIxrwuMaIdFYi0PCw-jGltKjm0GT5C0.&shared_link=https%3A%2F%2Ftechsoup.app.box.com%2Fv%2FNGOsourceFileBadgeImage&box_client_name=box-content-preview&box_client_version=3.41.0"
                      alt="NGOsource Equivalency Determination Certificate"
                      className="w-full max-w-2xl object-contain drop-shadow-xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                    <p className="text-center text-muted-foreground/60 text-xs mt-3 flex items-center justify-center gap-1 group-hover:text-secondary transition-colors">
                      <ExternalLink className="w-3 h-3" /> Click to verify
                    </p>
                  </a>
                </motion.div>

                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.1 }}
                >
                  <div className="inline-flex items-center gap-2 bg-secondary/10 border border-secondary/20 text-secondary rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                    <ShieldCheck className="w-4 h-4" />
                    NGOsource Certified
                  </div>

                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
                    Internationally Recognised<br />Non-Governmental Organisation
                  </h3>

                  <p className="text-muted-foreground text-base leading-relaxed">
                    The Abdallah Kiromba Foundation has been awarded an{" "}
                    <span className="text-foreground font-semibold">
                      Equivalency Determination
                    </span>{" "}
                    by NGOsource, an independent verification service endorsed
                    by leading US philanthropic institutions confirming we meet
                    the standards equivalent to a US public charity under
                    Section 501(c)(3).
                  </p>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Index;
