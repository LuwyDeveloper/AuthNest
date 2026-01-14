import { useContext } from "react";
import ThemeContext from "../context/themeContext";

export default function useSidebarStatus() {
  const { sidebarStatus, setSidebarStatus } = useContext(ThemeContext);

  return { sidebarStatus, setSidebarStatus };
}
