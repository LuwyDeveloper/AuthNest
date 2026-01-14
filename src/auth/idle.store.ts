import { create } from "zustand";
import { useAuthStore } from "../auth/auth.store";

const IDLE_TIME = 60 * 1000;

interface IdleState {
  timer: number | null;
  start: () => void;
  reset: () => void;
  stop: () => void;
}

export const useIdleStore = create<IdleState>((set, get) => ({
  timer: null,

  start: () => {
    get().reset();
  },

  reset: () => {
    const { timer } = get();
    const logout = useAuthStore.getState().logout;

    if (timer) window.clearTimeout(timer);

    const newTimer = window.setTimeout(() => {
      console.warn("Logout por inactividad");
      logout();
    }, IDLE_TIME);

    set({ timer: newTimer });
  },

  stop: () => {
    const { timer } = get();
    if (timer) window.clearTimeout(timer);
    set({ timer: null });
  },
}));