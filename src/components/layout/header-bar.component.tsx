import { Button, theme } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const HeaderBar = () => {
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
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={() => {
        }}
        style={{ fontSize: 16, marginLeft: "auto" }}
      />
      {/* Aquí podrían ir otros elementos a la izquierda si quieres */}
      <div style={{ fontWeight: "bold" }}>Mi App</div>

      {/* Botón logout alineado al final */}
      
    </div>
  );
};

export default HeaderBar;
