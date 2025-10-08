
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { FilterEditUserDto } from "../../../../interfaces/user.interface";

export const userData = [
  {
    "medicalRecord": "EXP-0001",
    "name": "Juan Pérez Gómez",
    "fechaNac": "1990-05-14",
    "dpto": "San Salvador Department",
    "municipio": "San Salvador",
    "dui": "01234567-8"
  },
  {
    "medicalRecord": "EXP-0002",
    "name": "María Fernanda López",
    "fechaNac": "1987-11-23",
    "dpto": "La Libertad Department",
    "municipio": "Santa Tecla",
    "dui": "12345678-9"
  },
  {
    "medicalRecord": "EXP-0003",
    "name": "Carlos Alberto Rodríguez",
    "fechaNac": "1995-03-09",
    "dpto": "Santa Ana Department",
    "municipio": "Santa Ana",
    "dui": "23456789-0"
  },
  {
    "medicalRecord": "EXP-0004",
    "name": "Ana Sofía Ramírez",
    "fechaNac": "1992-07-30",
    "dpto": "San Miguel Department",
    "municipio": "San Miguel",
    "dui": "34567890-1"
  },
  {
    "medicalRecord": "EXP-0005",
    "name": "Luis Enrique González",
    "fechaNac": "1985-01-17",
    "dpto": "Usulután Department",
    "municipio": "Usulután",
    "dui": "45678901-2"
  },
  {
    "medicalRecord": "EXP-0002",
    "name": "María Fernanda López",
    "fechaNac": "1987-11-23",
    "dpto": "La Libertad Department",
    "municipio": "Santa Tecla",
    "dui": "12345678-9"
  },
  {
    "medicalRecord": "EXP-0003",
    "name": "Carlos Alberto Rodríguez",
    "fechaNac": "1995-03-09",
    "dpto": "Santa Ana Department",
    "municipio": "Santa Ana",
    "dui": "23456789-0"
  },
  {
    "medicalRecord": "EXP-0004",
    "name": "Ana Sofía Ramírez",
    "fechaNac": "1992-07-30",
    "dpto": "San Miguel Department",
    "municipio": "San Miguel",
    "dui": "34567890-1"
  }
]


export const configFormUser = (): FieldConfig<FilterEditUserDto>[] => [
  {
    key: "medicalRecord",
    type: "text",
    label: "No. de Expediente",
    placeholder: "Nro de expediente",
    xs: 24,
    md: 8,
  },
  {
    key: "name",
    type: "text",
    label: "Nombres y Apellidos",
    placeholder: "Ingrese nombre y apellido",
    xs: 24,
    md: 8,
  },
  {
    key: "dui",
    type: "text",
    label: "No.de DUI",
    placeholder: "Ej.: XXXXXXXX-X",
    xs: 24,
    md: 8,
  },
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Edición de Usuarios" },
];
