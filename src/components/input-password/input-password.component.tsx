import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const InputPassword = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error
}: FormFieldProps<TFormValues>) => {
  const { label, placeholder, key, showAllErrors } = fieldConfig;
  console.log("password: ", showAllErrors);

  const renderErrors = () => {
    if (!error) return undefined;
    console.log("error ", error);
    if(typeof error == 'string') return error; 
    // Si vienen múltiples errores (cuando criteriaMode="all")
    if (error?.types && showAllErrors) {
      return Object.values(error.types).flatMap((val) =>
        Array.isArray(val) ? val : [val]
      ).map((msg: any, i) => <div key={i}>{msg}</div>);
    }

    // Caso default: solo un error
    return error?.message;
  };

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={renderErrors()}
      style={{ marginBottom: 16 }}
    >
      <Controller
        name={key as any} // workaround para key genérico
        control={control}
        render={({ field }) => (
          <Input.Password
            placeholder={placeholder}
            value={(field.value ?? "") as string} // forzamos string
            onChange={field.onChange}
            onBlur={field.onBlur}
            visibilityToggle
            size="large"
          />
        )}
      />
    </Form.Item>
  );
};

export default InputPassword;
