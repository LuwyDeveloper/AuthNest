import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { loginWithGoogle } from "./firebase";

interface AuthState {
  user: string | null;
  token: string | null;
  expiresAt: number | null;
  _hasHydrated: boolean;
  login: (username: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
}

const loginWithApi = async (username: string, password: string) => {
  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error en login:", data);
      throw new Error(data.message || "Login inválido");
    }

    return data;
  } catch (err) {
    console.error("Error inesperado:", err);
    throw err;
  }
};
const SESSION_DURATION = 15 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      _hasHydrated: false,
      expiresAt: null,

      login: async (username, password) => {
        console.log("login called", username);
        const { accessToken } = await loginWithApi(username, password);
        set({
          user: username,
          token: accessToken,
          expiresAt: Date.now() + SESSION_DURATION,
        });
        console.log("Duracion Sesión", SESSION_DURATION)
      },

      loginWithGoogle: async () => {
        const user = await loginWithGoogle();
        if (!user) throw new Error("Google login failed");

        set({
          user: user.displayName || user.email || "Usuario Google",
          token: user.uid,
          expiresAt: Date.now() + SESSION_DURATION,
        });
        console.log("Duracion Sesión", SESSION_DURATION)
      },

      logout: () => {
        set({ user: null, token: null, expiresAt: null });
        useAuthStore.persist.clearStorage();
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        console.warn("onRehydrateStorage called", state);
        if (state) state._hasHydrated = true;
      },
    }
  )
);
