
import type { FieldConfig, TabItem } from "../../../../interfaces/components.interface";
import type { CreateUserDto } from "../../../../interfaces/user.interface";

const rolOptions = [
  { value: true, label: "Administrador" },
  { value: false, label: "Usuario Normal" },
];

const StatusOptions = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "blocked", label: "Bloqueados" },
];

// Formulario Tab1
export const configFormTab1 = (): FieldConfig<CreateUserDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Nombre de Usuario",
    xs: 24,
    md: 8,
    valueInitial: "JMARTINEZ",
    disabled: true
  },
  {
    key: "name",
    type: "text",
    label: "Nombres",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "lastname",
    type: "text",
    label: "Apellidos",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "divider1",
    type: "divider",
    label: "Información Personal",
    xs: 24,
    md: 24,
  },
  {
    key: "email",
    type: "text",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }, { type: "email" }],
  },
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "branch",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "dui",
    type: "text",
    label: "No.de DUI",
    placeholder: "Ej.: XXXXXXXX-X",
    xs: 24,
    md: 8,
  },
  {
    key: "estado",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 8,
    options: StatusOptions,
  }
];

export const configFormTab2 = (): FieldConfig<CreateUserDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Nombre de Usuario",
    xs: 24,
    md: 8,
    valueInitial: "JMARTINEZ",
    disabled: true
  },
  {
    key: "name",
    type: "text",
    label: "Nombres",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "lastname",
    type: "text",
    label: "Apellidos",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "divider1",
    type: "divider",
    label: "Información Personal",
    xs: 24,
    md: 24,
  },
  {
    key: "email",
    type: "text",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }, { type: "email" }],
  },
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "branch",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "dui",
    type: "text",
    label: "No.de DUI",
    placeholder: "Ej.: XXXXXXXX-X",
    xs: 24,
    md: 8,
  },
  {
    key: "estado",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 8,
    options: StatusOptions,
  }
];

export const configFormTab3 = (): FieldConfig<CreateUserDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Nombre de Usuario",
    xs: 24,
    md: 8,
    valueInitial: "JMARTINEZ",
    disabled: true
  },
  {
    key: "name",
    type: "text",
    label: "Nombres",
    placeholder: "Ingrese Nombre",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "lastname",
    type: "text",
    label: "Apellidos",
    placeholder: "Ingrese Apellido",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }],
  },
  {
    key: "divider1",
    type: "divider",
    label: "Información Personal",
    xs: 24,
    md: 24,
  },
  {
    key: "email",
    type: "text",
    label: "Email",
    placeholder: "Ingrese Email",
    xs: 24,
    md: 8,
    validations: [{ type: "required" }, { type: "email" }],
  },
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "branch",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "dui",
    type: "text",
    label: "No.de DUI",
    placeholder: "Ej.: XXXXXXXX-X",
    xs: 24,
    md: 8,
  },
  {
    key: "estado",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 8,
    options: StatusOptions,
  }
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Edición de Usuarios" },
];

export const tabsItems: TabItem[] = [
  {
    key: "1",
    label: "Detalles",
  },
  {
    key: "2",
    label: "Seguridad",
  },
  {
    key: "3",
    label: "Perfil de Trabajo",
  },
];