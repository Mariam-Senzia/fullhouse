import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Container from "../components/global/container";

const BuyerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="min-h-screen relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40"></div>
      </div>

      <Container>
        <div className="min-h-screen flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          <div className="flex-2 text-white relative md:z-10">
            <div className="max-w-3xl">
              <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-5xl mb-4 md:mb-6">
                LABDI LIVE IN CONCERT
              </h1>
              <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed opacity-90">
                Step into an intimate evening of sound and story as Labdi takes
                the stage for her first solo show. A celebration of voice,
                Orutu, and living Kenyan sound— rooted in tradition, shaped by
                the present. Come listen, feel, and witness the beginning.
              </p>
              <div className="relative inline-block">
                <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                <a href="#">
                  <button
                    className="relative bg-[#cc4324] px-8 lg:px-10 py-3 rounded-sm font-semibold shadow-lg 
                      transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                  >
                    GET TICKETS
                  </button>
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-1 justify-center lg:justify-end">
            <div className="w-full max-w-md">
              <div className="bg-white rounded shadow-sm p-6 md:p-8 lg:p-10 relative">
                {/* <div className="mb-6">
                  <a href="/">
                    <img
                      src="/logo.png"
                      alt="fullhouse logo"
                      className="h-10 md:h-10 lg:h-10"
                    />
                  </a>
                </div> */}

                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <FaUser className="text-gray-700" />
                    <h2 className="text-2xl text-gray-900">Buyer Log In</h2>
                  </div>
                  <p className="text-sm text-gray-600">
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-[#cc4324] hover:underline font-medium"
                    >
                      Sign Up
                    </a>{" "}
                    instead.
                  </p>
                </div>

                <div className="space-y-4 border-b border-gray-200 border-t py-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent transition-all pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <FaEyeSlash className="text-lg" />
                        ) : (
                          <FaEye className="text-lg" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="relative inline-block">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    <a href="#">
                      <button
                        className="relative w-92 text-white uppercase bg-[#cc4324] px-8 lg:px-10 py-3 rounded-sm font-semibold shadow-lg 
                      transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                      >
                        Login
                      </button>
                    </a>
                  </div>

                  <div className="text-center">
                    <a
                      href="#"
                      className="text-sm text-gray-600 hover:text-[#cc4324] hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By login in to your account, you agree to our{" "}
                    <span className="text-gray-700">Terms and Conditions</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BuyerLogin;
