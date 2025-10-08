import type { FieldConfig } from "../../interfaces/components.interface";
import type { LoginRequestDto } from "../../interfaces/login.interface";

export const configForm = (): FieldConfig<LoginRequestDto>[] => [
  {
    key: "username",
    type: "text",
    label: "Correo o Usuario",
    placeholder: "Ingresa tu correo o usuario",
    valueInitial: "",
    typeValue: "string",
    xs: "12",
    validations: [
      { type: "required", message: "El email es obligatorio" },
      { type: "min", value: 3, message: "Mínimo 3 caracteres" }
    ],
  },
  {
    key: "password",
    type: "password",
    label: "Contraseña",
    placeholder: "Ingresa tu contraseña",
    valueInitial: "",
    typeValue: "string",
    xs: "12",
    validations: [
      { type: "required", message: "La contraseña es obligatoria" },
      { type: "min", value: 3, message: "Mínimo 3 caracteres" },
    ],
  },
];
