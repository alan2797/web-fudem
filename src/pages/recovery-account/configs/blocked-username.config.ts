import type { FieldConfig } from "../../../interfaces/components.interface";
import type { BlockedUsernameRequestDto } from "../../../interfaces/login.interface";

export const configFormBlockedUsername =
  (): FieldConfig<BlockedUsernameRequestDto>[] => [
    {
      key: "username",
      type: "text",
      label: "Ingrese su usuario",
      valueInitial: "",
      xs: 24,
      validations: [{ type: "required" }],
    },
    {
      key: "email",
      type: "text",
      label: "Ingrese su correo",
      valueInitial: "",
      xs: 24,
      validations: [{ type: "required" }, { type: "email" }],
    },
  ];
