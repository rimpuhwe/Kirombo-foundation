import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ProgramCardProps {
  title: string;
  description: string;
  image: string;
  link?: string;
  index?: number;
  icon?: React.ReactNode;
}

const ProgramCard = ({
  title,
  description,
  image,
  link,
  index = 0,
  icon,
}: ProgramCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-2xl border border-gray-300 shadow-soft transition-all duration-300 mx-auto w-full max-w-sm px-4 sm:px-6 md:px-4 hover:shadow-lg hover:scale-[1.03]"
    >
      <div className="pt-3 mb-2 flex flex-col">
        <div>
          <img
            src={image}
            alt={title}
            className="w-full h-full mb-2 rounded-sm"
          />
        </div>
        <div className="px-1 pb-1 pt-1 md:px-2 md:pb-2 md:pt-1 flex flex-col">
          <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-secondary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {description}
          </p>
          {link && (
            <Link
              to={link}
              className="text-primary flex items-center hover:underline "
            >
              Learn More
              <ArrowRight size={18} className="ml-2 transition-transform" />
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProgramCard;
