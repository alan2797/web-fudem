import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { FiltersUserDto } from "../../../../interfaces/user.interface";

const countryOptions = [
  { value: "sv", label: "El Salvador" },
  { value: "mx", label: "México" },
  { value: "gt", label: "Guatemala" },
];
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

const perfilOptions = [

  { value: "p1", label: "perfil 1" },
  { value: "p2", label: "perfil 2" },
  { value: "p3", label: "perfil 3" },
];

const StatusOptions = [

  { value: "active", label: "Activos" },
  { value: "blocked", label: "Bloqueados" },
  { value: "all", label: "Todos" },
];
export const configForm = (): FieldConfig<FiltersUserDto>[] => [
  {
    key: "nombre",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese nombre y/o apellido",
    xs: 24,
    md: 8,
  },
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
  },
  {
    key: "perfil",
    type: "select",
    label: "Perfil",
    placeholder: "Seleccione un perfil",
    xs: 24,
    md: 8,
    options: perfilOptions,
  },
  {
    key: "sucursal",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 8,
    options: sucursalOptions,
  },
  {
    key: "estado",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 8,
    options: StatusOptions,
  },
  {
    key: "pais",
    type: "select",
    label: "País",
    placeholder: "Seleccione un País",
    xs: 24,
    md: 8,
    options: countryOptions,
  }
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Lista de Usuarios" },
];
