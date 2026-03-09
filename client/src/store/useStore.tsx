import { create } from "zustand";
import type { Event } from "../components/global/types/EventType";
import type { Cart } from "../components/global/types/CartType";
import { persist } from "zustand/middleware";

interface EventStore {
  events: Event[];
  setEvents: (events: Event[]) => void;

  cartItems: Cart[];
  addToCart: (item: Cart) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  updateQuantity: (eventId: number, quantity: number) => void;
  removeFromCart: (eventId: number) => void;
}

const useStore = create<EventStore>()(
  persist(
    (set) => ({
      events: [],
      setEvents: (events) => set({ events }),

      cartItems: [],
      addToCart: (item) =>
        set((state) => {
          const existing = state.cartItems.find(
            (c) => c.eventId === item.eventId
          );

          if (existing) {
            return {
              cartItems: state.cartItems.map((c) =>
                c.eventId === item.eventId
                  ? {
                      ...c,
                      quantity: c.quantity + item.quantity,
                      subtotal: (c.quantity + item.quantity) * c.price,
                    }
                  : c
              ),
            };
          }
          return { cartItems: [...state.cartItems, item] };
        }),

      isCartOpen: false,
      setIsCartOpen: (open) => set({ isCartOpen: open }),

      updateQuantity: (eventId, quantity) =>
        set((state) => ({
          cartItems: state.cartItems.map((c) =>
            c.eventId === eventId
              ? { ...c, quantity, subtotal: quantity * c.price }
              : c
          ),
        })),

      removeFromCart: (eventId) =>
        set((state) => ({
          cartItems: state.cartItems.filter((c) => c.eventId !== eventId),
        })),
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

export default useStore;
