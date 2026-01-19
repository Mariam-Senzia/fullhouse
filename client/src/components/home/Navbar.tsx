import {
  FaBars,
  FaCartShopping,
  FaChevronDown,
  FaRegRectangleXmark,
  FaStore,
  FaUser,
} from "react-icons/fa6";
import Search from "./Search";
import { useEffect, useRef, useState } from "react";
import Container from "../global/container";
import CartDrawer from "./CartDrawer";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loginMenu, setLoginMenu] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const desktopMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        desktopMenuRef.current &&
        !desktopMenuRef.current.contains(event.target as Node)
      ) {
        setLoginMenu(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="bg-white w-full py-2 sticky top-0 z-50 shadow-sm">
        <Container>
          <div className="flex justify-between items-center">
            <div className="flex items-center md:gap-4 lg:gap-8">
              <div>
                <a href="/">
                  <img
                    src="/logo.png"
                    alt="fullhouse logo"
                    className="h-10 md:h-10 lg:h-13"
                  />
                </a>
              </div>

              <Search />
            </div>

            <div className="hidden md:flex items-center gap-8">
              {/* <a
                href="/createEvents"
                className="transition-transform hover:text-[#cc4324] duration-300"
              >
                Create Events
              </a>  */}

              <div ref={desktopMenuRef} className="relative">
                <button
                  className="transition-transform hover:text-[#cc4324] duration-300 flex items-center gap-2"
                  onClick={() => setLoginMenu(!loginMenu)}
                >
                  Login
                  <span>
                    <FaChevronDown className="w-3 h-3" />
                  </span>
                </button>

                {loginMenu && (
                  <div
                    className={
                      "sm:hidden md:block border-t border-gray-200 absolute top-11 -right-18 z-50 w-70 overflow-hidden transition-all duration-300 rounded shadow-sm"
                    }
                  >
                    <div className="px-5 pb-8 pt-4 space-y-8 bg-gray-50">
                      <div className="group flex items-center border-b border-gray-300 pb-5 gap-2">
                        <FaUser className="text-md group-hover:text-[#cc4324] transition-transform duration-300" />
                        <a
                          href="/buyerLogin"
                          onClick={() => setIsMenuOpen(false)}
                          className="block transition-transform group-hover:text-[#cc4324] duration-300"
                        >
                          Buyer Login
                        </a>
                      </div>
                      <div className="group flex items-center gap-2">
                        <FaStore className="text-md group-hover:text-[#cc4324] transition-transform duration-300" />
                        <a
                          href="/merchantLogin"
                          onClick={() => setIsMenuOpen(false)}
                          target="_blank"
                          className="block transition-transform group-hover:text-[#cc4324] duration-300"
                        >
                          Merchant Login
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                className="relative flex items-center justify-center pr-5"
                onClick={() => setIsCartOpen(true)}
              >
                <FaCartShopping className="text-gray-700 text-lg" />
                <span className="absolute -right-0.5 md:-right-1 bg-[#cc4324] rounded-full text-white text-sm h-4.5 w-4.5 flex items-center justify-center font-semibold">
                  0
                </span>
              </button>

              <CartDrawer
                open={isCartOpen}
                onClose={() => setIsCartOpen(false)}
              />
            </div>

            {/* mobile */}
            <div className="block md:hidden">
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

              <div
                className={`md:hidden border-t border-gray-200 fixed top-13 left-0 right-0 z-50 w-full overflow-hidden transition-all duration-300 ${
                  isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-5 py-8 space-y-8 bg-gray-50">
                  <div className="group flex items-center border-b border-gray-300 pb-5 gap-2">
                    <FaUser className="text-md group-hover:text-[#cc4324] transition-transform duration-300" />
                    <a
                      href="/buyerLogin"
                      className="block transition-transform group-hover:text-[#cc4324] duration-300"
                    >
                      Buyer Login
                    </a>
                  </div>
                  <div className="group flex items-center gap-2">
                    <FaStore className="text-md group-hover:text-[#cc4324] transition-transform duration-300" />
                    <a
                      href="/merchantLogin"
                      target="_blank"
                      className="block transition-transform group-hover:text-[#cc4324] duration-300"
                    >
                      Merchant Login
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </nav>
    </>
  );
};

export default Navbar;
