import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Container from "../components/global/container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";

const events = [
  {
    title: "LABDI LIVE IN CONCERT",
    description:
      "Step into an intimate evening of sound and story as Labdi takes the stage for her first solo show. A celebration of voice, Orutu, and living Kenyan sound— rooted in tradition, shaped by the present.",
    image:
      "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=1920&q=80",
  },
  {
    title: "JAZZ UNDER THE STARS",
    description:
      "Experience an unforgettable evening of smooth jazz and soulful melodies under the African sky. World-class musicians bring you a night of pure musical magic.",
    image:
      "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=1920&q=80",
  },
  {
    title: "AFROBEATS FESTIVAL",
    description:
      "Dance the night away to the hottest Afrobeats sounds from across the continent. A celebration of rhythm, culture, and pure energy.",
    image:
      "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80",
  },
];

const BuyerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="min-h-screen relative">
      <Swiper
        modules={[EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        speed={1200}
        onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
        className="absolute inset-0"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${event.image}')` }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/50 to-black/40"></div>
            </div>

            <Container>
              <div className="min-h-screen flex items-center justify-center lg:flex-row lg:items-center gap-8 lg:gap-12">
                <div className="hidden lg:block lg:flex-2 text-white relative md:z-10">
                  <div className="max-w-3xl">
                    <h1 className="text-white text-3xl md:text-4xl lg:text-5xl xl:text-5xl mb-4 md:mb-6">
                      {event?.title}
                    </h1>
                    <p className="text-base md:text-lg mb-6 md:mb-8 leading-relaxed opacity-90">
                      {event?.description}
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

                <div className="lg:flex-1 flex items-center justify-center w-full">
                  <div className="w-full max-w-md ">
                    <div className="bg-white rounded shadow-sm p-6 md:p-8 lg:p-10 relative">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <FaUser className="text-gray-700 text-lg" />
                          <h2 className="text-2xl text-gray-800 font-medium">
                            Buyer Log In
                          </h2>
                        </div>
                        <p className="text-sm text-gray-600">
                          Don't have an account?{" "}
                          <a
                            href="/buyerSignUp"
                            className="text-[#cc4324] underline font-medium"
                          >
                            Sign Up
                          </a>{" "}
                        </p>
                      </div>

                      <div className="space-y-4  border-gray-200 border-t py-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            placeholder="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent transition-all"
                          />
                        </div>

                        <div className="mb-6">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="password"
                              className="w-full mb-2 px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent transition-all pr-12"
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

                          <div className="">
                            <a
                              href="#"
                              className="text-sm text-gray-600 hover:text-[#cc4324] hover:underline"
                            >
                              Forgot your password?
                            </a>
                          </div>
                        </div>

                        <div className="relative inline-block w-full">
                          <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                          <a href="#">
                            <button className="relative w-full  text-white uppercase bg-[#cc4324] px-8 lg:px-10 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5">
                              Login
                            </button>
                          </a>
                        </div>
                      </div>

                      <div className="flex items-center pb-6">
                        <div className="grow border-t border-gray-300" />
                        <span className="px-3 text-sm text-gray-500">OR</span>
                        <div className="grow border-t border-gray-300" />
                      </div>

                      <button className="w-full flex justify-center items-center gap-3 border border-gray-300 rounded px-4 py-3  hover:bg-gray-50 hover:shadow-sm transition">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 48 48"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#EA4335"
                            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                          />
                          <path
                            fill="#4285F4"
                            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                          />
                          <path
                            fill="#34A853"
                            d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                          />
                        </svg>

                        <span className="text-sm font-medium text-gray-700">
                          Sign in with Google
                        </span>
                      </button>

                      {/* <div className="mt-6">
                  <p className="text-xs text-gray-500 text-center leading-relaxed">
                    By login in to your account, you agree to our{" "}
                    <span className="text-gray-700">Terms and Conditions</span>.
                  </p>
                </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BuyerLogin;
