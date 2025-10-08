import { Form, Select } from 'antd';
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const { Option } = Select;

const CustomSelect = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, placeholder, options = [], showSearch = false, disabled=false } = fieldConfig;

  // Safe error message handling
  let displayError = error;
  if (error && typeof error === 'string') {
    displayError = error.includes("Invalid input") ? "El campo es requerido" : error;
  }

  return (
    <Form.Item
      validateStatus={error ? "error" : undefined}
      help={displayError}
      style={{ marginBottom: 16 }}
      label={label}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            placeholder={placeholder}
            value={field.value === "" ? undefined : field.value}
            onBlur={field.onBlur}
            size="large"
            optionFilterProp="label"
            style={{ width: "100%" }}
            showSearch = {showSearch}
            disabled = {disabled}
          >
            {options.map((option) => (
              <Option
                key={String(option.value)}
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