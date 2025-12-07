import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActivePath = (path: string) => {
    return location.pathname.startsWith(path);
  };

  // Navigation links stored here once
  const navLinks = [
    { name: "Our Founder", path: "/founder/biography" },
    { name: "Who We Are", path: "/about" },
    { name: "What We Do", path: "/programs" },
    { name: "Press Room", path: "/press" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1764223037/AKF_logo_1_zsspqo.png"
              alt="AKF logo"
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-between">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`font-bold  px-3 py-2 rounded transition-colors ${
                    isActivePath(link.path)
                      ? "text-orange-500"
                      : "text-foreground"
                  } hover:text-orange-500`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <Button asChild className="bg-secondary hover:bg-transparent hover:text-secondary border border-secondary">
              <Link to="/join-the-mission">Join the Mission</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="bg-card border-t border-border lg:hidden">
          <div className="container mx-auto px-4 py-6 space-y-2 flex flex-col">
            <Link
              to="/"
              className="py-2 font-bold hover:text-secondary"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="py-2 font-bold hover:text-secondary"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
              <Link to="/join-the-mission" onClick={() => setMobileMenuOpen(false)}>
                Join the Mission
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
