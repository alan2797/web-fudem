import type { ProfileDto } from "./profile.interface";

export interface LoginRequestDto extends Record<string, unknown> {
    username?: string;
    password?: string;
}

export interface LoginResponseDto {
  success: boolean;
  requiresProfileSelection: boolean;
  requiresBranchSelection: boolean;
  requiresAreaSelection: boolean;
  requiresPositionSelection: boolean;
  token: string;
  requiresPasswordChange: boolean;
  profiles?: ProfileDto[];
}