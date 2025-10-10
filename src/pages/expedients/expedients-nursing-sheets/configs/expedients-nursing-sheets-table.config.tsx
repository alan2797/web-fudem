import type { ColumnsType } from "antd/es/table";
import type { CreateExpedientPatientDto } from "../../../../interfaces/user.interface";
import { Badge } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

export const columns: ColumnsType<CreateExpedientPatientDto> = [
  { title: "No. de Hoja de Enfermeria", dataIndex: "sheetId", key: "sheetId",
     render: (value: string | number) => (
      <div style={{ display: "flex", alignItems: "center",gap: "8px"}}>
          <div style={{
              width: 40,
              height:  40,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius:  "50%",
              backgroundColor:  "#E6F4FF",
            }}>
          <FileTextOutlined />
        </div>
          <span>{value}</span>
      </div>
    
    ),
  },
  { title: "Fecha", dataIndex: "date", key: "date" },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    render: (status: string) => {
    let backgroundColor = "";
    let text = "";

    switch (status?.toLowerCase()) {
      case "abierto":
        backgroundColor = "#7cd451ff"; // verde
        text = "Abierto";
        break;
      case "cerrado":
        backgroundColor = "#f13400"; // rojo
        text = "Cerrado";
        break;
      case "pendiente":
        backgroundColor = "#faad14"; // amarillo
        text = "Pendiente";
        break;
      default:
        backgroundColor = "#d9d9d9"; // gris por defecto
        text = status;
    }

    return (
      <Badge
        count={text}
        style={{
          backgroundColor,
          color: "#fff",
          padding: "0 10px",
          borderRadius: "12px",
          fontWeight: 500,
          textTransform:"uppercase"
        }}
      />
    );
  },
  },
];
