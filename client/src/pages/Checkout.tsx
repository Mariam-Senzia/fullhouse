import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import Navbar from "../components/home/Navbar";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { subtotal } = location.state;

  const handlePhoneInput = () => {
    console.log("phone");
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-2xl mx-auto mb-6">
          <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium tracking-wide uppercase">
            <Link to="/cart" className="hover:text-[#cc4324] transition-colors">
              Cart
            </Link>
            <FaChevronRight className="text-[10px]" />
            <span className="text-gray-600">Information</span>
            <FaChevronRight className="text-[10px]" />
            <span className="text-gray-400">Payment Confirmation</span>
          </nav>
        </div>

        <div className="max-w-2xl mx-auto space-y-5">
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                Order Total
              </p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                KES {subtotal.toLocaleString()}
              </p>
            </div>
            <Link
              to={-1 as any}
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-[#cc4324] transition-colors font-medium"
            >
              <FaArrowLeft className="text-[10px]" />
              Continue Shopping
            </Link>
          </div>
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 space-y-5">
            <div>
              <h3 className="font-bold text-gray-900 text-base tracking-tight">
                Contact Information
              </h3>
            </div>

            <div className="relative">
              <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
              <input
                type="text"
                placeholder="Full name"
                className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-sm outline-none hover:border-gray-300 focus:ring-2 focus:ring-[#cc4324]/30 focus:border-[#cc4324] transition-all duration-200"
              />
            </div>

            <div className="w-full px-4 py-3 border border-gray-200 rounded-sm hover:border-gray-300 focus-within:ring-2 focus-within:ring-[#cc4324]/30 focus-within:border-[#cc4324] transition-all duration-200">
              <PhoneInput
                international
                defaultCountry="KE"
                countryCallingCodeEditable={false}
                placeholder="Phone number"
                onChange={handlePhoneInput}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-100 rounded-sm outline-none hover:border-gray-300 focus:ring-2 focus:ring-[#cc4324]/30 focus:border-[#cc4324] transition-all duration-200"
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                <input
                  type="email"
                  placeholder="Confirm email"
                  className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-gray-200 rounded-sm outline-none hover:border-gray-300 focus:ring-2 focus:ring-[#cc4324]/30 focus:border-[#cc4324] transition-all duration-200"
                />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-sm shadow-sm border border-gray-100 p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-900 text-base tracking-tight">
                  Payment
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Secured by PesaPal
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {["M-PESA", "Visa", "Mastercard", "Airtel Money"].map(
                (method) => (
                  <span
                    key={method}
                    className="text-xs font-medium bg-gray-100 text-gray-600 px-3 py-1.5 rounded-sm border border-gray-200"
                  >
                    {method}
                  </span>
                )
              )}
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-sm p-4">
              <p className="font-semibold text-sm text-blue-700 mb-1">
                How it works
              </p>
              <p className="text-xs text-blue-600 leading-relaxed">
                After clicking <strong>Complete Payment</strong>, you'll be
                redirected to PesaPal's secure page where you can pay via
                M-PESA, credit/debit card, or mobile money. Your ticket will be
                emailed once payment is confirmed.
              </p>
            </div>
          </div>

          <div className="relative inline-block w-full">
            <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

            <button
              onClick={() => navigate("/order-confirmation")}
              className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
