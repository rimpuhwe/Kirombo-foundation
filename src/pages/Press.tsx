import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useTitle } from "@/hooks/useTitle";
import { Helmet } from "react-helmet";

const Press = () => {
  useTitle("Latest News | Abdallah Kiromba Foundation");
  const newsItems = [
    {
      title:
        "Over 100 Orphan Students Receive School Support from Abdallah Kiromba Foundation and Zakat Foundation",
      date: "September 09, 2025",
      category: "National",
      image: "https://live.staticflickr.com/65535/54592154662_6d9c4f5b2e_z.jpg",
      description:
        "More than 100 orphan students across Rwanda have received school fees and essential school supplies through an initiative led by the Abdallah Kiromba Foundation (AKF) in partnership with the Zakat Foundation of America.",
      link: "https://rwandadispatch.com/over-100-students-receive-school-support-from-abdallah-kiromba-and-zakat-foundations/",
    },
    {
      title:
        "Muslim families in Kigali, Gisenyi and Musanze receive food packages during Ramadan",
      date: "March 15, 2025",
      category: "Social",
      image: "https://live.staticflickr.com/65535/54595422912_766f4e5f3a_z.jpg",
      description:
        "As the holy month of Ramadan unfolds, bringing with it a spirit of generosity and unity, the Abdallah Kiromba Foundation in partnership with Zakat Foundation of America, have continued to support vulnerable",
      link: "https://rwandadispatch.com/muslim-families-in-kigali-gisenyi-and-musanze-receive-food-packages-during-ramadan/",
    },
    {
      title:
        "AKF, ZF foundations support Orphans across Rwanda with basic education supplies",
      date: "September 21, 2024",
      category: "Social",
      image: "https://live.staticflickr.com/65535/54593034206_1c95fe45e8_z.jpg",
      description:
        "When the new school term approaches, many students across Rwanda prepare to return to the classroom, but for orphans and vulnerable children, this season often brings more anxiety than excitement. ",
      link: "https://rwandadispatch.com/zakat-foundation-of-america-zf-in-partnership-with-abdullah-kiromba-foundation-akf-extends-lifeline-to-orphans-across-rwanda/",
    },
    {
      title:
        "From Struggles to Sustainability: Goat Gifts Change Livelihoods in Gatoki Village",
      date: "May 13, 2025",
      category: "Social",
      image: "https://live.staticflickr.com/65535/54595667438_03c1eedc42_z.jpg",
      description:
        "As the rooster crows loudly in the early morning, Moses Mugisha wakes his wife to begin the day’s work. ",
      link: "https://rwandadispatch.com/from-struggles-to-sustainability-goat-gifts-change-livelihoods-in-gatoki-village/",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Latest News | Abdallah Kiromba Foundation</title>
        <meta
          name="description"
          content="Stay updated with the latest news, activities, and press releases from the Abdallah Kiromba Foundation. Learn about our impact and initiatives."
        />
        <meta
          property="og:title"
          content="Press & Media"
        />
        <meta
          property="og:description"
          content="Latest news, press releases, and media coverage about the foundation."
        />
        
        <meta
          property="og:url"
          content="https://www.abdallahkirombafoundation.com/press"
        />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Press & Media | Abdallah Kiromba Foundation"
        />
        <meta
          name="twitter:description"
          content="Latest news, press releases, and media coverage about the foundation."
        />
       
      </Helmet>


      <div className="min-h-screen bg-background">
        <main className="pt-20">
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
                  Press Room
                </h1>
                <p className="text-2xl text-white/90">
                  Latest news, activities, and updates from the Abdallah Kiromba
                  Foundation
                </p>
              </motion.div>
            </div>
          </section>

          {/* News Grid */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <div className="grid gap-8">
                  {newsItems.map((news, index) => (
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
                              <img src={news.image} alt={news.title} />
                            </div>
                          </div>
                        </div>

                        {/* Speech Details */}
                        <div className="md:col-span-2">
                          <h3 className="text-2xl font-bold mb-3 text-foreground  transition-colors">
                            {news.title}
                          </h3>

                          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                              <Calendar size={16} className="text-primary" />
                              <span>{news.date}</span>
                            </div>
                          </div>

                          <p className="text-muted-foreground mb-6">
                            {news.description}
                          </p>

                          <a
                            href={news.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-secondary transition-colors duration-200 cursor-pointer font-semibold hover:underline"
                          >
                            Read Full Story <ArrowRight className="w-4 h-4" />
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
      </div>
    </>
  );
};

export default Press;
