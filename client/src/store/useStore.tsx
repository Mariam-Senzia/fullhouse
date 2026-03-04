import { create } from "zustand";
import type { Event } from "../components/global/types/EventType";

interface EventStore {
  events: Event[];
  setEvents: (events: Event[]) => void;
}

const useStore = create<EventStore>((set) => ({
  events: [],
  setEvents: (events) => set({ events }),
}));

export default useStore;
