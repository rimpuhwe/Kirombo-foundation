import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ProgramCard from "@/components/ProgramCard";
import healthcareImage from "@/assets/healthcare-program.jpg";
import { motion } from "framer-motion";
import { Heart, Activity, Stethoscope, Shield } from "lucide-react";

const HealthcarePrograms = () => {
  const programs = [
    {
      title: "Primary Healthcare Services",
      description: "Providing accessible and affordable healthcare services to underserved communities through mobile clinics and health centers.",
      image: healthcareImage,
      icon: <Stethoscope className="w-8 h-8" />,
    },
    {
      title: "Maternal & Child Health",
      description: "Comprehensive care for mothers and children, including prenatal care, safe deliveries, and child immunization programs.",
      image: healthcareImage,
      icon: <Heart className="w-8 h-8" />,
    },
    {
      title: "Disease Prevention",
      description: "Community health education and prevention programs targeting malaria, HIV/AIDS, and other communicable diseases.",
      image: healthcareImage,
      icon: <Shield className="w-8 h-8" />,
    },
    {
      title: "Nutrition Programs",
      description: "Fighting malnutrition through feeding programs, nutrition education, and support for vulnerable populations.",
      image: healthcareImage,
      icon: <Activity className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
              <Heart className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Healthcare Programs
            </h1>
            <p className="text-xl text-muted-foreground">
              Promoting health & wellness in every community we serve
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none"
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Access to quality healthcare is a fundamental human right. Our healthcare programs are 
                designed to bridge the gap in healthcare access for underserved communities, providing 
                essential medical services, preventive care, and health education.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Through partnerships with healthcare professionals and local health facilities, we deliver 
                comprehensive health services that save lives and improve the overall well-being of 
                communities. Our focus on prevention, early intervention, and community health education 
                creates sustainable health outcomes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Healthcare Initiatives" 
            subtitle="Comprehensive care addressing diverse health needs"
          />
          
          <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-6xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProgramCard {...program} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SectionHeader 
              title="Healthcare Impact" 
              subtitle="Saving lives, building healthier communities"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "15,000+", label: "Patients Treated" },
                { number: "30+", label: "Health Camps Organized" },
                { number: "8", label: "Health Centers Supported" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-card rounded-lg border border-border shadow-soft"
                >
                  <div className="text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Support Healthcare Access
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your contribution helps provide life-saving medical care and health services to those who need it most.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
            >
              Donate to Healthcare
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HealthcarePrograms;
