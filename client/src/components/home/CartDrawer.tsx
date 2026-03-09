import {
  FaCartShopping,
  FaMinus,
  FaPlus,
  FaRegRectangleXmark,
  FaTrash,
} from "react-icons/fa6";
import useStore from "../../store/useStore";
import { useNavigate } from "react-router-dom";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  const { cartItems, updateQuantity, setIsCartOpen, removeFromCart } =
    useStore();
  const total = cartItems
    .reduce((acc, item) => acc + item.subtotal, 0)
    .toLocaleString();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout", {
      state: { subtotal: total },
    });
    setIsCartOpen(false);
  };

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-md bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className=" text-lg">Your Cart ({cartItems.length})</h2>
          <button onClick={onClose}>
            <FaRegRectangleXmark className="text-xl" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
            <FaCartShopping className="text-4xl opacity-40" />
            <p>Your cart is empty</p>
          </div>
        ) : (
          <div
            className="flex flex-col"
            style={{ height: "calc(100% - 57px)" }}
          >
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.eventId}
                  className="bg-white border border-gray-300 rounded-sm p-4 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-sm shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-gray-900 text-sm">
                          {item.title}
                        </h3>
                        <button
                          onClick={() => removeFromCart(item.eventId)}
                          className="text-gray-400 hover:text-[#cc4324] transition-colors"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.date}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-sm">
                          <button
                            onClick={() =>
                              item.quantity > 1 &&
                              updateQuantity(item.eventId, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <FaMinus className="text-xs text-gray-600" />
                          </button>
                          <span className="text-sm font-semibold min-w-5 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.eventId, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-gray-100 transition-colors"
                          >
                            <FaPlus className="text-xs text-gray-600" />
                          </button>
                        </div>
                        <p className="text-sm font-bold text-gray-900">
                          KES {item.subtotal.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 pt-4 pb-6 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-semibold text-gray-700">TOTAL</span>
                <span className="font-bold text-gray-900">KES {total}</span>
              </div>
              <div className="relative inline-block lg:w-full">
                <div className="absolute -left-1 -bottom-1 w-full h-full border border-[#cc4324] bg-gray-100 rounded-sm pointer-events-none" />

                <button
                  onClick={handleCheckout}
                  className="relative w-full h-full uppercase  text-white  bg-[#cc4324] px-16 py-3 rounded-sm font-semibold shadow-lg transition-transform duration-300 hover:translate-y-0.5 hover:-translate-x-0.5"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
