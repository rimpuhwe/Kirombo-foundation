import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ProgramCard from "@/components/ProgramCard";
import youthImage from "@/assets/sustainable-development.jpg";
import { motion } from "framer-motion";
import { Sparkles, Rocket, Users2, Lightbulb } from "lucide-react";

const YouthEmpowerment = () => {
  const programs = [
    {
      title: "Entrepreneurship Training",
      description: "Equipping young people with business skills, mentorship, and startup support to launch successful enterprises.",
      image: youthImage,
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: "Leadership Development",
      description: "Building confident leaders through training programs, workshops, and community engagement opportunities.",
      image: youthImage,
      icon: <Sparkles className="w-8 h-8" />,
    },
    {
      title: "Youth Mentorship",
      description: "Connecting young people with experienced mentors who guide their personal and professional development.",
      image: youthImage,
      icon: <Users2 className="w-8 h-8" />,
    },
    {
      title: "Innovation & Technology",
      description: "Digital literacy and technology training programs preparing youth for the digital economy.",
      image: youthImage,
      icon: <Lightbulb className="w-8 h-8" />,
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
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Youth Empowerment
            </h1>
            <p className="text-xl text-muted-foreground">
              Building futures together, empowering the next generation of leaders
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
                Youth are the future of our communities and nation. Our youth empowerment programs are 
                designed to unlock the potential of young people through skills training, mentorship, 
                and opportunities for personal and professional growth.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe in creating pathways to success by equipping youth with the tools, knowledge, 
                and confidence they need to become entrepreneurs, innovators, and community leaders. Through 
                our comprehensive programs, we are building a generation of empowered young people ready to 
                shape a better future.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Youth Initiatives" 
            subtitle="Empowering young people to reach their full potential"
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
              title="Youth Program Impact" 
              subtitle="Creating opportunities, transforming lives"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "2,500+", label: "Youth Trained" },
                { number: "150+", label: "Businesses Started" },
                { number: "60+", label: "Mentors Engaged" },
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
              Invest in Youth Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your support empowers young people with skills, opportunities, and the confidence to build successful futures.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
            >
              Support Youth Programs
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default YouthEmpowerment;
