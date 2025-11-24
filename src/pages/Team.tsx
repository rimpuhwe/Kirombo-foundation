import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";

const Team = () => {
  const teamMembers = [
    {
      name: "Abdallah Kiromba",
      role: "Founder & Executive Director",
      bio: "Visionary leader with over 20 years of experience in community development and humanitarian work across East Africa.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Sarah Namuli",
      role: "Director of Programs",
      bio: "Expert in program design and implementation with a focus on education and youth empowerment initiatives.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    },
    {
      name: "James Ochieng",
      role: "Director of Finance & Operations",
      bio: "Seasoned finance professional ensuring transparency and efficient resource management for maximum impact.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    },
    {
      name: "Dr. Grace Akinyi",
      role: "Head of Healthcare Programs",
      bio: "Medical doctor and public health specialist dedicated to improving healthcare access in rural communities.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=400&fit=crop",
    },
    {
      name: "Peter Mugisha",
      role: "Community Engagement Manager",
      bio: "Passionate advocate for community-led development with extensive grassroots mobilization experience.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Patricia Nankya",
      role: "Education Programs Coordinator",
      bio: "Former teacher committed to expanding educational opportunities for children in underserved areas.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Management Team</h1>
              <p className="text-2xl text-white/90">
                Dedicated leaders committed to transforming communities
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <SectionHeader
                subtitle="Leadership"
                title="Meet the People Behind Our Mission"
                description="Our experienced team brings together expertise in community development, healthcare, education, and sustainable growth."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all group"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest-dark via-forest-dark/50 to-transparent opacity-60" />
                    </div>

                    <div className="p-6">
                      <h3 className="text-2xl font-bold mb-2 text-foreground">{member.name}</h3>
                      <p className="text-secondary font-semibold mb-4">{member.role}</p>
                      <p className="text-muted-foreground mb-6">{member.bio}</p>

                      <div className="flex space-x-3">
                        <a
                          href="#"
                          className="w-10 h-10 bg-muted hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all"
                        >
                          <Linkedin size={18} />
                        </a>
                        <a
                          href="#"
                          className="w-10 h-10 bg-muted hover:bg-secondary hover:text-white rounded-full flex items-center justify-center transition-all"
                        >
                          <Mail size={18} />
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Team;
