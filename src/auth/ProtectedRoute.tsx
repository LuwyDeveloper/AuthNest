import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./auth.store";
import { Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const location = useLocation();

  const { logout } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const expiresAt = useAuthStore((state) => state.expiresAt);

  const hasHydrated = useAuthStore.persist.hasHydrated();

  if (!hasHydrated) {
    console.log("Cargando sesión de usuario...");
    return null;
  }
   if (expiresAt && Date.now() > expiresAt) {
    console.warn("Sesión expirada");
    logout();
    return <Navigate to="/login" replace />;
  }

  if (!token || !user) {
    console.warn("Protected: Sesión no encontrada.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
