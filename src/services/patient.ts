import type { PatientSearchFilterDto } from "../interfaces/patient.interface";
import api from "./api";

export const getAllPatientsService = async (data: PatientSearchFilterDto) => {
    console.log(data);
    // agregar valores por defecto
    const dataWithDefaults: PatientSearchFilterDto = {
        page: 1,
        pageSize: 20,
        status: "all",
        ...data, // sobreescribe si vienen valores
    };

    // eliminar campos undefined o vacíos
    const params = Object.fromEntries(
        Object.entries(dataWithDefaults).filter(
        ([_, value]) => value !== undefined && value !== ""
        )
    );
    console.log(params)
    const res = await api.get(`/expedients/search`, { params });
    return res;
};

export const activePatientSevice = async (id: number) => {
    const res = await api.patch(`/expedients/${id}/status`);
    return res;
}

export const deletePatientService = async (id: number) => {
    const res = await api.delete(`/expedients/${id}`);
    return res;
}
