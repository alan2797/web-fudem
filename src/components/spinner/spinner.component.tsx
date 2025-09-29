
import { useSelector } from "react-redux";
import { Spin } from "antd";
import type { RootState } from "../../redux/store";

const Spinner = () => {
  const loading = useSelector((state: RootState) => state.spinner.loading);

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(255, 255, 255, 0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
      }}
    >
      <Spin size="large" tip="Cargando..." />
    </div>
  );
};

export default Spinner;
