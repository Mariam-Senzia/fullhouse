import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCalendar,
  FaMapMarkerAlt,
  FaTicketAlt,
} from "react-icons/fa";
import Navbar from "../components/home/Navbar";

interface Booking {
  booking_id: number;
  full_name: string;
  status: string;
  event: {
    title: string;
    event_date: string;
    location: string;
  };
}

const CheckIn = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`https://fullhouse-ktih.onrender.com/api/v1/booking/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message === "Booking not found") {
          setError(true);
        } else {
          setBooking(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, [id]);

  const isValid = booking?.status === "confirmed";

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <p className="text-gray-400 text-sm">Verifying ticket...</p>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="text-center">
            <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900">
              Ticket Not Found
            </h2>
            <p className="text-gray-400 text-sm mt-2">
              This ticket does not exist or is invalid.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-[#cc4324] text-sm font-medium"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div
            className={`rounded-sm p-6 text-center mb-6 ${
              isValid
                ? "bg-green-50 border border-green-200"
                : "bg-red-50 border border-red-200"
            }`}
          >
            {isValid ? (
              <>
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-3" />
                <h2 className="text-xl font-bold text-green-700">
                  Valid Ticket
                </h2>
                <p className="text-green-600 text-sm mt-1">
                  This ticket is confirmed and valid for entry.
                </p>
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-3" />
                <h2 className="text-xl font-bold text-red-700">
                  Invalid Ticket
                </h2>
                <p className="text-red-600 text-sm mt-1">
                  This ticket has not been confirmed.
                </p>
              </>
            )}
          </div>

          <div className="bg-white rounded-sm shadow-sm border border-gray-100  overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <p className="text-xs text-[#cc4324] font-bold uppercase tracking-widest">
                Fullhouse
              </p>
              <h3 className="text-lg font-bold text-gray-900 mt-1">
                {booking?.event.title}
              </h3>
            </div>

            <div className="px-6 py-4 space-y-4">
              <div className="flex items-center gap-3">
                <FaCalendar className="text-gray-400 text-sm flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Date
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking?.event.event_date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-gray-400 text-sm flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Location
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking?.event.location}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FaTicketAlt className="text-gray-400 text-sm flex-shrink-0" />
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">
                    Ticket Holder
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {booking?.full_name}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-dashed border-gray-200">
              <p className="text-xs text-gray-400 uppercase tracking-wide">
                Booking Reference
              </p>
              <p className="text-lg font-bold text-[#cc4324] mt-1">
                #{booking?.booking_id}
              </p>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-[#cc4324] transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckIn;
