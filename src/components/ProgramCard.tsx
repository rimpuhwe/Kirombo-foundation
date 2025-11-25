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

const ProgramCard = ({ title, description, image, link, index = 0, icon }: ProgramCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-300"
    >
      <div className="relative h-64 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/80 to-transparent" />
        {icon && (
          <div className="absolute top-6 right-6 w-14 h-14 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground">
            {icon}
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-6 line-clamp-3">
          {description}
        </p>
        {link && (
          <Button
            asChild
            variant="ghost"
            className="text-primary hover:text-secondary p-0 h-auto font-semibold group/button"
          >
            <Link to={link}>
              Learn More
              <ArrowRight
                size={18}
                className="ml-2 group-hover/button:translate-x-1 transition-transform"
              />
            </Link>
          </Button>
        )}
      </div>
    </motion.div>
  );
};

export default ProgramCard;
