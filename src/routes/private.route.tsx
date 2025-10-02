import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";

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
  return <>{children}</>;
};

export default PrivateRoute;
