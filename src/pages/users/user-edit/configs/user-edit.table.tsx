import type { ColumnsType } from "antd/es/table";
import type { FilterEditUserDto } from "../../../../interfaces/user.interface";

export const columns: ColumnsType<FilterEditUserDto> = [
  { title: "No. de Expediente", dataIndex: "medicalRecord", key: "medicalRecord" },
  { title: "Paciente", dataIndex: "name", key: "name" },
  { title: "Fecha Nacimiento", dataIndex: "fechaNac", key: "fechaNac" },
  { title: "Departamento", dataIndex: "dpto", key: "dpto" },
  { title: "Municipio", dataIndex: "municipio", key: "municipio" },
  { title: "DUI", dataIndex: "dui", key: "dui" },
];
