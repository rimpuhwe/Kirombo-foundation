import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { GraduationCap, Heart, Sprout, Users } from "lucide-react";
import educationImg from "@/assets/education-program.jpg";
import healthcareImg from "@/assets/healthcare-program.jpg";
import sustainableImg from "@/assets/sustainable-development.jpg";

const Programs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-deep-green text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Programs</h1>
              <p className="text-2xl text-white/90">
                Comprehensive initiatives designed to create lasting community impact
              </p>
            </motion.div>
          </div>
        </section>

        {/* Education Programs */}
        <section id="education" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-2 md:order-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <GraduationCap size={28} className="text-primary" />
                    </div>
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
                      Education Programs
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-foreground">
                    Building Futures Through Education
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Education is the foundation for sustainable development and breaking the cycle of
                    poverty. Our education programs provide comprehensive support to ensure children
                    and youth have access to quality learning opportunities.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Full scholarships for students from underserved communities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>School construction and infrastructure development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Teacher training and professional development programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Learning materials, textbooks, and digital resources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Mentorship programs connecting students with professionals</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-1 md:order-2"
                >
                  <div className="rounded-2xl overflow-hidden shadow-strong">
                    <img
                      src={educationImg}
                      alt="Education programs"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Healthcare Programs */}
        <section id="healthcare" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="rounded-2xl overflow-hidden shadow-strong">
                    <img
                      src={healthcareImg}
                      alt="Healthcare programs"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Heart size={28} className="text-secondary" />
                    </div>
                    <span className="text-primary font-semibold uppercase tracking-wider text-sm">
                      Healthcare Initiatives
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-foreground">
                    Delivering Essential Healthcare Services
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Access to quality healthcare is a fundamental right. Our healthcare programs
                    bring medical services to underserved communities, improving health outcomes and
                    saving lives.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Mobile health clinics serving remote rural areas</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Free medical consultations and diagnostic services</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Essential medicines and medical supplies distribution</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Maternal and child health programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-2">✓</span>
                      <span>Health education and disease prevention campaigns</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainable Development */}
        <section id="sustainable" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-2 md:order-1"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Sprout size={28} className="text-primary" />
                    </div>
                    <span className="text-secondary font-semibold uppercase tracking-wider text-sm">
                      Sustainable Development
                    </span>
                  </div>
                  <h2 className="text-4xl font-bold mb-6 text-foreground">
                    Empowering Economic Self-Sufficiency
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    True development creates opportunities for communities to thrive independently.
                    Our sustainable development programs focus on economic empowerment and
                    environmental sustainability.
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Modern agricultural training and sustainable farming techniques</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Small business development and microfinance support</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Clean water and sanitation infrastructure projects</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Vocational training and skills development programs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-secondary mr-2">✓</span>
                      <span>Renewable energy initiatives for sustainable communities</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="order-1 md:order-2"
                >
                  <div className="rounded-2xl overflow-hidden shadow-strong">
                    <img
                      src={sustainableImg}
                      alt="Sustainable development programs"
                      className="w-full h-[500px] object-cover"
                    />
                  </div>
                </motion.div>
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
