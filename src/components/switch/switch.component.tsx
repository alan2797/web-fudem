// SwitchCustom.tsx
import { Form, Switch } from "antd";
import type { FormFieldProps } from "../../interfaces/components.interface";
import { Controller } from "react-hook-form";

const SwitchCustom = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
  const { key, label, checkedChildren = "", unCheckedChildren = "" } = fieldConfig;

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
          <Switch
            checked={!!field.value} // convertimos a boolean
            onChange={field.onChange}
            checkedChildren={checkedChildren}
            unCheckedChildren={unCheckedChildren}
            size="default"
          />
        )}
      />
    </Form.Item>
  );
};

export default SwitchCustom;
