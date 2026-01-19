import { FaCartShopping, FaRegRectangleXmark } from "react-icons/fa6";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
};

const CartDrawer = ({ open, onClose }: CartDrawerProps) => {
  return (
    <>
      <div
        className={`fixed top-0 right-0 h-full w-md bg-white z-50 shadow-lg
        transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          <h2 className=" text-lg">Your Cart</h2>
          <button onClick={onClose}>
            <FaRegRectangleXmark className="text-xl" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-2">
          <FaCartShopping className="text-4xl opacity-40" />
          <p>Your cart is empty</p>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;
