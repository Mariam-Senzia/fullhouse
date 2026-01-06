import { FaChevronDown } from "react-icons/fa6";
import Container from "../global/container";

const EventListing = () => {
  return (
    <>
      <Container>
        <div className=" pt-6 md:pt-8 lg:pt-10 pb-2">
          <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900">
            Events near you
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-6 md:items-end mb-6 py-4 px-6 bg-white rounded-sm shadow-sm border border-gray-200">
          <div className=" w-full">
            <label className="text-sm font-medium text-gray-500 uppercase">
              Event Type
            </label>
            <div className="relative pt-1">
              <select className="w-full px-4 py-3 border border-gray-300 rounded-sm appearance-none focus:outline-none cursor-pointer">
                <option value="all" className="text-white">
                  All Events
                </option>
                <option value="music">Music</option>
                <option value="business">Business</option>
                <option value="wellness">Wellness</option>
                <option value="entertainment">Entertainment</option>
                <option value="education">Education</option>
              </select>
              <FaChevronDown className="absolute text-sm right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className=" w-full">
            <label className="text-sm font-medium text-gray-500 mb-2 uppercase">
              Sort By
            </label>
            <div className="relative pt-1">
              <select className=" w-full px-4 py-3 border border-gray-300 rounded-sm appearance-none focus:outline-none cursor-pointer">
                <option value="upcoming">Upcoming</option>
                <option value="date-asc">Date (Earliest First)</option>
                <option value="date-desc">Date (Latest First)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="popular">Most Popular</option>
              </select>
              <FaChevronDown className="absolute text-sm right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>

          <div className="relative inline-block w-50">
            <button className="absolute -left-1 -bottom-1 bg-gray-300 px-16 py-3 rounded-sm shadow-md text-gray-800 pointer-events-none transition-all duration-200 group-hover:-left-2 group-hover:-bottom-2">
              LEARN
            </button>

            <a href="#">
              <button
                className="relative uppercase text-white bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg 
                transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
              >
                Filter
              </button>
            </a>
          </div>
        </div>
      </Container>
    </>
  );
};

export default EventListing;
