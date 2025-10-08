import { Form, Select } from 'antd';
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const { Option } = Select;

const CustomSelect = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, placeholder, options = [], showSearch = false } = fieldConfig;

  // Safe error message handling
  let displayError = error;
  if (error && typeof error === 'string') {
    displayError = error.includes("Invalid input") ? "El campo es requerido" : error;
  }

  // Función para manejar el clear con valores por defecto según typeValue
  const getDefaultValue = () => {
    switch (fieldConfig.typeValue) {
      case 'string':
        return "";
      case 'number':
        return null;
      case 'boolean':
        return false;
      default:
        return null;
    }
  };

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
            value={field.value ?? undefined}
            onBlur={field.onBlur}
            size="large"
            optionFilterProp="label"
            style={{ width: "100%" }}
            showSearch={showSearch}
          >
            {options.map((option) => (
              <Option
                key={option.value as any}
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