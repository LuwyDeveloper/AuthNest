import { useAuthStore } from "../auth/auth.store";
import { useSessionWarningStore } from "./sessionWarning.store";
import { useLocation } from "react-router-dom";

export const SessionExpirationModal = () => {
  const isOpen = useSessionWarningStore((state) => state.isOpen);
  const close = useSessionWarningStore((state) => state.close);
  const logout = useAuthStore((state) => state.logout);
  const setExpiresAt = useAuthStore.setState;
  const { pathname } = useLocation();

  if (!isOpen) return null;
  const continueSession = () => {
    setExpiresAt({
      expiresAt: Date.now() + 15 * 60 * 1000,
    });
    close();
  };

  if (pathname === "/login") return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-slate-950 p-6 shadow-xl border-blue-500 border">
        <h2 className="mb-3 text-lg font-semibold text-white">
          Sesión a punto de expirar
        </h2>

        <p className="mb-6 text-sm text-white">
          Tu sesión se cerrará en breve por seguridad. ¿Deseas continuar?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={logout}
            className="rounded bg-white px-4 py-2 text-sm hover:bg-gray-300"
          >
            Cerrar sesión
          </button>

          <button
            onClick={continueSession}
            className="rounded bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
          >
            Continuar sesión
          </button>
        </div>
      </div>
    </div>
  );
};
