import type { SelectBranchDto } from "../interfaces/branch.interface";
import type { SelectAreaDto } from "../interfaces/login.interface";
import type { SelectPositionDto } from "../interfaces/position.interface";
import type { SelectProfileDto } from "../interfaces/profile.interface";
import api from "./api";

export const selectProfileService = async (selectProfileDto: SelectProfileDto) => {
  const res = await api.post("/sessions/work-profile", selectProfileDto);
  return res;
};

export const selectDepartmentService = async (selectAreaDto: SelectAreaDto  ) => {
  const res = await api.post("/sessions/organization/area", selectAreaDto);
  return res;
};

export const selectBranchService = async (selectBranchDto: SelectBranchDto) => {
  const res = await api.post("/sessions/organization/branch", selectBranchDto);
  return res;
};

export const selectPositionService = async (selectPositionDto: SelectPositionDto) => {
  const res = await api.post("/sessions/organization/position", selectPositionDto );
  return res;
};


