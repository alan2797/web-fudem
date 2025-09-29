import api from "./api";

export const selectProfile = async (profileId: number) => {
  const res = await api.post("/sessions/work-profile", { profileId });
  return res.data.success;
};

export const selectDepartment = async (departmentId: number) => {
  const res = await api.post("/sessions/organization/branch", { departmentId });
  return res.data.success;
};

export const selectBranch = async (branchId: number) => {
  const res = await api.post("/sessions/organization/area", { branchId });
  return res.data.success;
};

export const selectPosition = async (positionId: number) => {
  const res = await api.post("/sessions/organization/position", { positionId });
  return res.data.success;
};
