import type { FormFieldProps } from "../../interfaces/components.interface";
import InputPassword from "../input-password/input-password.component";
import InputText from "../input-text/input-text.component";
import {SelectMenu} from "../select-menu/select-menu.component";
import CustomSelect from "../select/select.component";
import SwitchCustom from "../switch/switch.component";

const fieldMap: Record<string, React.FC<any>> = {
  text: InputText,
  password: InputPassword,
  selectMenu: SelectMenu,
  select: CustomSelect,
  switch: SwitchCustom,
};

export const FormField = <TFormValues extends Record<string, unknown>>({
  fieldConfig,
  control,
  error,
}: FormFieldProps<TFormValues>) => {
    const Component = fieldMap[fieldConfig.type ?? "text"];
    if (!Component) return null;
    return <Component fieldConfig={fieldConfig} control={control} error={error}/>;
};
