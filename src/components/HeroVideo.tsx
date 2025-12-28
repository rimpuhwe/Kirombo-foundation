import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroCommunity from "@/assets/hero-community.jpg";

const HeroVideo = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image (simulating video) */}
      <div className="absolute inset-0">
        <img
          src={heroCommunity}
          alt="Community members"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 overlay-gradient" />
      </div>

      {/* Hero Content */}
      <div className="relative h-full flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Supporting Communities.
              <br />
              <span className="text-secondary">Transforming Lives.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl mb-10 text-gray-100 max-w-2xl mx-auto"
            >
              Empowering East African communities through education, healthcare,
              and sustainable development programs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="w-full md:w-[260px] px-8 py-5 bg-[#F68B1E] text-white font-semibold border-2 border-[#F68B1E] hover:bg-[#e07a13] hover:border-[#e07a13] transition-all"
              >
                <Link
                  to="/programs"
                  className="flex items-center justify-center w-full"
                >
                  See How Impact Is Made
                  <ArrowRight className="ml-3" size={20} />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full md:w-[260px] px-8 py-5 bg-white/30 text-white font-semibold border-2 border-white transition-all"
                style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                <Link
                  to="/press"
                  className="flex items-center justify-center w-full"
                >
                  Follow Our Journey
                  <ArrowRight className="ml-3" size={20} />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroVideo;
