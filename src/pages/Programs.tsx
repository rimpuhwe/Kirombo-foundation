import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
      image: "https://live.staticflickr.com/65535/54593246553_e3500da9c0_z.jpg",
    },
    {
      id: "orphan-care",
      title: "Orphan Care",
      icon: Heart,
      description:
        "Supporting orphans with shelter, healthcare, education, and emotional care to ensure their wellbeing and development.",
      image: "https://live.staticflickr.com/65535/54924308785_c2b923f7df_z.jpg",
    },
    {
      id: "sadaqah-jariyah",
      title: "Sadaqah Jariyah",
      icon: Building2,
      description:
        "Engaging in continuous charitable giving that benefits communities long-term, following Islamic principles of generosity.",
      image: "https://live.staticflickr.com/65535/54596511683_7229f1fef6_z.jpg",
    },
    {
      id: "islamic-giving",
      title: "Islamic Sessional Giving",
      icon: Zap,
      description:
        "Supporting Islamic teachings and community values through seasonal charitable giving and religious education programs.",
      image: "https://live.staticflickr.com/65535/54415358731_f4f6178459_z.jpg",
    },
    {
      id: "livelihood",
      title: "Livelihood",
      icon: PawPrint,
      description:
        "Empowering communities through economic development, vocational training, and income-generating opportunities.",
      image: "https://live.staticflickr.com/65535/54595667203_d2183881a8_z.jpg",
    },
    {
      id: "water",
      title: "Water & Sanitation",
      icon: Droplet,
      description:
        "Providing access to clean water and sanitation infrastructure for improved health and dignity.",
      image: "https://live.staticflickr.com/65535/54595423347_7553d77087_z.jpg",
    },
  ];

  const navigate = useNavigate();

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
                      whileHover={{
                        scale: 1.04,
                        zIndex: 10,
                        boxShadow: "0 8px 32px rgba(0,0,0,0.16)",
                      }}
                      transition={{ duration: 0.12, delay: index * 0.05 }}
                      className="bg-card rounded-lg overflow-hidden shadow-soft transition-all group cursor-pointer"
                      style={{ padding: 0 }}
                      onClick={() => navigate(`/programs/${program.id}`)}
                    >
                      {/* Card Image */}
                      <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                        <img
                          src={program.image}
                          alt={program.title}
                          className="w-full h-full object-cover rounded-none"
                        />
                      </div>
                      {/* Card Body */}
                      <div className="p-6 pt-10 flex flex-col items-center">
                        <h3 className="text-xl font-bold text-center mb-2">
                          {program.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed text-center">
                          {program.description}
                        </p>
                        <button
                          className="inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all group/cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/programs/${program.id}`);
                          }}
                        >
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
