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
    let schema: ZodTypeAny;
    
    switch (field.typeValue) {
      case "string":
        schema = z.string();
        break;
      case "number":
        schema = z.number();
        break;
      case "boolean":
        schema = z.boolean();
        break;
      default:
        schema = z.string(); // Por defecto string
    }
    field.validations?.forEach((val) => {
      switch (val.type) {
        case "required":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).nonempty(val.message || "El campo es requerido");
          } else if (field.typeValue === "number") {
            schema = (schema as z.ZodNumber).min(0.0001, val.message || "El campo es requerido");
          } else if (field.typeValue === "boolean") {
            // Para boolean, required significa que debe ser true
            schema = (schema as z.ZodBoolean).refine(
              (value) => value === true || value === false, 
              val.message || "Este campo debe ser aceptado"
            );
          }
          break;
        case "min":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).min(val.value, val.message || `El campo requiere mínimo ${val.value} caracteres`);
          } else if (field.typeValue === "number") {
            schema = (schema as z.ZodNumber).min(val.value, val.message || `El valor debe ser mayor o igual a ${val.value}`);
          }
          break;
        case "max":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).max(val.value, val.message || `El campo requiere máximo ${val.value} caracteres`);
          } else if (field.typeValue === "number") {
            schema = (schema as z.ZodNumber).max(val.value, val.message || `El valor debe ser menor o igual a ${val.value}`);
          }
          break;
        case "email":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).email(val.message || "Formato de correo inválido");
          }
          break;
        case "matches":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(val.regex, val.message);
          }
          break;
        case "passwordSpecialChar":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(
              /[!@#$%^&*(),.?":{}|<>]/,
              val.message || "Debe contener al menos un carácter especial"
            );
          }
          break;
        case "passwordNumber":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(
              /\d/,
              val.message || "Debe contener al menos un número"
            );
          }
          break;
        case "passwordUpper":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(
              /[A-Z]/,
              val.message || "Debe contener al menos una letra mayúscula"
            );
          }
          break;
        case "passwordLower":
          if (field.typeValue === "string") {
            schema = (schema as z.ZodString).regex(
              /[a-z]/,
              val.message || "Debe contener al menos una letra minúscula"
            );
          }
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
    (acc, field) => ({ ...acc, [field.key]: field.valueInitial ?? getDefaultValueByType(field.typeValue)  }),
    {} as T
  );

  // Función auxiliar para obtener valores por defecto según el tipo
const getDefaultValueByType = (typeValue?: string): any => {
  switch (typeValue) {
    case "number":
      return null;
    case "boolean":
      return false;
    case "string":
    default:
      return '';
  }
};
  
 