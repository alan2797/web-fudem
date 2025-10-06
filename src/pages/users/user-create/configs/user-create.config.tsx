import { LockOutlined, ProfileOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CreateUserDto } from "../../../../interfaces/user.interface";
import { Button } from "antd";
import type { ChangePasswordRequestDto } from "../../../../interfaces/login.interface";


const rolOptions = [

  { value: "adm", label: "Admin" },
  { value: "ven", label: "Vendedor" },
  { value: "sup", label: "Supervisor" },
];
const sucursalOptions = [

  { value: "sn", label: "Sucursal Norte" },
  { value: "sc", label: "Sucursal Central" },
  { value: "ss", label: "Sucursal Sur" },
];

const StatusOptions = [

  { value: "active", label: "Activos" },
  { value: "blocked", label: "Bloqueados" },
  { value: "all", label: "Todos" },
];
export const configForm = (): FieldConfig<CreateUserDto>[] => [
  {
    key: "nombre",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El Nombre es obligatorio" },
      { type: "min", value: 2 , message: "El Nombre debe contener mínimo 2 Caracteres" }
    ],
  },
  {
    key: "apellido",
    type: "text",
    label: "Apellido",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "min", value: 2 , message: "El Apellido debe contener mínimo 2 Caracteres" }
    ],
  },
  {
    key: "usuario",
    type: "text",
    label: "Nombre de Usuario",
    placeholder: "Ingrese Usuario",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El nombre usuario es obligatorio" },
    ],
  },
  {
    key: "email",
    type: "text",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "email",message: "El email debe ser un correo válido" }
    ],
  },
  {
    key: "dui",
    type: "text",
    label: "DUI",
    placeholder: "Ingrese DUI",
    xs: 24,
    md: 8,
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "min", value: 9, message: "Mínimo 9 caracteres" }
    ],
  },
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
     validations: [
      { type: "required", message: "debe seleccionar un rol es obligatorio" },
    ],
  },
  {
    key: "sucursal",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 12,
    options: sucursalOptions,
    validations: [
      { type: "required", message: "debe seleccionar una sucursal es obligatorio" },
    ],
  },
  {
    key: "estado",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 12,
    options: StatusOptions,
    validations: [
      { type: "required", message: "debe seleccionar un estado es obligatorio" },
    ],
  }
];

export const configFormPassword = (): FieldConfig<ChangePasswordRequestDto>[] => [
     {
        key: "newPassword",
        type: "password",
        label: "Ingresa Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required"},
            { type: "min", value: 8, message: "Debe ser 8 caracteres"},
            { type: "passwordSpecialChar", message: "Debe contener al menos un carácter especial" },
            { type: "passwordNumber", message: "Debe contener al menos un número" },
            { type: "passwordUpper", message: "Debe contener al menos una letra mayúscula" },
            { type: "passwordLower", message: "Debe contener al menos una letra minúscula" }
        ],
        showAllErrors: true
    },
    {
        key: "confirmPassword",
        type: "password",
        label: "Confirma Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required", message: "La confirmación de la contraseña es obligatoria"},
            { type: "matchField", field: "newPassword", message: "Las contraseñas no coinciden" }
        ],
    }
]

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Crear Usuario" },
];

export const steps = [
  { title: "Detalle", icon2: <UserOutlined />},
  { title: "Contraseña", icon2:  <LockOutlined />},
  { title: "Perfil de Trabajo", icon2: <ProfileOutlined /> },
];