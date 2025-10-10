import type { FormFieldProps } from "../../interfaces/components.interface";
import DatePickerCustom from "../date-picker/date-picker.component";
import CounterInput from "../input-counter/input-counter.component";
import InputNumberCustom from "../input-number/input-number.component";
import InputPassword from "../input-password/input-password.component";
import InputText from "../input-text/input-text.component";
import RadioGroupCustom from "../radio-group/radio-group.component";
import ReadOnlyField from "../read-only/read-only.component";
import {SelectMenu} from "../select-menu/select-menu.component";
import CustomSelect from "../select/select.component";
import SwitchCustom from "../switch/switch.component";
import TextAreaCustom from "../text-area/text-area.component";
import TitleCustom from "../title/title.component";

const fieldMap: Record<string, React.FC<any>> = {
  text: InputText,
  password: InputPassword,
  selectMenu: SelectMenu,
  select: CustomSelect,
  switch: SwitchCustom,
  readOnly: ReadOnlyField,
  radio: RadioGroupCustom,
  date: DatePickerCustom,
  number: InputNumberCustom,
  title: TitleCustom,
  textArea:TextAreaCustom,
  counter:CounterInput
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
