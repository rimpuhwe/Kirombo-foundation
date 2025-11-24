import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Partners = () => {
  const partners = [
    { name: "UNICEF", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop" },
    { name: "WHO", logo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=100&fit=crop" },
    { name: "Save the Children", logo: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&h=100&fit=crop" },
    { name: "World Bank", logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop" },
    { name: "USAID", logo: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=200&h=100&fit=crop" },
    { name: "Gates Foundation", logo: "https://images.unsplash.com/photo-1554774853-aae0a22c8aa4?w=200&h=100&fit=crop" },
  ];

  const partnershipTypes = [
    {
      title: "Strategic Partners",
      description:
        "Long-term collaborators who work with us on comprehensive development programs, providing funding, expertise, and on-ground support.",
      icon: "🤝",
    },
    {
      title: "Funding Partners",
      description:
        "Organizations and foundations that provide financial support for our programs, enabling us to expand our reach and impact.",
      icon: "💰",
    },
    {
      title: "Implementation Partners",
      description:
        "Local and international NGOs that help us deliver programs on the ground, bringing specialized skills and community connections.",
      icon: "🎯",
    },
    {
      title: "Corporate Partners",
      description:
        "Businesses that support our work through CSR initiatives, employee engagement programs, and in-kind donations.",
      icon: "🏢",
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Partners</h1>
              <p className="text-2xl text-white/90">
                Together, we're creating lasting change across East Africa
              </p>
            </motion.div>
          </div>
        </section>

        {/* Partnership Types */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="Collaboration"
              title="How We Work Together"
              description="Our partners play a crucial role in helping us achieve our mission through various forms of collaboration."
            />

            <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {partnershipTypes.map((type, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-all border border-border"
                >
                  <div className="text-5xl mb-4">{type.icon}</div>
                  <h3 className="text-2xl font-bold mb-3 text-foreground">{type.title}</h3>
                  <p className="text-muted-foreground">{type.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="Our Network"
              title="Trusted Organizations We Work With"
              description="We're proud to collaborate with leading organizations in the development sector."
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-soft hover:shadow-medium transition-all flex items-center justify-center aspect-video"
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-primary to-deep-green text-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Become a Partner
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
                Join us in our mission to transform communities. Whether you're an organization, foundation, or business, we'd love to explore partnership opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 py-6 h-auto"
                >
                  <Link to="/contact">
                    Get in Touch
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto border-0"
                >
                  <a href="mailto:partnerships@akfoundation.org">Email Us</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Partners;
