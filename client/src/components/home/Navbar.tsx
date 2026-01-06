import { FaBars, FaCartShopping, FaRegRectangleXmark } from "react-icons/fa6";
import Search from "./Search";
import { useState } from "react";
import Container from "../global/container";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <Container>
        <nav className="bg-white w-full py-2 shadow-sm">
          <div className="flex justify-between items-center">
            <div className="flex items-center md:gap-4 lg:gap-8">
              <div>
                <img
                  src="/logo.png"
                  alt="fullhouse logo"
                  className="h-10 md:h-10 lg:h-13"
                />
              </div>

              <Search />
            </div>

            <div className="hidden md:flex items-center gap-8">
              <a
                href=""
                className="transition-transform hover:-translate-y-0.5 hover:text-[#cc4324] duration-300"
              >
                Find Events
              </a>
              <a
                href=""
                className="transition-transform hover:-translate-y-0.5 hover:text-[#cc4324] duration-300"
              >
                Create Events
              </a>
              <button className="">Login</button>
              <button className="relative flex items-center justify-center pr-5">
                <FaCartShopping className="text-gray-700 text-lg" />
                <span className="absolute -right-0.5 md:-right-1 bg-[#cc4324] rounded-full text-white text-sm h-4.5 w-4.5 flex items-center justify-center font-semibold">
                  0
                </span>
              </button>
            </div>

            <div className="block md:hidden">
              <button
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <FaRegRectangleXmark className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </Container>

      {/* mobile */}
      <div
        className={`md:hidden border-t border-gray-200 absolute z-50 w-100 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 py-8 space-y-8 bg-gray-50">
          <a
            href=""
            className="block transition-transform hover:-translate-y-0.5 hover:text-[#cc4324] duration-300"
          >
            Find Events
          </a>
          <a
            href=""
            className="block transition-transform hover:-translate-y-0.5 hover:text-[#cc4324] duration-300"
          >
            Create Events
          </a>
          <button className="">Login</button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
