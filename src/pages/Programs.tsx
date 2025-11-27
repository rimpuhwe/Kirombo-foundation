import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  Heart,
  Droplet,
  Zap,
  Building2,
  PawPrint,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

const Programs = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const carouselImages = [
    "https://live.staticflickr.com/65535/54362647690_d3ffcb6ecb_z.jpg",
    "https://live.staticflickr.com/65535/54924308785_c2b923f7df_z.jpg",
    "https://live.staticflickr.com/65535/54595667203_d2183881a8_z.jpg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? carouselImages.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const programs = [
    {
      id: "education",
      title: "Education",
      icon: GraduationCap,
      description:
        "Providing quality education, scholarships, and learning materials to empower students and build a brighter future.",
      image:
        "https://images.unsplash.com/photo-1427504494785-cdbb6a78b15b?w=600&h=400&fit=crop",
    },
    {
      id: "orphan-care",
      title: "Orphan Care",
      icon: Heart,
      description:
        "Supporting orphans with shelter, healthcare, education, and emotional care to ensure their wellbeing and development.",
      image:
        "https://images.unsplash.com/photo-1488747807830-63789f68bb65?w=600&h=400&fit=crop",
    },
    {
      id: "sadaqah-jariyah",
      title: "Sadaqah Jariyah",
      icon: Building2,
      description:
        "Engaging in continuous charitable giving that benefits communities long-term, following Islamic principles of generosity.",
      image:
        "https://images.unsplash.com/photo-1559828481-7a6be7e3e5d9?w=600&h=400&fit=crop",
    },
    {
      id: "islamic-giving",
      title: "Islamic Sessional Giving",
      icon: Zap,
      description:
        "Supporting Islamic teachings and community values through seasonal charitable giving and religious education programs.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=400&fit=crop",
    },
    {
      id: "livelihood",
      title: "Livelihood",
      icon: PawPrint,
      description:
        "Empowering communities through economic development, vocational training, and income-generating opportunities.",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop",
    },
    {
      id: "water",
      title: "Water & Sanitation",
      icon: Droplet,
      description:
        "Providing access to clean water and sanitation infrastructure for improved health and dignity.",
      image:
        "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* Hero Carousel Section */}
        <section className="relative h-[500px] overflow-hidden">
          <AnimatePresence>
            <motion.div
              key={currentSlide}
              initial={{ x: 1000 }}
              animate={{ x: 0 }}
              exit={{ x: -1000 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0"
            >
              <img
                src={carouselImages[currentSlide]}
                alt={`Carousel slide ${currentSlide + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </motion.div>
          </AnimatePresence>

          {/* Carousel Content */}
          <div className="relative container mx-auto px-4 h-full flex flex-col justify-center z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-white/90 text-lg mb-4 font-medium">Our Work</p>
              <h1 className="text-5xl md:text-6xl font-bold text-white">
                WHAT WE DO
              </h1>
            </motion.div>
          </div>

          {/* Carousel Navigation */}
          <button
            onClick={handlePrevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2"
          >
            <ChevronLeft size={32} className="text-white" />
          </button>

          <button
            onClick={handleNextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 transition-colors rounded-full p-2"
          >
            <ChevronRight size={32} className="text-white" />
          </button>

          {/* Carousel Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {carouselImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white w-8"
                    : "bg-white/50 w-2 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </section>

        {/* Programs Grid */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {programs.map((program, index) => {
                  const IconComponent = program.icon;
                  return (
                    <motion.div
                      key={program.id}
                      id={program.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all group"
                    >
                      {/* Card Image */}
                      <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Card Body */}
                      <div className="p-6">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                            <IconComponent size={24} className="text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground pt-1">
                            {program.title}
                          </h3>
                        </div>

                        <p className="text-muted-foreground mb-6 leading-relaxed">
                          {program.description}
                        </p>

                        {/* Read More CTA */}
                        <button className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/cta">
                          <span>Read More</span>
                          <ChevronRight
                            size={20}
                            className="group-hover/cta:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Programs;
