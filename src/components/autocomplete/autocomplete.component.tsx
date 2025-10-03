import { Form, AutoComplete } from 'antd';
import { Controller } from "react-hook-form";
import type { FormFieldProps } from "../../interfaces/components.interface";

const CustomAutoComplete = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, placeholder, options = [] } = fieldConfig;

  // Convertir las options a formato que espera AutoComplete
  const autoCompleteOptions = options.map(option => ({
    value: option.value.toString(),
    label: option.label,
  }));

  return (
    <Form.Item
      validateStatus={error ? "error" : undefined}
      help={error}
      style={{ marginBottom: 16 }}
      label={label}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <AutoComplete
            {...field}
            placeholder={placeholder}
            value={field.value ?? undefined}
            onBlur={field.onBlur}
            onChange={(value) => {
              console.log('🔹 Valor seleccionado:', value);
              // Buscar la opción completa
              const selectedOption = options.find(opt => 
                opt.value.toString() === value
              );
              console.log('🔹 Opción completa:', selectedOption);
              console.log('🔹 Campo:', String(key));
              
              field.onChange(value);
            }}
            size="large"
            style={{ width: "100%" }}
            options={autoCompleteOptions}
            filterOption={(inputValue, option) =>
              option!.value.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
            }
          />
        )}
      />
    </Form.Item>
  );
};

export default CustomAutoComplete;