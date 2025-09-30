import type { FieldConfig } from "../../../interfaces/components.interface";
import type { ForgotUsernameRequestDto } from "../../../interfaces/forgot-username.interface";


export const configFormForgotUsername = (): FieldConfig<ForgotUsernameRequestDto>[] => [
     {
        key: "email",
        type: "text",
        label: "Coloque el correo que esta vinculado con su usuario",
        valueInitial: "",
        xs: 24,
        validations: [
            { type: "required"},
            {type: "email"}
        ],
    }
]