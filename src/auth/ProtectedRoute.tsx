import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./auth.store";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoute = () => {
  const location = useLocation();

  const { isExpired, checkSession } = useAuthStore();
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);

  const hasHydrated = useAuthStore.persist.hasHydrated();

 useEffect(() => {
    checkSession();
  }, [checkSession]);

  if (!hasHydrated) {
    console.log("Cargando sesión de usuario...");
    return null;
  }
  if (isExpired()) {
    return <Navigate to="/login" replace />;
  }


  if (!token || !user) {
    console.warn("Protected: Sesión no encontrada.");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
