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
    key: "counter",
    label: "Frecuencia Cardiaca",
    type: "counter",
    min: 0,          
    max: 150,
    valueInitial:0,
    xs:24,
    md:12
  },
   {
    key: "ta",
    label: "TA",
    type: "counter",
    min: 0,          
    max: 150,
    valueInitial:80,
    xs:24,
    md:8
  },
   {
    key: "hgt",
    label: "HGT",
    type: "counter",
    min: 0,          
    max: 150,
    valueInitial:80,
    xs:24,
    md:16
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
    sheetId: 'HE-2024-001',
    date: '15/08/2024',
    status: 'Abierto'
  },
  {
    key: '2',
    sheetId: 'HE-2024-002',
    date: '14/08/2024',
    status: 'Cerrado'
  },
  {
    key: '3',
    sheetId: 'HE-2024-003',
    date: '13/08/2024',
    status: 'Abierto'
  },
  {
    key: '4',
    sheetId: 'HE-2024-004',
    date: '12/08/2024',
    status: 'Cerrado'
  },
  {
    key: '5',
    sheetId: 'HE-2024-005',
    date: '11/08/2024',
    status: 'Abierto'
  },
  {
    key: '6',
    sheetId: 'HE-2024-006',
    date: '10/08/2024',
    status: 'Cerrado'
  },
  {
    key: '7',
    sheetId: 'HE-2024-007',
    date: '09/08/2024',
    status: 'Abierto'
  },
  {
    key: '8',
    sheetId: 'HE-2024-008',
    date: '08/08/2024',
    status: 'Cerrado'
  },
  {
    key: '9',
    sheetId: 'HE-2024-009',
    date: '07/08/2024',
    status: 'Abierto'
  },
  {
    key: '10',
    sheetId: 'HE-2024-010',
    date: '06/08/2024',
    status: 'Cerrado'
  }
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Crear Paciente" },
];
