import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";

const OurStory = () => {
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
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              About Us
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering communities, transforming lives since our founding
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader 
              title="Our Story" 
              subtitle="A Legacy of Service and Community Impact"
            />
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="prose prose-lg max-w-none mt-12 space-y-6 text-muted-foreground"
            >
              <p className="text-lg leading-relaxed">
                The Abdallah Kiromba Foundation was established with a vision to create lasting change 
                in communities across Uganda. Born from a deep commitment to social justice and community 
                development, our foundation represents the culmination of decades of humanitarian work 
                and dedication to uplifting those in need.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 my-12">
                <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Beginning</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Founded by Abdallah Kiromba, a visionary leader with a passion for community 
                    service, our foundation emerged from the recognition that sustainable development 
                    requires a holistic approach addressing education, healthcare, and economic empowerment.
                  </p>
                </div>
                
                <div className="bg-card p-8 rounded-lg border border-border shadow-soft">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Our Growth</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    From humble beginnings, we have grown into a trusted organization serving thousands 
                    of individuals and families. Our programs have expanded across multiple districts, 
                    touching lives through education, healthcare, and sustainable development initiatives.
                  </p>
                </div>
              </div>
              
              <p className="text-lg leading-relaxed">
                Our approach is rooted in the belief that every individual deserves access to quality 
                education, healthcare, and opportunities for economic advancement. We work hand-in-hand 
                with communities, ensuring that our programs are culturally sensitive, locally relevant, 
                and sustainable for the long term.
              </p>
              
              <p className="text-lg leading-relaxed">
                Today, the Abdallah Kiromba Foundation stands as a beacon of hope and transformation. 
                Through strategic partnerships, dedicated volunteers, and generous supporters, we continue 
                to build stronger, healthier, and more prosperous communities. Our commitment remains 
                unwavering: to create opportunities where they are needed most and to empower individuals 
                to become agents of change in their own lives and communities.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <SectionHeader 
              title="Our Journey in Numbers" 
              subtitle="Milestones that define our commitment"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "10,000+", label: "Lives Impacted" },
                { number: "50+", label: "Communities Served" },
                { number: "25+", label: "Programs Launched" },
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 text-primary-foreground shadow-elegant"
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
                className="inline-flex items-center justify-center px-8 py-4 bg-card text-foreground rounded-lg font-semibold hover:bg-card/90 transition-all hover:scale-105 shadow-lg"
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
