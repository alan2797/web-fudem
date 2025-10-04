import type { ColumnsType } from "antd/es/table";
import type { UserListDto } from "../../../../interfaces/user.interface";

export const columns: ColumnsType<UserListDto> = [
  { title: "Nombre de Usuario", dataIndex: "username", key: "username" },
  { title: "Nombre", dataIndex: "fullName", key: "fullName" },
  { title: "Rol", dataIndex: "role", key: "role" },
  {
    title: "Sucursal",
    key: "branch",
    render: (_, record) => record.branch?.name ?? "-",
  },
  {
    title: "País",
    key: "country",
    render: (_, record) => record.country?.name ?? "-",
  },
  {
    title: "Estado",
    key: "connectionStatus",
    render: (_, record) => {
      const color =
        record.connectionStatus === "connected"
          ? "green"
          : record.connectionStatus === "disconnected"
          ? "red"
          : "orange"; // blocked
      return <span style={{ color }}>{record.connectionStatus}</span>;
    },
  }
];
