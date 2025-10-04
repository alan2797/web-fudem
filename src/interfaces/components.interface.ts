import type { ButtonProps } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { ReactNode } from 'react';
import type { Control } from 'react-hook-form';

export type Validation =
  | { type: 'required'; message?: string }
  | { type: 'min'; value: number; message?: string }
  | { type: 'max'; value: number; message?: string }
  | { type: 'email'; message?: string }
  | { type: 'matches'; regex: RegExp; message?: string }
  | { type: 'passwordSpecialChar'; message?: string }
  | { type: 'passwordNumber'; message?: string }
  | { type: 'passwordUpper'; message?: string }
  | { type: 'passwordLower'; message?: string }
  | { type: 'matchField'; field: string; message?: string };

// export interface FieldConfig<T extends Record<string, unknown> = Record<string, unknown>> {
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
  showAllErrors?: boolean;
  validations?: Validation[];
  options?: SelectOption[];
  showSearch?: boolean;
}

export interface FormFieldProps<T extends Record<string, unknown> = Record<string, unknown>> {
  fieldConfig: FieldConfig<T>;
  control: Control<T>;
  error?: string | any;
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

export interface SelectOption {
  value: string | number | boolean;
  label?: string;
}

export interface SelectMenuConfigProps {
  placeholder?: string;
  options?: SelectOption[];
  icon?: ReactNode;
  color?: string;
  size?: "small" | "middle" | "large";
  showSearch?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
}

export interface TableCustomProps<T> {
  columns: ColumnsType<T>; // Columnas de la tabla
  dataSource?: T[];         // Datos
  rowKey: string;          // Clave única
  pageSize?: number;       // Paginación
  searchable?: boolean;    // Barra de búsqueda global
  selectable?: boolean;    // Si se pueden seleccionar filas
  onView?: (record: T) => void;
  onEdit?: (record: T) => void;
  onDelete?: (record: T) => void;
  extraActions?: (record: T) => React.ReactNode; // acciones adicionales
  newButtonLabel?: React.ReactNode; // <-- puede ser string o nodo
  showNewButton?: boolean;          // Flag para mostrar/ocultar
  onNewButtonClick?: () => void;    // Función al hacer click
  pageSizeOptions?: number[];
  onPageSizeChange?: (size: number) => void;
  showPageSize?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  path?: string; // opcional si quieres que sea clickeable
}
export interface PageContainerProps {
  title: string;
  icon?: ReactNode; // puede ser un ícono React
  children: ReactNode; // contenido de la página
  breadcrumb?: BreadcrumbItem[]; // lista de breadcrumb
}