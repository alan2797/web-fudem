import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./public.route";
import Login from "../pages/login/login.page";
import LoginStep from "../pages/login/login-step.page";

interface RoutesProps {
  isAuthenticated: boolean;
}

const AppRoutes: React.FC<RoutesProps> = ({ isAuthenticated }) => {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route
        path="/login"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <Login />
          </PublicRoute>
        }
      />

      {/* Rutas del flujo post-login */}
      <Route
        path="login/step"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <LoginStep />
          </PublicRoute>
        }
      />

      {/* Rutas privadas <Route
        path="/home"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <HomePage />
          </PrivateRoute>
        }
      /> */}
      

      {/* Redirect cualquier ruta desconocida */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AppRoutes;
