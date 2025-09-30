import type { ChangePasswordRequestDto } from "../../interfaces/change-password.interface";
import type { FieldConfig } from "../../interfaces/components.interface";



export const configFormChangePassword = (): FieldConfig<ChangePasswordRequestDto>[] => [
     {
        key: "newPassword",
        type: "password",
        label: "Ingresa Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
        { type: "required"},
        { type: "min", value: 8, message: "Mínimo 8 caracteres" },
        {type: "email"}
        ],
    },
    {
        key: "confirmPassword",
        type: "password",
        label: "Confirma Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            {type: "required", message: "La confirmación de la contraseña es obligatoria"},
        ],
    }
]