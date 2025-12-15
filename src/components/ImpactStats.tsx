import { motion } from "framer-motion";
import { Users, GraduationCap, Heart, Sprout } from "lucide-react";
import CountUp from "@/components/ui/CountUp";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Lives Impacted",
    color: "text-primary",
  },
  {
    icon: GraduationCap,
    value: 15000,
    suffix: "+",
    label: "Students Supported",
    color: "text-secondary",
  },
  {
    icon: Heart,
    value: 25000,
    suffix: "+",
    label: "Healthcare Services",
    color: "text-primary",
  },
  {
    icon: Sprout,
    value: 100,
    suffix: "+",
    label: "Communities Served",
    color: "text-secondary",
  },
];

const ImpactStats = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Together, we're making a real difference in the lives of thousands
            across East Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/15 transition-all shadow-medium"
            >
              <stat.icon
                size={48}
                className={`mx-auto mb-4 ${
                  stat.color === "text-secondary"
                    ? "text-secondary"
                    : "text-white"
                }`}
              />
              <div className="text-4xl font-bold mb-2">
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-lg text-white/80">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;
