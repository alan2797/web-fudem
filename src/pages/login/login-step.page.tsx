import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { localStorageService } from "../../services/localstorage";
import LoginStepAdmin from "./login-step-admin.page";
import LoginStepNormal from "./login-step-normal.page";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const LoginStep: React.FC = () => {
  const { user, areas, positions } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const decoded = localStorageService.decode();
  const isAdmin = decoded?.isAdmin ?? false;
  
  useEffect(() => {
    if(!user?.profiles && !user?.availableBranches){
      console.log("entro a login")
      navigate("/login");
    }
  }, [user, navigate]);

  if (isAdmin) {
    return <LoginStepAdmin user={user} areas={areas ?? []} positions={positions ?? []} />;
  }

  return <LoginStepNormal user={user} />;
};

export default LoginStep;