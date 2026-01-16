import { create } from "zustand";
import { useAuthStore } from "../auth/auth.store";

interface IdleState {
  idleTimer: number | null;
  graceTimer: number | null;
  expiresAt: number | null;
  start: () => void;
  reset: () => void;
  stop: () => void;
}
const IDLE_TIME = 60 * 1000;
const GRACE_TIME = 3000;

export const useIdleStore = create<IdleState>((set, get) => ({
  idleTimer: null,
  graceTimer: null,
  expiresAt: null,

  start: () => {
    get().reset();
  },

  reset: () => {
    const { idleTimer, graceTimer } = get();
    const logout = useAuthStore.getState().logout;

    if (idleTimer) window.clearTimeout(idleTimer);
    if (graceTimer) window.clearTimeout(graceTimer);

    set({ expiresAt: null });

    const newGraceTimer = window.setTimeout(() => {
      const expiresAt = Date.now() + IDLE_TIME;

      const newIdleTimer = window.setTimeout(() => {
        console.warn("Logout por inactividad");
        logout();
      }, IDLE_TIME);

      set({
        idleTimer: newIdleTimer,
        expiresAt,
      });
    }, GRACE_TIME);

    set({ graceTimer: newGraceTimer });
  },

  stop: () => {
     const { idleTimer, graceTimer } = get();
    if (idleTimer) window.clearTimeout(idleTimer);
    if (graceTimer) window.clearTimeout(graceTimer);

    set({
      idleTimer: null,
      graceTimer: null,
      expiresAt: null,
    });
  },
}));
