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
    MedicineBoxOutlined,
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
            { key: RoutePaths.USERS_CREATE, label: "Crear Usuario", icon: <UserAddOutlined /> },
            { key: RoutePaths.USERS_EDIT, label: "Edición de Usuario", icon: <EditOutlined /> },
            { key: RoutePaths.USERS_FILTER, label: "Búsqueda de Expediente", icon: <MedicineBoxOutlined /> },
          ],
        },
      ],
    },
    {
      key: "/patients",
      label: "PACIENTES",
      type: "group",
      children: [
        {
          key: "patients",
          icon: <UserOutlined />,
          label: "Administración de Pacientes",
          children: [
            { key: RoutePaths.PATIENTS_LIST, label: "Lista de Pacientes", icon: <UnorderedListOutlined /> },
            { key: RoutePaths.PATIENTS_CREATE, label: "Crear Paciente", icon: <UserAddOutlined /> },
            { key: RoutePaths.PATIENTS_EDIT, label: "Edición de Paciente", icon: <EditOutlined /> },
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
  