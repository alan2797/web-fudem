import type { ButtonProps } from 'antd';
import type { Control } from 'react-hook-form';

export type Validation =
  | { type: 'required'; message?: string }
  | { type: 'min'; value: number; message?: string }
  | { type: 'max'; value: number; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'matches'; regex: RegExp; message?: string };

export interface FieldConfig<T extends Record<string, unknown> = Record<string, unknown>> {
  key: keyof T;
  label?: string;
  type?: 'text' | 'password' | string;
  placeholder?: string;
  valueInitial?: T[keyof T];
  xl?: string | number;
  lg?: string | number;
  md?: string | number;
  sm?: string | number;
  xs?: string | number;
  validations: Validation[];
}

export interface FormFieldProps<T extends Record<string, unknown> = Record<string, unknown>> {
  fieldConfig: FieldConfig<T>;
  control: Control<T>;
  error?: string;
}

export interface ButtonCustomProps extends ButtonProps {
  loading?: boolean;
  label?: string;
  block?: boolean;
}
