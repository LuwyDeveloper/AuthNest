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

    isExpired: () => boolean;
  checkSession: () => void;
}

const loginWithApi = async (username: string, password: string) => {
  try {
      const response = await fetch("https://backend-authnest-luwy.up.railway.app/auth/login", {
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
const SESSION_DURATION = 10 * 60 * 1000;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      expiresAt: null,
      _hasHydrated: false,

      login: async (username, password) => {
        const { access_token } = await loginWithApi(username, password);
        
        set({
          user: username,
          token: access_token,
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
        console.log("Duracion de la Sesión", SESSION_DURATION)
      },

      logout: () => {
        set({ user: null, token: null, expiresAt: null });
        useAuthStore.persist.clearStorage();
      },
       isExpired: () => {
        const { expiresAt } = get();
        return !!expiresAt && Date.now() > expiresAt;
      },
      checkSession: () => {
        const { isExpired, logout } = get();
        if (isExpired()) {
          console.warn("Sesión expirada (store)");
          logout();
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        // console.warn("onRehydrateStorage called", state);
        if (state) state._hasHydrated = true;
      },
    }
  )
);
