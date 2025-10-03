// components/layout/Sidebar.jsx
import { Layout, Menu, Dropdown } from "antd";
import {
  ShopOutlined,
  SwapOutlined,
  EnvironmentOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { SelectMenu } from "../select-menu/select-menu.component";
import { menuItems } from "./menu-items";

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  toggleCollapsed: () => void; // <--- añadimos función para el botón hamburguesa
}

const branchOptions = [
  { value: "1", label: "Sucursal Central" },
  { value: "2", label: "Sucursal Norte" },
  { value: "3", label: "Sucursal Sur" },
];

const functionOptions = [
  { value: "admin", label: "Administrador" },
  { value: "vendedor", label: "Vendedor" },
  { value: "supervisor", label: "Supervisor" },
];

const locationOptions = [
  { value: "main", label: "Ubicación Principal" },
  { value: "warehouse", label: "Almacén" },
  { value: "store", label: "Tienda" },
];

const Sidebar = ({ collapsed, toggleCollapsed }: SidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={270}
      className="bg-white custom-sider sidebar-content-layout"
      style={{borderRadius: "8px" }}
    >
      <style>
        {`
            .custom-sider .ant-menu-item-divider {
                border-top: 2px solid #000;
                margin: 8px 15px
            }
            .ant-layout-sider-collapsed .ant-menu-item-group-title {
                display: none !important;
                opacity: 0 !important;
                padding: 0 !important;
                height: 0 !important;
            }
            `}
      </style>
      {/* HEADER DEL SIDER: logo a la izquierda + hamburguesa a la derecha */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: 64,
        }}
        className="mb-3"
      >
        {/* Logo */}
          {!collapsed && (
            <img
              src="/src/assets/svg/logo-sm.svg"
              alt="Logo"
              style={{ height: 35 }}
            />
          )}

        {/* Botón hamburguesa */}
        <div
          style={{
            display: "flex",
            alignItems: "center", // centra verticalmente
            justifyContent: "center", // centra horizontalmente en su contenedor
            width: 40, // tamaño fijo para evitar que se desplace al colapsar
            height: 40,
            marginLeft: 5
          }}
        >
          <button
            onClick={toggleCollapsed}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </button>
        </div>
      </div>
      {!collapsed ? (
        <div style={{ padding: "0 16px", marginBottom: 16 }}>
          <SelectMenu
            placeholder="Cambiar Sucursal"
            options={branchOptions}
            color="#FF8C42"
            icon={<ShopOutlined style={{ fontSize: 18 }} />}
          />
          <SelectMenu
            placeholder="Cambiar Función"
            options={functionOptions}
            color="#00B4D8"
            icon={<SwapOutlined style={{ fontSize: 18 }} />}
          />
          <SelectMenu
            placeholder="Cambiar Locación"
            options={locationOptions}
            color="#FFD60A"
            icon={<EnvironmentOutlined style={{ fontSize: 18 }} />}
          />
        </div>
      ) : (
        <div
          style={{
            marginTop: "15px",
            padding: "8px 0",
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          <Dropdown
            menu={{
              items: branchOptions.map((opt) => ({
                key: opt.value,
                label: (
                  <span style={{ whiteSpace: "nowrap" }}>{opt.label}</span>
                ),
                onClick: () => console.log("Sucursal:", opt.value),
              })),
            }}
            placement="bottomRight"
            trigger={["hover"]}
            align={{ offset: [180, -35] }}
            overlayStyle={{
              minWidth: 170,
            }}
          >
            <div className="icon-wrapper">
              <ShopOutlined style={{ fontSize: 20, color: "#FF8C42" }} />
            </div>
          </Dropdown>

          <Dropdown
            menu={{
              items: branchOptions.map((opt) => ({
                key: opt.value,
                label: (
                  <span style={{ whiteSpace: "nowrap" }}>{opt.label}</span>
                ),
                onClick: () => console.log("Sucursal:", opt.value),
              })),
            }}
            placement="bottomRight"
            trigger={["hover"]}
            align={{ offset: [180, -35] }}
            overlayStyle={{
              minWidth: 170,
            }}
          >
            <div className="icon-wrapper">
              <SwapOutlined style={{ fontSize: 20, color: "#00B4D8" }} />
            </div>
          </Dropdown>

          <Dropdown
            /* menu={{
            items: locationOptions.map(opt => ({
              key: opt.value,
              label: opt.label,
              onClick: () => console.log("Locación:", opt.value)
            }))
          }} */
            menu={{
              items: branchOptions.map((opt) => ({
                key: opt.value,
                label: (
                  <span style={{ whiteSpace: "nowrap" }}>{opt.label}</span>
                ),
                onClick: () => console.log("Sucursal:", opt.value),
              })),
            }}
            placement="bottomRight"
            trigger={["hover"]}
            align={{ offset: [180, -35] }}
            getPopupContainer={() => document.body} // 👈 Saca el dropdown del contenedor del sider
            overlayStyle={{
              minWidth: 170,
            }}
          >
            <div className="icon-wrapper">
              <EnvironmentOutlined style={{ fontSize: 20, color: "#FFD60A" }} />
            </div>
          </Dropdown>
        </div>
      )}

      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={({ key }) => navigate(key)}
      />
    </Sider>
  );
};

export default Sidebar;
