import type { FieldConfig } from "../../../interfaces/components.interface";
import type { FiltersUserDto } from "../../../interfaces/user.interface";

const countryOptions = [
  { value: "sv", label: "El Salvador" },
  { value: "mx", label: "México" },
  { value: "gt", label: "Guatemala" },
];
const usersOptions = [
  { value: "Burns Bay Road" },
  { value: "Downing Street" },
  { value: "Wall Street" },
];

export const configForm = (): FieldConfig<FiltersUserDto>[] => [
  {
    key: "rol",
    type: "select",
    label: "Rol",
    placeholder: "Elige Rol",
    xs: 8,
    options: countryOptions,
  },
  {
    key: "sucursal",
    type: "select",
    label: "Sucursal",
    placeholder: "Elige Sucursal",
    xs: 8,
    options: countryOptions,
  },
  {
    key: "pais",
    type: "select",
    label: "País",
    placeholder: "Elige País",
    xs: 8,
    options: countryOptions,
  },
  {
    key: 'busqueda',
    label: 'Búsqueda Usuario',
    type: 'autocomplete',
    placeholder: 'Escribe para buscar...',
    options: usersOptions,
    xs: 24
  }
];
