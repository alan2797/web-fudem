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


// Interface GenericTable
/* export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterConfig {
  key: string;
  placeholder: string;
  type?: "text" | "select" | "button";
  options?: FilterOption[];
  onFilter?: (value: string) => void;
  col?: number; // 👈 cantidad de columnas (1-24 en AntD)
  buttonProps?: { text: string; onClick: () => void };
}

export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export interface GenericTableProps<T> {
  columns: ColumnsType<T>;
  data: T[];
  filters?: FilterConfig[];
  pagination: PaginationConfig;
  onSearch?: (value: string) => void;
} */


export interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: any) => ReactNode;
  width?: number | string;
}

export interface FilterColumn {
  key: string;
  content: ReactNode;
  span?: number;
}

export interface Pagination {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageSizeOptions?: string[];
}

export interface TableProps {
  data: any[];
  columns: Column[];
  filters?: FilterColumn[];
  pagination?: Pagination;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSort?: (key: string, direction: 'asc' | 'desc') => void;
  loading?: boolean;
  scroll?: { x?: number | string; y?: number | string };
}