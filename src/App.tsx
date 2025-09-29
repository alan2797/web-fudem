import React from "react";
import AppRoutes from "./routes/app.route";
import { BrowserRouter as Router } from "react-router-dom";

const App: React.FC = () => {
  const isAuthenticated = false; // 👈 aquí iría tu estado de sesión real (Redux/Context)
  return (
    <Router>
      <AppRoutes isAuthenticated={isAuthenticated} />
    </Router>
  );
};

export default App;
