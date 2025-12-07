import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useTitle } from "@/hooks/useTitle";
import HeroVideo from "@/components/HeroVideo";
import SectionHeader from "@/components/SectionHeader";
import ImpactStats from "@/components/ImpactStats";
import ProgramCard from "@/components/ProgramCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { works } from "../../types/Work";

const Index = () => {
  // Show first 3 works from What We Do
  const programs = works.slice(0, 3).map((work) => ({
    title: work.title,
    description: work.content,
    image: work.img,
    link: `/programs/${work.slug}`,
  }));

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
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  <strong className="text-foreground">
                    The Abdallah Kiromba Foundation
                  </strong>{" "}
                  is an international charity based in Rwanda, dedicated to
                  supporting orphaned children and vulnerable communities by
                  providing essential services such as education, healthcare,
                  food, and clean water. The foundation actively works across
                  more than{" "}
                  <strong className="text-foreground">15 districts</strong>,
                  including Kigali, Gatsibo, Rubavu, and Musanze. Its key
                  activities include providing health insurance to households,
                  running tailoring training programs for teenage mothers and
                  young men in Gatsibo District, and distributing food packages
                  and humanitarian aid, especially during the month of Ramadan.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                  Foundation officially established in 2024, honors the legacy
                  of our late father{" "}
                  <strong className="text-foreground">Abdallah Kiromba</strong>,
                  by continuing his passion for social work
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white"
                >
                  <Link to="/about#vision-mission-values">
                    Learn More About Our Mission
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
                    src="https://live.staticflickr.com/65535/54362268936_088d7927fc_z.jpg"
                    alt="Community education"
                    className="w-full h-[500px] object-cover"
                  />
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

            <div className="flex flex-col items-center">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 -mx-2 w-full justify-center">
                {programs.map((program, index) => (
                  <ProgramCard key={index} {...program} index={index} />
                ))}
              </div>
              <div className="flex justify-center mt-8 w-full">
                <Button
                  asChild
                  size="lg"
                  className="bg-transparent border border-secondary text-secondary hover:bg-secondary hover:text-white w-full max-w-md"
                >
                  <Link to="/programs">View More</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
