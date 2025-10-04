import api from "./api";

export const getAreasService = async (branchId: number) => {
    const res = await api.get(`/catalogs/branches/${branchId}/areas`);
    return res;
};
  
export const getPositionsService = async (areaId: number) => {
    const res = await api.get(`/catalogs/areas/${areaId}/positions`);
    return res;
};

export const getCountriesService = async () => {
    const res = await api.get(`/catalogs/countries`);
    return res;
};

export const getBranchesService = async () => {
    const res = await api.get(`/catalogs/branches`);
    return res;
};