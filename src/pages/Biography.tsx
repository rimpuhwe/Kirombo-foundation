import SectionHeader from "@/components/SectionHeader";
import { motion } from "framer-motion";
import founderPortrait from "@/assets/founder-portrait.jpg";

const Biography = () => {
  return (
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
                Abdallah Kiromba
              </h1>
              <p className="text-2xl text-white/90">
                Founder & Visionary Leader
              </p>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Biography;
