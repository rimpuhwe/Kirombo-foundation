import { motion } from "framer-motion";
import { Heart, GraduationCap, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useTitle } from "@/hooks/useTitle";

interface TeamMember {
  name: string;
  title: string;
  image: string;
}

const About = () => {
  const [activeSection, setActiveSection] = useState("introduction");
  const location = useLocation();
  useTitle("About Us | Abdallah Kiromba Foundation");

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
      // Section IDs must match those used in the sticky nav and page
      const sections = [
        "introduction",
        "vision-mission-values",
        "board",
        "partners",
      ];
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
      image:
        "https://res.cloudinary.com/dfsbfiprb/image/upload/v1764497208/Issa_profile_pic_okli8l.jpg",
    },
    {
      name: "Niyonsaba Donat",
      title: "President & Legal Representative",
      image:
        "https://res.cloudinary.com/dfsbfiprb/image/upload/v1764344910/WhatsApp_Image_2025-11-26_at_7.34.34_PM_yvzwxk.jpg",
    },
    {
      name: "Haji Bbale Bwanika",
      title: "First Vice President ",
      image:
        "https://res.cloudinary.com/dfsbfiprb/image/upload/v1764344938/WhatsApp_Image_2025-11-26_at_8.14.16_PM_t43zh1.jpg",
    },
    {
      name: "Kabanda Joy",
      title: "Executive Secretary",
      image:
        "https://res.cloudinary.com/dfsbfiprb/image/upload/v1764344924/WhatsApp_Image_2025-11-26_at_8.25.52_PM_dz9nqv.jpg",
    },
    {
      name: "Nyirabahizi Hawa",
      title: "Monitoring and Evaluations Officer ",
      image:
        "https://res.cloudinary.com/dfsbfiprb/image/upload/v1764344953/WhatsApp_Image_2025-11-27_at_2.11.06_PM_jkezyw.jpg",
    },
    {
      name: "Bazizane Harrida",
      title: "Administrator Officer",
      image: "https://live.staticflickr.com/65535/54924254124_d01799935a_z.jpg",
    },
    {
      name: "Steven Nsamaza",
      title: "Communication Consultant",
      image:
        "https://lh3.googleusercontent.com/a-/ALV-UjWiD3dBGaXm2SuaHwqZbwOlA8997iVHmms_aJ6HWjKgmFlSV6V9=s324-p-k-rw-no",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
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

      {/* Sticky Sub Navigation (Who We Are sublinks) - Only show on desktop */}
      <div className="hidden md:block sticky top-20 z-40 bg-forest-dark shadow-lg">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto">
            {[
              { id: "introduction", label: "INTRODUCTION" },
              {
                id: "vision-mission-values",
                label: "VISION ,MISSION & VALUES",
              },
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
      <section
        id="introduction"
        className="min-h-screen flex items-center bg-transparent scroll-mt-[64px] px-6 md:px-12 py-8"
      >
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

      {/* Vision, Mission, Values Section */}
      <section
        id="vision-mission-values"
        className="w-full min-h-screen flex items-center bg-[#f5f5f5a8] text-black scroll-mt-[64px] px-6 md:px-12 py-8 "
      >
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 max-w-7xl mx-auto">
          {/* Left Side - Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-start mt-4">
            <img
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1764227923/logo_fbe3pg.png"
              alt="Abdallah Kiromba Foundation Logo"
              width={400}
              height={400}
              className="max-w-full h-auto object-contain"
            />
          </div>

          {/* Right Side - Text & Accordion */}
          <div className="w-full md:w-1/2 mt-20">
            <h2 className="text-3xl md:text-4xl font-bold text-orange mb-6">
              Empowering Communities Through Purpose
            </h2>
            <p className="mb-6 text-md md:text-lg text-muted-foreground leading-relaxed">
              Discover how the Abdallah Kiromba Foundation transforms lives
              through education, healthcare, orphan care, and sustainable
              livelihoods. Guided by the spirit of Sadaqah Jariyah, we support
              orphaned children and vulnerable families across Rwanda, creating
              lasting opportunities for self-reliance, dignity, and positive
              social change.
            </p>

            <Accordion type="multiple" className="w-full ">
              <AccordionItem value="Our Mission">
                <AccordionTrigger className="text-primary font-semibold font-sans text-sm md:text-base cursor-pointer transition-colors hover:text-secondary data-[state=open]:text-secondary">
                  Our Mission
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  To promote family livelihoods, unity, and socio-economic
                  transformation by providing education, healthcare, orphan
                  care, clean water, and sustainable livelihood support to
                  orphaned children and vulnerable communities across Rwanda and
                  beyond, as a lasting act of Sadaqah Jariyah in honor of the
                  legacy of <i>Abdallah Kiromba</i>.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="Our Vision">
                <AccordionTrigger className="text-primary font-semibold font-sans text-sm md:text-base cursor-pointer transition-colors hover:text-secondary data-[state=open]:text-secondary">
                  Our Vision
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base">
                  A transformed society where orphaned children, vulnerable
                  youth, and families across Rwanda live with dignity,
                  self-reliance, good health, education, food security, and
                  access to clean water empowered to build sustainable
                  livelihoods and a brighter future for generations to come.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="Our Values">
                <AccordionTrigger className="text-primary font-semibold font-sans text-sm md:text-base cursor-pointer transition-colors hover:text-secondary data-[state=open]:text-secondary">
                  Our Values
                </AccordionTrigger>
                <AccordionContent className="text-foreground font-sans text-sm md:text-base">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-semibold text-foreground">
                        EDUCATE:
                      </span>
                      <span className="ml-2 text-muted-foreground leading-relaxed">
                        Providing access to quality education and skills
                        development to empower individuals and transform lives.
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        ENGAGE:
                      </span>
                      <span className="ml-2 text-muted-foreground leading-relaxed">
                        Building strong relationships with communities to
                        understand their needs and create sustainable solutions
                        together.
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        EMPOWER:
                      </span>
                      <span className="ml-2 text-muted-foreground leading-relaxed">
                        Creating opportunities for economic growth and
                        self-reliance, enabling communities to thrive
                        independently.
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        COLLABORATE
                      </span>
                      <span className="ml-2 text-muted-foreground leading-relaxed">
                        Building strong partnerships to maximize impact and
                        create opportunities for the community.
                      </span>
                    </li>
                    <li>
                      <span className="font-semibold text-foreground">
                        INTEGRITY
                      </span>
                      <span className="ml-2 text-muted-foreground leading-relaxed">
                        Upholding transparency, accountability, and ethical
                        practices in all our actions.
                      </span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Board Members Section */}
      <section
        id="board"
        className="min-h-screen flex items-center bg-transparent scroll-mt-[64px] px-6 md:px-12 py-8"
      >
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
                  className="flex flex-col items-center justify-center text-center"
                >
                  <div className="relative mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 object-cover rounded-full border-4"
                      style={{
                        borderColor: "rgba(0,0,0,0.08)",
                        borderStyle: "solid",
                        background: "rgba(0,0,0,0.01)",
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-secondary font-semibold text-sm mb-4">
                    {member.title}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section (Implementing Partners) */}
      <section
        id="partners"
        className="min-h-screen flex items-center bg-[#f5f5f5a8] scroll-mt-[64px] px-6 md:px-12 py-8"
      >
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
    </div>
  );
};

export default About;
