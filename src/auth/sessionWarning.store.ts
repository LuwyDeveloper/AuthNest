import { create } from "zustand";

interface SessionWarningState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useSessionWarningStore = create<SessionWarningState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));