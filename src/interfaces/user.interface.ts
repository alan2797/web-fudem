import type { BranchDto } from "./branch.interface";
import type { CountryDto } from "./country.interface";
import type { WorkProfileDto } from "./profile.interface";

export interface FiltersUserDto extends Record<string, unknown> {
    name?: string;
    isAdmin?: boolean;
    branchId?: number;
    countryId?: number;
    status?: string;
    page?: number;
    pageSize?: number;
}  
export interface User {
    id: number | string;
    username: string;
    name: string;
    role: string;
    branch: string;
    country: string;
    status: string;
}
export interface CreateUserDto extends Record <string,unknown> {
    nombre: string;
    apellido: string;
    usuario: string;
    email: string;
    dui: string;
    rol: string;
    sucursal: string;
    estado: string;
}

export interface CatalogsUserDto {
    countries: CountryDto[];
    branches: BranchDto[];
}

export interface UserListDto {
    id: string;
    username: string;
    fullName: string;
    email: string;
    dui: string;
    connectionStatus: "connected" | "disconnected" | "blocked"; // enum de estados posibles
    branch: BranchDto;
    country: CountryDto;
    workProfiles: WorkProfileDto[];
    isActive: boolean;
    isLocked: boolean;
    lastLoginAt: string;  // ISO Date string
    createdAt: string;    // ISO Date string
}

export interface UserListResponseDto {
    users: UserListDto[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

  
  