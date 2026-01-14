import { useEffect, useState } from "react";
import { useAuthStore } from "../auth/auth.store";

export const useSessionTimer = () => {
  const expiresAt = useAuthStore((s) => s.expiresAt);
  const logout = useAuthStore((s) => s.logout);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    if (!expiresAt) return;

    const update = () => {
      const remaining = expiresAt - Date.now();
      if (remaining <= 0) {
        setTimeLeft(0);
        logout();
      } else {
        setTimeLeft(remaining);
      }
    };

    update(); // inmediato
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiresAt, logout]);

  return timeLeft;
}