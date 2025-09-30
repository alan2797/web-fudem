import { useSelector } from "react-redux";
import type { RootState } from "../../redux/store";
import { localStorageService } from "../../services/localstorage";
import LoginStepAdmin from "./login-step-admin.page";
import LoginStepNormal from "./login-step-normal.page";

const LoginStep: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  // 🔹 Decodificar token para saber si es admin
  const decoded = localStorageService.decode();
  const isAdmin = decoded?.isAdmin ?? false;

  if (isAdmin) {
    return <LoginStepAdmin user={user} />;
  }

  return <LoginStepNormal user={user} />;
};

export default LoginStep;