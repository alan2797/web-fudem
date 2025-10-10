import type { ColumnsType } from "antd/es/table";
import type { PatientSearchDto } from "../../../../interfaces/patient.interface";
import moment from "moment";


export const columns: ColumnsType<PatientSearchDto> = [
  { title: "No. de Expediente", dataIndex: "expedientNumber", key: "expedientNumber" },
  { title: "Paciente", dataIndex: "patientName", key: "patientName" },
  {
    title: "Fecha Nacimiento",
    dataIndex: "birthDate",
    key: "birthDate",
    render: (date: string) =>
      date ? moment.utc(date).format("DD/MM/YYYY") : "-"
  },
  { title: "Departamento", dataIndex: "department", key: "department" },
  { title: "Municipio", dataIndex: "municipality", key: "municipality" },
  { title: "DUI", dataIndex: "documentNumber", key: "documentNumber" },
];
