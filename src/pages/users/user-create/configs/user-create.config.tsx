import { LockOutlined, ProfileOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CatalogsUserDto, CreateUserDto, CreateUserPasswordDto, CreateUserWorkProfileDto } from "../../../../interfaces/user.interface";
import { Button } from "antd";
import type { ChangePasswordRequestDto } from "../../../../interfaces/login.interface";
import type { CountryDto } from "../../../../interfaces/country.interface";
import type { BranchDto } from "../../../../interfaces/branch.interface";


const rolOptions = [
  { value: true, label: "Administrador" },
  { value: false, label: "Usuario Normal" },
];
const sucursalOptions = [

  { value: "sn", label: "Sucursal Norte" },
  { value: "sc", label: "Sucursal Central" },
  { value: "ss", label: "Sucursal Sur" },
];

const StatusOptions = [

  { value: "active", label: "Activo" },
  { value: "blocked", label: "Bloqueado" }
];
export const configForm = (): FieldConfig<CreateUserDto>[] => [
  {
    key: "firstName",
    type: "text",
    label: "Nombre",
    typeValue: "string",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [
      { type: "required"},
      { type: "min", value: 2}
    ],
  },
  {
    key: "lastName",
    type: "text",
    typeValue: "string",
    label: "Apellido",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [
      { type: "required" },
      { type: "min", value: 2 }
    ],
  },
  {
    key: "username",
    type: "text",
    typeValue: "string",
    label: "Nombre de Usuario",
    placeholder: "Ingrese Usuario",
    xs: 24,
    md: 8,
    validations: [
      { type: "required" },
    ],
  },
  {
    key: "email",
    type: "text",
    typeValue: "string",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 8,
    validations: [
      { type: "required"},
      { type: "email"}
    ],
  },
  {
    key: "dui",
    type: "text",
    typeValue: "string",
    label: "DUI",
    placeholder: "Ingrese DUI",
    xs: 24,
    md: 8,
    validations: [
      { type: "required" },
      { type: "min", value: 9 }
    ],
  },
  {
    key: "isAdmin",
    type: "select",
    label: "Rol",
    typeValue: "boolean",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
     validations: [
      { type: "required"},
    ],
  },
  {
    key: "branchId",
    type: "select",
    typeValue: "number",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 12,
    options: [],
    validations: [
      { type: "required" },
    ]
  },
  {
    key: "status",
    typeValue: "string",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 12,
    options: StatusOptions,
    showSearch: true,
    valueInitial: "active",
    validations: [
      { type: "required" },
    ],
    
  }
];

export const configFormPassword = (): FieldConfig<CreateUserPasswordDto>[] => [
    {
        key: "autoPassword",
        type: "switch",
        typeValue: 'boolean',
        label: "Contraseña Automatica",
        valueInitial: false,
        xs: 24,
        validations: [
            { type: "required", message: "La confirmación de la contraseña es obligatoria"}
        ],
    },
     {
        key: "password",
        type: "password",
        typeValue: 'string',
        showAllErrors: true,
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
        ]
    },
    {
        key: "confirmPassword",
        type: "password",
        typeValue: 'string',
        label: "Confirma Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required", message: "La confirmación de la contraseña es obligatoria"},
            { type: "matchField", field: "password", message: "Las contraseñas no coinciden" }
        ],
    }
]

export const configFormStep3 = (): FieldConfig<CreateUserWorkProfileDto>[] => [
  {
    key: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 6,
    validations: [
      { type: "required", message: "El Nombre es obligatorio" },
      { type: "min", value: 2 , message: "El Nombre debe contener mínimo 2 Caracteres" }
    ],
  },
  {
    key: "branchId",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 6,
    options: [],
    validations: [
      { type: "required", message: "debe seleccionar una sucursal es obligatorio" },
    ]
  },
  {
    key: "areaId",
    type: "select",
    label: "Funcion",
    placeholder: "Seleccione una Funcion",
    xs: 24,
    md: 6,
    options: sucursalOptions,
    validations: [
      { type: "required", message: "debe seleccionar una funcion es obligatorio" },
    ]
  },
  {
    key: "positionId",
    type: "select",
    label: "Locación",
    placeholder: "Seleccione una Locación",
    xs: 24,
    md: 6,
    options: sucursalOptions,
    validations: [
      { type: "required", message: "debe seleccionar una locación es obligatorio" },
    ]
  }
];


export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Crear Usuario" },
];

export const steps = [
  { title: "Detalle", icon2: <UserOutlined />},
  { title: "Contraseña", icon2:  <LockOutlined />},
];