import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { useState } from "react";
import Container from "../global/container";

const events = [
  {
    title: ["BRUNCH", "SING ALONG"],
    location: "CARNIVORE GROUNDS",
    date: "Feb 14, 2026",
    time: "12:00 PM - 1:00 AM",
    image: "/slide-1.jpg",
  },
  {
    title: ["SHINCITY", "SHOWMAN"],
    location: "NGONG RACECOURSE",
    date: "April 4, 2026",
    time: "3:00 PM - 12:00 AM",
    image: "/slide-2.jpeg",
  },
  {
    title: ["BACK TO", "THE ROOTS"],
    location: "NAISHOLA GARDENS",
    date: "Aug 1, 2026",
    time: "12:00 PM - 1:00 AM",
    image: "/slide-3.webp",
  },
];

const Hero = () => {
  const [slideKey, setSlideKey] = useState(0);

  return (
    <div className="relative h-[85vh] lg:h-[80vh] w-full">
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          nextEl: ".hero-next",
          prevEl: ".hero-prev",
        }}
        speed={1200}
        loop
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSlideChange={(swiper) => {
          setSlideKey(swiper.realIndex);
        }}
        className="h-full"
      >
        {events.map((event, index) => (
          <SwiperSlide key={index}>
            <div className="flex items-center h-full w-full">
              <div
                data-swiper-parallax="-10%"
                style={{ backgroundImage: `url('${event.image}')` }}
                className="absolute inset-0 bg-cover bg-center"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
              </div>

              <Container>
                <div
                  key={slideKey}
                  className="relative z-10 max-w-5xl text-white animate-fade-in"
                >
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-wide">
                    {event.title[0]}
                    <br />
                    {event.title[1]}
                  </h1>

                  <div className="flex flex-col gap-4 md:gap-6 mb-10 text-lg">
                    <div className="flex items-center gap-2">
                      <FaMapMarkerAlt />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaClock />
                      <span>{event.time}</span>
                    </div>
                  </div>

                  <div className="relative inline-block">
                    {/* <button className="absolute -left-1 -bottom-1 bg-gray-300 px-8 lg:px-10 py-3 rounded-sm shadow-md text-gray-800 pointer-events-none transition-all duration-200 group-hover:-left-2 group-hover:-bottom-2">
                      LEARN MORE
                    </button> */}

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
              </Container>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-6 right-6 z-20 hidden md:flex gap-4 text-white px-4 md:px-2 lg:pr-36">
        <button className="hero-prev flex items-center gap-2 hover:text-[#cc4324] transition-all duration-300 text-base uppercase tracking-widest font-medium group">
          <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span>Prev</span>
        </button>
        <button className="hero-next flex items-center gap-2 hover:text-[#cc4324] transition-all duration-300 text-base uppercase tracking-widest font-medium group">
          <span>Next</span>
          <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Mobile*/}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex md:hidden gap-4">
        <button className="hero-prev bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all">
          <FaChevronLeft className="text-lg" />
        </button>
        <button className="hero-next bg-white/20 backdrop-blur-sm p-3 rounded-full text-white hover:bg-white/30 transition-all">
          <FaChevronRight className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
