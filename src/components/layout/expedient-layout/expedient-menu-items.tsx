// components/layout/MenuItems.ts
import {
  HistoryOutlined,
  SolutionOutlined,
  FormOutlined,
  FileProtectOutlined,
  FileOutlined,
  FundOutlined,
  ContainerOutlined,
  FileAddOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { RoutePaths } from "../../../utils/constants";

type MenuItem = Required<MenuProps>["items"][number];
export const ExpedientMenuItems: MenuItem[] = [
  {
    key: RoutePaths.USERS_LIST,
    label: "Información del Paciente",
    icon: <UserAddOutlined />,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Historial",
    icon: <HistoryOutlined/>,
  },
  {
    key: RoutePaths.EXPEDIENTS_MEDICAL_CERTIFICATES,
    label: "Constancias Médicas",
    icon: <SolutionOutlined/>,
  },
  {
    key: RoutePaths.EXPEDIENTS_NURSING_CHEETS,
    label: "Hoja de Enfermeria",
    icon: <FileAddOutlined />,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Hoja de Cirugía",
    icon: <FormOutlined/>,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Hoja de Referencia",
    icon: <FileProtectOutlined/>,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Constancia de Incapacidad",
    icon: <SolutionOutlined/>,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Reporte de Anestesiología",
    icon: <FundOutlined />,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Hoja de Permanencia",
    icon: <FileOutlined />,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Receta Médica",
    icon: <ContainerOutlined />,
  },
  {
    key: RoutePaths.USERS_LIST,
    label: "Resumen",
    icon: <FileAddOutlined />,
  },
  { type: "divider" },
];
