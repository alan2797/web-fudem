import type { ButtonProps } from 'antd';
import type { ReactNode } from 'react';
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
   // Propiedades específicas para SelectMenu (opcionales)
  options?: Array<{ label: string; value: string | number }>;
  icon?: ReactNode;
  color?: string;
  size?: 'small' | 'middle' | 'large';
}

export interface FormFieldProps<T extends Record<string, unknown> = Record<string, unknown>> {
  fieldConfig: FieldConfig<T>;
  control: Control<T>;
  error?: string;
}
export interface ApiResponse<T = any> {
  timestamp: string;      // Fecha y hora de la respuesta
  path: string;           // Endpoint que se llamó
  status: number;         // Código HTTP
  success: boolean;       // Éxito de la operación
  message: string;        // Mensaje descriptivo
  data: T;                // Contenido de la respuesta, genérico
  error: string | null | object;   // Mensaje de error, si existe
}

export interface HandleOptions {
  showSpinner?: boolean;
  successMessage?: string;
  errorMessage?: string;
  showMessageApi?: boolean
}

export interface ButtonCustomProps extends ButtonProps {
  to?: string;          // ruta a la que navegará
  text?: string | ReactNode;        // texto del botón
}

