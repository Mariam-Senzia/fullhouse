import { useEffect, useState } from "react";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import Navbar from "../components/home/Navbar";
import { useNavigate, useParams } from "react-router-dom";
import type { Event } from "../components/global/types/EventType";
import useStore from "../store/useStore";

const EventDetailsPage = () => {
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(0);
  const { addToCart, setIsCartOpen } = useStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/v1/eventdetail/${id}`)
      .then((resp) => resp.json())
      .then((data) => setEvent(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!event) {
    return <div>Loading event...</div>;
  }

  const numericPrice = parseFloat(event.price.replace(/,/g, ""));
  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));
  const subtotal = quantity * numericPrice;

  const handleCart = () => {
    if (quantity === 0) {
      alert("Please select at least one ticket before proceeding.");
      return;
    }
    addToCart({
      eventId: event.id,
      title: event.title,
      price: numericPrice,
      quantity: quantity,
      subtotal: subtotal,
      image_url: event.image_url,
      date: event.date,
    });
    setIsCartOpen(true);
    setTimeout(() => setIsCartOpen(false), 3000);
  };

  const handleCheckout = () => {
    if (quantity === 0) {
      alert("Please select a ticket");
      return;
    }

    navigate("/checkout", {
      state: { subtotal, id },
    });
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 md:py-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="space-y-8 flex-2">
              <div className="rounded-sm overflow-hidden shadow-lg aspect-4/3">
                <img
                  src={event.image_url}
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
                <div className="inline-block border border-gray-300 bg-white rounded-sm p-4 text-center min-w-15">
                  <div className="text-sm text-[#cc4324] font-semibold ">
                    {event.day}
                  </div>
                  <div className="text-xl font-bold ">
                    {event.date.split(" ")[1]}
                  </div>
                  <div className="text-sm font-semibold ">
                    {" "}
                    {event.date.split(" ")[0]}
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
                  <span>
                    {new Date(event.full_date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
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

                <div className="bg-white border border-gray-300 rounded-sm p-6 mt-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className=" text-gray-900">RSVP</h4>
                      <p className="text-2xl font-bold text-gray-900 mt-1">
                        KES. {numericPrice.toLocaleString()}
                      </p>
                    </div>

                    <div className="flex items-center sm:gap-3 border border-gray-300 rounded-sm">
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
                    <p className="font-medium">Valid on</p>
                    <p>
                      {new Date(event.full_date).toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-b border-gray-200 mt-10">
                  <span className="font-semibold text-gray-700">SUBTOTAL</span>
                  <span className="font-bold text-xl text-gray-900">
                    KES {subtotal.toLocaleString()}
                  </span>
                </div>

                <div className="grid  sm:grid-cols-2 gap-4 mt-12">
                  <div className="relative inline-block lg:w-full">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    <button
                      onClick={handleCart}
                      className="relative w-full h-full uppercase border border-[#cc4324] text-gray-600 bg-white px-16 py-3 rounded-sm font-semibold transition-all duration-300 hover:-translate-x-0.5 hover:translate-y-0.5 hover:text-[#cc4324] hover:border-red-600"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="relative inline-block lg:w-full">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    <button
                      onClick={handleCheckout}
                      className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                    >
                      Quick Buy
                    </button>
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
