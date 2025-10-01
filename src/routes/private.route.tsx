import { jwtDecode } from "jwt-decode";
import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import type { TokenPayload } from "../interfaces/login.interface";

interface PrivateRouteProps {
  children: ReactNode;
  isAuthenticated: boolean;
  redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  isAuthenticated,
  redirectPath = "/login",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  // obtener token del storage
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to={redirectPath} replace />;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    console.log(decoded);
    // validar claims requeridos
    if (
      !decoded.branchId ||
      !decoded.areaId ||
      !decoded.workProfileId ||
      !decoded.positionId
    ) {
      return <Navigate to={redirectPath} replace />;
    }

    // opcional: validar expiración
    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return <Navigate to={redirectPath} replace />;
    }
  } catch (err) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
