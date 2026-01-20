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

const events = [
  {
    id: 1,
    title: "Jazz Night Live",
    subtitle: "Evening Concert",
    image:
      "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/jazz-night-flyer-template-design-de270da6f93bb0d4cab657f9572a765f_screen.jpg?ts=1636991643",
    location: "Alliance Française",
    date: "Jan 10",
    day: "Fri",
    price: "KES 1,500",
    category: "Music",

    dateRange: "Fri, Jan 10, 2026",
    time: "07:00 PM - 11:00 PM",
    description:
      "An intimate live jazz experience featuring local and international artists. Enjoy smooth sounds, great ambiance, and curated performances.",
    ticket: {
      price: 1500,
      validFrom: "Fri, Jan 10, 2026",
      startTime: "07:00 PM",
    },
  },

  {
    id: 2,
    title: "Kunye",
    subtitle: "Sound Healing Journey",
    image:
      "https://egotickets-core-cdn.s3.eu-north-1.amazonaws.com/production/uploads/event/banner_photo/51436/mobile_33a7939eb00df892.jpg",
    location: "Nairobi",
    date: "Feb 01",
    day: "Sat",
    price: "KES 2,500",
    category: "Wellness",

    dateRange: "Sat, Feb 01, 2026",
    time: "06:00 PM - 09:00 PM",
    description:
      "A guided sound healing experience combining music, meditation, and mindfulness to restore balance and clarity.",
    ticket: {
      price: 2500,
      validFrom: "Sat, Feb 01, 2026",
      startTime: "06:00 PM",
    },
  },

  {
    id: 3,
    title: "Startup Pitch Night",
    subtitle: "Networking Event",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80",
    location: "iHub Nairobi",
    date: "Jan 15",
    day: "Wed",
    price: "KES 500",
    category: "Business",

    dateRange: "Wed, Jan 15, 2026",
    time: "05:30 PM - 09:00 PM",
    description:
      "An evening for founders and innovators to pitch ideas, connect with investors, and network with the startup community.",
    ticket: {
      price: 500,
      validFrom: "Wed, Jan 15, 2026",
      startTime: "05:30 PM",
    },
  },

  {
    id: 4,
    title: "Mombasa Rooftop Cinema",
    subtitle: "Movie Under The Stars",
    image:
      "https://img.freepik.com/premium-psd/tropic-beach-party-event-flyer-design_802174-300.jpg",
    location: "City Mall Nyali",
    date: "Dec 17",
    day: "Wed",
    price: "KES 1,000",
    category: "Entertainment",

    dateRange: "Wed, Dec 17, 2025",
    time: "08:00 PM - 11:00 PM",
    description:
      "Enjoy classic and modern films in an open-air rooftop setting with breathtaking coastal views.",
    ticket: {
      price: 1000,
      validFrom: "Wed, Dec 17, 2025",
      startTime: "08:00 PM",
    },
  },

  {
    id: 5,
    title: "Mindfulness Retreat",
    subtitle: "Weekend Getaway",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
    location: "Naivasha",
    date: "Jan 03",
    day: "Sat",
    price: "KES 8,500",
    category: "Wellness",

    dateRange: "Sat, Jan 03 - Sun, Jan 04, 2026",
    time: "All Day",
    description:
      "A peaceful weekend retreat focused on mindfulness, meditation, and relaxation in a serene natural setting.",
    ticket: {
      price: 8500,
      validFrom: "Sat, Jan 03, 2026",
      startTime: "08:00 AM",
    },
  },

  {
    id: 6,
    title: "How to Build a Library",
    subtitle: "Educational Workshop",
    image:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&q=80",
    location: "KICC Grounds",
    date: "Dec 01",
    day: "Mon",
    price: "Free",
    category: "Education",

    dateRange: "Mon, Dec 01, 2025",
    time: "10:00 AM - 02:00 PM",
    description:
      "A free educational workshop covering how to design, organize, and manage modern libraries for communities and institutions.",
    ticket: {
      price: 0,
      validFrom: "Mon, Dec 01, 2025",
      startTime: "10:00 AM",
    },
  },
];

const EventDetailsPage = () => {
  const [quantity, setQuantity] = useState(0);

  const { title } = useParams();

  const event = events.find((e) => e.title === title);

  if (!event) {
    return <div>Event not found</div>;
  }

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => Math.max(0, prev - 1));
  const subtotal = quantity * event.ticket.price;

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

                    <a href="#">
                      <button className="relative w-full h-full uppercase border border-[#cc4324] text-gray-600 bg-white px-16 py-3 rounded-sm font-semibold transition-all duration-300 hover:-translate-x-0.5 hover:translate-y-0.5 hover:text-[#cc4324] hover:border-red-600">
                        Add to Cart
                      </button>
                    </a>
                  </div>

                  <div className="relative inline-block lg:w-full">
                    <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                    <a href="#">
                      <button className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5">
                        Filter
                      </button>
                    </a>
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
