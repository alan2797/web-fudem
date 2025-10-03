// components/layout/MenuItems.ts
import {
    UserOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    EditOutlined,
    ShopOutlined,
    PlusCircleOutlined,
    CalendarOutlined,
    SettingOutlined,
    LogoutOutlined,
  } from "@ant-design/icons";
  import { RoutePaths } from "../../utils/constants";
  import type { MenuProps } from "antd";
  
  type MenuItem = Required<MenuProps>["items"][number];
  export const menuItems: MenuItem[] = [
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
            { key: RoutePaths.USERS_LIST, label: "Lista de Usuarios", icon: <UnorderedListOutlined /> },
            { key: "/users/create", label: "Crear Usuario", icon: <UserAddOutlined /> },
            { key: "/users/edit", label: "Edición de Usuario", icon: <EditOutlined /> },
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
            { key: "/branches/list", label: "Lista de Sucursales", icon: <UnorderedListOutlined /> },
            { key: "/branches/create", label: "Crear Sucursal", icon: <PlusCircleOutlined /> },
            { key: "/branches/edit", label: "Edición de Sucursal", icon: <EditOutlined /> },
          ],
        },
      ],
    },
    { key: "/calendar", icon: <CalendarOutlined />, label: "Calendario" },
    { type: "divider" },
    { key: "/settings", icon: <SettingOutlined />, label: "Ajustes de cuenta" },
    { key: "/logout", icon: <LogoutOutlined />, label: "Cerrar Sesión" },
  ];
  