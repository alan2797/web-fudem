import { Button, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth.slice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch } from "../../redux/store";

const HeaderBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "0 24px",
        background: colorBgContainer,
        height: 70,
      }}
    >
      {/* Aquí podrían ir otros elementos a la izquierda si quieres */}
      <div style={{ fontWeight: "bold" }}>Mi App</div>

      {/* Botón logout alineado al final */}
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={() => {
          dispatch(logout());
          navigate("/login");
        }}
        style={{ fontSize: 16, marginLeft: "auto" }}
      />
    </div>
  );
};

export default HeaderBar;
