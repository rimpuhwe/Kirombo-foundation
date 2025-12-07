import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="https://res.cloudinary.com/dcgmi6w24/image/upload/v1764227923/logo_fbe3pg.png"
                alt="Abdallah Kiromba Foundation Logo"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-tight text-orange-500">
                  Abdallah Kiromba Foundation
                </span>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Honoring Abdallah Kiromba's legacy through sustainable community
              initiatives
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=61573925694268"
                target="_blank"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://x.com/AbdallahKiromba"
                target="_blank"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-secondary transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about#vision-mission-values"
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  Vision, Mission & Values
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  Our Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/about#board"
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                 Meet Our Team
                </Link>
              </li>
              <li>
                <Link
                  to="/press"
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  News & Latest Updates
                </Link>
              </li>
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/join-the-mission"
                  className="text-gray-300 hover:text-secondary transition-colors text-sm"
                >
                  Support Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin
                  size={18}
                  className="text-secondary mt-1 flex-shrink-0"
                />
                <span className="text-gray-300 text-sm">Kigali , Rwanda</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+250 788 304 820</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={18} className="text-secondary flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  abdallahkirombafoundation@gmail.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Abdallah Kiromba Foundation. All
              rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-gray-400 hover:text-secondary transition-colors text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-gray-400 hover:text-secondary transition-colors text-sm"
              >
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
