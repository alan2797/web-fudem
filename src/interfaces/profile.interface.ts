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