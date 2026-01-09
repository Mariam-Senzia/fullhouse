import { FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Container from "../global/container";

const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-300 py-12 md:py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div>
            <div className="mb-4">
              <img
                src="/logo.png"
                alt="FullHouse logo"
                className="h-10 md:h-14 "
              />
            </div>
            <p className="text-gray-400  leading-relaxed">
              Discover and book amazing events across Kenya. From concerts to
              conferences, find experiences that matter to you.
            </p>
          </div>

          <div className="md:flex md:flex-col md:items-center">
            <h3 className="text-white font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#cc4324] transition-colors duration-200"
                >
                  Find Events
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-[#cc4324] transition-colors duration-200"
                >
                  Create Events
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:flex lg:flex-col lg:items-center">
            <h3 className="text-white font-semibold text-lg mb-4 ">
              Contact Information
            </h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <FaPhone className="text-gray-400 mt-1" />
                <div>
                  <a
                    href="tel:+254712345678"
                    className="text-gray-400 hover:text-[#cc4324] transition-colors duration-200"
                  >
                    +254 712 345 678
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <FaMapMarkerAlt className="text-gray-400 mt-1" />
                <div>
                  <span className="text-gray-400">Nairobi, Kenya</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-gray-800">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()} FullHouse. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
