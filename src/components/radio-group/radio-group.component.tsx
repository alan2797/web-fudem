import { Form, Radio } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";


const RadioGroupCustom = <TFormValues extends Record<string, any>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
    const { key, label, options=[] } = fieldConfig;
  return (
    <Form.Item
      label={label}
      validateStatus={error ? "error" : ""}
      help={error || ""}
      layout="vertical"
    >
      <Controller
        name={key as any}
        control={control}
        render={({ field }) => (
          <Radio.Group
            {...field}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value)}
          >{options.map((opt) => (
              <Radio key={String(opt.value)} value={opt.value} className="mt-2">
                {opt.label}
              </Radio>
            ))}
            
          </Radio.Group>
        )}
      />
    </Form.Item>
  );
};

export default RadioGroupCustom;