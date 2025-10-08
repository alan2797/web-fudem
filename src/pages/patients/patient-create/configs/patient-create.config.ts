import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CreateExpedientPatientDto } from "../../../../interfaces/user.interface";

const rolOptions = [
  { value: "adm", label: "Admin" },
  { value: "ven", label: "Vendedor" },
  { value: "sup", label: "Supervisor" },
];
const documentOption = [
  { value: "dui", label: "DUI" },
  { value: "nit", label: "NIT" },
  { value: "ps", label: "Pasaporte" },
];

const StatusOptions = [
  { value: "active", label: "Activos" },
  { value: "blocked", label: "Bloqueados" },
  { value: "all", label: "Todos" },
];
export const configForm = (): FieldConfig<CreateExpedientPatientDto>[] => [
  {
    key: "medicalRecord",
    type: "readOnly",
    label: "No. de Expediente",
    valueInitial: "12345678-9",
    xs: 24,
    level: 4,
    md: 12,
  },
  {
    key: "recordDate",
    type: "readOnly",
    label: "Fecha de Registro",
    valueInitial: "12/07/2022",
    level: 4,
    xs: 24,
    md: 12,
  },
  {
    key: "firstName",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El nombre es obligatorio" },
      {
        type: "min",
        value: 2,
        message: "El nombre debe contener mínimo 2 Caracteres",
      },
    ],
  },
  {
    key: "lastName",
    type: "text",
    label: "Apellidos",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El nombre usuario es obligatorio" },
    ],
  },
  {
    key: "nationality",
    type: "select",
    label: "Nacionalidad",
    placeholder: "Seleccione una Nacionalidad",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una nacionalidad es obligatorio",
      },
    ],
  },
  {
    key: "dateOfBirth",
    type: "date",
    label: "Fecha de Nacimiento",
    placeholder: "dd/mm/aaaa",
    xs: 24,
    md: 12,
    validations: [
      { type: "required", message: "La Fecha de Nacimiento es obligatorio" },
    ],
  },
  {
    key: "age",
    type: "number",
    label: "Edad",
    min: 0,
    max: 120,
    xs: 24,
    md: 12,
    validations: [
      { type: "required", message: "El campo edad es obligatorio" },
    ],
  },
  {
    key: "lead",
    type: "readOnly",
    valueInitial:
      "Si el paciente es menor de edad, se necesita insertar el nombre y apellido del Encargado/a",
    xs: 24,
    md: 24,
    level: 5,
  },
  {
    key: "parentFirstName",
    type: "text",
    label: "Nombre del Encargado/a",
    placeholder: "Ej: Tatiana",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El nombre del encargado/a es obligatorio" },
    ],
  },
  {
    key: "parentLastName",
    type: "text",
    label: "Apellido del Encargado/a",
    placeholder: "Ej: Valle",
    xs: 24,
    md: 8,
    validations: [
      {
        type: "required",
        message: "El apellido del encargado/a  es obligatorio",
      },
    ],
  },
  {
    key: "relationShip",
    type: "select",
    label: "Parentesco",
    placeholder: "Elegir Parentesco",
    xs: 24,
    md: 8,
    options: StatusOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una educación es obligatorio",
      },
    ],
  },
  {
    key: "documentType",
    type: "select",
    label: "Tipo de Documento",
    placeholder: "Elegir Documento",
    xs: 24,
    md: 8,
    options: documentOption,
    validations: [
      {
        type: "required",
        message: "debe seleccionar un tipo de documento es obligatorio",
      },
    ],
  },
  {
    key: "noDocument",
    type: "text",
    label: "Número de Documento",
    placeholder: "0145236-8",
    xs: 24,
    md: 8,
    validations: [
      {
        type: "required",
        message: "El Número de Documento es obligatorio",
      },
    ],
  },
  {
    key: "gender",
    label: "Género",
    type: "radio",
    options: [
      { value: "M", label: "Masculino" },
      { value: "F", label: "Femenino" },
    ],
    xs: 24,
    md: 8,
  },
  {
    key: "readAndWrite",
    label: "Lee y Escribe?",
    type: "radio",
    options: [
      { value: "y", label: "Si" },
      { value: "n", label: "No" },
    ],
    xs: 24,
    md: 4,
  },
  {
    key: "country",
    type: "select",
    label: "País",
    placeholder: "Elegir Pais",
    xs: 24,
    md: 6,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una educación es obligatorio",
      },
    ],
  },
  {
    key: "code",
    type: "number",
    label: "Codigo País",
    addonBefore:"+",
    min: 1,
    max: 120,
    xs: 24,
    md: 3,
    validations: [
      { type: "required", message: "El campo edad es obligatorio" },
    ],
  },
  {
    key: "phoneNumber1",
    type: "number",
    label: "Telefono Fijo",
    min: 0,
    max: 99999999,
    xs: 24,
    md: 4,
    validations: [
      { type: "required", message: "El campo edad es obligatorio" },
    ],
  },
  {
    key: "code",
    type: "number",
    label: "Codigo País",
    addonBefore:"+",
    min: 1,
    max: 120,
    xs: 24,
    md: 3,
    validations: [
      { type: "required", message: "El campo edad es obligatorio" },
    ],
  },
  {
    key: "phoneNumber2",
    type: "number",
    label: "Telefono Movíl",
    min: 0,
    max: 99999999,
    xs: 24,
    md: 4,
    validations: [
      { type: "required", message: "El campo edad es obligatorio" },
    ],
  },
  {
    key: "department",
    type: "select",
    label: "Departamento",
    placeholder: "Elegir Departamento",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar un Departamento es obligatorio",
      },
    ],
  },
  {
    key: "municipality",
    type: "select",
    label: "Municipio",
    placeholder: "Elegir Municipio",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar un Municipio es obligatorio",
      },
    ],
  },
  {
    key: "address",
    type: "text",
    label: "Dirección",
    placeholder: "Ingrese su direccion",
    xs: 24,
    md: 8,
    validations: [
      {
        type: "required",
        message: "El Número de Dirección es obligatorio",
      },
    ],
  },

  {
    key: "housingLocation",
    label: "Ubicación de Vivienda",
    type: "radio",
    options: [
      { value: "urban", label: "Urban" },
      { value: "rural", label: "Rural" },
    ],
    xs: 24,
    md: 12,
  },
  {
    key: "email",
    type: "text",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 12,
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "email", message: "El email debe ser un correo válido" },
    ],
  },
  {
    key: "education",
    type: "select",
    label: "Educación",
    placeholder: "Elegir Educación",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una educación es obligatorio",
      },
    ],
  },
  {
    key: "ocupation",
    type: "select",
    label: "Ocupación",
    placeholder: "Elegir Ocupación",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una ocupación es obligatorio",
      },
    ],
  },
  {
    key: "category",
    type: "select",
    label: "Categoria",
    placeholder: "Elegir Categoria",
    xs: 24,
    md: 8,
    options: rolOptions,
    validations: [
      {
        type: "required",
        message: "debe seleccionar una categoria es obligatorio",
      },
    ],
  },
  {
    key: "wearsGlasses",
    type: "radio",
    label: "Usa Lentes?",
    xs: 24,
    md: 8,
    options: [
      { value: "y", label: "Si" },
      { value: "n", label: "No" },
    ],
    validations: [
      { type: "required", message: "Debe seleccionar un campo es obligatorio" },
    ],
  },
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Crear Paciente" },
];
