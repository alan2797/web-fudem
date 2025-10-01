import type { ReactNode } from "react";
export interface SelectMenuOption {
  value: string;
  label: string;
}

export interface SelectMenuConfigProps {
  placeholder?: string;
  options?: SelectMenuOption[];
  icon?: ReactNode;
  color?: string;
  size?: "small" | "middle" | "large";
  showSearch?: boolean;
  value?: string | number;
  onChange?: (value: string | number) => void;
  defaultValue?: string | number;
}