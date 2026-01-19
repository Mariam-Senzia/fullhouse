import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import Container from "../components/global/container";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import PhoneInput from "react-phone-number-input";

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

const BuyerSignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePhoneInput = () => {
    console.log("phone");
  };

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

                <div className="lg:flex-2 flex items-center justify-center w-full">
                  <div className="w-full max-w-2xl">
                    <div className="bg-white rounded shadow-sm p-6 md:p-8 lg:p-10 relative">
                      <div className="mb-6">
                        <div className="flex items-center gap-3 mb-2">
                          <FaUser className="text-gray-700 text-lg" />
                          <h2 className="text-2xl text-gray-800 font-medium">
                            Buyer Sign Up
                          </h2>
                        </div>
                        <p className="text-sm text-gray-600">
                          Already have an account?{" "}
                          <a
                            href="/buyerLogin"
                            className="text-[#cc4324] underline font-medium"
                          >
                            Login
                          </a>{" "}
                        </p>
                      </div>

                      <div className="space-y-4  border-gray-200 border-t py-6">
                        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Name
                            </label>
                            <input
                              type="text"
                              placeholder="full name"
                              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-transparent transition-all"
                            />
                          </div>

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

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number
                            </label>
                            <div className="w-full px-4 py-3 border border-gray-300 rounded focus-within:ring-1 focus-within:ring-gray-300 transition-all">
                              <PhoneInput
                                international
                                defaultCountry="KE"
                                countryCallingCodeEditable={false}
                                placeholder="Phone number"
                                onChange={handlePhoneInput}
                              />
                            </div>
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
                          </div>
                        </div>

                        <div className="relative inline-block w-full">
                          <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                          <a href="#">
                            <button className="relative w-full  text-white uppercase bg-[#cc4324] px-8 lg:px-10 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5">
                              Sign Up
                            </button>
                          </a>
                        </div>
                      </div>

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

export default BuyerSignUp;
