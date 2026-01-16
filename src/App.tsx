import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { DashboardApiPage } from "./pages/DashboardApiPage";
import { DashboardLayout } from "./layouts/DashboardLayout";

import { ProtectedRoute } from "./auth/ProtectedRoute";
import { ThemeContextProvider } from "./context/themeContext";
import { NotFoundPage } from "./pages/NoFoundPage";
import "./App.css";
import { useIdleListeners} from "./hooks/useIdleListeners";
import { useSessionExpiration } from "./hooks/useSessionExpiration";
import { SessionExpirationModal } from "./auth/SessionExpirationModal";

function App() {
  useIdleListeners();
  useSessionExpiration();
  return (
    <>
    <SessionExpirationModal />

    <Routes>
      {/* RUTAS PÚBLICAS */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />}/>

      {/* RUTAS PRIVADAS */}
      <Route path="/*" element={<ProtectedRoute />}>
        <Route
        // path="/"
          element={
            <ThemeContextProvider>
              <DashboardLayout />
            </ThemeContextProvider>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="apidashboard" element={<DashboardApiPage />} />
        </Route>
      </Route>
    </Routes>
    </>
  );
}

export default App;
