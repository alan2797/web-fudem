import { Form, } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";
import Title from "antd/es/typography/Title";

const ReadOnlyField = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const {key, label, level, valueInitial } = fieldConfig;

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
        render={({ field }) => (
          <Title level={level} style={{ margin: 0, color: '#1f1e1eff' }}>
            {(field.value ?? valueInitial ?? "") as string}
          </Title>
        )}
      />
    </Form.Item>
  );
};

export default ReadOnlyField;
