import type { FieldConfig } from "../../../../interfaces/components.interface";
import type { LoginRequestDto } from "../../../../interfaces/login.interface";

const countryOptions = [
  { value: "sv", label: "El Salvador" },
  { value: "mx", label: "México" },
  { value: "gt", label: "Guatemala" },
];

export const configForm = (): FieldConfig<LoginRequestDto>[] => [
  {
    key: "city1",
    type: "select",
    label: "Ciudad",
    placeholder: "Seleccione una ciudad",
    xs: 24,
    md: 8,
    options: countryOptions,
  },
  {
    key: "pais1",
    type: "select",
    label: "Pais",
    placeholder: "Seleccione un pais",
    xs: 24,
    md: 8,
    options: countryOptions,
  },
  {
    key: "prov1",
    type: "select",
    label: "Provincia",
    placeholder: "Seleccione una provincia",
    xs: 24,
    md: 8,
    options: countryOptions,
  }
];
