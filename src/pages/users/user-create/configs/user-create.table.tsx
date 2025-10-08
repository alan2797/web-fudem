import type { ColumnsType } from "antd/es/table";
import type { WorkProfileTableDto } from "../../../../interfaces/profile.interface";

export const columns: ColumnsType<WorkProfileTableDto> = [
  { title: "Nombre", dataIndex: "name", key: "name" },
  {
    title: "Sucursal",
    key: "branch",
    render: (_, record) => record.branch.name ?? "-",
  },
  {
    title: "Función",
    key: "country",
    render: (_, record) => record.area.name ?? "-",
  },
  {
    title: "Locación",
    key: "location",
    render: (_, record) => record.location.name ?? "-",
  }
];
