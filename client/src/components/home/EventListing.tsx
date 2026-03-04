import { FaCalendar, FaChevronDown } from "react-icons/fa6";
import Container from "../global/container";
import { FaMapMarkerAlt } from "react-icons/fa";
import useEvents from "../hooks/useEvents";
import { useEffect, useState } from "react";

type Event = {
  id: number;
  title: string;
  description: string;
  date: string;
  day: string;
  time: string;
  location: string;
  price: string;
  image_url: string;
  category: {
    id: number;
    name: string;
  };
};

const EventListing = () => {
  // const events = useEvents();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/publicEvents")
      .then((resp) => resp.json())
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div id="events">
        <Container>
          <div className=" pt-6 md:pt-8 lg:pt-10 pb-2">
            <h2 className="text-xl md:text-2xl lg:text-2xl font-semibold text-gray-900">
              Events near you
            </h2>
          </div>

          <div className="flex flex-col md:flex-row gap-6 md:items-end mb-8 py-4 px-6 bg-white rounded-sm shadow-sm border border-gray-200">
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

            <div className="w-full">
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

            <div className="relative inline-block lg:w-50">
              <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

              <a href="#">
                <button
                  className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg 
                transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                >
                  Filter
                </button>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
            {/* {events.slice(3).map((event) => ( */}
            {events.map((event) => (
              <a href={`/eventDetails/${event.title}`} key={event.id}>
                <div className="group bg-white rounded-sm overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer">
                  <div className="relative h-64 md:h-72 overflow-hidden">
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white rounded-sm shadow-sm overflow-hidden group-hover:hidden">
                      <div className="bg-[#cc4324] text-white text-center px-3 py-1">
                        <span className="text-xs font-semibold uppercase">
                          {event.day}
                        </span>
                      </div>
                      <div className="px-3 py-2 text-center">
                        <div className="text-2xl font-bold text-gray-900">
                          {event.date.split(" ")[1]}
                        </div>
                        <div className="text-xs text-gray-600 uppercase">
                          {event.date.split(" ")[0]}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-[#cc4324] transition-colors">
                      {event.title}
                    </h3>

                    <div className="flex flex-col gap-2 mb-4 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <FaCalendar className="text-gray-400" />
                        <span className="text-gray-500">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-gray-500">{event.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <span className="text-xs text-gray-500 uppercase">
                          From
                        </span>
                        <p className="text-lg font-bold text-gray-900">
                          {event.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="flex justify-center my-12">
            <div className="relative inline-block">
              <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

              <a href="#">
                <button className="relative uppercase border border-[#cc4324] text-gray-600 bg-white px-16 py-3 rounded-sm font-semibold transition-all duration-300 hover:-translate-x-0.5 hover:translate-y-0.5 hover:text-[#cc4324] hover:border-red-600">
                  Load more events
                </button>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default EventListing;
