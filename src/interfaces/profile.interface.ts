import type { AreaDto } from "./area.interface";
import type { BranchDto } from "./branch.interface";
import type { PositionDto } from "./position.interface";

export interface ProfileDto {
  id: number;
  name: string;
}

export interface SelectProfileResponse {
  profile: {
    id: number;
    name: string;
    branchId: number;
    areaId: number | null;
    positionId: number | null;
  };
  success: boolean;
  token: string;
}

export interface SelectProfileDto {
    profileId: number;
}

export interface WorkProfileDto {
    id: number;
    name: string;
    branch: string;
    area: string;
}

export interface WorkProfileTableDto {
  id: number;
  name: string;
  branch: BranchDto;
  area: AreaDto;
  location: PositionDto;
}