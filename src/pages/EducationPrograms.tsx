import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ProgramCard from "@/components/ProgramCard";
import educationImage from "@/assets/education-program.jpg";
import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Users, Award } from "lucide-react";

const EducationPrograms = () => {
  const programs = [
    {
      title: "Scholarship Program",
      description: "Providing financial support to deserving students from underprivileged backgrounds to access quality education.",
      image: educationImage,
      icon: <GraduationCap className="w-8 h-8" />,
    },
    {
      title: "Girls' Education Initiative",
      description: "Empowering young girls through education, mentorship, and leadership development programs.",
      image: educationImage,
      icon: <Users className="w-8 h-8" />,
    },
    {
      title: "Literacy Programs",
      description: "Adult literacy and lifelong learning programs to improve reading, writing, and numeracy skills.",
      image: educationImage,
      icon: <BookOpen className="w-8 h-8" />,
    },
    {
      title: "Skills Training",
      description: "Vocational training and skills development programs preparing youth for employment and entrepreneurship.",
      image: educationImage,
      icon: <Award className="w-8 h-8" />,
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
              <BookOpen className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Education Programs
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering through learning, transforming lives through education
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
                Education is the cornerstone of personal development and community transformation. 
                Our education programs are designed to break the cycle of poverty by providing access 
                to quality learning opportunities for children, youth, and adults.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that education empowers individuals with knowledge, skills, and confidence 
                to create better futures for themselves and their communities. Through scholarships, 
                mentorship, and innovative learning programs, we are building a generation of educated, 
                empowered leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="Our Education Initiatives" 
            subtitle="Comprehensive programs supporting learners at every stage"
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
              title="Education Impact" 
              subtitle="Creating opportunities, transforming communities"
            />
            
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                { number: "5,000+", label: "Students Supported" },
                { number: "120+", label: "Scholarships Awarded" },
                { number: "45", label: "Partner Schools" },
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
              Support Education Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Your contribution can provide a child with books, tuition, and the opportunity to build a brighter future.
            </p>
            <a
              href="/donate"
              className="inline-flex items-center justify-center px-8 py-4 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg"
            >
              Donate to Education
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EducationPrograms;
