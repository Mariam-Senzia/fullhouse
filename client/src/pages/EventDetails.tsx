import { useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import Navbar from "../components/home/Navbar";
import { useParams } from "react-router-dom";
import useEvents from "../components/hooks/useEvents";

const EventDetailsPage = () => {
  const events = useEvents();
  const [quantity, setQuantity] = useState(0);

  const { title } = useParams();

  const event = events.find((e) => e.title === title);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));
  const subtotal = quantity * event.ticket.price;

  const handleCart = () => {
    if (quantity === 0) {
      alert("Please select at least one ticket before proceeding.");
      return;
    }

    console.log("Proceeding to cart...");
  };

  const handleCheckout = () => {
    if (quantity === 0) {
      alert("Please select a ticket");
      return;
    }

    console.log("Proceeding to checkout...");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="space-y-8 flex-2">
              <div className="rounded overflow-hidden shadow-lg aspect-4/3">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2 relative inline-block">
                  ABOUT
                  <div className="absolute -bottom-1 left-0 w-16 h-1 bg-[#cc4324]"></div>
                </h2>
                <p className="text-gray-700 leading-relaxed mt-4">
                  {event.description}
                </p>
              </div>
            </div>

            <div className="space-y-6 flex-3 lg:pl-16">
              <div className="flex gap-4 items-center">
                <div className="inline-block bg-[#cc4324] rounded p-4 text-center min-w-15">
                  <div className="text-sm font-semibold text-white">
                    {event.date}
                  </div>
                  <div className="text-xl font-bold text-white">
                    {event.day}
                  </div>
                  <div className="text-sm font-medium text-white">
                    {/* {event.} */}
                  </div>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold text-gray-900 leading-tight">
                  {event.title}
                </h1>
              </div>

              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-3">
                  <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                  <span className="text-blue-600 hover:underline cursor-pointer">
                    {event.location}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-gray-400 shrink-0" />
                  <span>{event.dateRange}</span>
                </div>
                <div className="flex items-center gap-3">
                  <FaClock className="text-gray-400 shrink-0" />
                  <span>{event.time}</span>
                </div>
              </div>

              <div className="pt-10">
                <h3 className="text-xl font-semibold mb-4 relative inline-block">
                  TICKET AVAILABLE
                  <div className="absolute -bottom-1 left-0 w-20 h-1 bg-[#cc4324]"></div>
                </h3>

                <div className="bg-white border border-gray-200 rounded p-6 mt-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className=" text-gray-900">RSVP</h4>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        KES. {event.ticket.price.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 border border-gray-300 rounded">
                      <button
                        onClick={handleDecrement}
                        disabled={quantity === 0}
                        className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FaMinus className="text-sm text-gray-600" />
                      </button>
                      <span className="font-semibold text-lg min-w-7.5 text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={handleIncrement}
                        className="p-3 hover:bg-gray-100 transition-colors"
                      >
                        <FaPlus className="text-sm text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium">Valid from</p>
                    <p>
                      {event.ticket.validFrom} / Starts at{" "}
                      {event.ticket.startTime}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-200 mt-10">
                  <span className="font-semibold text-gray-700">SUBTOTAL</span>
                  <span className="font-bold text-xl text-gray-900">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                  <div className="relative inline-block lg:w-full">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    {/* <a href="#"> */}
                    <button
                      onClick={handleCart}
                      className="relative w-full h-full uppercase border border-[#cc4324] text-gray-600 bg-white px-16 py-3 rounded-sm font-semibold transition-all duration-300 hover:-translate-x-0.5 hover:translate-y-0.5 hover:text-[#cc4324] hover:border-red-600"
                    >
                      Add to Cart
                    </button>
                    {/* </a> */}
                  </div>

                  <div className="relative inline-block lg:w-full">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    {/* <a href="#"> */}
                    <button
                      onClick={handleCheckout}
                      className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                    >
                      Quick Buy
                    </button>
                    {/* </a> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsPage;
