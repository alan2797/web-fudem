import { theme, Divider } from "antd";
import { ArrowLeftOutlined, FileTextOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ButtonCustom from "../../button/button.component";

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void; // <--- añadimos función para el botón hamburguesa
}


const ExpedientHeaderBar = ({ collapsed, toggleCollapsed }: SidebarProps) => {
  const { token: { colorBgContainer } } = theme.useToken();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "12px 20px",
        height: 80,
        borderRadius: "8px",
        margin: "1% 1% 0 1%",
        justifyContent: "space-between",
        background: colorBgContainer,
        boxSizing: "border-box",
      }}
    >
      {/* Bloque IZQUIERDA */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <ButtonCustom
          type="primary"
          text="Regresar"
          icon={<ArrowLeftOutlined />}
          onClick={() => {}}
          style={{ marginRight: 10, borderRadius: "20px" }}
          className="bg-primary-antd"
        />

        <Divider
          type="vertical"
          style={{
            height: "45px",
            fontWeight: "bolder",
            borderRight: "2px solid #0000002c",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "1.9em",
          }}
          className="text-primary-antd"
        >
          <FileTextOutlined />
          <span>Expediente</span>
        </div>
      </div>

      {/* Bloque DERECHA: Botón hamburguesa */}
      <button
        onClick={toggleCollapsed}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontSize: 22,
          width: 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>
    </div>
  );
};

export default ExpedientHeaderBar;
