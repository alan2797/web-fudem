// components/MainLayout.jsx
import { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
  EditOutlined,
  ShopOutlined,
  CalendarOutlined,
  PlusCircleOutlined,
  SwapOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown } from "antd";
import { logout } from "../../redux/features/auth.slice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import type { MenuProps } from "antd";
import { SelectMenu } from "../select-menu/select-menu.component";
import { RoutePaths } from "../../utils/constants";

const { Header, Sider, Content } = Layout;

const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG, colorWhite },
  } = theme.useToken();

  const dispatch = useDispatch<AppDispatch>();
  type MenuItem = Required<MenuProps>["items"][number];

  // Opciones para los selectores
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
  const menuItems: MenuItem[] = [
    {
      key: "/users",
      label: "USUARIOS",
      type: "group",
      children: [
        {
          key: "users",
          icon: <UserOutlined />,
          label: "Administración de Usuarios",
          children: [
            {
              key: RoutePaths.USERS_LIST,
              label: "Lista de Usuarios",
              icon: <UnorderedListOutlined />,
            },
            {
              key: "/users/create",
              label: "Crear Usuario",
              icon: <UserAddOutlined />,
            },
            {
              key: "/users/edit",
              label: "Edición de Usuario",
              icon: <EditOutlined />,
            },
          ],
        },
      ],
    },
    {
      key: "/branches",
      label: "SUCURSALES",
      type: "group",
      children: [
        {
          key: "branches",
          icon: <ShopOutlined />,
          label: "Sucursales",
          children: [
            {
              key: "/branches/list",
              label: "Lista de Sucursales",
              icon: <UnorderedListOutlined />,
            },
            {
              key: "/branches/create",
              label: "Crear Sucursal",
              icon: <PlusCircleOutlined />,
            },
            {
              key: "/branches/edit",
              label: "Edición de Sucursal",
              icon: <EditOutlined />,
            },
          ],
        },
      ],
    },
    {
      key: "/calendar",
      icon: <CalendarOutlined />,
      label: "Calendario",
    },
    {
      type: "divider", // ← Aquí va el divider
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: "Ajustes de cuenta",
    },
    {
      key: "/logout",
      icon: <LogoutOutlined />,
      label: "Cerrar Sesión",
    },
  ];

  const handleMenuClick = ({ key }: any) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={270}
        style={{
          backgroundColor: colorWhite,
        }}
        className="custom-sider"
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
        <div className="text-center py-4">
          {collapsed ? "" : <img src="/src/assets/svg/logo-sm.svg"></img>}
        </div>
        {!collapsed ? (
          // Cuando está expandido: muestra los SelectMenu
          <div style={{ padding: "0 16px", marginBottom: 16 }}>
            <SelectMenu
              placeholder="Cambiar Sucursal"
              icon={<ShopOutlined style={{ fontSize: 18 }} />}
              color="#FF8C42"
              options={branchOptions}
              onChange={(value) => console.log("Sucursal:", value)}
            />
            <SelectMenu
              placeholder="Cambiar Función"
              icon={<SwapOutlined style={{ fontSize: 18 }} />}
              color="#00B4D8"
              options={functionOptions}
              onChange={(value) => console.log("Función:", value)}
            />
            <SelectMenu
              placeholder="Cambiar Locación"
              icon={<EnvironmentOutlined style={{ fontSize: 18 }} />}
              color="#FFD60A"
              options={locationOptions}
              onChange={(value) => console.log("Locación:", value)}
            />
          </div>
        ) : (
          // Cuando está colapsado: muestra iconos con dropdown
          
          <div
            style={{marginTop: "15px",padding: "8px 0", marginBottom: 8, textAlign: "center" }}
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
              align={{ offset: [79, -35] }}
              overlayStyle={{
                minWidth: 170
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
              align={{ offset: [79, -35] }}
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
              align={{ offset: [79, -35] }}
              getPopupContainer={() => document.body} // 👈 Saca el dropdown del contenedor del sider
              overlayStyle={{
                minWidth: 170
              }}
            >
              <div className="icon-wrapper">
                <EnvironmentOutlined
                  style={{ fontSize: 20, color: "#FFD60A" }}
                />
              </div>
            </Dropdown>
          </div>
        )}
        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: "0 24px",
            background: colorBgContainer,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />

          {/* Botón de logout */}
          <Button
            type="text"
            icon={<LogoutOutlined />}
            onClick={() => {
              dispatch(logout());
              navigate("/login"); // redirige al login después de cerrar sesión
            }}
            style={{ fontSize: "16px" }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
