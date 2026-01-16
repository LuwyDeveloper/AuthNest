import { useEffect, useState } from "react";
import { useIdleStore } from "../auth/idle.store";

export const useIdleTimer = () => {
  const expiresAt = useIdleStore((s) => s.expiresAt);

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const update = () => {
      if (!expiresAt) {
        setTimeLeft(0);
        return;
      }
      const remaining = expiresAt - Date.now();
      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    update();
    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};
