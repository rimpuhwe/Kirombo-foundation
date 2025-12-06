import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import HeroVideo from "@/components/HeroVideo";
import SectionHeader from "@/components/SectionHeader";
import ImpactStats from "@/components/ImpactStats";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import educationImg from "@/assets/education-program.jpg";
import healthcareImg from "@/assets/healthcare-program.jpg";
import sustainableImg from "@/assets/sustainable-development.jpg";

const Index = () => {
  const programs = [
    {
      title: "Education Programs",
      description:
        "Providing quality education, scholarships, and learning materials to underserved communities. We believe education is the foundation for lasting change.",
      image: educationImg,
      link: "/programs#education",
    },
    {
      title: "Healthcare Initiatives",
      description:
        "Delivering essential healthcare services, medical supplies, and health education to improve community wellbeing and save lives.",
      image: healthcareImg,
      link: "/programs#healthcare",
    },
    {
      title: "Sustainable Development",
      description:
        "Empowering communities through agriculture, clean water projects, and economic development programs for long-term sustainability.",
      image: sustainableImg,
      link: "/programs#sustainable",
    },
  ];

  useTitle("Abdallah Kiromba Foundation");
  return (
    <div className="min-h-screen bg-background">

      <main>
        {/* Hero Section */}
        <HeroVideo />

        {/* About Us Preview */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeader
                  subtitle="Who We Are"
                  title="Building a Better Tomorrow"
                  centered={false}
                />
                <p className="text-lg text-muted-foreground mb-6">
                  The Abdallah Kiromba Foundation is dedicated to transforming
                  lives through comprehensive community development programs.
                  Founded on the principles of compassion, integrity, and
                  sustainable impact, we work tirelessly to create opportunities
                  for those who need them most.
                </p>
                <p className="text-lg text-muted-foreground mb-8">
                  Our approach combines education, healthcare, and economic
                  empowerment to address the root causes of poverty and create
                  lasting change in East African communities.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90"
                >
                  <Link to="/about/vision-mission">
                    Learn About Our Mission
                    <ArrowRight className="ml-2" size={20} />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="rounded-2xl overflow-hidden shadow-strong">
                  <img
                    src={educationImg}
                    alt="Community education"
                    className="w-full h-[500px] object-cover"
                  />
                </div>
                <div className="absolute -bottom-8 -left-8 bg-secondary text-white p-6 rounded-2xl shadow-strong max-w-xs">
                  <p className="text-3xl font-bold mb-1">15+ Years</p>
                  <p className="text-lg">of Community Impact</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Impact Statistics */}
        <ImpactStats />

        {/* Programs Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <SectionHeader
              subtitle="Our Programs"
              title="How We Make a Difference"
              description="Comprehensive programs designed to address the most pressing needs in our communities."
            />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, index) => (
                <ProgramCard key={index} {...program} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Index;
