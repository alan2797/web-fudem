import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./public.route";
import Login from "../pages/login/login.page";
import LoginStep from "../pages/login/login-step.page";
import RecoveryAccount from "../pages/recovery-account/recovery.page";
import ForgotUsername from "../pages/recovery-account/forgot-username.page";
import BloquedUser from "../pages/recovery-account/bloqued-user.page";
import ForgotPassword from "../pages/recovery-account/forgot-password.page";
import ChangeTemporaryPassword from "../pages/temporary-password/temporary-password.page";

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
      <Route
        path="/recovery-account"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <RecoveryAccount />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-username"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <ForgotUsername />
          </PublicRoute>
        }
      />
      <Route
        path="/bloqued-user"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <BloquedUser />
          </PublicRoute>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <ForgotPassword />
          </PublicRoute>
        }
      />
      <Route
        path="/change-password-temp"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} restricted>
            <ChangeTemporaryPassword />
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
