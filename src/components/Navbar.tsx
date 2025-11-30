import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center"
            onClick={() => {
              document.title = "Abdallah Kiromba Foundation";
            }}
          >
            <img
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1764223037/AKF_logo_1_zsspqo.png"
              alt="AKF logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList className="space-x-2">
                {/* Our Founder Single Link */}
                <NavigationMenuItem>
                  <Link
                    to="/founder/biography"
                    className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                      isActivePath("/founder")
                        ? "text-orange-500"
                        : "text-foreground"
                    } hover:text-orange-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
                  >
                    Our Founder
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className={`font-bold ${
                      isActivePath("/about")
                        ? "text-orange-500"
                        : "text-foreground"
                    } hover:text-orange-500`}
                    onClick={() => navigate("/about#hero")}
                  >
                    Who We Are
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[260px] gap-2 p-2 bg-card">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/about#vision"
                            className="block font-semibold select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-500 hover:text-white"
                          >
                            Vision, Mission and Values
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/about#board"
                            className="block font-semibold select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-500 hover:text-white"
                          >
                            Management Team
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            to="/about#partners"
                            className="block font-semibold select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-500 hover:text-white"
                          >
                            Core Partners
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* What We Do (single link, no dropdown) */}
                <NavigationMenuItem>
                  <Link
                    to="/programs"
                    className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                      isActivePath("/programs")
                        ? "text-orange-500"
                        : "text-foreground"
                    } hover:text-orange-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
                  >
                    What We Do
                  </Link>
                </NavigationMenuItem>

                {/* Press Room (single link, no dropdown) */}
                <NavigationMenuItem>
                  <Link
                    to="/press"
                    className={`inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-bold transition-colors ${
                      isActivePath("/press")
                        ? "text-orange-500"
                        : "text-foreground"
                    } hover:text-orange-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50`}
                  >
                    Press Room
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <Button asChild className="bg-secondary hover:bg-secondary/90">
              <Link to="/donate">Donate Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <div className="space-y-2">
                <Link
                  to="/founder/biography"
                  className="block font-bold py-2 pl-0 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Our Founder
                </Link>
              </div>
              <div className="space-y-2">
                <div className="font-bold text-sm text-muted-foreground">
                  Who We Are
                </div>
                <Link
                  to="/about#vision"
                  className="block font-bold py-2 pl-4 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vision, Mission & Values
                </Link>
                <Link
                  to="/about#board"
                  className="block font-bold py-2 pl-4 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Board Members
                </Link>
                <Link
                  to="/about#partners"
                  className="block font-bold py-2 pl-4 rounded-md hover:bg-orange-500 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Implementing / Core Partners
                </Link>
              </div>
              <div className="space-y-2">
                <div className="font-semibold text-sm text-muted-foreground">
                  What We Do
                </div>
                <Link
                  to="/programs/education"
                  className="block py-2 pl-4 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Education Programs
                </Link>
                <Link
                  to="/programs/healthcare"
                  className="block py-2 pl-4 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Healthcare Programs
                </Link>
                <Link
                  to="/programs/youth-empowerment"
                  className="block py-2 pl-4 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Youth Empowerment
                </Link>
                <Link
                  to="/programs"
                  className="block py-2 pl-4 hover:text-primary transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Programs
                </Link>
              </div>
              <Link
                to="/press"
                className="block py-2 hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Press Room
              </Link>
              <Button
                asChild
                className="w-full bg-secondary hover:bg-secondary/90"
              >
                <Link to="/donate" onClick={() => setMobileMenuOpen(false)}>
                  Donate Now
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
