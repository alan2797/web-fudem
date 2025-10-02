
import type { FieldConfig } from "../../interfaces/components.interface";
import type { ChangePasswordRequestDto } from "../../interfaces/login.interface";



export const configFormChangePassword = (): FieldConfig<ChangePasswordRequestDto>[] => [
     {
        key: "newPassword",
        type: "password",
        label: "Ingresa Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required"},
            { type: "min", value: 8},
            {type: "email"}
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
            {type: "required", message: "La confirmación de la contraseña es obligatoria"},
        ],
    }
]