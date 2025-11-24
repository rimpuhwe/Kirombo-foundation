import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import { Play, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Speeches = () => {
  const speeches = [
    {
      title: "The Power of Community-Led Development",
      date: "March 15, 2024",
      location: "Kampala Conference Center",
      description:
        "An inspiring keynote address on sustainable development strategies and the importance of empowering local communities to drive their own transformation.",
      videoId: "example1",
      duration: "32 min",
    },
    {
      title: "Education as the Foundation for Change",
      date: "November 8, 2023",
      location: "East African Education Summit",
      description:
        "A comprehensive presentation on innovative approaches to education in underserved communities, highlighting success stories from AKF programs.",
      videoId: "example2",
      duration: "45 min",
    },
    {
      title: "Building Partnerships for Impact",
      date: "June 20, 2023",
      location: "Global Development Forum, Nairobi",
      description:
        "A compelling discussion on the role of strategic partnerships in scaling community development initiatives across East Africa.",
      videoId: "example3",
      duration: "28 min",
    },
    {
      title: "Healthcare Access in Rural Communities",
      date: "February 12, 2023",
      location: "Pan-African Health Conference",
      description:
        "An in-depth exploration of challenges and opportunities in delivering quality healthcare to remote communities.",
      videoId: "example4",
      duration: "38 min",
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
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Speeches & Public Addresses
              </h1>
              <p className="text-2xl text-white/90">
                Insights and perspectives from our founder on community development and social change
              </p>
            </motion.div>
          </div>
        </section>

        {/* Speeches Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid gap-8">
                {speeches.map((speech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-all border border-border"
                  >
                    <div className="grid md:grid-cols-3 gap-6 p-6">
                      {/* Video Thumbnail */}
                      <div className="md:col-span-1">
                        <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group cursor-pointer">
                          <div className="absolute inset-0 bg-primary/80 flex items-center justify-center group-hover:bg-primary/70 transition-colors">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                              <Play size={32} className="text-white ml-1" fill="white" />
                            </div>
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                            {speech.duration}
                          </div>
                        </div>
                      </div>

                      {/* Speech Details */}
                      <div className="md:col-span-2">
                        <h3 className="text-2xl font-bold mb-3 text-foreground hover:text-primary transition-colors">
                          {speech.title}
                        </h3>

                        <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar size={16} className="text-secondary" />
                            <span>{speech.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-secondary" />
                            <span>{speech.location}</span>
                          </div>
                        </div>

                        <p className="text-muted-foreground mb-6">{speech.description}</p>

                        <Button className="bg-primary hover:bg-primary/90">
                          Watch Speech
                        </Button>
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

export default Speeches;
