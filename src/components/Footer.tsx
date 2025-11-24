import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">AKF</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base leading-tight">Abdallah Kiromba</span>
                <span className="text-sm text-gray-300 leading-tight">Foundation</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Supporting communities and transforming lives through sustainable development programs across East Africa.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-secondary transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about/vision-mission" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Vision & Mission
                </Link>
              </li>
              <li>
                <Link to="/programs" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Our Programs
                </Link>
              </li>
              <li>
                <Link to="/impact" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link to="/about/team" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Our Team
                </Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  News & Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/donate" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Make a Donation
                </Link>
              </li>
              <li>
                <Link to="/volunteer" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Volunteer
                </Link>
              </li>
              <li>
                <Link to="/about/partners" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link to="/founder/speeches" className="text-gray-300 hover:text-secondary transition-colors text-sm">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-secondary mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  Plot 123, Kampala Road<br />
                  Kampala, Uganda
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+256 700 123 456</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@akfoundation.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Abdallah Kiromba Foundation. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
