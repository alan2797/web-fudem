import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./public.route";
import Login from "../pages/login/login.page";
import LoginStep from "../pages/login/login-step.page";
import RecoveryAccount from "../pages/recovery-account/recovery.page";
import MainLayout from "../components/layout/main-layout.component";
import PrivateRoute from "./private.route";
import HomePage from "../pages/home/home.page";

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
      {/* Rutas públicas */}
      <Route
        path="/recovery-account"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <RecoveryAccount />
          </PublicRoute>
        }
      />

      {/* Rutas del flujo post-login */}
      <Route
        path="login/step"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <LoginStep />
          </PrivateRoute>
        }
      />

     {/* Rutas privadas con layout */}
     <Route
        path="/"
        element={
          <PrivateRoute isAuthenticated={isAuthenticated}>
            <MainLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
      </Route>

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
