import { useEffect } from "react";
import { useIdleStore } from "../auth/idle.store";

export const useIdleListeners = () => {
  const reset = useIdleStore((s) => s.reset);
  const start = useIdleStore((s) => s.start);
  const stop = useIdleStore((s) => s.stop);

  useEffect(() => {
    const events = ["mousemove", "keydown", "click", "scroll", "touchstart"];

    events.forEach((event) =>
      window.addEventListener(event, reset)
    );

    start();

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, reset)
      );
      stop();
    };
  }, [reset, start, stop]);
};