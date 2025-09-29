import { Form, Input } from "antd";
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const InputPassword = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { label, placeholder, key } = fieldConfig;

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error}
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
          />
        )}
      />
    </Form.Item>
  );
};

export default InputPassword;
