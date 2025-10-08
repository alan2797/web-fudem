import type { BranchDto } from "../../../../interfaces/branch.interface";
import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { CountryDto } from "../../../../interfaces/country.interface";
import type { FiltersUserDto } from "../../../../interfaces/user.interface";

const rolOptions = [
  { value: true, label: "Administrador" },
  { value: false, label: "Usuario Normal" },
];

const StatusOptions = [
  { value: "all", label: "Todos" },
  { value: "active", label: "Activos" },
  { value: "locked", label: "Bloqueados" },
];

export const configFormUser = (catalogs: {
  countries: CountryDto[];
  branches: BranchDto[];
}): FieldConfig<FiltersUserDto>[] => [
  {
    key: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Ingrese nombre y/o apellido",
    xs: 24,
    md: 8,
  },
  {
    key: "isAdmin",
    type: "select",
    label: "Rol",
    placeholder: "Seleccione un Rol",
    xs: 24,
    md: 8,
    options: rolOptions,
    showSearch: true
  },
  {
    key: "branchId",
    type: "select",
    label: "Sucursal",
    placeholder: "Seleccione una Sucursal",
    xs: 24,
    md: 8,
    options: catalogs?.branches?.map((c) => ({
      label: c.name,
      value: c.id,
    })),
  },
  {
    key: "status",
    type: "select",
    label: "Estado",
    placeholder: "Seleccione un Estado",
    xs: 24,
    md: 8,
    options: StatusOptions,
  },
  {
    key: "countryId",
    type: "select",
    label: "País",
    placeholder: "Seleccione un País",
    xs: 24,
    md: 8,
    options: catalogs?.countries?.map((c) => ({
      label: c.name,
      value: c.id,
    })),
  }
];

export const breadcrumb = [
  { label: "Inicio", path: "/" },
  { label: "Lista de Usuarios" },
];
