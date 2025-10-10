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
      if(decoded.isAdmin){
        isAuthenticated = !!decoded.branchId && !!decoded.areaId && !!decoded.positionId;
      }else{
        isAuthenticated = !!decoded.branchId && !!decoded.areaId && !!decoded.workProfileId && !!decoded.positionId;
      }
    } catch (err) {
      isAuthenticated = false;
    }
  }

  return (
    <Router>
      <AppRoutes isAuthenticated={true} />
    </Router>
  );
};

export default App;
