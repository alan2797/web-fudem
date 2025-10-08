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

  
  
export interface CreateUserDto extends Record<string, unknown>{
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    dui?: string;
    isAdmin?: string;
    branchId?: string;
    status?: string;
    autoPassword?: boolean;
    password?: string;
    confirmPassword?: string;   
}

export interface CreateUserDetailDto extends Record<string, unknown>{
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    dui?: string;
    isAdmin?: string;
    branchId?: string;
    status?: string;
}


export interface CreateUserPasswordDto extends Record<string, unknown>{
    autoPassword?: boolean;
    password?: string;
    confirmPassword?: string;    
  }
  export interface CreateUserWorkProfileDto extends Record<string, unknown>{
    name?: string;
    branchId?: number;
    areaId?: number;    
    positionId?: number;    
  }

  export interface WorkProfileDtoUser {
    workProfiles: CreateUserWorkProfileDto[]
  }
   
export interface FilterEditUserDto extends Record<string, unknown>{
    medicalRecord?: string; //No. de Expediente
    name?: string;
    dui?: string;
    fechaNac ?: string;
    dpto ?: string;
    municipio ?: string;
}
