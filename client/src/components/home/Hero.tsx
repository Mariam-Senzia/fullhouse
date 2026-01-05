import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const Hero = () => {
  return (
    <div className="relative flex items-center h-[85vh] w-full">
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80')`,
        }}
        className="absolute inset-0 bg-cover"
      >
        <div className="absolute inset-0 bg-black/20 filter brightness-80"></div>
      </div>

      <div className="relative z-10 px-4 md:px-6 lg:px-16 max-w-5xl">
        <div className="text-white text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-wide">
          <h1>
            SUMMER
            <br />
            MUSIC FESTIVAL
          </h1>
        </div>

        <div className="flex flex-col gap-4 md:gap-6 mb-10 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-white text-lg" />
            <span className="text-white text-lg">Nairobi Stadium</span>
          </div>
          <div className="flex items-center gap-2">
            <FaCalendarAlt className="text-white text-lg" />
            <span className="text-white text-lg">July 15, 2026</span>
          </div>
          <div className="flex items-center gap-2">
            <FaClock className="text-white text-lg" />
            <span className="text-white text-lg">6:00 PM</span>
          </div>
        </div>

        <div className="relative inline-block">
          <button className="absolute -left-1 -bottom-1 bg-gray-200 px-8 py-2 rounded-sm shadow-md text-gray-800 pointer-events-none">
            LEARN MORE
          </button>

          <button className="relative bg-[#cc4324] px-8 py-2 rounded-sm text-white font-semibold shadow-lg hover:bg-[#b83a20] transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5">
            GET TICKETS
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
