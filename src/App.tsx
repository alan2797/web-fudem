import React from "react";
import AppRoutes from "./routes/app.route";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import type { TokenPayload } from "./interfaces/login.interface";
import { jwtDecode } from "jwt-decode";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  let isAuthenticated = false;

  if (token) {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const hasClaims =
        !!decoded.branchId &&
        !!decoded.areaId &&
        !!decoded.workProfileId &&
        !!decoded.positionId;

      if (hasClaims) {
        isAuthenticated = true;
      }
    } catch (err) {
      isAuthenticated = false;
    }
  }

  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

export default App;
