import type { JSX } from "react";
import type { BranchDto } from "./branch.interface";
import type { ProfileDto } from "./profile.interface";

export interface LoginRequestDto extends Record<string, unknown> {
    username?: string;
    password?: string;
}

export interface LoginResponseDto {
  success?: boolean;
  requiresProfileSelection?: boolean;
  requiresBranchSelection?: boolean;
  requiresAreaSelection?: boolean;
  requiresPositionSelection?: boolean;
  token?: string;
  requiresPasswordChange?: boolean;
  profiles?: ProfileDto[];
  availableBranches?: BranchDto[];
  canSelectOrganization?: boolean;
}

export interface TokenPayload {
  userId: string;
  branchId?: number;
  areaId?: number;
  workProfileId?: number;
  positionId?: number;
  username: string;
  isAdmin: boolean;
  iat: number;
  exp: number;
}

export interface SelectAreaDto {
    areaId: number;
    branchId: number;
}

export interface ForgotUsernameRequestDto extends Record<string, unknown> {
  email?: string;
}

export interface ChangePasswordRequestDto extends Record<string, unknown>{
  newPassword?: string;
  confirmPassword?: string;    
}

export interface BlockedUsernameRequestDto extends Record<string, unknown> {
  username?: string;
  email?: string;
}

export interface ForgotUsernameReponse {
  success?: boolean;
  message?: string;
}

export interface BlockedUsernameReponse {
  success?: boolean;
  message?: string;
}

export interface ForgotPasswordRequestDto extends Record<string, unknown> {
  username?: string;
  email?: string;
}

export interface ForgotPasswordReponse {
  success?: boolean;
  message?: string;
}

export interface LoginStepNormalProps {
  user: LoginResponseDto | null;
}

export interface StepItemNormal {
  type: "profile" | "department" | "position";
  component: JSX.Element;
}
