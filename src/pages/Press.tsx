import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import educationImg from "@/assets/education-program.jpg";
import healthcareImg from "@/assets/healthcare-program.jpg";
import sustainableImg from "@/assets/sustainable-development.jpg";

const Press = () => {
  const newsItems = [
    {
      title: "AKF Launches New Education Initiative in Rural Uganda",
      date: "March 22, 2024",
      category: "Education",
      image: educationImg,
      description:
        "The Abdallah Kiromba Foundation announced a major new scholarship program providing full educational support to 500 students across 10 rural communities.",
      link: "#",
    },
    {
      title: "Healthcare Mobile Clinics Reach 10,000 Patients",
      date: "February 15, 2024",
      category: "Healthcare",
      image: healthcareImg,
      description:
        "Our mobile healthcare units have successfully provided medical services to over 10,000 patients in remote areas, offering free consultations and medicines.",
      link: "#",
    },
    {
      title: "Sustainable Farming Program Shows Remarkable Results",
      date: "January 8, 2024",
      category: "Sustainable Development",
      image: sustainableImg,
      description:
        "Farmers participating in AKF's sustainable agriculture training program have reported a 40% increase in crop yields and improved food security.",
      link: "#",
    },
    {
      title: "Partnership Announcement with Major International NGO",
      date: "December 12, 2023",
      category: "Partnership",
      image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&h=500&fit=crop",
      description:
        "AKF signs strategic partnership agreement to expand community development programs across East Africa with support from global development organization.",
      link: "#",
    },
    {
      title: "Annual Community Impact Report Released",
      date: "November 20, 2023",
      category: "Impact",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=500&fit=crop",
      description:
        "Foundation releases comprehensive report showing 50,000+ lives directly impacted through education, healthcare, and economic empowerment programs in 2023.",
      link: "#",
    },
    {
      title: "New Community Center Opens in Kampala Region",
      date: "October 5, 2023",
      category: "Infrastructure",
      image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=500&fit=crop",
      description:
        "State-of-the-art community center provides education, healthcare, and vocational training facilities to serve over 5,000 community members.",
      link: "#",
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Press Room</h1>
              <p className="text-2xl text-white/90">
                Latest news, activities, and updates from the Abdallah Kiromba Foundation
              </p>
            </motion.div>
          </div>
        </section>

        {/* News Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <SectionHeader
                subtitle="Latest Updates"
                title="News & Activities"
                description="Stay informed about our programs, partnerships, and the communities we serve."
              />

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {newsItems.map((item, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all group"
                  >
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-secondary text-white px-3 py-1 rounded-full text-sm font-semibold">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar size={16} className="text-secondary" />
                        <time dateTime={item.date}>{item.date}</time>
                      </div>

                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 line-clamp-3">
                        {item.description}
                      </p>

                      <Button
                        variant="ghost"
                        className="text-primary hover:text-secondary p-0 h-auto font-semibold group/button"
                      >
                        Read Full Story
                        <ArrowRight
                          size={18}
                          className="ml-2 group-hover/button:translate-x-1 transition-transform"
                        />
                      </Button>
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Media Contact */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Media Inquiries
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                For press inquiries, interview requests, or additional information, please contact our communications team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  <a href="mailto:press@akfoundation.org">Email Press Team</a>
                </Button>
                <Button size="lg" variant="outline">
                  Download Press Kit
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

export default Press;
