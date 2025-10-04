import { z, ZodObject, type ZodTypeAny } from "zod";
import type { FieldConfig } from "../interfaces/components.interface";

export const generateZodSchema = <T extends Record<string, any>>(
  fields: FieldConfig<T>[]
) => {
  const shape: Record<string, ZodTypeAny> = {};
  const matchFieldValidations: {
    key: string;
    field: string;
    message?: string;
  }[] = [];

  fields.forEach((field) => {
    let schema: ZodTypeAny = z.string();

    field.validations?.forEach((val) => {
      switch (val.type) {
        case "required":
          schema = (schema as z.ZodString).nonempty(val.message || "El campo es requerido");
          break;
        case "min":
          schema = (schema as z.ZodString).min(val.value, val.message || "El campo requiere minimo " + val.value + " caracteres");
          break;
        case "max":
          schema = (schema as z.ZodString).max(val.value, val.message || "El campo requiere maximo " + val.value + " caracteres");
          break;
        case "email":
          schema = (schema as z.ZodString).email(val.message || "Formato de correo inválido");
          break;
        case "matches":
          schema = (schema as z.ZodString).regex(val.regex, val.message);
          break;
        case "passwordSpecialChar":
          schema = (schema as z.ZodString).regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            val.message || "Debe contener al menos un carácter especial"
          );
          break;
        case "passwordNumber":
          schema = (schema as z.ZodString).regex(
            /\d/,
            val.message || "Debe contener al menos un número"
          );
          break;
        case "passwordUpper":
          schema = (schema as z.ZodString).regex(
            /[A-Z]/,
            val.message || "Debe contener al menos una letra mayúscula"
          );
          break;
        case "passwordLower":
          schema = (schema as z.ZodString).regex(
            /[a-z]/,
            val.message || "Debe contener al menos una letra minúscula"
          );
          break;
        case "matchField":
          matchFieldValidations.push({
            key: field.key as string,
            field: val.field as string,
            message: val.message,
          });
          break;
      }
    });

    shape[field.key as string] = schema;
  });
   // Creamos el schema base
   let schema = z.object(shape) as ZodObject<Record<keyof T, ZodTypeAny>>;

   // Aplicamos los refinamientos de "matchField"
   matchFieldValidations.forEach((mf) => {
     schema = schema.refine(
       (data: any) => data[mf.key] === data[mf.field],
       {
         message: mf.message || `El campo ${mf.key} debe coincidir con ${mf.field}`,
         path: [mf.key],
       }
     );
   });
 
   return schema;
};

export const buildDefaultValues = <T extends Record<string, any>>(fields: FieldConfig<T>[]): T =>
  fields.reduce(
    (acc, field) => ({ ...acc, [field.key]: field.valueInitial }),
    {} as T
  );
  
 