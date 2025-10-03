import { Form, Select } from 'antd';
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const { Option } = Select;

const CustomSelect = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, placeholder, options = [], } = fieldConfig 

  return (
    <Form.Item
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16 }}
      label={label}
      layout = "vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={placeholder}
            value={field.value ?? undefined}
            onBlur={field.onBlur}
            size="large"
            optionFilterProp="label"
            showSearch
            style={{ width: "100%" }}
          >
            {options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
                label={option.label}
              >
                {option.label}
              </Option>
            ))}
          </Select>
        )}
      />
    </Form.Item>
  );
};

export default CustomSelect;