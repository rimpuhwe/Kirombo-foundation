import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, GraduationCap, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

interface TeamMember {
  name: string;
  title: string;
}

const About = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const location = useLocation();

  // Handle hash navigation
  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (hash) {
      setActiveSection(hash);
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const offset = 180;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
      }
    }
  }, [location.hash]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["introduction", "vision", "board", "partners"];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
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
      window.history.pushState(null, "", `#${sectionId}`);
      setActiveSection(sectionId);
    }
  };

  const teamMembers: TeamMember[] = [
    {
      name: "Haji Higiro Issa",
      title: "Guardian of the foundation",
    },
    {
      name: "Niyonsaba Donat",
      title: "President & Legal Representative",
    },
    {
      name: "Haji Bbale Bwanika",
      title: "First Vice President ",
    },
    {
      name: "Kabanda Joy",
      title: "Executive Secretary",
    },
    {
      name: "Nyirabahizi Hawa",
      title: "Monitoring and Evaluations Officer ",
    },
    {
      name: "Bazizane Harrida",
      title: "Administrator Officer",
    },
    {
      name: "Steven Nsamaza",
      title: "Communication Consultant",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section id="hero" className="relative h-[500px] mt-20">
        <div className="absolute inset-0">
          <img
            src="https://live.staticflickr.com/65535/54924254124_d01799935a_z.jpg"
            alt="Kirombo foundation community gathering"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
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

      {/* Sticky Sub Navigation (Who We Are sublinks) */}
      <div className="sticky top-20 z-40 bg-forest-dark shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {[
              { id: "introduction", label: "INTRODUCTION" },
              { id: "vision", label: "VISION" },
              { id: "mission", label: "MISSION & VALUES" },
              { id: "board", label: "MANAGEMENT TEAM" },
              { id: "partners", label: "CORE PARTNERS" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeSection === item.id
                    ? "text-orange-500 border-b-2 border-orange-500"
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
      <section id="introduction" className="py-20 bg-background scroll-mt-40">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img
                src="https://live.staticflickr.com/65535/54362667675_b318505cd9_z.jpg"
                alt="Group of muslim community"
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
                The Heart Behind the Foundation
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  The Abdallah Kiromba Foundation was officially established in
                  2024 as a common benefit foundation to primarily continue the
                  legacy of our late father, Abdallah Kiromba, through social
                  work as a way of his{" "}
                  <span className="text-secondary">
                    <b>“Sadaqah Jariyah”</b>
                  </span>{" "}
                  by supporting communities in various capacities around Rwanda,
                  as well as the region
                </p>
                <p>
                  Our main goals are to enhance{" "}
                  <strong className="text-foreground">
                    Social and economic development programs, health and
                    well-being, Education, Orphan care, Islamic sessional
                    giving, Water, Livelihood, and other related initiatives.
                  </strong>
                </p>
                <p>
                  By carrying forward Abdallah Kiromba’s legacy of generosity,
                  we aim not only to respond to immediate needs but also to
                  foster long-term growth, dignity, and resilience across
                  communities. Through every project and initiative, we remain
                  committed to uplifting lives and building a brighter future
                  for generations to come.
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
                description:
                  "Building strong relationships with communities to understand their needs and create sustainable solutions together.",
              },
              {
                icon: GraduationCap,
                title: "EDUCATE",
                description:
                  "Providing access to quality education and skills development to empower individuals and transform lives.",
              },
              {
                icon: Users,
                title: "EMPOWER",
                description:
                  "Creating opportunities for economic growth and self-reliance, enabling communities to thrive independently.",
              },
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
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision, Mission, Values Section */}
      <section id="vision" className="py-20 bg-background scroll-mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div id="vision" className="grid md:grid-cols-3 gap-12 mb-16">
              {[
                {
                  title: "Vision",
                  content:
                    "A nation of empowered and dignified Ugandans living in thriving, sustainable communities.",
                },
                {
                  title: "Mission",
                  content:
                    "To support the development of healthy, educated and prosperous communities through sustainable programs and partnerships.",
                },
                {
                  title: "Values",
                  content:
                    "Excellence, Integrity, Innovation, Solidarity and Commitment.",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-lg border border-border shadow-soft"
                >
                  <h3 className="text-2xl font-bold text-primary mb-4">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.content}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section id="board" className="py-20 bg-muted/30 scroll-mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
                Management Team
              </h2>
              <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
                Meet the dedicated leaders guiding our foundation towards
                sustainable impact and transforming communities.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border"
                >
                  <div className="h-64 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users size={48} />
                      </div>
                      <p className="font-semibold">
                        {member.name.split(" ")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {member.name}
                    </h3>
                    <p className="text-secondary font-semibold text-sm mb-4">
                      {member.title}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section (Implementing Partners) */}
      <section id="partners" className="py-20 bg-muted/30 scroll-mt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-center">
                Implementing Partners
              </h2>
              <p className="text-center text-muted-foreground text-lg mb-12 max-w-3xl mx-auto">
                We deliver impact in partnership with trusted organisations and
                institutions.
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                "Partner A",
                "Partner B",
                "Partner C",
                "Partner D",
                "Partner E",
                "Partner F",
              ].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center p-6 bg-card rounded-lg border border-border shadow-soft"
                >
                  <div className="text-center text-muted-foreground">{p}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
