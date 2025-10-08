import type { ColumnsType } from "antd/es/table";
import type { UserListDto } from "../../../../interfaces/user.interface";
import { CheckCircleFilled, CloseCircleFilled, UserOutlined } from "@ant-design/icons";

export const columns: ColumnsType<UserListDto> = [
  { title: "Nombre de Usuario", dataIndex: "username", key: "username",
    render: (_, record) => {
      const isConnected = record.connectionStatus === "connected";
      const color = isConnected ? "green" : "red";
      const Icon = isConnected ? UserOutlined : UserOutlined;

      return (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon style={{ color, fontSize: 25 }} />
          <span>{record.username}</span>
        </div>
      );
    },
   },
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
  
];
