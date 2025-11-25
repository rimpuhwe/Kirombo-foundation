import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, GraduationCap, Users } from "lucide-react";
import { useState, useEffect } from "react";

const OurStory = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "vision", "principles", "direction"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 180;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section - Full Width Image */}
      <section className="relative h-[500px] mt-20">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=500&fit=crop"
            alt="Community gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-dark/80 to-forest-dark/40" />
        </div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-white/90 text-lg mb-4 font-medium">About Us</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              WHO WE ARE
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Sticky Sub Navigation */}
      <div className="sticky top-20 z-40 bg-forest-dark shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {[
              { id: "introduction", label: "INTRODUCTION" },
              { id: "vision", label: "VISION, MISSION, VALUES" },
              { id: "principles", label: "GUIDING PRINCIPLES" },
              { id: "direction", label: "STRATEGIC DIRECTION" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeSection === item.id
                    ? "text-secondary border-b-2 border-secondary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Introduction Section */}
      <section id="introduction" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=600&h=700&fit=crop"
                alt="Community work"
                className="rounded-lg shadow-elegant w-full h-[500px] object-cover"
              />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Empowering Communities
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The Abdallah Kiromba Foundation was established with a vision to create lasting 
                  change in communities across Uganda. Born from a deep commitment to social justice 
                  and community development, our foundation represents the culmination of decades of 
                  humanitarian work and dedication to uplifting those in need.
                </p>
                <p>
                  Over the years, we have grown to embrace comprehensive programmes in health, 
                  education, youth empowerment, and sustainable development. <strong className="text-foreground">
                  Like a seed well planted, watered, nurtured and given all the necessary support, 
                  we help communities grow into healthy, prosperous societies that reach high and stand tall.</strong>
                </p>
                <p>
                  This vision shapes our current initiatives and future projects, as we continue to 
                  build stronger, healthier, and more prosperous communities across Uganda.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Pillars Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {[
              {
                icon: Heart,
                title: "ENGAGE",
                description: "Building strong relationships with communities to understand their needs and create sustainable solutions together."
              },
              {
                icon: GraduationCap,
                title: "EDUCATE",
                description: "Providing access to quality education and skills development to empower individuals and transform lives."
              },
              {
                icon: Users,
                title: "EMPOWER",
                description: "Creating opportunities for economic growth and self-reliance, enabling communities to thrive independently."
              }
            ].map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 mx-auto mb-6 bg-primary rounded-full flex items-center justify-center">
                  <pillar.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section id="vision" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                {
                  title: "Vision",
                  content: "A nation of empowered and dignified Ugandans living in thriving, sustainable communities."
                },
                {
                  title: "Mission",
                  content: "To support the development of healthy, educated and prosperous communities through sustainable programs and partnerships."
                },
                {
                  title: "Values",
                  content: "Excellence, Integrity, Innovation, Solidarity and Commitment."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-lg border border-border shadow-soft"
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.content}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section id="principles" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
                Guiding Principles
              </h2>
              <div className="space-y-6">
                {[
                  "We invest first and foremost in people.",
                  "We invest in catalytic actions that address development gaps.",
                  "We invest to harness the power of technology and innovation.",
                  "We invest with partners whose values resonate with ours.",
                  "We invest in solutions that lead to the achievement of national, regional and global goals."
                ].map((principle, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-card p-6 rounded-lg border border-border"
                  >
                    <div className="w-3 h-3 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground leading-relaxed">{principle}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Direction Section */}
      <section id="direction" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
                Strategic Direction
              </h2>
              <div className="prose prose-lg max-w-none space-y-6">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Our strategic direction is shaped by the needs of the communities we serve and 
                  aligned with national development goals. We focus on sustainable interventions 
                  that create lasting impact across multiple generations.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 mt-8">
                  {[
                    {
                      title: "Health & Wellbeing",
                      description: "Expanding access to quality healthcare services and promoting preventive health practices in rural and underserved communities."
                    },
                    {
                      title: "Education Excellence",
                      description: "Building educational infrastructure and providing scholarships to ensure every child has access to quality education."
                    },
                    {
                      title: "Economic Empowerment",
                      description: "Creating sustainable livelihood opportunities through skills training, entrepreneurship support, and access to resources."
                    },
                    {
                      title: "Youth Development",
                      description: "Investing in young people through mentorship, leadership training, and opportunities for civic engagement."
                    }
                  ].map((area, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-lg border border-border shadow-soft"
                    >
                      <h3 className="text-xl font-bold text-foreground mb-3">{area.title}</h3>
                      <p className="text-muted-foreground">{area.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg mb-8 opacity-90">
              Be part of our story and help us create lasting change in communities across Uganda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
              >
                Support Our Cause
              </a>
              <a
                href="/programs"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:bg-white/90 transition-all hover:scale-105 shadow-lg"
              >
                Explore Programs
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
