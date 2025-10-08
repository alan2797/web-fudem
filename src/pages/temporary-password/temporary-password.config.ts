
import type { FieldConfig } from "../../interfaces/components.interface";
import type { ChangePasswordRequestDto } from "../../interfaces/login.interface";



export const configFormChangePassword = (): FieldConfig<ChangePasswordRequestDto>[] => [
     {
        key: "newPassword",
        type: "password",
        label: "Ingresa Nueva Contraseña",
        valueInitial: "",
        typeValue: "string",
        xs: 24,
        validations: [
            { type: "required"},
            { type: "min", value: 8, message: "Debe ser 8 caracteres"},
            { type: "passwordSpecialChar", message: "Debe contener al menos un carácter especial" },
            { type: "passwordNumber", message: "Debe contener al menos un número" },
            { type: "passwordUpper", message: "Debe contener al menos una letra mayúscula" },
            { type: "passwordLower", message: "Debe contener al menos una letra minúscula" }
        ],
        showAllErrors: true
    },
    {
        key: "confirmPassword",
        type: "password",
        typeValue: "string",
        label: "Confirma Nueva Contraseña",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required", message: "La confirmación de la contraseña es obligatoria"},
            { type: "matchField", field: "newPassword", message: "Las contraseñas no coinciden" }
        ],
    }
]