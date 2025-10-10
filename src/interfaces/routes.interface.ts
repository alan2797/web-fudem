import type { ComponentType, LazyExoticComponent } from "react";

export interface RouteConfig {
  path: string;
  component: LazyExoticComponent<ComponentType<any>>;
  isPrivate: boolean;
  isRestricted?: boolean;
  layout?: 'main' | 'none' | 'expedient';
  title?: string;
  meta?: {
    requiresEmailVerification?: boolean;
    requiresPasswordChange?: boolean;
    roles?: string[];
  };
}

export interface RouteRendererProps {
    routes: RouteConfig[];
    isAuthenticated: boolean;
}

export interface RoutesProps {
    isAuthenticated: boolean;
}