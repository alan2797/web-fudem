import { z, ZodObject, type ZodTypeAny } from "zod";
import type { FieldConfig } from "../interfaces/components.interface";

export const generateZodSchema = <T extends Record<string, any>>(
  fields: FieldConfig<T>[]
) => {
  const shape: Record<string, ZodTypeAny> = {};

  fields.forEach((field) => {
    let schema: ZodTypeAny = z.string();

    field.validations?.forEach((val) => {
      switch (val.type) {
        case "required":
          schema = (schema as z.ZodString).nonempty(val.message || "Campo requerido");
          break;
        case "min":
          schema = (schema as z.ZodString).min(val.value, val.message);
          break;
        case "max":
          schema = (schema as z.ZodString).max(val.value, val.message);
          break;
        case "email":
          schema = (schema as z.ZodString).email(val.message || "Formato inválido");
          break;
        case "matches":
          schema = (schema as z.ZodString).regex(val.regex, val.message);
          break;
      }
    });

    shape[field.key as string] = schema;
  });
  console.log(shape);
  // Retornamos el ZodObject sin casteos peligrosos
  return z.object(shape) as ZodObject<Record<keyof T, ZodTypeAny>>;
};
