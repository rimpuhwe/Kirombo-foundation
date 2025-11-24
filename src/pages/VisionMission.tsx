import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Target, Eye, Heart } from "lucide-react";

const VisionMission = () => {
  const values = [
    {
      title: "Compassion",
      description:
        "We lead with empathy and understanding, recognizing the dignity and potential in every individual.",
    },
    {
      title: "Integrity",
      description:
        "We maintain the highest standards of honesty, transparency, and accountability in all our actions.",
    },
    {
      title: "Sustainability",
      description:
        "We focus on creating long-term solutions that empower communities to thrive independently.",
    },
    {
      title: "Partnership",
      description:
        "We work collaboratively with communities, recognizing that lasting change comes from within.",
    },
    {
      title: "Excellence",
      description:
        "We strive for quality and effectiveness in every program, continuously learning and improving.",
    },
    {
      title: "Innovation",
      description:
        "We embrace creative approaches and new ideas to address complex community challenges.",
    },
  ];

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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Vision, Mission & Values</h1>
              <p className="text-2xl text-white/90">
                Guiding principles that drive everything we do
              </p>
            </motion.div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-gradient-to-br from-primary to-deep-green text-white rounded-3xl p-12 mb-16 shadow-strong"
              >
                <div className="flex items-center justify-center mb-6">
                  <Eye size={64} className="text-secondary" />
                </div>
                <h2 className="text-4xl font-bold text-center mb-6">Our Vision</h2>
                <p className="text-2xl text-center text-white/95 max-w-4xl mx-auto leading-relaxed">
                  A world where every community in East Africa has access to quality education,
                  healthcare, and economic opportunities, empowering them to achieve their full
                  potential and live with dignity.
                </p>
              </motion.div>

              {/* Mission Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-3xl p-12 mb-16 shadow-soft border border-border"
              >
                <div className="flex items-center justify-center mb-6">
                  <Target size={64} className="text-secondary" />
                </div>
                <h2 className="text-4xl font-bold text-center mb-6 text-foreground">Our Mission</h2>
                <p className="text-xl text-center text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8">
                  To transform lives through sustainable community development programs that address
                  education, healthcare, and economic empowerment, working in partnership with local
                  communities to create lasting positive change.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-10">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary">1</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Empower</h3>
                    <p className="text-muted-foreground text-sm">
                      Communities through education and skill development
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-secondary">2</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Sustain</h3>
                    <p className="text-muted-foreground text-sm">
                      Long-term development through healthcare and infrastructure
                    </p>
                  </div>
                  <div className="text-center p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-primary">3</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Transform</h3>
                    <p className="text-muted-foreground text-sm">
                      Lives through economic opportunities and support
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Values Section */}
              <div>
                <SectionHeader
                  subtitle="Our Core Values"
                  title="The Principles That Guide Us"
                  description="These values shape our culture, guide our decisions, and define how we work with communities."
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="bg-card p-6 rounded-2xl shadow-soft hover:shadow-medium transition-all border border-border"
                    >
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                        <Heart size={24} className="text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-foreground">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default VisionMission;
