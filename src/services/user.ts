import type { CreateUserDto, FiltersUserDto } from "../interfaces/user.interface";
import api from "./api";

export const getAllUsersService = async (data: FiltersUserDto) => {
    console.log(data);
    // agregar valores por defecto
    const dataWithDefaults: FiltersUserDto = {
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
    const res = await api.get(`/users`, { params });
    return res;
};

export const createUserService = async (data: CreateUserDto) => {
    console.log(data)
    const res = await api.post(`/users`, data);
    return res;
};
