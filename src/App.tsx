import React from "react";
import AppRoutes from "./routes/app.route";
import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "./redux/store";

const App: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const isAuthenticated = !!token;
  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

export default App;
