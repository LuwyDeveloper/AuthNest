import { useEffect } from "react";
import { useAuthStore } from "../auth/auth.store";
import { useSessionWarningStore } from "../auth/sessionWarning.store";

const WARNING_TIME = 2 * 60 * 1000;

export const useSessionExpiration = () => {
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const logout = useAuthStore((s) => s.logout);
  const openWarning = useSessionWarningStore((s) => s.open);
  const closeWarning = useSessionWarningStore((s) => s.close);

  useEffect(() => {
    if (!expiresAt) return;

    const now = Date.now();
    const timeLeft = expiresAt - now;

    if (timeLeft <= 0) {
      logout();
      return;
    }

    const warningTimeout = window.setTimeout(
      openWarning,
      Math.max(timeLeft - WARNING_TIME, 0)
    );
    console.log(WARNING_TIME)

    const logoutTimeout = window.setTimeout(() => {
      closeWarning();
      logout();
    }, timeLeft);

    return () => {
      clearTimeout(warningTimeout);
      clearTimeout(logoutTimeout);
    };
  }, [expiresAt, logout, openWarning, closeWarning]);
};
