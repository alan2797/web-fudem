import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CreateExpedientPatientDto } from "../../../../interfaces/user.interface";


export const configForm = (): FieldConfig<CreateExpedientPatientDto>[] => [
  {
    key: "medicalRecord",
    type: "readOnly",
    label: "No. de Expediente",
    valueInitial: "Exp8421",
    textTransform:"uppercase",
    xs: 24,
    md: 8,
  },
  {
    key: "patient",
    type: "readOnly",
    label: "Paciente",
    valueInitial: "Richar Payne",
    xs: 24,
    md: 11,
  },
   {
    key: "age",
    type: "readOnly",
    label: "Edad",
    valueInitial: "47",
    xs: 24,
    md: 5,
  },
  {
    key: "date",
    type: "readOnly",
    label: "Fecha",
    valueInitial: "10/10/2024",
    xs: 24,
    md: 8,
  },
  {
    key: "observations",
    type: "textArea",
    label: "Observaciones",
    placeholder:"Merliot",
    xs: 24,
    md: 16,
  },
  {
    key:"divider1",
    type:"divider",
    xs:24
  },
  
];

export const mockData = [
  {
    key: '1',
    medicalRecord: 'EXP-2023-001',
    name: 'María Elena Rodríguez',
    fechaNac: '1985-03-15',
    dpto: 'San Salvador',
    municipio: 'San Salvador',
    dui: '04567890-1'
  },
  {
    key: '2',
    medicalRecord: 'EXP-2023-002',
    name: 'Carlos Antonio Martínez',
    fechaNac: '1990-07-22',
    dpto: 'La Libertad',
    municipio: 'Santa Tecla',
    dui: '02345678-2'
  },
  {
    key: '3',
    medicalRecord: 'EXP-2023-003',
    name: 'Ana Isabel García',
    fechaNac: '1978-11-30',
    dpto: 'Sonsonate',
    municipio: 'Sonsonate',
    dui: '01234567-3'
  },
  {
    key: '4',
    medicalRecord: 'EXP-2023-004',
    name: 'José Luis Hernández',
    fechaNac: '1982-05-18',
    dpto: 'San Miguel',
    municipio: 'San Miguel',
    dui: '03456789-4'
  },
  {
    key: '5',
    medicalRecord: 'EXP-2023-005',
    name: 'Laura Patricia López',
    fechaNac: '1995-09-12',
    dpto: 'Santa Ana',
    municipio: 'Santa Ana',
    dui: '05678901-5'
  },
  {
    key: '6',
    medicalRecord: 'EXP-2023-006',
    name: 'Roberto Carlos Vásquez',
    fechaNac: '1988-12-03',
    dpto: 'La Libertad',
    municipio: 'Antiguo Cuscatlán',
    dui: '06789012-6'
  },
  {
    key: '7',
    medicalRecord: 'EXP-2023-007',
    name: 'Sofia Alejandra Ramírez',
    fechaNac: '1992-02-28',
    dpto: 'San Salvador',
    municipio: 'Soyapango',
    dui: '07890123-7'
  },
  {
    key: '8',
    medicalRecord: 'EXP-2023-008',
    name: 'Miguel Ángel Torres',
    fechaNac: '1975-08-14',
    dpto: 'La Paz',
    municipio: 'Zacatecoluca',
    dui: '08901234-8'
  }
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Crear Paciente" },
];
