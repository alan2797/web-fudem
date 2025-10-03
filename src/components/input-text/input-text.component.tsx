import { Form, Input } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const InputText = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {key, label, placeholder } = fieldConfig;

  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16 }}
      layout="vertical"
    >
       <Controller
        name={key as any}
        control={control}
        render={({ field }) => 
          <Input
            {...{
              placeholder,
              value: (field.value ?? "") as string,
              onChange: field.onChange,
              onBlur: field.onBlur,
              size: 'large'
            }}
        />}
      />
    </Form.Item>
  );
};

export default InputText;
